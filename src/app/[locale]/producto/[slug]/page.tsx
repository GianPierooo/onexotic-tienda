import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ProductActions, type Variant } from '@/components/ui/product-actions';
import { ProductCard } from '@/components/ui/product-card';
import { ProductGallery } from '@/components/ui/product-gallery';
import { Reviews } from '@/components/ui/reviews';
import {
  galleryFor,
  getProductoBySlug,
  getRelatedProducts,
} from '@/lib/queries';
import { groupForCards } from '@/lib/product-grouping';
import { formatSoles, STORE } from '@/lib/store-config';

type Props = { params: { locale: string; slug: string } };

export async function generateMetadata({
  params: { locale, slug },
}: Props): Promise<Metadata> {
  const variantes = await getProductoBySlug(slug);
  const producto = variantes[0];
  if (!producto) return { title: 'Producto' };
  const t = await getTranslations({ locale, namespace: 'meta.product' });
  const title = t('title', { name: producto.nombre });
  const description = t('description', {
    name: producto.nombre,
    tipo: producto.tipo,
  });
  const slugPath = producto.slug ?? slug;
  const url = `/${locale}/producto/${slugPath}`;
  const image = producto.imagen_url || '/og-default.png';
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        es: `/es/producto/${slugPath}`,
        en: `/en/producto/${slugPath}`,
      },
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProductPage({ params: { locale, slug } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('product');

  const variantes = await getProductoBySlug(slug);
  if (variantes.length === 0) notFound();
  const base = variantes[0]!;

  const related = await getRelatedProducts(base, 6);

  const variants: Variant[] = variantes.map((v) => ({
    id: v.id,
    talla: v.talla,
    stock: v.stock,
    estado: v.estado,
    precio: v.precio_venta,
    sku: v.sku,
    imagen_url: v.imagen_url,
    color: v.color,
    nombre: v.nombre,
  }));

  const stockTotal = variants.reduce((s, v) => s + Math.max(0, v.stock), 0);
  const agotado = stockTotal === 0;
  const precio = base.precio_venta ?? 0;
  const skuBase = (base.sku ?? '').replace(
    /[- ]?(XS|S|M|L|XL|XXL|UNICA|ÚNICA|\d{2})$/i,
    ''
  );

  const relatedCards = groupForCards(related).slice(0, 4);

  const imagenes = galleryFor(base);

  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: base.nombre,
    sku: skuBase || base.sku || base.id,
    image: imagenes.length > 0 ? imagenes : undefined,
    description: t('jsonld.descriptionFallback', { nombre: base.nombre }),
    brand: { '@type': 'Brand', name: 'OnExotic' },
    offers: {
      '@type': 'Offer',
      url: `${STORE.storeUrl}/${locale}/producto/${base.slug ?? slug}`,
      priceCurrency: 'PEN',
      price: Number(precio).toFixed(2),
      availability: agotado
        ? 'https://schema.org/OutOfStock'
        : 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ProductGallery
        imagenes={imagenes}
        nombre={base.nombre}
        sku={skuBase || base.sku || null}
        agotado={agotado}
        badgeLive={t('header.live')}
        badgeSoldOut={t('header.soldOut')}
      />

      {/* Encabezado */}
      <section className="px-5 pb-4 pt-6">
        <div className="mb-2.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-ritual">
          <span className="inline-flex items-center gap-2 text-silver">
            <span className="block h-px w-3.5 bg-fire" />
            {skuBase || base.sku || base.id.slice(0, 8)}
          </span>
          <span className="text-silver">{base.tipo}</span>
        </div>
        <h1 className="m-0 font-black font-normal leading-[.85] text-fg text-[58px] md:text-[68px]">
          {base.nombre}
        </h1>
        <div className="mt-3 flex items-baseline justify-between">
          <div className="font-mono text-[10px] uppercase tracking-ritual text-silver">
            {base.color ?? ''}
          </div>
          <div className="text-right">
            <div className="font-mono text-[9px] uppercase tracking-ritual text-silver">
              {t('header.price')}
            </div>
            <div className="mt-1 font-body text-[28px] font-bold tracking-tight text-fg">
              {formatSoles(precio)}
            </div>
          </div>
        </div>
      </section>

      {/* Alerta de stock */}
      <div
        className="mx-5 mb-5 flex items-center justify-between border border-border bg-card px-4 py-3"
        style={{ borderLeft: '2px solid var(--color-fire)' }}
      >
        <div className="font-mono text-[10px] uppercase tracking-ritual">
          {agotado ? (
            <span className="text-fg">{t('stock.none')}</span>
          ) : stockTotal <= 5 ? (
            <span className="animate-pulse-fire text-fire">
              {t('stock.lowOnly', { count: stockTotal })}
            </span>
          ) : (
            <>
              <span className="text-fire">{stockTotal}</span>{' '}
              <span className="text-fg">{t('stock.alive')}</span>
            </>
          )}
        </div>
        <div className="font-mono text-[9px] uppercase tracking-ritual text-silver">
          {t('stock.noRestock')}
        </div>
      </div>

      {/* Selector + acciones */}
      <ProductActions variants={variants} tipo={base.tipo} />

      {/* Descripción */}
      <section className="border-t border-border bg-bg px-5 py-6">
        <div className="mb-2.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
          <span className="block h-px w-3.5 bg-fire" />
          ✦ {t('ritual.eye')}
        </div>
        <h2 className="m-0 mb-3 font-goth text-3xl leading-[0.95]">
          {t('ritual.titleA')}
          <br />
          {t('ritual.titleB')}
        </h2>
        <p className="m-0 font-body text-[13.5px] leading-relaxed text-fg/85">
          {t('ritual.copy')}
        </p>

        <div className="mt-5 border border-border bg-card">
          {([
            ['composition', t('spec.compositionValue')],
            ['fit', t('spec.fitValue')],
            ['origin', 'Lima, Perú · Gamarra'],
            ['care', t('spec.careValue')],
          ] as const).map(([k, v], i, a) => (
            <div
              key={k}
              className="grid grid-cols-[110px_1fr] gap-2 px-3.5 py-3"
              style={{ borderBottom: i < a.length - 1 ? '1px solid var(--color-border)' : 'none' }}
            >
              <div className="font-mono text-[10px] uppercase tracking-ritual text-silver">
                {t(`spec.${k}`)}
              </div>
              <div className="font-body text-[12.5px] text-fg">{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Reseñas — tabla resenias aún no aplicada (ver
          supabase/migrations/_propuestas/0002_resenias.sql), por ahora
          renderizamos el estado vacío. */}
      <Reviews reviews={[]} />

      {related.length > 0 && (
        <section className="border-t border-border px-5 py-7">
          <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
            <span className="block h-px w-3.5 bg-fire" />
            {t('related.eye')}
          </div>
          <h3 className="m-0 mb-4 font-goth text-3xl leading-[0.95]">
            {t('related.title')}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {relatedCards.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
