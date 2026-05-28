import { useTranslations } from 'next-intl';

type Badge = {
  key: 'ship' | 'pay' | 'wa' | 'drop';
  icon: React.ReactNode;
};

const BADGES: Badge[] = [
  {
    key: 'ship',
    icon: (
      <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden>
        <rect x="2" y="6" width="11" height="9" stroke="currentColor" strokeWidth="1.3" />
        <path d="M13 9h4l3 3v3h-7V9z" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="6" cy="16" r="1.6" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="16" cy="16" r="1.6" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    key: 'pay',
    icon: (
      <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden>
        <rect x="3" y="6" width="16" height="10" stroke="currentColor" strokeWidth="1.3" />
        <path d="M3 10h16" stroke="currentColor" strokeWidth="1.3" />
        <path d="M7 13h3" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    key: 'wa',
    icon: (
      <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path
          d="M3.2 18.8l1.2-4.1A8 8 0 1 1 11 19a8 8 0 0 1-3.7-.9l-4.1 1.1z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: 'drop',
    icon: (
      <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path d="M11 2l3 6 6 1-4.5 4 1 6L11 16l-5.5 3 1-6L2 9l6-1 3-6z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function TrustBadges() {
  const t = useTranslations('trust');
  return (
    <section
      aria-label={t('eyebrow')}
      className="mx-4 my-6 grid grid-cols-2 gap-2 border border-border bg-card md:grid-cols-4"
    >
      {BADGES.map((b) => (
        <div key={b.key} className="flex flex-col items-start gap-1.5 border-r border-border p-4 last:border-r-0">
          <span className="text-fire">{b.icon}</span>
          <p className="m-0 font-body text-[12px] font-bold uppercase tracking-wide text-fg">
            {t(`${b.key}.title`)}
          </p>
          <p className="m-0 font-mono text-[10px] uppercase tracking-ritual text-muted">
            {t(`${b.key}.copy`)}
          </p>
        </div>
      ))}
    </section>
  );
}
