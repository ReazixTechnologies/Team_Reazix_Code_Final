import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { NotFound } from "./NotFound";
import { Container } from "@/components/ui/Container";
import { NextProject } from "@/components/work/NextProject";
import { ProjectHero } from "@/components/work/ProjectHero";
import { PROJECTS } from "@/content/projects";
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

      <article className="min-h-screen bg-void pt-20">
        
        {/* Hero - Image Left with Red Border */}
        <ProjectHero project={project} />

        {/* White Document Content */}
        <Container className="py-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            
            {/* Summary */}
            <div className="mb-10">
              <p className="text-gray-600 text-base leading-relaxed">
                {project.summary}
              </p>
            </div>

            {/* 1. Challenge */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-red-600 pb-2 mb-4">
                1. The Challenge
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* 2. Approach */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-red-600 pb-2 mb-4">
                2. Our Approach
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {project.approach}
              </p>
            </div>

            {/* 3. Outcome */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-red-600 pb-2 mb-4">
                3. The Outcome
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {project.outcome}
              </p>
            </div>

            {/* 4. Services & Technology */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-red-600 pb-2 mb-4">
                4. Services & Technology
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">Services</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {project.services.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Results */}
            {project.results && project.results.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-red-600 pb-2 mb-4">
                  5. Key Results
                </h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {project.results.map((result) => (
                    <div key={result.label} className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-light text-gray-900">
                        {result.value}{result.suffix}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{result.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </Container>

        <NextProject current={project} />
      </article>
    </>
  );
}