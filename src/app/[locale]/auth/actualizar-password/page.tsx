import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { UpdatePasswordForm } from './update-password-form';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'auth.reset' });
  return {
    title: t('metaTitleUpdate'),
    robots: { index: false, follow: false },
  };
}

export default function UpdatePasswordPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  return <UpdatePasswordForm />;
}
