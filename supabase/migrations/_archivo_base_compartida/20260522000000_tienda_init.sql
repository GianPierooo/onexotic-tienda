-- ============================================================================
-- OnExotic — Tienda web · Migración inicial
-- Fecha: 2026-05-22
-- ----------------------------------------------------------------------------
-- Crea las tablas propias de la tienda (clientes, direcciones, pedidos,
-- pedido_items, reclamaciones, avisos_drop) con Row Level Security.
--
-- IMPORTANTE: NO toca productos / drops (gestionados por la app interna).
-- Asume que productos.id y drops.id son UUID; si no lo son, ajustar los FK.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. CLIENTES  (1:1 con auth.users)
-- ----------------------------------------------------------------------------
create table if not exists public.clientes (
  id          uuid primary key references auth.users(id) on delete cascade,
  nombre      text,
  apellidos   text,
  telefono    text,
  email       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.clientes enable row level security;

drop policy if exists "clientes_select_own" on public.clientes;
create policy "clientes_select_own"
  on public.clientes for select
  using ( auth.uid() = id );

drop policy if exists "clientes_insert_own" on public.clientes;
create policy "clientes_insert_own"
  on public.clientes for insert
  with check ( auth.uid() = id );

drop policy if exists "clientes_update_own" on public.clientes;
create policy "clientes_update_own"
  on public.clientes for update
  using ( auth.uid() = id );

-- Trigger: crear fila en clientes automáticamente al registrarse un usuario
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.clientes (id, email, nombre)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'nombre', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ----------------------------------------------------------------------------
-- 2. DIRECCIONES
-- ----------------------------------------------------------------------------
create table if not exists public.direcciones (
  id                uuid primary key default gen_random_uuid(),
  cliente_id        uuid not null references public.clientes(id) on delete cascade,
  alias             text,
  destinatario      text not null,
  telefono          text not null,
  pais              text not null default 'PE',
  departamento      text not null,
  provincia         text,
  distrito          text not null,
  direccion         text not null,
  referencia        text,
  codigo_postal     text,
  es_predeterminada boolean not null default false,
  created_at        timestamptz not null default now()
);

create index if not exists idx_direcciones_cliente on public.direcciones(cliente_id);

alter table public.direcciones enable row level security;

drop policy if exists "direcciones_select_own" on public.direcciones;
create policy "direcciones_select_own"
  on public.direcciones for select
  using ( auth.uid() = cliente_id );

drop policy if exists "direcciones_insert_own" on public.direcciones;
create policy "direcciones_insert_own"
  on public.direcciones for insert
  with check ( auth.uid() = cliente_id );

drop policy if exists "direcciones_update_own" on public.direcciones;
create policy "direcciones_update_own"
  on public.direcciones for update
  using ( auth.uid() = cliente_id );

drop policy if exists "direcciones_delete_own" on public.direcciones;
create policy "direcciones_delete_own"
  on public.direcciones for delete
  using ( auth.uid() = cliente_id );

-- ----------------------------------------------------------------------------
-- 3. PEDIDOS
-- ----------------------------------------------------------------------------
create table if not exists public.pedidos (
  id               uuid primary key default gen_random_uuid(),
  cliente_id       uuid not null references public.clientes(id) on delete restrict,
  numero_pedido    text not null unique,
  estado           text not null default 'pendiente'
                    check (estado in ('pendiente','confirmado','pagado','en_preparacion','enviado','entregado','cancelado')),
  metodo_pago      text not null
                    check (metodo_pago in ('whatsapp','culqi','yape','plin','tarjeta')),
  subtotal_pen     numeric(10,2) not null default 0,
  descuento_pen    numeric(10,2) not null default 0,
  envio_pen        numeric(10,2) not null default 0,
  total_pen        numeric(10,2) not null default 0,
  cupon            text,
  direccion_envio  jsonb,
  notas            text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists idx_pedidos_cliente on public.pedidos(cliente_id);
create index if not exists idx_pedidos_estado on public.pedidos(estado);
create index if not exists idx_pedidos_created on public.pedidos(created_at desc);

alter table public.pedidos enable row level security;

drop policy if exists "pedidos_select_own" on public.pedidos;
create policy "pedidos_select_own"
  on public.pedidos for select
  using ( auth.uid() = cliente_id );

drop policy if exists "pedidos_insert_own" on public.pedidos;
create policy "pedidos_insert_own"
  on public.pedidos for insert
  with check ( auth.uid() = cliente_id );

drop policy if exists "pedidos_update_own_when_pending" on public.pedidos;
create policy "pedidos_update_own_when_pending"
  on public.pedidos for update
  using ( auth.uid() = cliente_id and estado = 'pendiente' );

-- ----------------------------------------------------------------------------
-- 4. PEDIDO_ITEMS
-- ----------------------------------------------------------------------------
create table if not exists public.pedido_items (
  id                  uuid primary key default gen_random_uuid(),
  pedido_id           uuid not null references public.pedidos(id) on delete cascade,
  producto_id         uuid not null,
  nombre_snapshot     text not null,
  sku_snapshot        text,
  talla_snapshot      text,
  color_snapshot      text,
  imagen_snapshot     text,
  precio_unitario_pen numeric(10,2) not null,
  cantidad            integer not null check (cantidad > 0),
  subtotal_pen        numeric(10,2) generated always as (precio_unitario_pen * cantidad) stored,
  created_at          timestamptz not null default now()
);

create index if not exists idx_pedido_items_pedido on public.pedido_items(pedido_id);
create index if not exists idx_pedido_items_producto on public.pedido_items(producto_id);

alter table public.pedido_items enable row level security;

drop policy if exists "pedido_items_select_own" on public.pedido_items;
create policy "pedido_items_select_own"
  on public.pedido_items for select
  using (
    exists (
      select 1 from public.pedidos p
      where p.id = pedido_items.pedido_id and p.cliente_id = auth.uid()
    )
  );

drop policy if exists "pedido_items_insert_own" on public.pedido_items;
create policy "pedido_items_insert_own"
  on public.pedido_items for insert
  with check (
    exists (
      select 1 from public.pedidos p
      where p.id = pedido_items.pedido_id and p.cliente_id = auth.uid()
    )
  );

-- ----------------------------------------------------------------------------
-- 5. RECLAMACIONES  (Libro de reclamaciones — obligatorio Perú)
-- Insert público anónimo; lectura solo service_role (sin policy SELECT).
-- ----------------------------------------------------------------------------
create table if not exists public.reclamaciones (
  id                  uuid primary key default gen_random_uuid(),
  numero              text not null unique default ('OX-RC-' || lpad(floor(random()*1000000)::text, 6, '0')),
  tipo                text not null check (tipo in ('reclamo','queja')),
  nombres             text not null,
  apellidos           text not null,
  documento_tipo      text check (documento_tipo in ('DNI','CE','Pasaporte','RUC')),
  documento_numero    text,
  email               text not null,
  telefono            text,
  departamento        text,
  distrito            text,
  direccion           text,
  bien_contratado     text check (bien_contratado in ('producto','servicio')),
  monto_pen           numeric(10,2),
  descripcion         text not null,
  pedido_referencia   text,
  estado              text not null default 'recibido'
                       check (estado in ('recibido','en_revision','respondido','cerrado')),
  created_at          timestamptz not null default now()
);

create index if not exists idx_reclamaciones_created on public.reclamaciones(created_at desc);

alter table public.reclamaciones enable row level security;

drop policy if exists "reclamaciones_insert_public" on public.reclamaciones;
create policy "reclamaciones_insert_public"
  on public.reclamaciones for insert
  with check ( true );

-- ----------------------------------------------------------------------------
-- 6. AVISOS_DROP  (Captación email para próximos drops)
-- Insert público; lectura solo service_role.
-- ----------------------------------------------------------------------------
create table if not exists public.avisos_drop (
  id          uuid primary key default gen_random_uuid(),
  drop_id     uuid,
  email       text not null,
  telefono    text,
  created_at  timestamptz not null default now(),
  unique (drop_id, email)
);

create index if not exists idx_avisos_drop on public.avisos_drop(drop_id);

alter table public.avisos_drop enable row level security;

drop policy if exists "avisos_drop_insert_public" on public.avisos_drop;
create policy "avisos_drop_insert_public"
  on public.avisos_drop for insert
  with check ( true );

-- ----------------------------------------------------------------------------
-- 7. Triggers updated_at
-- ----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_clientes_updated_at on public.clientes;
create trigger trg_clientes_updated_at
  before update on public.clientes
  for each row execute function public.set_updated_at();

drop trigger if exists trg_pedidos_updated_at on public.pedidos;
create trigger trg_pedidos_updated_at
  before update on public.pedidos
  for each row execute function public.set_updated_at();
