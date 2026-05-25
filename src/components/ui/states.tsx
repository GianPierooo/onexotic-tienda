'use client';

import { useTranslations } from 'next-intl';
import { Button } from './button';

export function LoadingState() {
  const t = useTranslations('common');
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted">
      <div className="h-8 w-8 animate-pulse-fire rounded-full bg-fire" />
      <p className="font-mono text-xs uppercase tracking-ritual">{t('loading')}</p>
    </div>
  );
}

export function ErrorState({ retry }: { retry?: () => void }) {
  const t = useTranslations('common');
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="font-black text-2xl text-fg">{t('error')}</p>
      {retry && (
        <Button variant="ghost" size="md" onClick={retry}>
          {t('retry')}
        </Button>
      )}
    </div>
  );
}

export function EmptyState({ message }: { message?: string }) {
  const t = useTranslations('common');
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
      <p className="font-mono text-xs uppercase tracking-ritual text-muted">
        {message ?? t('empty')}
      </p>
    </div>
  );
}
