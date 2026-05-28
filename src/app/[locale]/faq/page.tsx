import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/lib/i18n/routing';
import { Accordion } from '@/components/ui/accordion';

type Props = { params: { locale: string } };

const QUESTION_KEYS = [
  'shippingPeru',
  'shippingIntl',
  'care',
  'returns',
  'sizes',
  'nextDrops',
  'payments',
  'guest',
] as const;

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'faq.meta' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/faq`,
      languages: { es: '/es/faq', en: '/en/faq' },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/faq`,
    },
    twitter: { title: t('title'), description: t('description') },
  };
}

export default async function FaqPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('faq');

  const items = QUESTION_KEYS.map((k) => ({
    id: k,
    question: t(`q.${k}.question`),
    answer: <FaqAnswer keyName={k} />,
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: QUESTION_KEYS.map((k) => ({
      '@type': 'Question',
      name: t(`q.${k}.question`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(`q.${k}.answer`),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="border-b border-border bg-bg/92 px-4 py-6 backdrop-blur-md">
        <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
          <span className="block h-px w-3.5 bg-fire" />
          {t('eyebrow')}
        </div>
        <h1 className="m-0 font-black font-normal leading-[0.9] text-fg text-[54px]">
          {t('title')}
        </h1>
        <p className="mt-2 max-w-prose font-body text-[13px] leading-relaxed text-muted">
          {t('intro')}
        </p>
      </header>

      <section className="mx-4 my-5">
        <Accordion items={items} />
      </section>

      <section className="mx-4 mb-12 border border-dashed border-border bg-card-alt p-4 text-center">
        <p className="m-0 font-mono text-[10px] uppercase tracking-ritual text-silver">
          {t('moreEye')}
        </p>
        <p className="mb-2 mt-1 font-body text-[13px] text-fg">{t('moreCopy')}</p>
        <Link
          href="/contacto"
          className="inline-flex items-center justify-center bg-fire px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-ritual text-on-fire"
        >
          {t('moreCta')} →
        </Link>
      </section>
    </>
  );
}

async function FaqAnswer({ keyName }: { keyName: string }) {
  const t = await getTranslations('faq');
  // For richer answers with links, we include a link to legal pages when relevant.
  const text = t(`q.${keyName}.answer`);
  const linkable: Record<string, { href: string; label: string }> = {
    returns: { href: '/legal/cambios', label: t('linkPolicies') },
    shippingPeru: { href: '/legal/envios', label: t('linkPolicies') },
    shippingIntl: { href: '/legal/envios', label: t('linkPolicies') },
  };
  const link = linkable[keyName];
  return (
    <>
      <p className="m-0 whitespace-pre-line">{text}</p>
      {link && (
        <Link
          href={link.href}
          className="mt-2 inline-flex items-center font-mono text-[10px] uppercase tracking-ritual text-fire"
        >
          {link.label} →
        </Link>
      )}
    </>
  );
}
