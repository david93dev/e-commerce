// src/components/CartButton.tsx
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/stores/cart-store";
import { useCartUI } from "@/stores/cart-ui";

export default function CartButton() {
  const { count } = useCart();
  const { openCart } = useCartUI();

  return (
    <Button variant="outline" onClick={openCart} className="relative">
      <ShoppingCart className="mr-2 h-4 w-4" />
      Carrinho
      <span className="ml-2 rounded-full bg-black text-white text-xs px-2 py-0.5">
        {count()}
      </span>
    </Button>
  );
}
