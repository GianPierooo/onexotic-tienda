'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { GrainOverlay } from '@/components/ui/grain-overlay';

type Mode = 'login' | 'signup';
type Status = 'idle' | 'sending' | 'error' | 'check_email';

type Props = { next: string; initialMode: Mode };

export function AuthForm({ next, initialMode }: Props) {
  const t = useTranslations('auth');
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    email: '',
    password: '',
  });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg(null);
    const supabase = createClient();

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email.trim(),
        password: form.password,
      });
      if (error) {
        setStatus('error');
        setErrorMsg(error.message);
        return;
      }
      router.push(next);
      router.refresh();
    } else {
      const { data, error } = await supabase.auth.signUp({
        email: form.email.trim(),
        password: form.password,
        options: {
          data: { nombre: form.nombre, telefono: form.telefono },
        },
      });
      if (error) {
        setStatus('error');
        setErrorMsg(error.message);
        return;
      }
      if (data.session) {
        router.push(next);
        router.refresh();
      } else {
        setStatus('check_email');
      }
    }
  }

  if (status === 'check_email') {
    return (
      <section className="mx-auto max-w-md px-5 py-16 text-center">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-ritual text-fire">
          ✦ {t('check.eye')}
        </div>
        <h1 className="m-0 mb-4 font-goth text-5xl leading-none text-white">
          {t('check.title')}
        </h1>
        <p className="font-body text-sm text-muted">
          {t('check.copy', { email: form.email })}
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-md px-5 py-12">
      <div className="relative overflow-hidden border border-border bg-card p-6">
        <GrainOverlay />
        <div className="relative">
          <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
            <span className="block h-px w-3.5 bg-fire" />
            ✦ {t('eyebrow')}
          </div>
          <h1 className="m-0 mb-5 font-goth text-5xl leading-none text-white">
            {mode === 'login' ? t('loginTitle') : t('signupTitle')}
          </h1>

          <div className="mb-5 flex border border-border">
            <Tab
              active={mode === 'login'}
              onClick={() => setMode('login')}
              label={t('tabs.login')}
            />
            <Tab
              active={mode === 'signup'}
              onClick={() => setMode('signup')}
              label={t('tabs.signup')}
            />
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            {mode === 'signup' && (
              <>
                <Field
                  label={t('name')}
                  value={form.nombre}
                  required
                  onChange={(v) => setForm((f) => ({ ...f, nombre: v }))}
                  placeholder="Tu nombre"
                />
                <Field
                  label={t('phone')}
                  value={form.telefono}
                  onChange={(v) => setForm((f) => ({ ...f, telefono: v }))}
                  placeholder="+51 …"
                  type="tel"
                />
              </>
            )}
            <Field
              label={t('email')}
              type="email"
              value={form.email}
              required
              onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              placeholder="tu@correo.pe"
              autoComplete="email"
            />
            <Field
              label={t('password')}
              type="password"
              value={form.password}
              required
              onChange={(v) => setForm((f) => ({ ...f, password: v }))}
              placeholder="••••••••"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              minLength={6}
            />

            {status === 'error' && errorMsg && (
              <p className="font-mono text-[10px] uppercase tracking-ritual text-error">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-2 flex items-center justify-center bg-fire px-5 py-3.5 font-body text-xs font-extrabold uppercase tracking-[.22em] text-white disabled:opacity-60"
            >
              {status === 'sending'
                ? t('sending')
                : mode === 'login'
                  ? t('login')
                  : t('signup')}
            </button>
          </form>
        </div>
      </div>
    </section>
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
      className="flex-1 px-3 py-2.5 font-mono text-[10px] uppercase tracking-ritual transition-colors"
      style={{
        background: active ? '#1E1E1E' : 'transparent',
        color: active ? '#FFFFFF' : '#888888',
        borderBottom: active ? '2px solid #B81414' : 'none',
      }}
    >
      {label}
    </button>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  minLength?: number;
};

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
  autoComplete,
  minLength,
}: FieldProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-ritual text-silver">
        {label}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        minLength={minLength}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 border border-border bg-bg px-3.5 font-body text-sm text-white placeholder:text-muted focus:border-fire focus:outline-none"
      />
    </label>
  );
}
