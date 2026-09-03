import { Helmet } from "react-helmet-async";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  PRIVACY_EFFECTIVE_DATE,
  PRIVACY_PAGE_DESCRIPTION,
  PRIVACY_PAGE_TITLE,
  PRIVACY_SECTIONS,
} from "@/content/legal";
import { siteConfig } from "@/content/site";

export function PrivacyPolicyPage() {
  return (
    <>
      <Helmet>
        <title>{`${PRIVACY_PAGE_TITLE} — ${siteConfig.name}`}</title>
        <meta name="description" content={PRIVACY_PAGE_DESCRIPTION} />
      </Helmet>

      <section aria-labelledby="privacy-page-heading" className="relative bg-void">
        <Container className="flex flex-col gap-6 pb-12 pt-[calc(var(--spacing-section)+3rem)]">
          <Eyebrow>Legal</Eyebrow>
          <h1 id="privacy-page-heading" className="font-display text-h1 font-light text-text">
            {PRIVACY_PAGE_TITLE}
          </h1>
          <p className="text-body text-text-muted">Effective {PRIVACY_EFFECTIVE_DATE}</p>
        </Container>

        <Container className="flex max-w-[720px] flex-col gap-12 pb-section">
          {PRIVACY_SECTIONS.map((section) => (
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
