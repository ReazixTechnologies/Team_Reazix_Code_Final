import { Container } from "@/components/ui/Container";
import { Project } from "@/types";

interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  // Use gallery[0] for case study hero
  const heroImage = project.gallery?.[0] || project.cover;

  return (
    <div className="bg-void py-12">
      <Container>
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* LEFT SIDE - Image with Red Border */}
            <div className="relative p-6 md:p-8">
              <div className="border-4 border-red-600 rounded-xl overflow-hidden">
                <img
                  src={heroImage}
                  alt={`${project.title} — cover`}
                  className="w-full h-auto"
                  loading="eager"
                />
              </div>
            </div>

            {/* RIGHT SIDE - Text Content */}
            <div className="p-6 md:p-8 md:pr-10">
              <h1 className="text-3xl md:text-4xl font-light text-gray-900">
                {project.title}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {project.category} · {project.year}
              </p>

              <div className="mt-4 space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Client:</span> {project.client}</p>
                <p><span className="font-medium">Year:</span> {project.year}</p>
                <p><span className="font-medium">Duration:</span> {project.duration}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.services.slice(0, 3).map((service) => (
                  <span key={service} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}