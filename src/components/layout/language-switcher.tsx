'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/lib/i18n/routing';
import { localeLabels, locales, type Locale } from '@/lib/i18n/config';
import { GlobeIcon } from '@/components/icons';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'pill' | 'icon';

export function LanguageSwitcher({
  className,
  variant = 'pill',
}: {
  className?: string;
  variant?: Variant;
}) {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function switchTo(target: Locale) {
    setOpen(false);
    router.replace(pathname, { locale: target });
  }

  const triggerClass =
    variant === 'icon'
      ? 'flex h-10 w-10 items-center justify-center text-fg hover:text-silver'
      : 'flex h-9 items-center gap-2 rounded-full border border-border px-3 text-xs font-mono uppercase tracking-ritual text-silver hover:border-silver hover:text-fg';

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        aria-label={t('language')}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={triggerClass}
      >
        <GlobeIcon size={variant === 'icon' ? 16 : 14} />
        {variant === 'pill' && locale}
        {variant === 'icon' && (
          <span className="ml-0.5 font-mono text-[9px] uppercase tracking-ritual text-silver">
            {locale}
          </span>
        )}
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-11 z-30 min-w-[140px] overflow-hidden rounded-md border border-border bg-card shadow-xl"
        >
          {locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                onClick={() => switchTo(l)}
                className={cn(
                  'flex w-full items-center justify-between px-4 py-3 text-left text-sm font-body transition-colors hover:bg-card-alt',
                  l === locale ? 'text-fg' : 'text-muted'
                )}
              >
                <span>{localeLabels[l]}</span>
                <span className="font-mono text-[10px] uppercase tracking-ritual text-silver">
                  {l}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
