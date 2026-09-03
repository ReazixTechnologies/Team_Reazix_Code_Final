import { Link } from "react-router-dom";
import { Magnetic } from "@/components/motion/Magnetic";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WORK_OUTRO_CTA_LABEL, WORK_OUTRO_DESCRIPTION, WORK_OUTRO_HEADING } from "@/content/projects";

export function WorkOutro() {
  return (
    <Container className="flex flex-col items-center gap-6 pb-section pt-section text-center">
      <h3 className="font-display text-h3 font-light text-text">{WORK_OUTRO_HEADING}</h3>
      <p className="max-w-md text-body text-text-muted">{WORK_OUTRO_DESCRIPTION}</p>
      <Magnetic>
        <Link to="/work" data-cursor="hover" className={buttonClasses({ variant: "primary", size: "lg" })}>
          {WORK_OUTRO_CTA_LABEL}
        </Link>
      </Magnetic>
    </Container>
  );
}
