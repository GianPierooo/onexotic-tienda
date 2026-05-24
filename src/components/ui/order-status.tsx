'use client';

import { useTranslations } from 'next-intl';

const STATUS_STYLE: Record<string, { color: string; bg: string; border: string }> = {
  pendiente: { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', border: '#F59E0B' },
  confirmado: { color: '#C0C0C0', bg: 'rgba(192,192,192,0.10)', border: '#C0C0C0' },
  pagado: { color: '#22C55E', bg: 'rgba(34,197,94,0.12)', border: '#22C55E' },
  en_preparacion: { color: '#B81414', bg: 'rgba(184,20,20,0.12)', border: '#B81414' },
  enviado: { color: '#B81414', bg: 'rgba(184,20,20,0.18)', border: '#B81414' },
  entregado: { color: '#22C55E', bg: 'rgba(34,197,94,0.18)', border: '#22C55E' },
  cancelado: { color: '#EF4444', bg: 'rgba(239,68,68,0.12)', border: '#EF4444' },
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
