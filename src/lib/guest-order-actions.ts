'use server';

import { STORE, formatSoles } from '@/lib/store-config';
import { createAdminClient } from '@/lib/supabase/admin';

export type GuestItem = {
  producto_id: string;
  nombre: string;
  sku: string | null;
  talla: string;
  color: string | null;
  cantidad: number;
  precio: number;
};

export type GuestOrderInput = {
  nombre: string;
  email: string;
  telefono: string;
  pais: string;
  departamento: string;
  provincia?: string;
  distrito: string;
  direccion: string;
  codigo_postal?: string;
  referencia?: string;
  items: GuestItem[];
  subtotal: number;
  envio: number;
  total: number;
  notas?: string;
};

export type GuestOrderResult =
  | { ok: true; trackingRef: string; whatsappUrl: string }
  | { ok: false; error: string };

/**
 * Flujo de invitado: AHORA persiste el pedido en la tabla `pedidos`.
 *
 * Reutiliza el RPC `crear_pedido` (security definer) con un payload de
 * invitado (`p_invitado`). El RPC valida y descuenta stock de forma atómica
 * (misma lógica que el checkout autenticado) y guarda el snapshot del
 * invitado. Se llama con service role porque el invitado no tiene sesión; el
 * insert queda controlado por el RPC (RLS de `pedidos` no expone lectura a
 * invitados). Además se mantiene el flujo de WhatsApp + correos.
 */
export async function crearPedidoInvitado(
  input: GuestOrderInput
): Promise<GuestOrderResult> {
  if (!input.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    return { ok: false, error: 'invalid_email' };
  }
  if (!input.nombre.trim() || !input.telefono.trim() || !input.direccion.trim()) {
    return { ok: false, error: 'missing_fields' };
  }
  if (input.items.length === 0) {
    return { ok: false, error: 'cart_empty' };
  }
  if (input.items.some((it) => !it.producto_id)) {
    return { ok: false, error: 'missing_fields' };
  }

  // Persistir el pedido reutilizando crear_pedido (stock atómico).
  const supabase = createAdminClient();
  const { data, error } = await supabase.rpc('crear_pedido' as never, {
    p_items: input.items.map((i) => ({
      producto_id: i.producto_id,
      cantidad: i.cantidad,
    })),
    p_metodo_pago: 'whatsapp',
    p_direccion_envio: {
      destinatario: input.nombre,
      telefono: input.telefono,
      pais: input.pais,
      departamento: input.departamento,
      provincia: input.provincia ?? null,
      distrito: input.distrito,
      direccion: input.direccion,
      referencia: input.referencia ?? null,
      codigo_postal: input.codigo_postal ?? null,
    },
    p_envio_pen: input.envio,
    p_notas: input.notas ?? null,
    p_invitado: {
      nombre: input.nombre,
      email: input.email,
      telefono: input.telefono,
    },
  } as never);

  if (error) {
    console.error('[guest-order] crear_pedido', error.message);
    return { ok: false, error: 'order_failed' };
  }

  const row = Array.isArray(data) ? data[0] : data;
  const result = row as { numero_pedido?: string } | null;
  // Si por alguna razón no vuelve número, caer a una referencia local para no
  // bloquear al cliente (el pedido igual se intentó y el equipo tiene WhatsApp).
  const trackingRef =
    result?.numero_pedido ?? `OX-G${Date.now().toString(36).toUpperCase()}`;
  const whatsappUrl = buildGuestWhatsAppUrl(input, trackingRef);

  await sendGuestEmail(input, trackingRef).catch((e) => {
    console.error('[guest-order] email error', e);
  });
  await sendInternalNotice(input, trackingRef).catch((e) => {
    console.error('[guest-order] internal email error', e);
  });

  return { ok: true, trackingRef, whatsappUrl };
}

