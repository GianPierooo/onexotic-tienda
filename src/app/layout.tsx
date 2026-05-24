import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://onexotic.shop'),
  title: {
    default: 'OnExotic — No es moda. Es jerarquía.',
    template: '%s · OnExotic',
  },
  description:
    'Tienda oficial de OnExotic. Drops limitados de gymwear, oversize y streetwear. Cuando se acaba, se acaba.',
  applicationName: 'OnExotic',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'OnExotic',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'OnExotic',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'OnExotic' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-default.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#B81414',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

// Root layout — solo passthrough. El <html>/<body> con lang dinámico vive
// en src/app/[locale]/layout.tsx según el patrón oficial de next-intl.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
