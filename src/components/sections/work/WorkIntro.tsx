import { WorkFilterRow } from "./WorkFilterRow";
import { SplitText } from "@/components/motion/SplitText";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { WORK_INTRO_DESCRIPTION, WORK_INTRO_EYEBROW, WORK_INTRO_HEADING_LINES } from "@/content/projects";
import type { WorkFilter } from "@/types";

interface WorkIntroProps {
  activeFilter: WorkFilter;
  onFilterChange: (filter: WorkFilter) => void;
}

/** Heading block + filter row that opens the homepage work teaser. */
export function WorkIntro({ activeFilter, onFilterChange }: WorkIntroProps) {
  return (
    <Container className="flex flex-col gap-12 pt-section">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[7fr_5fr] lg:gap-16">
        <div className="flex flex-col gap-5">
          <Eyebrow>{WORK_INTRO_EYEBROW}</Eyebrow>
          <h2 id="work-heading" className="flex flex-col font-display text-h2 font-light text-text">
            {WORK_INTRO_HEADING_LINES.map((line) => (
              <SplitText key={line} text={line} as="span" className="block" />
            ))}
          </h2>
        </div>

        <p className="max-w-[460px] text-body text-text-muted lg:justify-self-end lg:text-right">
          {WORK_INTRO_DESCRIPTION}
        </p>
      </div>

      <WorkFilterRow activeFilter={activeFilter} onFilterChange={onFilterChange} />
    </Container>
  );
}
