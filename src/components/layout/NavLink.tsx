import { useLocation } from "react-router-dom";
import type { MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { useLenis } from "@/components/providers/SmoothScroll";

interface NavLinkProps {
  label: string;
  href: string;
  active?: boolean;
  className?: string;
  onNavigate?: () => void;
}

/**
 * A label with a dual-text hover: the original slides up and a duplicate
 * slides in from below. Hash links (`#section`) smooth-scroll via Lenis when
 * already on the homepage, otherwise fall back to a normal `/#section` link.
 */
export function NavLink({ label, href, active = false, className, onNavigate }: NavLinkProps) {
  const lenisRef = useLenis();
  const { pathname } = useLocation();

  const isHashLink = href.startsWith("#");
  const isExternal = href.startsWith("http");
  const resolvedHref = isHashLink && pathname !== "/" ? `/${href}` : href;

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (isHashLink && pathname === "/") {
      const target = document.querySelector(href);
      if (target instanceof HTMLElement) {
        event.preventDefault();
        lenisRef.current?.scrollTo(target);
      }
    }
    onNavigate?.();
  }

  return (
    <a
      href={resolvedHref}
      onClick={handleClick}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      data-cursor="hover"
      className={cn(
        "group relative inline-flex items-center gap-2 font-mono text-label uppercase text-text-muted",
        className,
      )}
    >
      {active ? <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-ember" aria-hidden="true" /> : null}
      <span className="relative block overflow-hidden py-1 leading-[1.4]">
        <span className="block transition-transform duration-[400ms] ease-out-expo motion-reduce:transition-none group-hover:-translate-y-full">
          {label}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-full text-text transition-transform duration-[400ms] ease-out-expo motion-reduce:transition-none group-hover:translate-y-0"
        >
          {label}
        </span>
      </span>
    </a>
  );
}
