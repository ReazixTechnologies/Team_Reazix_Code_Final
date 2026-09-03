import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import {
  getProcessAccent,
  PROCESS_DELIVERABLES_LABEL,
  PROCESS_INVOLVEMENT_LABEL,
  PROCESS_STEPS,
} from "@/content/process";
import { STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ServiceAccent } from "@/types";

const ACCENT_TEXT_CLASS: Record<ServiceAccent, string> = {
  ember: "text-ember",
  amber: "text-amber",
  blush: "text-blush",
  violet: "text-violet",
  mint: "text-mint",
};

const ACCENT_BG_CLASS: Record<ServiceAccent, string> = {
  ember: "bg-ember",
  amber: "bg-amber",
  blush: "bg-blush",
  violet: "bg-violet",
  mint: "bg-mint",
};

const ACCENT_BORDER_CLASS: Record<ServiceAccent, string> = {
  ember: "border-ember",
  amber: "border-amber",
  blush: "border-blush",
  violet: "border-violet",
  mint: "border-mint",
};

const ACCENT_VAR: Record<ServiceAccent, string> = {
  ember: "var(--color-ember)",
  amber: "var(--color-amber)",
  blush: "var(--color-blush)",
  violet: "var(--color-violet)",
  mint: "var(--color-mint)",
};

const STEP_COUNT = PROCESS_STEPS.length;

/** <1024px (and prefers-reduced-motion at any width): a plain, fully static vertical list. */
export function ProcessMobile() {
  const railGradient = `linear-gradient(to bottom, ${PROCESS_STEPS.map(
    (_, index) => `${ACCENT_VAR[getProcessAccent(index)]} ${(index / (STEP_COUNT - 1)) * 100}%`,
  ).join(", ")})`;

  return (
    <Container className="relative py-section">
      <div
        aria-hidden="true"
        className="absolute bottom-14 left-5 top-14 w-px sm:left-10"
        style={{ background: railGradient }}
      />

      <div className="flex flex-col gap-20">
        {PROCESS_STEPS.map((step, index) => {
          const accent = getProcessAccent(index);

          return (
            <Reveal key={step.id} delay={index * STAGGER.tight} className="relative pl-12 sm:pl-16">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-5 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full sm:left-10",
                  ACCENT_BG_CLASS[accent],
                )}
              />

              <article id={`process-step-${step.id}`} className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <span
                    className={cn(
                      "font-mono text-label uppercase tracking-[0.22em]",
                      ACCENT_TEXT_CLASS[accent],
                    )}
                  >
                    {step.phase}
                  </span>
                  <span className="font-display text-h1 font-light leading-none text-text/10">{step.index}</span>
                  <h3 className="font-display text-h3 font-light text-text">{step.title}</h3>
                  <span className="inline-flex w-fit items-center rounded-full border border-line-strong px-4 py-1.5 font-mono text-label text-text-faint">
                    {step.duration}
                  </span>
                </div>

                <p className="text-body text-text-muted">{step.description}</p>

                <div className="flex flex-col gap-3">
                  <span className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">
                    {PROCESS_DELIVERABLES_LABEL}
                  </span>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {step.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-body text-text-muted">
                        <span
                          aria-hidden="true"
                          className={cn("h-1 w-1 shrink-0 rounded-full", ACCENT_BG_CLASS[accent])}
                        />
                        {item}
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
              </article>
            </Reveal>
          );
        })}
      </div>
    </Container>
  );
}
