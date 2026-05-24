'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link, useRouter, usePathname } from '@/lib/i18n/routing';
import { CloseIcon, GlobeIcon, MenuIcon } from '@/components/icons';
import { localeLabels, locales, type Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';

type LinkItem = {
  href: '/' | '/tienda' | '/drops' | '/lookbook' | '/marca' | '/cuenta';
  key:
    | 'home'
    | 'catalog'
    | 'archive'
    | 'lookbook'
    | 'story'
    | 'account';
};

const LINKS: readonly LinkItem[] = [
  { href: '/', key: 'home' },
  { href: '/tienda', key: 'catalog' },
  { href: '/drops', key: 'archive' },
  { href: '/lookbook', key: 'lookbook' },
  { href: '/marca', key: 'story' },
  { href: '/cuenta', key: 'account' },
] as const;

export function MobileMenu() {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  function switchTo(target: Locale) {
    setOpen(false);
    router.replace(pathname, { locale: target });
  }

  return (
    <>
      <button
        type="button"
        aria-label={t('menu')}
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="-ml-1 flex h-10 w-10 items-center justify-center text-white hover:text-silver md:hidden"
      >
        <MenuIcon />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-50 md:hidden"
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.28, ease: 'easeOut' }}
              className="relative ml-0 flex h-full w-[86%] max-w-[360px] flex-col border-r border-border bg-bg"
            >
              <div className="flex h-14 items-center justify-between border-b border-border px-4">
                <span className="font-black text-2xl text-white">OnExotic</span>
                <button
                  type="button"
                  aria-label={t('menu')}
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center text-white"
                >
                  <CloseIcon />
                </button>
              </div>

              <nav className="flex flex-col px-2 py-3">
                {LINKS.map(({ href, key }) => {
                  const active =
                    href === '/'
                      ? pathname === '/'
                      : pathname.startsWith(href);
                  return (
                    <Link
                      key={key}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center justify-between border-b border-border px-3 py-4 font-body text-base uppercase tracking-wide',
                        active ? 'text-white' : 'text-muted hover:text-white'
                      )}
                    >
                      <span>{t(key)}</span>
                      {active && (
                        <span className="block h-1.5 w-1.5 rounded-full bg-fire" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto border-t border-border p-4">
                <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
                  <GlobeIcon size={14} />
                  {t('language')}
                </div>
                <div className="flex gap-2">
                  {locales.map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => switchTo(l)}
                      aria-pressed={l === locale}
                      className={cn(
                        'flex-1 border px-3 py-3 text-left font-mono text-[11px] uppercase tracking-ritual transition-colors',
                        l === locale
                          ? 'border-fire bg-card text-white'
                          : 'border-border bg-transparent text-muted hover:text-white'
                      )}
                    >
                      <div className="font-body text-[13px] font-bold normal-case tracking-normal text-white">
                        {localeLabels[l]}
                      </div>
                      <div className="mt-0.5 text-silver">{l}</div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
