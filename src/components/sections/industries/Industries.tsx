import { IndustryGrid } from "./IndustryGrid";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { INDUSTRIES_DESCRIPTION, INDUSTRIES_EYEBROW, INDUSTRIES_HEADING } from "@/content/industries";

/** Proves domain fluency: eight sectors, each with the specific problem we solve for it. */
export function Industries() {
  return (
    <section id="industries" aria-labelledby="industries-heading" className="relative bg-void">
      <Container className="flex flex-col gap-16 py-section">
        <div className="flex flex-col gap-5">
          <Eyebrow>{INDUSTRIES_EYEBROW}</Eyebrow>
          <h2 id="industries-heading" className="max-w-2xl font-display text-h2 font-light text-text">
            {INDUSTRIES_HEADING}
          </h2>
          <p className="max-w-2xl text-body text-text-muted">{INDUSTRIES_DESCRIPTION}</p>
        </div>

        <IndustryGrid />
      </Container>
    </section>
  );
}
