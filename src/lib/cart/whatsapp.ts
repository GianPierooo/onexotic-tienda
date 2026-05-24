import { STORE, formatSoles } from '@/lib/store-config';
import type { CartItem } from './cart-context';

export function buildCartWhatsAppUrl(items: CartItem[], total: number): string {
  const lines: string[] = [];
  lines.push('Hola OnExotic, quiero hacer el pedido del culto:');
  lines.push('');
  items.forEach((it, i) => {
    const parts = [it.nombre];
    if (it.sku) parts.push(`(${it.sku})`);
    lines.push(`${i + 1}. ${parts.join(' ')}`);
    const attrs = [`Talla: ${it.talla}`];
    if (it.color) attrs.push(`Color: ${it.color}`);
    attrs.push(`Cantidad: ${it.cantidad}`);
    attrs.push(`Precio: ${formatSoles(it.precio)}`);
    lines.push(`   ${attrs.join(' · ')}`);
    lines.push(`   Subtotal: ${formatSoles(it.precio * it.cantidad)}`);
  });
  lines.push('');
  lines.push(`Total: ${formatSoles(total)}`);
  lines.push('');
  lines.push('¿Me confirman disponibilidad y envío?');
  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${STORE.whatsappPhone}?text=${text}`;
}

export function buildProductWhatsAppUrl(p: {
  nombre: string;
  sku?: string | null;
  talla?: string | null;
  color?: string | null;
  precio?: number | null;
}): string {
  const lines: string[] = [];
  lines.push('Hola OnExotic, tengo una pregunta sobre esta pieza:');
  lines.push('');
  lines.push(p.nombre + (p.sku ? ` (${p.sku})` : ''));
  if (p.talla) lines.push(`Talla: ${p.talla}`);
  if (p.color) lines.push(`Color: ${p.color}`);
  if (p.precio != null) lines.push(`Precio: ${formatSoles(p.precio)}`);
  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${STORE.whatsappPhone}?text=${text}`;
}
