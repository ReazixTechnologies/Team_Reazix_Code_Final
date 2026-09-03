import { Eyebrow } from "@/components/ui/Eyebrow";
import { CONTACT_INTRO_DESCRIPTION, CONTACT_INTRO_EYEBROW, CONTACT_INTRO_HEADING } from "@/content/contact";
import { cn } from "@/lib/utils";

interface ContactIntroProps {
  /** The section's own h1/h2 — Home embeds this as h2, the standalone page uses h1. */
  headingId: string;
  HeadingTag?: "h1" | "h2";
}

/** Heading block for the contact section — kept a separate component so the /contact page can reuse it verbatim. */
export function ContactIntro({ headingId, HeadingTag = "h2" }: ContactIntroProps) {
  return (
    <div className="flex flex-col gap-5">
      <Eyebrow>{CONTACT_INTRO_EYEBROW}</Eyebrow>
      <HeadingTag
        id={headingId}
        className={cn("font-display font-light text-text", HeadingTag === "h1" ? "text-h1" : "text-h2")}
      >
        {CONTACT_INTRO_HEADING}
      </HeadingTag>
      <p className="max-w-[520px] text-body text-text-muted">{CONTACT_INTRO_DESCRIPTION}</p>
    </div>
  );
}
