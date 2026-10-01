import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";

const NAV = [
  { label: "Collection", href: "#collection" },
  { label: "About Us", href: "#about" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

/** Sticky glassmorphism header with brand lockup, nav and WhatsApp CTA. */
export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="glass-panel fixed inset-x-0 top-0 z-50 border-b border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8 sm:py-4">
        <a href="#top" className="group flex flex-col leading-none">
          <span className="font-display text-xl tracking-wide text-gold-gradient sm:text-2xl">
            Dar-ul-Attar
          </span>
          <span className="mt-1 text-[0.6rem] uppercase tracking-[0.34em] text-muted-foreground sm:text-[0.65rem]">
            The House of Fragrance
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppLink
            className="surface-gold hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            <MessageCircle className="size-4" />
            WhatsApp Us
          </WhatsAppLink>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border text-gold md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border px-5 pb-5 pt-2 md:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm tracking-wide text-muted-foreground"
            >
              {item.label}
            </a>
          ))}
          <WhatsAppLink className="surface-gold mt-2 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium">
            <MessageCircle className="size-4" />
            WhatsApp Us
          </WhatsAppLink>
        </nav>
      )}
    </header>
  );
}
