import { Link } from "react-router-dom";
import { Magnetic } from "@/components/motion/Magnetic";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WORK_PREVIEW_VIEW_ALL_LABEL } from "@/content/projects";

/** Centered CTA below the homepage work teaser grid, out to the full case-study list. */
export function WorkPreviewOutro() {
  return (
    <Container className="flex justify-center pb-section pt-16">
      <Magnetic>
        <Link to="/work" data-cursor="hover" className={buttonClasses({ variant: "outline", size: "lg" })}>
          {WORK_PREVIEW_VIEW_ALL_LABEL} <span aria-hidden="true">→</span>
        </Link>
      </Magnetic>
    </Container>
  );
}
