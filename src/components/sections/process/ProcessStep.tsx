import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { getProcessAccent, PROCESS_DELIVERABLES_LABEL, PROCESS_INVOLVEMENT_LABEL } from "@/content/process";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ProcessStep as ProcessStepData, ServiceAccent } from "@/types";

const ACCENT_BORDER_CLASS: Record<ServiceAccent, string> = {
  ember: "border-ember",
  amber: "border-amber",
  blush: "border-blush",
  violet: "border-violet",
  mint: "border-mint",
};

const ACCENT_STROKE_VAR: Record<ServiceAccent, string> = {
  ember: "var(--color-ember)",
  amber: "var(--color-amber)",
  blush: "var(--color-blush)",
  violet: "var(--color-violet)",
  mint: "var(--color-mint)",
};

const DELIVERABLE_TICK_STAGGER = 0.06;

interface DeliverableTickProps {
  accent: ServiceAccent;
  delay: number;
}

/** A 1px tick mark that draws itself (pathLength) as its row enters view. */
function DeliverableTick({ accent, delay }: DeliverableTickProps) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0">
      <motion.path
        d="M2 7.5L5.5 11L12 3.5"
        stroke={ACCENT_STROKE_VAR[accent]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.4, ease: EASE, delay }}
      />
    </svg>
  );
}

interface ProcessStepProps {
  step: ProcessStepData;
  index: number;
}

/** One step's detail panel: description, deliverables, and the involvement panel — always in the DOM. */
export function ProcessStep({ step, index }: ProcessStepProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: panelRef, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 1, 0.25]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);
  const accent = getProcessAccent(index);

  return (
    <div ref={panelRef} id={`process-step-${step.id}`} className="flex h-screen items-center">
      <motion.article style={{ opacity, y }} className="flex max-w-[520px] flex-col gap-8 py-16">
        <h3 className="sr-only">{`${step.index} — ${step.phase}: ${step.title} (${step.duration})`}</h3>

        <p className="text-body text-text-muted">{step.description}</p>

        <div className="flex flex-col gap-4">
          <span className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">
            {PROCESS_DELIVERABLES_LABEL}
          </span>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
            {step.deliverables.map((item, itemIndex) => (
              <li key={item} className="flex items-center gap-3">
                <DeliverableTick accent={accent} delay={itemIndex * DELIVERABLE_TICK_STAGGER} />
                <span className="text-body text-text-muted">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={cn("border-l-2 bg-surface px-5 py-4", ACCENT_BORDER_CLASS[accent])}>
          <span className="mb-1 block font-mono text-label uppercase tracking-[0.22em] text-text-faint">
            {PROCESS_INVOLVEMENT_LABEL}
          </span>
          <p className="text-body text-text">{step.yourInvolvement}</p>
        </div>
      </motion.article>
    </div>
  );
}
