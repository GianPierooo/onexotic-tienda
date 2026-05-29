import { NextResponse, type NextRequest } from 'next/server';
import { onlinePaymentsEnabled } from '@/lib/payments/config';
import { getProvider } from '@/lib/payments/registry.server';
import type { PaymentProviderId } from '@/lib/payments/types';

/**
 * POST /api/pagos/webhook/[provider]   (provider = 'culqi' | 'paypal')
 *
 * Recibe los webhooks del proveedor para confirmar/reconciliar pagos de forma
 * fiable (independiente de que el cliente vuelva al sitio). Verifica la firma
 * y, si el pago quedó pagado, finaliza el pedido.
 *
 * IMPORTANTE: hay que leer el cuerpo CRUDO (sin parsear) para validar la firma.
 */
const VALID: PaymentProviderId[] = ['culqi', 'paypal'];

export async function POST(
  request: NextRequest,
  { params }: { params: { provider: string } }
) {
  if (!onlinePaymentsEnabled()) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }
  if (!VALID.includes(params.provider as PaymentProviderId)) {
    return NextResponse.json({ ok: false, error: 'unknown_provider' }, { status: 404 });
  }

  const provider = getProvider(params.provider as PaymentProviderId);
  const rawBody = await request.text();
  const headers: Record<string, string> = {};
  request.headers.forEach((v, k) => {
    headers[k] = v;
  });

  const event = await provider.verifyWebhook({ rawBody, headers });

  if (!event.ok) {
    // Firma inválida → 400 (el proveedor reintentará). not_implemented /
    // not_configured → 200 para no provocar reintentos infinitos en setup.
    const status = event.error === 'invalid_signature' ? 400 : 200;
    return NextResponse.json({ ok: false, error: event.error }, { status });
  }

  if (event.type === 'payment.paid') {
    // TODO(activación): recuperar el `draft` por event.reference (tabla
    // payment_intents) y llamar a finalizePaidOrder(...). El webhook NO tiene
    // sesión, así que la finalización debe usar service role y resolver el
    // cliente desde el draft. Idempotencia: ignorar si el pedido ya existe
    // para esa reference.
  }

  return NextResponse.json({ ok: true, received: event.type }, { status: 200 });
}
