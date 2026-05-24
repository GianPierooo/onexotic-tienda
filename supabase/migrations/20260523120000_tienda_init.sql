-- ============================================================================
-- OnExotic — Tienda web · Migración inicial (proyecto propio)
-- Fecha: 2026-05-23
-- ----------------------------------------------------------------------------
-- Esta es la PRIMERA migración del proyecto Supabase exclusivo de la tienda
-- (project ref jmxiwzotiridrjkdqulh). El proyecto NO comparte tablas con
-- onexotic_app: la tienda gestiona sus propios `productos` y `drops`, y el
-- stock se actualiza manualmente desde el dashboard.
--
-- Estructura:
--   1) drops               (colecciones limitadas)
--   2) productos           (catálogo + stock por talla)
--   3) clientes            (1:1 con auth.users; trigger automático)
--   4) direcciones         (libreta del cliente)
--   5) pedidos             (orden de compra)
--   6) pedido_items        (snapshots inmutables del momento de la compra)
--   7) reclamaciones       (libro virtual obligatorio en Perú)
--   8) avisos_drop         (captación de email para próximos drops)
--   9) RPC crear_pedido    (descuento de stock atómico con FOR UPDATE)
--  10) Buckets de Storage  (productos, editorial)
--  11) Trigger updated_at  (clientes, pedidos)
-- ============================================================================

-- ============================================================================
-- 1. DROPS
-- ============================================================================
create table public.drops (
  id                 uuid primary key default gen_random_uuid(),
  nombre             text not null,
  concepto           text,
  estado             text not null default 'planificacion'
                       check (estado in (
                         'borrador','planificacion','produccion','lanzado',
                         'pausado','cerrado','archivado'
                       )),
  fecha_lanzamiento  timestamptz,
  created_at         timestamptz not null default now()
);

create index idx_drops_estado on public.drops(estado);
create index idx_drops_fecha  on public.drops(fecha_lanzamiento desc nulls last);

comment on table  public.drops is 'Colecciones / capítulos. Solo los que están en estados visibles aparecen en la tienda.';
comment on column public.drops.estado is
  'Ciclo: borrador → planificacion → produccion → lanzado → cerrado → archivado. Tienda muestra: lanzado (activo), planificacion/produccion (próximo), cerrado/archivado (archivo).';

-- ============================================================================
-- 2. PRODUCTOS
-- ============================================================================
create table public.productos (
  id            uuid primary key default gen_random_uuid(),
  drop_id       uuid references public.drops(id) on delete set null,
  nombre        text not null,
  slug          text unique,
  tipo          text not null,
  talla         text not null,
  color         text,
  stock         integer not null default 0 check (stock >= 0),
  stock_minimo  integer not null default 0 check (stock_minimo >= 0),
  precio_venta  numeric(10,2),
  estado        text not null default 'activo'
                  check (estado in ('activo','agotado','inactivo')),
  imagen_url    text,
  imagenes_url  text[],
  sku           text,
  created_at    timestamptz not null default now()
);

create index idx_productos_drop    on public.productos(drop_id);
create index idx_productos_estado  on public.productos(estado);
create index idx_productos_tipo    on public.productos(tipo);
create index idx_productos_nombre  on public.productos(nombre);
create index idx_productos_sku     on public.productos(sku);

comment on column public.productos.imagenes_url is
  'Galería de fotos (frente, espalda, detalle…). Si está NULL, la tienda usa imagen_url como única foto.';
comment on column public.productos.estado is
  'activo = comprable, agotado = visible pero no comprable, inactivo = oculto del catálogo.';

-- ============================================================================
-- 3. CLIENTES (1:1 con auth.users)
-- ============================================================================
create table public.clientes (
  id          uuid primary key references auth.users(id) on delete cascade,
  nombre      text,
  apellidos   text,
  telefono    text,
  email       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Trigger: al registrarse un usuario, crearle su fila de cliente.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.clientes (id, email, nombre, telefono)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'nombre', ''),
    coalesce(new.raw_user_meta_data->>'telefono', null)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- 4. DIRECCIONES
