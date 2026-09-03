import { useState } from "react";
import { FaqAccordion } from "./FaqAccordion";
import { FaqCategoryTabs } from "./FaqCategoryTabs";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FAQ_CATEGORIES, FAQ_EYEBROW, FAQ_HEADING, FAQS } from "@/content/faqs";
import type { FaqCategory } from "@/types";

/** Objection-handling, categorised so the list never reads as a wall. */
export function Faq() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>(FAQ_CATEGORIES[0]);
  const [openId, setOpenId] = useState<string | null>(null);

  const filteredFaqs = FAQS.filter((faq) => faq.category === activeCategory);

  function handleCategoryChange(category: FaqCategory) {
    setActiveCategory(category);
    setOpenId(null);
  }

  function handleToggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <section id="faq" aria-labelledby="faq-heading" className="relative bg-void">
      <Container className="flex flex-col gap-12 py-section">
        <div className="flex flex-col gap-5">
          <Eyebrow>{FAQ_EYEBROW}</Eyebrow>
          <h2 id="faq-heading" className="font-display text-h2 font-light text-text">
            {FAQ_HEADING}
          </h2>
        </div>

        <FaqCategoryTabs categories={FAQ_CATEGORIES} activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
        <FaqAccordion faqs={filteredFaqs} activeCategory={activeCategory} openId={openId} onToggle={handleToggle} />
      </Container>
    </section>
  );
}
