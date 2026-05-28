'use server';

import { STORE } from '@/lib/store-config';

export type ContactInput = {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
};

export type ContactResult = { ok: true } | { ok: false; error: string };

export async function sendContactMessage(
  input: ContactInput
): Promise<ContactResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.CONTACT_INBOX ?? STORE.contactEmail;
  const from = process.env.ORDER_EMAIL_FROM ?? 'OnExotic <pedidos@onexotic.shop>';

  const subject = `[Contacto] ${input.asunto || '(sin asunto)'} — ${input.nombre}`;
  const text = [
    `Mensaje desde el formulario de contacto:`,
    '',
    `Nombre: ${input.nombre}`,
    `Email: ${input.email}`,
    input.asunto ? `Asunto: ${input.asunto}` : '',
    '',
    input.mensaje,
  ]
    .filter(Boolean)
    .join('\n');

  if (!apiKey) {
    console.info('[contact] (RESEND_API_KEY ausente) →', inbox, subject);
    return { ok: true };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: inbox,
      reply_to: input.email,
      subject,
      text,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    console.error('[contact] resend error', res.status, body);
    return { ok: false, error: 'send_failed' };
  }
  return { ok: true };
}
