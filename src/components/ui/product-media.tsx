'use client';

import { ProductGallery } from './product-gallery';
import { useProductColor } from './product-color-context';

type Props = {
  nombre: string;
  sku: string | null;
  agotado: boolean;
  badgeLive: string;
  badgeSoldOut: string;
};

/**
 * Galería conectada al contexto de color: al cambiar color, cambian las
 * imágenes. Se renderiza en el servidor (SSR) para conservar la imagen LCP;
 * framer-motion va por LazyMotion (features en chunk diferido, ver
 * components/motion.tsx).
 */
export function ProductMedia({ nombre, sku, agotado, badgeLive, badgeSoldOut }: Props) {
  const { images, colorName } = useProductColor();
  return (
    <ProductGallery
      key={colorName ?? 'default'}
      imagenes={images}
      nombre={colorName ? `${nombre} · ${colorName}` : nombre}
      sku={sku}
      agotado={agotado}
      badgeLive={badgeLive}
      badgeSoldOut={badgeSoldOut}
    />
  );
}
