import { ImageResponse } from 'next/og';

// Icono de marca para la PWA, generado on-demand: logo BLANCO centrado sobre
// fondo #0A0A0A con safe-zone (~19% padding) para que sirva como `maskable`
// (no se recorta el logo al enmascarar) y también como icono normal.
// next/og en edge decodifica PNG, así que componemos el logo real.
export const runtime = 'edge';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const size = url.searchParams.get('size') === '192' ? 192 : 512;
  const origin = url.origin || process.env.NEXT_PUBLIC_SITE_URL || '';
  const logo = `${origin}/logo.png`;
  const pad = Math.round(size * 0.19);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: '#0A0A0A',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt=""
          width={size - pad * 2}
          height={size - pad * 2}
          style={{ objectFit: 'contain' }}
        />
      </div>
    ),
    { width: size, height: size }
  );
}
