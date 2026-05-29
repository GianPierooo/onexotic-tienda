import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Grilla estándar de productos para TODA la tienda. Fuente única de verdad
 * del tamaño de tarjeta: conteos fijos por breakpoint (2 móvil · 3 tablet ·
 * 4 desktop) + ancho máximo del contenedor. Conteos fijos (no auto-fit) para
 * que las tarjetas NUNCA se estiren a lo ancho cuando hay pocos productos.
 * El tope de ancho por tarjeta vive en <ProductCard> como segunda defensa.
 *
 * El padding horizontal/vertical lo pone cada página vía `className`, para
 * alinear la grilla con el resto de la sección.
 */
export function ProductGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mx-auto grid w-full max-w-screen-xl grid-cols-2 gap-3.5 md:grid-cols-3 lg:grid-cols-4',
        className
      )}
    >
      {children}
    </div>
  );
}
