"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { cn } from "@schemavaults/ui";
import { ChevronDown } from "lucide-react";
import type { ReactElement } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: readonly FAQItem[] = [
  {
    id: "what-is-schemavaults",
    question: "What exactly is SchemaVaults?",
    answer:
      "SchemaVaults is a typed data platform: you define your data shapes once as schemas, then store and retrieve that data from vaults (schema-enforced graph databases). The same schemas work across your frontend, backend, AI agents, and workflows—so every layer agrees on what the data should look like.",
  },
  {
    id: "different-from-supabase-mongo",
    question: "How is this different from Supabase, MongoDB, or a typed ORM?",
    answer:
      "Traditional databases enforce a rigid relational schema or none at all. ORMs only enforce types inside your app's runtime. SchemaVaults makes the schema the source of truth across systems and languages—so an AI agent calling an MCP tool, a TypeScript backend, and a CMS editor all share the same type-safe contract. You also get a graph data model that's more flexible than rows-and-columns.",
  },
  {
    id: "ai-agents",
    question: "How does SchemaVaults help with AI agents?",
    answer:
      "Agents are notorious for producing free-form output that breaks downstream code. SchemaVaults gives agents a typed scratch space via the Model Context Protocol (MCP): they store memories, artifacts, and intermediate thoughts in vaults that validate every write against your schemas. If an agent tries to save the wrong shape, the vault rejects it—catching hallucinations at the storage layer.",
  },
  {
    id: "self-host",
    question: "Can I self-host or run this in my own infrastructure?",
    answer:
      "Yes. Deploy vaults on our managed cloud for zero-ops scaling, run them in-memory for local development, or self-host in your own datacenter for full data sovereignty. The Enterprise plan includes bring-your-own-compute and bring-your-own-models options.",
  },
  {
    id: "languages",
    question: "What languages and frameworks are supported?",
    answer:
      "We ship first-class TypeScript SDKs with end-to-end type inference from your schemas. Any system that can speak HTTP or MCP can read and write to a vault. Visual schema editing is available for non-developers via our web app.",
  },
  {
    id: "data-security",
    question: "How is my data secured?",
    answer:
      "Data is encrypted at rest and in transit. Vaults support fine-grained access policies, and Teams/Enterprise plans add SSO authentication. For regulated workloads, self-hosting keeps data inside your perimeter end-to-end.",
  },
  {
    id: "pricing-changes",
    question: "Can I change or cancel my plan later?",
    answer:
      "Yes—upgrade, downgrade, or cancel at any time. The Free plan is forever free, and paid plans are billed monthly with no long-term commitment.",
  },
];

function FAQEntry({ faq }: { faq: FAQItem }): ReactElement {
  return (
    <details
      className={cn(
        "group rounded-lg border border-border bg-background/40",
        "transition-colors hover:bg-background/70",
        "open:bg-background",
      )}
    >
      <summary
        className={cn(
          "flex cursor-pointer list-none items-center justify-between gap-4",
          "px-5 py-4 text-base md:text-lg font-semibold",
          "[&::-webkit-details-marker]:hidden",
        )}
      >
        <span>{faq.question}</span>
        <ChevronDown
          className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="px-5 pb-5 text-muted-foreground leading-relaxed">
        {faq.answer}
      </div>
    </details>
  );
}

export function FAQSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn(
        "py-24",
        "w-screen",
        "bg-muted/30",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know before getting started.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <FAQEntry key={faq.id} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
