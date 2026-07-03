"use client";

import type { ReactElement } from "react";
import { cn } from "@schemavaults/ui";
import { ChevronDown } from "lucide-react";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: readonly FAQItem[] = [
  {
    id: "faq-what-is",
    question: "What actually is SchemaVaults?",
    answer:
      "SchemaVaults is a schema-first data platform: define your data types once as schemas, then use those same types to validate agent outputs, back your app data, and drive workflows. Think of it as a graph database that only accepts data matching a shape you defined — with an MCP server, TypeScript SDKs, and a visual editor on top.",
  },
  {
    id: "faq-vs-postgres",
    question: "How is this different from Postgres, MongoDB, or a vector DB?",
    answer:
      "Relational databases enforce shape but are painful to compose across services; document stores are flexible but ship malformed data straight into your app; vector DBs are great for retrieval but not source-of-truth. SchemaVaults is a graph store where the schema is the contract — the same schema definition powers your DB, your API types, your form validation, and the tool inputs/outputs your AI agents produce.",
  },
  {
    id: "faq-ai-agents",
    question: "Why does this matter for AI agents?",
    answer:
      "LLMs love to return almost-right JSON. If an agent's memory, tool output, or artifact doesn't match a schema, it silently breaks the next step of your workflow. SchemaVaults exposes your vaults over Model Context Protocol (MCP), so agents read and write against typed schemas — no more hand-rolled parsers, retries, or brittle JSON.parse wrappers.",
  },
  {
    id: "faq-self-host",
    question: "Can I self-host, or do I have to use your cloud?",
    answer:
      "Both. Run SchemaVaults on our managed cloud, embed it in-memory for local access, or deploy it into your own datacenter or VPC. Enterprise plans include bring-your-own-compute and bring-your-own-models.",
  },
  {
    id: "faq-security",
    question: "Where does my data live and how is it secured?",
    answer:
      "Cloud-hosted vaults are encrypted at rest and in transit and can be pinned to specific regions. Self-hosted deployments never send your data to us. On Teams and Enterprise plans you get SSO, role-based access, and audit logs.",
  },
  {
    id: "faq-migrate",
    question: "How hard is it to migrate off?",
    answer:
      "Your schemas are portable — they compile down to standard TypeScript types and JSON Schema, and vault data can be exported to plain JSON at any time. No lock-in, no proprietary export format.",
  },
  {
    id: "faq-when",
    question: "When can I actually use it?",
    answer:
      "SchemaVaults is currently in private beta. The Free tier lets you kick the tires the moment public access opens — join the waitlist below to get early access and launch pricing.",
  },
];

export function FAQSection(): ReactElement {
  const emails = useOrgEmailAddresses();

  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn(
        "py-24 w-screen",
        "bg-muted/30",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
            Everything you need to know before joining the beta.
          </p>
        </div>

        <div className="max-w-3xl mx-auto rounded-lg border divide-y bg-background/60">
          {faqs.map((item) => (
            <details
              key={item.id}
              className="group px-5 py-4 open:pb-5"
            >
              <summary
                className={cn(
                  "flex items-center justify-between gap-4",
                  "cursor-pointer list-none",
                  "text-left text-base md:text-lg font-semibold",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",
                )}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground",
                    "transition-transform duration-200",
                    "group-open:rotate-180",
                  )}
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 text-muted-foreground leading-relaxed text-sm md:text-base">
                {item.answer}
              </p>
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
          </a>
          .
        </p>
      </div>
    </section>
  );
}

export default FAQSection;
