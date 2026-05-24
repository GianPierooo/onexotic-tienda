import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { ClaimForm } from './claim-form';

type Props = { params: { locale: string } };

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'legal.claims.meta' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/legal/reclamaciones`,
      languages: { es: '/es/legal/reclamaciones', en: '/en/legal/reclamaciones' },
    },
  };
}

export default async function ClaimsPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('legal.claims');

  return (
    <article className="mx-auto max-w-2xl px-5 py-10">
      <header className="mb-6">
        <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.32em] text-silver">
          <span className="block h-px w-3.5 bg-fire" />
          {t('eyebrow')}
        </div>
        <h1 className="m-0 font-black font-normal leading-[0.9] text-white text-[44px] md:text-[60px]">
          {t('title')}
        </h1>
        <p className="mt-3 font-body text-sm leading-relaxed text-white/80">
          {t('intro')}
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-ritual text-muted">
          {t('legalCite')}
        </p>
      </header>
      <ClaimForm />
    </article>
  );
}
