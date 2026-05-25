'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/lib/i18n/routing';
import { CloseIcon, SearchIcon } from '@/components/icons';

type Props = {
  className?: string;
};

export function SearchOverlay({ className }: Props) {
  const t = useTranslations('nav');
  const tSearch = useTranslations('search');
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const id = setTimeout(() => inputRef.current?.focus(), 80);
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(id);
    };
  }, [open]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const term = q.trim();
    setOpen(false);
    router.push(term ? `/tienda?q=${encodeURIComponent(term)}` : '/tienda');
  }

  return (
    <>
      <button
        type="button"
        aria-label={t('search')}
        onClick={() => setOpen(true)}
        className={
          className ??
          'flex h-10 w-10 items-center justify-center text-fg hover:text-silver'
        }
      >
        <SearchIcon />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="search-overlay"
            className="fixed inset-0 z-50"
            aria-modal="true"
            role="dialog"
            aria-label={tSearch('label')}
          >
            <motion.div
              className="absolute inset-0 bg-bg/85 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="relative mx-auto mt-20 w-[92%] max-w-xl border border-border bg-card p-5 text-fg"
            >
              <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-ritual text-silver">
                <span className="flex items-center gap-2">
                  <span className="block h-px w-3.5 bg-fire" />
                  {tSearch('eyebrow')}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={tSearch('close')}
                  className="text-fg"
                >
                  <CloseIcon size={18} />
                </button>
              </div>
              <h2 className="m-0 mb-4 font-goth text-3xl leading-none text-fg">
                {tSearch('title')}
              </h2>
              <form onSubmit={onSubmit} className="flex border border-border bg-bg">
                <input
                  ref={inputRef}
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={tSearch('placeholder')}
                  aria-label={tSearch('placeholder')}
                  className="flex-1 bg-transparent px-3.5 py-3.5 font-body text-[14px] tracking-wide text-fg outline-none placeholder:text-silver-dim"
                />
                <button
                  type="submit"
                  className="bg-fire px-5 font-body text-xs font-bold uppercase tracking-ritual text-on-fire"
                >
                  {tSearch('cta')}
                </button>
              </form>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-ritual text-muted">
                {tSearch('hint')}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
