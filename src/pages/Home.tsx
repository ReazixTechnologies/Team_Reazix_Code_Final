import { AboutTeaser } from "@/components/sections/about/AboutTeaser";
import { Contact } from "@/components/sections/contact/Contact";
import { ClosingCta } from "@/components/sections/cta/ClosingCta";
import { Faq } from "@/components/sections/faq/Faq";
import { Hero } from "@/components/sections/hero/Hero";
import { Industries } from "@/components/sections/industries/Industries";
import { Manifesto } from "@/components/sections/manifesto/Manifesto";
import { Proof } from "@/components/sections/manifesto/Proof";
import { WhyReazix } from "@/components/sections/manifesto/WhyReazix";
import { Services } from "@/components/sections/services/Services";
import { Team } from "@/components/sections/team/Team";
import { CredibilityBlock } from "@/components/sections/testimonials/CredibilityBlock";
import { Testimonials } from "@/components/sections/testimonials/Testimonials";
import { Work } from "@/components/sections/work/Work";
import { testimonials } from "@/content/testimonials";

export function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Work />
      <Services />
      <WhyReazix />
      <Proof />
      <Team />
      <AboutTeaser />
      <Industries />
      {testimonials.length > 0 ? <Testimonials /> : <CredibilityBlock />}
      <Faq />
      <ClosingCta />
      <Contact />
    </>
  );
}
