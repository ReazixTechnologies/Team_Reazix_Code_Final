import { ServicesIntro } from "./ServicesIntro";
import { ServicesOutro } from "./ServicesOutro";
import { ServicesTeaserGrid } from "./ServicesTeaserGrid";
import { Container } from "@/components/ui/Container";

/** The commercial heart of the site: eight disciplines, one accountable partner — condensed here, full detail on /services. */
export function Services() {
  return (
    <section id="services" aria-label="Services" className="relative bg-void">
      <ServicesIntro />
      <Container className="py-section">
        <ServicesTeaserGrid />
      </Container>
      <ServicesOutro />
    </section>
  );
}
