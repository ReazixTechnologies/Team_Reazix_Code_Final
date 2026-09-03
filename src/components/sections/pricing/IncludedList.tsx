import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { PRICING_INCLUDES_LESS_LABEL, PRICING_INCLUDES_MORE_LABEL } from "@/content/pricing";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE, STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ServiceAccent } from "@/types";

const ACCENT_TEXT_CLASS: Record<ServiceAccent, string> = {
  ember: "text-ember",
  amber: "text-amber",
  blush: "text-blush",
  violet: "text-violet",
  mint: "text-mint",
};

const VISIBLE_LIMIT = 7;

interface TickIconProps {
  isInView: boolean;
  reducedMotion: boolean;
  delay: number;
  filled?: boolean;
}

/** A tick that draws itself (pathLength) once the list scrolls into view. */
function TickIcon({ isInView, reducedMotion, delay, filled = false }: TickIconProps) {
  const drawn = reducedMotion || isInView;

  const path = (
    <motion.path
      d="M2.5 7.5L5.5 10.5L11.5 3.5"
      stroke="currentColor"
      strokeWidth={filled ? 2 : 1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={reducedMotion ? false : { pathLength: 0 }}
      animate={{ pathLength: drawn ? 1 : 0 }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.35, delay, ease: EASE }}
    />
  );

  if (filled) {
    return (
      <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-current" aria-hidden="true">
        <svg width="10" height="10" viewBox="0 0 14 14" fill="none" className="text-void">
          {path}
        </svg>
      </span>
    );
  }

  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0">
      {path}
    </svg>
  );
}

interface IncludedListProps {
  items: string[];
  accent: ServiceAccent;
  /** The SCALE tier's first row ("Everything in Launch") is the value bridge, not a peer inclusion. */
  emphasizeFirst?: boolean;
}

/** Hover-selectable inclusions with a self-drawing tick, same grammar as CapabilityList. */
export function IncludedList({ items, accent, emphasizeFirst = false }: IncludedListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });
  const isCoarsePointer = useMediaQuery("(pointer: coarse)");
  const reducedMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const hasMore = items.length > VISIBLE_LIMIT;
  const visibleItems = expanded ? items : items.slice(0, VISIBLE_LIMIT);

  return (
    <div ref={containerRef} className="flex flex-col">
      <motion.ul layout className="flex flex-col">
        {visibleItems.map((item, index) => {
          const isFirstEmphasis = emphasizeFirst && index === 0;
          const isActive = !isCoarsePointer && activeIndex === index;
          const isDimmed = !isCoarsePointer && activeIndex !== null && activeIndex !== index;

          return (
            <motion.li key={item} layout="position">
              <div
                tabIndex={0}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onFocus={() => setActiveIndex(index)}
                onBlur={() => setActiveIndex(null)}
                className="flex cursor-default items-center gap-3 py-2 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
              >
                <span
                  className={cn(
                    "transition-transform duration-300",
                    ACCENT_TEXT_CLASS[accent],
                    isActive && "scale-[1.15]",
                  )}
                >
                  <TickIcon
                    isInView={isInView}
                    reducedMotion={reducedMotion}
                    delay={index * STAGGER.tight}
                    filled={isFirstEmphasis}
                  />
                </span>

                <span
                  className={cn(
                    "text-body transition-[color,transform] duration-300",
                    isFirstEmphasis
                      ? "text-text"
                      : isCoarsePointer
                        ? "text-text-muted"
                        : isActive
                          ? "text-text"
                          : isDimmed
                            ? "text-text-faint"
                            : "text-text-muted",
                  )}
                  style={{ transform: isActive ? "translateX(6px)" : undefined }}
                >
                  {item}
                </span>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>

      {hasMore ? (
        <button
          type="button"
          data-cursor="hover"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          className="mt-2 self-start font-mono text-label uppercase tracking-[0.22em] text-text-faint transition-colors duration-300 hover:text-text"
        >
          {expanded ? PRICING_INCLUDES_LESS_LABEL : `+${items.length - VISIBLE_LIMIT} ${PRICING_INCLUDES_MORE_LABEL}`}
        </button>
      ) : null}
    </div>
  );
}
