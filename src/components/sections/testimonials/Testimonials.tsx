import { TestimonialRail } from "./TestimonialRail";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { testimonials, TESTIMONIALS_EYEBROW, TESTIMONIALS_HEADING } from "@/content/testimonials";

/** Renders nothing until real quotes exist — see the honesty note in src/content/testimonials.ts. */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="relative bg-void">
      <Container className="flex flex-col gap-16 py-section">
        <div className="flex flex-col gap-5">
          <Eyebrow>{TESTIMONIALS_EYEBROW}</Eyebrow>
          <h2 id="testimonials-heading" className="font-display text-h2 font-light text-text">
            {TESTIMONIALS_HEADING}
          </h2>
        </div>

        <TestimonialRail testimonials={testimonials} />
      </Container>
    </section>
  );
}
