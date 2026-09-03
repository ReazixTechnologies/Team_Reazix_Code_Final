import { Link } from "react-router-dom";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  PRICING_FAQ_TEASER,
  PRICING_FAQ_TEASER_EYEBROW,
  PRICING_FAQ_TEASER_LINK_HREF,
  PRICING_FAQ_TEASER_LINK_LABEL,
} from "@/content/pricing";
import { STAGGER } from "@/lib/motion";

/** Three objection-handling lines, then a hand-off to the full FAQ. */
export function PricingFaqTeaser() {
  return (
    <div className="flex flex-col gap-10">
      <Eyebrow>{PRICING_FAQ_TEASER_EYEBROW}</Eyebrow>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {PRICING_FAQ_TEASER.map((objection, index) => (
          <Reveal key={objection.question} delay={index * STAGGER.base} className="flex flex-col gap-3">
            <h3 className="font-display text-h3 font-light text-text">{objection.question}</h3>
            <p className="text-body text-text-muted">{objection.answer}</p>
          </Reveal>
        ))}
      </div>

      <Link
        to={PRICING_FAQ_TEASER_LINK_HREF}
        data-cursor="hover"
        className="inline-flex w-fit items-center gap-2 font-mono text-label uppercase tracking-[0.22em] text-text-muted transition-colors duration-300 hover:text-text"
      >
        {PRICING_FAQ_TEASER_LINK_LABEL} &rarr;
      </Link>
    </div>
  );
}
