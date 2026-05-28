import { useTranslations } from 'next-intl';

export function SkipLink() {
  const t = useTranslations('a11y');
  return (
    <a
      href="#contenido"
      className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:bg-fire focus:px-3 focus:py-2 focus:font-mono focus:text-[11px] focus:font-bold focus:uppercase focus:tracking-ritual focus:text-on-fire"
    >
      {t('skip')}
    </a>
  );
}
