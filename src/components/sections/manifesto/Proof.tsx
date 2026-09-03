import { FadingDivider } from "@/components/ui/FadingDivider";
import { StatGrid } from "./StatGrid";

/** "Proof / Work Results" band — the numbers that back up the pitch. */
export function Proof() {
  return (
    <section id="proof" aria-label="Proof" className="relative bg-void">
      <FadingDivider />
      <div className="py-section">
        <StatGrid />
      </div>
    </section>
  );
}
