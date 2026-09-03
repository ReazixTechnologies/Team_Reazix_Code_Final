import { WORK_META_LABELS } from "@/content/projects";
import type { Project } from "@/types";

interface ProjectMetaProps {
  project: Project;
}

interface MetaRow {
  label: string;
  value: string | string[];
}

/** Sticky (desktop) sidebar of hairline-separated facts: client type, year, duration, services, stack. */
export function ProjectMeta({ project }: ProjectMetaProps) {
  const rows: MetaRow[] = [
    { label: WORK_META_LABELS.client, value: project.client },
    { label: WORK_META_LABELS.year, value: project.year },
    { label: WORK_META_LABELS.duration, value: project.duration },
    { label: WORK_META_LABELS.services, value: project.services },
    { label: WORK_META_LABELS.stack, value: project.stack },
  ];

  return (
    <aside className="flex flex-col divide-y divide-line border-y border-line lg:sticky lg:top-32 lg:h-fit lg:border-y-0 lg:divide-y lg:divide-line">
      {rows.map((row) => (
        <div key={row.label} className="flex flex-col gap-2 py-5 first:pt-0 lg:first:pt-5">
          <span className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">{row.label}</span>
          {Array.isArray(row.value) ? (
            <ul className="flex flex-col gap-1">
              {row.value.map((item) => (
                <li key={item} className="text-body text-text">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-body text-text">{row.value}</span>
          )}
        </div>
      ))}
    </aside>
  );
}
