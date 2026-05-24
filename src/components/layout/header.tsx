import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { UserIcon } from '@/components/icons';
import { LanguageSwitcher } from './language-switcher';
import { BagBadge } from './bag-badge';
import { MobileMenu } from './mobile-menu';
import { SearchOverlay } from './search-overlay';

export function Header() {
  const t = useTranslations('nav');

  return (
    <header
      className="sticky top-0 z-30 border-b border-border bg-bg/85 backdrop-blur-md"
      style={{ backgroundColor: 'rgba(10,10,10,0.86)' }}
    >
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4 md:px-6">
        {/* Izquierda: menú móvil + búsqueda desktop */}
        <div className="flex items-center gap-2">
          <MobileMenu />
          <SearchOverlay className="hidden h-10 w-10 items-center justify-center text-white hover:text-silver md:flex" />
        </div>

        {/* Centro: logo */}
        <Link
          href="/"
          aria-label="OnExotic"
          className="flex items-center"
        >
          <Image
            src="/logo.png"
            alt="OnExotic"
            width={160}
            height={40}
            priority
            className="h-8 w-auto md:h-10"
          />
        </Link>

        {/* Derecha: buscador móvil + idioma + user + bolsa */}
        <div className="flex items-center gap-1">
          <SearchOverlay className="flex h-10 w-10 items-center justify-center text-white hover:text-silver md:hidden" />
          <LanguageSwitcher variant="icon" className="md:hidden" />
          <LanguageSwitcher className="hidden md:block" />
          <Link
            href="/cuenta"
            aria-label={t('account')}
            className="flex h-10 w-10 items-center justify-center text-white hover:text-silver"
          >
            <UserIcon />
          </Link>
          <BagBadge />
        </div>
      </div>

      {/* Desktop nav row */}
      <nav className="hidden border-t border-border md:block">
        <div className="mx-auto flex max-w-screen-xl items-center gap-6 px-6 py-3 font-mono text-[11px] uppercase tracking-ritual text-silver">
          <Link href="/tienda" className="hover:text-white">
            {t('catalog')}
          </Link>
          <Link href="/drops" className="hover:text-white">
            {t('archive')}
          </Link>
          <Link href="/lookbook" className="hover:text-white">
            {t('lookbook')}
          </Link>
          <Link href="/marca" className="hover:text-white">
            {t('story')}
          </Link>
        </div>
      </nav>
    </header>
  );
}
