import type { Industry } from "@/types";

export const INDUSTRIES: Industry[] = [
  {
    id: "saas-software",
    name: "SaaS & Software",
    accent: "ember",
    headline: "Ship faster without accruing design debt.",
    description:
      "We work inside product teams that already move fast, adding design and engineering capacity without slowing the roadmap down or leaving a trail of inconsistent UI behind.",
    typicalWork: ["Product UI", "Design systems", "Marketing sites", "Onboarding flows"],
    concern: "Your product is good. Your website makes it look like a side project.",
  },
  {
    id: "fintech-finance",
    name: "Fintech & Finance",
    accent: "amber",
    headline: "Interfaces that survive a compliance review.",
    description:
      "Financial products carry a trust burden most software doesn't. We design and build with that scrutiny in mind from the first wireframe, not as a retrofit before audit.",
    typicalWork: ["Dashboards", "Onboarding & KYC flows", "Data visualisation", "Security-first builds"],
    concern: "Trust is the product. One clumsy screen and the deposit does not happen.",
  },
  {
    id: "real-estate",
    name: "Real Estate",
    accent: "blush",
    headline: "Listings that feel like the property, not a spreadsheet.",
    description:
      "We build platforms that sell the feeling of a space — imagery, walkthroughs and pacing that match how buyers actually decide, wired into the CRM your sales team already runs on.",
    typicalWork: ["Property platforms", "3D walkthroughs", "Lead capture", "CRM integration"],
    concern: "Buyers decide emotionally. Most property sites are built for filing.",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    accent: "violet",
    headline: "Clinical clarity, consumer polish.",
    description:
      "Patients and clinicians need different things from the same system. We design for both — legible under stress, fast to book, careful with the data behind it.",
    typicalWork: ["Patient portals", "Booking systems", "HIPAA-aware builds", "Care dashboards"],
    concern: "Your users are anxious. The interface should lower their heart rate.",
  },
  {
    id: "ecommerce-d2c",
    name: "E-commerce & D2C",
    accent: "mint",
    headline: "Every millisecond and every click accounted for.",
    description:
      "We treat storefront performance and checkout friction as revenue lines, not polish items — measured, tested and optimised against the traffic you're already paying for.",
    typicalWork: ["Headless storefronts", "Checkout optimisation", "Shopify builds", "Retention flows"],
    concern: "You are paying for traffic that a slow storefront is throwing away.",
  },
  {
    id: "ai-deep-tech",
    name: "AI & Deep Tech",
    accent: "ember",
    headline: "Make something complex feel obvious.",
    description:
      "Technical differentiation doesn't sell itself. We translate what a model actually does into an interface and a narrative a non-technical buyer can act on.",
    typicalWork: ["AI product UI", "Agent interfaces", "RAG systems", "Technical marketing sites"],
    concern: "The model is impressive. Nobody can tell from the landing page.",
  },
  {
    id: "enterprise-manufacturing",
    name: "Enterprise & Manufacturing",
    accent: "amber",
    headline: "Replace the tools your team works around.",
    description:
      "Most internal software gets worked around, not used. We rebuild the workflows people are already patching with spreadsheets into something they'll actually open.",
    typicalWork: ["Internal platforms", "ERP & CRM", "Custom dashboards", "Legacy modernisation"],
    concern: "The software your team hates is quietly costing you a headcount.",
  },
  {
    id: "agencies-studios",
    name: "Agencies & Studios",
    accent: "blush",
    headline: "White-label engineering that will not embarrass you.",
    description:
      "We sit behind the scenes as delivery capacity for other studios and agencies — matching your standards, reporting through your process, never in front of your client unless you want us there.",
    typicalWork: ["Development partnership", "Design-to-code", "Overflow capacity", "Technical rescue"],
    concern: "You sold something ambitious. Now it has to actually be built.",
  },
];

export const INDUSTRIES_EYEBROW = "Who we build for";

export const INDUSTRIES_HEADING = "Eight industries. One recurring pattern.";

export const INDUSTRIES_DESCRIPTION =
  "Different sectors, the same underlying problem: the software does not yet match the ambition of the business behind it.";

export const INDUSTRIES_TYPICAL_WORK_LABEL = "Typical work";

export const INDUSTRIES_DETAIL_ANNOUNCE_PREFIX = "Now showing";
