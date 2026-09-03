import { Helmet } from "react-helmet-async";
import { Reveal } from "@/components/motion/Reveal";
import { Team } from "@/components/sections/team/Team";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  ABOUT_INTRO_PARAGRAPHS,
  ABOUT_PAGE_DESCRIPTION,
  ABOUT_PAGE_EYEBROW,
  ABOUT_PAGE_HEADING,
  ABOUT_PAGE_TITLE,
  ABOUT_VALUES,
} from "@/content/about";
import { siteConfig } from "@/content/site";
import { STAGGER } from "@/lib/motion";

/** /about — the studio story, standing behind the "About Reazix" teaser on the homepage. */
export function AboutPage() {
  return (
    <>
      <Helmet>
        <title>{`${ABOUT_PAGE_TITLE} — ${siteConfig.name}`}</title>
        <meta name="description" content={ABOUT_PAGE_DESCRIPTION} />
      </Helmet>

      <section aria-labelledby="about-page-heading" className="relative bg-void">
        <Container className="flex flex-col gap-6 pb-12 pt-[calc(var(--spacing-section)+3rem)]">
          <Eyebrow>{ABOUT_PAGE_EYEBROW}</Eyebrow>
          <h1 id="about-page-heading" className="font-display text-h1 font-light text-text">
            {ABOUT_PAGE_HEADING}
          </h1>
        </Container>

        <Container className="flex flex-col gap-6 pb-section">
          {ABOUT_INTRO_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph} className="max-w-[720px] text-body text-text-muted">
              {paragraph}
            </p>
          ))}
        </Container>
      </section>

      <section aria-label="What we value" className="relative border-t border-line bg-void">
        <Container className="grid grid-cols-1 gap-8 py-section sm:grid-cols-2">
          {ABOUT_VALUES.map((value, index) => (
            <Reveal key={value.title} delay={index * STAGGER.tight} className="flex flex-col gap-3 border-t border-line pt-6">
              <h3 className="font-display text-h3 font-light text-text">{value.title}</h3>
              <p className="text-body text-text-muted">{value.description}</p>
            </Reveal>
          ))}
        </Container>
      </section>

      <Team />
    </>
  );
}
