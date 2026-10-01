import { MessageCircle } from "lucide-react";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";

/** Fixed bottom-right WhatsApp button with a pulsing halo. */
export function FloatingWhatsApp() {
  return (
    <WhatsAppLink
      ariaLabel="Chat with Dar-ul-Attar on WhatsApp"
      className="pulse-ring fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-luxe transition-transform hover:scale-105"
    >
      <MessageCircle className="size-6" />
    </WhatsAppLink>
  );
}
