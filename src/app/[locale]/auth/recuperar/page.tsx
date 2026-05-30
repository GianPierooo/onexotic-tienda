import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { RequestResetForm } from './request-reset-form';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'auth.reset' });
  return {
    title: t('metaTitle'),
    robots: { index: false, follow: false },
  };
}

export default function RecoverPasswordPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  return <RequestResetForm />;
}
