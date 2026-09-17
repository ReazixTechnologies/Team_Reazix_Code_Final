import { Helmet } from "react-helmet-async";
import { Contact } from "@/components/sections/contact/Contact";
import { siteConfig } from "@/content/site";

export function ContactPage() {
  return (
    <>
      <Helmet>
        <title>{`Contact — ${siteConfig.name}`}</title>
        <meta name="description" content="Get in touch with Reazix. Let's build something great together." />
      </Helmet>

      <div className="min-h-screen bg-void pt-24">
        <Contact />
      </div>
    </>
  );
}