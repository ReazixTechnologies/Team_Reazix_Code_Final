import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  SERVICES_OUTRO_CTA_LABEL,
  SERVICES_OUTRO_DESCRIPTION,
  SERVICES_OUTRO_HEADING,
} from "@/content/services";

/** Closes the services band: a soft reassurance + the primary CTA. */
export function ServicesOutro() {
  return (
    <Container className="flex flex-col items-center gap-6 pb-section pt-section text-center">
      <h3 className="font-display text-h3 font-light text-text">{SERVICES_OUTRO_HEADING}</h3>
      <p className="max-w-md text-body text-text-muted">{SERVICES_OUTRO_DESCRIPTION}</p>
      <Magnetic>
        <Button variant="primary" size="lg">
          {SERVICES_OUTRO_CTA_LABEL}
        </Button>
      </Magnetic>
    </Container>
  );
}
