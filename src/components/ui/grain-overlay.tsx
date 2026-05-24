import { cn } from '@/lib/utils';

/**
 * Capa de grano sutil — puerto del GRAIN de mockups/home.jsx.
 * Renderizar como hermano absoluto dentro de un contenedor relativo.
 */
export function GrainOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 mix-blend-overlay opacity-50', className)}
      style={{
        backgroundImage:
          'radial-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.012) 1px, transparent 1px)',
        backgroundSize: '3px 3px, 4px 4px',
        backgroundPosition: '0 0, 1px 2px',
      }}
    />
  );
}
