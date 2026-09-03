import { AnimatePresence, motion } from "motion/react";
import type { CSSProperties } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface AnimatedPriceProps {
  value: string;
  /** Applied to the actual text node in both branches (e.g. gradient text-fill classes need to land here, not on a wrapper). */
  className?: string;
  style?: CSSProperties;
}

/** Swaps the displayed price with a fade/slide when the formatted string changes (e.g. on currency toggle). */
export function AnimatedPrice({ value, className, style }: AnimatedPriceProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <span className={cn("tabular-nums", className)} style={style}>
        {value}
      </span>
    );
  }

  return (
    <span className="relative inline-grid overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.35, ease: EASE }}
          className={cn("col-start-1 row-start-1 tabular-nums", className)}
          style={style}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
