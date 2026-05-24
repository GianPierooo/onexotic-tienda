import { setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { AuthForm } from './auth-form';

type Props = {
  params: { locale: string };
  searchParams: { next?: string; mode?: string };
};

export default async function AccessPage({
  params: { locale },
  searchParams,
}: Props) {
  setRequestLocale(locale);

  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) redirect(`/${locale}/cuenta`);
  } catch {
    /* sin credenciales todavía, dejar el form visible */
  }

  return (
    <AuthForm
      next={searchParams.next ?? `/${locale}/cuenta`}
      initialMode={searchParams.mode === 'signup' ? 'signup' : 'login'}
    />
  );
}
