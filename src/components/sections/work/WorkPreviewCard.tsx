import { Link } from "react-router-dom";
import {
  PROJECTS,
  WORK_CURSOR_VIEW_LABEL,
  type WorkPreviewItem,
} from "@/content/projects";
import { cn } from "@/lib/utils";

interface WorkPreviewCardProps {
  item: WorkPreviewItem;
  index?: string;
}

/**
 * Homepage work card.
 * - Clicking the image → opens the live site in a new tab
 * - Clicking "View Case Study" → opens the internal case study page
 */
export function WorkPreviewCard({ item, index }: WorkPreviewCardProps) {
  const project = PROJECTS.find((candidate) => candidate.slug === item.slug);
  if (!project) return null;

  const isLarge = item.size === "large";

  return (
    <div className="group flex flex-col gap-4">
      {/* IMAGE — always shows; click opens live site if available, else case study */}
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.title} official website`}
          data-cursor="hover"
          data-cursor-text="Visit"
          className={cn(
            "relative block w-full overflow-hidden rounded-xl bg-surface border border-line",
            isLarge ? "aspect-video" : "aspect-4/3",
          )}
        >
          <img
            src={project.cover}
            alt={`${project.title} — cover`}
            className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
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
          aria-label={`View case study: ${project.title}`}
          data-cursor="hover"
          data-cursor-text={WORK_CURSOR_VIEW_LABEL}
          className={cn(
            "relative block w-full overflow-hidden rounded-xl bg-surface border border-line",
            isLarge ? "aspect-video" : "aspect-4/3",
          )}
        >
          <img
            src={project.cover}
            alt={`${project.title} — cover`}
            className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </Link>
      )}

      {/* TEXT */}
      <div className="flex flex-col gap-2">
        <span className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">
          {isLarge && index ? `${index} / ${item.categoryLabel}` : item.categoryLabel}
        </span>

        <h3 className={cn("font-display font-light text-text", isLarge ? "text-2xl" : "text-xl")}>
          {project.title}
        </h3>

        <Link
          to={`/work/${project.slug}`}
          aria-label={`View case study: ${project.title}`}
          data-cursor="hover"
          data-cursor-text={WORK_CURSOR_VIEW_LABEL}
          className="inline-flex items-center gap-2 text-sm text-ember/70 hover:text-ember transition-all duration-300 group/link"
        >
          <span>View Case Study</span>
          <span className="transition-transform duration-300 group-hover/link:translate-x-1.5">→</span>
        </Link>
      </div>
    </div>
  );
}