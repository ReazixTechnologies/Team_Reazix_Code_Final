import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { WORK_RESULTS_LABEL } from "@/content/projects";
import { STAGGER } from "@/lib/motion";
import type { Project } from "@/types";

interface ProjectResultsProps {
  project: Project;
}

/** Metric tiles laid out like Module 4's StatGrid, each carrying its illustrative-note until real numbers replace it. */
export function ProjectResults({ project }: ProjectResultsProps) {
  return (
    <Container className="flex flex-col gap-10 py-section">
      <span className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">{WORK_RESULTS_LABEL}</span>

      <div className="grid grid-cols-1 border border-line sm:grid-cols-2 lg:grid-cols-3">
        {project.results.map((result, index) => (
          <Reveal
            key={result.label}
            delay={index * STAGGER.loose}
            className="flex flex-col gap-4 border-b border-line px-6 py-10 last:border-b-0 sm:border-b-0 sm:px-8 sm:py-12 sm:[&:not(:last-child)]:border-r"
          >
            <div className="flex flex-wrap items-end gap-1">
              <AnimatedCounter
                value={result.value}
                decimals={result.decimals ?? 0}
                prefix={result.prefix}
                className="text-h1 font-display font-light tabular-nums text-text"
              />
              {result.suffix ? (
                <span className="pb-2 text-h3 font-display font-light text-ember">{result.suffix}</span>
              ) : null}
            </div>
            <p className="text-body text-text-muted">{result.label}</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint">{result.note}</p>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
