import { Link } from "react-router-dom";
import { WORK_CURSOR_VIEW_LABEL, WORK_ROW_ARIA_PREFIX } from "@/content/projects";
import { cn } from "@/lib/utils";
import type { Project, ServiceAccent } from "@/types";

const ACCENT_HOVER_BORDER_CLASS: Record<ServiceAccent, string> = {
  ember: "hover:border-ember/25",
  amber: "hover:border-amber/25",
  blush: "hover:border-blush/25",
  violet: "hover:border-violet/25",
  mint: "hover:border-mint/25",
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

/** One case study card in the /work grid — number, category, title, year; full detail lives on the case-study page. */
export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link
      to={`/work/${project.slug}`}
      aria-label={`${WORK_ROW_ARIA_PREFIX} ${project.title}`}
      data-cursor="hover"
      data-cursor-text={WORK_CURSOR_VIEW_LABEL}
      className={cn(
        "group flex min-h-[220px] flex-col justify-between gap-10 rounded-xl border border-line bg-surface p-8 transition-colors duration-300 ease-out-expo hover:bg-surface-2",
        ACCENT_HOVER_BORDER_CLASS[project.accent],
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-label text-text-faint">{String(index + 1).padStart(2, "0")}</span>
        <span className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">{project.category}</span>
      </div>

      <h3 className="font-display text-h3 font-light text-text">{project.title}</h3>

      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-label text-text-faint">{project.year}</span>
        <span
          aria-hidden="true"
          className="text-h3 text-text transition-transform duration-300 ease-out-expo group-hover:rotate-12"
        >
          ↗
        </span>
      </div>
    </Link>
  );
}
