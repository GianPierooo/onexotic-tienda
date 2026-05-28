'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { CheckoutView } from './checkout-view';
import { GuestCheckoutView } from './guest-checkout-view';
import type { Tables } from '@/lib/supabase/database.types';

type Direccion = Tables<'direcciones'>;
type Mode = 'guest' | 'auth';

type Props = {
  locale: string;
  direcciones: Direccion[];
  userEmail: string | null;
};

export function CheckoutGate({ locale, direcciones, userEmail }: Props) {
  const t = useTranslations('checkout.gate');
  const [mode, setMode] = useState<Mode>(userEmail ? 'auth' : 'guest');

  if (userEmail) {
    return (
      <CheckoutView
        locale={locale}
        direcciones={direcciones}
        userEmail={userEmail}
      />
    );
  }

  return (
    <>
      <header className="border-b border-border bg-bg/92 px-4 py-5 backdrop-blur-md">
        <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
          <span className="block h-px w-3.5 bg-fire" />
          {t('eyebrow')}
        </div>
        <h1 className="m-0 font-black font-normal leading-[0.9] text-fg text-[54px]">
          {t('title')}
        </h1>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-ritual text-muted">
          {t('subtitle')}
        </p>
      </header>

      <div className="mx-4 mt-4 flex border border-border">
        <Tab
          active={mode === 'guest'}
          onClick={() => setMode('guest')}
          label={t('tabs.guest')}
        />
        <Tab
          active={mode === 'auth'}
          onClick={() => setMode('auth')}
          label={t('tabs.login')}
        />
      </div>

      {mode === 'guest' ? (
        <GuestCheckoutView locale={locale} />
      ) : (
        <div className="mx-4 mt-4 border border-border bg-card p-5 text-center">
          <p className="font-body text-sm text-muted">{t('loginCopy')}</p>
          <Link
            href={`/cuenta/acceso?next=${encodeURIComponent(`/${locale}/checkout`)}`}
            className="mt-3 inline-flex items-center justify-center bg-fire px-5 py-3 font-body text-xs font-extrabold uppercase tracking-[.22em] text-on-fire"
          >
            {t('loginCta')} →
          </Link>
        </div>
      )}
    </>
  );
}

function Tab({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 px-3 py-3 font-mono text-[10px] font-bold uppercase tracking-ritual"
      style={{
        background: active ? 'var(--color-surface-alt)' : 'transparent',
        color: active ? 'var(--color-fg)' : 'var(--color-muted)',
        borderBottom: active ? '2px solid var(--color-fire)' : 'none',
      }}
    >
      {label}
    </button>
  );
}
