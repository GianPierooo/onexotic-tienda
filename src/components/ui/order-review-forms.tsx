'use client';

import { useMemo, useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { enviarResenia } from '@/lib/review-actions';

type Item = { producto_id: string; nombre: string };

type Props = {
  items: Item[];
  /** producto_id → ya tiene reseña de este cliente (pendiente o aprobada). */
  reviewed: Record<string, boolean>;
};

/**
 * Formularios "Reseñar esta pieza" en el detalle de un pedido ENTREGADO.
 * Una reseña por producto; con aprobación manual (queda "en revisión").
 */
export function OrderReviewForms({ items, reviewed }: Props) {
  const t = useTranslations('order.review');
  const unique = useMemo(
    () => Array.from(new Map(items.map((i) => [i.producto_id, i])).values()),
    [items]
  );
  if (unique.length === 0) return null;

  return (
    <section className="border-t border-border px-4 py-6">
      <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
        <span className="block h-px w-3.5 bg-fire" />
        {t('eyebrow')}
      </div>
      <h2 className="m-0 mb-4 font-goth text-3xl leading-tight text-fg">
        {t('title')}
      </h2>
      <div className="flex flex-col gap-3">
        {unique.map((it) => (
          <ReviewRow
            key={it.producto_id}
            item={it}
            already={Boolean(reviewed[it.producto_id])}
          />
        ))}
      </div>
    </section>
  );
}

function ReviewRow({ item, already }: { item: Item; already: boolean }) {
  const t = useTranslations('order.review');
  const [pending, start] = useTransition();
  const [estrellas, setEstrellas] = useState(5);
  const [texto, setTexto] = useState('');
  const [done, setDone] = useState(already);
  const [error, setError] = useState<string | null>(null);

  if (done) {
    return (
      <div className="border border-border bg-card px-3.5 py-3">
        <div className="font-body text-[13px] font-bold text-fg">{item.nombre}</div>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-ritual text-fire">
          ✦ {t('inReview')}
        </div>
      </div>
    );
  }

  function submit() {
    setError(null);
    if (texto.trim().length < 5) {
      setError(t('errors.texto'));
      return;
    }
    start(async () => {
      const res = await enviarResenia({
        productoId: item.producto_id,
        estrellas,
        texto,
      });
      if (!res.ok) {
        if (res.error === 'duplicada') {
          setDone(true);
          return;
        }
        setError(t(`errors.${res.error}` as never) || t('errors.generic'));
        return;
      }
      setDone(true);
    });
  }

  return (
    <div className="border border-border bg-card px-3.5 py-3.5">
      <div className="font-body text-[13px] font-bold text-fg">{item.nombre}</div>

      <div className="mt-2 flex items-center gap-1.5" role="radiogroup" aria-label={t('stars')}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={estrellas === n}
            aria-label={`${n}`}
            onClick={() => setEstrellas(n)}
            className="text-[22px] leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fire"
            style={{ color: n <= estrellas ? 'var(--color-fire)' : 'var(--color-silver-dim)' }}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        rows={3}
        maxLength={1500}
        placeholder={t('placeholder')}
        className="mt-2.5 w-full resize-y border border-border bg-bg px-3 py-2 font-body text-[13px] text-fg placeholder:text-muted focus:border-fire focus:outline-none"
      />

      {error && (
        <p className="mt-2 font-mono text-[10px] uppercase tracking-ritual text-error">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={submit}
        disabled={pending}
        className="mt-2.5 inline-flex items-center justify-center bg-fire px-4 py-2.5 font-body text-[11px] font-extrabold uppercase tracking-[.22em] text-on-fire disabled:opacity-60"
      >
        {pending ? t('sending') : t('submit')}
      </button>
    </div>
  );
}
