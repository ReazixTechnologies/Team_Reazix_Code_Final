import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { EASE } from "@/lib/motion";

/**
 * text-display's ceiling (8.5rem) can't fit "make businesses look premium." on one
 * line at any realistic viewport — measured against the h1's actual max-w-[1100px]
 * box, this clamp is the largest that stays single-line from ~480px width up.
 * Keeps text-display's line-height/letter-spacing/font via className; only the
 * font-size is scoped down for this specific 3-line composition.
 */
const HEADLINE_FONT_SIZE = "clamp(1.75rem, 5.5vw, 4.5rem)";

interface HeroHeadlineProps {
  phase: "idle" | "engaged";
  reducedMotion: boolean;
}

const LINES: ReactNode[] = [
  "We design and engineer",
  <>
    <span
      className="bg-clip-text text-transparent"
      style={{
        backgroundImage:
          "linear-gradient(90deg, var(--color-ember), var(--color-amber), var(--color-blush), var(--color-ember))",
        backgroundSize: "200% 100%",
        animation: "gradient-shimmer 8s linear infinite",
      }}
    >
      digital products
    </span>{" "}
    that
  </>,
  "make businesses look premium.",
];

/** Reveal timing for each fade-up block once the hero is engaged, in seconds. */
const ENTRANCE_DELAY = {
  eyebrow: 0.15,
  headlineBase: 0.15,
  headlineStagger: 0.12,
  subline: 0.65,
  ctas: 0.8,
};

export function HeroHeadline({ phase, reducedMotion }: HeroHeadlineProps) {
  const engaged = phase === "engaged";
  // Below ~480px the longest line can't stay single-line even at the clamp's floor —
  // fall back to a plain fade instead of clipping wrapped text inside the mask box.
  const isNarrow = useMediaQuery("(max-width: 479px)");

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <motion.span
        className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 font-mono text-label uppercase tracking-[0.22em] text-text-muted"
        initial={false}
        animate={
          reducedMotion
            ? { opacity: engaged ? 1 : 0 }
            : { opacity: engaged ? 1 : 0, y: engaged ? 0 : 12 }
        }
        transition={{
          duration: reducedMotion ? 0.4 : 0.8,
          ease: EASE,
          delay: engaged && !reducedMotion ? ENTRANCE_DELAY.eyebrow : 0,
        }}
      >
        <span className="h-[5px] w-[5px] rounded-full bg-ember" aria-hidden="true" />
        Digital Product Studio — Est. 2026
      </motion.span>

      <h1
        className="max-w-[1100px] text-display text-text"
        style={{ fontSize: HEADLINE_FONT_SIZE }}
      >
        {LINES.map((line, index) => {
          const delay = engaged ? ENTRANCE_DELAY.headlineBase + index * ENTRANCE_DELAY.headlineStagger : 0;

          if (reducedMotion || isNarrow) {
            return (
              <motion.span
                key={index}
                className="block"
                initial={false}
                animate={{ opacity: engaged ? 1 : 0 }}
                transition={{ duration: reducedMotion ? 0.4 : 0.6, ease: EASE, delay: reducedMotion ? 0 : delay }}
              >
                {line}
              </motion.span>
            );
          }

          return (
            <span key={index} className="block overflow-hidden" style={{ perspective: 1000 }}>
              <motion.span
                className="block whitespace-nowrap"
                style={{ transformOrigin: "bottom" }}
                initial={false}
                animate={engaged ? { y: "0%", rotateX: 0 } : { y: "110%", rotateX: 12 }}
                transition={{ duration: 1.1, ease: EASE, delay }}
              >
                {line}
              </motion.span>
            </span>
          );
        })}
      </h1>

      <motion.p
        className="max-w-[620px] text-body text-text-muted"
        initial={false}
        animate={
          reducedMotion
            ? { opacity: engaged ? 1 : 0 }
            : { opacity: engaged ? 1 : 0, y: engaged ? 0 : 16 }
        }
        transition={{
          duration: reducedMotion ? 0.4 : 0.8,
          ease: EASE,
          delay: engaged && !reducedMotion ? ENTRANCE_DELAY.subline : 0,
        }}
      >
        A premium technology partner for startups, SaaS companies and established
        brands — strategy, design, engineering, and AI under one roof.
      </motion.p>

      <motion.div
        className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
        initial={false}
        animate={
          reducedMotion
            ? { opacity: engaged ? 1 : 0 }
            : { opacity: engaged ? 1 : 0, y: engaged ? 0 : 16 }
        }
        transition={{
          duration: reducedMotion ? 0.4 : 0.8,
          ease: EASE,
          delay: engaged && !reducedMotion ? ENTRANCE_DELAY.ctas : 0,
        }}
      >
        <Magnetic strength={0.35} className="w-full sm:w-auto">
          <Button variant="primary" size="lg" className="group relative w-full overflow-hidden sm:w-auto">
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-left scale-x-0 bg-amber shadow-[0_0_24px_rgba(255,107,53,0.35)] transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
            />
            <span className="relative">Start a project</span>
          </Button>
        </Magnetic>
        <Magnetic strength={0.35} className="w-full sm:w-auto">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto">
            See our work
          </Button>
        </Magnetic>
      </motion.div>
    </div>
  );
}
