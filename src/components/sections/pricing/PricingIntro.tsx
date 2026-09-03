import { CurrencyToggle } from "./CurrencyToggle";
import { SplitText } from "@/components/motion/SplitText";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  PRICING_INTRO_DESCRIPTION,
  PRICING_INTRO_EYEBROW,
  PRICING_INTRO_HEADING_LINES,
} from "@/content/pricing";

/** Heading block + the "why we price this way" argument, currency toggle riding alongside. */
export function PricingIntro() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-5">
          <Eyebrow>{PRICING_INTRO_EYEBROW}</Eyebrow>
          <h2 className="flex flex-col font-display text-h2 font-light text-text">
            {PRICING_INTRO_HEADING_LINES.map((line) => (
              <SplitText key={line} text={line} as="span" className="block" />
            ))}
          </h2>
        </div>

        <CurrencyToggle className="shrink-0" />
      </div>

      <p className="max-w-[620px] text-body text-text-muted">{PRICING_INTRO_DESCRIPTION}</p>
    </div>
  );
}
