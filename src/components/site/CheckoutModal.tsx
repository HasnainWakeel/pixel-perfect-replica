import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, MessageCircle, X } from "lucide-react";
import { z } from "zod";
import { useCart, unitPrice } from "@/lib/cart";
import { PRODUCTS, WHATSAPP_NUMBER, formatPrice } from "@/lib/products";

/**
 * Web3Forms access key (public by design). Create one at web3forms.com using
 * the store's inbox email — orders are delivered to that inbox.
 */
const WEB3FORMS_ACCESS_KEY = "017ca60b-937b-4e5a-b76a-617a82bd4d63";
const ORDER_EMAIL = "dragonplayz445@gmail.com";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z.string().trim().regex(/^[+0-9\s-]{10,15}$/, "Enter a valid phone number"),
  address: z.string().trim().min(5, "Please enter your address").max(300),
  city: z.string().trim().min(2, "Please enter your city").max(60),
  notes: z.string().trim().max(500).optional(),
});

type Props = { open: boolean; onClose: () => void };

export function CheckoutModal({ open, onClose }: Props) {
  const { items, subtotal, shipping, total, clear } = useCart();
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);

  if (!open) return null;

  const close = () => {
    setOrderId(null);
    setErrors({});
    setFailed("");
    onClose();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!parsed.success) {
      const errs: Partial<Record<string, string>> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setFailed("");
    const d = parsed.data;
    const id = `DA-${Math.floor(1000 + Math.random() * 9000)}`;
    const lines = items
      .map((i) => {
        const p = PRODUCTS.find((x) => x.id === i.productId);
        return `- ${p?.name} (${i.size}) x ${i.qty} = ${(unitPrice(i.productId, i.size) * i.qty).toLocaleString("en-US")} PKR`;
      })
      .join("\n");
    const message = `Customer: ${d.name}\nPhone: ${d.phone}\nAddress: ${d.address}, ${d.city}\n\nOrder Items:\n${lines}\n\nShipping: ${shipping} PKR\nTotal Amount: ${total.toLocaleString("en-US")} PKR\nPayment: Cash on Delivery${d.notes ? `\n\nNotes: ${d.notes}` : ""}`;

    setSending(true);
    try {
      if (WEB3FORMS_ACCESS_KEY.startsWith("YOUR_")) {
        console.warn("Web3Forms key not set — order not emailed:\n", message);
      } else {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `New Order #${id} - ${d.name} - ${total.toLocaleString("en-US")} PKR`,
            from_name: "Dar-ul-Attar Orders",
            to: ORDER_EMAIL,
            "Order ID": `#${id}`,
            "Customer Name": d.name,
            "Phone": d.phone,
            "Address": d.address,
            "City": d.city,
            "Items Ordered": lines,
            "Subtotal": `${subtotal.toLocaleString("en-US")} PKR`,
            "Shipping": shipping === 0 ? "FREE" : `${shipping} PKR`,
            "Total": `${total.toLocaleString("en-US")} PKR`,
            "Payment": "Cash on Delivery",
            "Notes": d.notes || "-",
            "Full Summary": message,
          }),
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message);
      }
      setOrderId(id);
      clear();
    } catch {
      setFailed("We couldn't send your order. Please try again or order on WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  const waQuery = orderId
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Assalamu Alaikum Dar-ul-Attar, I want to ask about my order #${orderId}.`)}`
    : "";

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm" onClick={close}>
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="shadow-luxe relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-gold/30 bg-card p-6 sm:p-8"
      >
        <button aria-label="Close" onClick={close} className="absolute right-4 top-4 text-muted-foreground hover:text-gold">
          <X className="size-5" />
        </button>

        {orderId ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto size-14 text-gold" />
            <h2 className="mt-5 font-display text-3xl text-cream">JazakAllah Khair!</h2>
            <p className="mt-2 text-lg text-gold">Order #{orderId} Received.</p>
            <p className="mt-4 text-sm text-muted-foreground">
              We'll call you shortly to confirm your Cash on Delivery order.
            </p>
            <button
              onClick={() => window.open(waQuery, "_blank", "noopener,noreferrer")}
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-gold/50 px-6 py-3 text-sm font-medium text-gold hover:bg-accent"
            >
              <MessageCircle className="size-4" /> Query Order on WhatsApp
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <h2 className="font-display text-3xl text-cream">Checkout</h2>
            <Field name="name" label="Full Name" error={errors["name"]} />
            <Field name="phone" label="WhatsApp Phone" type="tel" placeholder="03XX XXXXXXX" error={errors["phone"]} />
            <Field name="address" label="Delivery Address" error={errors["address"]} />
            <Field name="city" label="City" error={errors["city"]} />
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground">Order Notes (optional)</span>
              <textarea name="notes" rows={2} maxLength={500} className="w-full rounded-lg border border-gold/30 bg-background px-4 py-2.5 text-cream outline-none focus:border-gold" />
            </label>

            <div className="rounded-lg border border-gold/30 bg-background p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Payment Method</p>
              <p className="mt-2 flex items-center gap-2 text-cream">
                <span className="size-3 rounded-full bg-gold ring-2 ring-gold/30 ring-offset-2 ring-offset-background" />
                Cash on Delivery (COD)
              </p>
            </div>

            <div className="space-y-1 rounded-lg border border-border p-4 text-sm text-muted-foreground">
              <div className="flex justify-between"><span>Subtotal</span><span className="text-cream">{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span className="text-cream">{shipping === 0 ? "FREE" : formatPrice(shipping)}</span></div>
              <div className="flex justify-between pt-1 font-display text-xl"><span className="text-cream">Total</span><span className="text-gold">{formatPrice(total)}</span></div>
            </div>

            {failed && <p className="text-sm text-destructive">{failed}</p>}

            <button disabled={sending || items.length === 0} className="surface-gold inline-flex w-full items-center justify-center gap-2 rounded-full py-3 font-semibold disabled:opacity-60">
              {sending && <Loader2 className="size-4 animate-spin" />}
              Place Order
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ name, label, error, type = "text", placeholder }: { name: string; label: string; error?: string | undefined; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      <input name={name} type={type} placeholder={placeholder} className="w-full rounded-lg border border-gold/30 bg-background px-4 py-2.5 text-cream outline-none focus:border-gold" />
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
