'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { MoonIcon, SunIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

type Variant = 'icon' | 'block';

export function ThemeToggle({
  className,
  variant = 'icon',
}: {
  className?: string;
  variant?: Variant;
}) {
  const t = useTranslations('nav');
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Antes de montar evitamos pintar un icono cualquiera: queda un placeholder
  // del mismo tamaño para que no salte el layout. next-themes resuelve el
  // tema en cliente; el FOUC ya está cubierto por el script que inyecta.
  const isDark = mounted ? resolvedTheme !== 'light' : true;
  const next = isDark ? 'light' : 'dark';
  const label = isDark ? t('themeLight') : t('themeDark');

  function toggle() {
    setTheme(next);
  }

  if (variant === 'block') {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        aria-pressed={!isDark}
        className={cn(
          'flex w-full items-center justify-between border border-border bg-transparent px-3 py-3 font-mono text-[11px] uppercase tracking-ritual text-muted transition-colors hover:border-silver hover:text-fg',
          className
        )}
      >
        <span className="flex items-center gap-2 text-fg">
          {mounted && (isDark ? <MoonIcon size={14} /> : <SunIcon size={14} />)}
          <span className="font-body text-[13px] normal-case tracking-normal">
            {mounted ? (isDark ? t('themeDarkLabel') : t('themeLightLabel')) : t('themeDarkLabel')}
          </span>
        </span>
        <span className="text-silver">{mounted ? (isDark ? 'DARK' : 'LIGHT') : 'DARK'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={!isDark}
      className={cn(
        'flex h-10 w-10 items-center justify-center text-fg hover:text-silver',
        className
      )}
    >
      {/* Placeholder invisible para reservar espacio antes del mount. */}
      {!mounted ? (
        <span className="block h-[16px] w-[16px]" aria-hidden />
      ) : isDark ? (
        <SunIcon size={16} />
      ) : (
        <MoonIcon size={16} />
      )}
    </button>
  );
}
