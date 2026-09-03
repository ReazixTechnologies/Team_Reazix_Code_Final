import { Link } from "react-router-dom";
import { PricingGrid } from "./PricingGrid";
import { PricingIntro } from "./PricingIntro";
import { RetainerBand } from "./RetainerBand";
import { Magnetic } from "@/components/motion/Magnetic";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PRICING_DETAIL_LINK_LABEL } from "@/content/pricing";
import { CurrencyProvider } from "@/hooks/useCurrency";

/** The qualification instrument: three engagement tiers, an ongoing option, and a hand-off to full detail. */
export function Pricing() {
  return (
    <CurrencyProvider>
      <section id="pricing" aria-label="Pricing" className="relative bg-void">
        <Container className="flex flex-col gap-16 py-section">
          <PricingIntro />
          <PricingGrid />
          <RetainerBand />

          <div className="flex justify-center">
            <Magnetic>
              <Link to="/pricing" data-cursor="hover" className={buttonClasses({ variant: "ghost", size: "md" })}>
                {PRICING_DETAIL_LINK_LABEL} &rarr;
              </Link>
            </Magnetic>
          </div>
        </Container>
      </section>
    </CurrencyProvider>
  );
}
