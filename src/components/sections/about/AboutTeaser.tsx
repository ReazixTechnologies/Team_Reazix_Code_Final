import { Link } from "react-router-dom";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ABOUT_TEASER_BODY, ABOUT_TEASER_CTA_LABEL, ABOUT_TEASER_EYEBROW, ABOUT_TEASER_HEADING } from "@/content/about";

export function AboutTeaser() {
  return (
    <section id="about" aria-label="About Reazix" className="relative border-t border-line bg-void">
      <Container className="flex flex-col items-start gap-8 py-section">
        <Reveal className="flex flex-col gap-6">
          <Eyebrow>{ABOUT_TEASER_EYEBROW}</Eyebrow>
          <h2 className="max-w-2xl text-h2 font-display font-light text-text">{ABOUT_TEASER_HEADING}</h2>
          <p className="max-w-xl text-body text-text-muted">{ABOUT_TEASER_BODY}</p>
        </Reveal>

        <Magnetic strength={0.35}>
          <Link
            to="/about"
            data-cursor="hover"
            className="font-mono text-label uppercase tracking-[0.22em] text-text-muted transition-colors duration-300 hover:text-text"
          >
            {ABOUT_TEASER_CTA_LABEL} →
          </Link>
        </Magnetic>
      </Container>
    </section>
  );
}
