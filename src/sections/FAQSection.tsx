"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import {
  Accordion,
  AccordionContent as RawAccordionContent,
  AccordionItem as RawAccordionItem,
  AccordionTrigger as RawAccordionTrigger,
  cn,
  Wordmark,
} from "@schemavaults/ui";
import type { FC, ReactElement, ReactNode } from "react";

// The @schemavaults/ui Accordion type defs don't surface common HTML/Radix
// props (children, className, value) under this project's strict TS config;
// re-type the wrappers locally so JSX usage compiles cleanly.
type AccordionItemLocalProps = {
  value: string;
  className?: string;
  children?: ReactNode;
};
type AccordionTriggerLocalProps = {
  className?: string;
  children?: ReactNode;
};
type AccordionContentLocalProps = {
  className?: string;
  children?: ReactNode;
};
const AccordionItem = RawAccordionItem as unknown as FC<AccordionItemLocalProps>;
const AccordionTrigger =
  RawAccordionTrigger as unknown as FC<AccordionTriggerLocalProps>;
const AccordionContent =
  RawAccordionContent as unknown as FC<AccordionContentLocalProps>;

interface FAQ {
  question: string;
  answer: ReactElement;
}

export function FAQSection(): ReactElement {
  const emails = useOrgEmailAddresses();

  const faqs: readonly FAQ[] = [
    {
      question: "How is this different from just using Postgres + Zod?",
      answer: (
        <>
          Zod gives you schema validation in one runtime. <Wordmark /> gives you{" "}
          <em>one</em> schema that is the source of truth across your
          frontend, backend, agents, and storage layer — so your TypeScript
          types, database constraints, MCP tool inputs, and form validators
          all stay in lock-step automatically.
        </>
      ),
    },
    {
      question: "Why a graph database instead of relational?",
      answer: (
        <>
          Modern AI workloads — agent memories, knowledge graphs, content
          relationships — are natively graph-shaped. A vault models those
          relationships directly without forcing you to design and maintain a
          dozen join tables. You still get schema enforcement; you just don't
          fight the data model.
        </>
      ),
    },
    {
      question: "Can I self-host, or do I have to use your cloud?",
      answer: (
        <>
          Both. Run a vault on our managed cloud for zero-config scalability,
          in-memory for local development and edge use cases, or inside your
          own datacenter when compliance requires it. The SDKs and schema
          format are identical across deployments.
        </>
      ),
    },
    {
      question: "Do my AI agents need to know about SchemaVaults?",
      answer: (
        <>
          No. Vaults speak{" "}
          <a
            href="https://modelcontextprotocol.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Model Context Protocol
          </a>{" "}
          out of the box, so any MCP-capable agent (Claude, GPT, your own
          framework) can read and write schema-validated data with zero extra
          glue. Agents get strongly-typed memories without you writing parsers.
        </>
      ),
    },
    {
      question: "What does the free tier actually include?",
      answer: (
        <>
          Forever-free: 3 vaults, 1 GB of storage, 5 schemas in the global
          registry, and 100 agent queries per month. Enough to ship a real
          side-project or prototype an internal tool — no credit card, no
          time limit, no surprise downgrades.
        </>
      ),
    },
    {
      question: "Is my data secure?",
      answer: (
        <>
          Yes. All data is encrypted in transit (TLS 1.3) and at rest. API
          keys are scoped per vault and revocable. For organizations with
          stricter compliance needs, the self-hosted option keeps data inside
          your own perimeter while still using the same SDKs and schema
          registry.
        </>
      ),
    },
    {
      question: "Can I migrate off SchemaVaults if I change my mind?",
      answer: (
        <>
          Always. Schemas are portable JSON/TypeScript definitions, and every
          vault supports a full export of its data and edges as
          newline-delimited JSON. No proprietary binary format, no lock-in.
        </>
      ),
    },
  ];

  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn(
        "py-24 bg-muted/30",
        "w-screen",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6 max-w-3xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you'd ask before signing up. Don't see your question?{" "}
            <a
              href={`mailto:${emails.salesEmail}`}
              className="text-primary hover:underline"
            >
              Ask the team
            </a>
            .
          </p>
        </div>

        <Accordion type="single" collapsible variant="bordered">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base md:text-lg font-medium px-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed px-4">
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
