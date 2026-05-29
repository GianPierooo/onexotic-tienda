'use client';

import { useTranslations } from 'next-intl';
import { useProductColor } from './product-color-context';

/**
 * Selector de color (muestras) para el detalle de producto. Al elegir un
 * color, el contexto cambia la galería al set de imágenes de esa variante.
 * No renderiza nada si el producto tiene 0 o 1 color.
 */
export function ColorSelector() {
  const t = useTranslations('product');
  const { colors, index, setIndex, colorName } = useProductColor();

  if (colors.length <= 1) return null;

  return (
    <section className="px-5 pb-1 pt-1">
      <div className="mb-2.5 flex items-baseline justify-between">
        <div className="font-mono text-[10px] uppercase tracking-ritual text-silver">
          {t('color.label')}{' '}
          <span className="text-fg">· {colorName ?? '—'}</span>
        </div>
        <div className="font-mono text-[9px] uppercase tracking-ritual text-muted">
          {t('color.count', { n: colors.length })}
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {colors.map((c, i) => {
          const active = i === index;
          return (
            <button
              key={`${c.color}-${i}`}
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={active}
              aria-label={c.color}
              title={c.color}
              className="group relative flex h-11 w-11 items-center justify-center rounded-full border transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fire"
              style={{
                borderColor: active ? 'var(--color-fire)' : 'var(--color-border)',
                boxShadow: active ? '0 0 0 1px var(--color-fire)' : 'none',
              }}
            >
              <span
                className="block h-7 w-7 rounded-full"
                style={{
                  background: c.hex,
                  // Borde sutil para que el blanco/negro no se pierdan sobre
                  // su propio fondo en claro u oscuro.
                  boxShadow: 'inset 0 0 0 1px rgba(128,128,128,.45)',
                }}
              />
              {active && (
                <span
                  aria-hidden
                  className="absolute -bottom-2 left-1/2 block h-[3px] w-4 -translate-x-1/2 bg-fire"
                />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

/**
 * Etiqueta del color activo para el encabezado. Cae al `fallback` (color de
 * fila) cuando el producto no tiene variantes de color.
 */
export function ColorName({ fallback }: { fallback: string | null }) {
  const { colorName } = useProductColor();
  return <>{colorName ?? fallback ?? ''}</>;
}
