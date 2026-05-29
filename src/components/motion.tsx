'use client';

import { LazyMotion, m, AnimatePresence, type PanInfo } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Punto ÚNICO de framer-motion.
 *
 * Toda la app usa `m.*` (no `motion.*`) y las features de animación DOM se
 * cargan de forma DIFERIDA en un chunk aparte (import dinámico), no en el
 * First Load JS. `<MotionProvider>` envuelve la app una sola vez en el layout.
 *
 * `strict` impide usar `motion.*` por accidente (obliga a usar `m.*`), para no
 * reintroducir el bundle pesado.
 */
// domMax incluye gestos (drag) + animaciones; se carga en chunk aparte.
const loadFeatures = () =>
  import('framer-motion').then((mod) => mod.domMax);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}

export { m, AnimatePresence };
export type { PanInfo };
