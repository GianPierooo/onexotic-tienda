'use client';

import { m } from '@/components/motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { GrainOverlay } from './grain-overlay';
import { Countdown } from './countdown';

type Props = {
  badge: string;
  capitulo: string;
  nombre: string;
  concepto: string | null;
  fechaIso: string | null;
  /** Foto de fondo opcional. Si no hay, se usa el fallback de marca. */
  imagenUrl?: string | null;
};

export function DropHero({ badge, capitulo, nombre, concepto, fechaIso, imagenUrl }: Props) {
  const t = useTranslations('home.hero');

  return (
    <section
      className="relative overflow-hidden text-fg"
      style={{ height: 620 }}
    >
      {imagenUrl ? (
        <>
          <Image
            src={imagenUrl}
            alt={nombre}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Scrim con el color de fondo del tema: el texto (abajo) queda
              sobre fondo sólido del tema → legible en claro y oscuro; la foto
              se ve en la parte superior. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, var(--color-bg) 0%, var(--color-bg) 40%, transparent 88%)',
            }}
          />
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: 'var(--grad-hero)' }}
        />
      )}
      <GrainOverlay />
      {/* tribal strokes */}
      <svg
        viewBox="0 0 400 620"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-30"
        aria-hidden
      >
        <defs>
          <linearGradient id="hero-g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: "var(--color-fire)" }} stopOpacity="0" />
            <stop offset=".6" style={{ stopColor: "var(--color-fire)" }} stopOpacity=".7" />
            <stop offset="1" style={{ stopColor: "var(--color-fire)" }} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M-20 480 Q120 340 200 420 T 440 360"
          stroke="url(#hero-g1)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M-20 510 Q120 380 200 460 T 440 400"
          stroke="url(#hero-g1)"
          strokeWidth=".7"
          fill="none"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col justify-between px-5 pb-7 pt-6">
        {/* TOP badge */}
        <div className="flex items-start justify-between">
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 border border-border bg-bg/55 px-2.5 py-1.5 backdrop-blur-sm"
          >
            <span
              className="block h-1.5 w-1.5 rounded-full bg-fire"
              style={{ boxShadow: '0 0 8px var(--color-fire)' }}
            />
            <span className="font-mono text-[10px] uppercase tracking-ritual">
              {badge}
            </span>
          </m.div>
          <div className="font-mono text-[10px] uppercase tracking-ritual text-silver">
            SS / 26 — LIMA
          </div>
        </div>

        {/* CENTER + CTA */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[.3em] text-silver">
            ✦ {capitulo}
          </div>
          <h1
            className="m-0 font-black font-normal leading-[.85]"
            style={{
              fontSize: 82,
              letterSpacing: '-.01em',
              textShadow: '0 4px 30px rgba(0,0,0,.6)',
            }}
          >
            {nombre}
          </h1>
          {concepto && (
            <p className="mb-5 mt-3.5 max-w-[280px] font-body text-[13px] leading-relaxed text-fg/85">
              {concepto}
            </p>
          )}

          {fechaIso ? (
            <div className="mb-4">
              <Countdown targetIso={fechaIso} />
            </div>
          ) : (
            <div
              className="mb-4 inline-flex items-center gap-2 border border-border bg-bg/60 px-3 py-2 backdrop-blur-sm"
              style={{ borderLeft: '2px solid var(--color-fire)' }}
            >
              <span
                className="block h-1.5 w-1.5 rounded-full bg-fire animate-pulse-fire"
                style={{ boxShadow: '0 0 10px var(--color-fire)' }}
              />
              <span className="font-mono text-[10px] font-bold uppercase tracking-ritual text-fg">
                {t('live')} · {t('chapter')} {nombre}
              </span>
            </div>
          )}

          <Link
            href="/tienda"
            className="flex items-center justify-between px-4 py-4 font-body text-[13px] font-extrabold uppercase tracking-[.22em] text-on-fire"
            style={{
              background: 'var(--color-fire)',
              boxShadow:
                '0 0 0 1px var(--color-fire), 0 8px 30px rgba(184,20,20,.35)',
            }}
          >
            <span>{t('cta')}</span>
            <span className="font-mono text-sm">→</span>
          </Link>
        </m.div>
      </div>
    </section>
  );
}
