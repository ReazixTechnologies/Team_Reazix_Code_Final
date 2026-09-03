import { CapabilityTicker } from "./CapabilityTicker";
import { ManifestoStatement } from "./ManifestoStatement";

/** The scroll-lit studio statement — doubles as the homepage's "Introduction" beat right after Hero. */
export function Manifesto() {
  return (
    <section id="manifesto" className="relative bg-void">
      <CapabilityTicker />
      <ManifestoStatement />
    </section>
  );
}
