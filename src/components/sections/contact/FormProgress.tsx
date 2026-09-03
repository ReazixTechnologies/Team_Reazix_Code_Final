import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface FormProgressProps {
  step: number;
  furthestStep: number;
  labels: string[];
  onStepClick: (step: number) => void;
}

/** Three mono numerals on a hairline — the completed portion fills in accent; visited steps are clickable. */
export function FormProgress({ step, furthestStep, labels, onStepClick }: FormProgressProps) {
  const reducedMotion = useReducedMotion();

  return (
    <ol aria-label="Form progress" className="flex items-center">
      {labels.map((label, index) => {
        const isCurrent = index === step;
        const isCompleted = index < furthestStep;
        const isClickable = index <= furthestStep && index !== step;

        return (
          <li key={label} className={cn("flex items-center", index < labels.length - 1 && "flex-1")}>
            <button
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onStepClick(index)}
              aria-current={isCurrent ? "step" : undefined}
              className={cn(
                "flex shrink-0 items-center gap-2 font-mono text-label uppercase tracking-[0.22em] transition-colors duration-300",
                isCurrent || isCompleted ? "text-text" : "text-text-faint",
                isClickable && "cursor-pointer hover:text-ember",
                !isClickable && "cursor-default",
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] transition-colors duration-300",
                  isCurrent || isCompleted ? "border-ember text-ember" : "border-line text-text-faint",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </button>

            {index < labels.length - 1 ? (
              <span className="relative mx-3 h-px flex-1 bg-line sm:mx-4">
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-full origin-left bg-ember"
                  initial={false}
                  animate={{ scaleX: isCompleted ? 1 : 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.4, ease: EASE }}
                />
              </span>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
