import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { Link } from '@/lib/i18n/routing';

export const metadata: Metadata = {
  title: 'Pedido',
  robots: { index: false, follow: false },
};
import { createClient } from '@/lib/supabase/server';
import { OrderStatus } from '@/components/ui/order-status';
import { formatSoles, STORE } from '@/lib/store-config';
import type { Tables } from '@/lib/supabase/database.types';

type Props = { params: { locale: string; id: string } };
type Pedido = Tables<'pedidos'>;
type Item = Tables<'pedido_items'>;

const STEPS = ['pendiente', 'confirmado', 'pagado', 'en_preparacion', 'enviado', 'entregado'] as const;

export default async function OrderPage({ params: { locale, id } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('order');
  const tStatus = await getTranslations('orderStatus');

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect(
      `/${locale}/cuenta/acceso?next=${encodeURIComponent(`/${locale}/pedidos/${id}`)}`
    );
  }

  const [pedidoRes, itemsRes] = await Promise.all([
    supabase
      .from('pedidos')
      .select('*')
      .eq('id', id)
      .maybeSingle<Pedido>(),
    supabase
      .from('pedido_items')
      .select('*')
      .eq('pedido_id', id)
      .returns<Item[]>(),
  ]);

  const pedido = pedidoRes.data;
  const items = itemsRes.data ?? [];
  if (!pedido) notFound();

  const cancelado = pedido.estado === 'cancelado';
  const currentIndex = STEPS.indexOf(pedido.estado as (typeof STEPS)[number]);
  const direccion = pedido.direccion_envio as DireccionJson | null;

  return (
    <>
      <header className="border-b border-border bg-bg/92 px-4 py-5 backdrop-blur-md">
        <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
          <span className="block h-px w-3.5 bg-fire" />
          {t('eye')}
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <h1 className="m-0 font-black font-normal leading-[0.9] text-white text-[44px]">
            {pedido.numero_pedido}
          </h1>
          <OrderStatus estado={pedido.estado} />
        </div>
        <div className="mt-2 font-mono text-[10px] uppercase tracking-ritual text-muted">
          {new Date(pedido.created_at).toLocaleString(locale)}
        </div>
      </header>

      <section className="px-4 py-6">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-ritual text-silver">
          ✦ {t('timeline.title')}
        </div>
        <ol className="flex flex-col gap-2">
          {STEPS.map((s, i) => {
            const done = !cancelado && i <= currentIndex;
            const current = !cancelado && i === currentIndex;
            return (
              <li
                key={s}
                className="flex items-center gap-3 border border-border bg-card px-3.5 py-2.5"
                style={{
                  borderLeft: current ? '2px solid #B81414' : undefined,
                  opacity: cancelado ? 0.4 : 1,
                }}
              >
                <span
                  className="block h-2 w-2 rounded-full"
                  style={{
                    background: done ? '#B81414' : '#2A2A2A',
                    boxShadow: current ? '0 0 8px #B81414' : 'none',
                  }}
                />
                <span
                  className="font-mono text-[11px] uppercase tracking-ritual"
                  style={{ color: done ? '#FFFFFF' : '#888888' }}
                >
                  {tStatus(s)}
                </span>
              </li>
            );
          })}
        </ol>
        {cancelado && (
          <p className="mt-3 font-mono text-[10px] uppercase tracking-ritual text-error">
            ✦ {tStatus('cancelado')}
          </p>
        )}
      </section>

      <section className="border-t border-border px-4 py-6">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-ritual text-silver">
          ✦ {t('items.title')}
        </div>
        <div className="border border-border bg-card">
          {items.map((it, i) => (
            <div
              key={it.id}
              className="flex items-start justify-between gap-3 px-3.5 py-3"
              style={{ borderBottom: i < items.length - 1 ? '1px solid #2A2A2A' : 'none' }}
            >
              <div>
                <div className="font-body text-sm font-bold text-white">
                  {it.nombre_snapshot}
                </div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-ritual text-muted">
                  {it.sku_snapshot ?? ''}
                  {it.talla_snapshot ? ` · ${t('items.size')} ${it.talla_snapshot}` : ''}
                  {it.color_snapshot ? ` · ${it.color_snapshot}` : ''}
                </div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-ritual text-silver">
                  {it.cantidad} × {formatSoles(Number(it.precio_unitario_pen))}
                </div>
              </div>
              <div className="font-body text-sm font-bold text-white">
                {formatSoles(Number(it.subtotal_pen ?? Number(it.precio_unitario_pen) * it.cantidad))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border px-4 py-6">
        <div className="border border-border bg-card-alt px-4 py-3">
          <Row label={t('total.subtotal')} value={formatSoles(Number(pedido.subtotal_pen))} />
          {Number(pedido.descuento_pen) > 0 && (
            <Row
              label={t('total.discount')}
              value={`− ${formatSoles(Number(pedido.descuento_pen))}`}
              accent
            />
          )}
          <Row
            label={Number(pedido.envio_pen) === 0 ? t('total.shipFree') : t('total.ship')}
            value={Number(pedido.envio_pen) === 0 ? formatSoles(0) : formatSoles(Number(pedido.envio_pen))}
            accent={Number(pedido.envio_pen) === 0}
          />
          <div className="mt-2 flex items-baseline justify-between border-t border-dashed border-border pt-3">
            <div className="font-mono text-[10px] uppercase tracking-ritual text-silver">
              {t('total.total')}
            </div>
            <div className="font-body text-3xl font-extrabold text-white">
              {formatSoles(Number(pedido.total_pen))}
            </div>
          </div>
        </div>
      </section>

      {direccion && (
        <section className="border-t border-border px-4 py-6">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-ritual text-silver">
            ✦ {t('shipping.title')}
          </div>
          <div className="border border-border bg-card p-4 font-body text-[13px] text-white">
            <div className="font-bold">{direccion.destinatario}</div>
            <div className="text-white/85">{direccion.direccion}</div>
            <div className="font-mono text-[10px] uppercase tracking-ritual text-muted">
              {direccion.distrito}
              {direccion.provincia ? `, ${direccion.provincia}` : ''}
              {`, ${direccion.departamento} · ${direccion.pais}`}
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-ritual text-silver">
              {direccion.telefono}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-border px-4 py-6">
        <div className="font-mono text-[10px] uppercase tracking-ritual text-silver">
          {t('payment.method')} ·{' '}
          <span className="text-white">{pedido.metodo_pago}</span>
        </div>
        {pedido.metodo_pago === 'whatsapp' && (
          <a
            href={`https://wa.me/${STORE.whatsappPhone}?text=${encodeURIComponent(
              `Hola, estoy siguiendo mi pedido ${pedido.numero_pedido}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center justify-center gap-2 border border-border bg-card px-4 py-3 font-body text-xs font-bold uppercase tracking-ritual text-white"
          >
            {t('payment.followWhatsapp')} · {STORE.whatsappLabel}
          </a>
        )}
        <div className="mt-6">
          <Link
            href="/cuenta"
            className="font-mono text-[10px] uppercase tracking-ritual text-fire"
          >
            ← {t('backToAccount')}
          </Link>
        </div>
      </section>
    </>
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
    <div className="flex justify-between py-1.5 font-body text-[13px]">
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

type DireccionJson = {
  destinatario: string;
  telefono: string;
  pais: string;
  departamento: string;
  provincia?: string | null;
  distrito: string;
  direccion: string;
  referencia?: string | null;
  codigo_postal?: string | null;
};
