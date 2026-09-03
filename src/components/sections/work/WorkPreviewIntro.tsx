import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { WORK_PREVIEW_EYEBROW, WORK_PREVIEW_HEADING } from "@/content/projects";

/** Heading block that opens the homepage work teaser — no filters, those stay on /work. */
export function WorkPreviewIntro() {
  return (
    <Container className="flex flex-col gap-5 pt-section">
      <Eyebrow>{WORK_PREVIEW_EYEBROW}</Eyebrow>
      <h2 id="work-heading" className="font-display text-h2 font-light text-text">
        {WORK_PREVIEW_HEADING}
      </h2>
    </Container>
  );
}
