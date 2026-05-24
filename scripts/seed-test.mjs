// ============================================================================
// scripts/seed-test.mjs — Plantilla de carga manual para OnExotic Tienda
// ----------------------------------------------------------------------------
// La tienda gestiona su propio inventario en su Supabase exclusivo. El stock
// real lo cargas a mano desde el dashboard o adaptando este script.
//
// Este archivo es SOLO una plantilla con UN drop de ejemplo y DOS productos
// para confirmar que la tienda renderiza el flujo completo (home → catálogo
// → detalle → carrito → checkout). Una vez que veas que todo carga, borra
// las filas y entra inventario real.
//
// Uso:
//   $env:SUPABASE_URL = "https://jmxiwzotiridrjkdqulh.supabase.co"
//   $env:SUPABASE_SERVICE_ROLE_KEY = "<service_role del proyecto>"
//   node scripts/seed-test.mjs
//
// Nada de prefijos TEST_: las filas se marcan con el tag "EJEMPLO_" en
// `nombre` para que las identifiques y las borres fácil cuando quieras.
// ============================================================================

import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_ROLE;

if (!url || !key) {
  console.error(
    'Faltan SUPABASE_URL y/o SUPABASE_SERVICE_ROLE_KEY. Exporta ambas y vuelve a correr.'
  );
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const TAG = 'EJEMPLO_';

// ---------------------------------------------------------------------------
// 1. Drop de ejemplo: "lanzado" (visible en home + catálogo).
//    Cambia a 'planificacion' o 'produccion' si quieres ver el contador
//    regresivo del próximo drop con fecha futura.
// ---------------------------------------------------------------------------
const drop = {
  nombre: `${TAG}EXOTIC0`,
  concepto: 'Capítulo cero del culto. Hecho a mano en Lima.',
  estado: 'lanzado',
  fecha_lanzamiento: new Date('2026-05-01T20:00:00-05:00').toISOString(),
};

// ---------------------------------------------------------------------------
// 2. Productos de ejemplo. Mismo nombre+color = misma "card" con tallas.
// ---------------------------------------------------------------------------
const productosEjemplo = (dropId) => [
  // ── Hoodie Tribal Negro: 3 variantes de talla → 1 sola card con selector
  {
    drop_id: dropId,
    nombre: `${TAG}Hoodie Tribal`,
    tipo: 'oversize',
    talla: 'S',
    color: 'Negro',
    stock: 5,
    precio_venta: 189,
    estado: 'activo',
    sku: 'EX0-HOOD-S',
    slug: 'hoodie-tribal-negro',
    imagen_url: null,
  },
  {
    drop_id: dropId,
    nombre: `${TAG}Hoodie Tribal`,
    tipo: 'oversize',
    talla: 'M',
    color: 'Negro',
    stock: 8,
    precio_venta: 189,
    estado: 'activo',
    sku: 'EX0-HOOD-M',
    slug: 'hoodie-tribal-negro',
    imagen_url: null,
  },
  {
    drop_id: dropId,
    nombre: `${TAG}Hoodie Tribal`,
    tipo: 'oversize',
    talla: 'L',
    color: 'Negro',
    stock: 2,
    precio_venta: 189,
    estado: 'activo',
    sku: 'EX0-HOOD-L',
    slug: 'hoodie-tribal-negro',
    imagen_url: null,
  },
  // ── Short Gym Pulse Plata: agotado → la card debe mostrar el sello
  {
    drop_id: dropId,
    nombre: `${TAG}Short Gym Pulse`,
    tipo: 'gymwear',
    talla: 'M',
    color: 'Plata',
    stock: 0,
    precio_venta: 119,
    estado: 'agotado',
    sku: 'EX0-SHORT-M',
    slug: 'short-gym-pulse-plata',
    imagen_url: null,
  },
];

async function run() {
  console.log('▸ Insertando drop de ejemplo…');
  const { data: dropRows, error: dropErr } = await supabase
    .from('drops')
    .insert(drop)
    .select()
    .single();
  if (dropErr) {
    console.error('  drops:', dropErr.message);
    process.exit(1);
  }
  console.log(`  ok · drop_id = ${dropRows.id}`);

  console.log('▸ Insertando productos de ejemplo…');
  const { error: prodErr } = await supabase
    .from('productos')
    .insert(productosEjemplo(dropRows.id));
  if (prodErr) {
    console.error('  productos:', prodErr.message);
    process.exit(1);
  }
  console.log('  ok · 3 productos cargados');

  console.log('\n✓ Listo. Abre la tienda y verifica el flujo.');
  console.log(
    '  Para borrar todo lo cargado por este script:\n' +
      '    DELETE FROM productos WHERE nombre LIKE \'EJEMPLO_%\';\n' +
      '    DELETE FROM drops     WHERE nombre LIKE \'EJEMPLO_%\';'
  );
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
