'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import { Link } from '@/lib/i18n/routing';
import { GrainOverlay } from '@/components/ui/grain-overlay';

function getSiteBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (fromEnv) return fromEnv;
  if (typeof window !== 'undefined') return window.location.origin;
  return 'https://onexotic.shop';
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = 'idle' | 'sending' | 'sent' | 'invalid' | 'failed';

type Props = {
  /** 'page' renders the full hero card; 'inline' renders only the compact resend form. */
  variant?: 'page' | 'inline';
};

export function RequestResetForm({ variant = 'page' }: Props) {
  const t = useTranslations('auth.reset.request');
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setStatus('invalid');
      return;
    }
    setStatus('sending');
    try {
      const supabase = createClient();
      const redirectTo = `${getSiteBaseUrl()}/${locale}/auth/actualizar-password`;
      // No revelamos si el correo existe: mostramos el mismo mensaje neutro
      // tanto si la cuenta existe como si no.
      await supabase.auth.resetPasswordForEmail(value, { redirectTo });
      setStatus('sent');
    } catch {
      setStatus('failed');
    }
  }

  // Confirmación neutra: no revela si la cuenta existe.
  if (status === 'sent') {
    if (variant === 'inline') {
      return (
        <p className="mb-3 font-mono text-[10px] uppercase tracking-ritual text-success">
          {t('sentCopy')}
        </p>
      );
    }
    return (
      <section className="mx-auto max-w-md px-5 py-12">
        <div className="relative overflow-hidden border border-border bg-card p-6">
          <GrainOverlay />
          <div className="relative">
            <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-fire">
              <span className="block h-px w-3.5 bg-fire" />
              ✦ {t('sentEye')}
            </div>
            <h1 className="m-0 mb-4 font-goth text-5xl leading-none text-fg">
              {t('sentTitle')}
            </h1>
            <p className="mb-6 font-body text-sm text-muted">{t('sentCopy')}</p>
            <Link
              href="/cuenta/acceso"
              className="flex items-center justify-center border border-border bg-card-alt px-5 py-3.5 font-body text-xs font-extrabold uppercase tracking-[.22em] text-fg"
            >
              {t('backToLogin')}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const formBlock = (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-ritual text-silver">
          {t('email')}
        </span>
        <input
          type="email"
          value={email}
          required
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('emailPlaceholder')}
          className="h-12 border border-border bg-bg px-3.5 font-body text-sm text-fg placeholder:text-muted focus:border-fire focus:outline-none"
        />
      </label>

      {status === 'invalid' && (
        <p className="font-mono text-[10px] uppercase tracking-ritual text-error">
          {t('invalid')}
        </p>
      )}
      {status === 'failed' && (
        <p className="font-mono text-[10px] uppercase tracking-ritual text-error">
          {t('failed')}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-1 flex items-center justify-center bg-fire px-5 py-3.5 font-body text-xs font-extrabold uppercase tracking-[.22em] text-on-fire disabled:opacity-60"
      >
        {status === 'sending' ? t('sending') : t('cta')}
      </button>
    </form>
  );

  if (variant === 'inline') {
    return <div className="mb-3">{formBlock}</div>;
  }

  return (
    <section className="mx-auto max-w-md px-5 py-12">
      <div className="relative overflow-hidden border border-border bg-card p-6">
        <GrainOverlay />
        <div className="relative">
          <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
            <span className="block h-px w-3.5 bg-fire" />
            ✦ {t('eye')}
          </div>
          <h1 className="m-0 mb-3 font-goth text-5xl leading-none text-fg">
            {t('title')}
          </h1>
          <p className="mb-5 font-body text-sm text-muted">{t('copy')}</p>

          {formBlock}

          <Link
            href="/cuenta/acceso"
            className="mt-3 flex items-center justify-center border border-border bg-card-alt px-5 py-3.5 font-body text-xs font-extrabold uppercase tracking-[.22em] text-fg"
          >
            {t('backToLogin')}
          </Link>
        </div>
      </div>
    </section>
  );
}