-- ============================================================================
create table public.direcciones (
  id                 uuid primary key default gen_random_uuid(),
  cliente_id         uuid not null references public.clientes(id) on delete cascade,
  alias              text,
  destinatario       text not null,
  telefono           text not null,
  pais               text not null default 'PE',
  departamento       text not null,
  provincia          text,
  distrito           text not null,
  direccion          text not null,
  referencia         text,
  codigo_postal      text,
  es_predeterminada  boolean not null default false,
  created_at         timestamptz not null default now()
);

create index idx_direcciones_cliente on public.direcciones(cliente_id);

-- ============================================================================
-- 5. PEDIDOS
-- ============================================================================
create table public.pedidos (
  id               uuid primary key default gen_random_uuid(),
  cliente_id       uuid not null references public.clientes(id) on delete restrict,
  numero_pedido    text not null unique,
  estado           text not null default 'pendiente'
                    check (estado in (
                      'pendiente','confirmado','pagado','en_preparacion',
                      'enviado','entregado','cancelado'
                    )),
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

create index idx_pedidos_cliente on public.pedidos(cliente_id);
create index idx_pedidos_estado  on public.pedidos(estado);
create index idx_pedidos_created on public.pedidos(created_at desc);

-- ============================================================================
-- 6. PEDIDO_ITEMS
-- ============================================================================
create table public.pedido_items (
  id                  uuid primary key default gen_random_uuid(),
  pedido_id           uuid not null references public.pedidos(id) on delete cascade,
  producto_id         uuid references public.productos(id) on delete set null,
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

create index idx_pedido_items_pedido   on public.pedido_items(pedido_id);
create index idx_pedido_items_producto on public.pedido_items(producto_id);

-- ============================================================================
-- 7. RECLAMACIONES (libro virtual obligatorio en Perú)
-- ============================================================================
create table public.reclamaciones (
  id                 uuid primary key default gen_random_uuid(),
  numero             text not null unique default ('OX-RC-' || lpad(floor(random()*1000000)::text, 6, '0')),
  tipo               text not null check (tipo in ('reclamo','queja')),
  nombres            text not null,
  apellidos          text not null,
  documento_tipo     text check (documento_tipo in ('DNI','CE','Pasaporte','RUC')),
  documento_numero   text,
  email              text not null,
  telefono           text,
  departamento       text,
  distrito           text,
  direccion          text,
  bien_contratado    text check (bien_contratado in ('producto','servicio')),
  monto_pen          numeric(10,2),
  descripcion        text not null,
  pedido_referencia  text,
  estado             text not null default 'recibido'
                       check (estado in ('recibido','en_revision','respondido','cerrado')),
  created_at         timestamptz not null default now()
);

create index idx_reclamaciones_created on public.reclamaciones(created_at desc);

-- ============================================================================
-- 8. AVISOS_DROP (captación de email para próximos drops)
-- ============================================================================
create table public.avisos_drop (
  id          uuid primary key default gen_random_uuid(),
  drop_id     uuid references public.drops(id) on delete set null,
  email       text not null,
  telefono    text,
  created_at  timestamptz not null default now(),
  unique (drop_id, email)
);

create index idx_avisos_drop on public.avisos_drop(drop_id);

-- ============================================================================
-- 9. RPC crear_pedido — descuento de stock atómico
-- ----------------------------------------------------------------------------
-- Lockea cada producto con FOR UPDATE, valida estado y stock, inserta el
-- pedido + items y descuenta stock. Anti-oversold cuando dos clientes
-- compran lo último a la vez.
-- ============================================================================
create or replace function public.crear_pedido(
  p_items           jsonb,    -- [{producto_id, cantidad}]
  p_metodo_pago     text,
  p_direccion_envio jsonb,
  p_envio_pen       numeric default 0,
  p_descuento_pen   numeric default 0,
  p_cupon           text default null,
  p_notas           text default null
)
returns table (id uuid, numero_pedido text, total_pen numeric)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_cliente_id uuid := auth.uid();
  v_pedido_id  uuid := gen_random_uuid();
  v_numero     text := 'OX-' || to_char(now(), 'YYMMDD') || '-' ||
                       lpad(floor(random()*100000)::text, 5, '0');
  v_subtotal   numeric := 0;
  v_total      numeric := 0;
  v_item       jsonb;
  v_prod       record;
  v_cant       integer;
begin
  if v_cliente_id is null then
    raise exception 'auth_required' using errcode = '42501';
  end if;

  if p_items is null or jsonb_array_length(p_items) = 0 then
    raise exception 'items_required' using errcode = '22023';
  end if;

  if p_metodo_pago not in ('whatsapp','culqi','yape','plin','tarjeta') then
    raise exception 'metodo_pago_invalido' using errcode = '22023';
  end if;

  -- Asegurar fila en clientes (por si el trigger no corrió).
  insert into public.clientes (id, email)
    select v_cliente_id, (select email from auth.users where id = v_cliente_id)
  on conflict (id) do nothing;

  -- 1. Bloquear filas de productos y validar stock.
  for v_item in select * from jsonb_array_elements(p_items)
  loop
    v_cant := (v_item->>'cantidad')::int;
    if v_cant is null or v_cant <= 0 then
      raise exception 'cantidad_invalida' using errcode = '22023';
    end if;

    select id, nombre, sku, talla, color, imagen_url, precio_venta, stock, estado, drop_id
      into v_prod
      from public.productos
     where id = (v_item->>'producto_id')::uuid
     for update;

    if not found then
      raise exception 'producto_no_encontrado: %', v_item->>'producto_id'
        using errcode = '22023';
    end if;

    if v_prod.estado not in ('activo','agotado') then
      raise exception 'producto_no_disponible: %', v_prod.nombre using errcode = '22023';
    end if;

    if v_prod.stock < v_cant then
      raise exception 'stock_insuficiente: % (disponible %)', v_prod.nombre, v_prod.stock
        using errcode = '22023';
    end if;

    v_subtotal := v_subtotal + coalesce(v_prod.precio_venta, 0) * v_cant;
  end loop;

  v_total := v_subtotal - coalesce(p_descuento_pen, 0) + coalesce(p_envio_pen, 0);
  if v_total < 0 then v_total := 0; end if;

  -- 2. Insertar pedido.
  insert into public.pedidos (
    id, cliente_id, numero_pedido, estado, metodo_pago,
    subtotal_pen, descuento_pen, envio_pen, total_pen,
    cupon, direccion_envio, notas
  ) values (
    v_pedido_id, v_cliente_id, v_numero, 'pendiente', p_metodo_pago,
    v_subtotal, coalesce(p_descuento_pen, 0), coalesce(p_envio_pen, 0), v_total,
    p_cupon, p_direccion_envio, p_notas
  );

  -- 3. Insertar items + descontar stock.
  for v_item in select * from jsonb_array_elements(p_items)
  loop
    v_cant := (v_item->>'cantidad')::int;

    select id, nombre, sku, talla, color, imagen_url, precio_venta, stock
      into v_prod
      from public.productos
     where id = (v_item->>'producto_id')::uuid;

    insert into public.pedido_items (
      pedido_id, producto_id, nombre_snapshot, sku_snapshot,
      talla_snapshot, color_snapshot, imagen_snapshot,
      precio_unitario_pen, cantidad
    ) values (
      v_pedido_id, v_prod.id, v_prod.nombre, v_prod.sku,
      v_prod.talla, v_prod.color, v_prod.imagen_url,
      coalesce(v_prod.precio_venta, 0), v_cant
    );

    update public.productos
       set stock = stock - v_cant,
           estado = case when stock - v_cant <= 0 then 'agotado' else estado end
     where id = v_prod.id;
  end loop;

  return query select v_pedido_id, v_numero, v_total;
end;
$$;

grant execute on function public.crear_pedido(
  jsonb, text, jsonb, numeric, numeric, text, text
) to authenticated;

-- ============================================================================
-- 10. RLS — Row Level Security
-- ============================================================================

-- ── DROPS: lectura pública filtrada, sin escritura pública ─────────────
alter table public.drops enable row level security;

create policy "drops_select_public"
  on public.drops for select
  to anon, authenticated
  using (
    estado in (
      'lanzado','planificacion','produccion','cerrado','archivado'
    )
  );

-- ── PRODUCTOS: lectura pública (activo o agotado) + drop visible ───────
alter table public.productos enable row level security;

create policy "productos_select_public"
  on public.productos for select
  to anon, authenticated
  using (
    estado in ('activo','agotado')
    and (
      drop_id is null
      or exists (
        select 1 from public.drops d
        where d.id = productos.drop_id
          and d.estado in (
            'lanzado','planificacion','produccion','cerrado','archivado'
          )
      )
    )
  );

-- ── CLIENTES: cada uno ve y edita SOLO su propia fila ──────────────────
alter table public.clientes enable row level security;

create policy "clientes_select_own"
  on public.clientes for select
  to authenticated
  using ( auth.uid() = id );

create policy "clientes_insert_own"
  on public.clientes for insert
  to authenticated
  with check ( auth.uid() = id );

create policy "clientes_update_own"
  on public.clientes for update
  to authenticated
  using ( auth.uid() = id )
  with check ( auth.uid() = id );

-- ── DIRECCIONES: CRUD propio ───────────────────────────────────────────
alter table public.direcciones enable row level security;

create policy "direcciones_select_own"
  on public.direcciones for select
  to authenticated
  using ( auth.uid() = cliente_id );

create policy "direcciones_insert_own"
  on public.direcciones for insert
  to authenticated
  with check ( auth.uid() = cliente_id );

create policy "direcciones_update_own"
  on public.direcciones for update
  to authenticated
  using ( auth.uid() = cliente_id )
  with check ( auth.uid() = cliente_id );

create policy "direcciones_delete_own"
  on public.direcciones for delete
  to authenticated
  using ( auth.uid() = cliente_id );

-- ── PEDIDOS: lectura propia; insert propio; update solo si pendiente ───
alter table public.pedidos enable row level security;

create policy "pedidos_select_own"
  on public.pedidos for select
  to authenticated
  using ( auth.uid() = cliente_id );

create policy "pedidos_insert_own"
  on public.pedidos for insert
  to authenticated
  with check ( auth.uid() = cliente_id );

create policy "pedidos_update_own_when_pending"
  on public.pedidos for update
  to authenticated
  using ( auth.uid() = cliente_id and estado = 'pendiente' )
  with check ( auth.uid() = cliente_id );

-- ── PEDIDO_ITEMS: alcance heredado del pedido padre ────────────────────
alter table public.pedido_items enable row level security;

create policy "pedido_items_select_own"
  on public.pedido_items for select
  to authenticated
  using (
    exists (
      select 1 from public.pedidos p
      where p.id = pedido_items.pedido_id and p.cliente_id = auth.uid()
    )
  );

create policy "pedido_items_insert_own"
  on public.pedido_items for insert
  to authenticated
  with check (
    exists (
      select 1 from public.pedidos p
      where p.id = pedido_items.pedido_id and p.cliente_id = auth.uid()
    )
  );

-- ── RECLAMACIONES: insert público (libro de reclamaciones), sin SELECT ─
alter table public.reclamaciones enable row level security;

create policy "reclamaciones_insert_public"
  on public.reclamaciones for insert
  to anon, authenticated
  with check ( true );

-- ── AVISOS_DROP: insert público, sin SELECT ────────────────────────────
alter table public.avisos_drop enable row level security;

create policy "avisos_drop_insert_public"
  on public.avisos_drop for insert
  to anon, authenticated
  with check ( true );

-- ============================================================================
-- 11. Trigger updated_at
-- ============================================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_clientes_updated_at
  before update on public.clientes
  for each row execute function public.set_updated_at();

create trigger trg_pedidos_updated_at
  before update on public.pedidos
  for each row execute function public.set_updated_at();

-- ============================================================================
-- 12. Storage buckets (productos, editorial) — públicos
-- ----------------------------------------------------------------------------
-- Carpeta sugerida:
--   productos/<drop>/<sku>/<n>.webp
--   editorial/<drop>/<look>/<n>.webp
-- Subida desde el dashboard de Supabase o con service_role; lectura libre.
-- ============================================================================
insert into storage.buckets (id, name, public)
values
  ('productos', 'productos', true),
  ('editorial', 'editorial', true)
on conflict (id) do nothing;

-- Lectura pública explícita (los buckets `public=true` ya la dan, pero la
-- política deja constancia para futuras auditorías).
drop policy if exists "storage_productos_public_read" on storage.objects;
create policy "storage_productos_public_read"
  on storage.objects for select
  to anon, authenticated
  using ( bucket_id = 'productos' );

drop policy if exists "storage_editorial_public_read" on storage.objects;
create policy "storage_editorial_public_read"
  on storage.objects for select
  to anon, authenticated
  using ( bucket_id = 'editorial' );
