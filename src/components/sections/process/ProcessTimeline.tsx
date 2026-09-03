import { AnimatePresence, motion, useScroll } from "motion/react";
import { useRef } from "react";
import { ProcessStep } from "./ProcessStep";
import { ProgressRail } from "./ProgressRail";
import { Container } from "@/components/ui/Container";
import { getProcessAccent, PROCESS_STEPS } from "@/content/process";
import { useActiveIndex } from "@/hooks/useActiveIndex";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ServiceAccent } from "@/types";

const ACCENT_TEXT_CLASS: Record<ServiceAccent, string> = {
  ember: "text-ember",
  amber: "text-amber",
  blush: "text-blush",
  violet: "text-violet",
  mint: "text-mint",
};

const ACCENT_GRADIENT: Record<ServiceAccent, string> = {
  ember: "linear-gradient(180deg, var(--color-ember), transparent)",
  amber: "linear-gradient(180deg, var(--color-amber), transparent)",
  blush: "linear-gradient(180deg, var(--color-blush), transparent)",
  violet: "linear-gradient(180deg, var(--color-violet), transparent)",
  mint: "linear-gradient(180deg, var(--color-mint), transparent)",
};

const STEP_COUNT = PROCESS_STEPS.length;

/** Sticky two-column scroll experience: rail + current-step header stay pinned, the right column scrolls through all 7 panels. */
export function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const { index } = useActiveIndex(scrollYProgress, STEP_COUNT);

  const activeStep = PROCESS_STEPS[index];
  const accent = getProcessAccent(index);

  return (
    <div ref={sectionRef} className="relative mt-[45vh]" style={{ height: `${STEP_COUNT * 100}vh` }}>
      <Container className="grid h-full grid-cols-[80px_4fr_6fr] gap-x-8 lg:gap-x-12">
        <div className="relative">
          <div className="sticky top-[50vh] -translate-y-1/2">
            <ProgressRail steps={PROCESS_STEPS} progress={scrollYProgress} activeIndex={index} />
          </div>
        </div>

        <div className="relative">
          <div className="sticky top-[50vh] -translate-y-1/2 pr-8" aria-hidden="true">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex flex-col gap-6"
              >
                <span
                  className={cn(
                    "font-mono text-label uppercase tracking-[0.22em] transition-colors duration-[600ms]",
                    ACCENT_TEXT_CLASS[accent],
                  )}
                >
                  {activeStep.phase}
                </span>

                <span
                  className="font-display text-display font-light leading-none text-text/10"
                  style={{
                    backgroundImage: ACCENT_GRADIENT[accent],
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {activeStep.index}
                </span>

                <p className="font-display text-h2 font-light text-text">{activeStep.title}</p>

                <span className="inline-flex w-fit items-center rounded-full border border-line-strong px-4 py-1.5 font-mono text-label text-text-faint">
                  {activeStep.duration}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative flex flex-col">
          {PROCESS_STEPS.map((step, stepIndex) => (
            <ProcessStep key={step.id} step={step} index={stepIndex} />
          ))}
        </div>
      </Container>
    </div>
  );
}
