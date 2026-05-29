'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { sendOrderConfirmationEmail } from '@/lib/email';

export type OrderItemInput = {
  producto_id: string;
  cantidad: number;
};

export type DireccionEnvio = {
  destinatario: string;
  telefono: string;
  pais: string;
  departamento: string;
  provincia?: string;
  distrito: string;
  direccion: string;
  referencia?: string;
  codigo_postal?: string;
};

export type CrearPedidoInput = {
  items: OrderItemInput[];
  // 'paypal' requiere aplicar la migración _propuestas/0003 que lo agrega al
  // enum del RPC crear_pedido (ver docs/pagos-online.md).
  metodo_pago: 'whatsapp' | 'culqi' | 'yape' | 'plin' | 'tarjeta' | 'paypal';
  direccion_envio: DireccionEnvio;
  envio_pen: number;
  descuento_pen?: number;
  cupon?: string;
  notas?: string;
};

export type CrearPedidoResult =
  | { ok: true; id: string; numero: string; total: number }
  | { ok: false; error: string };

export async function crearPedido(
  input: CrearPedidoInput
): Promise<CrearPedidoResult> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'auth_required' };

  const { data, error } = await supabase.rpc('crear_pedido' as never, {
    p_items: input.items,
    p_metodo_pago: input.metodo_pago,
    p_direccion_envio: input.direccion_envio,
    p_envio_pen: input.envio_pen,
    p_descuento_pen: input.descuento_pen ?? 0,
    p_cupon: input.cupon ?? null,
    p_notas: input.notas ?? null,
  } as never);

  if (error) {
    return { ok: false, error: error.message };
  }

  const row = Array.isArray(data) ? data[0] : data;
  const result = row as
    | { id: string; numero_pedido: string; total_pen: number | string }
    | null;
  if (!result?.id) return { ok: false, error: 'pedido_no_creado' };

  // Confirmación al cliente — log fallback si no hay key Resend.
  const total = Number(result.total_pen) || 0;
  try {
    await sendOrderConfirmationEmail({
      to: user.email ?? null,
      numero: result.numero_pedido,
      total,
      metodo: input.metodo_pago,
    });
  } catch (e) {
    console.error('email confirmacion', e);
  }

  revalidatePath('/cuenta');
  return {
    ok: true,
    id: result.id,
    numero: result.numero_pedido,
    total,
  };
}
