export const PRIVACY_PAGE_TITLE = "Privacy Policy";

export const PRIVACY_PAGE_DESCRIPTION = "How Reazix collects, uses and protects the information you share with us.";

export const PRIVACY_EFFECTIVE_DATE = "January 1, 2026";

export interface LegalSection {
  heading: string;
  body: string[];
}

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    heading: "Information we collect",
    body: [
      "When you submit our contact form, we collect the information you provide directly: your name, email address, company (if given), and details about your project, budget and timeline.",
      "We also collect standard technical data automatically — pages visited, referring source, browser and device type — through privacy-respecting analytics, to understand how visitors use this site.",
    ],
  },
  {
    heading: "How we use it",
    body: [
      "Contact form submissions are used only to respond to your inquiry and, if we proceed, to scope and deliver the engagement you're asking about.",
      "Analytics data is used in aggregate to improve the site — we do not sell or rent visitor data to third parties.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "This site may use a small number of essential and analytics cookies to remember preferences and measure traffic. You can disable cookies in your browser settings; the site will still function, though some conveniences may be lost.",
    ],
  },
  {
    heading: "Data retention",
    body: [
      "We retain contact form submissions for as long as needed to respond to your inquiry and, if we begin working together, for the duration of the engagement plus a reasonable period afterward for record-keeping.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You can ask us to access, correct, or delete any personal information we hold about you at any time by emailing us — see the contact details below.",
    ],
  },
  {
    heading: "Contact",
    body: ["Questions about this policy can be sent to the email address in our site footer."],
  },
];

export const TERMS_PAGE_TITLE = "Terms & Conditions";

export const TERMS_PAGE_DESCRIPTION = "The terms that govern use of this website and engagements with Reazix.";

export const TERMS_EFFECTIVE_DATE = "January 1, 2026";

export const TERMS_SECTIONS: LegalSection[] = [
  {
    heading: "Use of this site",
    body: [
      "This website and its content are provided by Reazix for the purpose of describing our services and enabling prospective clients to get in touch. You may not copy, resell, or misrepresent the content on this site as your own.",
    ],
  },
  {
    heading: "Engagements",
    body: [
      "Any actual project work — scope, timeline, deliverables, fees and payment schedule — is governed by a separate written proposal or contract agreed between Reazix and the client before work begins. Nothing on this website constitutes a binding offer.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "Unless otherwise agreed in a signed contract, ownership of custom deliverables (code, designs, and other work product) transfers to the client upon full payment. Reazix retains the right to reuse general methods, frameworks and non-confidential know-how developed during an engagement.",
      "Reazix retains ownership of this website's own branding, content and design.",
    ],
  },
  {
    heading: "Payment",
    body: [
      "Payment terms, including any deposits, milestones and late-payment terms, are set out in the individual client contract rather than on this website.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "To the extent permitted by law, Reazix is not liable for indirect, incidental, or consequential damages arising from use of this website. Liability for delivered project work is limited to the terms of the applicable client contract.",
    ],
  },
  {
    heading: "Changes to these terms",
    body: [
      "We may update these terms from time to time; the effective date above reflects the latest revision. Continued use of the site after changes constitutes acceptance of the updated terms.",
    ],
  },
  {
    heading: "Contact",
    body: ["Questions about these terms can be sent to the email address in our site footer."],
  },
];
