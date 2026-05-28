import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n/config';
import { createClient } from '@/lib/supabase/server';

const PUBLIC_ROUTES = [
  '',
  '/tienda',
  '/drops',
  '/lookbook',
  '/marca',
  '/faq',
  '/contacto',
  '/legal/terminos',
  '/legal/privacidad',
  '/legal/cambios',
  '/legal/envios',
  '/legal/reclamaciones',
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://onexotic.shop';
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    PUBLIC_ROUTES.map((route) => {
      const altLanguages = Object.fromEntries(
        locales.map((l) => [l === 'es' ? 'es-PE' : l, `${baseUrl}/${l}${route}`])
      );
      return {
        url: `${baseUrl}/${locale}${route}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.7,
        alternates: {
          languages: {
            ...altLanguages,
            'x-default': `${baseUrl}/es${route}`,
          },
        },
      };
    })
  );

  let productEntries: MetadataRoute.Sitemap = [];
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('productos')
      .select('slug, created_at')
      .eq('estado', 'activo')
      .gt('stock', 0)
      .returns<Array<{ slug: string | null; created_at: string }>>();
    if (data) {
      // Las variantes de talla comparten slug; quedarse con la fecha más
      // reciente por slug para que el sitemap tenga una entrada por prenda.
      const latestBySlug = new Map<string, string>();
      for (const p of data) {
        if (!p.slug) continue;
        const prev = latestBySlug.get(p.slug);
        if (!prev || new Date(p.created_at) > new Date(prev)) {
          latestBySlug.set(p.slug, p.created_at);
        }
      }
      productEntries = locales.flatMap((locale) =>
        Array.from(latestBySlug.entries()).map(([slug, createdAt]) => ({
          url: `${baseUrl}/${locale}/producto/${slug}`,
          lastModified: new Date(createdAt),
          changeFrequency: 'daily' as const,
          priority: 0.8,
        }))
      );
    }
  } catch {
    /* no creds — devolver solo rutas estáticas */
  }

  return [...staticEntries, ...productEntries];
}
