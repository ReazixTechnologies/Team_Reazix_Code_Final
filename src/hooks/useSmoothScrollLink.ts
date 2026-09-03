import type { MouseEvent } from "react";
import { useLenis } from "@/components/providers/SmoothScroll";

/**
 * Click handler for same-page hash links: smooth-scrolls via Lenis, falling back to
 * a plain `scrollIntoView` when Lenis is disabled (reduced motion).
 */
export function useSmoothScrollLink() {
  const lenis = useLenis();

  return function handleSmoothScrollClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    const target = document.querySelector(href);
    if (!(target instanceof HTMLElement)) return;

    event.preventDefault();
    if (lenis.current) {
      lenis.current.scrollTo(target);
    } else {
      target.scrollIntoView({ block: "start" });
    }
  };
}
