import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://onexotic.shop';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api',
          '/auth/callback',
          '/auth/',
          '/es/auth/',
          '/en/auth/',
          '/es/carrito',
          '/en/carrito',
          '/es/checkout',
          '/en/checkout',
          '/es/cuenta',
          '/en/cuenta',
          '/es/pedidos',
          '/en/pedidos',
          '/sw.js',
          '/workbox-*.js',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
