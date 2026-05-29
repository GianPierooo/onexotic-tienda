/**
 * Secretos de pago — SOLO servidor. Importar este archivo únicamente desde
 * código de servidor (server actions, route handlers, providers). Aunque por
 * error se importara desde el cliente, Next solo inyecta variables
 * NEXT_PUBLIC_* en el bundle del navegador: estos `process.env` quedarían
 * vacíos, así que los secretos nunca se filtran.
 *
 * Aquí van las llaves privadas y de webhook. Mientras estén vacías, los
 * proveedores devuelven `not_configured` y el checkout sigue funcionando solo
 * con WhatsApp.
 */

export const paymentsServerConfig = {
  culqi: {
    secretKey: process.env.CULQI_SECRET_KEY ?? '',
    apiBase: process.env.CULQI_API_BASE ?? 'https://api.culqi.com/v2',
    /** Secreto para validar la firma de los webhooks de Culqi. */
    webhookSecret: process.env.CULQI_WEBHOOK_SECRET ?? '',
  },
  paypal: {
    clientId:
      process.env.PAYPAL_CLIENT_ID ?? process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
    clientSecret: process.env.PAYPAL_CLIENT_SECRET ?? '',
    /** 'sandbox' | 'live' — controla el host de la API de PayPal. */
    env: (process.env.PAYPAL_ENV ?? 'sandbox') as 'sandbox' | 'live',
    /** ID de webhook configurado en el dashboard de PayPal (para verificar). */
    webhookId: process.env.PAYPAL_WEBHOOK_ID ?? '',
    apiBase:
      (process.env.PAYPAL_ENV ?? 'sandbox') === 'live'
        ? 'https://api-m.paypal.com'
        : 'https://api-m.sandbox.paypal.com',
  },
} as const;

export function culqiConfigured(): boolean {
  return paymentsServerConfig.culqi.secretKey.length > 0;
}

export function paypalConfigured(): boolean {
  return (
    paymentsServerConfig.paypal.clientId.length > 0 &&
    paymentsServerConfig.paypal.clientSecret.length > 0
  );
}
