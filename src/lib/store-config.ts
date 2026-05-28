export const STORE = {
  freeShippingThreshold: numFromEnv(
    process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD,
    250
  ),
  shippingDefault: numFromEnv(process.env.NEXT_PUBLIC_SHIPPING_DEFAULT, 15),
  whatsappPhone: process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? '51906517394',
  whatsappLabel: process.env.NEXT_PUBLIC_WHATSAPP_LABEL ?? '+51 906 517 394',
  contactEmail: 'onexotic2005@gmail.com',
  storeUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://onexotic.shop',
} as const;

function numFromEnv(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export function formatSoles(n: number): string {
  return `S/ ${n.toFixed(0)}`;
}

/**
 * Conversión PEN → USD informativa. Configurable vía
 * NEXT_PUBLIC_PEN_TO_USD (ej. "0.27"). NO afecta el cobro: el checkout
 * y el RPC crear_pedido siguen en PEN. Solo se muestra como guía al
 * comprador internacional.
 */
export const PEN_TO_USD = numFromEnv(process.env.NEXT_PUBLIC_PEN_TO_USD, 0.27);

export function approxUsd(pen: number): string {
  const usd = pen * PEN_TO_USD;
  return usd.toFixed(2);
}

export type ShippingZone = 'lima' | 'provincia' | 'internacional';

export const SHIPPING_RATES: Record<ShippingZone, number> = {
  lima: numFromEnv(process.env.NEXT_PUBLIC_SHIPPING_LIMA, 15),
  provincia: numFromEnv(process.env.NEXT_PUBLIC_SHIPPING_PROVINCIA, 25),
  internacional: numFromEnv(process.env.NEXT_PUBLIC_SHIPPING_INTL, 120),
};

export function calculateShipping(zone: ShippingZone, subtotal: number): number {
  if (zone === 'internacional') return SHIPPING_RATES.internacional;
  if (subtotal >= STORE.freeShippingThreshold) return 0;
  return SHIPPING_RATES[zone];
}
