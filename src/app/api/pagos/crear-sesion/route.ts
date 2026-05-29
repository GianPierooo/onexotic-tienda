import { NextResponse, type NextRequest } from 'next/server';
import { iniciarPagoOnline } from '@/lib/payment-actions';
import { onlinePaymentsEnabled } from '@/lib/payments/config';

/**
 * POST /api/pagos/crear-sesion
 * Crea un intento de pago y devuelve cómo sigue el cliente (redirect o
 * client_sdk). Útil para flujos con redirección (PayPal) desde el front.
 *
 * Body: { method: PaymentMethodId, draft: OrderDraft, returnUrl?, cancelUrl? }
 */
export async function POST(request: NextRequest) {
  if (!onlinePaymentsEnabled()) {
    // Con el flag apagado la ruta no existe funcionalmente.
    return NextResponse.json({ ok: false, error: 'payments_disabled' }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  // TODO(activación): validar el body con un esquema (p. ej. zod) antes de
  // pasarlo al action: method permitido, draft con items/amounts coherentes.
  const result = await iniciarPagoOnline(body as Parameters<typeof iniciarPagoOnline>[0]);
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
