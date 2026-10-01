import type { MouseEvent, ReactNode } from "react";
import { orderLink, type Size } from "@/lib/products";

type WhatsAppLinkProps = {
  children: ReactNode;
  className?: string;
  productName?: string;
  size?: Size;
  ariaLabel?: string;
};

/**
 * Anchor that opens WhatsApp in a real new tab.
 * The click is handled in JS (window.open) because embedded preview frames
 * can trap plain target="_blank" navigation, making WhatsApp's site refuse
 * to load with ERR_BLOCKED_BY_RESPONSE.
 */
export function WhatsAppLink({
  children,
  className,
  productName,
  size,
  ariaLabel,
}: WhatsAppLinkProps) {
  const url = orderLink(productName, size);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <a href={url} onClick={handleClick} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
