'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

/**
 * Logo de OnExotic con variante por tema.
 *
 * En oscuro usa /logo.png (versión blanca actual).
 * En claro intenta /logo-dark.png. Si el archivo todavía no existe
 * en /public, el handler de onError cae de vuelta al logo blanco para
 * no romper la cabecera mientras el equipo lo sube.
 */
export function Logo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [src, setSrc] = useState('/logo.png');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setSrc(resolvedTheme === 'light' ? '/logo-dark.png' : '/logo.png');
  }, [mounted, resolvedTheme]);

  return (
    <Image
      src={src}
      alt="OnExotic"
      width={160}
      height={40}
      priority
      onError={() => {
        // Fallback transparente al logo blanco si /logo-dark.png aún no existe.
        if (src !== '/logo.png') setSrc('/logo.png');
      }}
      className="h-8 w-auto md:h-10"
    />
  );
}
