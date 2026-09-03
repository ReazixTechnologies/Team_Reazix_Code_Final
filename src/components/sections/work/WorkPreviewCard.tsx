import { Link } from "react-router-dom";
import { PROJECTS, WORK_CURSOR_VIEW_LABEL, type WorkPreviewItem } from "@/content/projects";
import { cn } from "@/lib/utils";

interface WorkPreviewCardProps {
  item: WorkPreviewItem;
  /** "01" on the featured card only — the small cards carry no index. */
  index?: string;
}

/** One card in the homepage work teaser: image, category, title, year — full detail lives on /work. */
export function WorkPreviewCard({ item, index }: WorkPreviewCardProps) {
  const project = PROJECTS.find((candidate) => candidate.slug === item.slug);
  if (!project) return null;

  const isLarge = item.size === "large";

  return (
    <Link
      to={`/work/${project.slug}`}
      aria-label={`View case study: ${project.title}`}
      data-cursor="hover"
      data-cursor-text={WORK_CURSOR_VIEW_LABEL}
      className="group flex flex-col gap-6"
    >
      <div
        className={cn(
          "w-full overflow-hidden rounded-lg bg-surface",
          isLarge ? "aspect-[16/9]" : "aspect-[4/3]",
        )}
      >
        <img
          src={project.cover}
          alt={`${project.title} — cover`}
          width={1200}
          height={isLarge ? 675 : 900}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-300 ease-out-expo group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-3">
        <span className="font-mono text-label uppercase tracking-[0.22em] text-text-faint transition-colors duration-300 group-hover:text-ember">
          {isLarge && index ? `${index} / ${item.categoryLabel}` : item.categoryLabel}
        </span>

        <h3 className={cn("font-display font-light text-text", isLarge ? "text-h2" : "text-h3")}>{item.title}</h3>

        {isLarge ? (
          <div className="flex items-center justify-between">
            <span className="font-mono text-label text-text-faint">{project.year}</span>
            <span
              aria-hidden="true"
              className="text-h3 text-text transition-transform duration-300 ease-out-expo group-hover:rotate-12"
            >
              ↗
            </span>
          </div>
        ) : (
          <span className="font-mono text-label text-text-faint">{project.year}</span>
        )}
      </div>
    </Link>
  );
}
