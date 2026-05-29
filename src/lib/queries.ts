import { createClient } from '@/lib/supabase/server';
import type { Tables } from '@/lib/supabase/database.types';
import type { Review } from '@/components/ui/reviews';

export type Drop = Tables<'drops'>;
export type Producto = Tables<'productos'>;

export type ProductoCard = Pick<
  Producto,
  | 'id'
  | 'nombre'
  | 'tipo'
  | 'talla'
  | 'color'
  | 'stock'
  | 'precio_venta'
  | 'estado'
  | 'imagen_url'
  | 'sku'
  | 'slug'
  | 'drop_id'
>;

export type FilterOptions = {
  tipos: string[];
  tallas: string[];
  colores: string[];
};

export type CatalogFilters = {
  tipo?: string;
  talla?: string;
  color?: string;
  q?: string;
};

export type ProductoFull = Producto;

export function galleryFor(p: Producto): string[] {
  const fromArray = (p.imagenes_url ?? []).filter((u): u is string => !!u);
  if (fromArray.length > 0) return fromArray.slice(0, 5);
  return p.imagen_url ? [p.imagen_url] : [];
}

export async function getProductoBySlug(
  slug: string
): Promise<ProductoFull[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .eq('slug', slug)
    .in('estado', ['activo', 'agotado'])
    .returns<ProductoFull[]>();
  if (error) {
    console.error('getProductoBySlug', error);
    return [];
  }
  return data ?? [];
}

export async function getRelatedProducts(
  base: ProductoFull,
  limit = 4
): Promise<ProductoCard[]> {
  if (!base.drop_id) return [];
  const supabase = createClient();
  const { data, error } = await supabase
    .from('productos')
    .select(
      'id, nombre, tipo, talla, color, stock, precio_venta, estado, imagen_url, sku, slug, drop_id'
    )
    .eq('drop_id', base.drop_id)
    .neq('nombre', base.nombre)
    .eq('estado', 'activo')
    .gt('stock', 0)
    .limit(limit * 4)
    .returns<ProductoCard[]>();
  if (error || !data) return [];
  return data;
}

export async function getActiveDrop(): Promise<Drop | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('drops')
    .select('*')
    .eq('estado', 'lanzado')
    .order('fecha_lanzamiento', { ascending: false, nullsFirst: false })
    .limit(1)
    .maybeSingle();
  if (error) {
    console.error('getActiveDrop', error);
    return null;
  }
  return data;
}

export async function getUpcomingDrop(): Promise<Drop | null> {
  const supabase = createClient();
  const nowIso = new Date().toISOString();
  const { data, error } = await supabase
    .from('drops')
    .select('*')
    .in('estado', ['planificacion', 'produccion'])
    .gt('fecha_lanzamiento', nowIso)
    .order('fecha_lanzamiento', { ascending: true, nullsFirst: false })
    .limit(1)
    .maybeSingle();
  if (error) {
    console.error('getUpcomingDrop', error);
    return null;
  }
  return data;
}

export async function getClosedDrops(): Promise<Drop[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('drops')
    .select('*')
    .in('estado', ['cerrado', 'archivado'])
    .order('fecha_lanzamiento', { ascending: false, nullsFirst: false })
    .returns<Drop[]>();
  if (error) {
    console.error('getClosedDrops', error);
    return [];
  }
  return data ?? [];
}

export type DropStats = {
  dropId: string;
  totalPiezas: number;
};

export async function getDropStats(dropIds: string[]): Promise<DropStats[]> {
  if (dropIds.length === 0) return [];
  const supabase = createClient();
  const { data, error } = await supabase
    .from('productos')
    .select('drop_id')
    .in('drop_id', dropIds)
    .returns<Array<{ drop_id: string | null }>>();
  if (error || !data) return dropIds.map((id) => ({ dropId: id, totalPiezas: 0 }));
  const counts = new Map<string, number>();
  for (const row of data) {
    if (!row.drop_id) continue;
    counts.set(row.drop_id, (counts.get(row.drop_id) ?? 0) + 1);
  }
  return dropIds.map((id) => ({ dropId: id, totalPiezas: counts.get(id) ?? 0 }));
}

export async function getProductsByDrop(
  dropId: string,
  filters: CatalogFilters = {}
): Promise<ProductoCard[]> {
  const supabase = createClient();
  let query = supabase
    .from('productos')
    .select(
      'id, nombre, tipo, talla, color, stock, precio_venta, estado, imagen_url, sku, slug, drop_id'
    )
    .eq('drop_id', dropId)
    .in('estado', ['activo', 'agotado']);

  if (filters.tipo) query = query.eq('tipo', filters.tipo);
  if (filters.talla) query = query.eq('talla', filters.talla);
  if (filters.color) query = query.eq('color', filters.color);
  if (filters.q) {
    const term = filters.q.trim();
    if (term.length > 0) {
      const safe = term.replace(/[%,]/g, ' ');
      query = query.or(`nombre.ilike.%${safe}%,sku.ilike.%${safe}%`);
    }
  }

  const { data, error } = await query
    .order('created_at', { ascending: true })
    .returns<ProductoCard[]>();
  if (error) {
    console.error('getProductsByDrop', error);
    return [];
  }
  return (data ?? []).filter((p) => p.stock > 0 || p.estado === 'agotado');
}

