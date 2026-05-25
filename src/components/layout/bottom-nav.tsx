'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/lib/i18n/routing';
import { BagIcon, FlameIcon, GridIcon, HomeIcon, UserIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import type { ComponentType, SVGProps } from 'react';

type Item = {
  href: '/' | '/tienda' | '/drops' | '/cuenta' | '/carrito';
  key: 'home' | 'catalog' | 'drop' | 'account' | 'bag';
  Icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  highlight?: boolean;
};

const ITEMS: readonly Item[] = [
  { href: '/', key: 'home', Icon: HomeIcon },
  { href: '/tienda', key: 'catalog', Icon: GridIcon },
  { href: '/drops', key: 'drop', Icon: FlameIcon, highlight: true },
  { href: '/cuenta', key: 'account', Icon: UserIcon },
  { href: '/carrito', key: 'bag', Icon: BagIcon },
] as const;

export function BottomNav() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  return (
    <nav
      aria-label={t('menu')}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 backdrop-blur-md md:hidden safe-bottom"
    >
      <ul className="mx-auto grid max-w-screen-md grid-cols-5">
        {ITEMS.map(({ href, key, Icon, highlight }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <li key={key}>
              <Link
                href={href}
                className={cn(
                  'flex h-[72px] flex-col items-center justify-center gap-1 text-[10px] uppercase tracking-ritual font-mono transition-colors',
                  active ? 'text-fg' : 'text-muted',
                  highlight && !active && 'text-silver'
                )}
              >
                <Icon
                  size={22}
                  className={cn(highlight && active && 'text-fire animate-pulse-fire')}
                />
                <span>{t(key)}</span>
                {active && <span className="mt-0.5 h-px w-6 bg-fire" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
