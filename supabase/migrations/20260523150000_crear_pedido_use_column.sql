-- ============================================================================
-- OnExotic — Tienda · crear_pedido() · resolución variable_conflict
-- Fecha: 2026-05-23
-- ----------------------------------------------------------------------------
-- Aun calificando con alias de tabla (migración 20260523140000), la cláusula
-- `RETURNS TABLE (id, …)` expone esos nombres como parámetros OUT del bloque
-- y plpgsql sigue declarando "id" como ambiguo dentro de:
--    insert into public.pedidos (id, …)
--    select p.id … from public.productos p
--
-- La forma estándar de resolverlo sin renombrar la firma (que romperían los
-- callers del RPC) es declarar #variable_conflict use_column en el bloque:
-- cuando un mismo identificador puede ser variable u OUT y a la vez columna,
-- gana la columna. Como nunca asignamos los OUT por nombre (devolvemos con
-- `return query select v_pedido_id, v_numero, v_total`), la directiva es
-- segura.
-- ============================================================================

create or replace function public.crear_pedido(
  p_items           jsonb,
  p_metodo_pago     text,
  p_direccion_envio jsonb,
  p_envio_pen       numeric default 0,
  p_descuento_pen   numeric default 0,
  p_cupon           text default null,
  p_notas           text default null
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
begin
  if v_cliente_id is null then
    raise exception 'auth_required' using errcode = '42501';
  end if;

  if p_items is null or jsonb_array_length(p_items) = 0 then
    raise exception 'items_required' using errcode = '22023';
  end if;

  if p_metodo_pago not in ('whatsapp','culqi','yape','plin','tarjeta') then
    raise exception 'metodo_pago_invalido' using errcode = '22023';
  end if;

  -- Asegurar fila en clientes (defensa por si el trigger no corrió).
  insert into public.clientes (id, email)
    select v_cliente_id, (select u.email from auth.users u where u.id = v_cliente_id)
  on conflict (id) do nothing;

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
    cupon, direccion_envio, notas
  ) values (
    v_pedido_id, v_cliente_id, v_numero, 'pendiente', p_metodo_pago,
    v_subtotal, coalesce(p_descuento_pen, 0), coalesce(p_envio_pen, 0), v_total,
    p_cupon, p_direccion_envio, p_notas
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
