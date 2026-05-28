-- PROPUESTA — NO APLICADA AUTOMÁTICAMENTE
-- Objetivo: tabla de reseñas de producto.
--
-- Modelo: 1 reseña por (cliente_id, producto_id). Texto, estrellas 1-5,
-- foto opcional (storage path). Aprobación manual antes de mostrar.

BEGIN;

CREATE TABLE IF NOT EXISTS public.resenias (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id  uuid NOT NULL REFERENCES public.clientes(id) ON DELETE CASCADE,
  producto_id uuid NOT NULL REFERENCES public.productos(id) ON DELETE CASCADE,
  estrellas   smallint NOT NULL CHECK (estrellas BETWEEN 1 AND 5),
  texto       text NOT NULL CHECK (length(texto) BETWEEN 5 AND 1500),
  foto_url    text,
  aprobada    boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (cliente_id, producto_id)
);

CREATE INDEX IF NOT EXISTS resenias_producto_idx
  ON public.resenias (producto_id)
  WHERE aprobada = true;

ALTER TABLE public.resenias ENABLE ROW LEVEL SECURITY;

-- Lectura: cualquiera puede leer reseñas aprobadas.
CREATE POLICY "publico_lee_aprobadas" ON public.resenias
  FOR SELECT
  USING (aprobada = true);

-- Inserción: solo el cliente puede crear su propia reseña.
CREATE POLICY "cliente_inserta_propia" ON public.resenias
  FOR INSERT
  WITH CHECK (auth.uid() = cliente_id);

-- Edición: solo el cliente sobre su reseña.
CREATE POLICY "cliente_edita_propia" ON public.resenias
  FOR UPDATE
  USING (auth.uid() = cliente_id)
  WITH CHECK (auth.uid() = cliente_id);

COMMIT;

-- Notas de UI:
-- - Mostrar solo aprobadas en la página de producto.
-- - Considerar derivar un agregado de estrellas en una vista materializada
--   para evitar SUM en cada SSR de la página de producto.
