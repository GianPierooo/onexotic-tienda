import { setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { CheckoutView } from './checkout-view';
import type { Tables } from '@/lib/supabase/database.types';

export const metadata: Metadata = {
  title: 'Checkout',
  robots: { index: false, follow: false },
};

type Props = { params: { locale: string } };

type Direccion = Tables<'direcciones'>;

export default async function CheckoutPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect(
      `/${locale}/cuenta/acceso?next=${encodeURIComponent(`/${locale}/checkout`)}`
    );
  }

  const { data: dirs } = await supabase
    .from('direcciones')
    .select('*')
    .eq('cliente_id', user.id)
    .order('es_predeterminada', { ascending: false })
    .order('created_at', { ascending: false })
    .returns<Direccion[]>();

  return (
    <CheckoutView
      locale={locale}
      direcciones={dirs ?? []}
      userEmail={user.email ?? ''}
    />
  );
}
