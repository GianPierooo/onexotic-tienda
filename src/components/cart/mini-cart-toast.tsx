'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from '@/lib/i18n/routing';
import { useCart } from '@/lib/cart/cart-context';
import { formatSoles } from '@/lib/store-config';
import { CloseIcon } from '@/components/icons';

const AUTO_DISMISS_MS = 4500;

export function MiniCartToast() {
  const t = useTranslations('miniCart');
  const { lastAdded, dismissLastAdded, subtotal, count } = useCart();

  useEffect(() => {
    if (!lastAdded) return;
    const id = setTimeout(dismissLastAdded, AUTO_DISMISS_MS);
    return () => clearTimeout(id);
  }, [lastAdded, dismissLastAdded]);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-16 z-40 flex justify-center px-4 md:bottom-6"
    >
      <AnimatePresence>
        {lastAdded && (
          <motion.div
            key={lastAdded.productoId + lastAdded.talla}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="pointer-events-auto relative w-full max-w-md border border-border bg-card text-fg shadow-[0_-4px_28px_rgba(0,0,0,.32)]"
            style={{ borderLeft: '2px solid var(--color-fire)' }}
            role="status"
          >
            <button
              type="button"
              onClick={dismissLastAdded}
              aria-label={t('close')}
              className="absolute right-2 top-2 text-muted hover:text-fg"
            >
              <CloseIcon size={16} />
            </button>

            <div className="flex gap-3.5 p-3.5">
              <div
                className="relative h-[72px] w-[58px] shrink-0 overflow-hidden border border-border"
                style={{ background: 'var(--grad-tone-a)' }}
              >
                {lastAdded.imagen ? (
                  <Image
                    src={lastAdded.imagen}
                    alt={lastAdded.nombre}
                    fill
                    sizes="58px"
                    className="object-cover"
                  />
                ) : null}
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="font-mono text-[9px] uppercase tracking-ritual text-fire">
                  ✦ {t('added')}
                </div>
                <div className="mt-0.5 truncate font-goth text-[20px] leading-tight">
                  {lastAdded.nombre}
                </div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-ritual text-muted">
                  {t('size')} {lastAdded.talla} · {formatSoles(lastAdded.precio)}
                </div>
                <div className="mt-1.5 font-mono text-[10px] uppercase tracking-ritual text-silver">
                  {t('totals', { count, total: formatSoles(subtotal) })}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 border-t border-border">
              <button
                type="button"
                onClick={dismissLastAdded}
                className="border-r border-border px-3 py-3 font-mono text-[10px] font-bold uppercase tracking-ritual text-fg"
              >
                {t('keep')}
              </button>
              <Link
                href="/carrito"
                onClick={dismissLastAdded}
                className="flex items-center justify-center bg-fire px-3 py-3 font-mono text-[10px] font-bold uppercase tracking-ritual text-on-fire"
              >
                {t('view')} →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
