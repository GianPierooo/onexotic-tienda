'use client';

import { useState, type FormEvent } from 'react';
import { createClient } from '@/lib/supabase/client';

function getSiteBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (fromEnv) return fromEnv;
  if (typeof window !== 'undefined') return window.location.origin;
  return 'https://onexotic.shop';
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = 'idle' | 'sending' | 'done' | 'invalid' | 'failed';

type Props = {
  eyebrow: string;
  placeholder: string;
  cta: string;
  sending: string;
  done: string;
  invalid: string;
  failed: string;
  locale: string;
};

export function ResendForm({
  eyebrow,
  placeholder,
  cta,
  sending,
  done,
  invalid,
  failed,
  locale,
}: Props) {
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
      const baseUrl = getSiteBaseUrl();
      const emailRedirectTo = `${baseUrl}/auth/callback?next=${encodeURIComponent(`/${locale}/cuenta`)}`;
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: value,
        options: { emailRedirectTo },
      });
      if (error) {
        setStatus('failed');
        return;
      }
      setStatus('done');
    } catch {
      setStatus('failed');
    }
  }

  return (
    <form onSubmit={onSubmit} className="mb-3 flex flex-col gap-2">
      <div className="font-mono text-[10px] uppercase tracking-ritual text-silver">
        ✦ {eyebrow}
      </div>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          autoComplete="email"
          required
          className="h-12 flex-1 border border-border bg-bg px-3.5 font-body text-sm text-fg placeholder:text-muted focus:border-fire focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'sending' || status === 'done'}
          className="bg-fire px-4 font-body text-xs font-extrabold uppercase tracking-[.22em] text-on-fire disabled:opacity-60"
        >
          {status === 'sending' ? sending : cta}
        </button>
      </div>
      {status === 'done' && (
        <p className="font-mono text-[10px] uppercase tracking-ritual text-success">
          {done}
        </p>
      )}
      {status === 'invalid' && (
        <p className="font-mono text-[10px] uppercase tracking-ritual text-error">
          {invalid}
        </p>
      )}
      {status === 'failed' && (
        <p className="font-mono text-[10px] uppercase tracking-ritual text-error">
          {failed}
        </p>
      )}
    </form>
  );
}
