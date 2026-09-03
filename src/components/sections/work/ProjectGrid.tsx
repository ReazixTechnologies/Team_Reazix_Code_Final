import { ProjectCard } from "./ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { WORK_EMPTY_FILTER_MESSAGE } from "@/content/projects";
import { STAGGER } from "@/lib/motion";
import type { Project } from "@/types";

interface ProjectGridProps {
  projects: Project[];
}

/** The /work case-study grid: 2 columns on desktop, 1 on mobile. */
export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return <p className="py-16 text-body text-text-muted">{WORK_EMPTY_FILTER_MESSAGE}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {projects.map((project, index) => (
        <Reveal key={project.slug} delay={(index % 2) * STAGGER.base}>
          <ProjectCard project={project} index={index} />
        </Reveal>
      ))}
    </div>
  );
}
