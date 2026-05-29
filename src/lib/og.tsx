import { ImageResponse } from 'next/og';

/** Tamaño estándar de Open Graph / Twitter Card. */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = 'image/png';

// Fuente Archivo (la del cuerpo de la marca) servida como TTF estable. Se
// provee explícitamente para no depender de la fuente por defecto de
// @vercel/og (que falla al resolverse en Windows/local).
const FONT_700 =
  'https://cdn.jsdelivr.net/fontsource/fonts/archivo@latest/latin-700-normal.ttf';
const FONT_900 =
  'https://cdn.jsdelivr.net/fontsource/fonts/archivo@latest/latin-900-normal.ttf';

type OgFont = { name: string; data: ArrayBuffer; weight: 400 | 700 | 900; style: 'normal' };
let fontsPromise: Promise<OgFont[]> | null = null;

function loadFonts(): Promise<OgFont[]> {
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      fetch(FONT_700).then((r) => r.arrayBuffer()),
      fetch(FONT_900).then((r) => r.arrayBuffer()),
    ]).then(([r700, r900]) => [
      { name: 'Archivo', data: r700, weight: 700, style: 'normal' },
      { name: 'Archivo', data: r900, weight: 900, style: 'normal' },
    ]);
  }
  return fontsPromise;
}

function bufToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let bin = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}

/**
 * Satori (next/og) no decodifica WEBP. Las fotos del bucket son .webp, así que
 * las pasamos por el optimizador de imágenes de Next pidiendo JPEG (Accept sin
 * webp) y devolvemos un data URL que Satori sí puede pintar. null si falla.
 */
export async function ogImageDataUrl(
  origin: string,
  sourceUrl: string | null
): Promise<string | null> {
  if (!sourceUrl || !origin) return null;
  try {
    const opt = `${origin}/_next/image?url=${encodeURIComponent(sourceUrl)}&w=640&q=85`;
    const res = await fetch(opt, { headers: { Accept: 'image/jpeg,image/png' } });
    if (!res.ok) return null;
    const ct = res.headers.get('content-type') ?? 'image/jpeg';
    if (ct.includes('webp') || ct.includes('avif')) return null;
    const buf = await res.arrayBuffer();
    return `data:${ct};base64,${bufToBase64(buf)}`;
  } catch {
    return null;
  }
}

type BrandOgOptions = {
  eyebrow: string;
  title: string;
  subtitle?: string | null;
  /** Imagen de la pieza (se muestra en el panel derecho). */
  imageUrl?: string | null;
};

/**
 * Imagen OG con identidad de marca OnExotic: fondo negro, acento rojo gótico,
 * nombre grande y la foto de la pieza a la derecha. Usada por producto y drop.
 *
 * Nota: Satori (next/og) exige estilos flex explícitos y no usa CSS externo.
 */
export async function brandOgImage({ eyebrow, title, subtitle, imageUrl }: BrandOgOptions) {
  const titleSize = title.length > 22 ? 68 : title.length > 14 ? 86 : 108;
  const fonts = await loadFonts();
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: '#0A0A0A',
          color: '#FFFFFF',
          fontFamily: 'Archivo',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            padding: '76px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              color: '#C0C0C0',
              fontSize: 26,
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
            }}
          >
            <div style={{ display: 'flex', width: '44px', height: '3px', background: '#B81414' }} />
            {eyebrow}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: titleSize,
              fontWeight: 900,
              lineHeight: 1.0,
              marginTop: '26px',
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                display: 'flex',
                fontSize: 30,
                color: '#888888',
                marginTop: '30px',
                maxWidth: '600px',
                lineHeight: 1.3,
              }}
            >
              {subtitle}
            </div>
          ) : null}
          <div
            style={{
              display: 'flex',
              marginTop: 'auto',
              fontSize: 26,
              letterSpacing: '0.12em',
              color: '#FFFFFF',
            }}
          >
            onexotic.shop
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            width: '470px',
            background: '#141414',
            borderLeft: '2px solid #B81414',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt=""
              width={470}
              height={630}
              style={{ width: '470px', height: '630px', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ display: 'flex', fontSize: 220, fontWeight: 900, color: '#B81414' }}>
              ✦
            </div>
          )}
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts }
  );
}
