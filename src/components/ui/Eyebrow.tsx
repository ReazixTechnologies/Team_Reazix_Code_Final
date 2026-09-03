import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

/** Uppercase micro-label with wide tracking and a leading accent dot. */
export function Eyebrow({ className, children, ...props }: EyebrowProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-2 text-label font-mono uppercase text-text-muted", className)}
      {...props}
    >
      <span className="h-1 w-1 rounded-full bg-ember" aria-hidden="true" />
      {children}
    </span>
  );
}
