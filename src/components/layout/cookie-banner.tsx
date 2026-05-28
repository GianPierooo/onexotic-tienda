'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { CloseIcon } from '@/components/icons';

const STORAGE_KEY = 'onexotic.cookies.v1';

export function CookieBanner() {
  const t = useTranslations('cookies');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  function dismiss() {
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t('eyebrow')}
      className="fixed inset-x-0 bottom-16 z-40 px-4 md:bottom-4 md:left-auto md:right-4 md:max-w-sm md:px-0"
    >
      <div
        className="relative border border-border bg-card p-4 text-fg shadow-[0_-4px_24px_rgba(0,0,0,.3)]"
        style={{ borderLeft: '2px solid var(--color-fire)' }}
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label={t('close')}
          className="absolute right-2 top-2 text-muted hover:text-fg"
        >
          <CloseIcon size={16} />
        </button>
        <div className="mb-1 font-mono text-[10px] uppercase tracking-ritual text-silver">
          ✦ {t('eyebrow')}
        </div>
        <p className="m-0 font-body text-[12.5px] leading-relaxed text-fg/90">
          {t('copy')}{' '}
          <Link href="/legal/privacidad" className="text-fire underline decoration-fire underline-offset-2">
            {t('link')}
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="mt-3 w-full bg-fire px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-ritual text-on-fire"
        >
          {t('accept')}
        </button>
      </div>
    </div>
  );
}
