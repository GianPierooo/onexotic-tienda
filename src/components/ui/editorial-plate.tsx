import type { ReactNode } from 'react';
import Image from 'next/image';
import { GrainOverlay } from './grain-overlay';

const TONES = {
  a: 'var(--grad-tone-a)',
  b: 'var(--grad-tone-b)',
  c: 'var(--grad-tone-c)',
  d: 'var(--grad-tone-d)',
  e: 'var(--grad-tone-e)',
  f: 'var(--grad-tone-f)',
  g: 'var(--grad-tone-g)',
  h: 'var(--grad-tone-h)',
} as const;

export type Tone = keyof typeof TONES;
const TONE_KEYS = Object.keys(TONES) as Tone[];

export function toneFromSeed(seed: string): Tone {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return TONE_KEYS[Math.abs(h) % TONE_KEYS.length]!;
}

type Props = {
  tone?: Tone;
  alignH?: 'left' | 'center' | 'right';
  imagen?: string | null;
  imagenAlt?: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
};

export function EditorialPlate({
  tone = 'a',
  alignH = 'center',
  imagen,
  imagenAlt,
  label,
  className,
  style,
  children,
}: Props) {
  const left = alignH === 'left' ? '12%' : alignH === 'right' ? '50%' : '30%';
  const right = alignH === 'right' ? '12%' : undefined;
  const width = alignH === 'center' ? '40%' : '36%';

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: TONES[tone],
        ...style,
      }}
    >
      <GrainOverlay />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(120% 120% at 50% 50%, transparent 45%, rgba(0,0,0,0.92) 100%)',
        }}
      />
      {imagen ? (
        <Image
          src={imagen}
          alt={imagenAlt ?? ''}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left,
            right,
            top: '12%',
            bottom: '6%',
            width,
            border: '1px solid var(--card-frame-border)',
            background:
              'var(--grad-card-frame)',
          }}
        />
      )}
      {label && (
        <div className="absolute left-3 top-3 z-[2] font-mono text-[9px] uppercase tracking-ritual text-silver/75">
          ◦ {label}
        </div>
      )}
      {children}
    </div>
  );
}
