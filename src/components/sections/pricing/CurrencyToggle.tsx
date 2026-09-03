import { motion } from "motion/react";
import { useCurrency, type Currency } from "@/hooks/useCurrency";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const OPTIONS: { value: Currency; label: string }[] = [
  { value: "INR", label: "INR" },
  { value: "USD", label: "USD" },
];

interface CurrencyToggleProps {
  className?: string;
}

/** INR / USD segmented control — a sliding pill background tracks the active segment. */
export function CurrencyToggle({ className }: CurrencyToggleProps) {
  const { currency, setCurrency } = useCurrency();
  const reducedMotion = useReducedMotion();

  return (
    <div
      role="radiogroup"
      aria-label="Currency"
      className={cn("inline-flex items-center gap-1 rounded-full border border-line p-1", className)}
    >
      {OPTIONS.map((option) => {
        const isActive = option.value === currency;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            data-cursor="hover"
            onClick={() => setCurrency(option.value)}
            className={cn(
              "relative rounded-full px-4 py-1.5 font-mono text-label uppercase tracking-[0.22em] transition-colors duration-300",
              isActive ? "text-text" : "text-text-faint hover:text-text-muted",
            )}
          >
            {isActive ? (
              reducedMotion ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-ember/30 bg-surface-2"
                />
              ) : (
                <motion.span
                  aria-hidden="true"
                  layoutId="currency-toggle-pill"
                  className="absolute inset-0 rounded-full border border-ember/30 bg-surface-2"
                  transition={{ duration: 0.4, ease: EASE }}
                />
              )
            ) : null}
            <span className="relative">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
