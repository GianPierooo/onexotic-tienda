import { ImageResponse } from 'next/og';
import { headers } from 'next/headers';

// Icono de pantalla de inicio en iOS: logo blanco sobre fondo de marca (los
// iconos de iOS no usan transparencia y se ven con esquinas redondeadas).
export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  const h = headers();
  const host = h.get('host') ?? '';
  const proto =
    h.get('x-forwarded-proto') ?? (host.includes('localhost') ? 'http' : 'https');
  const origin = host
    ? `${proto}://${host}`
    : process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const pad = Math.round(180 * 0.14);

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
          src={`${origin}/logo.png`}
          alt=""
          width={180 - pad * 2}
          height={180 - pad * 2}
          style={{ objectFit: 'contain' }}
        />
      </div>
    ),
    { ...size }
  );
}
