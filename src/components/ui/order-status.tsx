'use client';

import { useTranslations } from 'next-intl';

const STATUS_STYLE: Record<string, { color: string; bg: string; border: string }> = {
  pendiente: { color: 'var(--color-warning)', bg: 'rgba(245,158,11,0.12)', border: 'var(--color-warning)' },
  confirmado: { color: 'var(--color-silver)', bg: 'rgba(192,192,192,0.10)', border: 'var(--color-silver)' },
  pagado: { color: 'var(--color-success)', bg: 'rgba(34,197,94,0.12)', border: 'var(--color-success)' },
  en_preparacion: { color: 'var(--color-fire)', bg: 'rgba(184,20,20,0.12)', border: 'var(--color-fire)' },
  enviado: { color: 'var(--color-fire)', bg: 'rgba(184,20,20,0.18)', border: 'var(--color-fire)' },
  entregado: { color: 'var(--color-success)', bg: 'rgba(34,197,94,0.18)', border: 'var(--color-success)' },
  cancelado: { color: 'var(--color-error)', bg: 'rgba(239,68,68,0.12)', border: 'var(--color-error)' },
};

export function OrderStatus({ estado }: { estado: string }) {
  const t = useTranslations('orderStatus');
  const style = STATUS_STYLE[estado] ?? STATUS_STYLE.pendiente!;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-ritual"
      style={{
        color: style.color,
        background: style.bg,
        border: `1px solid ${style.border}`,
      }}
    >
      <span
        className="block h-1.5 w-1.5 rounded-full"
        style={{ background: style.color, boxShadow: `0 0 6px ${style.color}` }}
      />
      {t(estado)}
    </span>
  );
}
