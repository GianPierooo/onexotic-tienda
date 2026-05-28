import { STORE } from '@/lib/store-config';

export function StructuredData({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd({ locale }: { locale: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OnExotic',
    legalName: 'OnExotic',
    url: STORE.storeUrl,
    logo: `${STORE.storeUrl}/icon.png`,
    email: STORE.contactEmail,
    telephone: STORE.whatsappLabel,
    sameAs: [] as string[],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PE',
      addressLocality: 'Lima',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: STORE.contactEmail,
      telephone: STORE.whatsappLabel,
      areaServed: ['PE', 'global'],
      availableLanguage: ['Spanish', 'English'],
    },
    inLanguage: locale === 'es' ? 'es-PE' : 'en',
  };
  return <StructuredData data={data} />;
}

export function WebsiteJsonLd({ locale }: { locale: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'OnExotic',
    url: `${STORE.storeUrl}/${locale}`,
    inLanguage: locale === 'es' ? 'es-PE' : 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${STORE.storeUrl}/${locale}/tienda?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
  return <StructuredData data={data} />;
}

export type Crumb = { name: string; url: string };

export function BreadcrumbsJsonLd({ items }: { items: Crumb[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url.startsWith('http') ? c.url : `${STORE.storeUrl}${c.url}`,
    })),
  };
  return <StructuredData data={data} />;
}
