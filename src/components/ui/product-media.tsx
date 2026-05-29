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
 * Galería del producto conectada al contexto de color: cuando el cliente
 * cambia de color, las imágenes cambian al set de esa variante. Para
 * productos de un solo color usa el fallback plano del contexto.
 */
export function ProductMedia({ nombre, sku, agotado, badgeLive, badgeSoldOut }: Props) {
  const { images, colorName } = useProductColor();
  return (
    <ProductGallery
      // `key` fuerza el remount al cambiar de color: la galería vuelve a la
      // primera foto (frente) del nuevo color.
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
