'use server';

import { onlinePaymentsEnabled } from '@/lib/payments/config';
import { getProviderForMethod } from '@/lib/payments/registry.server';
import { finalizePaidOrder } from '@/lib/payments/finalize';
import { PEN_TO_USD } from '@/lib/store-config';
import type {
  CreatePaymentResult,
  OrderDraft,
  PaymentMethodId,
} from '@/lib/payments/types';

/**
 * Server actions del pago online. Son el puente entre el checkout (cliente) y
 * la capa de proveedores. Validan SIEMPRE el flag maestro en el servidor
 * (defensa en profundidad: aunque el cliente fuerce la UI, sin flag no pasa).
 */

function nuevaReferencia(): string {
  return `OX-PAY-${Date.now().toString(36).toUpperCase()}`;
}

function montoEnMoneda(totalPen: number, currency: 'PEN' | 'USD'): number {
  if (currency === 'USD') {
    // TODO(activación): usar un tipo de cambio REAL/fijado al momento del
    // cobro (PEN_TO_USD es informativo). El pedido se guarda en PEN igual.
    return Number((totalPen * PEN_TO_USD).toFixed(2));
  }
  return totalPen;
}

export type IniciarPagoInput = {
  method: PaymentMethodId;
  draft: OrderDraft;
  returnUrl?: string;
  cancelUrl?: string;
};

/** Crea el intento de pago con el proveedor que atiende el método elegido. */
export async function iniciarPagoOnline(
  input: IniciarPagoInput
): Promise<CreatePaymentResult> {
  if (!onlinePaymentsEnabled()) return { ok: false, error: 'payments_disabled' };

  const provider = getProviderForMethod(input.method);
  if (!provider) return { ok: false, error: 'provider_disabled' };

  // TODO(activación): recomputar el total desde la DB (no confiar en el monto
  // del cliente) y persistir el `draft` en una tabla `payment_intents` keyed
  // por `reference`, para que el webhook pueda finalizar el pedido sin sesión.
  const reference = nuevaReferencia();
  const amount = {
    currency: provider.currency,
    value: montoEnMoneda(input.draft.amounts.totalPen, provider.currency),
  };

  return provider.createPayment({
    method: input.method,
    draft: input.draft,
    amount,
    reference,
    returnUrl: input.returnUrl,
    cancelUrl: input.cancelUrl,
  });
}

export type ConfirmarPagoInput = {
  method: PaymentMethodId;
  providerRef: string;
  reference: string;
  draft: OrderDraft;
  /** token de Culqi.js / orderID de PayPal, etc. */
  payload?: Record<string, unknown>;
};

export type ConfirmarPagoResult =
  | { ok: true; id: string; numero: string }
  | { ok: false; error: string };

/**
 * Confirma el pago tras la interacción del cliente y, si quedó pagado, crea el
 * pedido reutilizando la lógica de hoy (crear_pedido + correo).
 */
export async function confirmarPagoOnline(
  input: ConfirmarPagoInput
): Promise<ConfirmarPagoResult> {
  if (!onlinePaymentsEnabled()) return { ok: false, error: 'payments_disabled' };

  const provider = getProviderForMethod(input.method);
  if (!provider) return { ok: false, error: 'provider_disabled' };

  const confirm = await provider.confirmPayment({
    providerRef: input.providerRef,
    reference: input.reference,
    payload: input.payload,
  });
  if (!confirm.ok) return { ok: false, error: confirm.error };
  if (confirm.status !== 'paid') {
    return { ok: false, error: `payment_${confirm.status}` };
  }

  return finalizePaidOrder({
    draft: input.draft,
    method: input.method,
    providerId: provider.id,
    providerRef: confirm.providerRef,
  });
}
