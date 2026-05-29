import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { CartView } from './cart-view';

type Props = { params: { locale: string } };

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'cart' });
  return {
    title: t('title'),
    robots: { index: false, follow: false },
  };
}

export default function BagPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  return <CartView />;
}
