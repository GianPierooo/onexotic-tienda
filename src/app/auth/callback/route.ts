import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import type { Database } from '@/lib/supabase/database.types';
import { defaultLocale, locales } from '@/lib/i18n/config';

function pickLocale(nextParam: string | null): string {
  if (!nextParam || !nextParam.startsWith('/')) return defaultLocale;
  const first = nextParam.split('/')[1];
  return (locales as readonly string[]).includes(first ?? '')
    ? (first as string)
    : defaultLocale;
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const nextParam = searchParams.get('next');
  const safeNext =
    nextParam && nextParam.startsWith('/') && !nextParam.startsWith('//')
      ? nextParam
      : null;
  const locale = pickLocale(safeNext);

  function buildRedirect(status: 'ok' | 'error') {
    const url = new URL(`/${locale}/auth/verificado`, origin);
    if (status === 'error') url.searchParams.set('status', 'error');
    if (status === 'ok' && safeNext) url.searchParams.set('next', safeNext);
    return url;
  }

  if (!code) {
    return NextResponse.redirect(buildRedirect('error'));
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.redirect(buildRedirect('error'));
  }

  const response = NextResponse.redirect(buildRedirect('ok'));
  const supabase = createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        response.cookies.set({ name, value: '', ...options });
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(buildRedirect('error'));
  }

  return response;
}
