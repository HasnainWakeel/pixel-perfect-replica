import amberOud from "@/assets/attar-amber-oud.jpg";
import sultanRose from "@/assets/attar-sultan-rose.jpg";
import dehnAlOud from "@/assets/attar-dehn-al-oud.jpg";
import whiteMusk from "@/assets/attar-white-musk.jpg";
import mizyanBlend from "@/assets/attar-mizyan-blend.jpg";

/** WhatsApp business number used for every order link. */
export const WHATSAPP_NUMBER = "923001234567";

/** Available bottle sizes offered on every attar. */
export const SIZES = ["3ml", "6ml", "12ml"] as const;
export type Size = (typeof SIZES)[number];

export type Product = {
  id: string;
  name: string;
  notes: string[];
  price: number; // PKR
  image: string;
};

/** Static catalog data for the digital showroom. */
export const PRODUCTS: Product[] = [
  {
    id: "royal-amber-oud",
    name: "Royal Amber Oud",
    notes: ["Amber", "Woody", "Musk"],
    price: 2500,
    image: amberOud,
  },
  {
    id: "sultan-rose",
    name: "Sultan Rose",
    notes: ["Taif Rose", "Spicy", "Sweet"],
    price: 1800,
    image: sultanRose,
  },
  {
    id: "dehn-al-oud",
    name: "Dehn Al Oud",
    notes: ["Aged Cambodian Oud", "Earthy"],
    price: 4500,
    image: dehnAlOud,
  },
  {
    id: "white-musk-supreme",
    name: "White Musk Supreme",
    notes: ["Powdery", "Clean", "Floral"],
    price: 1500,
    image: whiteMusk,
  },
  {
    id: "mizyan-blend",
    name: "Mizyan Blend",
    notes: ["Saffron", "Patchouli", "Citrus"],
    price: 2200,
    image: mizyanBlend,
  },
];

/** Builds a pre-filled WhatsApp order link for a product + size. */
export function orderLink(productName?: string, size?: Size) {
  const text = productName
    ? `Assalamu Alaikum Dar-ul-Attar, I want to order ${productName} (${size}).`
    : "Assalamu Alaikum Dar-ul-Attar, I would like to know more about your attars.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Formats a PKR price with thousands separators. */
export function formatPrice(price: number) {
  return `${price.toLocaleString("en-US")} PKR`;
}
