import { useState } from "react";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart, unitPrice, FREE_SHIPPING_ABOVE } from "@/lib/cart";
import { PRODUCTS, formatPrice } from "@/lib/products";
import { CheckoutModal } from "@/components/site/CheckoutModal";

/** Slide-in cart drawer with quantity controls and totals. */
export function CartDrawer() {
  const { items, open, setOpen, setQty, subtotal, shipping, total } = useCart();
  const [checkout, setCheckout] = useState(false);

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-background/70 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
      />
      <aside
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col border-l border-gold/30 bg-card transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="font-display text-2xl text-cream">Your Cart</h2>
          <button aria-label="Close cart" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-gold">
            <X className="size-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center text-muted-foreground">
            <ShoppingBag className="size-10 text-gold/60" />
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <ul className="flex-1 space-y-4 overflow-y-auto p-6">
            {items.map((i) => {
              const p = PRODUCTS.find((x) => x.id === i.productId);
              if (!p) return null;
              const price = unitPrice(i.productId, i.size);
              return (
                <li key={i.productId + i.size} className="flex gap-4 rounded-lg border border-border p-3">
                  <img src={p.image} alt={p.name} className="size-20 rounded-md object-cover" />
                  <div className="flex flex-1 flex-col">
                    <p className="font-display text-lg text-cream">{p.name}</p>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{i.size}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button aria-label="Decrease" onClick={() => setQty(i.productId, i.size, i.qty - 1)} className="inline-flex size-7 items-center justify-center rounded-full border border-border hover:border-gold hover:text-gold">
                          <Minus className="size-3" />
                        </button>
                        <span className="w-6 text-center text-sm">{i.qty}</span>
                        <button aria-label="Increase" onClick={() => setQty(i.productId, i.size, i.qty + 1)} className="inline-flex size-7 items-center justify-center rounded-full border border-border hover:border-gold hover:text-gold">
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <span className="text-sm text-gold">{formatPrice(price * i.qty)}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {items.length > 0 && (
          <div className="space-y-2 border-t border-border p-6 text-sm">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            <Row label="Shipping" value={shipping === 0 ? "FREE" : formatPrice(shipping)} />
            {shipping > 0 && (
              <p className="text-xs text-muted-foreground">
                Free delivery on orders above {formatPrice(FREE_SHIPPING_ABOVE)}.
              </p>
            )}
            <div className="flex justify-between pt-2 font-display text-xl">
              <span className="text-cream">Total</span>
              <span className="text-gold">{formatPrice(total)}</span>
            </div>
            <button
              onClick={() => {
                setOpen(false);
                setCheckout(true);
              }}
              className="surface-gold mt-3 w-full rounded-full py-3 font-semibold tracking-wide"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>

      <CheckoutModal open={checkout} onClose={() => setCheckout(false)} />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <span>{label}</span>
      <span className="text-cream">{value}</span>
    </div>
  );
}
