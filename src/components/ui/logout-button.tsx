'use client';

import { useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { signOutAction } from '@/lib/auth-actions';

export function LogoutButton({ locale }: { locale: string }) {
  const t = useTranslations('auth');
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      onClick={() =>
        startTransition(async () => {
          await signOutAction(locale);
        })
      }
      disabled={pending}
      className="border border-border bg-card px-3 py-1.5 font-mono text-[10px] uppercase tracking-ritual text-white hover:border-fire disabled:opacity-50"
    >
      {pending ? '…' : t('logout')}
    </button>
  );
}
