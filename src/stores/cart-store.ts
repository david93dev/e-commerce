// src/stores/cart-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

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

const key = (i: { id: number; size?: string | null }) => `${i.id}-${i.size ?? ""}`;

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) =>
        set((state) => {
          const existing = state.items.find((i) => key(i) === key(item));
          if (existing) {
            return {
              items: state.items.map((i) =>
                key(i) === key(item) ? { ...i, qty: i.qty + (item.qty ?? 1) } : i
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
            ),
        })),
      remove: (id, size) =>
        set((state) => ({
          items: state.items.filter((i) => !(i.id === id && i.size === size)),
        })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((acc, i) => acc + i.qty, 0),
      subtotal: () => get().items.reduce((acc, i) => acc + i.qty * i.price, 0),
    }),
    { name: "cart-storage" }
  )
);
