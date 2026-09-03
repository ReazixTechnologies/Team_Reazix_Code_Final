import { motion } from "motion/react";
import { Parallax } from "@/components/motion/Parallax";
import { SplitText } from "@/components/motion/SplitText";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/motion";
import type { Project } from "@/types";

interface ProjectHeroProps {
  project: Project;
}

/** Detail page hero: category/year, the title reveal, summary, and a clip-path-wiped cover image. */
export function ProjectHero({ project }: ProjectHeroProps) {
  const reducedMotion = useReducedMotion();

  return (
    <header className="relative bg-void">
      <Container className="flex flex-col gap-8 pt-[calc(var(--spacing-section)+3rem)]">
        <div className="flex items-center gap-3 font-mono text-label uppercase tracking-[0.22em] text-text-faint">
          <span>{project.category}</span>
          <span aria-hidden="true">·</span>
          <span>{project.year}</span>
        </div>

        <h1 className="max-w-[900px] font-display text-display font-light leading-none text-text">
          <SplitText text={project.title} as="span" className="block" />
        </h1>

        <p className="max-w-[620px] text-body text-text-muted">{project.summary}</p>
      </Container>

      <Container className="pt-16">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-surface">
          <Parallax offset={60} className="absolute inset-0">
            <motion.img
              src={project.cover}
              alt={`${project.title} — cover`}
              width={1200}
              height={800}
              className="h-full w-full object-cover"
              initial={reducedMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
              whileInView={reducedMotion ? undefined : { clipPath: "inset(0 0 0% 0)" }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.1, ease: EASE }}
            />
          </Parallax>
        </div>
      </Container>
    </header>
  );
}
