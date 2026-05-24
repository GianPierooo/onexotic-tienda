import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { LegalPage, LegalSection } from '@/components/ui/legal-page';

type Props = { params: { locale: string } };

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'legal.terms.meta' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/legal/terminos`,
      languages: { es: '/es/legal/terminos', en: '/en/legal/terminos' },
    },
  };
}

export default async function TermsPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('legal.terms');
  const sections = [
    'object',
    'orders',
    'prices',
    'shipping',
    'returns',
    'liability',
    'jurisdiction',
  ] as const;

  return (
    <LegalPage
      eyebrow={t('eyebrow')}
      title={t('title')}
      intro={t('intro')}
      updated={t('updated')}
    >
      {sections.map((key, i) => (
        <LegalSection
          key={key}
          no={(i + 1).toString().padStart(2, '0')}
          title={t(`s.${key}.title`)}
        >
          <p>{t(`s.${key}.body`)}</p>
        </LegalSection>
      ))}
    </LegalPage>
  );
}
