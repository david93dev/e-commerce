// src/stores/cart-ui.ts
import { create } from "zustand";

type CartUIState = {
  open: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggle: () => void;
};

export const useCartUI = create<CartUIState>((set) => ({
  open: false,
  openCart: () => set({ open: true }),
  closeCart: () => set({ open: false }),
  toggle: () => set((s) => ({ open: !s.open })),
}));