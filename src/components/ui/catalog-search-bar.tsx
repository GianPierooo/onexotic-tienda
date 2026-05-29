'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/lib/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { CloseIcon, SearchIcon } from '@/components/icons';

type Props = { initialQuery: string };

export function CatalogSearchBar({ initialQuery }: Props) {
  const t = useTranslations('search');
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [value, setValue] = useState(initialQuery);

  // Mantener el input sincronizado cuando cambia el ?q= por otra vía.
  useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  function navigate(next: string) {
    const search = new URLSearchParams(params.toString());
    if (next) search.set('q', next);
    else search.delete('q');
    const qs = search.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    navigate(value.trim());
  }

  function clear() {
    setValue('');
    navigate('');
  }

  return (
    <div className="border-b border-border bg-bg/85 backdrop-blur-sm">
      <form onSubmit={onSubmit} className="flex items-center gap-2 px-4 py-3">
        <label className="flex flex-1 items-center gap-2 border border-border bg-bg px-3">
          <SearchIcon size={16} />
          <input
            type="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={t('placeholder')}
            aria-label={t('label')}
            className="flex-1 bg-transparent py-2.5 font-body text-[13px] tracking-wide text-fg outline-none placeholder:text-silver-dim"
          />
          {value && (
            <button
              type="button"
              onClick={clear}
              aria-label={t('clear')}
              className="-mr-1 p-1 text-muted hover:text-fire"
            >
              <CloseIcon size={14} />
            </button>
          )}
        </label>
        <button
          type="submit"
          className="border border-fire bg-fire px-3 py-2.5 font-mono text-[10px] font-bold uppercase tracking-ritual text-on-fire"
        >
          {t('cta')}
        </button>
      </form>
      {initialQuery && (
        <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
          <span>
            {t('results')} ·{' '}
            <span className="text-fg">&ldquo;{initialQuery}&rdquo;</span>
          </span>
          <button
            type="button"
            onClick={clear}
            className="border-b border-fire pb-0.5 text-fire"
          >
            {t('clear')}
          </button>
        </div>
      )}
    </div>
  );
}
