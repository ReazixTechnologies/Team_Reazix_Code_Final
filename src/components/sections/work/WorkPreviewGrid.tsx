import { WorkPreviewCard } from "./WorkPreviewCard";
import { Reveal } from "@/components/motion/Reveal";
import { WORK_PREVIEW_ITEMS } from "@/content/projects";
import { STAGGER } from "@/lib/motion";

/** One featured case study, then two smaller ones side by side — stacks to one column on mobile. */
export function WorkPreviewGrid() {
  const [featured, ...rest] = WORK_PREVIEW_ITEMS;

  return (
    <div className="flex flex-col gap-10 lg:gap-12">
      <Reveal>
        <WorkPreviewCard item={featured} index="01" />
      </Reveal>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:gap-12">
        {rest.map((item, position) => (
          <Reveal key={item.slug} delay={(position + 1) * STAGGER.base}>
            <WorkPreviewCard item={item} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
