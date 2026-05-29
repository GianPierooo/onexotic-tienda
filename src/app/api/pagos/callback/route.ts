import { NextResponse, type NextRequest } from 'next/server';
import { onlinePaymentsEnabled } from '@/lib/payments/config';
import { defaultLocale, locales } from '@/lib/i18n/config';

/**
 * GET /api/pagos/callback
 * URL de retorno tras un flujo con redirección (PayPal). El proveedor manda
 * de vuelta al cliente aquí con la referencia de la orden. Verificamos y lo
 * mandamos a su pedido (éxito) o al checkout (fallo/cancelación).
 *
 * Query esperada (PayPal): ?token=<orderID>&PayerID=...&reference=...&locale=es
 */
function pickLocale(value: string | null): string {
  return value && (locales as readonly string[]).includes(value)
    ? value
    : defaultLocale;
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const locale = pickLocale(searchParams.get('locale'));

  if (!onlinePaymentsEnabled()) {
    return NextResponse.redirect(new URL(`/${locale}/checkout`, origin));
  }

  const orderId = searchParams.get('token'); // PayPal devuelve orderID en `token`
  const reference = searchParams.get('reference');
  const cancelled = searchParams.get('cancel') === 'true';

  if (cancelled || !orderId || !reference) {
    const url = new URL(`/${locale}/checkout`, origin);
    url.searchParams.set('pago', cancelled ? 'cancelado' : 'error');
    return NextResponse.redirect(url);
  }

  // TODO(activación): recuperar el `draft` guardado por `reference` (tabla
  // payment_intents), llamar a confirmarPagoOnline({ method:'paypal',
  // providerRef: orderId, reference, draft }) y, si crea el pedido, redirigir
  // a `/${locale}/pedidos/${id}`. Mientras el draft no se persista, dejamos al
  // cliente en el checkout con estado "pendiente".
  const url = new URL(`/${locale}/checkout`, origin);
  url.searchParams.set('pago', 'pendiente');
  return NextResponse.redirect(url);
}
