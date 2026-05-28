'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type CartItem = {
  productoId: string;
  nombre: string;
  sku: string | null;
  talla: string;
  color: string | null;
  precio: number;
  cantidad: number;
  imagen: string | null;
  stock: number;
};

type CartState = {
  items: CartItem[];
  hydrated: boolean;
};

type CartContextValue = CartState & {
  add: (item: Omit<CartItem, 'cantidad'>, cantidad?: number) => void;
  remove: (productoId: string) => void;
  setQty: (productoId: string, cantidad: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  lastAdded: CartItem | null;
  dismissLastAdded: () => void;
};

const STORAGE_KEY = 'onexotic.cart.v1';

const CartContext = createContext<CartContextValue | null>(null);

function safeLoad(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCartItem);
  } catch {
    return [];
  }
}

function isCartItem(x: unknown): x is CartItem {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.productoId === 'string' &&
    typeof o.nombre === 'string' &&
    typeof o.talla === 'string' &&
    typeof o.precio === 'number' &&
    typeof o.cantidad === 'number'
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [lastAdded, setLastAdded] = useState<CartItem | null>(null);

  useEffect(() => {
    setItems(safeLoad());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage lleno o bloqueado, ignorar */
    }
  }, [items, hydrated]);

  const add = useCallback<CartContextValue['add']>((item, cantidad = 1) => {
    let added: CartItem | null = null;
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.productoId === item.productoId);
      if (idx === -1) {
        const next = { ...item, cantidad: clamp(cantidad, 1, item.stock || 99) };
        added = next;
        return [...prev, next];
      }
      const next = [...prev];
      const cur = next[idx]!;
      const max = Math.max(item.stock || cur.stock || 99, 1);
      next[idx] = { ...cur, cantidad: clamp(cur.cantidad + cantidad, 1, max) };
      added = next[idx];
      return next;
    });
    if (added) setLastAdded(added);
  }, []);

  const dismissLastAdded = useCallback(() => setLastAdded(null), []);

  const remove = useCallback((productoId: string) => {
    setItems((prev) => prev.filter((p) => p.productoId !== productoId));
  }, []);

  const setQty = useCallback((productoId: string, cantidad: number) => {
    setItems((prev) =>
      prev.flatMap((p) => {
        if (p.productoId !== productoId) return [p];
        if (cantidad <= 0) return [];
        return [{ ...p, cantidad: clamp(cantidad, 1, p.stock || 99) }];
      })
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(
    () => items.reduce((s, i) => s + i.cantidad, 0),
    [items]
  );
  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.precio * i.cantidad, 0),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      hydrated,
      add,
      remove,
      setQty,
      clear,
      count,
      subtotal,
      lastAdded,
      dismissLastAdded,
    }),
    [items, hydrated, add, remove, setQty, clear, count, subtotal, lastAdded, dismissLastAdded]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
