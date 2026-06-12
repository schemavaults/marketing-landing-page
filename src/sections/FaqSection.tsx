"use client";

import type { ReactElement, ReactNode } from "react";
import { cn } from "@schemavaults/ui";
import { ChevronDown } from "lucide-react";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";

interface FaqEntry {
  id: string;
  question: string;
  answer: ReactNode;
}

export function FaqSection(): ReactElement {
  const emails = useOrgEmailAddresses();

  const faqs: readonly FaqEntry[] = [
    {
      id: "why-not-zod-postgres",
      question:
        "Why use SchemaVaults instead of just Zod + Postgres (or another DB)?",
      answer: (
        <>
          Zod gives you runtime validation in <em>one</em> codebase. Postgres
          gives you persistence. SchemaVaults gives you a{" "}
          <strong>single source of truth</strong> for your data shapes that
          every agent, workflow, frontend, and backend can consume — with type
          safety end-to-end, schemas that can be composed and re-used, and a
          storage layer that already understands them. No more redefining the
          same User type in five places.
        </>
      ),
    },
    {
      id: "self-host",
      question: "Can I self-host my data?",
      answer: (
        <>
          Yes. SchemaVaults can run on our managed cloud, in-memory for local
          development, or fully self-hosted in your own datacenter or compute
          cluster. Enterprise plans include bring-your-own-compute and
          bring-your-own-model options.
        </>
      ),
    },
    {
      id: "ai-agents",
      question: "How does it help with AI agents?",
      answer: (
        <>
          Agents read and write through schemas you define, so their thoughts,
          memories, and tool outputs are{" "}
          <strong>type-checked at runtime</strong> — no more parsing JSON blobs
          and praying. Integration with the Model Context Protocol (MCP) means
          your agent stack stays portable across providers.
        </>
      ),
    },
    {
      id: "data-security",
      question: "How secure is my data?",
      answer: (
        <>
          Vaults are encrypted at rest and in transit. Enterprise plans add
          SSO, custom SLAs, and the ability to keep data fully inside your own
          infrastructure. Schema-level validation also rejects malformed or
          unexpected writes before they ever land in storage.
        </>
      ),
    },
    {
      id: "no-code",
      question: "Do I have to write code?",
      answer: (
        <>
          No. Build your first schema with the visual editor or just describe
          what you want to store to our agentic assistant. If you <em>do</em>{" "}
          want to drop into code, the TypeScript SDKs are first-class — same
          schema, same types, no rewriting.
        </>
      ),
    },
    {
      id: "outgrow",
      question: "What happens if I outgrow my plan?",
      answer: (
        <>
          Upgrades are zero-downtime — your schemas, vaults, and data move
          with you. You can also start on Free, upgrade to Personal or Teams
          when you ship, and graduate to Enterprise (with self-hosting)
          whenever scale or compliance demands it.
        </>
      ),
    },
  ];

  return (
    <section
      id="faq"
      className={cn(
        "w-screen h-auto",
        "py-24",
        "bg-muted/30",
        "flex flex-col justify-start items-center",
      )}
    >
      <div className="container px-4 md:px-6 max-w-3xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Still deciding? Here are the questions we hear most often.
          </p>
        </div>

        <div className="divide-y divide-border rounded-lg border bg-background/40">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              className={cn(
                "group",
                "px-5 md:px-6 py-4",
                "open:bg-muted/20",
                "transition-colors",
              )}
            >
              <summary
                className={cn(
                  "flex items-center justify-between gap-4",
                  "cursor-pointer list-none",
                  "text-left text-base md:text-lg font-medium",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",
                )}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  aria-hidden
                  className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                />
              </summary>
              <div className="pt-3 text-muted-foreground text-base leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          Still have questions?{" "}
          <a
            href={`mailto:${emails.salesEmail}`}
            className="text-primary hover:underline"
          >
            Talk to our team
          </a>{" "}
          or{" "}
          <a
            href={`#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`}
            className="text-primary hover:underline"
          >
            join the launch list
          </a>
          .
        </p>
      </div>
    </section>
  );
}

export default FaqSection;
