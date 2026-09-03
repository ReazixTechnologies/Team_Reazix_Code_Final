import { FadingDivider } from "@/components/ui/FadingDivider";
import { TrustStrip } from "./TrustStrip";

/** "Why Reazix" band — proof-by-association and the soft push into Work. */
export function WhyReazix() {
  return (
    <section id="why-reazix" aria-label="Why Reazix" className="relative bg-void">
      <FadingDivider />
      <div className="py-section">
        <TrustStrip />
      </div>
    </section>
  );
}
