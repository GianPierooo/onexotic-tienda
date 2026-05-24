-- ============================================================================
-- OnExotic — Tienda web · Galería múltiple por producto
-- Fecha: 2026-05-25
-- ----------------------------------------------------------------------------
-- Añade columna imagenes_url (array de URLs) a productos. El detalle del
-- producto usa este array si existe, y cae a [imagen_url] como fallback.
-- La columna queda nullable para no romper la app interna de Flutter.
-- ============================================================================

alter table public.productos
  add column if not exists imagenes_url text[];

comment on column public.productos.imagenes_url is
  'Galería de la tienda web: hasta 5 URLs de fotos del producto (frente, espalda, detalle, etc.). NULL = usar imagen_url como única foto.';
