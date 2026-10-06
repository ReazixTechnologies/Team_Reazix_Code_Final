import { Seo } from "@/components/seo/Seo";
import { Contact } from "@/components/sections/contact/Contact";

export function ContactPage() {
  return (
    <>
      <Seo path="/contact" />

      <div className="min-h-screen bg-void pt-24">
        <Contact />
      </div>
    </>
  );
}