'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Link } from '@/lib/i18n/routing';
import { GrainOverlay } from '@/components/ui/grain-overlay';
import { RequestResetForm } from '../recuperar/request-reset-form';

type Phase = 'verifying' | 'ready' | 'success' | 'expired';

function Card({ children }: { children: ReactNode }) {
  return (
    <section className="mx-auto max-w-md px-5 py-12">
      <div className="relative overflow-hidden border border-border bg-card p-6">
        <GrainOverlay />
        <div className="relative">{children}</div>
      </div>
    </section>
  );
}

export function UpdatePasswordForm() {
  const t = useTranslations('auth.reset.update');
  const tReq = useTranslations('auth.reset.request');
  const locale = useLocale();
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('verifying');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [saving, setSaving] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const redirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const supabase = createClient();
    let settled = false;
    const settle = (p: Phase) => {
      if (!settled) {
        settled = true;
        setPhase(p);
      }
    };

    // El enlace del correo crea una sesión de recuperación. Escuchamos el
    // evento por si llega después de getSession.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) settle('ready');
    });

    // getSession espera a que el cliente procese el `?code=` del enlace
    // (flujo PKCE) y devuelva la sesión de recuperación si el enlace es válido.
    supabase.auth
      .getSession()
      .then(({ data }) => settle(data.session ? 'ready' : 'expired'))
      .catch(() => settle('expired'));

    return () => {
      subscription.unsubscribe();
      if (redirectTimer.current) clearTimeout(redirectTimer.current);
    };
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFieldError(null);
    if (password.length < 6) {
      setFieldError(t('tooShort'));
      return;
    }
    if (password !== confirm) {
      setFieldError(t('mismatch'));
      return;
    }
    setSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setFieldError(t('failed'));
        setSaving(false);
        return;
      }
      setPhase('success');
      redirectTimer.current = setTimeout(() => {
        router.push(`/${locale}/cuenta`);
        router.refresh();
      }, 1600);
    } catch {
      setFieldError(t('failed'));
      setSaving(false);
    }
  }

  if (phase === 'verifying') {
    return (
      <Card>
        <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
          <span className="block h-px w-3.5 bg-fire" />
          ✦ {t('verifyingEye')}
        </div>
        <h1 className="m-0 mb-4 font-goth text-5xl leading-none text-fg">
          {t('verifyingTitle')}
        </h1>
        <p className="font-body text-sm text-muted">{t('verifyingCopy')}</p>
      </Card>
    );
  }

  if (phase === 'success') {
    return (
      <Card>
        <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-fire">
          <span className="block h-px w-3.5 bg-fire" />
          ✦ {t('successEye')}
        </div>
        <h1 className="m-0 mb-4 font-goth text-5xl leading-none text-fg">
          {t('successTitle')}
        </h1>
        <p className="mb-6 font-body text-sm text-muted">{t('successCopy')}</p>
        <Link
          href="/cuenta"
          className="flex items-center justify-center bg-fire px-5 py-3.5 font-body text-xs font-extrabold uppercase tracking-[.22em] text-on-fire"
        >
          {t('goToAccount')} →
        </Link>
      </Card>
    );
  }

  if (phase === 'expired') {
    return (
      <Card>
        <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
          <span className="block h-px w-3.5 bg-fire" />
          ✦ {t('expiredEye')}
        </div>
        <h1 className="m-0 mb-4 font-goth text-5xl leading-none text-fg">
          {t('expiredTitle')}
        </h1>
        <p className="mb-5 font-body text-sm text-muted">{t('expiredCopy')}</p>

        <div className="mb-3 font-mono text-[10px] uppercase tracking-ritual text-silver">
          ✦ {t('resendEye')}
        </div>
        <RequestResetForm variant="inline" />

        <Link
          href="/cuenta/acceso"
          className="flex items-center justify-center border border-border bg-card-alt px-5 py-3.5 font-body text-xs font-extrabold uppercase tracking-[.22em] text-fg"
        >
          {tReq('backToLogin')}
        </Link>
      </Card>
    );
  }

  // phase === 'ready'
  return (
    <Card>
      <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
        <span className="block h-px w-3.5 bg-fire" />
        ✦ {t('readyEye')}
      </div>
      <h1 className="m-0 mb-3 font-goth text-5xl leading-none text-fg">
        {t('readyTitle')}
      </h1>
      <p className="mb-5 font-body text-sm text-muted">{t('readyCopy')}</p>

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-ritual text-silver">
            {t('newPassword')}
          </span>
          <input
            type="password"
            value={password}
            required
            minLength={6}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="h-12 border border-border bg-bg px-3.5 font-body text-sm text-fg placeholder:text-muted focus:border-fire focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-ritual text-silver">
            {t('confirmPassword')}
          </span>
          <input
            type="password"
            value={confirm}
            required
            minLength={6}
            autoComplete="new-password"
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
            className="h-12 border border-border bg-bg px-3.5 font-body text-sm text-fg placeholder:text-muted focus:border-fire focus:outline-none"
          />
        </label>

        {fieldError && (
          <p className="font-mono text-[10px] uppercase tracking-ritual text-error">
            {fieldError}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="mt-1 flex items-center justify-center bg-fire px-5 py-3.5 font-body text-xs font-extrabold uppercase tracking-[.22em] text-on-fire disabled:opacity-60"
        >
          {saving ? t('saving') : t('cta')}
        </button>
      </form>
    </Card>
  );
}
