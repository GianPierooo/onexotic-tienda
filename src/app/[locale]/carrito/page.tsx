import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { CartView } from './cart-view';

export const metadata: Metadata = {
  title: 'Bolsa',
  robots: { index: false, follow: false },
};

type Props = { params: { locale: string } };

export default function BagPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  return <CartView />;
}
