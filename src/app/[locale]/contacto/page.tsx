import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { STORE } from '@/lib/store-config';
import { ContactForm } from './contact-form';

type Props = { params: { locale: string } };

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'contact.meta' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/contacto`,
      languages: { es: '/es/contacto', en: '/en/contacto' },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/contacto`,
    },
    twitter: { title: t('title'), description: t('description') },
  };
}

export default async function ContactPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <>
      <header className="border-b border-border bg-bg/92 px-4 py-6 backdrop-blur-md">
        <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
          <span className="block h-px w-3.5 bg-fire" />
          {t('eyebrow')}
        </div>
        <h1 className="m-0 font-black font-normal leading-[0.9] text-fg text-[54px]">
          {t('title')}
        </h1>
        <p className="mt-2 max-w-prose font-body text-[13px] leading-relaxed text-muted">
          {t('intro')}
        </p>
      </header>

      <section className="mx-4 my-5 grid gap-4 md:grid-cols-3">
        <a
          href={`https://wa.me/${STORE.whatsappPhone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-border bg-card p-4 text-fg"
        >
          <div className="font-mono text-[10px] uppercase tracking-ritual text-silver">
            {t('channels.whatsapp')}
          </div>
          <div className="mt-1 font-body text-[14px] font-bold text-fg">
            {STORE.whatsappLabel}
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-ritual text-fire">
            {t('channels.openWa')} →
          </div>
        </a>

        <a
          href={`mailto:${STORE.contactEmail}`}
          className="border border-border bg-card p-4 text-fg"
        >
          <div className="font-mono text-[10px] uppercase tracking-ritual text-silver">
            {t('channels.email')}
          </div>
          <div className="mt-1 font-body text-[14px] font-bold text-fg">
            {STORE.contactEmail}
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-ritual text-fire">
            {t('channels.openEmail')} →
          </div>
        </a>

        <div className="border border-dashed border-border bg-card-alt p-4 text-fg">
          <div className="font-mono text-[10px] uppercase tracking-ritual text-silver">
            {t('channels.social')}
          </div>
          <div className="mt-1 font-body text-[14px] font-bold text-fg">
            {t('channels.socialSoon')}
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-ritual text-muted">
            {t('channels.socialSoonHint')}
          </div>
        </div>
      </section>

      <section className="mx-4 mb-12 border border-border bg-card p-5">
        <h2 className="m-0 mb-3 font-goth text-3xl leading-tight text-fg">
          {t('form.title')}
        </h2>
        <ContactForm />
      </section>
    </>
  );
}
