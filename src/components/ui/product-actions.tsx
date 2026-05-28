'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useRouter } from '@/lib/i18n/routing';
import { useCart } from '@/lib/cart/cart-context';
import { buildProductWhatsAppUrl } from '@/lib/cart/whatsapp';
import { formatSoles, STORE } from '@/lib/store-config';
import { SizeGuide } from './size-guide';
import { BagIcon } from '@/components/icons';

export type Variant = {
  id: string;
  talla: string;
  stock: number;
  estado: string;
  precio: number | null;
  sku: string | null;
  imagen_url: string | null;
  color: string | null;
  nombre: string;
};

type Props = {
  variants: Variant[];
  tipo?: string;
};

function categoryFromTipo(tipo: string | undefined) {
  const t = (tipo ?? '').toLowerCase();
  if (/pant|jean|trouser/.test(t)) return 'pantalones' as const;
  if (/short|bermuda/.test(t)) return 'shorts' as const;
  if (/acces|gorra|cap|bag/.test(t)) return 'unica' as const;
  return 'tops' as const;
}

export function ProductActions({ variants, tipo }: Props) {
  const t = useTranslations('product');
  const router = useRouter();
  const cart = useCart();

  const ordered = useMemo(() => sortByTalla(variants), [variants]);
  const stockTotal = ordered.reduce((s, v) => s + Math.max(0, v.stock), 0);
  const todoAgotado = stockTotal === 0;

  const firstAvailable = ordered.find((v) => v.stock > 0 && v.estado !== 'agotado');
  const [selectedId, setSelectedId] = useState<string | null>(
    firstAvailable?.id ?? ordered[0]?.id ?? null
  );
  const selected = ordered.find((v) => v.id === selectedId) ?? null;
  const selectedDisponible =
    selected != null && selected.stock > 0 && selected.estado !== 'agotado';
  const precio = selected?.precio ?? ordered[0]?.precio ?? 0;

  const [feedback, setFeedback] = useState<'idle' | 'added' | 'oos'>('idle');

  function onAdd() {
    if (!selected || !selectedDisponible) {
      setFeedback('oos');
      return;
    }
    cart.add(
      {
        productoId: selected.id,
        nombre: selected.nombre,
        sku: selected.sku,
        talla: selected.talla,
        color: selected.color,
        precio: precio,
        imagen: selected.imagen_url,
        stock: selected.stock,
      },
      1
    );
    setFeedback('added');
    setTimeout(() => setFeedback('idle'), 1600);
  }

  function onCheckout() {
    if (!selected || !selectedDisponible) return;
    cart.add(
      {
        productoId: selected.id,
        nombre: selected.nombre,
        sku: selected.sku,
        talla: selected.talla,
        color: selected.color,
        precio: precio,
        imagen: selected.imagen_url,
        stock: selected.stock,
      },
      1
    );
    router.push('/carrito');
  }

  const waUrl = buildProductWhatsAppUrl({
    nombre: selected?.nombre ?? ordered[0]?.nombre ?? '',
    sku: selected?.sku ?? null,
    talla: selected?.talla ?? null,
    color: selected?.color ?? null,
    precio,
  });

  return (
    <>
      <section className="px-5 pb-5">
        <div className="mb-2.5 flex items-baseline justify-between">
          <div className="font-mono text-[10px] uppercase tracking-ritual text-silver">
            {t('size.label')}{' '}
            <span className="text-fg">
              · {selected?.talla ?? '—'}
            </span>
          </div>
          <SizeGuide category={categoryFromTipo(tipo)} />
        </div>

        <div className="grid grid-cols-4 gap-2">
          {ordered.map((v) => {
            const out = v.stock <= 0 || v.estado === 'agotado';
            const last = !out && v.stock <= 2;
            const low = !out && !last && v.stock <= 5;
            const active = v.id === selectedId;
            return (
              <button
                key={v.id}
                type="button"
                disabled={out}
                onClick={() => setSelectedId(v.id)}
                className="relative flex h-[74px] flex-col items-center justify-center gap-1 border transition-colors"
                style={{
                  background: active ? 'var(--color-fg)' : 'transparent',
                  color: active ? 'var(--color-bg)' : out ? 'var(--color-silver-dim)' : 'var(--color-fg)',
                  borderColor: active ? 'var(--color-fg)' : out ? 'var(--card-frame-border)' : 'var(--color-border)',
                  opacity: out ? 0.55 : 1,
                  cursor: out ? 'not-allowed' : 'pointer',
                }}
              >
                <span
                  className="font-body text-xl font-extrabold"
                  style={{
                    textDecoration: out ? 'line-through' : 'none',
                  }}
                >
                  {v.talla}
                </span>
                <span
                  className="font-mono text-[9px] uppercase tracking-ritual"
                  style={{
                    color: active
                      ? 'var(--color-bg)'
                      : out
                        ? 'var(--color-silver-dim)'
                        : last || low
                          ? 'var(--color-fire)'
                          : 'var(--color-muted)',
                  }}
                >
                  {out
                    ? t('size.outShort')
                    : last
                      ? t('size.last')
                      : `${v.stock} ${t('size.left')}`}
                </span>
                {last && !active && (
                  <span
                    aria-hidden
                    className="absolute right-[-1px] top-[-1px] block h-1.5 w-1.5 bg-fire"
                  />
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section className="sticky bottom-0 z-30 mt-4 flex flex-col gap-2.5 border-t border-border bg-bg/95 px-4 py-3.5 backdrop-blur-md">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 border border-border bg-card px-3 py-3 font-body text-[11.5px] font-bold uppercase tracking-ritual text-fg"
        >
          <WhatsAppIcon />
          {t('actions.askWhatsapp')}
          <span className="font-mono text-[10px] normal-case tracking-wide text-muted">
            · {STORE.whatsappLabel}
          </span>
        </a>

        <motion.button
          type="button"
          onClick={onAdd}
          whileTap={{ scale: 0.98 }}
          disabled={todoAgotado || !selectedDisponible}
          className="flex w-full items-center justify-between px-4 py-4 font-body text-[13px] font-extrabold uppercase tracking-[.22em] text-fg disabled:opacity-60"
          style={{
            background: todoAgotado || !selectedDisponible ? 'var(--color-border)' : 'var(--color-fire)',
            boxShadow:
              todoAgotado || !selectedDisponible
                ? 'none'
                : '0 -4px 24px rgba(184,20,20,.32)',
          }}
        >
          <span className="flex items-center gap-2.5">
            <BagIcon size={20} />
            {todoAgotado
              ? t('actions.soldOut')
              : feedback === 'added'
                ? t('actions.added')
                : t('actions.addToBag')}
          </span>
          <span className="font-mono text-[13px]">
            {formatSoles(precio)} {todoAgotado ? '·' : '→'}
          </span>
        </motion.button>

        <button
          type="button"
          onClick={onCheckout}
          disabled={todoAgotado || !selectedDisponible}
          className="font-mono text-[10px] uppercase tracking-ritual text-silver hover:text-fg disabled:opacity-50"
        >
          {t('actions.goPay')} →
        </button>
      </section>
    </>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden
      style={{ color: '#25D366' }}
    >
      <path
        d="M3.2 18.8l1.2-4.1A8 8 0 1 1 11 19a8 8 0 0 1-3.7-.9l-4.1 1.1.0-.4z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M8.2 7.8c.2-.5.6-.5.9-.5h.4c.2 0 .4 0 .6.4l.7 1.6c.1.3 0 .4 0 .6l-.4.5c-.1.2-.3.3-.1.6.6 1 1.5 1.9 2.6 2.4.3.1.5 0 .6-.1l.5-.6c.2-.2.3-.2.5-.1l1.5.7c.3.1.4.2.5.4.0.5-.2 1.1-.4 1.3-.4.4-1.4.7-2 .6-.5-.1-1.2-.3-3.4-1.6-2.3-1.4-3.3-3-3.6-3.4-.3-.4-.5-1-.5-1.6 0-.6.4-1 .6-1.2z"
        fill="currentColor"
      />
    </svg>
  );
}

const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'UNICA', 'ÚNICA'];
function sortByTalla(arr: Variant[]): Variant[] {
  return [...arr].sort((a, b) => {
    const ai = sizeOrder.indexOf(a.talla.toUpperCase());
    const bi = sizeOrder.indexOf(b.talla.toUpperCase());
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return a.talla.localeCompare(b.talla);
  });
}
