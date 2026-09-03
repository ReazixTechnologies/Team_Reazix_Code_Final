import { cn } from "@/lib/utils";
import type { ClientLogo } from "@/types";

interface LogoMarkProps extends ClientLogo {
  className?: string;
}

/** Renders a client's inline SVG if given, otherwise a text wordmark fallback. */
export function LogoMark({ name, svg, className }: LogoMarkProps) {
  if (svg) {
    return (
      <span
        role="img"
        aria-label={name}
        className={cn("inline-block h-8 w-auto [&_svg]:h-full [&_svg]:w-auto", className)}
        // svg is trusted, hand-authored content only (see src/content/clients.ts)
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }

  return (
    <span className={cn("font-display text-lg font-medium uppercase tracking-[0.02em]", className)}>
      {name}
    </span>
  );
}
