import { Helmet } from "react-helmet-async";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProjectCard } from "@/components/sections/work/ProjectCard";
import {
  PROJECTS,
  WORK_INDEX_DESCRIPTION,
  WORK_INDEX_EYEBROW,
  WORK_INDEX_HEADING,
} from "@/content/projects";
import { siteConfig } from "@/content/site";
import { useState } from "react";

// Category definitions with icons and filter logic
const CATEGORIES = [
  { id: "all", name: "All", icon: "🎯" },
  { id: "web-application", name: "Web Applications", icon: "🌐" },
  { id: "crm", name: "CRM", icon: "📊" },
  { id: "apps", name: "Apps", icon: "📱" },
  { id: "digital-marketing", name: "Digital Marketing", icon: "📈" },
];

const CATEGORY_MAP: Record<string, string[]> = {
  "web-application": [
    "E-Commerce Platform",
    "Web Application",
    "SaaS Platform",
    "Fintech",
    "Real Estate",
    "Web",
    "Direct-to-Consumer Storefront",
  ],
  "crm": ["CRM", "Website + CRM", "Business System"],
  "apps": ["Mobile App", "Mobile", "React Native"],
  "digital-marketing": ["Digital Marketing", "SEO & Growth", "Marketing Site"],
};

export function WorkIndex() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeCategory === "all") return true;
    const allowed = CATEGORY_MAP[activeCategory] || [];
    return allowed.includes(project.category);
  });

  return (
    <>
      <Helmet>
        <title>{`${WORK_INDEX_HEADING} — ${siteConfig.name}`}</title>
        <meta name="description" content={WORK_INDEX_DESCRIPTION} />
      </Helmet>

      <section className="relative bg-void min-h-screen pt-24">
        {/* HEADER */}
        <Container>
          <div className="border-b border-line/30 pb-8 mb-10">
            <Eyebrow>{WORK_INDEX_EYEBROW}</Eyebrow>
            <div className="flex items-end justify-between mt-2">
              <div>
                <h1 className="font-display text-4xl md:text-5xl font-light text-text tracking-tight">
                  {WORK_INDEX_HEADING}
                </h1>
                <p className="text-text-muted text-sm mt-2 max-w-xl">
                  {WORK_INDEX_DESCRIPTION}
                </p>
              </div>
              <span className="text-sm text-text-faint font-mono whitespace-nowrap">
                {filteredProjects.length} Project{filteredProjects.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </Container>

        {/* CATEGORY FILTER */}
        <Container className="pb-10">
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => {
              let count = 0;
              if (category.id === "all") {
                count = PROJECTS.length;
              } else {
                const allowed = CATEGORY_MAP[category.id] || [];
                count = PROJECTS.filter((p) => allowed.includes(p.category)).length;
              }

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`group px-5 py-2.5 rounded-full border transition-all duration-300 text-sm font-mono ${
                    activeCategory === category.id
                      ? "border-ember bg-ember/10 text-ember"
                      : "border-line/30 bg-surface/10 text-text-muted hover:border-ember/30 hover:text-text hover:bg-surface/20"
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                  <span
                    className={`ml-2 text-xs ${
                      activeCategory === category.id ? "text-ember/60" : "text-text-faint"
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </Container>

        {/* PROJECT GRID */}
        <Container className="pb-20">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4 opacity-30">🔍</div>
              <p className="text-text-muted">No projects found in this category.</p>
              <button
                onClick={() => setActiveCategory("all")}
                className="mt-4 text-ember text-sm hover:text-ember/80 transition-colors"
              >
                View all projects →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}