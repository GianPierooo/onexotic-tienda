/**
 * Configuración de pagos online basada en variables de entorno.
 *
 * Este archivo es SEGURO para importar desde el cliente: solo lee flags y
 * llaves PÚBLICAS (NEXT_PUBLIC_*). Los secretos del servidor (secret keys,
 * webhook secrets) se leen aparte en `config.server.ts`, que NUNCA debe
 * importarse desde un componente cliente.
 *
 * Regla de visibilidad: NADA de pago online se muestra a menos que
 * NEXT_PUBLIC_PAGOS_ONLINE === 'true'. Cada proveedor tiene además su propio
 * flag para encenderlos de a uno cuando lleguen sus llaves.
 */

import type { PaymentProviderId } from './types';

function flag(value: string | undefined): boolean {
  return value === 'true' || value === '1';
}

export const paymentsConfig = {
  /** Interruptor maestro. Apagado por defecto. */
  enabled: flag(process.env.NEXT_PUBLIC_PAGOS_ONLINE),
  culqi: {
    enabled: flag(process.env.NEXT_PUBLIC_PAGOS_CULQI),
    /** Llave pública de Culqi (pk_*), usada por Culqi.js en el cliente. */
    publicKey: process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY ?? '',
  },
  paypal: {
    enabled: flag(process.env.NEXT_PUBLIC_PAGOS_PAYPAL),
    /** Client ID de PayPal, usado por el SDK de PayPal en el cliente. */
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
  },
} as const;

/** ¿Está encendido el pago online (interruptor maestro)? */
export function onlinePaymentsEnabled(): boolean {
  return paymentsConfig.enabled;
}

/**
 * Proveedores visibles en el checkout. Vacío si el flag maestro está apagado.
 * Un proveedor aparece si su flag está encendido (la validación de llaves
 * ocurre en el servidor al intentar pagar, con mensaje claro si faltan).
 */
export function enabledPaymentProviders(): PaymentProviderId[] {
  if (!paymentsConfig.enabled) return [];
  const list: PaymentProviderId[] = [];
  if (paymentsConfig.culqi.enabled) list.push('culqi');
  if (paymentsConfig.paypal.enabled) list.push('paypal');
  return list;
}
