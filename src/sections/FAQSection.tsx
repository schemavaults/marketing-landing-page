"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { cn, Wordmark } from "@schemavaults/ui";
import { ChevronDown } from "lucide-react";
import type { ReactElement, ReactNode } from "react";

interface FAQ {
  id: string;
  question: string;
  answer: ReactNode;
}

const faqs: readonly FAQ[] = [
  {
    id: "what-is-a-vault",
    question: "What exactly is a “vault”?",
    answer: (
      <>
        A vault is a database whose contents are constrained by a schema you
        define. Every read and every write is validated against the schema, so
        the shape of your data is guaranteed — not hoped-for. Vaults are
        graph-native, so relationships between records are first-class instead
        of bolted on with join tables.
      </>
    ),
  },
  {
    id: "vs-relational-db",
    question:
      "How is this different from a regular relational or document database?",
    answer: (
      <>
        Relational databases enforce columns but not the shape of embedded
        values, and document stores enforce almost nothing. <Wordmark /> gives
        you a single schema definition that is enforced at the storage layer,
        exposed as fully-typed SDKs, and understood by your AI agents through
        Model Context Protocol. One schema, checked everywhere.
      </>
    ),
  },
  {
    id: "do-i-need-to-code",
    question: "Do I need to write code to use it?",
    answer: (
      <>
        No. Use the visual schema editor or describe what you want to store to
        the built-in AI and it will draft the schema for you. Developers who
        prefer code get first-class TypeScript SDKs — both paths produce the
        same underlying schema.
      </>
    ),
  },
  {
    id: "ai-agents",
    question: "Why does this matter for AI agents?",
    answer: (
      <>
        Agents fail silently when their memory or output drifts from the shape
        the rest of your system expects. <Wordmark /> gives agents a typed
        store over MCP — thoughts, artifacts, and tool outputs are validated
        the moment they are written, so downstream code and other agents can
        trust the data.
      </>
    ),
  },
  {
    id: "self-host",
    question: "Can I self-host or keep data in my own datacenter?",
    answer: (
      <>
        Yes. Run vaults on our cloud for the fastest setup, in-memory for
        local development, or in your own compute cluster on the Enterprise
        plan. Schemas and SDKs are the same across every deployment target.
      </>
    ),
  },
  {
    id: "pricing-change",
    question: "Will pricing change after launch?",
    answer: (
      <>
        The Free tier stays free. Paid-tier prices listed above are the launch
        prices — join the waitlist to lock them in as an early customer.
      </>
    ),
  },
];

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
      <div className="container px-4 md:px-6 max-w-4xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground text-lg">
            Short answers to what prospective users ask us most.
          </p>
        </div>

        <div className="w-full divide-y divide-border border-y">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              className="group py-4 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary
                className={cn(
                  "flex cursor-pointer list-none items-center justify-between gap-4",
                  "text-left text-base md:text-lg font-semibold",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
                )}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="pt-3 text-muted-foreground text-base leading-relaxed">
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
