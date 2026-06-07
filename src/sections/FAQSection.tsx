"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { cn, Wordmark } from "@schemavaults/ui";
import { ChevronDown } from "lucide-react";
import type { ReactElement, ReactNode } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: ReactNode;
}

const faqs: readonly FAQItem[] = [
  {
    id: "what-is-schemavaults",
    question: "What exactly is SchemaVaults?",
    answer: (
      <>
        <Wordmark /> is a schema-first data platform. You define your data
        types once — visually, by chatting with our AI, or with our TypeScript
        SDK — and then reuse the same schema to validate and store data across
        your frontends, backends, AI agents, and workflows. Think of it as a
        graph database that enforces the shape of your data everywhere it
        flows.
      </>
    ),
  },
  {
    id: "ai-agents",
    question: "How does this help my AI agents?",
    answer: (
      <>
        Most agent failures come from agents producing or consuming data in
        the wrong shape. <Wordmark /> gives every agent a typed contract for
        the data it reads and writes — agent memories, tool outputs, and
        artifacts are stored in vaults via the Model Context Protocol (MCP)
        and validated against your schemas before they land. Fewer hallucinated
        fields, fewer downstream parsing bugs.
      </>
    ),
  },
  {
    id: "self-host",
    question: "Can I self-host, or do I have to use your cloud?",
    answer:
      "Both. You can run vaults on our managed cloud for the easiest setup," +
      " in-memory for fast local development, or in your own datacenter on" +
      " your own compute when you need full data residency control." +
      " Enterprise plans include self-hosting and bring-your-own-model support.",
  },
  {
    id: "lock-in",
    question: "Am I locked in? Can I export my data and schemas?",
    answer:
      "No lock-in. Schemas are standard, portable definitions — you own them," +
      " and you can export both your schemas and the data stored against them" +
      " at any time. The TypeScript SDK and MCP integrations make it easy to" +
      " keep your codebase portable.",
  },
  {
    id: "low-code",
    question: "Do I have to write code to use it?",
    answer: (
      <>
        No. The visual schema editor and AI chatbot let non-developers define
        types and create vaults end-to-end without writing a line of code.
        Developers can drop down to the TypeScript SDK whenever they want
        deeper control — both surfaces work against the same vaults.
      </>
    ),
  },
  {
    id: "free-tier",
    question: "Is there a free tier?",
    answer:
      "Yes. The Free plan includes 1 GB of storage, 3 vaults, and 100 agent" +
      " queries per month — enough to try the product end-to-end. No credit" +
      " card required, no setup fees, cancel anytime.",
  },
  {
    id: "beta-access",
    question: "When can I get access?",
    answer: (
      <>
        <Wordmark /> is currently in private beta. Join the waitlist below and
        we will email you the moment public access opens. If you have an
        invite code, you can register right now from the top of the page.
      </>
    ),
  },
];

export function FAQSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn(
        "w-full",
        "py-24",
        "bg-muted/30",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6 max-w-3xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground text-lg">
            Everything you need to know before you sign up. Still curious?
            Reach out via the contact links at the bottom.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-background/40 divide-y divide-border">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              id={faq.id}
              className={cn(
                "group",
                "px-4 md:px-6 py-4",
                "[&_summary::-webkit-details-marker]:hidden",
              )}
            >
              <summary
                className={cn(
                  "flex items-center justify-between gap-4",
                  "cursor-pointer list-none",
                  "text-left text-base md:text-lg font-semibold",
                  "hover:text-foreground/90",
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
              <div className="mt-3 text-base text-muted-foreground leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
