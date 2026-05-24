-- ============================================================================
-- OnExotic — Tienda web · RLS drops: incluir 'cerrado' y 'archivado'
-- Fecha: 2026-05-24
-- ----------------------------------------------------------------------------
-- El archivo público (`/drops`) necesita mostrar los capítulos pasados:
-- drops con estado 'cerrado' o 'archivado'. La política anterior solo
-- exponía 'lanzado' / 'planificacion' / 'produccion'.
--
-- La policy de productos NO cambia: los productos de drops cerrados siguen
-- ocultos (las cards del archivo se renderizan sin grid de productos).
-- ============================================================================

drop policy if exists "tienda_ver_drops_publicados" on public.drops;

create policy "tienda_ver_drops_publicados"
  on public.drops
  for select
  to anon, authenticated
  using (
    estado in ('lanzado', 'planificacion', 'produccion', 'cerrado', 'archivado')
  );
