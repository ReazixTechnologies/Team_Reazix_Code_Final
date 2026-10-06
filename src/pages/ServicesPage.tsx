import { Seo } from "@/components/seo/Seo";
import { ServiceStack } from "@/components/sections/services/ServiceStack";
import { ServicesOutro } from "@/components/sections/services/ServicesOutro";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  SERVICES_INTRO_DESCRIPTION,
  SERVICES_INTRO_EYEBROW,
  SERVICES_INTRO_HEADING_LINES,
} from "@/content/services";

/** /services — the deep version of the homepage services band, for anyone who lands here directly. */
export function ServicesPage() {
  return (
    <>
      <Seo path="/services" />

      <section id="services" aria-labelledby="services-page-heading" className="relative bg-void">
        <Container className="flex flex-col gap-6 pb-12 pt-[calc(var(--spacing-section)+3rem)]">
          <Eyebrow>{SERVICES_INTRO_EYEBROW}</Eyebrow>
          <h1 id="services-page-heading" className="font-display text-h1 font-light text-text">
            {SERVICES_INTRO_HEADING_LINES.join(" ")}
          </h1>
          <p className="max-w-[560px] text-body text-text-muted">{SERVICES_INTRO_DESCRIPTION}</p>
        </Container>

        <Container className="py-section">
          <ServiceStack />
        </Container>

        <ServicesOutro />
      </section>
    </>
  );
}
