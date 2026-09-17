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
  client: string;
  year: string;
  duration: string;
  category: string;
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
  /** Live URL of the official product website — clicking the card image opens this. */
  liveUrl?: string;
  gallery: string[];
  testimonial?: ProjectTestimonial;
}

export interface PricingTier {
  id: string;
  name: string;
  positioning: string;
  forWho: string;
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
  headline: string;
  description: string;
  typicalWork: string[];
  concern: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
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
  svg?: string;
}