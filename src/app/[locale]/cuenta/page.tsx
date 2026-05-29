import { setRequestLocale, getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { Link } from '@/lib/i18n/routing';
import { createClient } from '@/lib/supabase/server';
import { AddressList } from '@/components/ui/address-list';
import { OrderStatus } from '@/components/ui/order-status';
import { LogoutButton } from '@/components/ui/logout-button';
import { formatSoles } from '@/lib/store-config';
import type { Tables } from '@/lib/supabase/database.types';

type Props = { params: { locale: string } };

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'nav' });
  return {
    title: t('account'),
    robots: { index: false, follow: false },
  };
}

type Pedido = Tables<'pedidos'>;
type Direccion = Tables<'direcciones'>;

export default async function AccountPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('account');

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/cuenta/acceso`);
  }

  const [pedidosRes, direccionesRes, clienteRes] = await Promise.all([
    supabase
      .from('pedidos')
      .select('*')
      .eq('cliente_id', user.id)
      .order('created_at', { ascending: false })
      .returns<Pedido[]>(),
    supabase
      .from('direcciones')
      .select('*')
      .eq('cliente_id', user.id)
      .order('es_predeterminada', { ascending: false })
      .order('created_at', { ascending: false })
      .returns<Direccion[]>(),
    supabase.from('clientes').select('nombre, apellidos').eq('id', user.id).maybeSingle(),
  ]);

  const pedidos = pedidosRes.data ?? [];
  const direcciones = direccionesRes.data ?? [];
  const cliente = clienteRes.data as { nombre: string | null; apellidos: string | null } | null;
  const displayName =
    [cliente?.nombre, cliente?.apellidos].filter(Boolean).join(' ') ||
    user.email ||
    'Fiel';

  return (
    <>
      <header className="border-b border-border bg-bg/92 px-4 py-5 backdrop-blur-md">
        <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
          <span className="block h-px w-3.5 bg-fire" />
          {t('eyebrow')}
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <h1 className="m-0 font-black font-normal leading-[0.9] text-fg text-[54px]">
            {displayName}
          </h1>
          <LogoutButton locale={locale} />
        </div>
        <div className="mt-2 font-mono text-[10px] uppercase tracking-ritual text-muted">
          {user.email}
        </div>
      </header>

      <section className="px-4 py-6">
        <SectionTitle eye={t('orders.eye')} title={t('orders.title')} />
        {pedidos.length === 0 ? (
          <EmptyOrders locale={locale} />
        ) : (
          <div className="flex flex-col gap-3">
            {pedidos.map((p) => (
              <Link
                key={p.id}
                href={`/pedidos/${p.id}`}
                className="block border border-border bg-card p-4 text-fg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-ritual text-silver">
                      {p.numero_pedido}
                    </div>
                    <div className="mt-1 font-body text-sm font-bold">
                      {new Date(p.created_at).toLocaleDateString(locale, {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[10px] uppercase tracking-ritual text-silver">
                      {t('orders.total')}
                    </div>
                    <div className="font-body text-base font-bold">
                      {formatSoles(Number(p.total_pen))}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                  <OrderStatus estado={p.estado} />
                  <span className="font-mono text-[10px] uppercase tracking-ritual text-fire">
                    {t('orders.view')} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-border px-4 py-6">
        <SectionTitle eye={t('address.eye')} title={t('address.title')} />
        <AddressList initial={direcciones} />
      </section>
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

async function EmptyOrders({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'account.orders' });
  return (
    <div className="border border-dashed border-border bg-card-alt px-4 py-8 text-center">
      <p className="mb-4 font-body text-sm text-muted">{t('emptyCopy')}</p>
      <Link
        href="/tienda"
        className="inline-flex items-center justify-center bg-fire px-5 py-3 font-body text-xs font-extrabold uppercase tracking-[.22em] text-on-fire"
      >
        {t('emptyCta')} →
      </Link>
    </div>
  );
}
