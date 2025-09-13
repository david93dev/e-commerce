import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartUIState = {
  open: boolean;
  setOpen: (v: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

export const useCartUI = create<CartUIState>()(
  persist(
    (set, get) => ({
      open: false,
      setOpen: (v) => set({ open: v }),
      openCart: () => set({ open: true }),
      closeCart: () => set({ open: false }),
      toggleCart: () => set({ open: !get().open }),
    }),
    { name: "cart-ui" }
  )
);