function buildGuestWhatsAppUrl(input: GuestOrderInput, ref: string): string {
  const lines: string[] = [];
  lines.push(`Hola OnExotic, quiero hacer este pedido como invitado (${ref}):`);
  lines.push('');
  input.items.forEach((it, i) => {
    const parts = [it.nombre];
    if (it.sku) parts.push(`(${it.sku})`);
    lines.push(`${i + 1}. ${parts.join(' ')}`);
    const attrs = [`Talla: ${it.talla}`];
    if (it.color) attrs.push(`Color: ${it.color}`);
    attrs.push(`Cant: ${it.cantidad}`);
    attrs.push(`P/u: ${formatSoles(it.precio)}`);
    lines.push(`   ${attrs.join(' · ')}`);
  });
  lines.push('');
  lines.push(`Subtotal: ${formatSoles(input.subtotal)}`);
  lines.push(`Envío: ${input.envio === 0 ? 'gratis' : formatSoles(input.envio)}`);
  lines.push(`Total: ${formatSoles(input.total)}`);
  lines.push('');
  lines.push('Datos de envío:');
  lines.push(`  Nombre: ${input.nombre}`);
  lines.push(`  Email: ${input.email}`);
  lines.push(`  Teléfono: ${input.telefono}`);
  lines.push(`  Dirección: ${input.direccion}`);
  if (input.referencia) lines.push(`  Referencia: ${input.referencia}`);
  lines.push(
    `  ${input.distrito}${input.provincia ? ', ' + input.provincia : ''}, ${input.departamento} · ${input.pais}`
  );
  if (input.codigo_postal) lines.push(`  CP: ${input.codigo_postal}`);
  if (input.notas) {
    lines.push('');
    lines.push(`Notas: ${input.notas}`);
  }
  lines.push('');
  lines.push('¿Me confirman disponibilidad y método de pago?');
  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${STORE.whatsappPhone}?text=${text}`;
}

async function sendGuestEmail(input: GuestOrderInput, ref: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_EMAIL_FROM ?? 'OnExotic <pedidos@onexotic.shop>';
  const subject = `OnExotic · Solicitud de pedido ${ref}`;
  const text = [
    `Hola ${input.nombre},`,
    '',
    `Recibimos tu solicitud de pedido como invitado (${ref}).`,
    '',
    `Total: ${formatSoles(input.total)}`,
    `Método: coordinación por WhatsApp (${STORE.whatsappLabel}).`,
    '',
    'Nuestro equipo te confirmará disponibilidad y pago por WhatsApp en las próximas horas. Si prefieres crear cuenta para ver tu historial, escríbenos.',
    '',
    'OnExotic · El culto te espera.',
  ].join('\n');

  if (!apiKey) {
    console.info('[guest-order] (RESEND_API_KEY ausente) →', input.email, subject);
    return;
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to: input.email, subject, text }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    console.error('[guest-order] resend error', res.status, body);
  }
}

async function sendInternalNotice(input: GuestOrderInput, ref: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.INTERNAL_ORDER_INBOX ?? STORE.contactEmail;
  if (!apiKey) return;
  const subject = `[Tienda] Pedido invitado ${ref} — ${formatSoles(input.total)}`;
  const text = [
    `Nuevo pedido de invitado: ${ref}`,
    '',
    `Cliente: ${input.nombre} <${input.email}> · ${input.telefono}`,
    `Total: ${formatSoles(input.total)} (envío ${input.envio === 0 ? 'gratis' : formatSoles(input.envio)})`,
    '',
    'Piezas:',
    ...input.items.map(
      (it) =>
        `  · ${it.cantidad}× ${it.nombre}${it.sku ? ' (' + it.sku + ')' : ''} — ${it.talla}${it.color ? ' / ' + it.color : ''}`
    ),
    '',
    'Envío:',
    `  ${input.direccion} — ${input.distrito}${input.provincia ? ', ' + input.provincia : ''}, ${input.departamento} · ${input.pais}`,
    input.codigo_postal ? `  CP ${input.codigo_postal}` : '',
    input.referencia ? `  Ref: ${input.referencia}` : '',
    '',
    input.notas ? `Notas: ${input.notas}` : '',
  ]
    .filter(Boolean)
    .join('\n');
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.ORDER_EMAIL_FROM ?? 'OnExotic <pedidos@onexotic.shop>',
      to: inbox,
      subject,
      text,
    }),
  });
}
