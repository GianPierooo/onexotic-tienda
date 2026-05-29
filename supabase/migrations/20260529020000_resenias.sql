-- ============================================================================
-- OnExotic — Tienda · Reseñas de producto
-- Fecha: 2026-05-29  (aplica la antigua propuesta _propuestas/0002)
-- ----------------------------------------------------------------------------
-- 1 reseña por (cliente_id, producto_id). Estrellas 1-5, texto, foto opcional.
-- `autor` es el nombre a mostrar (denormalizado al crear), para no exponer la
-- tabla clientes por RLS al público. Aprobación MANUAL: aprobada=false por
-- defecto; no se publican solas.
-- ============================================================================

create table if not exists public.resenias (
  id          uuid primary key default gen_random_uuid(),
  cliente_id  uuid not null references public.clientes(id) on delete cascade,
  producto_id uuid not null references public.productos(id) on delete cascade,
  estrellas   smallint not null check (estrellas between 1 and 5),
  texto       text not null check (length(texto) between 5 and 1500),
  autor       text,
  foto_url    text,
  aprobada    boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (cliente_id, producto_id)
);

create index if not exists resenias_producto_idx
  on public.resenias (producto_id)
  where aprobada = true;

alter table public.resenias enable row level security;

-- Lectura pública SOLO de reseñas aprobadas.
create policy "publico_lee_aprobadas" on public.resenias
  for select using (aprobada = true);

-- El cliente puede ver sus propias reseñas (incl. pendientes de aprobación),
-- para mostrar el estado "en revisión" en su pedido.
create policy "cliente_lee_propia" on public.resenias
  for select using (auth.uid() = cliente_id);

-- Inserción: el cliente solo crea su propia reseña (no puede autoaprobarse:
-- la columna aprobada queda en su default false).
create policy "cliente_inserta_propia" on public.resenias
  for insert with check (auth.uid() = cliente_id);

-- Edición: el cliente sobre su propia reseña.
create policy "cliente_edita_propia" on public.resenias
  for update using (auth.uid() = cliente_id) with check (auth.uid() = cliente_id);
