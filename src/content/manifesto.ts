export interface ManifestoWord {
  text: string;
  /** Gets the ember -> amber -> blush gradient fill once illuminated. */
  highlight: boolean;
}

/**
 * The scroll-lit statement, word by word — same sentence as siteConfig.tagline.
 * Hand-split (rather than parsed from the sentence at runtime) so the highlight
 * flags on "look premium", "operate better", and "grow" stay exact and obvious.
 */
export const MANIFESTO_STATEMENT_WORDS: ManifestoWord[] = [
  { text: "We", highlight: false },
  { text: "don't", highlight: false },
  { text: "just", highlight: false },
  { text: "build", highlight: false },
  { text: "websites.", highlight: false },
  { text: "We", highlight: false },
  { text: "design", highlight: false },
  { text: "and", highlight: false },
  { text: "engineer", highlight: false },
  { text: "digital", highlight: false },
  { text: "products", highlight: false },
  { text: "that", highlight: false },
  { text: "help", highlight: false },
  { text: "businesses", highlight: false },
  { text: "look", highlight: true },
  { text: "premium,", highlight: true },
  { text: "operate", highlight: true },
  { text: "better,", highlight: true },
  { text: "and", highlight: false },
  { text: "grow.", highlight: true },
];

export const MANIFESTO_FOOTER_LINE = "STRATEGY — DESIGN — ENGINEERING — AI — GROWTH";

export const TRUST_STRIP_EYEBROW = "Trusted across industries";

export const TRUST_STRIP_CLOSING_LINE =
  "From funded startups to established enterprises — we build the products that carry your brand.";

export const TRUST_STRIP_CTA_LABEL = "See our work";
