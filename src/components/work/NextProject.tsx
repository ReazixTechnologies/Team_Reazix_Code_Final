import { Link } from "react-router-dom";
import { PROJECTS, WORK_NEXT_PROJECT_LABEL } from "@/content/projects";
import type { Project } from "@/types";

interface NextProjectProps {
  current: Project;
}

/** Full-width footer link to the next case study in the array, wrapping to the first. */
export function NextProject({ current }: NextProjectProps) {
  const currentIndex = PROJECTS.findIndex((project) => project.slug === current.slug);
  const next = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <Link
      to={`/work/${next.slug}`}
      data-cursor="hover"
      data-cursor-text={WORK_NEXT_PROJECT_LABEL}
      className="group relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-surface"
    >
      <img
        src={next.cover}
        alt=""
        width={1200}
        height={800}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-30 transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-void/50" />

      <div className="relative flex flex-col items-center gap-4 px-6 text-center">
        <span className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">
          {WORK_NEXT_PROJECT_LABEL}
        </span>
        <span className="font-display text-h1 font-light text-text transition-transform duration-500 ease-out-expo group-hover:translate-x-5">
          {next.title}
        </span>
      </div>
    </Link>
  );
}
