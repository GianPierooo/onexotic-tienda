-- ============================================================================
-- OnExotic — Tienda web · Estados de drops: 'cerrado' y 'archivado'
-- Fecha: 2026-05-25
-- ----------------------------------------------------------------------------
-- El archivo público (/drops) necesita drops con estado 'cerrado' o
-- 'archivado'. El check constraint actual de la app interna solo permite
-- 'lanzado' / 'planificacion' / 'produccion'. Lo extendemos sin tocar las
-- filas existentes.
-- ============================================================================

alter table public.drops
  drop constraint if exists drops_estado_check;

alter table public.drops
  add constraint drops_estado_check
  check (
    estado in (
      'borrador',
      'planificacion',
      'produccion',
      'lanzado',
      'pausado',
      'cerrado',
      'archivado'
    )
  );
