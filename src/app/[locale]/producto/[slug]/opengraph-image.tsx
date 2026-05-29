import { headers } from 'next/headers';
import { brandOgImage, ogImageDataUrl } from '@/lib/og';

// Edge: runtime recomendado por next/og (y evita el bug de fuente por defecto
// de @vercel/og en el build de Node). Datos vía REST anónima (sin cookies).
export const runtime = 'edge';
export const alt = 'OnExotic';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const SB = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function getOrigin(): string {
  const h = headers();
  const host = h.get('host') ?? '';
  if (!host) return process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const proto =
    h.get('x-forwarded-proto') ?? (host.includes('localhost') ? 'http' : 'https');
  return `${proto}://${host}`;
}

type Props = { params: { locale: string; slug: string } };

export default async function Image({ params }: Props) {
  let nombre = 'OnExotic';
  let tipo = '';
  let imageUrl: string | null = null;
  try {
    const res = await fetch(
      `${SB}/rest/v1/productos?slug=eq.${encodeURIComponent(params.slug)}&estado=in.(activo,agotado)&select=nombre,tipo,imagen_url,variantes&limit=1`,
      { headers: { apikey: KEY ?? '', Authorization: `Bearer ${KEY ?? ''}` } }
    );
    const rows = (await res.json()) as Array<{
      nombre: string;
      tipo: string;
      imagen_url: string | null;
      variantes: Array<{ imagenes_url?: string[] }> | null;
    }>;
    const p = Array.isArray(rows) ? rows[0] : null;
    if (p) {
      nombre = p.nombre ?? nombre;
      tipo = p.tipo ?? '';
      const raw = p.variantes?.[0]?.imagenes_url?.[0] ?? p.imagen_url ?? null;
      imageUrl = await ogImageDataUrl(getOrigin(), raw);
    }
  } catch {
    // Si falla el fetch, se renderiza el OG de marca sin foto.
  }
  return brandOgImage({
    eyebrow: tipo ? `OnExotic · ${tipo}` : 'OnExotic',
    title: nombre,
    imageUrl,
  });
}
