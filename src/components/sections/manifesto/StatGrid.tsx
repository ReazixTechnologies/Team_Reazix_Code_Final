import { motion } from "motion/react";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { STATS } from "@/content/stats";
import { EASE, STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Stat } from "@/types";

/** Hand-mapped since STATS is a fixed four-item grid — see the spec's responsive border rules. */
const CELL_BORDER_CLASSES = [
  "border-b border-line sm:border-b sm:border-r lg:border-b-0 lg:border-r",
  "border-b border-line sm:border-b sm:border-r-0 lg:border-b-0 lg:border-r",
  "border-b border-line sm:border-b-0 sm:border-r lg:border-b-0 lg:border-r",
  "border-line sm:border-b-0 sm:border-r-0 lg:border-r-0",
];

const HIGHLIGHT_GRADIENT_STYLE = {
  backgroundImage: "linear-gradient(90deg, var(--color-ember), var(--color-amber), var(--color-blush))",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
} as const;

function StatCell({ stat, index }: { stat: Stat; index: number }) {
  const reducedMotion = useReducedMotion();
  const suffixDelay = reducedMotion ? 0 : 2;

  return (
    <div
      data-cursor="hover"
      className={cn(
        "group relative flex h-full flex-col gap-4 px-6 py-10 transition-colors duration-300 hover:bg-surface sm:px-8 sm:py-12",
        CELL_BORDER_CLASSES[index],
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-ember transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
      />

      <span className="font-mono text-label text-text-faint">{stat.index}</span>

      <div className="flex items-end gap-1">
        <AnimatedCounter
          value={stat.value}
          duration={2}
          margin="-15% 0px"
          className="text-h1 font-display font-light tabular-nums text-text transition-colors duration-300 group-hover:text-transparent"
          style={HIGHLIGHT_GRADIENT_STYLE}
        />
        {stat.suffix ? (
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ delay: suffixDelay, duration: 0.6, ease: EASE }}
            className="pb-2 text-h2 font-display font-light text-ember"
          >
            {stat.suffix}
          </motion.span>
        ) : null}
      </div>

      <p className="text-body text-text-muted">{stat.label}</p>
    </div>
  );
}

export function StatGrid() {
  return (
    <Container>
      <div className="grid grid-cols-1 border border-line sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, index) => (
          <Reveal key={stat.index} delay={index * STAGGER.loose} className="h-full">
            <StatCell stat={stat} index={index} />
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
