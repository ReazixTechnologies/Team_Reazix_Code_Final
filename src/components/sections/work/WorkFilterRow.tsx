import { motion } from "motion/react";
import { WORK_FILTERS } from "@/content/projects";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { WorkFilter } from "@/types";

interface WorkFilterRowProps {
  activeFilter: WorkFilter;
  onFilterChange: (filter: WorkFilter) => void;
  /** Distinct layoutId per mount point (home teaser vs. /work index) — they're never mounted together, but keeps intent explicit. */
  layoutId?: string;
}

/** Filter pill row shared by the homepage Work teaser and the /work index page. */
export function WorkFilterRow({ activeFilter, onFilterChange, layoutId = "work-filter-pill" }: WorkFilterRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter case studies by category">
      {WORK_FILTERS.map((filter) => {
        const isActive = filter === activeFilter;

        return (
          <button
            key={filter}
            type="button"
            aria-pressed={isActive}
            data-cursor="hover"
            onClick={() => onFilterChange(filter)}
            className={cn(
              "relative rounded-full px-4 py-2 font-mono text-label uppercase tracking-[0.22em] transition-colors duration-300",
              isActive ? "text-void" : "text-text-muted hover:text-text",
            )}
          >
            {isActive ? (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-ember"
                transition={{ duration: 0.4, ease: EASE }}
              />
            ) : null}
            <span className="relative">{filter}</span>
          </button>
        );
      })}
    </div>
  );
}
