import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { NotFound } from "./NotFound";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { NextProject } from "@/components/work/NextProject";
import { ProjectGallery } from "@/components/work/ProjectGallery";
import { ProjectHero } from "@/components/work/ProjectHero";
import { ProjectMeta } from "@/components/work/ProjectMeta";
import { ProjectResults } from "@/components/work/ProjectResults";
import { PROJECTS, WORK_APPROACH_LABEL, WORK_CHALLENGE_LABEL, WORK_OUTCOME_LABEL } from "@/content/projects";
import { siteConfig } from "@/content/site";

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find((item) => item.slug === slug);

  if (!project) {
    return <NotFound />;
  }

  return (
    <>
      <Helmet>
        <title>{`${project.title} — ${siteConfig.name}`}</title>
        <meta name="description" content={project.summary} />
      </Helmet>

      <article>
        <ProjectHero project={project} />

        <Container className="grid grid-cols-1 gap-12 py-section lg:grid-cols-[3fr_9fr] lg:gap-16">
          <ProjectMeta project={project} />

          <div className="flex flex-col gap-16">
            <Reveal className="flex flex-col gap-4">
              <span className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">
                {WORK_CHALLENGE_LABEL}
              </span>
              <p className="max-w-[680px] text-body text-text-muted">{project.challenge}</p>
            </Reveal>

            <Reveal className="flex flex-col gap-4">
              <span className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">
                {WORK_APPROACH_LABEL}
              </span>
              <p className="max-w-[680px] text-body text-text-muted">{project.approach}</p>
            </Reveal>

            <Reveal className="flex flex-col gap-4">
              <span className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">
                {WORK_OUTCOME_LABEL}
              </span>
              <p className="max-w-[680px] text-body text-text-muted">{project.outcome}</p>
            </Reveal>
          </div>
        </Container>

        <ProjectGallery project={project} />
        <ProjectResults project={project} />

        {project.testimonial ? (
          <Container className="py-section">
            <Reveal>
              <blockquote className="mx-auto flex max-w-[720px] flex-col gap-6 border-l-2 border-ember pl-8">
                <p className="font-display text-h3 font-light text-text">&ldquo;{project.testimonial.quote}&rdquo;</p>
                <footer className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">
                  {project.testimonial.author} — {project.testimonial.role}
                </footer>
              </blockquote>
            </Reveal>
          </Container>
        ) : null}

        <NextProject current={project} />
      </article>
    </>
  );
}
