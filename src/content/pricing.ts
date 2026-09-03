import type { AddOn, PricingNote, PricingObjection, PricingTier, Retainer } from "@/types";

// Price anchors. Review these against your actual delivery cost and margin before
// launch — they are positioning, and positioning is a business decision, not a
// design one.

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "launch",
    name: "Launch",
    positioning: "For getting a credible product in front of real users.",
    forWho:
      "Early-stage founders and businesses launching their first serious digital presence.",
    priceINR: 350000,
    priceUSD: 4500,
    timeline: "4–6 weeks",
    includes: [
      "Discovery & strategy workshop",
      "Full UI/UX design",
      "Up to 8 pages or screens",
      "Responsive build",
      "CMS integration",
      "Basic SEO setup",
      "Analytics",
      "2 rounds of revisions",
      "30 days post-launch support",
    ],
    idealFor: ["Marketing websites", "Landing ecosystems", "MVP web apps", "Brand launches"],
    accent: "ember",
    featured: false,
    cta: { label: "Start with Launch", href: "#contact" },
  },
  {
    id: "scale",
    name: "Scale",
    positioning: "For products that carry real revenue.",
    forWho:
      "Funded startups, SaaS companies and established businesses who need design, engineering and growth working as one team.",
    priceINR: 1200000,
    priceUSD: 15000,
    timeline: "8–14 weeks",
    includes: [
      "Everything in Launch",
      "Product strategy & architecture",
      "Complete design system",
      "Custom web application or mobile app",
      "Backend & API development",
      "Third-party integrations",
      "AI feature integration",
      "Technical SEO",
      "Performance engineering",
      "QA & accessibility audit",
      "90 days post-launch support",
    ],
    idealFor: [
      "SaaS platforms",
      "Web applications",
      "Mobile products",
      "E-commerce builds",
      "Legacy modernisation",
    ],
    accent: "amber",
    featured: true,
    cta: { label: "Start with Scale", href: "#contact" },
  },
  {
    id: "partner",
    name: "Partner",
    positioning: "For companies who want a product team, not a project.",
    forWho:
      "Businesses shipping continuously — multiple products, ongoing roadmap, or a category they intend to lead.",
    priceINR: null,
    priceUSD: null,
    timeline: "Ongoing engagement",
    includes: [
      "Dedicated cross-functional team",
      "Quarterly roadmap planning",
      "Continuous design & development",
      "AI systems & automation",
      "Custom software & internal tools",
      "Growth & SEO programme",
      "Priority support with SLA",
      "Direct access to founders",
    ],
    idealFor: [
      "Multi-product companies",
      "Enterprise modernisation",
      "Funded scale-ups",
      "Long-term product partnerships",
    ],
    accent: "violet",
    featured: false,
    cta: { label: "Talk about a partnership", href: "#contact" },
  },
];

export const RETAINERS: Retainer[] = [
  {
    id: "growth",
    name: "Growth Retainer",
    priceINR: 85000,
    priceUSD: 1100,
    description: "Continuous improvement, experiments and iteration on a live product.",
  },
  {
    id: "ai-automation",
    name: "AI & Automation Retainer",
    priceINR: 120000,
    priceUSD: 1500,
    description: "Ongoing AI features, agents and workflow automation as your operations evolve.",
  },
  {
    id: "seo-performance",
    name: "SEO & Performance Retainer",
    priceINR: 65000,
    priceUSD: 850,
    description: "Technical SEO, content and paid acquisition measured against pipeline.",
  },
];

export const ADD_ONS: AddOn[] = [
  { name: "Brand identity", priceINR: 75000, priceUSD: 950 },
  { name: "3D / WebGL experience", priceINR: 150000, priceUSD: 1900 },
  { name: "Mobile app", priceINR: 400000, priceUSD: 5000 },
  { name: "AI chatbot or agent", priceINR: 120000, priceUSD: 1500 },
  { name: "Shopify build", priceINR: 200000, priceUSD: 2500 },
  { name: "Design system", priceINR: 100000, priceUSD: 1300 },
  { name: "Technical SEO audit", priceINR: 45000, priceUSD: 600 },
  { name: "Ongoing support", priceINR: 35000, priceUSD: 450 },
];

