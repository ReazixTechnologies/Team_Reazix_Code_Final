import { motion, useTransform, type MotionValue } from "motion/react";
import { useLenis } from "@/components/providers/SmoothScroll";
import { getProcessAccent } from "@/content/process";
import { cn } from "@/lib/utils";
import type { ProcessStep, ServiceAccent } from "@/types";

const ACCENT_VAR: Record<ServiceAccent, string> = {
  ember: "var(--color-ember)",
  amber: "var(--color-amber)",
  blush: "var(--color-blush)",
  violet: "var(--color-violet)",
  mint: "var(--color-mint)",
};

interface ProgressRailProps {
  steps: ProcessStep[];
  progress: MotionValue<number>;
  activeIndex: number;
}

/** The 80px sticky rail: scroll-linked fill, "you are here" dot, and clickable step nodes. */
export function ProgressRail({ steps, progress, activeIndex }: ProgressRailProps) {
  const lenisRef = useLenis();
  const count = steps.length;
  const activeAccent = getProcessAccent(activeIndex);

  const fillGradient = `linear-gradient(to bottom, ${steps
    .map((_, index) => `${ACCENT_VAR[getProcessAccent(index)]} ${(index / (count - 1)) * 100}%`)
    .join(", ")})`;

  const dotTop = useTransform(progress, (value) => `${value * 100}%`);

  function handleNodeClick(step: ProcessStep) {
    const target = document.getElementById(`process-step-${step.id}`);
    if (!target) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target);
    } else {
      target.scrollIntoView({ block: "start" });
    }
  }

  return (
    <div className="relative h-screen w-20">
      <div className="absolute inset-y-12 left-1/2 w-px -translate-x-1/2 bg-line" aria-hidden="true" />

      <motion.div
        aria-hidden="true"
        className="absolute inset-y-12 left-1/2 w-px origin-top -translate-x-1/2 transition-shadow duration-[600ms]"
        style={{
          scaleY: progress,
          background: fillGradient,
          boxShadow: `0 0 12px ${ACCENT_VAR[activeAccent]}`,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-[600ms]"
        style={{ top: dotTop, marginTop: "3rem", backgroundColor: ACCENT_VAR[activeAccent] }}
      />

      <ul className="absolute inset-y-12 left-1/2 w-px -translate-x-1/2">
        {steps.map((step, index) => {
          const isActive = index === activeIndex;
          const isComplete = index < activeIndex;
          const accent = getProcessAccent(index);
          const topPercent = count === 1 ? 0 : (index / (count - 1)) * 100;

          return (
            <li
              key={step.id}
              className="absolute left-1/2 -translate-y-1/2"
              style={{ top: `${topPercent}%` }}
            >
              <div className="relative flex -translate-x-1/2 items-center">
                <button
                  type="button"
                  aria-label={`Go to step ${step.index}: ${step.title}`}
                  onClick={() => handleNodeClick(step)}
                  data-cursor="hover"
                  className="relative flex h-7 w-7 items-center justify-center rounded-full outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "block rounded-full border border-line transition-all duration-300",
                      isActive ? "h-[13px] w-[13px] border-transparent" : "h-[7px] w-[7px]",
                      isComplete && !isActive && "border-transparent",
                    )}
                    style={
                      isActive
                        ? { backgroundColor: ACCENT_VAR[accent], boxShadow: `0 0 16px ${ACCENT_VAR[accent]}` }
                        : isComplete
                          ? { backgroundColor: ACCENT_VAR[accent], opacity: 0.45 }
                          : undefined
                    }
                  />
                  {isActive ? (
                    <motion.span
                      aria-hidden="true"
                      className="absolute h-[13px] w-[13px] rounded-full"
                      style={{ backgroundColor: ACCENT_VAR[accent] }}
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  ) : null}
                </button>

                <span
                  className={cn(
                    "absolute left-full ml-2 whitespace-nowrap font-mono text-[10px] tracking-[0.15em] transition-colors duration-300",
                    isActive ? "text-text" : "text-text-faint",
                  )}
                >
                  {step.index}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
