import { useCart } from "@/stores/cart-store";
import { useCartUI } from "@/stores/cart-ui";
import { Button } from "@/components/ui/button";

export default function AddToCartButton({ product, size = null, qty = 1, openOnAdd = true }) {
  const add = useCart((s) => s.add);
  const openCart = useCartUI((s) => s.openCart);

  return (
    <Button
      onClick={() => {
        add({
          id: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
          size,
          qty,
        });
        if (openOnAdd) openCart();
      }}
    >
      Adicionar ao carrinho
    </Button>
  );
}