export async function getFeaturedProducts(
  dropId: string,
  limit = 4
): Promise<ProductoCard[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('productos')
    .select(
      'id, nombre, tipo, talla, color, stock, precio_venta, estado, imagen_url, sku, slug, drop_id'
    )
    .eq('drop_id', dropId)
    .eq('estado', 'activo')
    .gt('stock', 0)
    .order('created_at', { ascending: false })
    .limit(limit)
    .returns<ProductoCard[]>();
  if (error) {
    console.error('getFeaturedProducts', error);
    return [];
  }
  return data ?? [];
}

export async function getFilterOptions(dropId: string): Promise<FilterOptions> {
  const supabase = createClient();
  type OptRow = {
    tipo: string;
    talla: string;
    color: string | null;
    stock: number;
    estado: string;
  };
  const { data, error } = await supabase
    .from('productos')
    .select('tipo, talla, color, stock, estado')
    .eq('drop_id', dropId)
    .in('estado', ['activo', 'agotado'])
    .returns<OptRow[]>();
  if (error) {
    console.error('getFilterOptions', error);
    return { tipos: [], tallas: [], colores: [] };
  }
  const visibles = (data ?? []).filter((p) => p.stock > 0 || p.estado === 'agotado');
  const tipos = uniq(visibles.map((p) => p.tipo)).sort();
  const tallas = uniq(visibles.map((p) => p.talla)).sort(sizeSort);
  const colores = uniq(visibles.map((p) => p.color ?? '').filter(Boolean)).sort();
  return { tipos, tallas, colores };
}

function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export function dropSlug(nombre: string): string {
  return nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const HERO_FILE_RE = /^hero\.(webp|jpg|jpeg|png|avif)$/i;

export async function getEditorialImages(dropNombre: string): Promise<string[]> {
  const supabase = createClient();
  const folder = dropSlug(dropNombre);
  const { data, error } = await supabase.storage
    .from('editorial')
    .list(folder, { limit: 50, sortBy: { column: 'name', order: 'asc' } });
  if (error || !data) return [];
  return data
    // Excluye archivos ocultos y la imagen de hero (esa la usa el home, no
    // el lookbook).
    .filter((f) => f.name && !f.name.startsWith('.') && !HERO_FILE_RE.test(f.name))
    .map(
      (f) =>
        supabase.storage.from('editorial').getPublicUrl(`${folder}/${f.name}`)
          .data.publicUrl
    );
}

/**
 * Imagen de fondo del hero para un drop. Convención: subir el archivo a
 * `editorial/<slug-del-drop>/hero.webp` (o jpg/png/avif). Si no existe, el
 * hero usa su fallback de marca (gradiente + trazos tribales).
 */
export async function getDropHeroImage(dropNombre: string): Promise<string | null> {
  const supabase = createClient();
  const folder = dropSlug(dropNombre);
  const { data, error } = await supabase.storage
    .from('editorial')
    .list(folder, { limit: 50, sortBy: { column: 'name', order: 'asc' } });
  if (error || !data) return null;
  const hero = data.find((f) => f.name && HERO_FILE_RE.test(f.name));
  if (!hero) return null;
  return supabase.storage
    .from('editorial')
    .getPublicUrl(`${folder}/${hero.name}`).data.publicUrl;
}

/**
 * Reseñas APROBADAS de un producto. Como un producto son varias filas (una por
 * talla) que comparten slug, se pasan todas sus ids y se agregan las reseñas.
 */
export async function getApprovedReviews(
  productoIds: string[]
): Promise<Review[]> {
  if (productoIds.length === 0) return [];
  const supabase = createClient();
  const { data, error } = await supabase
    .from('resenias')
    .select('id, autor, estrellas, texto, foto_url, created_at')
    .in('producto_id', productoIds)
    .eq('aprobada', true)
    .order('created_at', { ascending: false })
    .limit(50)
    .returns<
      Array<{
        id: string;
        autor: string | null;
        estrellas: number;
        texto: string;
        foto_url: string | null;
        created_at: string;
      }>
    >();
  if (error || !data) return [];
  return data.map((r) => ({
    id: r.id,
    autor: r.autor ?? 'Cliente OnExotic',
    fecha: r.created_at,
    estrellas: r.estrellas,
    texto: r.texto,
    foto_url: r.foto_url,
  }));
}

const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'UNICA', 'ÚNICA'];
function sizeSort(a: string, b: string): number {
  const ai = sizeOrder.indexOf(a.toUpperCase());
  const bi = sizeOrder.indexOf(b.toUpperCase());
  if (ai !== -1 && bi !== -1) return ai - bi;
  if (ai !== -1) return -1;
  if (bi !== -1) return 1;
  return a.localeCompare(b);
}
