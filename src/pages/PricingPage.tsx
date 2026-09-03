import { Helmet } from "react-helmet-async";
import { AddOnsRow } from "@/components/sections/pricing/AddOnsRow";
import { PricingFaqTeaser } from "@/components/sections/pricing/PricingFaqTeaser";
import { PricingGrid } from "@/components/sections/pricing/PricingGrid";
import { PricingIntro } from "@/components/sections/pricing/PricingIntro";
import { PricingNotes } from "@/components/sections/pricing/PricingNotes";
import { RetainerBand } from "@/components/sections/pricing/RetainerBand";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  PRICING_PAGE_DESCRIPTION,
  PRICING_PAGE_EYEBROW,
  PRICING_PAGE_HEADING,
  PRICING_PAGE_INTRO,
  PRICING_PAGE_TITLE,
} from "@/content/pricing";
import { siteConfig } from "@/content/site";
import { CurrencyProvider } from "@/hooks/useCurrency";

/** /pricing — the full engagement-model reference: tiers, retainers, add-ons, the honesty block and objection handling. */
export function PricingPage() {
  return (
    <>
      <Helmet>
        <title>{`${PRICING_PAGE_TITLE} — ${siteConfig.name}`}</title>
        <meta name="description" content={PRICING_PAGE_DESCRIPTION} />
      </Helmet>

      <CurrencyProvider>
        <section id="pricing" aria-labelledby="pricing-page-heading" className="relative bg-void">
          <Container className="flex flex-col gap-6 pb-12 pt-[calc(var(--spacing-section)+3rem)]">
            <Eyebrow>{PRICING_PAGE_EYEBROW}</Eyebrow>
            <h1 id="pricing-page-heading" className="font-display text-h1 font-light text-text">
              {PRICING_PAGE_HEADING}
            </h1>
            <p className="max-w-[560px] text-body text-text-muted">{PRICING_PAGE_INTRO}</p>
          </Container>

          <Container className="flex flex-col gap-16 pb-section">
            <PricingIntro />
            <PricingGrid />
            <RetainerBand />
          </Container>
        </section>

        <section aria-label="What moves the number" className="relative border-t border-line bg-void">
          <Container className="py-section">
            <PricingNotes />
          </Container>
        </section>

        <section aria-label="Add-on capabilities" className="relative border-t border-line bg-void">
          <Container className="py-section">
            <AddOnsRow />
          </Container>
        </section>

        <section aria-label="Pricing frequently asked questions" className="relative border-t border-line bg-void">
          <Container className="py-section">
            <PricingFaqTeaser />
          </Container>
        </section>
      </CurrencyProvider>
    </>
  );
}
