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

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col rounded-xl border border-line bg-surface overflow-hidden transition-colors duration-300 ease-out-expo hover:bg-surface-2",
        ACCENT_HOVER_BORDER_CLASS[project.accent],
      )}
    >
      {/* IMAGE — click opens live site */}
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.title} official website`}
          data-cursor="hover"
          data-cursor-text="Visit"
          className="block relative aspect-video overflow-hidden bg-surface-2"
        >
          <img
            src={project.cover}
            alt={`${project.title} — cover`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <span className="absolute top-3 right-3 rounded-full bg-void/70 backdrop-blur-sm px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-text-muted border border-line/40">
            Visit ↗
          </span>
        </a>
      ) : (
        <Link
          to={`/work/${project.slug}`}
          aria-label={`${WORK_ROW_ARIA_PREFIX} ${project.title}`}
          data-cursor="hover"
          data-cursor-text={WORK_CURSOR_VIEW_LABEL}
          className="block aspect-video overflow-hidden bg-surface-2"
        >
          <img
            src={project.cover}
            alt={`${project.title} — cover`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </Link>
      )}

      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-label text-text-faint">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">
            {project.category}
          </span>
        </div>

        <h3 className="font-display text-h3 font-light text-text">{project.title}</h3>

        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-label text-text-faint">{project.year}</span>

          <Link
            to={`/work/${project.slug}`}
            aria-label={`${WORK_ROW_ARIA_PREFIX} ${project.title}`}
            data-cursor="hover"
            data-cursor-text={WORK_CURSOR_VIEW_LABEL}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ember/70 hover:text-ember transition-all duration-300 group/link"
          >
            <span>View Case Study</span>
            <span className="transition-transform duration-300 group-hover/link:translate-x-1.5">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}