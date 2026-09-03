import { SplitText } from "@/components/motion/SplitText";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  SERVICES_INTRO_DESCRIPTION,
  SERVICES_INTRO_EYEBROW,
  SERVICES_INTRO_HEADING_LINES,
  SERVICES_INTRO_RANGE_LABEL,
} from "@/content/services";

/** Heading block + the "one partner" argument that opens the services band. */
export function ServicesIntro() {
  return (
    <Container className="flex flex-col gap-16 pt-section">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[7fr_5fr] lg:gap-16">
        <div className="flex flex-col gap-5">
          <Eyebrow>{SERVICES_INTRO_EYEBROW}</Eyebrow>
          <h2 className="flex flex-col font-display text-h2 font-light text-text">
            {SERVICES_INTRO_HEADING_LINES.map((line) => (
              <SplitText key={line} text={line} as="span" className="block" />
            ))}
          </h2>
        </div>

        <p className="max-w-[520px] text-body text-text-muted lg:justify-self-end lg:text-right">
          {SERVICES_INTRO_DESCRIPTION}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="self-end font-mono text-label uppercase tracking-[0.22em] text-text-faint">
          {SERVICES_INTRO_RANGE_LABEL}
        </span>
        <div aria-hidden="true" className="h-px w-full bg-line" />
      </div>
    </Container>
  );
}
