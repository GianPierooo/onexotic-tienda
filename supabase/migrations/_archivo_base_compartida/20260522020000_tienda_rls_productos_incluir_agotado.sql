-- ============================================================================
-- OnExotic — Tienda web · Ajuste RLS productos
-- Fecha: 2026-05-22
-- ----------------------------------------------------------------------------
-- Permite que productos con estado 'agotado' también sean visibles en la
-- tienda, junto con los 'activo'. La UI muestra el sello AGOTADO y desactiva
-- el botón de compra para los agotados (CLAUDE.md sección 18).
--
-- Cambios respecto a la política anterior:
--   - estado IN ('activo','agotado')   (antes: estado = 'activo')
--   - se quita el filtro stock > 0     (un agotado puede tener stock = 0)
--
-- Sigue oculto:
--   - productos 'descontinuado'
--   - productos cuyo drop padre no esté visible públicamente
-- ============================================================================

drop policy if exists "tienda_ver_productos_activos" on public.productos;

create policy "tienda_ver_productos_activos"
  on public.productos
  for select
  to anon, authenticated
  using (
    estado in ('activo', 'agotado')
    and exists (
      select 1
      from public.drops d
      where d.id = productos.drop_id
        and d.estado in ('lanzado', 'planificacion', 'produccion')
    )
  );
