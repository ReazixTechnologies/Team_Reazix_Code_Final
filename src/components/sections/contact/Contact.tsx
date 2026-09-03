import { ContactAside } from "./ContactAside";
import { ContactForm } from "./ContactForm";
import { ContactIntro } from "./ContactIntro";
import { Container } from "@/components/ui/Container";
import { CurrencyProvider } from "@/hooks/useCurrency";

/** The conversion point: three-step form plus the direct-contact alternatives, immediately after the closing CTA. */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative bg-void">
      <Container className="grid grid-cols-1 gap-16 py-section lg:grid-cols-[7fr_5fr] lg:gap-20">
        <div className="flex flex-col gap-12">
          <ContactIntro headingId="contact-heading" />
          <CurrencyProvider>
            <ContactForm />
          </CurrencyProvider>
        </div>

        <ContactAside />
      </Container>
    </section>
  );
}
