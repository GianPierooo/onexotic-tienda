-- ============================================================================
-- OnExotic — Tienda web · Políticas SELECT públicas para drops y productos
-- Fecha: 2026-05-22
-- ----------------------------------------------------------------------------
-- Permite que la tienda web (visitantes anónimos y clientes registrados)
-- pueda LEER drops y productos visibles, sin afectar las políticas existentes
-- de la app interna (ceo/manager/producción siguen teniendo CRUD total).
--
-- Estados de drop visibles públicamente:
--   - 'lanzado'        → drop activo, comprable
--   - 'planificacion'  → próximo drop (para countdown + "Avísame")
--   - 'produccion'     → próximo drop
--
-- Productos visibles públicamente:
--   - estado = 'activo'
--   - stock > 0
--   - drop padre en la whitelist de arriba
-- ============================================================================

-- Drops: lectura pública filtrada
drop policy if exists "tienda_ver_drops_publicados" on public.drops;
create policy "tienda_ver_drops_publicados"
  on public.drops
  for select
  to anon, authenticated
  using (
    estado in ('lanzado', 'planificacion', 'produccion')
  );

-- Productos: lectura pública filtrada (estado + stock + drop visible)
drop policy if exists "tienda_ver_productos_activos" on public.productos;
create policy "tienda_ver_productos_activos"
  on public.productos
  for select
  to anon, authenticated
  using (
    estado = 'activo'
    and coalesce(stock, 0) > 0
    and exists (
      select 1
      from public.drops d
      where d.id = productos.drop_id
        and d.estado in ('lanzado', 'planificacion', 'produccion')
    )
  );
