'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { BagIcon } from '@/components/icons';
import { useCart } from '@/lib/cart/cart-context';

export function BagBadge() {
  const t = useTranslations('nav');
  const { count, hydrated } = useCart();
  const show = hydrated && count > 0;

  return (
    <Link
      href="/carrito"
      aria-label={t('bag')}
      className="relative flex h-10 w-10 items-center justify-center text-white hover:text-silver"
    >
      <BagIcon />
      {show && (
        <span
          className="absolute -right-1 -top-0.5 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-fire px-1 font-mono text-[10px] font-bold leading-none text-white"
          aria-label={`${count} ${t('bag')}`}
        >
          {count}
        </span>
      )}
    </Link>
  );
}
