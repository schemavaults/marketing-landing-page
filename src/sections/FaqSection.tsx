"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  cn,
} from "@schemavaults/ui";
import type { FC, PropsWithChildren, ReactElement } from "react";

const Item = AccordionItem as FC<PropsWithChildren<{ value: string }>>;
const Trigger = AccordionTrigger as FC<
  PropsWithChildren<{ className?: string }>
>;
const Content = AccordionContent as FC<
  PropsWithChildren<{ className?: string }>
>;

interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

const faqs: readonly FaqEntry[] = [
  {
    id: "what-is-a-vault",
    question: "What exactly is a \"vault\"?",
    answer:
      "A vault is a schema-enforced graph database. Every node and edge is validated against the schemas you define, so your agents, workflows, and apps can trust the shape of every read and write.",
  },
  {
    id: "vs-traditional-db",
    question: "How is this different from a Postgres or a document store?",
    answer:
      "Traditional databases treat schema as an afterthought — validation lives in your app code, duplicated across languages and services. SchemaVaults makes the schema the primary artifact and enforces it at the storage layer, so the same definition powers your TypeScript types, your AI agents' tool arguments, and your admin UI.",
  },
  {
    id: "ai-agents",
    question: "Do I have to use AI agents to get value from SchemaVaults?",
    answer:
      "No. SchemaVaults works great as a plain content management system, a structured data store for websites and mobile apps, or a validated storage layer for background workflows. AI agents just happen to benefit enormously from type-safe memory and MCP-native tools.",
  },
  {
    id: "self-hosting",
    question: "Can I self-host or run it locally?",
    answer:
      "Yes. Run a vault in-memory on your laptop for dev, in your own datacenter or VPC for compliance, or on our managed cloud when you want the platform to handle scaling and backups. The API and SDKs are identical across all three.",
  },
  {
    id: "existing-schemas",
    question: "Can I bring my existing Zod or JSON Schemas?",
    answer:
      "Yes. The schema editor imports Zod and JSON Schema definitions, and our TypeScript SDK generates types from your vault's schemas so you can drop them straight into an existing codebase.",
  },
  {
    id: "pricing-changes",
    question: "Will the free plan stay free?",
    answer:
      "Yes. The free tier is a permanent part of the product, not a trial. If we ever need to change the included limits we'll email you well in advance and grandfather existing usage where we can.",
  },
];

export function FaqSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn(
        "w-full py-24",
        "bg-muted/30",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Answers to the questions we hear most from developers evaluating
            SchemaVaults.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq: FaqEntry): ReactElement => (
            <Item key={faq.id} value={faq.id}>
              <Trigger className="text-left text-base md:text-lg font-medium">
                {faq.question}
              </Trigger>
              <Content className="text-muted-foreground text-base leading-relaxed">
                {faq.answer}
              </Content>
            </Item>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export default FaqSection;
