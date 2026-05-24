'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function signOutAction(locale: string) {
  try {
    const supabase = createClient();
    await supabase.auth.signOut();
  } catch {
    /* sin credenciales todavía */
  }
  redirect(`/${locale}/cuenta/acceso`);
}
