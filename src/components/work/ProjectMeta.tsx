import { Project } from "@/types";

interface ProjectMetaProps {
  project: Project;
}

export function ProjectMeta({ project }: ProjectMetaProps) {
  return (
    <div className="flex flex-wrap gap-4 text-sm">
      <div>
        <span className="block font-mono text-xs uppercase tracking-wider text-text-faint">Client</span>
        <span className="text-text">{project.client}</span>
      </div>
      <div>
        <span className="block font-mono text-xs uppercase tracking-wider text-text-faint">Year</span>
        <span className="text-text">{project.year}</span>
      </div>
      <div>
        <span className="block font-mono text-xs uppercase tracking-wider text-text-faint">Duration</span>
        <span className="text-text">{project.duration}</span>
      </div>
    </div>
  );
}