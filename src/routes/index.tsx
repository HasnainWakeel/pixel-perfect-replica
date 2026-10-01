import { createFileRoute } from "@tanstack/react-router";
import { Droplets, Wind, Truck, Gift, MessageCircle, Sparkles } from "lucide-react";
import { Header } from "@/components/site/Header";
import { ProductCard } from "@/components/site/ProductCard";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";
import { PRODUCTS } from "@/lib/products";
import heroImage from "@/assets/hero-attar.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dar-ul-Attar — The House of Fragrance" },
      {
        name: "description",
        content:
          "Handcrafted, pure and alcohol-free luxury attars. Browse the Dar-ul-Attar collection and order instantly on WhatsApp.",
      },
      { property: "og:title", content: "Dar-ul-Attar — The House of Fragrance" },
      {
        property: "og:description",
        content:
          "Elegance in every drop. Pure, alcohol-free luxury attars with exceptional projection and longevity.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const FEATURES = [
  {
    icon: Droplets,
    title: "100% Pure Concentrated Oil",
    text: "Alcohol-free attars pressed from authentic oils — gentle on skin, faithful to tradition.",
  },
  {
    icon: Wind,
    title: "Exceptional Projection",
    text: "Blended for depth and longevity, our attars stay with you from dawn to late night.",
  },
  {
    icon: Truck,
    title: "Free Nationwide Delivery",
    text: "Complimentary delivery across Pakistan on every order above 3,000 PKR.",
  },
  {
    icon: Gift,
    title: "Premium Signature Packaging",
    text: "Each vial arrives in our gold-embossed presentation case, ready to gift.",
  },
];

function Index() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
        <img
          src={heroImage}
          alt="Collection of luxury attar bottles on dark marble"
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover opacity-45"
        />
        <div className="pattern-grid absolute inset-0 opacity-70" />
        <div className="glow-gold absolute -right-32 top-0 size-[38rem]" />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.28em] text-gold">
            <Sparkles className="size-3.5" />
            Pure, Alcohol-Free Luxury Attars
          </span>

          <h1 className="mt-7 max-w-3xl font-display text-4xl leading-[1.08] sm:text-6xl lg:text-7xl">
            Dar-ul-Attar
            <span className="block text-gold-gradient">The House of Fragrance</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Elegance in Every Drop. Discover handcrafted, pure, and alcohol-free luxury
            attars engineered for long-lasting presence.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#collection"
              className="surface-gold inline-flex items-center rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-transform hover:-translate-y-0.5"
            >
              Explore Collection
            </a>
            <WhatsAppLink className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-7 py-3.5 text-sm font-medium tracking-wide text-gold transition-colors hover:bg-accent">
              <MessageCircle className="size-4" />
              Order via WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section id="collection" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">
            The Collection
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl">Signature Attars</h2>
          <p className="mt-4 text-muted-foreground">
            Choose your bottle size and order directly on WhatsApp — your message arrives
            pre-filled and ready to send.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative overflow-hidden border-y border-border">
        <div className="glow-gold absolute -left-40 top-1/2 size-[34rem] -translate-y-1/2" />
        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-24">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">About Us</p>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl">
            A tradition kept in every vial
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Dar-ul-Attar is a small house devoted to the old craft of attar. We source aged
            oud, Taif rose, saffron and pure musk, then blend in small batches without a
            drop of alcohol. No sprays, no fillers — only concentrated oil, decanted into
            hand-finished bottles and sent straight to your door.
          </p>
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">Why Us</p>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl">Crafted to be worn</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-gold/45"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-full border border-gold/40 text-gold">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-xl text-cream">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer id="contact" className="border-t border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl text-gold-gradient">Dar-ul-Attar</p>
            <p className="mt-2 text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
              The House of Fragrance
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Pure, alcohol-free luxury attars, blended in small batches and delivered
              nationwide.
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg text-cream">Visit the Showroom</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Open daily, 11:00 AM – 10:00 PM
              <br />
              Orders and enquiries on WhatsApp
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg text-cream">Order Now</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Message us and we&apos;ll guide you to your scent.
            </p>
            <WhatsAppLink className="surface-gold mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
              <MessageCircle className="size-4" />
              WhatsApp Us
            </WhatsAppLink>
          </div>
        </div>

        <div className="border-t border-border px-5 py-6 text-center text-xs text-muted-foreground sm:px-8">
          © {new Date().getFullYear()} Dar-ul-Attar. All rights reserved.
        </div>
      </footer>

      <FloatingWhatsApp />
    </div>
  );
}
