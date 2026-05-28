import { useTranslations } from 'next-intl';

export type Review = {
  id: string;
  autor: string;
  fecha: string;
  estrellas: number;
  texto: string;
  foto_url?: string | null;
};

export function Reviews({ reviews }: { reviews: Review[] }) {
  const t = useTranslations('reviews');

  if (reviews.length === 0) {
    return (
      <section className="border-t border-border px-5 py-7">
        <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
          <span className="block h-px w-3.5 bg-fire" />
          {t('eyebrow')}
        </div>
        <h3 className="m-0 mb-3 font-goth text-3xl leading-[0.95]">
          {t('emptyTitle')}
        </h3>
        <p className="m-0 max-w-prose font-body text-[13px] text-muted">
          {t('emptyCopy')}
        </p>
      </section>
    );
  }

  return (
    <section className="border-t border-border px-5 py-7">
      <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
        <span className="block h-px w-3.5 bg-fire" />
        {t('eyebrow')}
      </div>
      <h3 className="m-0 mb-4 font-goth text-3xl leading-[0.95]">
        {t('title', { count: reviews.length })}
      </h3>
      <div className="flex flex-col gap-3">
        {reviews.map((r) => (
          <ReviewCard key={r.id} r={r} />
        ))}
      </div>
    </section>
  );
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <article className="border border-border bg-card p-4">
      <header className="flex items-baseline justify-between gap-3">
        <div>
          <div className="font-body text-[13px] font-bold uppercase tracking-wide text-fg">
            {r.autor}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-ritual text-silver">
            {new Date(r.fecha).toLocaleDateString('es-PE', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </div>
        </div>
        <Stars n={r.estrellas} />
      </header>
      <p className="m-0 mt-2 font-body text-[13px] leading-relaxed text-fg/85">
        {r.texto}
      </p>
    </article>
  );
}

function Stars({ n }: { n: number }) {
  const safe = Math.max(0, Math.min(5, Math.round(n)));
  return (
    <div className="flex gap-0.5" aria-label={`${safe} / 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          aria-hidden
          className="text-[14px]"
          style={{ color: i < safe ? 'var(--color-fire)' : 'var(--color-silver-dim)' }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
