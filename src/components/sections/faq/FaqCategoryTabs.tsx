import { motion } from "motion/react";
import { EASE } from "@/lib/motion";
import { cn, slugify } from "@/lib/utils";
import type { FaqCategory } from "@/types";

interface FaqCategoryTabsProps {
  categories: FaqCategory[];
  activeCategory: FaqCategory;
  onCategoryChange: (category: FaqCategory) => void;
}

/** Mono category tabs with a sliding underline — filtering the accordion below. */
export function FaqCategoryTabs({ categories, activeCategory, onCategoryChange }: FaqCategoryTabsProps) {
  return (
    <div role="tablist" aria-label="FAQ categories" className="flex flex-wrap gap-x-8 gap-y-3 border-b border-line">
      {categories.map((category) => {
        const isActive = category === activeCategory;
        const slug = slugify(category);

        return (
          <button
            key={category}
            type="button"
            role="tab"
            id={`faq-tab-${slug}`}
            aria-selected={isActive}
            aria-controls={`faq-panel-${slug}`}
            data-cursor="hover"
            onClick={() => onCategoryChange(category)}
            className={cn(
              "relative pb-4 font-mono text-label uppercase tracking-[0.22em] transition-colors duration-300",
              isActive ? "text-text" : "text-text-faint hover:text-text-muted",
            )}
          >
            {category}
            {isActive ? (
              <motion.span
                layoutId="faq-tab-underline"
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-px h-px bg-ember"
                transition={{ duration: 0.4, ease: EASE }}
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
