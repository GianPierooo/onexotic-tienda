-- ============================================================================
-- OnExotic — Tienda · productos.slug deja de ser UNIQUE
-- Fecha: 2026-05-23
-- ----------------------------------------------------------------------------
-- El modelo de inventario es UNA FILA POR TALLA: una prenda "Hoodie Tribal
-- Negro" en tallas S/M/L son 3 filas distintas en `productos`. Si `slug`
-- fuera UNIQUE no podrían compartir el slug "hoodie-tribal-negro".
--
-- La tienda ya enruta por UUID (`/producto/<id>`); el slug queda como
-- columna libre, opcional y NO única, lista para usarse a futuro como
-- identificador de "grupo de variantes" si decidimos mover el routing a
-- slugs legibles. Se conserva un índice no-único para búsquedas rápidas.
-- ============================================================================

alter table public.productos
  drop constraint if exists productos_slug_key;

create index if not exists idx_productos_slug on public.productos(slug);

comment on column public.productos.slug is
  'Identificador legible del GRUPO de variantes (nombre+color). No es único: las distintas tallas comparten slug. La tienda hoy enruta por id; el slug es opcional.';
