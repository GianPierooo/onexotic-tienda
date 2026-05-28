import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/lib/i18n/routing';
import { GrainOverlay } from '@/components/ui/grain-overlay';
import { ResendForm } from './resend-form';

type Props = {
  params: { locale: string };
  searchParams: { status?: string; next?: string };
};

export async function generateMetadata({
  params: { locale },
  searchParams,
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'auth.verified' });
  const ok = searchParams.status !== 'error';
  return {
    title: ok ? t('metaTitleOk') : t('metaTitleError'),
    robots: { index: false, follow: false },
  };
}

export default async function VerifiedPage({
  params: { locale },
  searchParams,
}: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('auth.verified');

  const isError = searchParams.status === 'error';
  const rawNext =
    searchParams.next &&
    searchParams.next.startsWith('/') &&
    !searchParams.next.startsWith('//')
      ? searchParams.next
      : `/${locale}/cuenta`;
  const stripped = rawNext.replace(/^\/(es|en)(?=\/|$)/, '');
  const nextHref = stripped.length > 0 ? stripped : '/cuenta';

  if (isError) {
    return (
      <section className="mx-auto max-w-md px-5 py-12">
        <div className="relative overflow-hidden border border-border bg-card p-6">
          <GrainOverlay />
          <div className="relative">
            <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
              <span className="block h-px w-3.5 bg-fire" />
              ✦ {t('error.eye')}
            </div>
            <h1 className="m-0 mb-4 font-goth text-5xl leading-none text-fg">
              {t('error.title')}
            </h1>
            <p className="mb-6 font-body text-sm text-muted">
              {t('error.copy')}
            </p>

            <ResendForm
              eyebrow={t('error.resendEye')}
              placeholder={t('error.resendPlaceholder')}
              cta={t('error.resendCta')}
              sending={t('error.resendSending')}
              done={t('error.resendDone')}
              invalid={t('error.resendInvalid')}
              failed={t('error.resendFailed')}
              locale={locale}
            />

            <Link
              href="/cuenta/acceso"
              className="mt-3 flex items-center justify-center border border-border bg-card-alt px-5 py-3.5 font-body text-xs font-extrabold uppercase tracking-[.22em] text-fg"
            >
              {t('error.ctaLogin')}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-md px-5 py-12">
      <div className="relative overflow-hidden border border-border bg-card p-6">
        <GrainOverlay />
        <div className="relative">
          <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-fire">
            <span className="block h-px w-3.5 bg-fire" />
            ✦ {t('ok.eye')}
          </div>
          <h1 className="m-0 mb-4 font-goth text-5xl leading-none text-fg">
            {t('ok.title')}
          </h1>
          <p className="mb-6 font-body text-sm text-muted">{t('ok.copy')}</p>

          <Link
            href={nextHref}
            className="flex items-center justify-center bg-fire px-5 py-3.5 font-body text-xs font-extrabold uppercase tracking-[.22em] text-on-fire"
          >
            {t('ok.ctaAccount')} →
          </Link>
          <Link
            href="/tienda"
            className="mt-3 flex items-center justify-center border border-border bg-card-alt px-5 py-3.5 font-body text-xs font-extrabold uppercase tracking-[.22em] text-fg"
          >
            {t('ok.ctaShop')}
          </Link>
        </div>
      </div>
    </section>
  );
}
