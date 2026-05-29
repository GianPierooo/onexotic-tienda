// Solo servidor (importa proveedores que leen secretos).
import { culqiProvider } from './providers/culqi';
import { paypalProvider } from './providers/paypal';
import type { PaymentProvider, PaymentProviderId, PaymentMethodId } from './types';

/**
 * Registro de proveedores. Sumar una pasarela nueva = implementar
 * PaymentProvider y agregarla a este mapa.
 */
const PROVIDERS: Record<PaymentProviderId, PaymentProvider> = {
  culqi: culqiProvider,
  paypal: paypalProvider,
};

export function getProvider(id: PaymentProviderId): PaymentProvider {
  return PROVIDERS[id];
}

/** Resuelve qué proveedor atiende un método de pago concreto. */
export function getProviderForMethod(
  method: PaymentMethodId
): PaymentProvider | null {
  for (const provider of Object.values(PROVIDERS)) {
    if (provider.methods.includes(method)) return provider;
  }
  return null;
}
