import { headers } from 'next/headers';
import { brandOgImage, ogImageDataUrl } from '@/lib/og';

export const runtime = 'edge';
export const alt = 'OnExotic';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const SB = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const H = { apikey: KEY ?? '', Authorization: `Bearer ${KEY ?? ''}` };

function getOrigin(): string {
  const h = headers();
  const host = h.get('host') ?? '';
  if (!host) return process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const proto =
    h.get('x-forwarded-proto') ?? (host.includes('localhost') ? 'http' : 'https');
  return `${proto}://${host}`;
}

export default async function Image() {
  let title = 'Tienda';
  let subtitle: string | null = 'Cuando se acaba, se acaba.';
  let imageUrl: string | null = null;
  try {
    const dres = await fetch(
      `${SB}/rest/v1/drops?estado=eq.lanzado&select=id,nombre,concepto&order=fecha_lanzamiento.desc.nullslast&limit=1`,
      { headers: H }
    );
    const drop = (await dres.json())?.[0] as
      | { id: string; nombre: string; concepto: string | null }
      | undefined;
    if (drop) {
      title = drop.nombre ?? title;
      subtitle = drop.concepto ?? subtitle;
      const pres = await fetch(
        `${SB}/rest/v1/productos?drop_id=eq.${drop.id}&estado=eq.activo&stock=gt.0&select=imagen_url&limit=1`,
        { headers: H }
      );
      const raw = (await pres.json())?.[0]?.imagen_url ?? null;
      imageUrl = await ogImageDataUrl(getOrigin(), raw);
    }
  } catch {
    // OG de marca sin foto si falla el fetch.
  }
  return brandOgImage({ eyebrow: 'OnExotic · Drop', title, subtitle, imageUrl });
}
