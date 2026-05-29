// Solo servidor: lee secretos vía config.server. Importar únicamente desde
// server actions / route handlers.
import { paymentsServerConfig, culqiConfigured } from '../config.server';
import type {
  PaymentProvider,
  CreatePaymentInput,
  CreatePaymentResult,
  ConfirmPaymentInput,
  ConfirmPaymentResult,
  WebhookVerifyInput,
  WebhookEvent,
} from '../types';

/**
 * Proveedor Culqi — tarjetas (Perú e internacionales) + Yape y Plin.
 *
 * Flujo típico de Culqi:
 *  1. El cliente tokeniza la tarjeta/Yape en el NAVEGADOR con Culqi.js usando
 *     la llave PÚBLICA (NEXT_PUBLIC_CULQI_PUBLIC_KEY). → `createPayment`
 *     devuelve `next: 'client_sdk'` con la config para abrir Culqi.js.
 *  2. Culqi.js devuelve un `token` (tkn_...). El front llama a
 *     `confirmarPagoOnline` con ese token.
 *  3. En el SERVIDOR se crea el cargo (charge) con la llave SECRETA
 *     (CULQI_SECRET_KEY). → `confirmPayment`.
 *  4. Culqi también envía un webhook de confirmación → `verifyWebhook`.
 *
 * Docs: https://docs.culqi.com  ·  API: https://api.culqi.com/v2
 *
 * TODO(activación): completar las 3 llamadas marcadas abajo. No requiere SDK
 * extra; se puede usar `fetch` contra la API REST de Culqi.
 */
export const culqiProvider: PaymentProvider = {
  id: 'culqi',
  currency: 'PEN',
  methods: ['tarjeta', 'yape', 'plin'],

  async createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult> {
    if (!culqiConfigured()) {
      return { ok: false, error: 'not_configured' };
    }
    if (input.amount.value <= 0) {
      return { ok: false, error: 'invalid_amount' };
    }

    // Culqi tokeniza en el cliente: devolvemos la config para Culqi.js.
    // El monto va en CÉNTIMOS de sol (PEN * 100), entero.
    const amountCents = Math.round(input.amount.value * 100);

    // TODO(activación): si se usa Culqi Checkout (orden de pago server-side),
    // aquí se crearía la "orden" vía POST {apiBase}/orders con la secret key
    // y se devolvería su id. Para el flujo con Culqi.js basta con la config:
    return {
      ok: true,
      providerRef: input.reference,
      next: 'client_sdk',
      clientConfig: {
        // La llave pública la lee el front desde NEXT_PUBLIC_CULQI_PUBLIC_KEY.
        currency: 'PEN',
        amount: amountCents,
        reference: input.reference,
        methods: input.method, // 'tarjeta' | 'yape' | 'plin'
        customerEmail: input.draft.customer.email,
      },
    };
  },

  async confirmPayment(
    input: ConfirmPaymentInput
  ): Promise<ConfirmPaymentResult> {
    if (!culqiConfigured()) {
      return { ok: false, error: 'not_configured' };
    }
    const token = (input.payload?.token ?? input.payload?.tokenId) as
      | string
      | undefined;
    if (!token) {
      return { ok: false, error: 'provider_error' };
    }

    // TODO(activación): crear el cargo real en Culqi.
    //
    // const res = await fetch(`${paymentsServerConfig.culqi.apiBase}/charges`, {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${paymentsServerConfig.culqi.secretKey}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     amount: <amountCents>,        // mismo monto en céntimos
    //     currency_code: 'PEN',
    //     email: <customerEmail>,
    //     source_id: token,             // token de Culqi.js
    //     metadata: { reference: input.reference },
    //   }),
    // });
    // const charge = await res.json();
    // if (!res.ok || charge.object === 'error') {
    //   return { ok: false, error: 'provider_error' };
    // }
    // return {
    //   ok: true,
    //   status: 'paid',
    //   providerRef: charge.id,
    //   amount: { currency: 'PEN', value: charge.amount / 100 },
    // };

    void paymentsServerConfig; // referencia mientras el bloque real está pendiente
    return { ok: false, error: 'not_implemented' };
  },

  async verifyWebhook(input: WebhookVerifyInput): Promise<WebhookEvent> {
    if (!culqiConfigured()) {
      return { ok: false, error: 'not_configured' };
    }

    // TODO(activación): validar la firma del webhook de Culqi con
    // paymentsServerConfig.culqi.webhookSecret (header de firma de Culqi) y
    // mapear el evento a nuestro formato normalizado.
    //
    // const valid = verifyCulqiSignature(input.rawBody, input.headers, secret);
    // if (!valid) return { ok: false, error: 'invalid_signature' };
    // const event = JSON.parse(input.rawBody);
    // if (event.type === 'charge.succeeded') {
    //   return { ok: true, type: 'payment.paid', providerRef: event.data.id,
    //            reference: event.data.metadata?.reference, status: 'paid' };
    // }

    void input;
    return { ok: false, error: 'not_implemented' };
  },
};
