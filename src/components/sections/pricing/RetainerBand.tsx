import { useState } from "react";
import { AnimatedPrice } from "./AnimatedPrice";
import { Reveal } from "@/components/motion/Reveal";
import {
  RETAINER_DESCRIPTION,
  RETAINER_EYEBROW,
  RETAINER_FOOTNOTE,
  RETAINER_HEADING,
  RETAINER_PRICE_SUFFIX,
  RETAINERS,
  PRICING_FROM_LABEL,
} from "@/content/pricing";
import { useCurrency } from "@/hooks/useCurrency";
import { cn } from "@/lib/utils";

/** The ongoing-partnership option: hover lights one retainer row and dims the rest. */
export function RetainerBand() {
  const { formatAmount } = useCurrency();
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <Reveal className="rounded-lg border border-line bg-surface p-[clamp(1.75rem,3vw,3rem)]">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[4fr_8fr] lg:gap-16">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">{RETAINER_EYEBROW}</span>
          <h3 className="font-display text-h3 font-light text-text">{RETAINER_HEADING}</h3>
          <p className="max-w-[420px] text-body text-text-muted">{RETAINER_DESCRIPTION}</p>
        </div>

        <div onMouseLeave={() => setActiveId(null)}>
          <ul className="flex flex-col">
            {RETAINERS.map((retainer) => {
              const isActive = activeId === retainer.id;
              const isDimmed = activeId !== null && activeId !== retainer.id;

              return (
                <li key={retainer.id} className="border-b border-line last:border-b-0">
                  <div
                    tabIndex={0}
                    onMouseEnter={() => setActiveId(retainer.id)}
                    onFocus={() => setActiveId(retainer.id)}
                    onBlur={() => setActiveId(null)}
                    className="flex cursor-default flex-col gap-2 py-4 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                  >
                    <div className="flex flex-col gap-1">
                      <span
                        className={cn(
                          "text-body transition-colors duration-300",
                          isActive ? "text-text" : isDimmed ? "text-text-faint" : "text-text-muted",
                        )}
                      >
                        {retainer.name}
                      </span>
                      <span
                        className={cn(
                          "max-w-[440px] text-sm transition-colors duration-300",
                          isActive ? "text-text-muted" : "text-text-faint",
                        )}
                      >
                        {retainer.description}
                      </span>
                    </div>

                    <span
                      className={cn(
                        "flex shrink-0 items-baseline gap-1.5 whitespace-nowrap font-mono transition-colors duration-300",
                        isActive ? "text-text" : "text-text-faint",
                      )}
                    >
                      <span className="text-label uppercase tracking-[0.22em]">{PRICING_FROM_LABEL}</span>
                      <AnimatedPrice value={formatAmount(retainer.priceINR, retainer.priceUSD)} className="text-body tabular-nums" />
                      <span className="text-label uppercase tracking-[0.22em]">{RETAINER_PRICE_SUFFIX}</span>
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <p className="mt-10 border-t border-line pt-6 font-mono text-label uppercase tracking-[0.22em] text-text-faint">
        {RETAINER_FOOTNOTE}
      </p>
    </Reveal>
  );
}
