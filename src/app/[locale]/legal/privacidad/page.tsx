import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { LegalPage, LegalSection } from '@/components/ui/legal-page';

type Props = { params: { locale: string } };

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'legal.privacy.meta' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/legal/privacidad`,
      languages: { es: '/es/legal/privacidad', en: '/en/legal/privacidad' },
    },
  };
}

export default async function PrivacyPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('legal.privacy');
  const sections = ['controller', 'data', 'purpose', 'sharing', 'rights', 'security', 'contact'] as const;

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
