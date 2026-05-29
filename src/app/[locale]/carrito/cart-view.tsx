'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { m, AnimatePresence } from '@/components/motion';
import { Link } from '@/lib/i18n/routing';
import { useCart } from '@/lib/cart/cart-context';
import { buildCartWhatsAppUrl } from '@/lib/cart/whatsapp';
import { GrainOverlay } from '@/components/ui/grain-overlay';
import { LoadingState } from '@/components/ui/states';
import { STORE, approxUsd, formatSoles } from '@/lib/store-config';
import { CloseIcon } from '@/components/icons';

export function CartView() {
  const t = useTranslations('cart');
  const { items, hydrated, count, subtotal, setQty, remove, clear } = useCart();

  if (!hydrated) {
    return (
      <section className="mx-auto max-w-screen-md px-5 py-12">
        <LoadingState />
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-screen-md px-5 py-16 text-center">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-ritual text-silver">
          ✦ {t('emptyEye')}
        </div>
        <h1 className="m-0 mb-4 font-goth text-5xl leading-none text-fg">
          {t('emptyTitle')}
        </h1>
        <p className="mb-8 font-body text-sm text-muted">{t('emptyCopy')}</p>
        <Link
          href="/tienda"
          className="inline-flex items-center justify-center bg-fire px-6 py-3.5 font-body text-xs font-extrabold uppercase tracking-[.22em] text-on-fire"
        >
          {t('emptyCta')} →
        </Link>
      </section>
    );
  }

  const threshold = STORE.freeShippingThreshold;
  const remain = Math.max(0, threshold - subtotal);
  const pct = Math.min(100, (subtotal / threshold) * 100);
  const reached = remain === 0;
  const shipping = reached ? 0 : STORE.shippingDefault;
  const total = subtotal + shipping;

  const waUrl = buildCartWhatsAppUrl(items, total);

  return (
    <>
      {/* Encabezado */}
      <header className="border-b border-border bg-bg/92 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 pb-3 pt-3 font-mono text-[10px] uppercase tracking-ritual">
          <span className="text-silver">
            {t('title')} ·{' '}
            <span className="text-fg">
              {count} {count === 1 ? t('piece') : t('pieces')}
            </span>
          </span>
          <button
            type="button"
            onClick={clear}
            className="border-b border-border pb-0.5 text-fg hover:border-fire"
          >
            {t('clear')}
          </button>
        </div>
        <div className="px-4 pb-4 pt-1">
          <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
            <span className="block h-px w-3.5 bg-fire" />
            {t('chapter')}
          </div>
          <h1 className="m-0 font-black font-normal leading-[0.9] text-fg text-[54px]">
            {t('heroTitle')}
          </h1>
        </div>
      </header>

      {/* Envío gratis */}
      <section
        className="mx-4 mt-3.5 border border-border bg-card px-4 py-4"
        style={{ borderLeft: '2px solid var(--color-fire)' }}
      >
        <div className="mb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TruckIcon />
            <div className="font-body text-[12.5px] font-bold uppercase tracking-wide">
              {reached ? t('ship.activated') : t('ship.goal')}
            </div>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-ritual text-silver">
            {t('ship.target')} · {formatSoles(threshold)}
          </div>
        </div>
        <p className="m-0 mb-3 font-body text-[12.5px] leading-relaxed text-fg/85">
          {reached ? (
            <>
              {t('ship.gotIt')}{' '}
              <span className="text-fire">{t('ship.zero')}</span>
            </>
          ) : (
            <>
              {t('ship.miss')}{' '}
              <span className="font-bold text-fire">{formatSoles(remain)}</span>{' '}
              {t('ship.for')}
            </>
          )}
        </p>
        <div className="relative">
          <div
            className="h-1.5 overflow-hidden border border-border bg-bg"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={threshold}
            aria-valuenow={Math.min(subtotal, threshold)}
          >
            <div
              className="h-full transition-[width] duration-500"
              style={{
                width: `${pct}%`,
                background: 'var(--color-fire)',
                boxShadow: '0 0 12px var(--color-fire)',
              }}
            />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-ritual text-silver">
            <span>S/ 0</span>
            <span className={pct >= 50 ? 'text-fg' : 'text-muted'}>
              {formatSoles(subtotal)}
            </span>
            <span>{formatSoles(threshold)}</span>
          </div>
          <p className="mt-2.5 font-mono text-[9px] uppercase tracking-ritual text-muted">
            ✦ {t('ship.peruOnly')}
          </p>
          <p className="font-mono text-[9px] uppercase tracking-ritual text-muted">
            ✦ {t('ship.intlNote')}
          </p>
        </div>
      </section>

      {/* Items */}
      <section className="mx-4 mt-4 border border-border bg-card">
        <AnimatePresence initial={false}>
          {items.map((it, i) => (
            <m.div
              key={it.productoId}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="grid gap-3.5 px-4 py-4"
              style={{
                gridTemplateColumns: '96px 1fr',
                borderBottom:
                  i === items.length - 1 ? 'none' : '1px solid var(--color-border)',
              }}
            >
              <div
                className="relative overflow-hidden border border-border"
                style={{
                  aspectRatio: '4 / 5',
                  background:
                    'var(--grad-tone-a)',
                }}
              >
                <GrainOverlay />
                {it.imagen ? (
                  <Image
                    src={it.imagen}
                    alt={it.nombre}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="absolute inset-[14%_22%_8%_22%] border"
                    style={{
                      borderColor: 'var(--card-frame-border)',
                      background: 'var(--grad-card-inner)',
                    }}
                  />
                )}
              </div>

              <div className="flex min-w-0 flex-col">
                {it.sku && (
                  <div className="font-mono text-[9px] uppercase tracking-ritual text-silver">
                    {it.sku}
                  </div>
                )}
                <div className="mt-1 font-goth text-[26px] font-normal leading-[0.95]">
                  {it.nombre}
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <Attr label={t('attr.size')} value={it.talla} />
                  {it.color && <Attr label={t('attr.color')} value={it.color} />}
                </div>

                <div className="mt-3 flex items-end justify-between">
                  <div className="flex h-[34px] items-center border border-border bg-card">
                    <button
                      type="button"
                      aria-label="−"
                      onClick={() => setQty(it.productoId, it.cantidad - 1)}
                      className="flex h-full w-9 items-center justify-center text-fg"
                    >
                      −
                    </button>
                    <div className="w-8 text-center font-mono text-[13px] text-fg">
                      {it.cantidad}
                    </div>
                    <button
                      type="button"
                      aria-label="+"
                      onClick={() => setQty(it.productoId, it.cantidad + 1)}
                      disabled={it.stock > 0 && it.cantidad >= it.stock}
                      className="flex h-full w-9 items-center justify-center text-fg disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    {it.cantidad > 1 && (
                      <div className="font-mono text-[9px] uppercase tracking-ritual text-muted">
                        {it.cantidad} × {formatSoles(it.precio)}
                      </div>
                    )}
                    <div className="mt-0.5 font-body text-[17px] font-bold tracking-tight text-fg">
                      {formatSoles(it.precio * it.cantidad)}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => remove(it.productoId)}
                  className="mt-3 inline-flex items-center gap-1.5 border-t border-border pt-2.5 font-mono text-[9px] uppercase tracking-ritual text-muted hover:text-fire"
                >
                  <CloseIcon size={12} /> {t('remove')}
                </button>
              </div>
            </m.div>
          ))}
        </AnimatePresence>
      </section>

      {/* Resumen */}
      <section className="relative mx-4 mt-3.5 overflow-hidden border border-border bg-card-alt px-4 py-5">
        <GrainOverlay />
        <div className="relative">
          <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.28em] text-silver">
            <span className="block h-px w-3.5 bg-fire" />
            {t('summary.eye')}
          </div>
          <Row label={t('summary.subtotal')} value={formatSoles(subtotal)} />
          <Row
            label={reached ? t('summary.shipFree') : t('summary.shipLima')}
            value={shipping === 0 ? formatSoles(0) : formatSoles(shipping)}
            accent={shipping === 0}
          />
          <p className="-mt-0.5 font-mono text-[9px] uppercase tracking-ritual text-muted">
            ✦ {t('summary.shipNote')}
          </p>
          <div className="mt-2.5 flex items-baseline justify-between border-t border-dashed border-border pt-3.5">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-ritual text-silver">
                {t('summary.payNow')}
              </div>
              <div className="mt-1.5 font-body text-[34px] font-extrabold leading-none">
                {formatSoles(total)}
              </div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-ritual text-muted">
                aprox. ${approxUsd(total)} USD
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[10px] uppercase tracking-ritual text-silver">
                {t('summary.installments')}
              </div>
              <div className="mt-1.5 font-body text-sm font-bold text-fg">
                3 × {formatSoles(total / 3)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 z-30 mt-5 flex flex-col gap-2.5 border-t border-border bg-bg/95 px-4 py-3.5 backdrop-blur-md">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 border border-border bg-card px-3 py-3 font-body text-[11.5px] font-bold uppercase tracking-ritual text-fg"
        >
          <WhatsIcon />
          {t('cta.whatsapp')}
          <span className="font-mono text-[10px] normal-case tracking-wide text-muted">
            · {STORE.whatsappLabel}
          </span>
        </a>
        <Link
          href="/checkout"
          className="flex items-center justify-between px-4 py-4 font-body text-[13px] font-extrabold uppercase tracking-[.22em] text-fg"
          style={{
            background: 'var(--color-fire)',
            boxShadow: '0 -4px 24px rgba(184,20,20,.32)',
          }}
        >
          <span>{t('cta.pay')}</span>
          <span className="font-mono text-[13px]">
            {formatSoles(total)} →
          </span>
        </Link>
      </div>
    </>
  );
}

function Attr({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-border bg-card-alt px-2 py-1 font-mono text-[9px] uppercase tracking-ritual">
      <span className="text-muted">{label}</span>
      <span className="text-fg">{value}</span>
    </span>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex justify-between py-2 font-body text-[13px]">
      <span className="text-muted">{label}</span>
      <span
        className="font-mono text-[12.5px]"
        style={{ color: accent ? 'var(--color-fire)' : 'var(--color-fg)' }}
      >
        {value}
      </span>
    </div>
  );
}

function TruckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 22 22"
      fill="none"
      style={{ color: 'var(--color-fire)' }}
      aria-hidden
    >
      <rect x="2" y="6" width="11" height="9" stroke="currentColor" strokeWidth="1.3" />
      <path d="M13 9h4l3 3v3h-7V9z" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="6" cy="16" r="1.6" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="16" cy="16" r="1.6" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function WhatsIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 22 22"
      fill="none"
      style={{ color: '#25D366' }}
      aria-hidden
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
