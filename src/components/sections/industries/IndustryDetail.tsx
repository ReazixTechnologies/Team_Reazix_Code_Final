import { motion } from "motion/react";
import { INDUSTRIES_TYPICAL_WORK_LABEL } from "@/content/industries";
import { EASE, STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Industry, ServiceAccent } from "@/types";

const ACCENT_STROKE_VAR: Record<ServiceAccent, string> = {
  ember: "var(--color-ember)",
  amber: "var(--color-amber)",
  blush: "var(--color-blush)",
  violet: "var(--color-violet)",
  mint: "var(--color-mint)",
};

const ACCENT_BORDER_CLASS: Record<ServiceAccent, string> = {
  ember: "border-ember",
  amber: "border-amber",
  blush: "border-blush",
  violet: "border-violet",
  mint: "border-mint",
};

interface WorkTickProps {
  accent: ServiceAccent;
  delay: number;
}

/** A 1px tick that draws itself as the panel enters — same technique as the Process module's deliverable ticks. */
function WorkTick({ accent, delay }: WorkTickProps) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0">
      <motion.path
        d="M2 7.5L5.5 11L12 3.5"
        stroke={ACCENT_STROKE_VAR[accent]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, ease: EASE, delay }}
      />
    </svg>
  );
}

interface IndustryDetailProps {
  industry: Industry;
  /** Tighter spacing/padding for the mobile accordion body. */
  compact?: boolean;
}

/** The panel that swaps as an industry tile is selected: headline, description, typical work, and the "concern" callout. */
export function IndustryDetail({ industry, compact = false }: IndustryDetailProps) {
  return (
    <div className={cn("flex flex-col gap-8", compact ? "px-1 pb-6" : "p-[clamp(1.75rem,3vw,3.5rem)]")}>
      <div className="flex flex-col gap-4">
        <p className={cn("font-display font-light text-text", compact ? "text-h3" : "text-h2")}>{industry.headline}</p>
        <p className="max-w-[560px] text-body text-text-muted">{industry.description}</p>
      </div>

      <div className="flex flex-col gap-3">
        <span className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">
          {INDUSTRIES_TYPICAL_WORK_LABEL}
        </span>
        <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          {industry.typicalWork.map((item, index) => (
            <li key={item} className="flex items-center gap-3">
              <WorkTick accent={industry.accent} delay={index * STAGGER.tight} />
              <span className="text-body text-text-muted">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={cn("border-l-2 bg-surface px-6 py-5", ACCENT_BORDER_CLASS[industry.accent])}>
        <p className="text-h3 font-display font-light text-text">{industry.concern}</p>
      </div>
    </div>
  );
}
