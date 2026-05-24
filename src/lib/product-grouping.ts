import type { ProductoCard } from '@/lib/queries';
import type { CardProduct } from '@/components/ui/product-card';

const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'UNICA', 'ÚNICA'];
function sizeSort(a: string, b: string): number {
  const ai = sizeOrder.indexOf(a.toUpperCase());
  const bi = sizeOrder.indexOf(b.toUpperCase());
  if (ai !== -1 && bi !== -1) return ai - bi;
  if (ai !== -1) return -1;
  if (bi !== -1) return 1;
  return a.localeCompare(b);
}

function skuBase(sku: string | null) {
  if (!sku) return null;
  return sku.replace(/[- ]?(XS|S|M|L|XL|XXL|UNICA|ÚNICA|\d{2})$/i, '');
}

export function groupForCards(productos: ProductoCard[]): CardProduct[] {
  const groups = new Map<string, ProductoCard[]>();
  for (const p of productos) {
    const key = `${p.nombre}|${p.color ?? ''}`;
    const arr = groups.get(key) ?? [];
    arr.push(p);
    groups.set(key, arr);
  }

  const cards: CardProduct[] = [];
  let idx = 0;
  for (const variantes of groups.values()) {
    const first = variantes[0];
    if (!first) continue;
    const tallas = variantes.map((v) => v.talla).sort(sizeSort);
    const tallasAgotadas = variantes
      .filter((v) => v.stock <= 0 || v.estado === 'agotado')
      .map((v) => v.talla);
    const todasAgotadas = tallasAgotadas.length === variantes.length;
    const stockTotal = variantes.reduce((s, v) => s + (v.stock ?? 0), 0);
    const precio = variantes.reduce<number | null>(
      (min, v) =>
        v.precio_venta != null && (min == null || v.precio_venta < min)
          ? v.precio_venta
          : min,
      null
    );

    let badge: CardProduct['badge'] = null;
    let ultimoTexto: string | null = null;
    if (!todasAgotadas) {
      if (stockTotal > 0 && stockTotal <= 5) {
        badge = 'ÚLTIMO';
        ultimoTexto = `${stockTotal} piezas`;
      } else if (idx < 2) {
        badge = 'NUEVO';
      }
    }

    cards.push({
      id: first.id,
      slug: first.slug,
      nombre: first.nombre,
      sku: skuBase(first.sku) ?? first.sku,
      precio_venta: precio,
      imagen_url: first.imagen_url,
      estado: todasAgotadas ? 'agotado' : first.estado,
      stock: stockTotal,
      tallas,
      tallasAgotadas,
      badge,
      ultimoTexto,
    });
    idx++;
  }
  return cards;
}
