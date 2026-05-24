import type { ReactNode } from 'react';
import Image from 'next/image';
import { GrainOverlay } from './grain-overlay';

const TONES = {
  a: 'radial-gradient(120% 80% at 70% 20%, #2a1208 0%, #0e0606 55%, #050202 100%)',
  b: 'radial-gradient(110% 90% at 30% 30%, #1a1a1a 0%, #0b0b0b 60%, #050505 100%)',
  c: 'radial-gradient(130% 90% at 50% 100%, #3a1505 0%, #160906 55%, #060303 100%)',
  d: 'linear-gradient(160deg, #1c1c1c 0%, #0a0a0a 60%, #060606 100%)',
  e: 'radial-gradient(80% 100% at 50% 20%, #221008 0%, #0a0606 55%, #030101 100%)',
  f: 'radial-gradient(140% 90% at 20% 80%, #220e08 0%, #0c0606 55%, #050303 100%)',
  g: 'linear-gradient(200deg, #161616 0%, #0a0a0a 50%, #050202 100%)',
  h: 'radial-gradient(100% 70% at 80% 40%, #2a1010 0%, #100707 60%, #060303 100%)',
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
            border: '1px solid #1a1a1a',
            background:
              'linear-gradient(180deg, rgba(255,255,255,.05) 0%, transparent 70%), linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
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
