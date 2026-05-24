'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';

type Props = { dropId?: string | null };
type Status = 'idle' | 'sending' | 'ok' | 'error';

export function NewsletterCapture({ dropId }: Props) {
  const t = useTranslations('home.cult');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    const supabase = createClient();
    const payload = { email: trimmed, drop_id: dropId ?? null };
    const { error } = await supabase.from('avisos_drop').insert(payload as never);
    if (error && !/duplicate|unique/i.test(error.message)) {
      setStatus('error');
      return;
    }
    setStatus('ok');
    setEmail('');
  }

  return (
    <form onSubmit={onSubmit} className="flex border border-border bg-bg">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('placeholder')}
        aria-label={t('placeholder')}
        className="flex-1 bg-transparent px-3.5 py-3.5 font-body text-[13px] tracking-wide text-white outline-none placeholder:text-silver-dim"
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="bg-white px-5 font-body text-[11px] font-bold uppercase tracking-ritual text-bg disabled:opacity-50"
      >
        {status === 'ok' ? t('done') : t('cta')}
      </button>
      {status === 'error' && (
        <span className="sr-only">{t('error')}</span>
      )}
    </form>
  );
}
