'use client';

import { useMemo, useState, useTransition, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { useCart } from '@/lib/cart/cart-context';
import { GrainOverlay } from '@/components/ui/grain-overlay';
import { LoadingState } from '@/components/ui/states';
import {
  STORE,
  calculateShipping,
  formatSoles,
  type ShippingZone,
} from '@/lib/store-config';
import { crearPedidoInvitado } from '@/lib/guest-order-actions';
import { OnlinePaymentSection } from '@/components/checkout/online-payment-section';
import type { OrderDraft } from '@/lib/payments/types';

type Field = {
  nombre: string;
  email: string;
  telefono: string;
  pais: string;
  departamento: string;
  provincia: string;
  distrito: string;
  direccion: string;
  codigo_postal: string;
  referencia: string;
  notas: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PE_DEPARTAMENTOS = [
  'Lima', 'Arequipa', 'Cusco', 'La Libertad', 'Piura', 'Lambayeque',
  'Junín', 'Áncash', 'Ica', 'Cajamarca', 'Tacna', 'Otro',
];

export function GuestCheckoutView({ locale }: { locale: string }) {
  const t = useTranslations('checkout');
  const tGuest = useTranslations('checkout.guest');
  const tAddr = useTranslations('account.address');
  const tCart = useTranslations('cart');
  const cart = useCart();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ ref: string; wa: string } | null>(null);

  const [form, setForm] = useState<Field>({
    nombre: '',
    email: '',
    telefono: '',
    pais: 'PE',
    departamento: '',
    provincia: '',
    distrito: '',
    direccion: '',
    codigo_postal: '',
    referencia: '',
    notas: '',
  });

  function set<K extends keyof Field>(k: K, v: Field[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  const isPeru = form.pais === 'PE';
  const zona: ShippingZone = useMemo(() => {
    if (!isPeru) return 'internacional';
    return form.departamento.toLowerCase() === 'lima' ? 'lima' : 'provincia';
  }, [isPeru, form.departamento]);

  const subtotal = cart.subtotal;
  const envio = calculateShipping(zona, subtotal);
  const total = subtotal + envio;

  // Borrador del pedido para el pago online. null = faltan datos obligatorios.
  function buildOrderDraft(): OrderDraft | null {
    if (
      !EMAIL_RE.test(form.email.trim()) ||
      !form.nombre.trim() ||
      !form.telefono.trim() ||
      !form.direccion.trim() ||
      cart.items.length === 0
    ) {
      return null;
    }
    return {
      items: cart.items.map((i) => ({
        producto_id: i.productoId,
        nombre: i.nombre,
        sku: i.sku,
        talla: i.talla,
        color: i.color,
        cantidad: i.cantidad,
        precio: i.precio,
      })),
      shipping: {
        destinatario: form.nombre.trim(),
        telefono: form.telefono.trim(),
        pais: form.pais,
        departamento: form.departamento,
        provincia: form.provincia || undefined,
        distrito: form.distrito,
        direccion: form.direccion.trim(),
        referencia: form.referencia || undefined,
        codigo_postal: form.codigo_postal || undefined,
      },
      customer: {
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        telefono: form.telefono.trim(),
      },
      amounts: { subtotalPen: subtotal, envioPen: envio, totalPen: total },
      notas: form.notas || undefined,
      clienteId: null,
    };
  }

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
        <h1 className="m-0 mb-4 font-goth text-5xl leading-none text-fg">
          {tCart('emptyTitle')}
        </h1>
        <p className="mb-6 font-body text-sm text-muted">{tCart('emptyCopy')}</p>
        <Link
          href="/tienda"
          className="inline-flex items-center justify-center bg-fire px-5 py-3 font-body text-xs font-extrabold uppercase tracking-[.22em] text-on-fire"
        >
          {tCart('emptyCta')} →
        </Link>
      </section>
    );
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!EMAIL_RE.test(form.email.trim())) {
      setError(tGuest('errors.email'));
      return;
    }
    if (!form.nombre.trim() || !form.telefono.trim() || !form.direccion.trim()) {
      setError(tGuest('errors.missing'));
      return;
    }
    startTransition(async () => {
      const res = await crearPedidoInvitado({
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        telefono: form.telefono.trim(),
        pais: form.pais,
        departamento: form.departamento,
        provincia: form.provincia || undefined,
        distrito: form.distrito,
        direccion: form.direccion.trim(),
        codigo_postal: form.codigo_postal || undefined,
        referencia: form.referencia || undefined,
        notas: form.notas || undefined,
        items: cart.items.map((i) => ({
          producto_id: i.productoId,
          nombre: i.nombre,
          sku: i.sku,
          talla: i.talla,
          color: i.color,
          cantidad: i.cantidad,
          precio: i.precio,
        })),
        subtotal,
        envio,
        total,
      });
      if (!res.ok) {
        setError(tGuest(`errors.${res.error}` as never, {}) || res.error);
        return;
      }
      setSuccess({ ref: res.trackingRef, wa: res.whatsappUrl });
      cart.clear();
      window.open(res.whatsappUrl, '_blank', 'noopener');
    });
  }

  if (success) {
    return (
      <section className="mx-auto max-w-md px-5 py-16 text-center">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-ritual text-fire">
          ✦ {tGuest('success.eye')}
        </div>
        <h1 className="m-0 mb-3 font-goth text-5xl leading-none text-fg">
          {tGuest('success.title')}
        </h1>
        <p className="mb-6 font-body text-sm text-muted">
          {tGuest('success.copy', { ref: success.ref })}
        </p>
        <a
          href={success.wa}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-fire px-5 py-3.5 font-body text-xs font-extrabold uppercase tracking-[.22em] text-on-fire"
        >
          {tGuest('success.cta')} →
        </a>
      </section>
    );
  }

  return (
    <>
    <form onSubmit={onSubmit} className="px-4 py-6">
      <SectionTitle eye={tGuest('contactEye')} title={tGuest('contactTitle')} />
      <div className="grid gap-3 md:grid-cols-2">
        <Field label={tGuest('name')} value={form.nombre} required onChange={(v) => set('nombre', v)} placeholder={tGuest('namePlaceholder')} />
        <Field label={tAddr('phone')} type="tel" value={form.telefono} required onChange={(v) => set('telefono', v)} placeholder="+51 ..." />
      </div>
      <div className="mt-3">
        <Field label={tAddr('recipient') === 'Destinatario' ? 'Correo' : 'Email'} type="email" value={form.email} required onChange={(v) => set('email', v)} placeholder="tu@correo.pe" autoComplete="email" />
      </div>

      <div className="mt-6">
        <SectionTitle eye={t('shipping.eye')} title={t('shipping.title')} />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Select
          label={tAddr('country')}
          value={form.pais}
          onChange={(v) => set('pais', v)}
          options={[
            ['PE', 'Perú'],
            ['INT', tAddr('international')],
          ]}
        />
        {isPeru ? (
          <Select
            label={tAddr('department')}
            value={form.departamento}
            onChange={(v) => set('departamento', v)}
            options={PE_DEPARTAMENTOS.map((x) => [x, x] as [string, string])}
            required
          />
        ) : (
          <Field
            label={tAddr('region')}
            value={form.departamento}
            onChange={(v) => set('departamento', v)}
            required
          />
        )}
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <Field label={tAddr('province')} value={form.provincia} onChange={(v) => set('provincia', v)} />
        <Field label={tAddr('district')} value={form.distrito} required onChange={(v) => set('distrito', v)} />
      </div>
      <div className="mt-3">
        <Field label={tAddr('street')} value={form.direccion} required onChange={(v) => set('direccion', v)} placeholder="Av. ..." />
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <Field label={tAddr('reference')} value={form.referencia} onChange={(v) => set('referencia', v)} />
        <Field label={tAddr('postalCode')} value={form.codigo_postal} onChange={(v) => set('codigo_postal', v)} />
      </div>

      {/* Resumen */}
      <section className="mt-6">
        <SectionTitle eye={t('summary.eye')} title={t('summary.title')} />
        <div className="relative overflow-hidden border border-border bg-card-alt px-4 py-4">
          <GrainOverlay />
          <div className="relative">
            {cart.items.map((it) => (
              <div
                key={it.productoId}
                className="flex items-baseline justify-between py-1.5 font-body text-[13px]"
              >
                <span className="truncate text-fg">
                  {it.cantidad} × {it.nombre}
                  <span className="text-muted"> · {it.talla}</span>
                </span>
                <span className="font-mono text-[12px] text-fg">
                  {formatSoles(it.precio * it.cantidad)}
                </span>
              </div>
            ))}
            <div className="mt-2 flex justify-between border-t border-dashed border-border pt-3 font-body text-[13px]">
              <span className="text-muted">{t('summary.subtotal')}</span>
              <span className="font-mono text-[12.5px] text-fg">{formatSoles(subtotal)}</span>
            </div>
            <div className="flex justify-between py-2 font-body text-[13px]">
              <span className="text-muted">{envio === 0 ? t('summary.shipFree') : t('summary.ship')}</span>
              <span
                className="font-mono text-[12.5px]"
                style={{ color: envio === 0 ? 'var(--color-fire)' : 'var(--color-fg)' }}
              >
                {envio === 0 ? formatSoles(0) : formatSoles(envio)} · {t(`zones.${zona}`)}
              </span>
            </div>
            <div className="mt-2 flex items-baseline justify-between border-t border-dashed border-border pt-3">
              <div className="font-mono text-[10px] uppercase tracking-ritual text-silver">
                {t('summary.total')}
              </div>
              <div className="font-body text-3xl font-extrabold text-fg">
                {formatSoles(total)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-4">
        <Field label={tGuest('notes')} value={form.notas} onChange={(v) => set('notas', v)} placeholder={tGuest('notesPlaceholder')} />
      </div>

      {error && (
        <p className="mt-4 font-mono text-[10px] uppercase tracking-ritual text-error">
          {error}
        </p>
      )}

      <p className="mt-3 font-mono text-[10px] uppercase tracking-ritual text-muted">
        ✦ {tGuest('whatsappNote', { phone: STORE.whatsappLabel })}
      </p>

      <button
        type="submit"
        disabled={pending}
        className="mt-3 w-full bg-fire px-4 py-4 font-body text-[13px] font-extrabold uppercase tracking-[.22em] text-on-fire disabled:opacity-60"
        style={{ boxShadow: '0 -4px 24px rgba(184,20,20,.32)' }}
      >
        {pending ? t('confirming') : tGuest('submit')}
      </button>
    </form>
    {/* Pago online (tras feature flag). Renderiza null si está apagado. */}
    <OnlinePaymentSection locale={locale} getDraft={buildOrderDraft} />
    </>
  );
}

function SectionTitle({ eye, title }: { eye: string; title: string }) {
  return (
    <div className="mb-3">
      <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
        <span className="block h-px w-3.5 bg-fire" />
        {eye}
      </div>
      <h2 className="m-0 font-goth text-3xl leading-tight text-fg">{title}</h2>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
};
function Field({ label, value, onChange, type = 'text', placeholder, required, autoComplete }: FieldProps) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-mono text-[9px] uppercase tracking-ritual text-silver">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className="h-11 border border-border bg-bg px-3 font-body text-[13px] text-fg placeholder:text-muted focus:border-fire focus:outline-none"
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-mono text-[9px] uppercase tracking-ritual text-silver">
        {label}
      </span>
      <select
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 border border-border bg-bg px-3 font-body text-[13px] text-fg focus:border-fire focus:outline-none"
      >
        <option value="">—</option>
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </label>
  );
}
