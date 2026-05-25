import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';

export function Footer() {
  const t = useTranslations('footer');
  const tCommon = useTranslations('common');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-bg pb-24 md:pb-12">
      <div className="mx-auto grid max-w-screen-xl gap-10 px-6 py-12 md:grid-cols-4">
        <div>
          <p className="font-black text-3xl text-fg">OnExotic</p>
          <p className="mt-3 max-w-xs text-sm text-muted">{tCommon('tagline')}</p>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-ritual text-silver">{t('legal')}</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <Link href="/legal/terminos" className="hover:text-fg">
                {t('terms')}
              </Link>
            </li>
            <li>
              <Link href="/legal/privacidad" className="hover:text-fg">
                {t('privacy')}
              </Link>
            </li>
            <li>
              <Link href="/legal/cambios" className="hover:text-fg">
                {t('returns')}
              </Link>
            </li>
            <li>
              <Link href="/legal/envios" className="hover:text-fg">
                {t('shipping')}
              </Link>
            </li>
            <li>
              <Link href="/legal/reclamaciones" className="hover:text-fg">
                {t('claims')}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-ritual text-silver">{t('follow')}</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <a
                href="https://instagram.com/onexotic"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fg"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://tiktok.com/@onexotic"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fg"
              >
                TikTok
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com/onexotic"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fg"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-ritual text-silver">{t('contact')}</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <a href="mailto:onexotic2005@gmail.com" className="hover:text-fg">
                onexotic2005@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/51906517394"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fg"
              >
                WhatsApp +51 906 517 394
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-screen-xl flex-col items-start gap-2 px-6 py-6 font-mono text-[10px] uppercase tracking-ritual text-muted md:flex-row md:items-center md:justify-between">
          <span>© {year} OnExotic · {t('rights')}</span>
          <span>onexotic.shop</span>
        </div>
      </div>
    </footer>
  );
}
