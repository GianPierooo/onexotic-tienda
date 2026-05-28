import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';
import { routing } from '@/lib/i18n/routing';
import { updateSession } from '@/lib/supabase/middleware';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const intlResponse = intlMiddleware(request);

  // Si next-intl redirige o reescribe, respetarlo sin tocar cookies.
  if (intlResponse.status >= 300 && intlResponse.status < 400) {
    return intlResponse;
  }
  if (intlResponse.headers.get('x-middleware-rewrite')) {
    return intlResponse;
  }

  // Para requests normales, refrescar la sesión Supabase.
  return updateSession(request, intlResponse instanceof NextResponse ? intlResponse : NextResponse.next());
}

export const config = {
  matcher: [
    '/',
    '/((?!api|auth|_next|_vercel|sw\\.js|workbox|fallback|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest|icons|.*\\..*).*)',
  ],
};
