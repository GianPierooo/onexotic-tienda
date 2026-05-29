import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { CheckoutGate } from './checkout-gate';
import type { Tables } from '@/lib/supabase/database.types';

type Props = { params: { locale: string } };

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'checkout' });
  return {
    title: t('title'),
    robots: { index: false, follow: false },
  };
}
type Direccion = Tables<'direcciones'>;

export default async function CheckoutPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let direcciones: Direccion[] = [];
  if (user) {
    const { data } = await supabase
      .from('direcciones')
      .select('*')
      .eq('cliente_id', user.id)
      .order('es_predeterminada', { ascending: false })
      .order('created_at', { ascending: false })
      .returns<Direccion[]>();
    direcciones = data ?? [];
  }

  return (
    <CheckoutGate
      locale={locale}
      direcciones={direcciones}
      userEmail={user?.email ?? null}
    />
  );
}
