import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";
import {
  SIZES,
  formatPrice,
  type Product,
  type Size,
} from "@/lib/products";

/** Catalog card: image zoom on hover, notes, price, size pills, WhatsApp order. */
export function ProductCard({ product }: { product: Product }) {
  const [size, setSize] = useState<Size>("6ml");

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

        <p className="font-display text-xl text-gold">{formatPrice(product.price)}</p>

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

        <a
          href={orderLink(product.name, size)}
          target="_blank"
          rel="noreferrer"
          className="surface-gold mt-auto inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-wide transition-transform hover:-translate-y-0.5"
        >
          <MessageCircle className="size-4" />
          Order on WhatsApp
        </a>
      </div>
    </article>
  );
}
