import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export type BadgeVariant =
  | 'soldOut'
  | 'lastPieces'
  | 'fresh'
  | 'live'
  | 'upcoming';

type Props = {
  variant: BadgeVariant;
  count?: number;
  className?: string;
};

const STYLES: Record<BadgeVariant, string> = {
  soldOut: 'border-fire bg-fire/10 text-fire',
  lastPieces: 'bg-fire text-on-fire border-fire',
  fresh: 'bg-inverse-bg text-inverse-fg border-inverse-bg',
  live: 'border-fire text-fire',
  upcoming: 'border-silver text-silver',
};

export function Badge({ variant, count, className }: Props) {
  const t = useTranslations('badges');
  let label = t(variant);
  if (variant === 'lastPieces' && typeof count === 'number') {
    label = t('lastPiecesN', { n: count });
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-ritual',
        STYLES[variant],
        className
      )}
    >
      {variant === 'live' && (
        <span
          aria-hidden
          className="block h-1.5 w-1.5 rounded-full bg-fire"
          style={{ boxShadow: '0 0 6px var(--color-fire)' }}
        />
      )}
      {label}
    </span>
  );
}
