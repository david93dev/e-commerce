import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/stores/cart-store";
import { useCartUI } from "@/stores/cart-ui";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function CartSheet() {
  const navigate = useNavigate(); 
  const open = useCartUI((s) => s.open);
  const setOpen = useCartUI((s) => s.setOpen);

  const items = useCart((s) => s.items);
  const inc = useCart((s) => s.inc);
  const dec = useCart((s) => s.dec);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const subtotal = useCart((s) => s.subtotal());

  function goToCheckout() {                      
    setOpen(false);                            
    navigate("/checkout");                     
  }


  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md px-2">
        <div className="flex items-center justify-between">
          <SheetHeader className="mb-2">
            <SheetTitle>Seu carrinho</SheetTitle>
            <SheetDescription>Revise os itens antes de finalizar a compra.</SheetDescription>
          </SheetHeader>
        </div>

        <div className="mt-2 space-y-4 overflow-y-auto max-h-[60vh] px-5 border rounded-2xl py-2">
          {items.length === 0 ? (
            <p className="text-sm opacity-70">Seu carrinho está vazio.</p>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.size ?? ""}`} className="flex py-2 gap-3 ">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-16 w-16 rounded-md object-container border"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      
                      <p className="text-sm font-semibold mt-1">R$ {(item.price * item.qty).toFixed(2)}</p>
                    </div>
                    <button
                      aria-label="Remover item"
                      className="rounded-md p-1 hover:bg-black/5 dark:hover:bg-white/5"
                      onClick={() => remove(item.id, item.size)}
                    >
                      <Trash2 className="size-4" />
                    </button>
                   
                  </div>

                  <div className="mt-2 inline-flex items-center rounded-md border">
                    <button
                      className="px-2 py-1 hover:bg-black/5 dark:hover:bg-white/5"
                      onClick={() => dec(item.id, item.size)}
                      aria-label="Diminuir quantidade"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="px-3 text-sm tabular-nums">{item.qty}</span>
                    <button
                      className="px-2 py-1 hover:bg-black/5 dark:hover:bg-white/5"
                      onClick={() => inc(item.id, item.size)}
                      aria-label="Aumentar quantidade"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <SheetFooter className="mt-6">
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-bold">R$ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="w-1/3" onClick={clear} disabled={items.length === 0}>
                Limpar
              </Button>
              <Button onClick={goToCheckout} className="w-2/3" disabled={items.length === 0}>
                Finalizar compra
              </Button>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
