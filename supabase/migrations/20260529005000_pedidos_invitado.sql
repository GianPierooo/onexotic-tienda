-- ============================================================================
-- OnExotic — Tienda · Pedidos de INVITADO en la BD
-- Fecha: 2026-05-29  (aplica la antigua propuesta _propuestas/0001)
-- ----------------------------------------------------------------------------
-- Permite checkout de invitado sin cuenta Supabase Auth. Aditiva y compatible:
--   1) pedidos.cliente_id pasa a NULLABLE.
--   2) FK con ON DELETE SET NULL.
--   3) Columnas snapshot del invitado.
--   4) CHECK: debe haber cliente_id O invitado_email.
-- RLS: NO se abre ningún SELECT a invitados. Los pedidos de invitado solo se
-- leen con service role (equipo). El insert lo controla el RPC crear_pedido
-- (security definer) — ver 20260529010000_crear_pedido_invitado.sql.
-- ============================================================================

alter table public.pedidos
  alter column cliente_id drop not null;

alter table public.pedidos
  drop constraint if exists pedidos_cliente_id_fkey,
  add  constraint pedidos_cliente_id_fkey
       foreign key (cliente_id) references public.clientes(id)
       on delete set null;

alter table public.pedidos
  add column if not exists invitado_nombre   text,
  add column if not exists invitado_email    text,
  add column if not exists invitado_telefono text;

alter table public.pedidos
  drop constraint if exists pedidos_cliente_o_invitado_chk;

alter table public.pedidos
  add constraint pedidos_cliente_o_invitado_chk
  check (cliente_id is not null or invitado_email is not null);
