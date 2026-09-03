import { Helmet } from "react-helmet-async";
import { WorkPreviewGrid } from "./WorkPreviewGrid";
import { WorkPreviewIntro } from "./WorkPreviewIntro";
import { WorkPreviewOutro } from "./WorkPreviewOutro";
import { Container } from "@/components/ui/Container";
import { PROJECTS, WORK_PREVIEW_ITEMS } from "@/content/projects";

/** Homepage proof section: three curated case studies, full list lives on /work. */
export function Work() {
  const featuredProjects = PROJECTS.filter((project) =>
    WORK_PREVIEW_ITEMS.some((item) => item.slug === project.slug),
  );

  return (
    <section id="work" aria-labelledby="work-heading" className="relative bg-void">
      <Helmet>
        {featuredProjects.map((project) => (
          <link key={project.slug} rel="preload" as="image" href={project.cover} />
        ))}
      </Helmet>

      <WorkPreviewIntro />

      <Container className="py-section">
        <WorkPreviewGrid />
      </Container>

      <WorkPreviewOutro />
    </section>
  );
}
