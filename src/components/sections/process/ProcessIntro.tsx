import { SplitText } from "@/components/motion/SplitText";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  PROCESS_INTRO_DESCRIPTION,
  PROCESS_INTRO_EYEBROW,
  PROCESS_INTRO_FACTS,
  PROCESS_INTRO_HEADING_LINES,
} from "@/content/process";

/** Heading + the predictability argument that opens the process band. */
export function ProcessIntro() {
  return (
    <Container className="flex flex-col gap-16 pt-section">
      <div className="flex flex-col gap-6">
        <Eyebrow>{PROCESS_INTRO_EYEBROW}</Eyebrow>
        <h2 id="process-heading" className="flex flex-col font-display text-h2 font-light text-text">
          {PROCESS_INTRO_HEADING_LINES.map((line) => (
            <SplitText key={line} text={line} as="span" className="block" />
          ))}
        </h2>
        <p className="max-w-[560px] text-body text-text-muted">{PROCESS_INTRO_DESCRIPTION}</p>
      </div>

      <div className="flex flex-wrap items-center divide-x divide-line">
        {PROCESS_INTRO_FACTS.map((fact) => (
          <span
            key={fact}
            className="px-6 py-1 font-mono text-label uppercase tracking-[0.22em] text-text-faint first:pl-0"
          >
            {fact}
          </span>
        ))}
      </div>
    </Container>
  );
}
