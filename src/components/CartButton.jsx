import { ShoppingCart } from "lucide-react";
import { useCart } from "@/stores/cart-store";
import { useCartUI } from "@/stores/cart-ui";

export default function CartButton({ className = "" }) {
  const count = useCart((s) => s.count());
  const openCart = useCartUI((s) => s.openCart);

  return (
    <button
      type="button"
      onClick={openCart}
      className={`relative inline-flex items-center justify-center rounded-md p-2 hover:opacity-80 ${className}`}
      aria-label="Abrir carrinho"
    >
      <ShoppingCart className="size-5" />
      {count > 0 && (
        <span
          aria-hidden
          className="absolute -right-1 -top-1 min-w-5 h-5 px-1 rounded-full text-xs font-medium bg-black text-white dark:bg-white dark:text-black flex items-center justify-center"
        >
          {count}
        </span>
      )}
    </button>
  );
}
