import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/lib/i18n/routing';
import { GrainOverlay } from '@/components/ui/grain-overlay';
import { EditorialPlate, toneFromSeed } from '@/components/ui/editorial-plate';
import { EmptyState } from '@/components/ui/states';
import {
  getActiveDrop,
  getEditorialImages,
  getProductsByDrop,
} from '@/lib/queries';
import { groupForCards } from '@/lib/product-grouping';

type Props = { params: { locale: string } };

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.lookbook' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/lookbook`,
      languages: { es: '/es/lookbook', en: '/en/lookbook' },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/lookbook`,
    },
    twitter: { title: t('title'), description: t('description') },
  };
}

export default async function LookbookPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('lookbook');

  const drop = await getActiveDrop();
  if (!drop) {
    return (
      <section className="px-6 py-20">
        <h1 className="m-0 mb-2 text-center font-black text-4xl text-white">
          {t('cover.title')}
        </h1>
        <EmptyState message={t('empty')} />
      </section>
    );
  }

  const [productosRaw, editorial] = await Promise.all([
    getProductsByDrop(drop.id),
    getEditorialImages(drop.nombre),
  ]);
  const looks = groupForCards(productosRaw);

  return (
    <>
      {/* Cover */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          height: 720,
          background:
            'radial-gradient(120% 80% at 30% 20%, #2a1208 0%, #0e0606 55%, #050202 100%)',
        }}
      >
        <GrainOverlay />
        <svg
          viewBox="0 0 400 720"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full opacity-45"
          aria-hidden
        >
          <defs>
            <linearGradient id="lkc" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#B81414" stopOpacity="0" />
              <stop offset=".55" stopColor="#B81414" stopOpacity=".7" />
              <stop offset="1" stopColor="#B81414" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lks" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#C0C0C0" stopOpacity="0" />
              <stop offset=".5" stopColor="#C0C0C0" stopOpacity=".6" />
              <stop offset="1" stopColor="#C0C0C0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="40" y1="200" x2="360" y2="200" stroke="url(#lks)" strokeWidth=".8" />
          <line x1="200" y1="40" x2="200" y2="170" stroke="url(#lks)" strokeWidth=".6" />
          <path
            d="M-20 540 Q120 380 200 460 T 440 380"
            stroke="url(#lkc)"
            strokeWidth="1.2"
            fill="none"
          />
          <circle cx="200" cy="170" r="3" fill="#C0C0C0" opacity=".8" />
        </svg>
        <div className="absolute inset-0 flex flex-col justify-between px-6 pb-8 pt-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[.42em] text-silver">
              <span className="block h-px w-4 bg-silver/60" />
              ✦ {t('cover.label', { drop: drop.nombre })} ✦
              <span className="block h-px w-4 bg-silver/60" />
            </div>
          </div>
          <div className="text-center">
            <h1
              className="m-0 font-black font-normal leading-[0.82] text-white"
              style={{ fontSize: 86, textShadow: '0 6px 40px rgba(0,0,0,.7)' }}
            >
              {t('cover.titleA')}
              <br />
              {t('cover.titleB')}
            </h1>
            <div className="mt-4 font-goth text-2xl text-fire">
              SS / 26 · {drop.nombre}
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className="font-mono text-[9px] uppercase tracking-[.24em] text-silver">
              <div>Lima · PE</div>
              <div className="text-silver-dim">
                {drop.fecha_lanzamiento
                  ? new Date(drop.fecha_lanzamiento).toLocaleDateString(locale, {
                      month: 'short',
                      year: 'numeric',
                    })
                  : t('cover.dateFallback')}
              </div>
            </div>
            <div className="font-mono text-[9px] uppercase tracking-[.24em] text-silver">
              ↓ {t('cover.scroll')}
            </div>
          </div>
        </div>
      </section>

      {/* Manifiesto */}
      <section className="px-6 py-16">
        <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.32em] text-silver">
          <span className="block h-px w-4 bg-fire" />
          ✦ {t('manifesto.eye')}
        </div>
        <p className="m-0 font-body text-[15px] leading-relaxed text-white/90">
          {t('manifesto.lead')}{' '}
          <span className="font-bold text-fire">{t('manifesto.bold')}</span>
          {t('manifesto.rest')}
        </p>
        <div className="mt-6 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[.32em] text-silver">
          <span className="block h-px flex-1 bg-silver/25" />
          {t('manifesto.signature')}
          <span className="block h-px flex-1 bg-silver/25" />
        </div>
      </section>

      {/* Looks — usa fotos del bucket `editorial`; si no hay, cae al plate. */}
      {looks.slice(0, 6).map((look, i) => {
        const tone = toneFromSeed(look.id);
        const align: 'left' | 'right' = i % 2 === 0 ? 'left' : 'right';
        const lookNo = (i + 1).toString().padStart(2, '0');
        const editorialImg = editorial[i] ?? null;
        return (
          <section key={look.id} className="relative">
            <EditorialPlate
              tone={tone}
              alignH={align}
              imagen={editorialImg}
              imagenAlt={`${drop.nombre} · Look ${lookNo}`}
              style={{ height: 640, borderTop: '1px solid #2A2A2A' }}
            />
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-5">
              <div className="flex items-start justify-between">
                <div className="inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[.32em] text-silver">
                  <span className="block h-px w-4 bg-silver/60" />
                  {t('look.label', { n: lookNo })}
                </div>
                {look.sku && (
                  <div className="text-right font-mono text-[9px] uppercase tracking-[.24em] text-silver">
                    {look.sku}
                  </div>
                )}
              </div>
              <div>
                <h2
                  className="m-0 font-black font-normal leading-[0.85] text-white"
                  style={{ fontSize: 52, textShadow: '0 4px 30px rgba(0,0,0,.7)' }}
                >
                  {look.nombre}
                </h2>
                <div className="mt-3 flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[.24em] text-silver">
                  <span className="block h-px w-3.5 bg-fire" />
                  {t('look.model')} · {drop.nombre}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Pull quote */}
      <section className="relative overflow-hidden border-y border-border bg-card-alt px-6 py-20 text-center">
        <GrainOverlay />
        <div className="relative">
          <div className="mb-3 font-mono text-lg tracking-[.4em] text-fire">
            {'“ ”'}
          </div>
          <blockquote
            className="m-0 font-goth font-normal leading-[0.95] text-white"
            style={{ fontSize: 38 }}
          >
            {t('quote.line1')}
            <br />
            {t('quote.line2')}
          </blockquote>
          <div className="mt-7 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.32em] text-silver">
            <span className="block h-px w-4 bg-silver/60" />
            {t('quote.attribution')}
            <span className="block h-px w-4 bg-silver/60" />
          </div>
        </div>
      </section>

      {/* Type spread */}
      <section className="border-y border-dashed border-border bg-bg px-6 py-20 text-center">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[.4em] text-silver">
          ✦ {t('spread.eye')}
        </div>
        <h2
          className="m-0 font-black font-normal leading-[0.85] text-white"
          style={{ fontSize: 64 }}
        >
          {t('spread.titleA')}
          <br />
          {t('spread.titleB')} <span className="text-fire">{t('spread.titleC')}</span>
        </h2>
        <p className="mx-auto mt-5 max-w-[300px] font-body text-[13px] leading-relaxed text-white/85">
          {t('spread.copy')}
        </p>
      </section>

      {/* Índice */}
      <section className="border-t border-border bg-bg px-5 pb-6 pt-12">
        <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.32em] text-silver">
          <span className="block h-px w-4 bg-fire" />
          ✦ {t('index.eye')}
        </div>
        <h2 className="m-0 mb-5 font-goth text-4xl leading-tight">{t('index.title')}</h2>
        <div>
          {looks.slice(0, 8).map((p, i) => (
            <div
              key={p.id}
              className="grid grid-cols-[30px_1fr_auto] items-baseline gap-3 border-t border-silver/40 py-3.5"
              style={{
                borderBottom: i === Math.min(looks.length, 8) - 1 ? '1px solid rgba(192,192,192,.4)' : 'none',
              }}
            >
              <div className="font-mono text-[13px] tracking-wide text-silver">
                {(i + 1).toString().padStart(2, '0')}
              </div>
              <div>
                <div className="font-body text-[13px] font-bold uppercase tracking-wide text-white">
                  {p.nombre}
                </div>
                {p.sku && (
                  <div className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[.18em] text-silver">
                    {p.sku}
                  </div>
                )}
              </div>
              <Link
                href={`/producto/${p.slug ?? p.id}`}
                className="font-mono text-[9px] uppercase tracking-[.22em] text-fire"
              >
                {t('index.view')} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Créditos + CTA */}
      <section className="border-t border-border px-6 py-12 text-center">
        <div className="mb-5 font-mono text-[10px] uppercase tracking-[.36em] text-silver">
          ✦ {t('credits.eye')} ✦
        </div>
        <div className="mx-auto grid max-w-[280px] grid-cols-[auto_1fr] gap-x-5 gap-y-3 text-left">
          {[
            [t('credits.direction'), 'OnExotic Studio'],
            [t('credits.photo'), 'L. Quispe'],
            [t('credits.styling'), 'M. Cárdenas'],
            [t('credits.location'), 'Lima · varios'],
            [t('credits.fonts'), 'UnifrakturCook / Pirata One'],
          ].map(([k, v]) => (
            <div key={k} className="contents">
              <div className="font-mono text-[10px] uppercase tracking-[.22em] text-silver">
                {k}
              </div>
              <div className="font-body text-[12.5px] text-white">{v}</div>
            </div>
          ))}
        </div>
        <div className="mt-14 font-black text-5xl leading-none text-white">OnExotic</div>
        <div className="mt-3 font-mono text-[9px] uppercase tracking-[.32em] text-silver/60">
          © 2026 · Lima · SS26
        </div>
        <Link
          href="/tienda"
          className="mt-9 inline-flex items-center gap-3 bg-fire px-6 py-4 font-body text-xs font-extrabold uppercase tracking-[.28em] text-white"
          style={{ boxShadow: '0 8px 24px rgba(184,20,20,.3)' }}
        >
          {t('credits.cta')} <span className="font-mono">→</span>
        </Link>
      </section>
    </>
  );
}
