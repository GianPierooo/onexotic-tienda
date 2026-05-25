import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/lib/i18n/routing';
import { GrainOverlay } from '@/components/ui/grain-overlay';
import { EditorialPlate, toneFromSeed } from '@/components/ui/editorial-plate';
import { Countdown } from '@/components/ui/countdown';
import { NotifyForm } from '@/components/ui/notify-form';
import {
  getActiveDrop,
  getClosedDrops,
  getDropStats,
  getUpcomingDrop,
} from '@/lib/queries';

type Props = { params: { locale: string } };

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.archive' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/drops`,
      languages: { es: '/es/drops', en: '/en/drops' },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/drops`,
    },
    twitter: { title: t('title'), description: t('description') },
  };
}

export default async function ArchivePage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('archive');

  const [active, upcoming, closed] = await Promise.all([
    getActiveDrop(),
    getUpcomingDrop(),
    getClosedDrops(),
  ]);
  const stats = await getDropStats(closed.map((d) => d.id));
  const piezasMap = new Map(stats.map((s) => [s.dropId, s.totalPiezas]));
  const totalPiezas = stats.reduce((s, x) => s + x.totalPiezas, 0);

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden border-b border-border"
        style={{
          background:
            'var(--grad-section-fade)',
        }}
      >
        <GrainOverlay />
        <svg
          viewBox="0 0 400 400"
          className="pointer-events-none absolute left-1/2 top-12 -translate-x-1/2 opacity-40"
          width={340}
          height={340}
          aria-hidden
        >
          <circle cx="200" cy="200" r="180" style={{ stroke: "var(--color-silver)" }} strokeWidth=".6" fill="none" />
          <circle
            cx="200"
            cy="200"
            r="150"
            style={{ stroke: "var(--color-silver)" }}
            strokeWidth=".4"
            fill="none"
            strokeDasharray="3 5"
          />
          <circle cx="200" cy="200" r="120" style={{ stroke: "var(--color-fire)" }} strokeWidth=".6" fill="none" />
        </svg>
        <div className="relative px-5 pb-8 pt-10">
          <div className="mb-3 inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[.36em] text-silver">
            <span className="block h-px w-4 bg-silver/60" />
            ✦ MMXXVI ✦
            <span className="block h-px w-4 bg-silver/60" />
          </div>
          <h1 className="m-0 font-black font-normal leading-[0.82] text-fg text-[78px] md:text-[100px]">
            {t('hero.title')}
          </h1>
          <p className="mb-5 mt-4 max-w-[300px] font-body text-[13.5px] leading-relaxed text-fg/85">
            {t('hero.copyA')}
            <br />
            <span className="text-fire">{t('hero.copyB')}</span>
            {t('hero.copyC')}
          </p>
          <div className="grid grid-cols-3 border border-border bg-card">
            {[
              [closed.length.toString().padStart(2, '0'), t('hero.stats.closed')],
              [totalPiezas.toString(), t('hero.stats.pieces')],
              ['00', t('hero.stats.restocks')],
            ].map(([n, l], i, a) => (
              <div
                key={l}
                className="px-2 py-3.5 text-center"
                style={{ borderRight: i < a.length - 1 ? '1px solid var(--color-border)' : 'none' }}
              >
                <div
                  className="font-goth text-3xl leading-none"
                  style={{ color: i === 2 ? 'var(--color-fire)' : 'var(--color-fg)' }}
                >
                  {n}
                </div>
                <div className="mt-1.5 font-mono text-[9px] uppercase tracking-ritual text-silver">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drop vivo strip */}
      {active && (
        <Link
          href="/tienda"
          className="block border-b border-border text-fg"
          style={{
            background: 'linear-gradient(90deg, rgba(184,20,20,.18) 0%, transparent 70%)',
          }}
        >
          <div className="flex items-center justify-between gap-3 px-5 py-4">
            <div>
              <div className="mb-1 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.32em] text-fire">
                <span
                  className="block h-1.5 w-1.5 rounded-full bg-fire"
                  style={{ boxShadow: '0 0 10px var(--color-fire)' }}
                />
                {t('live.eye', { drop: active.nombre })}
              </div>
              <div className="font-goth text-3xl leading-none">{active.nombre}</div>
            </div>
            <div className="bg-fire px-3 py-2.5 font-mono text-[10px] font-extrabold uppercase tracking-ritual text-on-fire">
              {t('live.cta')} →
            </div>
          </div>
        </Link>
      )}

      {/* Archive list */}
      <section>
        {closed.length === 0 ? (
          <div className="px-5 py-14 text-center">
            <p className="font-mono text-[10px] uppercase tracking-ritual text-muted">
              {t('emptyClosed')}
            </p>
          </div>
        ) : (
          closed.map((drop, i) => {
            const tone = toneFromSeed(drop.id);
            const dateLabel = drop.fecha_lanzamiento
              ? new Date(drop.fecha_lanzamiento).toLocaleDateString(locale, {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })
              : '—';
            const piezas = piezasMap.get(drop.id) ?? 0;
            const chapter = (closed.length - i).toString().padStart(2, '0');
            return (
              <article
                key={drop.id}
                className="border-t border-dashed border-border pb-5"
              >
                <div className="relative">
                  <EditorialPlate
                    tone={tone}
                    alignH={i % 2 === 0 ? 'right' : 'left'}
                    label={t('card.chapter', { n: chapter })}
                    style={{ height: 360, borderBottom: '1px solid var(--color-border)' }}
                  >
                    {/* Watermark giant chapter number */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute bottom-3 right-4 z-[2] font-black leading-none"
                      style={{
                        fontSize: 140,
                        color: 'transparent',
                        WebkitTextStroke: '1px var(--color-silver)',
                        opacity: 0.35,
                      }}
                    >
                      {chapter}
                    </div>
                    {/* X mark */}
                    <svg
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      className="pointer-events-none absolute inset-0 h-full w-full opacity-[.08]"
                      aria-hidden
                    >
                      <line x1="6" y1="6" x2="94" y2="94" style={{ stroke: "var(--color-silver)" }} strokeWidth=".5" />
                      <line x1="94" y1="6" x2="6" y2="94" style={{ stroke: "var(--color-silver)" }} strokeWidth=".5" />
                    </svg>
                    {/* CERRADO seal */}
                    <div className="absolute right-3 top-3 z-[2]">
                      <ClosedSeal date={dateLabel} label={t('card.closed')} />
                    </div>
                    {/* Bottom name */}
                    <div className="absolute bottom-4 left-4 z-[2] max-w-[60%]">
                      {drop.concepto && (
                        <div className="mb-1.5 font-mono text-[9.5px] uppercase tracking-[.32em] text-silver">
                          {drop.concepto}
                        </div>
                      )}
                      <div
                        className="font-black font-normal leading-[0.85] text-fg"
                        style={{
                          fontSize: 44,
                          textShadow: '0 4px 24px rgba(0,0,0,.6)',
                        }}
                      >
                        {drop.nombre}
                      </div>
                    </div>
                  </EditorialPlate>
                </div>
                <div className="px-5 pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-[.24em] text-silver">
                        {dateLabel}
                      </div>
                      <div className="mt-1 font-mono text-[9px] uppercase tracking-[.18em] text-silver-dim">
                        OX-{chapter}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 border border-border bg-card">
                    {[
                      [piezas.toString(), t('card.stats.pieces'), 'var(--color-fg)'],
                      [drop.estado === 'archivado' ? t('card.archived') : t('card.soldOut'), t('card.stats.state'), 'var(--color-fire)'],
                      ['00', t('card.stats.restock'), 'var(--color-silver)'],
                    ].map(([v, k, color], idx, arr) => (
                      <div
                        key={k}
                        className="px-2 py-3 text-center"
                        style={{ borderRight: idx < arr.length - 1 ? '1px solid var(--color-border)' : 'none' }}
                      >
                        <div
                          className="font-mono text-[13px] font-bold"
                          style={{ color }}
                        >
                          {v}
                        </div>
                        <div className="mt-1 font-mono text-[8.5px] uppercase tracking-ritual text-silver">
                          {k}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>

      {/* Próximo capítulo */}
      {upcoming ? (
        <section
          className="relative overflow-hidden border-t border-border px-5 py-12 text-center"
          style={{
            background: 'var(--grad-section-fade-fire)',
          }}
        >
          <GrainOverlay />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2"
            style={{
              width: 360,
              height: 360,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(184,20,20,.28) 0%, transparent 65%)',
            }}
          />
          <div className="relative">
            <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[.36em] text-silver">
              ✦ {t('next.eye')}
            </div>
            {upcoming.fecha_lanzamiento && (
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[.32em] text-fire">
                {new Date(upcoming.fecha_lanzamiento).toLocaleDateString(locale, {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
            )}
            <h2 className="m-0 font-black font-normal leading-[0.85] text-fg text-[60px]">
              {upcoming.nombre}
            </h2>
            {upcoming.concepto && (
              <p className="mx-auto mb-5 mt-4 max-w-[300px] font-body text-[13px] leading-relaxed text-fg/85">
                {upcoming.concepto}
              </p>
            )}
            {upcoming.fecha_lanzamiento && (
              <div className="mx-auto mb-6 max-w-[300px]">
                <Countdown targetIso={upcoming.fecha_lanzamiento} />
              </div>
            )}
            <NotifyForm dropId={upcoming.id} />
            <p className="mt-3 font-mono text-[9px] uppercase tracking-[.32em] text-silver">
              {t('next.note')}
            </p>
          </div>
        </section>
      ) : (
        <section className="border-t border-border bg-bg px-5 py-10 text-center">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[.32em] text-silver">
            ✦ {t('next.eye')}
          </div>
          <p className="font-mono text-[10px] uppercase tracking-ritual text-muted">
            {t('next.empty')}
          </p>
        </section>
      )}
    </>
  );
}

function ClosedSeal({ date, label }: { date: string; label: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 border px-2.5 py-1.5 font-mono text-[9px] font-extrabold uppercase tracking-[.32em] text-silver"
      style={{ borderColor: 'var(--color-silver)', background: 'rgba(10,10,10,.6)' }}
    >
      <span className="block h-1.5 w-1.5 rounded-full bg-silver" />
      {label} · {date}
    </div>
  );
}
