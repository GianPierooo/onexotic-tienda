import { STORE, formatSoles } from '@/lib/store-config';

type Input = {
  to: string | null;
  numero: string;
  total: number;
  metodo: string;
};

export async function sendOrderConfirmationEmail({
  to,
  numero,
  total,
  metodo,
}: Input): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_EMAIL_FROM ?? 'OnExotic <pedidos@onexotic.shop>';

  if (!to) {
    console.info('[email] pedido sin destinatario', numero);
    return;
  }

  const subject = `OnExotic · Pedido ${numero}`;
  const text = [
    `Recibimos tu pedido ${numero}.`,
    '',
    `Método de pago: ${metodo}`,
    `Total: ${formatSoles(total)}`,
    '',
    metodo === 'whatsapp'
      ? `Nuestro equipo te confirmará por WhatsApp (${STORE.whatsappLabel}).`
      : 'Te avisaremos cuando salga del culto.',
    '',
    `Sigue el estado en ${STORE.storeUrl}/es/cuenta`,
  ].join('\n');

  if (!apiKey) {
    console.info('[email] (RESEND_API_KEY ausente) →', to, subject);
    return;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, subject, text }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    console.error('[email] resend error', res.status, body);
  }
}
