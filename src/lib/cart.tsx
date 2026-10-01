import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, type Size } from "@/lib/products";

export type CartItem = { productId: string; size: Size; qty: number };

/** Size price multipliers relative to the listed (6ml) price. */
const SIZE_FACTOR: Record<Size, number> = { "3ml": 0.6, "6ml": 1, "12ml": 1.8 };
export const SHIPPING_FEE = 250;
export const FREE_SHIPPING_ABOVE = 3000;
const STORAGE_KEY = "dar-ul-attar-cart";

export function unitPrice(productId: string, size: Size) {
  const p = PRODUCTS.find((x) => x.id === productId);
  return p ? Math.round((p.price * SIZE_FACTOR[size]) / 10) * 10 : 0;
}

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (productId: string, size: Size) => void;
  setQty: (productId: string, size: Size, qty: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, loaded]);

  const value = useMemo<CartCtx>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + unitPrice(i.productId, i.size) * i.qty, 0);
    const shipping = subtotal === 0 || subtotal > FREE_SHIPPING_ABOVE ? 0 : SHIPPING_FEE;
    return {
      items,
      count,
      subtotal,
      shipping,
      total: subtotal + shipping,
      open,
      setOpen,
      add: (productId, size) =>
        setItems((prev) => {
          const hit = prev.find((i) => i.productId === productId && i.size === size);
          if (hit) return prev.map((i) => (i === hit ? { ...i, qty: i.qty + 1 } : i));
          return [...prev, { productId, size, qty: 1 }];
        }),
      setQty: (productId, size, qty) =>
        setItems((prev) =>
          qty <= 0
            ? prev.filter((i) => !(i.productId === productId && i.size === size))
            : prev.map((i) => (i.productId === productId && i.size === size ? { ...i, qty } : i)),
        ),
      clear: () => setItems([]),
    };
  }, [items, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
