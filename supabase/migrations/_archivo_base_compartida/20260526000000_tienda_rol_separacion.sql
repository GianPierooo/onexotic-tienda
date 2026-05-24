-- ============================================================================
-- OnExotic — Tienda web · Separación de cuentas por rol
-- Fecha: 2026-05-26
-- ----------------------------------------------------------------------------
-- La app interna (Flutter) y la tienda web comparten el mismo proyecto
-- Supabase y la misma tabla auth.users. Para evitar que un cuenta del equipo
-- (CEO, manager, diseñadora, RRHH, producción) entre a la tienda — o que un
-- cliente vea datos internos — se separan las cuentas POR ROL:
--
--   • clientes      → fila en public.clientes  (sin fila en public.users)
--   • equipo        → fila en public.users     (con columna rol)
--
-- Este archivo:
--   1) Reafirma el trigger on_auth_user_created (idempotente).
--   2) Expone la función `es_usuario_interno()` para el frontend de la tienda.
--   3) Endurece las RLS de las tablas internas con políticas RESTRICTIVE,
--      que se combinan con AND con las políticas existentes — los clientes
--      nunca podrán leer/escribir aunque haya policies permisivas previas.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Trigger handle_new_user (idempotente — confirma el comportamiento).
--    Cualquier alta en auth.users crea automáticamente la fila en clientes.
--    Si el usuario es interno, su flujo de creación pasa por la app interna
--    que inserta en public.users; este trigger seguirá creando su fila en
--    clientes, pero el chequeo de rol en el login bloquea su acceso a la
--    tienda. Por seguridad, el trigger NO inserta en clientes si el id ya
--    figura en public.users.
-- ----------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Si ya es miembro del equipo interno, no crear fila de cliente.
  if exists (select 1 from public.users where id = new.id) then
    return new;
  end if;

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
-- 2. Función `es_usuario_interno()` — la tienda la llama tras hacer login
--    para decidir si rechaza la sesión.
--    SECURITY DEFINER: el cliente no necesita SELECT directo en public.users;
--    solo recibe un boolean.
-- ----------------------------------------------------------------------------
create or replace function public.es_usuario_interno()
returns boolean
language plpgsql
security definer
stable
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
begin
  if v_uid is null then
    return false;
  end if;
  return exists (select 1 from public.users where id = v_uid);
end;
$$;

revoke all on function public.es_usuario_interno() from public;
grant execute on function public.es_usuario_interno() to anon, authenticated;

-- ----------------------------------------------------------------------------
-- 3. RESTRICTIVE policies: blindan las tablas internas contra cualquier
--    cliente de la tienda. Postgres aplica todas las RESTRICTIVE con AND,
--    así que aunque la app interna tenga policies permisivas, los clientes
--    quedan bloqueados.
--
--    Tablas internas: users, disenios, tareas, asistencia, reuniones,
--    notificaciones.
-- ----------------------------------------------------------------------------

-- public.users
alter table public.users enable row level security;
drop policy if exists "internal_only_users" on public.users;
create policy "internal_only_users"
  on public.users
  as restrictive
  for all
  to anon, authenticated
  using ( auth.uid() is not null and exists (select 1 from public.users u where u.id = auth.uid()) )
  with check ( auth.uid() is not null and exists (select 1 from public.users u where u.id = auth.uid()) );

-- public.disenios
alter table public.disenios enable row level security;
drop policy if exists "internal_only_disenios" on public.disenios;
create policy "internal_only_disenios"
  on public.disenios
  as restrictive
  for all
  to anon, authenticated
  using ( exists (select 1 from public.users u where u.id = auth.uid()) )
  with check ( exists (select 1 from public.users u where u.id = auth.uid()) );

-- public.tareas
alter table public.tareas enable row level security;
drop policy if exists "internal_only_tareas" on public.tareas;
create policy "internal_only_tareas"
  on public.tareas
  as restrictive
  for all
  to anon, authenticated
  using ( exists (select 1 from public.users u where u.id = auth.uid()) )
  with check ( exists (select 1 from public.users u where u.id = auth.uid()) );

-- public.asistencia
alter table public.asistencia enable row level security;
drop policy if exists "internal_only_asistencia" on public.asistencia;
create policy "internal_only_asistencia"
  on public.asistencia
  as restrictive
  for all
  to anon, authenticated
  using ( exists (select 1 from public.users u where u.id = auth.uid()) )
  with check ( exists (select 1 from public.users u where u.id = auth.uid()) );

-- public.reuniones
alter table public.reuniones enable row level security;
drop policy if exists "internal_only_reuniones" on public.reuniones;
create policy "internal_only_reuniones"
  on public.reuniones
  as restrictive
  for all
  to anon, authenticated
  using ( exists (select 1 from public.users u where u.id = auth.uid()) )
  with check ( exists (select 1 from public.users u where u.id = auth.uid()) );

-- public.notificaciones
alter table public.notificaciones enable row level security;
drop policy if exists "internal_only_notificaciones" on public.notificaciones;
create policy "internal_only_notificaciones"
  on public.notificaciones
  as restrictive
  for all
  to anon, authenticated
  using ( exists (select 1 from public.users u where u.id = auth.uid()) )
  with check ( exists (select 1 from public.users u where u.id = auth.uid()) );
