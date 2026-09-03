import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { IndustryDetail } from "./IndustryDetail";
import { Spotlight } from "@/components/fx/Spotlight";
import { INDUSTRIES, INDUSTRIES_DETAIL_ANNOUNCE_PREFIX } from "@/content/industries";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ServiceAccent } from "@/types";

const ACCENT_VAR: Record<ServiceAccent, string> = {
  ember: "var(--color-ember)",
  amber: "var(--color-amber)",
  blush: "var(--color-blush)",
  violet: "var(--color-violet)",
  mint: "var(--color-mint)",
};

/** Pointer must rest on a row this long before it becomes active, so a pointer travelling across the list does not strobe the detail panel. */
const HOVER_INTENT_DELAY = 120;

/** Selectable industry list (desktop) / accordion (mobile) — panel never empty, default is the first industry. */
export function IndustryGrid() {
  const [activeId, setActiveId] = useState<string>(INDUSTRIES[0].id);
  const intentTimeout = useRef<number | null>(null);
  const isCompact = useMediaQuery("(max-width: 1023px)");
  const reducedMotion = useReducedMotion();

  useEffect(
    () => () => {
      if (intentTimeout.current !== null) window.clearTimeout(intentTimeout.current);
    },
    [],
  );

  function scheduleActivate(id: string) {
    if (intentTimeout.current !== null) window.clearTimeout(intentTimeout.current);
    intentTimeout.current = window.setTimeout(() => setActiveId(id), HOVER_INTENT_DELAY);
  }

  function activateNow(id: string) {
    if (intentTimeout.current !== null) window.clearTimeout(intentTimeout.current);
    setActiveId(id);
  }

  const activeIndustry = INDUSTRIES.find((industry) => industry.id === activeId) ?? INDUSTRIES[0];

  if (isCompact) {
    return (
      <div className="flex flex-col">
        {INDUSTRIES.map((industry) => {
          const isOpen = industry.id === activeId;
          const panelId = `industry-panel-${industry.id}`;
          const buttonId = `industry-button-${industry.id}`;

          return (
            <div key={industry.id} className="border-b border-line">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setActiveId((current) => (current === industry.id ? "" : industry.id))}
                className="flex w-full items-center justify-between gap-4 py-5 text-left outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
              >
                <span
                  className={cn(
                    "font-display text-h3 font-light transition-colors duration-300",
                    isOpen ? "text-text" : "text-text-muted",
                  )}
                >
                  {industry.name}
                </span>
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full transition-opacity duration-300"
                  style={{ backgroundColor: ACCENT_VAR[industry.accent], opacity: isOpen ? 1 : 0.3 }}
                />
              </button>

              <motion.div layout transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }} className="overflow-hidden">
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="content"
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: reducedMotion ? 0 : 0.1, duration: reducedMotion ? 0 : 0.3 } }}
                      exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : 0.15 } }}
                    >
                      <IndustryDetail industry={industry} compact />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[4fr_8fr] lg:gap-16">
      <ul className="flex flex-col" onMouseLeave={() => intentTimeout.current !== null && window.clearTimeout(intentTimeout.current)}>
        {INDUSTRIES.map((industry) => {
          const isActive = industry.id === activeId;

          return (
            <li key={industry.id} className="relative border-b border-line">
              <button
                type="button"
                aria-current={isActive ? "true" : undefined}
                aria-controls="industry-detail-panel"
                data-cursor="hover"
                onMouseEnter={() => scheduleActivate(industry.id)}
                onFocus={() => activateNow(industry.id)}
                className="relative flex w-full items-center gap-4 py-4 text-left outline-none transition-transform duration-300 ease-out-expo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
                style={{ transform: isActive ? "translateX(16px)" : undefined }}
              >
                <span
                  className={cn(
                    "font-display text-h3 font-light transition-colors duration-300",
                    isActive ? "text-text" : "text-text-faint",
                  )}
                >
                  {industry.name}
                </span>
              </button>

              {isActive ? (
                <motion.span
                  layoutId="industry-indicator"
                  aria-hidden="true"
                  className="absolute inset-y-2 left-0 w-[2px]"
                  style={{ backgroundColor: ACCENT_VAR[industry.accent] }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
              ) : null}
            </li>
          );
        })}
      </ul>

      <div className="relative isolate overflow-hidden rounded-xl border border-line bg-surface">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
          {reducedMotion ? (
            <Spotlight
              color={ACCENT_VAR[activeIndustry.accent]}
              size={520}
              blur={150}
              className="left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 opacity-20"
            />
          ) : (
            <AnimatePresence>
              <motion.div
                key={activeIndustry.accent}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <Spotlight
                  color={ACCENT_VAR[activeIndustry.accent]}
                  size={520}
                  blur={150}
                  className="left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 opacity-20"
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        <div id="industry-detail-panel" className="relative z-10">
          {reducedMotion ? (
            <IndustryDetail industry={activeIndustry} />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndustry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.25 } }}
              >
                <IndustryDetail industry={activeIndustry} />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      <span className="sr-only" role="status" aria-live="polite">
        {INDUSTRIES_DETAIL_ANNOUNCE_PREFIX} {activeIndustry.name}: {activeIndustry.headline}
      </span>
    </div>
  );
}
