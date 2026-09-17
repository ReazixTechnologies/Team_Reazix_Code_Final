import { WorkPreviewCard } from "./WorkPreviewCard";
import { Reveal } from "@/components/motion/Reveal";
import { WORK_PREVIEW_ITEMS } from "@/content/projects";
import { STAGGER } from "@/lib/motion";

export function WorkPreviewGrid() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
      {WORK_PREVIEW_ITEMS.map((item, index) => (
        <Reveal key={item.slug} delay={index * STAGGER.base}>
          <WorkPreviewCard item={item} index={String(index + 1).padStart(2, "0")} />
        </Reveal>
      ))}
    </div>
  );
}