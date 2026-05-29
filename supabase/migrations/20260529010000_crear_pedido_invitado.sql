-- ============================================================================
-- OnExotic — Tienda · crear_pedido() acepta pedidos de INVITADO
-- Fecha: 2026-05-29
-- ----------------------------------------------------------------------------
-- Requiere la migración _propuestas/0001 ya aplicada (pedidos.cliente_id
-- nullable + columnas invitado_*). Recrea el RPC para que, además del flujo
-- autenticado (auth.uid()), acepte un payload de invitado:
--
--   p_invitado jsonb = { "nombre": ..., "email": ..., "telefono": ... }
--
-- Reglas:
--   - auth.uid() presente  → pedido de cliente (cliente_id = auth.uid()).
--   - p_invitado presente   → pedido de invitado (cliente_id NULL + snapshot).
--   - ninguno               → error 'pedido_sin_titular'.
--
-- Toda la lógica de stock (lock FOR UPDATE, validación, descuento atómico) es
-- la MISMA que el flujo autenticado: una sola fuente de verdad.
--
-- Se cambia la firma (se agrega p_invitado), así que hay que DROP + CREATE.
-- El caller autenticado (order-actions.ts) sigue funcionando: los 7 params
-- nombrados resuelven contra esta función (p_invitado toma su default NULL).
-- ============================================================================

drop function if exists public.crear_pedido(jsonb, text, jsonb, numeric, numeric, text, text);

create or replace function public.crear_pedido(
  p_items           jsonb,
  p_metodo_pago     text,
  p_direccion_envio jsonb,
  p_envio_pen       numeric default 0,
  p_descuento_pen   numeric default 0,
  p_cupon           text default null,
  p_notas           text default null,
  p_invitado        jsonb default null
)
returns table (id uuid, numero_pedido text, total_pen numeric)
language plpgsql
security definer
set search_path = public
as $$
#variable_conflict use_column
declare
  v_cliente_id uuid := auth.uid();
  v_pedido_id  uuid := gen_random_uuid();
  v_numero     text := 'OX-' || to_char(now(), 'YYMMDD') || '-' ||
                       lpad(floor(random()*100000)::text, 5, '0');
  v_subtotal   numeric := 0;
  v_total      numeric := 0;
  v_item       jsonb;
  v_prod       record;
  v_cant       integer;
  v_inv_nombre text := nullif(p_invitado->>'nombre', '');
  v_inv_email  text := nullif(p_invitado->>'email', '');
  v_inv_tel    text := nullif(p_invitado->>'telefono', '');
begin
  -- Debe haber un titular: cliente autenticado O invitado con email.
  if v_cliente_id is null and v_inv_email is null then
    raise exception 'pedido_sin_titular' using errcode = '42501';
  end if;

  if p_items is null or jsonb_array_length(p_items) = 0 then
    raise exception 'items_required' using errcode = '22023';
  end if;

  if p_metodo_pago not in ('whatsapp','culqi','yape','plin','tarjeta') then
    raise exception 'metodo_pago_invalido' using errcode = '22023';
  end if;

  -- Solo para clientes con cuenta: asegurar fila en clientes.
  if v_cliente_id is not null then
    insert into public.clientes (id, email)
      select v_cliente_id, (select u.email from auth.users u where u.id = v_cliente_id)
    on conflict (id) do nothing;
  end if;

  for v_item in select * from jsonb_array_elements(p_items)
  loop
    v_cant := (v_item->>'cantidad')::int;
    if v_cant is null or v_cant <= 0 then
      raise exception 'cantidad_invalida' using errcode = '22023';
    end if;

    select p.id, p.nombre, p.sku, p.talla, p.color, p.imagen_url,
           p.precio_venta, p.stock, p.estado, p.drop_id
      into v_prod
      from public.productos p
     where p.id = (v_item->>'producto_id')::uuid
     for update;

    if not found then
      raise exception 'producto_no_encontrado: %', v_item->>'producto_id'
        using errcode = '22023';
    end if;

    if v_prod.estado not in ('activo','agotado') then
      raise exception 'producto_no_disponible: %', v_prod.nombre using errcode = '22023';
    end if;

    if v_prod.stock < v_cant then
      raise exception 'stock_insuficiente: % (disponible %)', v_prod.nombre, v_prod.stock
        using errcode = '22023';
    end if;

    v_subtotal := v_subtotal + coalesce(v_prod.precio_venta, 0) * v_cant;
  end loop;

  v_total := v_subtotal - coalesce(p_descuento_pen, 0) + coalesce(p_envio_pen, 0);
  if v_total < 0 then v_total := 0; end if;

  insert into public.pedidos (
    id, cliente_id, numero_pedido, estado, metodo_pago,
    subtotal_pen, descuento_pen, envio_pen, total_pen,
    cupon, direccion_envio, notas,
    invitado_nombre, invitado_email, invitado_telefono
  ) values (
    v_pedido_id, v_cliente_id, v_numero, 'pendiente', p_metodo_pago,
    v_subtotal, coalesce(p_descuento_pen, 0), coalesce(p_envio_pen, 0), v_total,
    p_cupon, p_direccion_envio, p_notas,
    v_inv_nombre, v_inv_email, v_inv_tel
  );

  for v_item in select * from jsonb_array_elements(p_items)
  loop
    v_cant := (v_item->>'cantidad')::int;

    select p.id, p.nombre, p.sku, p.talla, p.color, p.imagen_url,
           p.precio_venta, p.stock
      into v_prod
      from public.productos p
     where p.id = (v_item->>'producto_id')::uuid;

    insert into public.pedido_items (
      pedido_id, producto_id, nombre_snapshot, sku_snapshot,
      talla_snapshot, color_snapshot, imagen_snapshot,
      precio_unitario_pen, cantidad
    ) values (
      v_pedido_id, v_prod.id, v_prod.nombre, v_prod.sku,
      v_prod.talla, v_prod.color, v_prod.imagen_url,
      coalesce(v_prod.precio_venta, 0), v_cant
    );

    update public.productos p
       set stock = p.stock - v_cant,
           estado = case when p.stock - v_cant <= 0 then 'agotado' else p.estado end
     where p.id = v_prod.id;
  end loop;

  return query select v_pedido_id, v_numero, v_total;
end;
$$;
