import { AnimatePresence, motion } from "motion/react";
import { useRef, type KeyboardEvent } from "react";
import { FaqItem } from "./FaqItem";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { slugify } from "@/lib/utils";
import type { Faq, FaqCategory } from "@/types";

interface FaqAccordionProps {
  faqs: Faq[];
  activeCategory: FaqCategory;
  openId: string | null;
  onToggle: (id: string) => void;
}

/** Filtered question list — single-open, arrow-key navigable, re-renders with layout when the category changes. */
export function FaqAccordion({ faqs, activeCategory, openId, onToggle }: FaqAccordionProps) {
  const reducedMotion = useReducedMotion();
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const slug = slugify(activeCategory);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const nextIndex = event.key === "ArrowDown" ? (index + 1) % faqs.length : (index - 1 + faqs.length) % faqs.length;
    buttonRefs.current[faqs[nextIndex].id]?.focus();
  }

  return (
    <motion.div
      layout
      role="tabpanel"
      id={`faq-panel-${slug}`}
      aria-labelledby={`faq-tab-${slug}`}
      transition={{ duration: reducedMotion ? 0 : 0.35 }}
      className="flex flex-col"
    >
      <AnimatePresence initial={false} mode="popLayout">
        {faqs.map((faq, index) => (
          <motion.div
            key={faq.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
          >
            <FaqItem
              ref={(el) => {
                buttonRefs.current[faq.id] = el;
              }}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => onToggle(faq.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
