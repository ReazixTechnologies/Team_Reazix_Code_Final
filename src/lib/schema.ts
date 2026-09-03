import { SERVICES } from "@/content/services";
import { siteConfig, socialLinks } from "@/content/site";
import type { Faq, Project } from "@/types";

/** Organization schema — rendered on every page via App.tsx. */
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/favicon.ico`,
    sameAs: socialLinks.map((social) => social.href),
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.email,
      telephone: siteConfig.phone,
      contactType: "sales",
    },
  };
}

/** Service schema listing the 8 capabilities — rendered on Home. */
export function buildServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: SERVICES.map((service, index) => ({
      "@type": "Service",
      position: index + 1,
      name: service.title,
      description: service.description,
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    })),
  };
}

/** FAQPage schema built directly from src/content/faqs.ts so it can never drift from the visible answers. */
export function buildFaqPageSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** BreadcrumbList schema for a project detail page. */
export function buildProjectBreadcrumbSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Work", item: `${siteConfig.url}/work` },
      { "@type": "ListItem", position: 3, name: project.title, item: `${siteConfig.url}/work/${project.slug}` },
    ],
  };
}
