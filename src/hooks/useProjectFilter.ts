import { useMemo, useState } from "react";
import { WORK_FILTER_DEFAULT } from "@/content/projects";
import type { Project, WorkFilter } from "@/types";

interface ProjectFilter {
  activeFilter: WorkFilter;
  setActiveFilter: (filter: WorkFilter) => void;
  filteredProjects: Project[];
}

/** Shared local (non-routed) filter state for the /work index page. */
export function useProjectFilter(projects: Project[]): ProjectFilter {
  const [activeFilter, setActiveFilter] = useState<WorkFilter>(WORK_FILTER_DEFAULT);

  const filteredProjects = useMemo(
    () => projects.filter((project) => project.filter === activeFilter),
    [projects, activeFilter],
  );

  return { activeFilter, setActiveFilter, filteredProjects };
}
