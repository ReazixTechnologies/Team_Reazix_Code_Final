export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export type ServiceAccent = "ember" | "amber" | "blush" | "violet" | "mint";

export interface Service {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  stack: string[];
  accent: ServiceAccent;
  outcome: string;
}

export interface ProcessStep {
  id: string;
  index: string;
  phase: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
  yourInvolvement: string;
}

/** The coarse taxonomy the Work filter row buckets projects into. */
export type WorkFilter = "Web" | "Product" | "Mobile" | "AI";

export interface ProjectResult {
  label: string;
  /** Numeric so <AnimatedCounter> can count up to it — pair with prefix/suffix for display (e.g. value 2.1, suffix "x"). */
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  note: string;
}

export interface ProjectTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Sector/stage descriptor, not an invented brand name — e.g. "Series A SaaS company". */
  client: string;
  year: string;
  duration: string;
  /** Display category shown in the list/detail UI, e.g. "SaaS Platform". */
  category: string;
  /** Coarse bucket used by the Work filter row. */
  filter: WorkFilter;
  services: string[];
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  results: ProjectResult[];
  stack: string[];
  accent: ServiceAccent;
  cover: string;
  /** Additional detail-page images; cover is used separately for the hero/list preview. */
  gallery: string[];
  testimonial?: ProjectTestimonial;
}

export interface PricingTier {
  id: string;
  name: string;
  /** The one-sentence headline argument for this tier. */
  positioning: string;
  forWho: string;
  /** null on tiers priced per-engagement (renders as "Custom"). */
  priceINR: number | null;
  priceUSD: number | null;
  timeline: string;
  includes: string[];
  idealFor: string[];
  accent: ServiceAccent;
  featured: boolean;
  cta: {
    label: string;
    href: string;
  };
}

export interface Retainer {
  id: string;
  name: string;
  priceINR: number;
  priceUSD: number;
  description: string;
}

export interface AddOn {
  name: string;
  priceINR: number;
  priceUSD: number;
}

export interface PricingNote {
  label: string;
  description: string;
}

export interface PricingObjection {
  question: string;
  answer: string;
}

export type FaqCategory = "Process" | "Pricing" | "Technical" | "Working Together";

export interface Faq {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
}

export interface Industry {
  id: string;
  name: string;
  accent: ServiceAccent;
  /** The one-line "what we solve for them" argument shown as the detail headline. */
  headline: string;
  description: string;
  typicalWork: string[];
  /** The sentence that makes the visitor feel understood — shown in the callout panel. */
  concern: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  /** Links to a case study in src/content/projects.ts, if this quote is tied to one. */
  projectSlug?: string;
  avatar?: string;
}

export interface Stat {
  index: string;
  value: number;
  suffix: string;
  label: string;
}

export interface ClientLogo {
  name: string;
  /** Trusted, hand-authored inline <svg>...</svg> markup. Omit to fall back to a text wordmark. */
  svg?: string;
}
