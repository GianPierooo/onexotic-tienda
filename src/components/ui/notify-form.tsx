'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';

type Props = { dropId: string | null; variant?: 'inline' | 'block' };
type Status = 'idle' | 'sending' | 'ok' | 'error';

export function NotifyForm({ dropId, variant = 'block' }: Props) {
  const t = useTranslations('archive.notify');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      setErrorMsg(t('invalid'));
      return;
    }
    setStatus('sending');
    setErrorMsg(null);
    const supabase = createClient();
    const payload = { email: trimmed, drop_id: dropId };
    const { error } = await supabase.from('avisos_drop').insert(payload as never);
    if (error && !/duplicate|unique/i.test(error.message)) {
      setStatus('error');
      setErrorMsg(error.message);
      return;
    }
    setStatus('ok');
    setEmail('');
  }

  if (status === 'ok') {
    return (
      <div className="inline-flex items-center gap-2 border border-fire px-4 py-3 font-mono text-[10px] uppercase tracking-ritual text-fire">
        ✦ {t('done')}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={onSubmit} className="flex w-full border border-border bg-bg">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('placeholder')}
          aria-label={t('placeholder')}
          className="flex-1 bg-transparent px-3.5 py-3 font-body text-[13px] tracking-wide text-fg outline-none placeholder:text-silver-dim"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-fire px-5 font-body text-[10px] font-bold uppercase tracking-ritual text-on-fire disabled:opacity-60"
        >
          {status === 'sending' ? '…' : t('cta')}
        </button>
      </form>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex w-full max-w-sm flex-col gap-2.5"
    >
      <div className="flex border border-silver bg-bg/60">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('placeholder')}
          aria-label={t('placeholder')}
          className="flex-1 bg-transparent px-4 py-3.5 font-body text-[13px] tracking-wide text-fg outline-none placeholder:text-silver-dim"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-fire px-5 font-body text-xs font-bold uppercase tracking-ritual text-on-fire disabled:opacity-60"
        >
          {status === 'sending' ? '…' : t('cta')}
        </button>
      </div>
      {status === 'error' && errorMsg && (
        <p className="text-center font-mono text-[10px] uppercase tracking-ritual text-error">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
