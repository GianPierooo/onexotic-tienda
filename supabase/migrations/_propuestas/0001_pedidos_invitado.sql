-- PROPUESTA — NO APLICADA AUTOMÁTICAMENTE
-- Objetivo: permitir checkout como invitado sin requerir cuenta Supabase Auth.
-- Hoy la columna pedidos.cliente_id es NOT NULL con FK a clientes(id),
-- así que un invitado no puede crear un pedido en la BD.
--
-- Esta migración:
--   1) Permite cliente_id NULL en pedidos.
--   2) Agrega columnas de snapshot del invitado para no depender de la
--      tabla clientes.
--   3) Mantiene la FK con ON DELETE SET NULL para no romper integridad.
--   4) Sugiere ajustar la función RPC public.crear_pedido para aceptar
--      un payload de invitado opcional (p_invitado JSONB).
--
-- Aplicar manualmente con `supabase db push` o ejecutando este archivo
-- en el SQL editor de Supabase, después de revisarlo.

BEGIN;

-- 1) cliente_id opcional
ALTER TABLE public.pedidos
  ALTER COLUMN cliente_id DROP NOT NULL;

-- 2) FK ON DELETE SET NULL
ALTER TABLE public.pedidos
  DROP CONSTRAINT IF EXISTS pedidos_cliente_id_fkey,
  ADD  CONSTRAINT pedidos_cliente_id_fkey
       FOREIGN KEY (cliente_id) REFERENCES public.clientes(id)
       ON DELETE SET NULL;

-- 3) Columnas snapshot del invitado
ALTER TABLE public.pedidos
  ADD COLUMN IF NOT EXISTS invitado_nombre   text,
  ADD COLUMN IF NOT EXISTS invitado_email    text,
  ADD COLUMN IF NOT EXISTS invitado_telefono text;

-- 4) Validación: al menos uno de cliente_id / invitado_email debe estar.
ALTER TABLE public.pedidos
  ADD CONSTRAINT pedidos_cliente_o_invitado_chk
  CHECK (cliente_id IS NOT NULL OR invitado_email IS NOT NULL);

-- 5) RLS: lectura del propio invitado por token de seguimiento (a definir)
--    queda fuera de esta migración para no abrir SELECTs sin candado.
--    Por ahora los pedidos de invitado solo son legibles por el equipo
--    desde Supabase Studio (service role) — exactamente como conviene.

COMMIT;

-- Ajuste sugerido a public.crear_pedido (pseudocódigo):
--   crear_pedido(
--     p_items jsonb,
--     p_metodo_pago text,
--     p_direccion_envio jsonb,
--     p_envio_pen numeric,
--     p_descuento_pen numeric,
--     p_cupon text,
--     p_notas text,
--     p_invitado jsonb DEFAULT NULL  -- { nombre, email, telefono }
--   )
-- Si auth.uid() IS NOT NULL  -> usar cliente_id := auth.uid()
-- Si p_invitado IS NOT NULL  -> guardar snapshot en invitado_*
-- Si ninguno                 -> RAISE EXCEPTION 'pedido_sin_titular';
