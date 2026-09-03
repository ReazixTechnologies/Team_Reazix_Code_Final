import { Helmet } from "react-helmet-async";
import { ContactAside } from "@/components/sections/contact/ContactAside";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactIntro } from "@/components/sections/contact/ContactIntro";
import { Container } from "@/components/ui/Container";
import { CONTACT_PAGE_DESCRIPTION, CONTACT_PAGE_TITLE } from "@/content/contact";
import { siteConfig } from "@/content/site";
import { CurrencyProvider } from "@/hooks/useCurrency";

/** /contact — the standalone version of the conversion point, for anyone who lands here directly. */
export function ContactPage() {
  return (
    <>
      <Helmet>
        <title>{`${CONTACT_PAGE_TITLE} — ${siteConfig.name}`}</title>
        <meta name="description" content={CONTACT_PAGE_DESCRIPTION} />
      </Helmet>

      <section id="contact" aria-labelledby="contact-page-heading" className="relative bg-void">
        <Container className="grid grid-cols-1 gap-16 py-[calc(var(--spacing-section)+3rem)] lg:grid-cols-[7fr_5fr] lg:gap-20">
          <div className="flex flex-col gap-12">
            <ContactIntro headingId="contact-page-heading" HeadingTag="h1" />
            <CurrencyProvider>
              <ContactForm />
            </CurrencyProvider>
          </div>

          <ContactAside />
        </Container>
      </section>
    </>
  );
}
