import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { Service, ServiceAccent } from "@/types";

const ACCENT_HOVER_BORDER_CLASS: Record<ServiceAccent, string> = {
  ember: "hover:border-ember/25",
  amber: "hover:border-amber/25",
  blush: "hover:border-blush/25",
  violet: "hover:border-violet/25",
  mint: "hover:border-mint/25",
};

interface ServiceTeaserCardProps {
  service: Service;
}

/** Condensed homepage card: number, title, tagline — full detail lives one click away on /services. */
export function ServiceTeaserCard({ service }: ServiceTeaserCardProps) {
  return (
    <Link
      to={`/services#service-${service.id}`}
      aria-label={`${service.title} — view full service details`}
      data-cursor="hover"
      className={cn(
        "group flex flex-col gap-6 rounded-xl border border-line bg-surface p-8 transition-colors duration-500 ease-out-expo hover:bg-surface-2",
        ACCENT_HOVER_BORDER_CLASS[service.accent],
      )}
    >
      <span aria-hidden="true" className="font-display text-h2 font-light leading-none text-text/[0.16]">
        {service.index}
      </span>

      <div className="flex flex-col gap-2">
        <h3 className="font-display text-h3 font-light text-text">{service.title}</h3>
        <p className="text-body text-text-muted">{service.tagline}</p>
      </div>
    </Link>
  );
}
