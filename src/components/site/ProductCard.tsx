import { useState } from "react";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";
import { useCart, unitPrice } from "@/lib/cart";
import {
  SIZES,
  formatPrice,
  type Product,
  type Size,
} from "@/lib/products";

/** Catalog card: image zoom on hover, notes, size-based price, add to cart. */
export function ProductCard({ product }: { product: Product }) {
  const [size, setSize] = useState<Size>("6ml");
  const { add, setOpen } = useCart();

  return (
    <article className="shadow-luxe group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-gold/45">
      <div className="relative aspect-4/5 overflow-hidden">
        <img
          src={product.image}
          alt={`${product.name} attar bottle`}
          loading="lazy"
          width={912}
          height={1104}
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div>
          <h3 className="font-display text-2xl text-cream">{product.name}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.notes.map((note) => (
              <span
                key={note}
                className="rounded-full border border-border bg-secondary px-3 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        <p className="font-display text-xl text-gold">{formatPrice(unitPrice(product.id, size))}</p>

        <div>
          <p className="mb-2 text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
            Select size
          </p>
          <div className="flex gap-2">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                aria-pressed={size === s}
                className={
                  size === s
                    ? "surface-gold rounded-full px-4 py-1.5 text-sm font-medium"
                    : "rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-gold/60 hover:text-gold"
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <button
            type="button"
            onClick={() => {
              add(product.id, size);
              setOpen(true);
            }}
            className="surface-gold inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-wide transition-transform hover:-translate-y-0.5"
          >
            <ShoppingBag className="size-4" />
            Add to Cart · {formatPrice(unitPrice(product.id, size))}
          </button>
          <WhatsAppLink
            productName={product.name}
            size={size}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-sm text-gold transition-colors hover:bg-accent"
          >
            <MessageCircle className="size-4" />
            Order on WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    </article>
  );
}
