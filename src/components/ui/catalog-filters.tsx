'use client';

import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/lib/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type Props = {
  tipos: string[];
  tallas: string[];
  colores: string[];
};

type Key = 'tipo' | 'talla' | 'color';

export function CatalogFilters({ tipos, tallas, colores }: Props) {
  const t = useTranslations('catalog.filters');
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const current = {
    tipo: params.get('tipo') ?? '',
    talla: params.get('talla') ?? '',
    color: params.get('color') ?? '',
  };

  const update = useCallback(
    (key: Key, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value && next.get(key) !== value) next.set(key, value);
      else next.delete(key);
      const qs = next.toString();
      router.push(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
    },
    [params, pathname, router]
  );

  const clear = () => {
    const next = new URLSearchParams(params.toString());
    next.delete('tipo');
    next.delete('talla');
    next.delete('color');
    const qs = next.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
  };

  const active =
    (current.tipo ? 1 : 0) + (current.talla ? 1 : 0) + (current.color ? 1 : 0);

  return (
    <div className="border-b border-border bg-bg/85 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3 px-4 pb-2.5 pt-3">
        <span className="font-mono text-[10px] uppercase tracking-ritual text-silver">
          {t('label')} · {active}
        </span>
        {active > 0 && (
          <button
            onClick={clear}
            className="border-b border-fire pb-0.5 font-mono text-[10px] uppercase tracking-ritual text-fire"
          >
            {t('clear')}
          </button>
        )}
      </div>
      <FilterRow
        title={t('type')}
        options={tipos}
        value={current.tipo}
        onChange={(v) => update('tipo', v)}
      />
      <FilterRow
        title={t('size')}
        options={tallas}
        value={current.talla}
        onChange={(v) => update('talla', v)}
      />
      <FilterRow
        title={t('color')}
        options={colores}
        value={current.color}
        onChange={(v) => update('color', v)}
      />
    </div>
  );
}

function FilterRow({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  if (options.length === 0) return null;
  return (
    <div className="flex items-center gap-2 overflow-x-auto px-4 pb-2.5">
      <span className="flex-none font-mono text-[9px] uppercase tracking-ritual text-muted">
        {title}
      </span>
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(active ? '' : opt)}
            className="flex-none border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-ritual transition-colors"
            style={{
              background: active ? '#1E1E1E' : 'transparent',
              borderColor: active ? '#B81414' : '#2A2A2A',
              color: '#FFFFFF',
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