export const PRICING_NOTES: PricingNote[] = [
  {
    label: "Scope depth",
    description: "Ten screens is not twice five screens. Complexity, not count.",
  },
  {
    label: "Integrations",
    description: "Every third-party system adds discovery, edge cases and testing.",
  },
  {
    label: "Content readiness",
    description: "If copy and assets are ready, timelines compress.",
  },
  {
    label: "Compliance needs",
    description: "Healthcare and finance carry audit and security overhead.",
  },
  {
    label: "Speed",
    description: "Compressed timelines mean parallel workstreams and a higher rate.",
  },
  {
    label: "Ongoing scope",
    description: "Retainers cost less per hour than repeated one-off projects.",
  },
];

export const PRICING_FAQ_TEASER: PricingObjection[] = [
  {
    question: "Why no hourly rate?",
    answer:
      "Hourly billing rewards slow work and punishes efficiency. A fixed number means our incentives and yours point the same direction.",
  },
  {
    question: "What if scope changes mid-project?",
    answer:
      "We re-scope the change on its own terms and quote it before any work starts. The original number never moves retroactively.",
  },
  {
    question: "Do you take equity or revenue share?",
    answer:
      "Not as a substitute for payment. We're a service business, not a co-founder — that keeps our priorities aligned with your deadline, not your cap table.",
  },
];

export const PRICING_INTRO_EYEBROW = "Engagement models";

export const PRICING_INTRO_HEADING_LINES = ["Fixed scope.", "Fixed price.", "No hourly invoices."];

export const PRICING_INTRO_DESCRIPTION =
  "We price engagements, not hours. You approve a scope and a number before we start, and that number does not move unless you change the scope. The ranges below are honest starting points — the exact figure comes out of a 30-minute scoping call, not a form.";

export const PRICING_FROM_LABEL = "from";

export const PRICING_CUSTOM_LABEL = "Custom";

export const PRICING_FEATURED_BADGE = "Most engagements start here";

export const PRICING_WHO_LABEL = "Who it's for";

export const PRICING_IDEAL_LABEL = "Ideal for";

export const PRICING_INCLUDES_MORE_LABEL = "more";

export const PRICING_INCLUDES_LESS_LABEL = "Show less";

export const PRICING_DETAIL_LINK_LABEL = "See full pricing detail";

export const RETAINER_EYEBROW = "After launch";

export const RETAINER_HEADING = "Most clients stay on a monthly engagement.";

export const RETAINER_DESCRIPTION =
  "Launch is the midpoint. Retainers keep the product improving instead of quietly decaying.";

export const RETAINER_FOOTNOTE = "Month to month. Thirty days' notice. No lock-in.";

export const RETAINER_PRICE_SUFFIX = "/ month";

export const ADDONS_EYEBROW = "Add anything";

export const PRICING_NOTES_EYEBROW = "What moves the number";

export const PRICING_FAQ_TEASER_EYEBROW = "Before you ask";

export const PRICING_FAQ_TEASER_LINK_LABEL = "Read the full FAQ";

export const PRICING_FAQ_TEASER_LINK_HREF = "/faq";

export const PRICING_PAGE_EYEBROW = "Pricing";

export const PRICING_PAGE_HEADING = "What an engagement costs";

export const PRICING_PAGE_INTRO =
  "Three engagement models, honest anchors, and every number backed by a scoping call before you commit to anything.";

export const PRICING_PAGE_TITLE = "Pricing";

export const PRICING_PAGE_DESCRIPTION =
  "Fixed-scope, fixed-price engagement models for premium digital products — no hourly invoices, no open-ended quotes.";
