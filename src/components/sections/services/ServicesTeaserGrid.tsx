import { ServiceTeaserCard } from "./ServiceTeaserCard";
import { Reveal } from "@/components/motion/Reveal";
import { SERVICES } from "@/content/services";
import { STAGGER } from "@/lib/motion";

/** Homepage overview: minimal 3/2/1-column grid, deep-links to the matching card on /services. */
export function ServicesTeaserGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICES.map((service, index) => (
        <Reveal key={service.id} delay={(index % 3) * STAGGER.tight}>
          <ServiceTeaserCard service={service} />
        </Reveal>
      ))}
    </div>
  );
}
