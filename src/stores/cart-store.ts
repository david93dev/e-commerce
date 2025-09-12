// src/stores/cart-store.ts
import { create } from "zustand";

export type CartItem = {
  id: number;
  title: string;
  image: string;
  price: number;
  size?: string | null;
  qty: number;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  inc: (id: number, size?: string | null) => void;
  dec: (id: number, size?: string | null) => void;
  remove: (id: number, size?: string | null) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],
  add: (item) =>
    set((state) => {
      const key = (i: CartItem) => `${i.id}-${i.size ?? ""}`;
      const existing = state.items.find(
        (i) => key(i) === `${item.id}-${item.size ?? ""}`
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            key(i) === key(existing) ? { ...i, qty: i.qty + (item.qty ?? 1) } : i
          ),
        };
      }
      return { items: [...state.items, { ...item, qty: item.qty ?? 1 }] };
    }),
  inc: (id, size) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id && i.size === size ? { ...i, qty: i.qty + 1 } : i
      ),
    })),
  dec: (id, size) =>
    set((state) => ({
      items: state.items
        .map((i) =>
          i.id === id && i.size === size ? { ...i, qty: Math.max(1, i.qty - 1) } : i
        )
        .filter(Boolean) as CartItem[],
    })),
  remove: (id, size) =>
    set((state) => ({
      items: state.items.filter((i) => !(i.id === id && i.size === size)),
    })),
  clear: () => set({ items: [] }),
  count: () => get().items.reduce((acc, i) => acc + i.qty, 0),
  subtotal: () => get().items.reduce((acc, i) => acc + i.qty * i.price, 0),
}));
