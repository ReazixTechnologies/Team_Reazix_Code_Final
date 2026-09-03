import { Helmet } from "react-helmet-async";
import { ProjectGrid } from "@/components/sections/work/ProjectGrid";
import { WorkFilterRow } from "@/components/sections/work/WorkFilterRow";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PROJECTS, WORK_INDEX_DESCRIPTION, WORK_INDEX_EYEBROW, WORK_INDEX_HEADING } from "@/content/projects";
import { siteConfig } from "@/content/site";
import { useProjectFilter } from "@/hooks/useProjectFilter";

export function WorkIndex() {
  const { activeFilter, setActiveFilter, filteredProjects } = useProjectFilter(PROJECTS);

  return (
    <>
      <Helmet>
        <title>{`${WORK_INDEX_HEADING} — ${siteConfig.name}`}</title>
        <meta name="description" content={WORK_INDEX_DESCRIPTION} />
      </Helmet>

      <section aria-labelledby="work-index-heading" className="relative bg-void">
        <Container className="flex flex-col gap-6 pb-12 pt-[calc(var(--spacing-section)+3rem)]">
          <Eyebrow>{WORK_INDEX_EYEBROW}</Eyebrow>
          <h1 id="work-index-heading" className="font-display text-h1 font-light text-text">
            {WORK_INDEX_HEADING}
          </h1>
          <p className="max-w-[560px] text-body text-text-muted">{WORK_INDEX_DESCRIPTION}</p>
        </Container>

        <Container className="pb-8">
          <WorkFilterRow activeFilter={activeFilter} onFilterChange={setActiveFilter} layoutId="work-index-filter-pill" />
        </Container>

        <Container className="pb-section">
          <ProjectGrid projects={filteredProjects} />
        </Container>
      </section>
    </>
  );
}
