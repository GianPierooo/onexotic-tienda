'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { CloseIcon } from '@/components/icons';
import { useEscape, useBodyScrollLock, useFocusTrap } from '@/lib/hooks/use-escape';

type Unit = 'cm' | 'in';
type Category = 'tops' | 'pantalones' | 'shorts' | 'unica';

// Plantilla editable — medidas razonables genéricas para streetwear oversize.
// Ajustar a las medidas reales de cada drop cuando estén disponibles.
const TABLES: Record<
  Category,
  { headers: string[]; rows: Array<[string, ...string[]]> }
> = {
  tops: {
    // talla / pecho / largo / manga (cm)
    headers: ['size', 'chest', 'length', 'sleeve'],
    rows: [
      ['XS', '94', '64', '54'],
      ['S', '100', '66', '56'],
      ['M', '106', '68', '58'],
      ['L', '112', '70', '60'],
      ['XL', '118', '72', '62'],
      ['XXL', '124', '74', '64'],
    ],
  },
  pantalones: {
    // talla / cintura / cadera / largo total (cm)
    headers: ['size', 'waist', 'hip', 'length'],
    rows: [
      ['XS', '70', '92', '100'],
      ['S', '74', '96', '102'],
      ['M', '78', '100', '104'],
      ['L', '82', '104', '106'],
      ['XL', '86', '108', '108'],
      ['XXL', '90', '112', '110'],
    ],
  },
  shorts: {
    // talla / cintura / cadera / largo (cm)
    headers: ['size', 'waist', 'hip', 'length'],
    rows: [
      ['XS', '70', '92', '40'],
      ['S', '74', '96', '42'],
      ['M', '78', '100', '44'],
      ['L', '82', '104', '46'],
      ['XL', '86', '108', '48'],
      ['XXL', '90', '112', '50'],
    ],
  },
  unica: {
    headers: ['size', 'width', 'height'],
    rows: [['ÚNICA', '—', '—']],
  },
};

function cmToIn(cm: string): string {
  const n = Number(cm);
  if (!Number.isFinite(n)) return cm;
  return (n / 2.54).toFixed(1);
}

export function SizeGuide({ category = 'tops' }: { category?: Category }) {
  const t = useTranslations('product.guide');
  const [open, setOpen] = useState(false);
  const [unit, setUnit] = useState<Unit>('cm');
  const [tab, setTab] = useState<Category>(category);
  const panelRef = useRef<HTMLDivElement>(null);

  useEscape(open, () => setOpen(false));
  useBodyScrollLock(open);
  useFocusTrap(open, panelRef);

  const table = TABLES[tab];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 border-b border-fire pb-0.5 font-mono text-[10px] uppercase tracking-ritual text-fg"
      >
        ◇ {t('cta')}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-bg/80 backdrop-blur-sm md:items-center"
          role="dialog"
          aria-modal="true"
          aria-label={t('title')}
          onClick={() => setOpen(false)}
        >
          <div
            ref={panelRef}
            tabIndex={-1}
            className="relative max-h-[88vh] w-full max-w-md overflow-y-auto border border-border bg-card p-5 text-fg outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t('close')}
              className="absolute right-3 top-3 text-fg"
            >
              <CloseIcon size={20} />
            </button>
            <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
              <span className="block h-px w-3.5 bg-fire" />
              {t('eyebrow')}
            </div>
            <h2 className="m-0 mb-3 font-goth text-3xl leading-tight">
              {t('title')}
            </h2>
            <p className="mb-4 font-body text-xs leading-relaxed text-muted">
              {t('intro')}
            </p>

            {/* Tabs categoría */}
            <div className="mb-3 flex flex-wrap gap-1.5">
              {(['tops', 'pantalones', 'shorts', 'unica'] as Category[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setTab(c)}
                  className="border px-2.5 py-1 font-mono text-[9px] uppercase tracking-ritual"
                  style={{
                    background: tab === c ? 'var(--color-surface-alt)' : 'transparent',
                    borderColor: tab === c ? 'var(--color-fire)' : 'var(--color-border)',
                    color: tab === c ? 'var(--color-fg)' : 'var(--color-muted)',
                  }}
                >
                  {t(`cat.${c}`)}
                </button>
              ))}
            </div>

            {/* Toggle unidades */}
            <div className="mb-3 inline-flex border border-border" role="radiogroup" aria-label={t('unit')}>
              {(['cm', 'in'] as Unit[]).map((u) => (
                <button
                  key={u}
                  type="button"
                  role="radio"
                  aria-checked={unit === u}
                  onClick={() => setUnit(u)}
                  className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-ritual"
                  style={{
                    background: unit === u ? 'var(--color-fire)' : 'transparent',
                    color: unit === u ? 'var(--color-on-fire)' : 'var(--color-fg)',
                  }}
                >
                  {u}
                </button>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse font-mono text-[11px]">
                <thead>
                  <tr className="border-b border-border text-left text-silver">
                    {table.headers.map((h) => (
                      <th
                        key={h}
                        className="py-2 pr-3 font-normal uppercase tracking-ritual"
                      >
                        {t(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row) => (
                    <tr key={row[0]} className="border-b border-border/60">
                      <td className="py-2 pr-3 font-bold text-fg">{row[0]}</td>
                      {row.slice(1).map((val, i) => (
                        <td key={i} className="py-2 pr-3 text-fg/85">
                          {val === '—' ? val : unit === 'cm' ? val : cmToIn(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Instrucciones de cómo medirse */}
            <div className="mt-5 border-t border-border pt-4">
              <h3 className="m-0 mb-2 font-goth text-lg leading-tight">
                {t('howTitle')}
              </h3>
              <ul className="m-0 list-none space-y-1.5 font-body text-[12px] text-fg/85">
                <li>◦ {t('howChest')}</li>
                <li>◦ {t('howWaist')}</li>
                <li>◦ {t('howHip')}</li>
                <li>◦ {t('howLength')}</li>
              </ul>
            </div>

            <p className="mt-4 font-mono text-[9px] uppercase tracking-ritual text-silver">
              {t('note')}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
