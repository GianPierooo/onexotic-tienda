'use client';

import { useEffect, type RefObject } from 'react';

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * Focus trap accesible para modales/diálogos:
 *  - al abrir, mueve el foco al primer elemento enfocable (o al contenedor);
 *  - Tab / Shift+Tab quedan ATRAPADOS dentro del contenedor (hace wrap);
 *  - al cerrar, devuelve el foco al elemento que lo tenía (el disparador).
 *
 * El contenedor debe tener `tabIndex={-1}` para el fallback de foco.
 */
export function useFocusTrap(
  active: boolean,
  containerRef: RefObject<HTMLElement>
) {
  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const getItems = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement
      );

    // Foco inicial dentro del modal.
    const first = getItems()[0];
    (first ?? container).focus({ preventScroll: true });

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;
      const items = getItems();
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const firstEl = items[0]!;
      const lastEl = items[items.length - 1]!;
      const activeEl = document.activeElement;
      if (e.shiftKey) {
        if (activeEl === firstEl || !container!.contains(activeEl)) {
          e.preventDefault();
          lastEl.focus({ preventScroll: true });
        }
      } else if (activeEl === lastEl || !container!.contains(activeEl)) {
        e.preventDefault();
        firstEl.focus({ preventScroll: true });
      }
    }

    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      // Devolver el foco al disparador al cerrar.
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [active, containerRef]);
}

export function useEscape(active: boolean, onClose: () => void) {
  useEffect(() => {
    if (!active) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, onClose]);
}

export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
}
