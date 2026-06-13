"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { cn } from "@schemavaults/ui";
import { ChevronDown } from "lucide-react";
import type { ReactElement } from "react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const faqs: readonly FAQ[] = [
  {
    id: "what-is-schemavaults",
    question: "What exactly is SchemaVaults?",
    answer:
      "SchemaVaults is a type-safe data layer: define your data once as a schema, then store, validate, and query it as a graph from any agent, workflow, frontend, or backend. Think of it as a graph database that enforces the shape of your data everywhere it goes.",
  },
  {
    id: "how-is-this-different",
    question:
      "How is this different from Postgres, MongoDB, or a vector database?",
    answer:
      "Traditional databases store data; SchemaVaults stores schemas first and data second. That means your AI agents, pipelines, and apps share one source of truth for what your data looks like — no drift, no duplicated TypeScript types, no untyped JSON blobs leaking through your system.",
  },
  {
    id: "ai-agents",
    question: "Do I need to be building AI agents to get value from this?",
    answer:
      "No. SchemaVaults is just as useful as a typed content management system, a backing store for workflows and data pipelines, or a shared schema registry across your apps. AI agents are the most painful place untyped data lives today, so it's where we lean in hardest — but you can adopt SchemaVaults without writing a single agent.",
  },
  {
    id: "self-host",
    question: "Can I self-host or run this on my own infrastructure?",
    answer:
      "Yes. Run SchemaVaults in our managed cloud for the fastest setup, in-memory for local development and tests, or self-hosted in your own datacenter or cluster. Enterprise plans support bring-your-own compute and models.",
  },
  {
    id: "languages",
    question: "Which languages and frameworks are supported?",
    answer:
      "We ship first-class TypeScript SDKs today with end-to-end type inference from schema to client. You can also drive SchemaVaults from any language via the HTTP API, or let AI agents speak to it through the Model Context Protocol (MCP).",
  },
  {
    id: "pricing-change",
    question: "What happens when I outgrow the Free plan?",
    answer:
      "Upgrade in-app to Personal or Teams whenever you hit a limit — your schemas, vaults, and data move with you. No re-migration, no downtime. Need something custom? Enterprise plans include dedicated support and custom SLAs.",
  },
  {
    id: "cancel",
    question: "Can I cancel at any time?",
    answer:
      "Yes. Paid plans are month-to-month with no setup fees and no cancellation fees. If you cancel, you can export every schema and vault you've created — your data stays yours.",
  },
];

export function FAQSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn(
        "py-24",
        "w-full",
        "flex justify-center items-start",
        "bg-muted/30",
      )}
    >
      <div className="container px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know before you sign up.
          </p>
        </div>

        <div className="rounded-lg border bg-background/40 divide-y">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              className="group px-5 md:px-6 py-4 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary
                className={cn(
                  "flex items-center justify-between gap-4",
                  "cursor-pointer list-none",
                  "text-base md:text-lg font-semibold",
                  "hover:text-primary transition-colors",
                )}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted-foreground",
                    "transition-transform duration-200",
                    "group-open:rotate-180",
                  )}
                />
              </summary>
              <p className="mt-3 text-muted-foreground text-sm md:text-base leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
