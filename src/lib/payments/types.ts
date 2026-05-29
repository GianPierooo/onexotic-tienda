/**
 * OnExotic — Capa de abstracción de pagos online.
 *
 * Contratos compartidos por todos los proveedores (Culqi, PayPal, …). La idea
 * es que enchufar un proveedor nuevo sea implementar `PaymentProvider` y
 * registrarlo en `registry.ts`; el resto de la app (checkout, rutas API,
 * finalización del pedido) solo habla con esta interfaz.
 *
 * NADA aquí ejecuta cobros reales todavía: los proveedores son stubs con
 * TODOs donde irán las llamadas al SDK/API de cada pasarela.
 */

export type PaymentProviderId = 'culqi' | 'paypal';

/**
 * Método de pago concreto elegido por el cliente. Cada método lo atiende un
 * proveedor (ver `registry.ts`):
 *  - tarjeta / yape / plin → Culqi
 *  - paypal               → PayPal
 */
export type PaymentMethodId = 'tarjeta' | 'yape' | 'plin' | 'paypal';

export type CurrencyCode = 'PEN' | 'USD';

/** Ítem del pedido, con lo necesario para descontar stock y armar el correo. */
export type OnlineOrderItem = {
  producto_id: string;
  nombre: string;
  sku: string | null;
  talla: string;
  color: string | null;
  cantidad: number;
  /** Precio unitario en PEN (la fuente de verdad del cobro siempre es PEN). */
  precio: number;
};

export type OnlineShipping = {
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

export type OnlineCustomer = {
  nombre: string;
  email: string;
  telefono: string;
};

/**
 * Borrador de pedido: TODO lo que se necesita para crear el pedido real una
 * vez confirmado el pago. Se arma en el checkout y viaja con el intento de
 * pago (en metadata del proveedor y/o en una tabla payment_intents — ver
 * TODO en finalize.ts).
 */
export type OrderDraft = {
  items: OnlineOrderItem[];
  shipping: OnlineShipping;
  customer: OnlineCustomer;
  amounts: {
    subtotalPen: number;
    envioPen: number;
    totalPen: number;
  };
  notas?: string;
  /** id del cliente autenticado, si lo hay. null = invitado. */
  clienteId?: string | null;
};

export type CreatePaymentInput = {
  method: PaymentMethodId;
  draft: OrderDraft;
  /** Importe a cobrar (normalmente totalPen en PEN). */
  amount: { currency: CurrencyCode; value: number };
  /** A dónde vuelve el cliente tras un flujo con redirección (PayPal). */
  returnUrl?: string;
  cancelUrl?: string;
  /** Referencia interna que correlaciona el intento con el pedido. */
  reference: string;
};

export type CreatePaymentResult =
  | {
      ok: true;
      providerRef: string;
      /**
       * Cómo continúa el cliente:
       *  - 'redirect': mandarlo a `redirectUrl` (PayPal).
       *  - 'client_sdk': el front abre el SDK/checkout con `clientConfig`
       *    (Culqi.js) y luego llama a confirmarPagoOnline.
       */
      next: 'redirect' | 'client_sdk';
      redirectUrl?: string;
      clientConfig?: Record<string, unknown>;
    }
  | { ok: false; error: PaymentError };

export type ConfirmPaymentInput = {
  /** Referencia del pago en el proveedor (charge id, order id, token, …). */
  providerRef: string;
  /** Payload que devuelve el cliente tras el SDK (token Culqi, orderID PayPal). */
  payload?: Record<string, unknown>;
  reference: string;
};

export type PaymentStatus = 'paid' | 'pending' | 'failed';

export type ConfirmPaymentResult =
  | {
      ok: true;
      status: PaymentStatus;
      providerRef: string;
      amount: { currency: CurrencyCode; value: number };
    }
  | { ok: false; error: PaymentError };

export type WebhookVerifyInput = {
  /** Cuerpo crudo (sin parsear) — necesario para validar la firma. */
  rawBody: string;
  headers: Record<string, string>;
};

export type WebhookEvent =
  | {
      ok: true;
      /** Evento normalizado del proveedor. */
      type: 'payment.paid' | 'payment.failed' | 'payment.pending' | 'ignored';
      providerRef?: string;
      reference?: string;
      status?: PaymentStatus;
    }
  | { ok: false; error: PaymentError };

export type PaymentError =
  | 'not_configured'
  | 'provider_disabled'
  | 'payments_disabled'
  | 'invalid_amount'
  | 'invalid_signature'
  | 'provider_error'
  | 'not_implemented';

/**
 * Contrato que implementa cada pasarela. Implementar esto + registrarlo en
 * `registry.ts` es todo lo necesario para sumar un proveedor.
 */
export interface PaymentProvider {
  readonly id: PaymentProviderId;
  /** Moneda en la que cobra este proveedor. */
  readonly currency: CurrencyCode;
  /** Métodos que atiende este proveedor. */
  readonly methods: PaymentMethodId[];
  /** Crea el intento/sesión de pago con el proveedor. */
  createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult>;
  /** Confirma/captura el pago tras la interacción del cliente. */
  confirmPayment(input: ConfirmPaymentInput): Promise<ConfirmPaymentResult>;
  /** Verifica y normaliza un webhook entrante del proveedor. */
  verifyWebhook(input: WebhookVerifyInput): Promise<WebhookEvent>;
}
