'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, m, type PanInfo } from '@/components/motion';
import Image from 'next/image';
import { GrainOverlay } from './grain-overlay';

type Props = {
  imagenes: string[];
  nombre: string;
  sku: string | null;
  agotado: boolean;
  badgeLive: string;
  badgeSoldOut: string;
};

export function ProductGallery({
  imagenes,
  nombre,
  sku,
  agotado,
  badgeLive,
  badgeSoldOut,
}: Props) {
  const t = useTranslations('product.gallery');
  const fotos = imagenes.length > 0 ? imagenes : [null];
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(0);
  const total = fotos.length;
  const containerRef = useRef<HTMLDivElement>(null);

  function go(next: number) {
    const safe = ((next % total) + total) % total;
    setDir(safe > index ? 1 : -1);
    setIndex(safe);
  }

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -60) go(index + 1);
    else if (info.offset.x > 60) go(index - 1);
  }

  const current = fotos[index] ?? null;

  return (
    <section className="relative">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: '4 / 5',
          background: 'var(--color-surface-alt)',
        }}
      >
        <GrainOverlay />

        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <m.div
            key={index}
            custom={dir}
            drag={total > 1 ? 'x' : false}
            dragConstraints={containerRef}
            dragElastic={0.15}
            onDragEnd={onDragEnd}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            {current ? (
              <Image
                src={current}
                alt={`${nombre} — ${index + 1} / ${total}`}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-[3.5%]"
                draggable={false}
              />
            ) : (
              <div
                className="absolute inset-[12%_22%_8%_22%] border"
                style={{
                  borderColor: 'var(--card-frame-border)',
                  background:
                    'var(--grad-card-inner)',
                }}
              />
            )}
          </m.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute left-3.5 top-3.5 flex gap-1.5">
          <span className="pointer-events-auto inline-flex items-center gap-1.5 border border-border bg-bg/65 px-2 py-1 font-mono text-[9px] uppercase tracking-ritual text-fg backdrop-blur-sm">
            <span className="block h-1.5 w-1.5 rounded-full bg-fire" />
            {badgeLive}
          </span>
          {agotado && (
            <span className="bg-inverse-bg px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-ritual text-inverse-fg">
              {badgeSoldOut}
            </span>
          )}
        </div>

        {sku && (
          <div className="pointer-events-none absolute bottom-3.5 right-3.5 border border-border bg-bg/70 px-2 py-1 font-mono text-[10px] uppercase tracking-ritual text-fg backdrop-blur-sm">
            {sku}
          </div>
        )}

        {total > 1 && (
          <>
            <div className="pointer-events-none absolute bottom-3.5 left-3.5 z-[2] font-mono text-[10px] uppercase tracking-ritual text-fg/85">
              {(index + 1).toString().padStart(2, '0')} / {total.toString().padStart(2, '0')}
            </div>
            <div className="pointer-events-none absolute bottom-5 left-1/2 z-[2] flex -translate-x-1/2 gap-1.5">
              {fotos.map((_, i) => (
                <span
                  key={i}
                  className="block h-[3px] transition-all"
                  style={{
                    width: i === index ? 18 : 6,
                    background: i === index ? 'var(--color-fire)' : 'var(--color-silver)',
                    opacity: i === index ? 1 : 0.55,
                  }}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label={t('prev')}
              onClick={() => go(index - 1)}
              className="absolute left-2 top-1/2 z-[3] -translate-y-1/2 border border-border bg-bg/55 px-2 py-2 text-fg backdrop-blur-sm hover:border-fire"
            >
              ←
            </button>
            <button
              type="button"
              aria-label={t('next')}
              onClick={() => go(index + 1)}
              className="absolute right-2 top-1/2 z-[3] -translate-y-1/2 border border-border bg-bg/55 px-2 py-2 text-fg backdrop-blur-sm hover:border-fire"
            >
              →
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="grid grid-cols-4 gap-1.5 px-4 pt-2">
          {fotos.slice(0, 4).map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={t('thumb', { n: i + 1 })}
              className="relative overflow-hidden border transition-colors"
              style={{
                aspectRatio: '1 / 1',
                borderColor: i === index ? 'var(--color-fire)' : 'var(--color-border)',
                background: 'var(--color-surface-alt)',
              }}
            >
              {src && (
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-contain p-[6%]"
                />
              )}
              <div className="absolute left-1 top-1 font-mono text-[8px] uppercase tracking-ritual text-silver">
                {(i + 1).toString().padStart(2, '0')}
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
