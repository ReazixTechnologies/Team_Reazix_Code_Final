import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PRICING_NOTES, PRICING_NOTES_EYEBROW } from "@/content/pricing";
import { STAGGER } from "@/lib/motion";

/** The honesty block: what actually moves the number, stated plainly. */
export function PricingNotes() {
  return (
    <div className="flex flex-col gap-10">
      <Eyebrow>{PRICING_NOTES_EYEBROW}</Eyebrow>

      <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
        {PRICING_NOTES.map((note, index) => (
          <Reveal key={note.label} delay={(index % 2) * STAGGER.base} className="flex flex-col gap-2 border-t border-line pt-5">
            <span className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">{note.label}</span>
            <p className="text-body text-text-muted">{note.description}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
