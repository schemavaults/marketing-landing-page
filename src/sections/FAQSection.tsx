"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import {
  Accordion,
  AccordionContent as RawAccordionContent,
  AccordionItem as RawAccordionItem,
  AccordionTrigger as RawAccordionTrigger,
  cn,
} from "@schemavaults/ui";
import type { FC, ReactElement, ReactNode } from "react";

// The current @schemavaults/ui type definitions for Accordion sub-components
// don't propagate Radix's props (children, value, className, etc.) because
// `ComponentPropsWithoutRef` on the underlying Radix primitives collapses to
// `{}` in the compiled .d.ts. The runtime accepts them. Cast at the boundary
// here so the rest of this file stays strictly typed. Remove once upstream
// fixes the type re-export.
type AccordionItemRuntimeProps = {
  children?: ReactNode;
  value: string;
  className?: string;
};
type AccordionTriggerRuntimeProps = {
  children?: ReactNode;
  className?: string;
};
type AccordionContentRuntimeProps = {
  children?: ReactNode;
  className?: string;
};
const AccordionItem = RawAccordionItem as unknown as FC<AccordionItemRuntimeProps>;
const AccordionTrigger = RawAccordionTrigger as unknown as FC<AccordionTriggerRuntimeProps>;
const AccordionContent = RawAccordionContent as unknown as FC<AccordionContentRuntimeProps>;

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: readonly FAQItem[] = [
  {
    id: "what-is-schemavaults",
    question: "What exactly is a SchemaVault?",
    answer:
      "A SchemaVault is a graph database whose contents are constrained by a schema you define. " +
      "Think of it as Postgres' rigor plus a graph database's flexibility, with type-safe SDKs and an AI-friendly query layer on top. " +
      "Define your data shape once, and the same types power your frontend, backend, agents, and workflows.",
  },
  {
    id: "ai-agents-mcp",
    question: "How does this work with AI agents and MCP?",
    answer:
      "SchemaVaults speaks Model Context Protocol (MCP) natively. Your agents read and write through MCP tools that are auto-generated from your schemas, " +
      "so the agent's outputs are validated against your data shape before they ever touch storage. No more agents inventing fields or returning malformed JSON.",
  },
  {
    id: "self-host",
    question: "Can I self-host or keep my data on-prem?",
    answer:
      "Yes. Run SchemaVaults on our managed cloud, in-memory on a single machine for local development, or in your own datacenter/Kubernetes cluster. " +
      "Enterprise customers can bring their own compute and models — your data and inference never leave your perimeter.",
  },
  {
    id: "security",
    question: "How is my data secured?",
    answer:
      "Data is encrypted in transit (TLS 1.3) and at rest (AES-256). Access is gated by per-vault API keys with fine-grained scopes, " +
      "and audit logs capture every read and write. Enterprise plans include SSO, custom retention, and a signed BAA/DPA on request.",
  },
  {
    id: "migrate",
    question: "Can I migrate from Postgres, MongoDB, or another database?",
    answer:
      "Yes. Import existing data via our CLI or SDKs — SchemaVaults will infer an initial schema from your records, which you can then refine in our visual editor. " +
      "You can also keep your existing database and use SchemaVaults purely as a typed cache/edge layer for your agents and workflows.",
  },
  {
    id: "no-code",
    question: "Do I need to write code to use SchemaVaults?",
    answer:
      "No. Our visual schema editor and AI assistant let you define data shapes by describing them in plain English. " +
      "Engineers who want code get fully-typed TypeScript SDKs (and more language SDKs are on the way). Use whichever workflow fits your team.",
  },
  {
    id: "pricing-flex",
    question: "What if I outgrow a plan?",
    answer:
      "Upgrade or downgrade at any time, prorated to the day. There are no setup fees, no long-term contracts, and nothing to cancel beyond turning off auto-renewal. " +
      "If you need a custom plan — higher limits, custom SLAs, regional residency — talk to our sales team.",
  },
] as const;

export function FAQSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn(
        "py-24",
        "w-screen",
        "flex justify-center items-start",
        "bg-muted/30",
      )}
    >
      <div className="container px-4 md:px-6 max-w-3xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground text-lg">
            Everything you need to know before you sign up. Can&apos;t find your
            question? <a href="mailto:sales@schemavaults.com" className="text-primary hover:underline">Ask sales</a>.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
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
