import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CartSheet({ open, onOpenChange }) {
  // mock de produtos do carrinho
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Camiseta Básica",
      price: 59.9,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200",
      qty: 1,
    },
    {
      id: 2,
      title: "Tênis Esportivo",
      price: 249.9,
      image:
        "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9d3?w=200",
      qty: 2,
    },
  ]);

  const subtotal = items.reduce((acc, i) => acc + i.price * i.qty, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border rounded-md p-2"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-contain"
              />
              <div className="flex-1">
                <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                <p className="text-xs text-gray-500">Qtd: {item.qty}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setItems((prev) =>
                      prev.map((it, i) =>
                        i === index
                          ? { ...it, qty: Math.max(1, it.qty - 1) }
                          : it
                      )
                    )
                  }
                >
                  -
                </button>
                <button
                  onClick={() =>
                    setItems((prev) =>
                      prev.map((it, i) =>
                        i === index ? { ...it, qty: it.qty + 1 } : it
                      )
                    )
                  }
                >
                  +
                </button>
              </div>
              <span className="text-sm font-semibold">
                R$ {(item.price * item.qty).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <SheetFooter className="mt-6">
          <div className="w-full space-y-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-bold">R$ {subtotal.toFixed(2)}</span>
            </div>
            <Button className="w-full">Finalizar Compra</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
