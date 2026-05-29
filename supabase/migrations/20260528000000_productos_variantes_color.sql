-- ============================================================================
-- OnExotic — Tienda web · Variantes de color + descripción larga por producto
-- Fecha: 2026-05-28
-- ----------------------------------------------------------------------------
-- Añade columna `variantes` (JSONB) a productos para soportar UN producto con
-- VARIOS colores, cada color con su propio set de imágenes; y columnas de
-- descripción larga bilingüe (`descripcion` ES, `descripcion_en` EN) que la
-- tienda muestra en el detalle del producto.
--
-- Forma del JSON (array de objetos):
--   [
--     { "color": "Negro", "hex": "#0A0A0A",
--       "imagenes_url": ["<frente>", "<espalda>", ...] },
--     { "color": "Blanco", "hex": "#F5F5F5",
--       "imagenes_url": ["<frente>", "<espalda>", ...] }
--   ]
--
-- Diseño ADITIVO y compatible hacia atrás:
--   * Columna nullable, sin default → no rompe la app interna de Flutter ni
--     los productos existentes.
--   * NULL = producto de un solo color: la tienda cae a `imagenes_url`
--     (galería plana) y, en último término, a `imagen_url`.
--   * El stock se sigue gestionando por TALLA (una fila por talla en
--     `productos`); el color es una variante visual/etiqueta, no una
--     dimensión de stock. La tienda nunca escribe esta columna: solo la lee.
-- ============================================================================

alter table public.productos
  add column if not exists variantes jsonb;

comment on column public.productos.variantes is
  'Tienda web: variantes de color [{color, hex, imagenes_url[]}]. NULL = un solo color (usa imagenes_url/imagen_url). El stock se controla por talla, no por color. No la usa la app interna de Flutter.';

-- Descripción larga bilingüe (nullable → los productos existentes y la app
-- interna de Flutter no se ven afectados; NULL = la tienda usa el copy
-- genérico de marca de i18n).
alter table public.productos
  add column if not exists descripcion text;

alter table public.productos
  add column if not exists descripcion_en text;

comment on column public.productos.descripcion is
  'Tienda web: descripción larga del producto en español. NULL = usar copy genérico de marca (i18n).';

comment on column public.productos.descripcion_en is
  'Tienda web: descripción larga del producto en inglés. NULL = caer a `descripcion` (ES) o al copy genérico.';
