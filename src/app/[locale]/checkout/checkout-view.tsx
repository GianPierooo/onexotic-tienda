'use client';

import { useMemo, useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/lib/i18n/routing';
import { Link } from '@/lib/i18n/routing';
import { useCart } from '@/lib/cart/cart-context';
import { buildCartWhatsAppUrl } from '@/lib/cart/whatsapp';
import { AddressForm } from '@/components/ui/address-form';
import { GrainOverlay } from '@/components/ui/grain-overlay';
import { LoadingState } from '@/components/ui/states';
import { crearPedido } from '@/lib/order-actions';
import {
  STORE,
  calculateShipping,
  formatSoles,
  type ShippingZone,
} from '@/lib/store-config';
import type { Tables } from '@/lib/supabase/database.types';

type Direccion = Tables<'direcciones'>;
type Props = { locale: string; direcciones: Direccion[]; userEmail: string };

type PaymentMethod = 'whatsapp' | 'culqi';

export function CheckoutView({ locale, direcciones, userEmail }: Props) {
  const t = useTranslations('checkout');
  const tCart = useTranslations('cart');
  const router = useRouter();
  const cart = useCart();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [selectedDirId, setSelectedDirId] = useState<string | 'new'>(
    direcciones.find((d) => d.es_predeterminada)?.id ??
      direcciones[0]?.id ??
      'new'
  );
  const [pago, setPago] = useState<PaymentMethod>('whatsapp');

  const selectedDir = useMemo(
    () => direcciones.find((d) => d.id === selectedDirId) ?? null,
    [direcciones, selectedDirId]
  );

  const zona: ShippingZone = useMemo(() => {
    if (!selectedDir) return 'lima';
    if (selectedDir.pais !== 'PE') return 'internacional';
    if (selectedDir.departamento?.toLowerCase() === 'lima') return 'lima';
    return 'provincia';
  }, [selectedDir]);

  const subtotal = cart.subtotal;
  const envio = calculateShipping(zona, subtotal);
  const total = subtotal + envio;

  if (!cart.hydrated) {
    return (
      <section className="mx-auto max-w-screen-md px-5 py-16">
        <LoadingState />
      </section>
    );
  }

  if (cart.items.length === 0) {
    return (
      <section className="mx-auto max-w-screen-md px-5 py-16 text-center">
        <h1 className="m-0 mb-4 font-goth text-5xl leading-none text-white">
          {tCart('emptyTitle')}
        </h1>
        <p className="mb-6 font-body text-sm text-muted">{tCart('emptyCopy')}</p>
        <Link
          href="/tienda"
          className="inline-flex items-center justify-center bg-fire px-5 py-3 font-body text-xs font-extrabold uppercase tracking-[.22em] text-white"
        >
          {tCart('emptyCta')} →
        </Link>
      </section>
    );
  }

  function onConfirm() {
    setError(null);
    if (!selectedDir) {
      setError(t('errors.noAddress'));
      return;
    }
    startTransition(async () => {
      const res = await crearPedido({
        items: cart.items.map((i) => ({
          producto_id: i.productoId,
          cantidad: i.cantidad,
        })),
        metodo_pago: pago === 'whatsapp' ? 'whatsapp' : 'culqi',
        direccion_envio: {
          destinatario: selectedDir.destinatario,
          telefono: selectedDir.telefono,
          pais: selectedDir.pais,
          departamento: selectedDir.departamento,
          provincia: selectedDir.provincia ?? undefined,
          distrito: selectedDir.distrito,
          direccion: selectedDir.direccion,
          referencia: selectedDir.referencia ?? undefined,
          codigo_postal: selectedDir.codigo_postal ?? undefined,
        },
        envio_pen: envio,
      });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      const waUrl =
        pago === 'whatsapp'
          ? buildCartWhatsAppUrl(cart.items, total) +
            encodeURIComponent(`\n\nNº ${res.numero}`)
          : null;
      cart.clear();
      if (waUrl) window.open(waUrl, '_blank', 'noopener');
      router.push(`/pedidos/${res.id}`);
    });
  }

  return (
    <>
      <header className="border-b border-border bg-bg/92 px-4 py-5 backdrop-blur-md">
        <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
          <span className="block h-px w-3.5 bg-fire" />
          {t('eye')}
        </div>
        <h1 className="m-0 font-black font-normal leading-[0.9] text-white text-[54px]">
          {t('title')}
        </h1>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-ritual text-muted">
          {userEmail}
        </div>
      </header>

      <section className="px-4 py-6">
        <SectionTitle eye={t('shipping.eye')} title={t('shipping.title')} />

        {direcciones.length > 0 && (
          <div className="flex flex-col gap-2.5">
            {direcciones.map((d) => (
              <label
                key={d.id}
                className="flex cursor-pointer items-start gap-3 border border-border bg-card p-3.5"
                style={{
                  borderLeft:
                    selectedDirId === d.id ? '2px solid #B81414' : undefined,
                  background:
                    selectedDirId === d.id ? '#1E1E1E' : '#141414',
                }}
              >
                <input
                  type="radio"
                  checked={selectedDirId === d.id}
                  onChange={() => setSelectedDirId(d.id)}
                  className="mt-1 accent-fire"
                />
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-ritual text-silver">
                    {d.alias || d.destinatario}
                  </div>
                  <div className="font-body text-[13px] text-white">
                    {d.direccion}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-ritual text-muted">
                    {d.distrito}
                    {d.provincia ? `, ${d.provincia}` : ''}
                    {`, ${d.departamento} · ${d.pais}`}
                  </div>
                </div>
              </label>
            ))}
            <label
              className="flex cursor-pointer items-center gap-3 border border-dashed border-border bg-card-alt p-3.5 font-mono text-[10px] uppercase tracking-ritual text-white"
              style={{
                borderColor: selectedDirId === 'new' ? '#B81414' : undefined,
              }}
            >
              <input
                type="radio"
                checked={selectedDirId === 'new'}
                onChange={() => setSelectedDirId('new')}
                className="accent-fire"
              />
              + {t('shipping.newAddress')}
            </label>
          </div>
        )}

        {selectedDirId === 'new' && (
          <div className="mt-3 border border-border bg-card p-4">
            <AddressForm
              onSaved={(id) => {
                if (id) setSelectedDirId(id);
                router.refresh();
              }}
            />
          </div>
        )}

        <div className="mt-3 border border-border bg-card px-3.5 py-3">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-ritual">
            <span className="text-silver">{t('shipping.zone')}</span>
            <span className="text-white">
              {t(`zones.${zona}`)} · {envio === 0 ? t('shipping.free') : formatSoles(envio)}
            </span>
          </div>
          {envio === 0 && subtotal >= STORE.freeShippingThreshold && (
            <p className="mt-1 font-mono text-[9px] uppercase tracking-ritual text-fire">
              ✦ {t('shipping.unlockedFromSubtotal')}
            </p>
          )}
        </div>
      </section>

      <section className="border-t border-border px-4 py-6">
        <SectionTitle eye={t('payment.eye')} title={t('payment.title')} />
        <div className="flex flex-col gap-2.5">
          <PaymentOption
            active={pago === 'whatsapp'}
            onClick={() => setPago('whatsapp')}
            title={t('payment.whatsapp.title')}
            copy={t('payment.whatsapp.copy', { phone: STORE.whatsappLabel })}
          />
          <PaymentOption
            active={pago === 'culqi'}
            onClick={() => setPago('culqi')}
            title={t('payment.culqi.title')}
            copy={t('payment.culqi.copy')}
            badge={t('payment.culqi.soon')}
            disabled
          />
        </div>
      </section>

      <section className="border-t border-border px-4 py-6">
        <SectionTitle eye={t('summary.eye')} title={t('summary.title')} />
        <div className="relative overflow-hidden border border-border bg-card-alt px-4 py-4">
          <GrainOverlay />
          <div className="relative">
            {cart.items.map((it) => (
              <div
                key={it.productoId}
                className="flex items-baseline justify-between py-1.5 font-body text-[13px]"
              >
                <span className="truncate text-white">
                  {it.cantidad} × {it.nombre}
                  <span className="text-muted"> · {it.talla}</span>
                </span>
                <span className="font-mono text-[12px] text-white">
                  {formatSoles(it.precio * it.cantidad)}
                </span>
              </div>
            ))}
            <div className="mt-2 border-t border-dashed border-border pt-3">
              <Row label={t('summary.subtotal')} value={formatSoles(subtotal)} />
              <Row
                label={envio === 0 ? t('summary.shipFree') : t('summary.ship')}
                value={envio === 0 ? formatSoles(0) : formatSoles(envio)}
                accent={envio === 0}
              />
            </div>
            <div className="mt-2 flex items-baseline justify-between border-t border-dashed border-border pt-3">
              <div className="font-mono text-[10px] uppercase tracking-ritual text-silver">
                {t('summary.total')}
              </div>
              <div className="font-body text-3xl font-extrabold text-white">
                {formatSoles(total)}
              </div>
            </div>
          </div>
        </div>

        {error && (
          <p className="mt-3 font-mono text-[10px] uppercase tracking-ritual text-error">
            {error}
          </p>
        )}
      </section>

      <div className="sticky bottom-0 z-30 flex flex-col gap-2.5 border-t border-border bg-bg/95 px-4 py-3.5 backdrop-blur-md">
        <button
          type="button"
          onClick={onConfirm}
          disabled={pending || pago === 'culqi'}
          className="flex items-center justify-between px-4 py-4 font-body text-[13px] font-extrabold uppercase tracking-[.22em] text-white disabled:opacity-60"
          style={{
            background: pago === 'culqi' ? '#2A2A2A' : '#B81414',
            boxShadow:
              pago === 'culqi'
                ? 'none'
                : '0 -4px 24px rgba(184,20,20,.32)',
          }}
        >
          <span>{pending ? t('confirming') : t('confirm')}</span>
          <span className="font-mono text-[13px]">{formatSoles(total)} →</span>
        </button>
        <Link
          href="/carrito"
          className="text-center font-mono text-[10px] uppercase tracking-ritual text-silver hover:text-white"
        >
          ← {t('back')}
        </Link>
      </div>
    </>
  );
}

function PaymentOption({
  active,
  onClick,
  title,
  copy,
  badge,
  disabled,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  copy: string;
  badge?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex w-full items-start justify-between gap-3 border bg-card p-3.5 text-left disabled:opacity-70"
      disabled={disabled}
      style={{
        borderColor: active ? '#B81414' : '#2A2A2A',
        background: active ? '#1E1E1E' : '#141414',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <div>
        <div className="font-body text-[13px] font-bold uppercase tracking-wide text-white">
          {title}
        </div>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-ritual text-muted">
          {copy}
        </div>
      </div>
      {badge && (
        <span className="border border-fire bg-fire/15 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-ritual text-fire">
          {badge}
        </span>
      )}
    </button>
  );
}

function SectionTitle({ eye, title }: { eye: string; title: string }) {
  return (
    <div className="mb-3">
      <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
        <span className="block h-px w-3.5 bg-fire" />
        {eye}
      </div>
      <h2 className="m-0 font-goth text-3xl leading-tight text-white">
        {title}
      </h2>
    </div>
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
        style={{ color: accent ? '#B81414' : '#FFFFFF' }}
      >
        {value}
      </span>
    </div>
  );
}
