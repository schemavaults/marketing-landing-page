"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import {
  Accordion,
  AccordionContent as RawAccordionContent,
  AccordionItem as RawAccordionItem,
  AccordionTrigger as RawAccordionTrigger,
  cn,
} from "@schemavaults/ui";
import type { ComponentType, PropsWithChildren, ReactElement } from "react";

const AccordionItem = RawAccordionItem as unknown as ComponentType<
  PropsWithChildren<{ value: string }>
>;
const AccordionTrigger = RawAccordionTrigger as unknown as ComponentType<
  PropsWithChildren<{ className?: string }>
>;
const AccordionContent = RawAccordionContent as unknown as ComponentType<
  PropsWithChildren<{ className?: string }>
>;

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const faqs: readonly FAQ[] = [
  {
    id: "what-is-schemavaults",
    question: "What is SchemaVaults, in one sentence?",
    answer:
      "A schema-first graph database and SDK that lets your AI agents, workflows, and apps share validated, strongly-typed data — without rewriting the same shapes in five places.",
  },
  {
    id: "vs-zod-and-orm",
    question: "How is this different from Zod, Prisma, or a regular database?",
    answer:
      "Zod validates at runtime but doesn't store anything. ORMs store data but don't help your AI agents stay type-safe. SchemaVaults unifies the schema, the storage, and the SDKs — one definition powers validation, storage, code generation, and agent tool calls.",
  },
  {
    id: "self-hosting",
    question: "Can I self-host, or do I have to use your cloud?",
    answer:
      "Both. Run SchemaVaults on our managed cloud for the easy path, in-memory for local development, or in your own data center / VPC when you need full control over where data lives.",
  },
  {
    id: "ai-agents",
    question: "How does this help my AI agents?",
    answer:
      "Agents read and write through MCP using your published schemas — so every memory, artifact, and tool call is validated against a type you defined. No more parsing surprise JSON or watching an agent silently corrupt state.",
  },
  {
    id: "vendor-lock-in",
    question: "Am I locked in?",
    answer:
      "No. Schemas are portable and exportable, the SDKs are open standards (TypeScript + JSON Schema + MCP), and your data is yours — export it whenever you want, in the shape you defined.",
  },
  {
    id: "security",
    question: "What about security and compliance?",
    answer:
      "Vaults enforce schema-level access controls and audit every write. Enterprise customers can self-host, bring their own compute and models, and configure custom SLAs and SSO.",
  },
  {
    id: "pricing",
    question: "Is the free plan really free?",
    answer:
      "Yes. The free tier gives you 1 GB of storage, 3 vaults, and 100 agent queries a month — forever. No credit card. Upgrade when you outgrow it, not before.",
  },
];

export function FAQSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn(
        "py-24",
        "w-full",
        "bg-muted/30",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Questions, answered.
          </h2>
          <p className="text-muted-foreground text-lg">
            The honest answers to what people ask us most.
          </p>
        </div>

        <Accordion type="single" collapsible variant="bordered">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-left text-base font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
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
