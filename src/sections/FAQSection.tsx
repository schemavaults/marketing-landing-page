"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import {
  Accordion,
  AccordionContent as RawAccordionContent,
  AccordionItem as RawAccordionItem,
  AccordionTrigger as RawAccordionTrigger,
  cn,
} from "@schemavaults/ui";
import type { FC, HTMLAttributes, ReactElement, ReactNode } from "react";

type AccordionItemLoose = HTMLAttributes<HTMLDivElement> & {
  value: string;
  disabled?: boolean;
  children?: ReactNode;
};
type AccordionTriggerLoose = HTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
};
type AccordionContentLoose = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

const AccordionItem = RawAccordionItem as unknown as FC<AccordionItemLoose>;
const AccordionTrigger =
  RawAccordionTrigger as unknown as FC<AccordionTriggerLoose>;
const AccordionContent =
  RawAccordionContent as unknown as FC<AccordionContentLoose>;

interface FAQEntry {
  id: string;
  question: string;
  answer: ReactNode;
}

const faqs: readonly FAQEntry[] = [
  {
    id: "vs-databases",
    question:
      "How is this different from Postgres, MongoDB, or a spreadsheet like Airtable?",
    answer:
      "Traditional databases store rows; document stores accept anything; spreadsheets are optimized for humans. SchemaVaults is optimized for AI agents and modern apps: your data is validated against a schema at every write, exposed to LLMs with strong types via MCP, and available as a graph you can traverse. You get the safety of Postgres, the flexibility of Mongo, and a first-class LLM interface — without gluing three products together.",
  },
  {
    id: "existing-zod",
    question: "I already use Zod / TypeScript. Why do I need this?",
    answer:
      "You keep using Zod — schemas defined in SchemaVaults compile to Zod-compatible types for your TypeScript apps. What you gain is that the same schema also runs at the storage layer, in the MCP tools your agents call, and in the visual editor your non-engineers use. One source of truth instead of duplicated definitions.",
  },
  {
    id: "ai-agents",
    question: "What does “type-safe agent memory” actually mean?",
    answer:
      "When an agent writes to a vault, the write is rejected unless it matches the schema — no more silent JSON drift, no more hand-written parsers around every LLM call. Agents can also fetch typed context back, so downstream tools receive predictable shapes instead of free-form strings.",
  },
  {
    id: "self-host",
    question: "Can I self-host? Where does my data live?",
    answer:
      "Yes. Run SchemaVaults in your own cloud account or datacenter (Enterprise), stand up a local in-memory vault for development, or let us host on our globally distributed cloud. Data-residency policies let you pin vaults to specific regions.",
  },
  {
    id: "sdks",
    question: "Which languages and frameworks are supported?",
    answer:
      "First-class TypeScript / JavaScript SDKs for Node, Bun, Deno, browsers, and edge runtimes. Every vault also exposes REST and streaming APIs, plus Model Context Protocol tools that plug directly into any LLM.",
  },
  {
    id: "migration",
    question: "How hard is it to migrate an existing dataset?",
    answer:
      "The visual schema editor infers a starting schema from a sample of your existing JSON / CSV / SQL rows, and the CLI streams data into a vault while surfacing rows that fail validation so you can fix them incrementally.",
  },
];

export function FAQSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn(
        "w-screen py-20 md:py-24",
        "bg-background",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6 max-w-3xl">
        <div className="text-center space-y-3 mb-10 md:mb-14">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground text-lg">
            Short, honest answers to the things people ask before signing up.
          </p>
        </div>

        <Accordion type="single" collapsible variant="bordered">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-left text-base md:text-lg font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export default FAQSection;
