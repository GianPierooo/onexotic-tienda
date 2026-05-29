'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { ColorVariante } from '@/lib/product-variants';

type ProductColorValue = {
  /** Variantes de color disponibles (vacío = producto de un solo color). */
  colors: ColorVariante[];
  /** Índice de la variante seleccionada. */
  index: number;
  setIndex: (i: number) => void;
  /** Variante seleccionada, o null si no hay variantes de color. */
  current: ColorVariante | null;
  /** Imágenes a mostrar: las de la variante activa, o el fallback plano. */
  images: string[];
  /** Nombre del color activo, o null. */
  colorName: string | null;
};

const ProductColorContext = createContext<ProductColorValue | null>(null);

type ProviderProps = {
  colors: ColorVariante[];
  /** Galería usada cuando el producto no tiene variantes de color. */
  fallbackImages: string[];
  children: ReactNode;
};

export function ProductColorProvider({ colors, fallbackImages, children }: ProviderProps) {
  const [index, setIndex] = useState(0);

  const value = useMemo<ProductColorValue>(() => {
    const safeIndex = colors.length > 0 ? Math.min(index, colors.length - 1) : 0;
    const current = colors[safeIndex] ?? null;
    return {
      colors,
      index: safeIndex,
      setIndex,
      current,
      images: current ? current.imagenes_url : fallbackImages,
      colorName: current?.color ?? null,
    };
  }, [colors, fallbackImages, index]);

  return (
    <ProductColorContext.Provider value={value}>
      {children}
    </ProductColorContext.Provider>
  );
}

/**
 * Lee el contexto de color. Devuelve un valor neutro si se usa fuera del
 * provider (productos sin variantes de color), para no romper.
 */
export function useProductColor(): ProductColorValue {
  const ctx = useContext(ProductColorContext);
  if (ctx) return ctx;
  return {
    colors: [],
    index: 0,
    setIndex: () => {},
    current: null,
    images: [],
    colorName: null,
  };
}
