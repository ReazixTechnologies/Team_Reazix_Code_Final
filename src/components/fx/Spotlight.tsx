import { cn } from "@/lib/utils";

interface SpotlightProps {
  color?: string;
  size?: number;
  blur?: number;
  className?: string;
}

/** Reusable radial glow blob for section backgrounds. */
export function Spotlight({
  color = "var(--color-ember)",
  size = 500,
  blur = 120,
  className,
}: SpotlightProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute rounded-full", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
      }}
    />
  );
}
