import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { CatalogFilters } from '@/components/ui/catalog-filters';
import { CatalogSearchBar } from '@/components/ui/catalog-search-bar';
import { ProductCard } from '@/components/ui/product-card';
import { EmptyState } from '@/components/ui/states';
import { Countdown } from '@/components/ui/countdown';
import { BreadcrumbsJsonLd, StructuredData } from '@/components/seo/structured-data';
import { STORE } from '@/lib/store-config';
import { isFutureIso } from '@/lib/utils';
import {
  getActiveDrop,
  getFilterOptions,
  getProductsByDrop,
} from '@/lib/queries';
import { groupForCards } from '@/lib/product-grouping';

type Props = {
  params: { locale: string };
  searchParams: { tipo?: string; talla?: string; color?: string; q?: string };
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.catalog' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/tienda`,
      languages: {
        'es-PE': '/es/tienda',
        en: '/en/tienda',
        'x-default': '/es/tienda',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/tienda`,
    },
    twitter: { title: t('title'), description: t('description') },
  };
}

export default async function CatalogPage({
  params: { locale },
  searchParams,
}: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('catalog');

  const drop = await getActiveDrop();
  if (!drop) {
    return (
      <section className="mx-auto max-w-screen-xl px-5 py-12">
        <h1 className="font-black text-4xl text-fg md:text-6xl">
          {t('title')}
        </h1>
        <div className="mt-12">
          <EmptyState message={t('noDrop')} />
        </div>
      </section>
    );
  }

  const [productosRaw, options] = await Promise.all([
    getProductsByDrop(drop.id, searchParams),
    getFilterOptions(drop.id),
  ]);
  const cards = groupForCards(productosRaw);
  const disponibles = cards.filter((c) => c.estado !== 'agotado').length;
  const agotadas = cards.length - disponibles;
  const queryTerm = searchParams.q?.trim() ?? '';

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: cards.slice(0, 20).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${STORE.storeUrl}/${locale}/producto/${p.slug ?? p.id}`,
      name: p.nombre,
    })),
  };

  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: t('title'), url: `/${locale}/tienda` },
        ]}
      />
      {cards.length > 0 && <StructuredData data={itemListJsonLd} />}
      <header className="border-b border-border bg-bg/92 backdrop-blur-md">
        <div className="px-4 pb-3.5 pt-3">
          <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
            <span className="block h-px w-3.5 bg-fire" />
            {t('chapter', { drop: drop.nombre })}
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <h1 className="m-0 font-black font-normal leading-[0.9] text-fg text-[54px]">
              {t('title')}
            </h1>
            <div className="text-right">
              <div className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-ritual text-fg">
                <span
                  className="block h-1.5 w-1.5 rounded-full bg-fire"
                  style={{ boxShadow: '0 0 8px var(--color-fire)' }}
                />
                {t('live')}
              </div>
            </div>
          </div>
          {drop.fecha_lanzamiento && isFutureIso(drop.fecha_lanzamiento) && (
            <div className="mt-3 max-w-[280px]">
              <Countdown targetIso={drop.fecha_lanzamiento} />
            </div>
          )}
        </div>
      </header>

      <CatalogSearchBar initialQuery={queryTerm} />
      <CatalogFilters
        tipos={options.tipos}
        tallas={options.tallas}
        colores={options.colores}
      />

      <div className="flex items-baseline justify-between border-b border-border px-5 pb-2 pt-4">
        <div>
          <div className="font-mono text-[9px] uppercase tracking-ritual text-silver">
            {t('results')}
          </div>
          <div className="mt-1 font-goth text-2xl leading-none">
            {cards.length}{' '}
            <span className="text-muted text-lg">{t('pieces')}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[9px] uppercase tracking-ritual text-silver">
            {t('stock')}
          </div>
          <div className="mt-1 font-mono text-[11px] tracking-wide text-fg">
            {disponibles} {t('available')} ·{' '}
            <span className="text-muted">
              {agotadas} {t('sold')}
            </span>
          </div>
        </div>
      </div>

      {cards.length === 0 ? (
        <div className="px-5 py-10">
          <EmptyState />
        </div>
      ) : (
        <div className="mx-auto grid w-full max-w-screen-xl grid-cols-2 gap-3 px-4 py-3.5 lg:grid-cols-3 xl:grid-cols-4">
          {cards.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </>
  );
}
