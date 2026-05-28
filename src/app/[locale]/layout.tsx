import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { OrganizationJsonLd, WebsiteJsonLd } from '@/components/seo/structured-data';
import { Header } from '@/components/layout/header';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Footer } from '@/components/layout/footer';
import { SkipLink } from '@/components/layout/skip-link';
import { CookieBanner } from '@/components/layout/cookie-banner';
import { MiniCartToast } from '@/components/cart/mini-cart-toast';
import { CartProvider } from '@/lib/cart/cart-context';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { archivo, jetbrains, pirata, unifraktur } from '@/lib/fonts';
import { locales, type Locale } from '@/lib/i18n/config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!locales.includes(locale as Locale)) return {};
  const t = await getTranslations({ locale, namespace: 'meta.root' });
  const url = `/${locale}`;
  return {
    title: { default: t('title'), template: `%s · ${t('brand')}` },
    description: t('description'),
    keywords: t('keywords').split(',').map((k) => k.trim()),
    alternates: {
      canonical: url,
      languages: { es: '/es', en: '/en' },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_PE' : 'en_US',
      siteName: t('brand'),
      title: t('title'),
      description: t('description'),
      images: [{ url: '/og-default.png', width: 1200, height: 630, alt: t('brand') }],
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/og-default.png'],
    },
  };
}

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${pirata.variable} ${unifraktur.variable} ${archivo.variable} ${jetbrains.variable}`}
    >
      <body className="bg-bg text-fg antialiased">
        <OrganizationJsonLd locale={locale} />
        <WebsiteJsonLd locale={locale} />
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <CartProvider>
              <SkipLink />
              <div className="min-h-screen bg-bg text-fg">
                <Header />
                <main id="contenido" className="pb-nav md:pb-0">{children}</main>
                <Footer />
                <BottomNav />
              </div>
              <MiniCartToast />
              <CookieBanner />
            </CartProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
