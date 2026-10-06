import { Seo } from "@/components/seo/Seo";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TERMS_EFFECTIVE_DATE, TERMS_PAGE_TITLE, TERMS_SECTIONS } from "@/content/legal";

export function TermsPage() {
  return (
    <>
      <Seo path="/terms" />

      <section aria-labelledby="terms-page-heading" className="relative bg-void">
        <Container className="flex flex-col gap-6 pb-12 pt-[calc(var(--spacing-section)+3rem)]">
          <Eyebrow>Legal</Eyebrow>
          <h1 id="terms-page-heading" className="font-display text-h1 font-light text-text">
            {TERMS_PAGE_TITLE}
          </h1>
          <p className="text-body text-text-muted">Effective {TERMS_EFFECTIVE_DATE}</p>
        </Container>

        <Container className="flex max-w-[720px] flex-col gap-12 pb-section">
          {TERMS_SECTIONS.map((section) => (
            <div key={section.heading} className="flex flex-col gap-4">
              <h2 className="text-h3 font-display font-light text-text">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-body text-text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
