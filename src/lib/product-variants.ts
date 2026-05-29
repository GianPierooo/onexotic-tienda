import type { Producto } from '@/lib/queries';

/**
 * Variante de color de un producto. Vive en la columna JSONB
 * `productos.variantes`. El stock NO se controla por color (se controla por
 * talla, una fila por talla en `productos`); el color es una variante
 * visual con su propio set de imágenes.
 */
export type ColorVariante = {
  color: string;
  hex: string;
  imagenes_url: string[];
};

const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

/**
 * Normaliza el JSONB `variantes` (de origen no confiable) a un array de
 * ColorVariante válido. Descarta entradas mal formadas en vez de romper.
 */
export function parseVariantes(raw: unknown): ColorVariante[] {
  if (!Array.isArray(raw)) return [];
  const out: ColorVariante[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const v = item as Record<string, unknown>;
    const color = typeof v.color === 'string' ? v.color.trim() : '';
    const hex = typeof v.hex === 'string' && HEX_RE.test(v.hex.trim()) ? v.hex.trim() : '#888888';
    const imagenes = Array.isArray(v.imagenes_url)
      ? v.imagenes_url.filter((u): u is string => typeof u === 'string' && u.length > 0)
      : [];
    if (!color || imagenes.length === 0) continue;
    out.push({ color, hex, imagenes_url: imagenes.slice(0, 5) });
  }
  return out;
}

/** Variantes de color de un producto (vacío si es de un solo color). */
export function colorVariantsFor(p: Pick<Producto, 'variantes'>): ColorVariante[] {
  return parseVariantes(p.variantes);
}
