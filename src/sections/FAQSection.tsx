"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import { cn } from "@schemavaults/ui";
import { ChevronDown } from "lucide-react";
import type { ReactElement, ReactNode } from "react";

interface FAQ {
  id: string;
  question: string;
  answer: ReactNode;
}

export function FAQSection(): ReactElement {
  const emails = useOrgEmailAddresses();

  const faqs: readonly FAQ[] = [
    {
      id: "what-is-it",
      question: "What exactly is a SchemaVault?",
      answer:
        "A Vault is a graph database whose contents are validated against a schema you define. Think of it as a typed datastore: every node, every edge, and every property is checked against a shape you control — so your apps, agents, and workflows never have to second-guess the data they're reading.",
    },
    {
      id: "free-tier",
      question: "Is there really a free tier?",
      answer:
        "Yes — the Free plan is free forever with 1 GB storage, 3 vaults, and 100 agent queries per month. No credit card required. It's enough to ship a real side project or evaluate SchemaVaults end-to-end before you upgrade.",
    },
    {
      id: "self-host",
      question: "Can I self-host my data?",
      answer:
        "Yes. Vaults can run on our managed cloud, in-memory for local development, or fully self-hosted in your own datacenter on the Enterprise plan. Bring your own compute and your own LLMs if you need to keep everything inside your perimeter.",
    },
    {
      id: "vs-relational",
      question: "How is this different from a normal SQL or NoSQL database?",
      answer:
        "Traditional databases force a tradeoff: rigid schemas (Postgres) or schemaless flexibility (MongoDB). SchemaVaults gives you both — a graph model that can evolve as your data does, with strict schema validation at the boundary so bad data can't get in. And you get a TypeScript-native SDK and natural-language interface on top.",
    },
    {
      id: "ai-agents",
      question: "How does this help with AI agents?",
      answer:
        "Agents are notoriously bad at producing structured data reliably. SchemaVaults exposes your vaults to agents as typed MCP tools — the agent sees schemas as part of its tool definitions, and any output that violates the schema is rejected before it touches your database. Memories, thoughts, and artifacts stay clean.",
    },
    {
      id: "typescript-only",
      question: "Do I have to use TypeScript?",
      answer:
        "TypeScript gets first-class support today, but you don't have to write code at all. Use the visual schema editor, chat with our AI to define schemas in plain English, or hit the REST API from any language. The TS SDK is the fastest path for developers — it's not the only path.",
    },
    {
      id: "migration",
      question: "Can I migrate data from my existing database?",
      answer:
        "Yes — schemas can be authored against existing data, and we provide importers for common sources (Postgres, MongoDB, JSON dumps). On the Teams and Enterprise plans you also get custom integration support to handle non-standard shapes.",
    },
    {
      id: "security",
      question: "How is my data secured?",
      answer: (
        <>
          All data is encrypted in transit and at rest. Authentication is
          handled by our auth service with SSO available on Teams and
          Enterprise. Enterprise customers get a custom SLA and the option to
          self-host inside their own VPC. Have a specific compliance
          requirement?{" "}
          <a
            href={`mailto:${emails.salesEmail}`}
            className="text-primary hover:underline"
          >
            Talk to our sales team
          </a>
          .
        </>
      ),
    },
  ];

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
            Everything you need to know before you start.
          </p>
        </div>

        <div className="w-full divide-y divide-border border-y border-border">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              className="group py-2"
              name="schemavaults-faq"
            >
              <summary
                className={cn(
                  "flex w-full items-center justify-between gap-4",
                  "cursor-pointer list-none py-4",
                  "text-left text-base md:text-lg font-medium",
                  "hover:text-foreground/80 transition-colors",
                  "[&::-webkit-details-marker]:hidden",
                )}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted-foreground",
                    "transition-transform duration-200",
                    "group-open:rotate-180",
                  )}
                  aria-hidden="true"
                />
              </summary>
              <div className="pb-4 pr-9 text-muted-foreground text-base leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          Still have questions?{" "}
          <a
            href={`mailto:${emails.supportEmail}`}
            className="text-primary hover:underline"
          >
            Contact support
          </a>{" "}
          or{" "}
          <a
            href={`mailto:${emails.salesEmail}`}
            className="text-primary hover:underline"
          >
            talk to sales
          </a>
          .
        </p>
      </div>
    </section>
  );
}

export default FAQSection;
