"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import {
  Accordion,
  AccordionContent as AccordionContentBase,
  AccordionItem as AccordionItemBase,
  AccordionTrigger as AccordionTriggerBase,
  cn,
} from "@schemavaults/ui";
import type { FC, ReactElement, ReactNode } from "react";

// React 19's stricter types don't surface `children` (or HTML attributes like
// `className`) from the `ComponentPropsWithoutRef` projection used in the
// underlying Radix primitives. Cast through to permissive prop types so the
// FAQ Accordion compiles without modifying the upstream UI package.
const AccordionItem = AccordionItemBase as FC<{
  value: string;
  children?: ReactNode;
}>;
const AccordionTrigger = AccordionTriggerBase as FC<{
  className?: string;
  children?: ReactNode;
}>;
const AccordionContent = AccordionContentBase as FC<{
  className?: string;
  children?: ReactNode;
}>;

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const faqs: readonly FAQ[] = [
  {
    id: "what-is-a-vault",
    question: "What exactly is a vault?",
    answer:
      "A vault is a graph-shaped datastore whose contents are validated against a schema you define. Think of it as a database where every record is guaranteed to conform to a type — so your agents, apps, and workflows never have to guess at the shape of the data they read or write.",
  },
  {
    id: "how-does-type-safety-work",
    question: "How does end-to-end type safety actually work?",
    answer:
      "You define your schemas once — either visually, via our agentic chatbot, or in code with our TypeScript SDK. Those schemas compile to runtime validators and static TypeScript types you can import from your frontend, backend, and AI agent code. The same definition powers vault storage, MCP tool contracts, and your IDE autocomplete.",
  },
  {
    id: "self-hosted",
    question: "Can I self-host or run on my own infrastructure?",
    answer:
      "Yes. SchemaVaults runs on our managed cloud, in-memory for local development, or in your own datacenter on the Enterprise plan. You can also bring your own compute and model providers for AI-assisted schema authoring.",
  },
  {
    id: "ai-agents",
    question: "How do AI agents fit in?",
    answer:
      "Agents can read and write to vaults over the Model Context Protocol (MCP). Because every vault is schema-backed, agent memories, intermediate thoughts, and produced artifacts are validated on write — no more parsing freeform JSON and hoping for the best.",
  },
  {
    id: "free-plan",
    question: "Is the Free plan really free?",
    answer:
      "Yes — 1 GB of storage, 3 vaults, 5 schemas in the global registry, and 100 agent queries per month, forever. No credit card required to start. Upgrade only when you outgrow it.",
  },
  {
    id: "data-export",
    question: "Can I export my data if I leave?",
    answer:
      "Always. Your schemas are portable JSON Schema / Zod-compatible definitions, and vault contents can be exported as JSON or streamed via our SDK. No lock-in by design.",
  },
];

export function FAQSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn(
        "py-24",
        "w-screen",
        "flex justify-center items-start",
        "bg-background",
      )}
    >
      <div className="container px-4 md:px-6 max-w-3xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground text-lg">
            Everything you need to know before you start building.
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
