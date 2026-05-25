import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/lib/i18n/routing';
import { DropHero } from '@/components/ui/drop-hero';
import { GrainOverlay } from '@/components/ui/grain-overlay';
import { SectionHead } from '@/components/ui/section-head';
import { ProductCard } from '@/components/ui/product-card';
import { NewsletterCapture } from '@/components/ui/newsletter-capture';
import { EmptyState } from '@/components/ui/states';
import { getActiveDrop, getFeaturedProducts, getUpcomingDrop } from '@/lib/queries';
import { groupForCards } from '@/lib/product-grouping';
import { isFutureIso } from '@/lib/utils';

type Props = { params: { locale: string } };

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.home' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `/${locale}`, languages: { es: '/es', en: '/en' } },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}`,
      images: [{ url: '/og-default.png', width: 1200, height: 630, alt: t('title') }],
    },
    twitter: { title: t('title'), description: t('description') },
  };
}

export default async function HomePage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('home');

  const [activeDrop, upcomingDrop] = await Promise.all([
    getActiveDrop(),
    getUpcomingDrop(),
  ]);

  const featured = activeDrop
    ? groupForCards(await getFeaturedProducts(activeDrop.id, 8)).slice(0, 4)
    : [];

  const heroDrop = activeDrop ?? upcomingDrop;
  const isLive = !!activeDrop;
  const badge = heroDrop
    ? `${heroDrop.nombre} · ${isLive ? t('hero.live') : t('hero.upcoming')}`
    : t('hero.empty');

  return (
    <>
      {heroDrop ? (
        <DropHero
          badge={badge}
          capitulo={`${t('hero.chapter')} ${heroDrop.nombre}`}
          nombre={heroDrop.nombre}
          concepto={heroDrop.concepto}
          fechaIso={
            isFutureIso(heroDrop.fecha_lanzamiento)
              ? heroDrop.fecha_lanzamiento
              : null
          }
        />
      ) : (
        <section className="px-6 py-20">
          <EmptyState message={t('hero.empty')} />
        </section>
      )}

      {/* Marquee */}
      <section className="overflow-hidden border-y border-border bg-bg">
        <div className="flex animate-marquee whitespace-nowrap py-4 font-goth text-[38px] uppercase tracking-wide">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="px-8">
              <span className="text-fg">{t('marqueeA')}</span>{' '}
              <span className="text-fire">{t('marqueeB')}</span>{' '}
              <span className="text-muted">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <SectionHead
        eyebrow={`${t('sections.dropEye', { drop: heroDrop?.nombre ?? '' })}`}
        title={t('sections.dropTitle')}
        link={{ href: '/tienda', label: t('sections.dropLink') }}
      />
      {featured.length > 0 ? (
        <div className="grid grid-cols-2 gap-3.5 px-5 pb-5">
          {featured.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      ) : (
        <div className="px-5">
          <EmptyState />
        </div>
      )}

      {/* Categories */}
      <SectionHead
        eyebrow={t('sections.catEye')}
        title={t('sections.catTitle')}
        link={{ href: '/tienda', label: t('sections.catLink') }}
      />
      <div className="flex flex-col gap-3 px-5 pb-2">
        <CategoryCard
          no="◦ 01"
          name={t('cat.gym.name')}
          copy={t('cat.gym.copy')}
          tone="var(--grad-tone-c)"
          href="/tienda?tipo=gymwear"
        />
        <CategoryCard
          no="◦ 02"
          name={t('cat.oversize.name')}
          copy={t('cat.oversize.copy')}
          tone="var(--grad-tone-a)"
          href="/tienda?tipo=oversize"
        />
        <CategoryCard
          no="◦ 03"
          name={t('cat.street.name')}
          copy={t('cat.street.copy')}
          tone="var(--grad-tone-e)"
          href="/tienda?tipo=streetwear"
        />
      </div>

      {/* Lookbook teaser */}
      <SectionHead
        eyebrow={t('sections.lookEye')}
        title={t('sections.lookTitle')}
        link={{ href: '/lookbook', label: t('sections.lookLink') }}
      />
      <section className="mx-5 mt-1 border border-border bg-card">
        <Link href="/lookbook" className="relative block">
          <div
            className="relative h-[280px] overflow-hidden"
            style={{
              background:
                'var(--grad-tone-a)',
            }}
          >
            <GrainOverlay />
            <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
              <div>
                <div className="mb-1.5 font-mono text-[10px] uppercase tracking-ritual text-silver">
                  Lookbook · SS26
                </div>
                <div className="font-black text-[48px] leading-[0.9] text-fg">
                  {t('lookbook.titleA')}
                  <br />
                  {t('lookbook.titleB')}
                </div>
              </div>
              <div className="border border-fg px-3 py-2.5 font-mono text-[10px] uppercase tracking-ritual text-fg">
                {t('lookbook.more')}
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Newsletter / acceso anticipado */}
      <section className="relative mx-5 my-6 overflow-hidden border border-border bg-card-alt px-5 py-6">
        <GrainOverlay />
        <div className="relative">
          <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[.28em] text-fire">
            ✦ {t('cult.eyebrow')}
          </div>
          <h3 className="m-0 font-goth text-[38px] leading-[0.9]">
            {t('cult.titleA')}
            <br />
            {t('cult.titleB')}
          </h3>
          <p className="mb-4 mt-2.5 font-body text-xs leading-relaxed text-muted">
            {t('cult.copyA')}
            <br />
            {t('cult.copyB')}
          </p>
          <NewsletterCapture dropId={upcomingDrop?.id ?? activeDrop?.id ?? null} />
        </div>
      </section>
    </>
  );
}

function CategoryCard({
  no,
  name,
  copy,
  tone,
  href,
}: {
  no: string;
  name: string;
  copy: string;
  tone: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="relative block h-[180px] overflow-hidden border border-border text-fg"
    >
      <div className="absolute inset-0" style={{ background: tone }} />
      <GrainOverlay />
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <div className="flex justify-between font-mono text-[10px] uppercase tracking-ritual text-silver">
          <span>{no}</span>
        </div>
        <div>
          <div className="font-goth text-[52px] leading-[0.9]">{name}</div>
          <div className="mt-2.5 flex items-end justify-between">
            <div className="max-w-[200px] font-body text-xs text-fg/80">
              {copy}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-ritual text-fire">
              VER →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
