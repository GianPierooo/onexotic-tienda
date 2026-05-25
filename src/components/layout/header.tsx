import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { UserIcon } from '@/components/icons';
import { LanguageSwitcher } from './language-switcher';
import { BagBadge } from './bag-badge';
import { MobileMenu } from './mobile-menu';
import { SearchOverlay } from './search-overlay';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Logo } from './logo';

export function Header() {
  const t = useTranslations('nav');

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4 md:px-6">
        {/* Izquierda: menú móvil + búsqueda desktop */}
        <div className="flex items-center gap-2">
          <MobileMenu />
          <SearchOverlay className="hidden h-10 w-10 items-center justify-center text-fg hover:text-silver md:flex" />
        </div>

        {/* Centro: logo */}
        <Link href="/" aria-label="OnExotic" className="flex items-center">
          <Logo />
        </Link>

        {/* Derecha: buscador móvil + tema + idioma + user + bolsa */}
        <div className="flex items-center gap-1">
          <SearchOverlay className="flex h-10 w-10 items-center justify-center text-fg hover:text-silver md:hidden" />
          <ThemeToggle className="hidden md:flex" />
          <LanguageSwitcher variant="icon" className="md:hidden" />
          <LanguageSwitcher className="hidden md:block" />
          <Link
            href="/cuenta"
            aria-label={t('account')}
            className="flex h-10 w-10 items-center justify-center text-fg hover:text-silver"
          >
            <UserIcon />
          </Link>
          <BagBadge />
        </div>
      </div>

      {/* Desktop nav row */}
      <nav className="hidden border-t border-border md:block">
        <div className="mx-auto flex max-w-screen-xl items-center gap-6 px-6 py-3 font-mono text-[11px] uppercase tracking-ritual text-silver">
          <Link href="/tienda" className="hover:text-fg">
            {t('catalog')}
          </Link>
          <Link href="/drops" className="hover:text-fg">
            {t('archive')}
          </Link>
          <Link href="/lookbook" className="hover:text-fg">
            {t('lookbook')}
          </Link>
          <Link href="/marca" className="hover:text-fg">
            {t('story')}
          </Link>
        </div>
      </nav>
    </header>
  );
}
