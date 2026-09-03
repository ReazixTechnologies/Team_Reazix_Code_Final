import { AnimatePresence, motion } from "motion/react";
import { forwardRef, type KeyboardEvent } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Faq } from "@/types";

interface PlusMinusIconProps {
  open: boolean;
}

/** Two 1px lines: the vertical stroke rotates and fades on open, leaving a minus. No chevron. */
function PlusMinusIcon({ open }: PlusMinusIconProps) {
  const reducedMotion = useReducedMotion();

  return (
    <span className="relative flex h-4 w-4 shrink-0 items-center justify-center" aria-hidden="true">
      <span className="absolute h-px w-4 bg-text-muted transition-colors duration-300 group-hover:bg-text" />
      <motion.span
        className="absolute h-4 w-px bg-text-muted transition-colors duration-300 group-hover:bg-text"
        initial={false}
        animate={{ rotate: open ? 90 : 0, opacity: open ? 0 : 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.4, ease: EASE }}
      />
    </span>
  );
}

interface FaqItemProps {
  faq: Faq;
  isOpen: boolean;
  onToggle: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

/** One disclosure row: question button + a height-animated (layout, not max-height) answer panel. */
export const FaqItem = forwardRef<HTMLButtonElement, FaqItemProps>(function FaqItem(
  { faq, isOpen, onToggle, onKeyDown },
  ref,
) {
  const reducedMotion = useReducedMotion();
  const buttonId = `faq-button-${faq.id}`;
  const panelId = `faq-panel-item-${faq.id}`;

  return (
    <div className="group border-b border-line">
      <h3 className="m-0">
        <button
          ref={ref}
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          onKeyDown={onKeyDown}
          className="relative flex w-full items-center justify-between gap-6 py-6 text-left outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
        >
          <span
            className={cn(
              "font-display text-h3 font-light transition-colors duration-300",
              isOpen ? "text-text" : "text-text-muted group-hover:text-text",
            )}
          >
            {faq.question}
          </span>

          <PlusMinusIcon open={isOpen} />

          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-ember transition-transform duration-300 ease-out-expo group-hover:scale-x-100"
          />
        </button>
      </h3>

      <motion.div layout transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }} className="overflow-hidden">
        <AnimatePresence initial={false}>
          {isOpen ? (
            <motion.div
              key="content"
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: reducedMotion ? 0 : 0.1, duration: reducedMotion ? 0 : 0.3, ease: EASE } }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -10, transition: { duration: reducedMotion ? 0 : 0.15 } }}
              className="pb-6"
            >
              <p className="max-w-[680px] text-body text-text-muted">{faq.answer}</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
});
