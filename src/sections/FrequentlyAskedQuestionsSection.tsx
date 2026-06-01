"use client";

import type { ReactElement } from "react";
import { cn } from "@schemavaults/ui";
import { ChevronDown } from "lucide-react";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: readonly FAQ[] = [
  {
    question: "What is a SchemaVault?",
    answer:
      "A SchemaVault is a graph database whose contents are validated against a schema you define. Every node and edge has a known shape, so the data that lands in your apps, agents, and workflows is always type-safe by construction.",
  },
  {
    question:
      "How is this different from Postgres + Zod / Prisma / a vector DB?",
    answer:
      "Relational schemas are rigid and live next to your app code; vector DBs are unstructured. SchemaVaults centralizes the schema as the source of truth, exposes it over MCP to agents, and stores data as a graph so you can compose and traverse it without rewriting types in five places.",
  },
  {
    question: "Do my AI agents really need this?",
    answer:
      "If your agents read or write data, yes. Without a schema you spend prompt tokens describing the shape and runtime cycles defending against malformed output. With a vault, the agent reads from and writes to a typed surface — fewer hallucinations, fewer brittle parsers, and your data stays consistent.",
  },
  {
    question: "Can I self-host?",
    answer:
      "Yes. SchemaVaults runs in our cloud, in-memory locally for development, or in your own datacenter on the Enterprise plan — same SDKs, same schemas. Bring your own compute and your own models.",
  },
  {
    question: "Which languages and frameworks are supported?",
    answer:
      "TypeScript and JavaScript first, via our typed SDKs. Schemas compile to JSON Schema and to MCP tool definitions, so any language or agent runtime that speaks those can interoperate.",
  },
  {
    question: "Is there a free tier?",
    answer:
      "Yes — the Free plan includes 1 GB of storage, 3 vaults, and 100 agent queries per month, forever. No credit card needed to try it.",
  },
  {
    question: "When can I start using it?",
    answer:
      "SchemaVaults is currently in private beta. Join the launch waitlist below and we'll send you an invite code as access opens up.",
  },
];

export function FrequentlyAskedQuestionsSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn("py-24 w-full", "flex justify-center items-start")}
    >
      <div className="container px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know before you spin up your first vault.
          </p>
        </div>

        <div className="divide-y border-y">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group py-4 [&[open]>summary>svg]:rotate-180"
            >
              <summary
                className={cn(
                  "flex items-center justify-between gap-4",
                  "cursor-pointer list-none",
                  "text-base md:text-lg font-medium",
                  "hover:underline",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded",
                )}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className="h-4 w-4 shrink-0 transition-transform duration-200"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 text-muted-foreground text-base leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FrequentlyAskedQuestionsSection;
