// Solo servidor: lee secretos vía config.server. Importar únicamente desde
// server actions / route handlers.
import { paymentsServerConfig, paypalConfigured } from '../config.server';
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
 * Proveedor PayPal — pago internacional (cobra en USD).
 *
 * Flujo típico (Orders v2, server-side create + capture):
 *  1. `createPayment` crea una orden vía POST {apiBase}/v2/checkout/orders con
 *     un access token OAuth. Devuelve el link de aprobación → `next:'redirect'`.
 *  2. El cliente aprueba en PayPal y vuelve a `returnUrl` (ver
 *     /api/pagos/callback) con el `token` (= orderID).
 *  3. `confirmPayment` captura la orden: POST {apiBase}/v2/checkout/orders/{id}/capture.
 *  4. PayPal envía webhooks → `verifyWebhook` (verificación vía API de PayPal).
 *
 * Docs: https://developer.paypal.com/docs/api/orders/v2/
 *
 * Nota de moneda: el cobro de PayPal es en USD. La conversión PEN→USD debe
 * fijarse al crear la orden (ver TODO). El pedido en Supabase se sigue
 * guardando en PEN (fuente de verdad).
 *
 * TODO(activación): completar OAuth + create + capture + verificación webhook.
 */
export const paypalProvider: PaymentProvider = {
  id: 'paypal',
  currency: 'USD',
  methods: ['paypal'],

  async createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult> {
    if (!paypalConfigured()) {
      return { ok: false, error: 'not_configured' };
    }
    if (input.amount.value <= 0) {
      return { ok: false, error: 'invalid_amount' };
    }

    // TODO(activación):
    // 1) Obtener access token:
    //    POST {apiBase}/v1/oauth2/token  (Basic auth: clientId:clientSecret)
    //    body: grant_type=client_credentials
    // 2) Crear la orden:
    //    POST {apiBase}/v2/checkout/orders
    //    body: {
    //      intent: 'CAPTURE',
    //      purchase_units: [{
    //        custom_id: input.reference,
    //        amount: { currency_code: 'USD', value: <totalUsd con 2 decimales> },
    //      }],
    //      application_context: { return_url: input.returnUrl, cancel_url: input.cancelUrl },
    //    }
    // 3) Devolver el link rel==='approve':
    //    return { ok: true, providerRef: order.id, next: 'redirect',
    //             redirectUrl: order.links.find(l => l.rel==='approve').href };

    void paymentsServerConfig;
    return { ok: false, error: 'not_implemented' };
  },

  async confirmPayment(
    input: ConfirmPaymentInput
  ): Promise<ConfirmPaymentResult> {
    if (!paypalConfigured()) {
      return { ok: false, error: 'not_configured' };
    }
    // input.providerRef = orderID de PayPal (llega en el callback).

    // TODO(activación): capturar la orden.
    // const token = await getPaypalAccessToken();
    // const res = await fetch(
    //   `${paymentsServerConfig.paypal.apiBase}/v2/checkout/orders/${input.providerRef}/capture`,
    //   { method: 'POST', headers: { Authorization: `Bearer ${token}`,
    //     'Content-Type': 'application/json' } }
    // );
    // const data = await res.json();
    // if (data.status === 'COMPLETED') {
    //   return { ok: true, status: 'paid', providerRef: data.id,
    //            amount: { currency: 'USD', value: Number(<captured value>) } };
    // }

    void input;
    return { ok: false, error: 'not_implemented' };
  },

  async verifyWebhook(input: WebhookVerifyInput): Promise<WebhookEvent> {
    if (!paypalConfigured()) {
      return { ok: false, error: 'not_configured' };
    }

    // TODO(activación): verificar el webhook con
    //   POST {apiBase}/v1/notifications/verify-webhook-signature
    // usando paymentsServerConfig.paypal.webhookId y los headers PAYPAL-*.
    // Mapear PAYMENT.CAPTURE.COMPLETED → { type:'payment.paid', ... }.

    void input;
    return { ok: false, error: 'not_implemented' };
  },
};
