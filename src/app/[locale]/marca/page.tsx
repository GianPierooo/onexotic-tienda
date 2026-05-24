import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/lib/i18n/routing';
import { GrainOverlay } from '@/components/ui/grain-overlay';
import { EditorialPlate } from '@/components/ui/editorial-plate';
import { getClosedDrops, getDropStats } from '@/lib/queries';

type Props = { params: { locale: string } };

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.story' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/marca`,
      languages: { es: '/es/marca', en: '/en/marca' },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/marca`,
    },
    twitter: { title: t('title'), description: t('description') },
  };
}

export default async function StoryPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('story');

  const closed = await getClosedDrops();
  const stats = await getDropStats(closed.map((d) => d.id));
  const totalPiezas = stats.reduce((s, x) => s + x.totalPiezas, 0);

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          height: 640,
          background:
            'radial-gradient(120% 80% at 70% 20%, #2a1208 0%, #0e0606 55%, #050202 100%)',
        }}
      >
        <GrainOverlay />
        <svg
          viewBox="0 0 400 640"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full opacity-45"
          aria-hidden
        >
          <defs>
            <linearGradient id="hhs" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#C0C0C0" stopOpacity="0" />
              <stop offset=".5" stopColor="#C0C0C0" stopOpacity=".6" />
              <stop offset="1" stopColor="#C0C0C0" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hhf" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#B81414" stopOpacity="0" />
              <stop offset=".5" stopColor="#B81414" stopOpacity=".75" />
              <stop offset="1" stopColor="#B81414" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="40" y1="220" x2="360" y2="220" stroke="url(#hhs)" strokeWidth=".8" />
          <line x1="200" y1="60" x2="200" y2="200" stroke="url(#hhs)" strokeWidth=".6" />
          <path
            d="M-20 500 Q120 380 200 460 T 440 360"
            stroke="url(#hhf)"
            strokeWidth="1.2"
            fill="none"
          />
          <circle cx="200" cy="200" r="2.5" fill="#C0C0C0" opacity=".8" />
        </svg>
        <div className="absolute inset-0 flex flex-col justify-between px-6 pb-8 pt-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[.4em] text-silver">
              <span className="block h-px w-4 bg-silver/60" />
              ✦ {t('hero.eye')} ✦
              <span className="block h-px w-4 bg-silver/60" />
            </div>
          </div>
          <div className="text-center">
            <div className="mb-3 font-mono text-[9.5px] uppercase tracking-[.36em] text-silver">
              {t('hero.location')}
            </div>
            <h1
              className="m-0 font-black font-normal leading-[0.82] text-white"
              style={{ fontSize: 78, textShadow: '0 6px 40px rgba(0,0,0,.7)' }}
            >
              {t('hero.titleA')}
              <br />
              {t('hero.titleB')}
            </h1>
            <p className="mx-auto mt-5 max-w-[290px] font-body text-[13.5px] leading-relaxed text-white/85">
              {t('hero.copy')}{' '}
              <span className="text-fire">{t('hero.copyAccent')}</span>
            </p>
          </div>
          <div className="flex justify-between font-mono text-[9px] uppercase tracking-[.24em] text-silver">
            <span>{t('hero.read')}</span>
            <span>{t('hero.chapters')}</span>
          </div>
        </div>
      </section>

      {/* Stats ribbon */}
      <section className="relative overflow-hidden border-y border-border bg-card-alt">
        <GrainOverlay />
        <div className="relative grid grid-cols-3">
          {[
            [closed.length.toString().padStart(2, '0'), t('stats.chapters')],
            [totalPiezas.toString(), t('stats.pieces')],
            ['2.4K+', t('stats.cult')],
          ].map(([n, l], i, a) => (
            <div
              key={l}
              className="px-2 py-6 text-center"
              style={{ borderRight: i < a.length - 1 ? '1px solid #2A2A2A' : 'none' }}
            >
              <div className="font-goth text-4xl leading-none">{n}</div>
              <div className="mt-2 font-mono text-[8.5px] uppercase tracking-[.22em] text-silver">
                {l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Capítulo 01 */}
      <Chapter no="01" eye={t('cap01.eye')} title={t('cap01.title')}>
        <Lede>{t('cap01.lede')}</Lede>
        <P>
          {t('cap01.p1.a')}
          <FireSpan>{t('cap01.p1.fire1')}</FireSpan>
          {t('cap01.p1.b')}
          <FireSpan>{t('cap01.p1.fire2')}</FireSpan>
          {t('cap01.p1.c')}
          <FireSpan>{t('cap01.p1.fire3')}</FireSpan>
          {t('cap01.p1.d')}
        </P>
        <P>{t('cap01.p2')}</P>
        <EditorialPlate
          tone="b"
          alignH="left"
          label={t('cap01.imageLabel')}
          className="mt-4 border border-border"
          style={{ aspectRatio: '5 / 4' }}
        />
      </Chapter>

      {/* Quote */}
      <Quote q={t('quote1.text')} who={t('quote1.who')} />

      {/* Capítulo 02 */}
      <Chapter no="02" eye={t('cap02.eye')} title={t('cap02.title')}>
        <P>{t('cap02.p1')}</P>
        <P>{t('cap02.p2')}</P>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <EditorialPlate
            tone="c"
            label={t('cap02.logoV0')}
            className="border border-border"
            style={{ aspectRatio: '1 / 1' }}
          />
          <EditorialPlate
            tone="e"
            label={t('cap02.logoNow')}
            className="border border-silver"
            style={{ aspectRatio: '1 / 1' }}
          />
        </div>
      </Chapter>

      {/* Cronología */}
      <Timeline closedCount={closed.length} t={t} />

      {/* Pilares */}
      <Pillars t={t} />

      {/* Proceso */}
      <Process t={t} />

      {/* Cierre */}
      <section
        className="relative overflow-hidden border-t border-border px-6 pb-10 pt-20 text-center"
        style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #160707 100%)' }}
      >
        <GrainOverlay />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2"
          style={{
            width: 340,
            height: 340,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(184,20,20,.32) 0%, transparent 65%)',
          }}
        />
        <div className="relative">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[.42em] text-silver">
            ✦ {t('close.eye')} ✦
          </div>
          <h2
            className="m-0 font-black font-normal leading-[0.85] text-white"
            style={{ fontSize: 56 }}
          >
            {t('close.titleA')}
            <br />
            {t('close.titleB')}
            <br />
            <span className="text-fire">
              {t('close.titleC')}
              <br />
              {t('close.titleD')}
            </span>
          </h2>
          <p className="mx-auto mb-7 mt-6 max-w-[280px] font-body text-[13px] leading-relaxed text-white/85">
            {t('close.copy')}
          </p>
          <Link
            href="/tienda"
            className="inline-flex items-center gap-3 bg-fire px-6 py-4 font-body text-xs font-extrabold uppercase tracking-[.28em] text-white"
            style={{ boxShadow: '0 10px 28px rgba(184,20,20,.35)' }}
          >
            {t('close.cta')} <span className="font-mono">→</span>
          </Link>
          <div className="mt-12 font-black text-5xl leading-none text-white">
            OnExotic
          </div>
          <div className="mt-3 font-mono text-[9px] uppercase tracking-[.32em] text-silver/60">
            © 2026 · Lima · PE · {t('close.signature')}
          </div>
        </div>
      </section>
    </>
  );
}

function Chapter({
  no,
  eye,
  title,
  children,
}: {
  no: string;
  eye: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-dashed border-border px-6 pb-2 pt-14">
      <div className="mb-5 flex items-baseline gap-3.5">
        <div className="font-goth text-5xl leading-none tracking-wide text-silver">
          {no}
        </div>
        <div className="flex-1">
          <div className="mb-1.5 flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[.32em] text-silver">
            <span className="block h-px w-3.5 bg-fire" />
            {eye}
          </div>
          <h2 className="m-0 font-black font-normal leading-[0.88] text-white text-4xl">
            {title}
          </h2>
        </div>
      </div>
      {children}
    </section>
  );
}

function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 m-0 font-body text-[15px] leading-relaxed text-white">
      {children}
    </p>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 m-0 font-body text-[13.5px] leading-relaxed text-white/85">
      {children}
    </p>
  );
}

function FireSpan({ children }: { children: React.ReactNode }) {
  return <span className="font-bold text-fire">{children}</span>;
}

function Quote({ q, who }: { q: string; who: string }) {
  return (
    <section className="relative overflow-hidden border-y border-border bg-card-alt px-6 py-14 text-center">
      <GrainOverlay />
      <div className="relative">
        <div className="mb-2.5 font-mono text-lg tracking-[.4em] text-fire">
          {'“ ”'}
        </div>
        <blockquote className="m-0 font-goth font-normal leading-none text-white text-3xl">
          {q}
        </blockquote>
        <div className="mt-6 inline-flex items-center gap-2.5 font-mono text-[9.5px] uppercase tracking-[.32em] text-silver">
          <span className="block h-px w-4 bg-silver/60" />
          {who}
          <span className="block h-px w-4 bg-silver/60" />
        </div>
      </div>
    </section>
  );
}

function Timeline({
  closedCount,
  t,
}: {
  closedCount: number;
  t: Awaited<ReturnType<typeof getTranslations<'story'>>>;
}) {
  const milestones: Array<{ d: string; t: string; n: string; live?: boolean }> = [
    { d: t('timeline.m1.d'), t: t('timeline.m1.t'), n: t('timeline.m1.n') },
    { d: t('timeline.m2.d'), t: t('timeline.m2.t'), n: t('timeline.m2.n') },
    { d: t('timeline.m3.d'), t: t('timeline.m3.t'), n: t('timeline.m3.n') },
    { d: t('timeline.m4.d'), t: t('timeline.m4.t'), n: t('timeline.m4.n') },
    {
      d: t('timeline.m5.d'),
      t: t('timeline.m5.t'),
      n: t('timeline.m5.n', { closed: closedCount }),
      live: true,
    },
  ];
  return (
    <section className="border-t border-dashed border-border px-6 pb-2 pt-14">
      <div className="mb-3 flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[.32em] text-silver">
        <span className="block h-px w-3.5 bg-fire" />
        {t('timeline.eye')}
      </div>
      <h2 className="m-0 mb-7 font-black font-normal leading-[0.88] text-white text-4xl">
        {t('timeline.title')}
      </h2>
      <div className="relative pl-6">
        <div
          aria-hidden
          className="absolute bottom-1.5 left-1.5 top-1.5 w-px opacity-60"
          style={{ background: 'linear-gradient(180deg, #C0C0C0 0%, #B81414 100%)' }}
        />
        {milestones.map((m) => (
          <div key={m.d} className="relative pb-6">
            <div
              aria-hidden
              className="absolute left-[-22px] top-1.5 h-2.5 w-2.5 rotate-45 border-2 border-bg"
              style={{
                background: m.live ? '#B81414' : '#C0C0C0',
                boxShadow: m.live ? '0 0 12px #B81414' : 'none',
              }}
            />
            <div className="font-mono text-[9.5px] uppercase tracking-[.28em] text-silver">
              {m.d}
              {m.live && (
                <span className="ml-2 text-fire">● {t('timeline.live')}</span>
              )}
            </div>
            <div className="mt-1 font-body text-[15px] font-extrabold uppercase tracking-wide">
              {m.t}
            </div>
            <div className="mt-1 font-body text-[12.5px] leading-relaxed text-white/85">
              {m.n}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pillars({
  t,
}: {
  t: Awaited<ReturnType<typeof getTranslations<'story'>>>;
}) {
  const items: Array<{ no: string; t: string; d: string }> = [
    { no: 'I', t: t('pillars.p1.t'), d: t('pillars.p1.d') },
    { no: 'II', t: t('pillars.p2.t'), d: t('pillars.p2.d') },
    { no: 'III', t: t('pillars.p3.t'), d: t('pillars.p3.d') },
    { no: 'IV', t: t('pillars.p4.t'), d: t('pillars.p4.d') },
  ];
  return (
    <section className="border-t border-dashed border-border px-6 pb-3 pt-14">
      <div className="mb-3 flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[.32em] text-silver">
        <span className="block h-px w-3.5 bg-fire" />
        ✦ {t('pillars.eye')}
      </div>
      <h2 className="m-0 mb-6 font-black font-normal leading-[0.88] text-white text-4xl">
        {t('pillars.title')}
      </h2>
      <div className="flex flex-col gap-3">
        {items.map((it) => (
          <div
            key={it.no}
            className="grid gap-3 border border-border bg-card px-4 py-4"
            style={{ gridTemplateColumns: '48px 1fr', borderLeft: '2px solid #B81414' }}
          >
            <div className="font-goth text-4xl leading-none tracking-wide text-silver">
              {it.no}
            </div>
            <div>
              <div className="font-body text-[14px] font-extrabold uppercase tracking-wide">
                {it.t}
              </div>
              <div className="mt-1.5 font-body text-[12.5px] leading-relaxed text-white/85">
                {it.d}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Process({
  t,
}: {
  t: Awaited<ReturnType<typeof getTranslations<'story'>>>;
}) {
  const steps: Array<[string, string, string]> = [
    ['01', t('process.s1.t'), t('process.s1.d')],
    ['02', t('process.s2.t'), t('process.s2.d')],
    ['03', t('process.s3.t'), t('process.s3.d')],
    ['04', t('process.s4.t'), t('process.s4.d')],
  ];
  return (
    <section className="border-t border-dashed border-border px-6 pb-5 pt-14">
      <div className="mb-3 flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[.32em] text-silver">
        <span className="block h-px w-3.5 bg-fire" />
        {t('process.eye')}
      </div>
      <h2 className="m-0 mb-5 font-black font-normal leading-[0.88] text-white text-4xl">
        {t('process.titleA')}
        <br />
        {t('process.titleB')}
      </h2>
      <div className="grid grid-cols-2 gap-2.5">
        {steps.map(([n, title, d]) => (
          <div
            key={n}
            className="flex flex-col gap-2 border border-border bg-card px-3 py-3.5"
          >
            <div className="flex items-center justify-between">
              <div className="font-goth text-2xl leading-none tracking-wide text-silver">
                {n}
              </div>
              <div className="ml-2.5 h-px flex-1 bg-silver/30" />
            </div>
            <div className="font-body text-[13px] font-extrabold uppercase tracking-wide">
              {title}
            </div>
            <div className="font-body text-[11.5px] leading-relaxed text-silver">
              {d}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
