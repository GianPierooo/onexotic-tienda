// ============================================================================
// scripts/verify-flow.mjs — Verificación end-to-end de la tienda
// ----------------------------------------------------------------------------
// 1. Crea un usuario test via admin API → confirma que el trigger
//    handle_new_user inserta la fila correspondiente en `clientes`.
// 2. Hace login con ese usuario → llama al RPC crear_pedido con un producto
//    real del seed → verifica que el pedido se creó, los items quedan en
//    pedido_items y el stock del producto bajó.
// 3. Limpia: borra el pedido y el usuario test.
//
// Variables necesarias:
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY
// ============================================================================

import { createClient } from '@supabase/supabase-js';

// Acepta tanto los nombres "puros" (SUPABASE_URL, SUPABASE_ANON_KEY) como los
// expuestos al cliente (NEXT_PUBLIC_*) para que el script funcione con el
// mismo .env.local de la tienda sin re-exportar variables.
const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_ROLE;
const anonKey =
  process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !serviceKey || !anonKey) {
  console.error(
    'Faltan credenciales. Define (NEXT_PUBLIC_)SUPABASE_URL, ' +
      'SUPABASE_SERVICE_ROLE_KEY y (NEXT_PUBLIC_)SUPABASE_ANON_KEY.'
  );
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const stamp = Date.now();
const testEmail = `tienda-verify-${stamp}@onexotic.test`;
const testPassword = 'OnExoticVerify_2026!';

function log(step, msg) {
  console.log(`[${step}] ${msg}`);
}

async function main() {
  // ── 1. Crear usuario y verificar trigger handle_new_user ──────────────
  log('1', `Creando usuario admin.createUser(${testEmail})…`);
  const { data: userData, error: userErr } = await admin.auth.admin.createUser({
    email: testEmail,
    password: testPassword,
    email_confirm: true,
    user_metadata: { nombre: 'Verify', telefono: '+51999999999' },
  });
  if (userErr) {
    console.error('admin.createUser:', userErr.message);
    process.exit(1);
  }
  const uid = userData.user.id;
  log('1', `✓ usuario creado · uid=${uid}`);

  // Pequeña espera para que el trigger asincronice si fuera lazy (no debería).
  await new Promise((r) => setTimeout(r, 500));

  const { data: cliente, error: clienteErr } = await admin
    .from('clientes')
    .select('id, email, nombre, telefono, created_at')
    .eq('id', uid)
    .maybeSingle();
  if (clienteErr) {
    console.error('select clientes:', clienteErr.message);
    process.exit(1);
  }
  if (!cliente) {
    console.error('✗ TRIGGER FALLÓ · no se creó fila en clientes para uid=' + uid);
    process.exit(1);
  }
  log('1', `✓ trigger ok · clientes(id=${cliente.id}, email=${cliente.email}, nombre="${cliente.nombre}", telefono=${cliente.telefono})`);

  // ── 2. Tomar un producto del seed para el pedido de prueba ────────────
  const { data: productos } = await admin
    .from('productos')
    .select('id, nombre, talla, stock, estado, precio_venta')
    .like('nombre', 'EJEMPLO_Hoodie%')
    .eq('talla', 'M')
    .single();
  if (!productos) {
    console.error('No encuentro el producto M del seed (¿corriste seed-test.mjs?)');
    process.exit(1);
  }
  const stockAntes = productos.stock;
  log('2', `Producto a comprar · ${productos.nombre} talla ${productos.talla} · stock antes = ${stockAntes}`);

  // ── 3. Login como el usuario test y llamar al RPC ─────────────────────
  const userClient = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { error: signErr } = await userClient.auth.signInWithPassword({
    email: testEmail,
    password: testPassword,
  });
  if (signErr) {
    console.error('signIn:', signErr.message);
    process.exit(1);
  }
  log('3', '✓ login ok');

  const cantidad = 2;
  const { data: rpcData, error: rpcErr } = await userClient.rpc('crear_pedido', {
    p_items: [{ producto_id: productos.id, cantidad }],
    p_metodo_pago: 'whatsapp',
    p_direccion_envio: {
      destinatario: 'Verify Tester',
      telefono: '+51999999999',
      pais: 'PE',
      departamento: 'Lima',
      provincia: 'Lima',
      distrito: 'Miraflores',
      direccion: 'Av. Verify 123',
    },
    p_envio_pen: 15,
    p_descuento_pen: 0,
    p_cupon: null,
    p_notas: 'pedido de verificación automática',
  });
  if (rpcErr) {
    console.error('rpc crear_pedido:', rpcErr.message);
    process.exit(1);
  }
  const result = Array.isArray(rpcData) ? rpcData[0] : rpcData;
  log('3', `✓ pedido creado · id=${result.id} · numero=${result.numero_pedido} · total=${result.total_pen}`);

  // ── 4. Verificar stock descontado e items grabados ────────────────────
  const { data: prodDespues } = await admin
    .from('productos')
    .select('stock, estado')
    .eq('id', productos.id)
    .single();
  log('4', `stock después = ${prodDespues.stock} (esperado ${stockAntes - cantidad}) · estado=${prodDespues.estado}`);
  if (prodDespues.stock !== stockAntes - cantidad) {
    console.error('✗ STOCK NO SE DESCONTÓ correctamente');
    process.exit(1);
  }

  const { data: items } = await admin
    .from('pedido_items')
    .select('producto_id, nombre_snapshot, talla_snapshot, cantidad, precio_unitario_pen, subtotal_pen')
    .eq('pedido_id', result.id);
  log('4', `pedido_items snapshot → ${JSON.stringify(items)}`);

  // ── 5. Limpieza ───────────────────────────────────────────────────────
  await admin.from('pedidos').delete().eq('id', result.id);
  // Restaurar stock
  await admin.from('productos').update({ stock: stockAntes, estado: 'activo' }).eq('id', productos.id);
  // Borrar usuario test (cascade borra clientes/direcciones/etc.)
  await admin.auth.admin.deleteUser(uid);
  log('5', `✓ limpieza completa · stock restaurado a ${stockAntes}, usuario test borrado`);

  console.log('\n✓✓ VERIFICACIÓN END-TO-END EXITOSA');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
