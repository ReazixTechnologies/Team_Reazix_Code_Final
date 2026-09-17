import { ContactIntro } from "./ContactIntro";
import { ContactForm } from "./ContactForm";
import { Container } from "@/components/ui/Container";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative bg-void py-16 md:py-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-ember/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          
          {/* LEFT SIDE - Intro (4 columns) */}
          <div className="lg:col-span-4">
            <ContactIntro />
          </div>
          
          {/* RIGHT SIDE - Form with Red Border (8 columns) */}
          <div className="lg:col-span-8">
            <div className="border-2 border-red-600 rounded-2xl p-1">
              <div className="bg-surface/20 backdrop-blur-sm rounded-2xl p-6 md:p-8 lg:p-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}