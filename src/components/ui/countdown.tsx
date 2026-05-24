'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

type Props = { targetIso: string };

type Parts = { d: number; h: number; m: number; s: number; done: boolean };

function compute(target: number): Parts {
  const diff = target - Date.now();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0, done: true };
  const s = Math.floor(diff / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
    done: false,
  };
}

const pad = (n: number) => n.toString().padStart(2, '0');

export function Countdown({ targetIso }: Props) {
  const target = new Date(targetIso).getTime();
  const [parts, setParts] = useState<Parts>(() => compute(target));
  const t = useTranslations('home.countdown');

  useEffect(() => {
    const id = setInterval(() => setParts(compute(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells: Array<[string, string]> = [
    [pad(parts.d), t('days')],
    [pad(parts.h), t('hours')],
    [pad(parts.m), t('minutes')],
    [pad(parts.s), t('seconds')],
  ];

  return (
    <div
      className="grid grid-cols-4 gap-1.5 border border-border bg-bg/60 px-2 py-2.5 backdrop-blur-sm"
      style={{ borderLeft: '2px solid #B81414' }}
      aria-live="polite"
    >
      {cells.map(([n, l]) => (
        <div key={l} className="text-center">
          <div className="font-mono text-[22px] font-semibold tracking-wide text-white">
            {n}
          </div>
          <div className="mt-0.5 font-mono text-[8px] uppercase tracking-ritual text-silver">
            {l}
          </div>
        </div>
      ))}
    </div>
  );
}
