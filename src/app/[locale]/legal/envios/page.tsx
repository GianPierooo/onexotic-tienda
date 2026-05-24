import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { LegalPage, LegalSection } from '@/components/ui/legal-page';
import { STORE, formatSoles, SHIPPING_RATES } from '@/lib/store-config';

type Props = { params: { locale: string } };

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'legal.shipping.meta' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/legal/envios`,
      languages: { es: '/es/legal/envios', en: '/en/legal/envios' },
    },
  };
}

export default async function ShippingPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('legal.shipping');
  const sections = ['zones', 'times', 'tracking', 'failed', 'international', 'risk'] as const;

  return (
    <LegalPage
      eyebrow={t('eyebrow')}
      title={t('title')}
      intro={t('intro')}
      updated={t('updated')}
    >
      <section className="border border-border bg-card">
        <div className="border-b border-border px-4 py-3 font-mono text-[10px] uppercase tracking-[.28em] text-silver">
          {t('table.title')}
        </div>
        <div className="divide-y divide-border">
          <Row
            zone={t('zones.lima')}
            cost={formatSoles(SHIPPING_RATES.lima)}
            time={t('times.lima')}
          />
          <Row
            zone={t('zones.provincia')}
            cost={formatSoles(SHIPPING_RATES.provincia)}
            time={t('times.provincia')}
          />
          <Row
            zone={t('zones.internacional')}
            cost={t('table.fromCost', { cost: formatSoles(SHIPPING_RATES.internacional) })}
            time={t('times.internacional')}
          />
        </div>
        <div className="border-t border-border bg-card-alt px-4 py-3 font-mono text-[10px] uppercase tracking-[.22em] text-fire">
          ✦ {t('table.freeOver', { amount: formatSoles(STORE.freeShippingThreshold) })}
        </div>
      </section>

      {sections.map((key, i) => (
        <LegalSection
          key={key}
          no={(i + 1).toString().padStart(2, '0')}
          title={t(`s.${key}.title`)}
        >
          <p>{t(`s.${key}.body`)}</p>
        </LegalSection>
      ))}
    </LegalPage>
  );
}

function Row({ zone, cost, time }: { zone: string; cost: string; time: string }) {
  return (
    <div className="grid grid-cols-3 px-4 py-3 font-body text-[13px]">
      <span className="font-bold uppercase tracking-wide text-white">{zone}</span>
      <span className="font-mono text-[12px] text-white">{cost}</span>
      <span className="text-right font-mono text-[12px] text-muted">{time}</span>
    </div>
  );
}
