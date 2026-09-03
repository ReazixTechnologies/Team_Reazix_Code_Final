import { motion } from "motion/react";
import { useState } from "react";
import { EASE } from "@/lib/motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import type { ServiceAccent } from "@/types";

const ACCENT_BG_CLASS: Record<ServiceAccent, string> = {
  ember: "bg-ember",
  amber: "bg-amber",
  blush: "bg-blush",
  violet: "bg-violet",
  mint: "bg-mint",
};

const ACCENT_VAR: Record<ServiceAccent, string> = {
  ember: "var(--color-ember)",
  amber: "var(--color-amber)",
  blush: "var(--color-blush)",
  violet: "var(--color-violet)",
  mint: "var(--color-mint)",
};

interface CapabilityListProps {
  capabilities: string[];
  accent: ServiceAccent;
}

/** Hover-selectable capability rows: one lights up, the rest dim. */
export function CapabilityList({ capabilities, accent }: CapabilityListProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isCoarsePointer = useMediaQuery("(pointer: coarse)");

  return (
    <ul className="flex flex-col">
      {capabilities.map((capability, index) => {
        const isActive = !isCoarsePointer && activeIndex === index;
        const isDimmed = !isCoarsePointer && activeIndex !== null && activeIndex !== index;

        return (
          <li key={capability} className="relative border-b border-line">
            <div
              tabIndex={0}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
              className={cn(
                "relative flex cursor-default items-center justify-between gap-4 py-3 outline-none transition-[color,transform] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember",
                isCoarsePointer ? "text-text-muted" : isActive ? "text-text" : isDimmed ? "text-text-faint" : "text-text-muted",
              )}
            >
              <span
                className="text-body transition-transform duration-300"
                style={{ transform: isActive ? "translateX(10px)" : undefined }}
              >
                {capability}
              </span>

              <span
                aria-hidden="true"
                className={cn(
                  "h-1.5 w-1.5 shrink-0 rounded-full transition-opacity duration-300",
                  ACCENT_BG_CLASS[accent],
                  isCoarsePointer || isActive ? "opacity-100" : "opacity-0",
                )}
              />
            </div>

            {isActive ? (
              <motion.span
                layoutId={`capability-indicator-${accent}`}
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px origin-left"
                style={{ backgroundColor: ACCENT_VAR[accent] }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.45, ease: EASE }}
              />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
