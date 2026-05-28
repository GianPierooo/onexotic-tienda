'use client';

import { useState, useTransition, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { sendContactMessage } from '@/lib/contact-actions';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const t = useTranslations('contact.form');
  const [pending, startTransition] = useTransition();
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', mensaje: '' });

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!EMAIL_RE.test(form.email.trim())) {
      setError(t('errors.email'));
      return;
    }
    if (!form.nombre.trim() || !form.mensaje.trim()) {
      setError(t('errors.missing'));
      return;
    }
    startTransition(async () => {
      const res = await sendContactMessage(form);
      if (!res.ok) {
        setError(t('errors.failed'));
        return;
      }
      setDone(true);
    });
  }

  if (done) {
    return (
      <div className="border border-fire bg-card-alt p-4">
        <p className="m-0 font-mono text-[10px] uppercase tracking-ritual text-fire">
          ✦ {t('successEye')}
        </p>
        <p className="m-0 mt-1 font-body text-[13px] text-fg">{t('successCopy')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <div className="grid gap-3 md:grid-cols-2">
        <Field label={t('name')} value={form.nombre} onChange={(v) => set('nombre', v)} required />
        <Field label={t('email')} value={form.email} onChange={(v) => set('email', v)} type="email" required autoComplete="email" />
      </div>
      <Field label={t('subject')} value={form.asunto} onChange={(v) => set('asunto', v)} />
      <label className="flex flex-col gap-1">
        <span className="font-mono text-[9px] uppercase tracking-ritual text-silver">
          {t('message')}
        </span>
        <textarea
          value={form.mensaje}
          onChange={(e) => set('mensaje', e.target.value)}
          required
          rows={5}
          className="border border-border bg-bg p-3 font-body text-[13px] text-fg placeholder:text-muted focus:border-fire focus:outline-none"
          placeholder={t('messagePlaceholder')}
        />
      </label>

      {error && (
        <p className="font-mono text-[10px] uppercase tracking-ritual text-error" aria-live="polite">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="bg-fire px-5 py-3 font-body text-xs font-extrabold uppercase tracking-[.22em] text-on-fire disabled:opacity-60"
      >
        {pending ? t('sending') : t('submit')}
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-mono text-[9px] uppercase tracking-ritual text-silver">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        className="h-11 border border-border bg-bg px-3 font-body text-[13px] text-fg placeholder:text-muted focus:border-fire focus:outline-none"
      />
    </label>
  );
}
