import { AnimatedPrice } from "./AnimatedPrice";
import { Reveal } from "@/components/motion/Reveal";
import { ADD_ONS, ADDONS_EYEBROW, PRICING_FROM_LABEL } from "@/content/pricing";
import { useCurrency } from "@/hooks/useCurrency";

/** À-la-carte capabilities, shown as small from-priced pills. */
export function AddOnsRow() {
  const { formatAmount } = useCurrency();

  return (
    <Reveal className="flex flex-col items-center gap-6 text-center">
      <span className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">{ADDONS_EYEBROW}</span>

      <div className="flex flex-wrap justify-center gap-3">
        {ADD_ONS.map((addOn) => (
          <span
            key={addOn.name}
            data-cursor="hover"
            className="group flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-label uppercase tracking-[0.22em] text-text-muted transition-[color,transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-ember hover:bg-surface-2 hover:text-text"
          >
            {addOn.name}
            <span className="text-text-faint transition-colors duration-300 group-hover:text-text-muted">
              {PRICING_FROM_LABEL}{" "}
              <AnimatedPrice value={formatAmount(addOn.priceINR, addOn.priceUSD)} className="tabular-nums" />
            </span>
          </span>
        ))}
      </div>
    </Reveal>
  );
}
