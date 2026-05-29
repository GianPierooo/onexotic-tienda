'use client';

import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { enabledPaymentProviders } from '@/lib/payments/config';
import { iniciarPagoOnline } from '@/lib/payment-actions';
import type { OrderDraft, PaymentMethodId } from '@/lib/payments/types';

type Props = {
  locale: string;
  /** Arma el borrador del pedido desde el form/carrito. null = datos incompletos. */
  getDraft: () => OrderDraft | null;
};

/**
 * Sección de pago online (tarjeta/Yape/Plin vía Culqi, PayPal). Aparece SOLO si
 * el flag maestro está encendido y hay algún proveedor habilitado. Con el flag
 * apagado renderiza `null` → el checkout se ve y funciona igual que hoy.
 *
 * Mientras no haya llaves configuradas, los proveedores responden
 * `not_configured`/`not_implemented` y se muestra un aviso amable; el método
 * WhatsApp del checkout sigue intacto.
 */
export function OnlinePaymentSection({ locale, getDraft }: Props) {
  const t = useTranslations('checkout.payment.online');
  const providers = enabledPaymentProviders();
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<string | null>(null);

  // Flag apagado o sin proveedores → no renderiza nada.
  if (providers.length === 0) return null;

  function pagar(method: PaymentMethodId) {
    setStatus(null);
    const draft = getDraft();
    if (!draft) {
      setStatus(t('errors.incomplete'));
      return;
    }
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    startTransition(async () => {
      const res = await iniciarPagoOnline({
        method,
        draft,
        returnUrl: `${origin}/api/pagos/callback?locale=${locale}`,
        cancelUrl: `${origin}/api/pagos/callback?locale=${locale}&cancel=true`,
      });
      if (!res.ok) {
        setStatus(t(`errors.${res.error}` as never) || t('errors.generic'));
        return;
      }
      if (res.next === 'redirect' && res.redirectUrl) {
        window.location.href = res.redirectUrl;
        return;
      }
      // next === 'client_sdk' (Culqi.js): TODO(activación) cargar el SDK con
      // NEXT_PUBLIC_CULQI_PUBLIC_KEY, tokenizar y llamar a confirmarPagoOnline.
      setStatus(t('sdkPending'));
    });
  }

  return (
    <section className="border-t border-border px-4 py-6">
      <div className="mb-3">
        <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
          <span className="block h-px w-3.5 bg-fire" />
          {t('eye')}
        </div>
        <h2 className="m-0 font-goth text-3xl leading-tight text-fg">{t('title')}</h2>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-ritual text-muted">
          {t('subtitle')}
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        {providers.includes('culqi') && (
          <PayButton
            disabled={pending}
            onClick={() => pagar('tarjeta')}
            title={t('card.title')}
            copy={t('card.copy')}
          />
        )}
        {providers.includes('paypal') && (
          <PayButton
            disabled={pending}
            onClick={() => pagar('paypal')}
            title={t('paypal.title')}
            copy={t('paypal.copy')}
          />
        )}
      </div>

      {status && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-ritual text-fire">
          ✦ {status}
        </p>
      )}
      <p className="mt-3 font-mono text-[9px] uppercase tracking-ritual text-muted">
        {t('secured')}
      </p>
    </section>
  );
}

function PayButton({
  title,
  copy,
  onClick,
  disabled,
}: {
  title: string;
  copy: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex w-full items-center justify-between gap-3 border border-border bg-card p-3.5 text-left transition-colors hover:border-fire disabled:opacity-60"
    >
      <div>
        <div className="font-body text-[13px] font-bold uppercase tracking-wide text-fg">
          {title}
        </div>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-ritual text-muted">
          {copy}
        </div>
      </div>
      <span className="font-mono text-[13px] text-fire">→</span>
    </button>
  );
}
