'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CloseIcon } from '@/components/icons';

export function SizeGuide() {
  const t = useTranslations('product.guide');
  const [open, setOpen] = useState(false);

  const rows: Array<[string, string, string, string]> = [
    ['XS', '46', '94', '64'],
    ['S', '48', '100', '66'],
    ['M', '50', '106', '68'],
    ['L', '52', '112', '70'],
    ['XL', '54', '118', '72'],
    ['XXL', '56', '124', '74'],
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 border-b border-fire pb-0.5 font-mono text-[10px] uppercase tracking-ritual text-fg"
      >
        â—‡ {t('cta')}
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
            className="relative max-h-[85vh] w-full max-w-md overflow-y-auto border border-border bg-card p-5 text-fg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="cerrar"
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
            <div className="overflow-x-auto">
              <table className="w-full border-collapse font-mono text-[11px]">
                <thead>
                  <tr className="border-b border-border text-left text-silver">
                    <th className="py-2 pr-3 font-normal uppercase tracking-ritual">
                      {t('size')}
                    </th>
                    <th className="py-2 pr-3 font-normal uppercase tracking-ritual">
                      {t('chest')}
                    </th>
                    <th className="py-2 pr-3 font-normal uppercase tracking-ritual">
                      {t('length')}
                    </th>
                    <th className="py-2 font-normal uppercase tracking-ritual">
                      {t('sleeve')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(([talla, p, l, m]) => (
                    <tr key={talla} className="border-b border-border/60">
                      <td className="py-2 pr-3 font-bold text-fg">{talla}</td>
                      <td className="py-2 pr-3 text-fg/85">{p}</td>
                      <td className="py-2 pr-3 text-fg/85">{l}</td>
                      <td className="py-2 text-fg/85">{m}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
