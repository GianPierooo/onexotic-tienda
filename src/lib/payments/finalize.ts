// Solo servidor (crea pedidos vía RPC con la sesión actual).
import { createClient } from '@/lib/supabase/server';
import { crearPedido } from '@/lib/order-actions';
import type { OrderDraft, PaymentMethodId, PaymentProviderId } from './types';

/**
 * Crea el pedido REAL una vez confirmado el pago, reutilizando exactamente la
 * misma lógica que el checkout de hoy:
 *  - Cliente autenticado → `crearPedido` → RPC `crear_pedido` (descuenta stock
 *    de forma atómica) + correo de confirmación (sendOrderConfirmationEmail).
 *
 * Es el único punto donde el pago se convierte en pedido, para garantizar una
 * sola fuente de verdad.
 */

// Método de pago → valor aceptado por el RPC crear_pedido.
const RPC_METODO: Record<
  PaymentMethodId,
  'tarjeta' | 'yape' | 'plin' | 'paypal'
> = {
  tarjeta: 'tarjeta',
  yape: 'yape',
  plin: 'plin',
  paypal: 'paypal',
};

export type FinalizeInput = {
  draft: OrderDraft;
  method: PaymentMethodId;
  providerId: PaymentProviderId;
  /** Referencia del pago en el proveedor (charge id / order id). */
  providerRef: string;
};

export type FinalizeResult =
  | { ok: true; id: string; numero: string }
  | { ok: false; error: string };

export async function finalizePaidOrder(
  input: FinalizeInput
): Promise<FinalizeResult> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // MISMO flujo que hoy para clientes con cuenta.
    const res = await crearPedido({
      items: input.draft.items.map((i) => ({
        producto_id: i.producto_id,
        cantidad: i.cantidad,
      })),
      metodo_pago: RPC_METODO[input.method],
      direccion_envio: input.draft.shipping,
      envio_pen: input.draft.amounts.envioPen,
      notas: input.draft.notas,
    });
    if (!res.ok) return { ok: false, error: res.error };

    // TODO(activación): guardar la referencia de pago en el pedido
    // (input.providerId / input.providerRef). Requiere columnas
    // pago_proveedor y pago_ref en `pedidos` (migración aditiva pequeña).
    return { ok: true, id: res.id, numero: res.numero };
  }

  // Invitado: hoy la tabla `pedidos` exige cliente_id NOT NULL, así que el
  // pedido de invitado no se persiste (ver guest-order-actions.ts). Para
  // habilitar pago online de invitados hay que aplicar primero
  // supabase/migrations/_propuestas/0001_pedidos_invitado.sql y luego crear
  // aquí el pedido con service role + enviar el correo (misma lógica).
  // TODO(activación-invitado): implementar persistencia de pedido invitado.
  return { ok: false, error: 'guest_orders_pending_migration' };
}
