"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import {
  Accordion,
  AccordionContent as UiAccordionContent,
  AccordionItem as UiAccordionItem,
  AccordionTrigger as UiAccordionTrigger,
  cn,
} from "@schemavaults/ui";
import type { FC, ReactElement, ReactNode } from "react";

// The @schemavaults/ui accordion prop types drop through-props under
// React 19 stricter types; re-type them with the props we actually pass.
interface LocalAccordionItemProps {
  value: string;
  className?: string;
  children?: ReactNode;
}
interface LocalAccordionTriggerProps {
  className?: string;
  children?: ReactNode;
}
interface LocalAccordionContentProps {
  className?: string;
  children?: ReactNode;
}

const AccordionItem = UiAccordionItem as unknown as FC<LocalAccordionItemProps>;
const AccordionTrigger =
  UiAccordionTrigger as unknown as FC<LocalAccordionTriggerProps>;
const AccordionContent =
  UiAccordionContent as unknown as FC<LocalAccordionContentProps>;

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const faqs: readonly FAQ[] = [
  {
    id: "faq-1",
    question: "How is SchemaVaults different from a traditional database?",
    answer:
      "SchemaVaults is a schema-first graph database. Every vault enforces the schemas you define, so writes that don't match the shape are rejected before they land. You get the flexibility of a document/graph store with the safety of strong types, and the same schemas power your SDK, your agents, and your workflows.",
  },
  {
    id: "faq-2",
    question:
      "Do I have to be a developer to use it?",
    answer:
      "No. The visual schema editor and agentic chatbot let you design vaults, model data, and query it without writing code. Developers can drop into the TypeScript SDK, MCP, or REST at any point — the underlying schemas are the same.",
  },
  {
    id: "faq-3",
    question: "How does it work with AI agents and MCP?",
    answer:
      "Every vault exposes an MCP server, so any MCP-compatible agent can read, write, and query typed data with tool-call-level guarantees. Agent memories, artifacts, and tool outputs land in vaults with the exact shape you designed — no more free-form JSON drift.",
  },
  {
    id: "faq-4",
    question: "Can I self-host or bring my own compute?",
    answer:
      "Yes. Run SchemaVaults on our managed cloud for zero-ops scale, in-memory for lightning-fast local development, or fully self-hosted inside your own VPC or datacenter. Enterprise customers can bring their own models and compute.",
  },
  {
    id: "faq-5",
    question: "What happens when I need to change a schema?",
    answer:
      "Schemas are versioned and composable. You can evolve fields, nest schemas within schemas, and migrate existing vault data with guided workflows — while the TypeScript SDK regenerates types so your callers surface breakage at compile time, not in production.",
  },
  {
    id: "faq-6",
    question: "Is there a free tier?",
    answer:
      "Yes. The Free plan includes 1 GB of storage, 3 vaults, 5 schemas in the global registry, and 100 agent queries per month — no credit card required. Upgrade any time as your project grows.",
  },
];

export function FAQSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn(
        "py-20 md:py-24",
        "w-screen",
        "flex justify-center items-start",
        "bg-background",
      )}
    >
      <div className="container px-4 md:px-6 max-w-3xl">
        <div className="text-center space-y-4 mb-10 md:mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto max-w-[640px] text-muted-foreground text-lg">
            Everything you need to know before you ship. Still stuck? Get in
            touch below.
          </p>
        </div>

        <Accordion type="single" variant="bordered" collapsible>
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-left text-base md:text-lg font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
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
