-- ============================================================================
-- OnExotic — Tienda web · Limpieza del seed de ejemplo (EJEMPLO_*)
-- Fecha: 2026-05-29
-- ----------------------------------------------------------------------------
-- Quita el contenido de ejemplo ahora que existe inventario real (drop
-- EXOTICO + Polo Oficial Exótico). La tienda debe mostrar solo contenido real.
--
-- Orden seguro para no romper relaciones (FKs):
--   1) avisos_drop que apuntan al/los drop EJEMPLO  (avisos_drop.drop_id → drops)
--   2) productos EJEMPLO                             (pedido_items.producto_id → productos)
--   3) drops EJEMPLO                                 (productos.drop_id → drops)
--
-- Idempotente: usa el prefijo literal 'EJEMPLO_' (left(nombre,8)) y no borra
-- nada si ya no existe. Aplicado en producción (jmxiwzotiridrjkdqulh) vía
-- Management API; se versiona aquí para reproducibilidad.
--
-- Nota: ya se verificó que NINGÚN pedido_items real referenciaba estos
-- productos, así que no se pierde ninguna orden.
-- ============================================================================

begin;

delete from public.avisos_drop
where drop_id in (
  select id from public.drops where left(nombre, 8) = 'EJEMPLO_'
);

delete from public.productos
where left(nombre, 8) = 'EJEMPLO_';

delete from public.drops
where left(nombre, 8) = 'EJEMPLO_';

commit;
