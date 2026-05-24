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
