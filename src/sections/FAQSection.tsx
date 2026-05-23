"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import { cn } from "@schemavaults/ui";
import { ChevronDown } from "lucide-react";
import type { ReactElement, ReactNode } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: ReactNode;
}

const faqs: readonly FAQItem[] = [
  {
    id: "what-is-a-vault",
    question: "What exactly is a Vault?",
    answer:
      "A Vault is a graph database whose contents are enforced by a schema you define. Think of it as the storage layer plus the type system, bundled together — so the data you read back is always shaped the way your code expects.",
  },
  {
    id: "vs-zod",
    question:
      "How is this different from validating with Zod / TypeBox / Pydantic?",
    answer:
      "Validation libraries check data at one boundary in your application. SchemaVaults uses the schema as the source of truth for storage, validation, agent I/O, and code generation — across every service and runtime. Same schema, every layer, no duplication.",
  },
  {
    id: "self-host",
    question: "Can I self-host?",
    answer:
      "Yes. Run SchemaVaults in-memory for local development, on our managed cloud for production, or fully self-hosted in your own VPC/datacenter. The SDK is identical across all three.",
  },
  {
    id: "security",
    question: "How secure is my data?",
    answer:
      "Data is encrypted at rest and in transit. Fine-grained access controls let you scope reads & writes per-schema and per-vault. Enterprise plans add SSO, audit logs, custom SLAs, and bring-your-own-key encryption.",
  },
  {
    id: "ai-agents",
    question: "Do I have to use AI agents?",
    answer:
      "No. SchemaVaults works great as a schema-first content management system or graph database with no AI in the loop. The agent-friendly MCP interface is there if and when you want it.",
  },
  {
    id: "languages",
    question: "What languages and frameworks are supported?",
    answer:
      "First-class TypeScript SDK today, with HTTP & MCP APIs that work from any language or runtime. SDKs for Python and Go are on the roadmap.",
  },
  {
    id: "migrate",
    question: "Can I migrate data in from an existing database?",
    answer:
      "Yes — import from JSON, CSV, Postgres, or any source you can pipe through our import API. The schema you define becomes the contract every incoming row must satisfy.",
  },
  {
    id: "trial",
    question: "Is there a free trial or money-back guarantee?",
    answer:
      "The Free tier is forever free — no credit card required. Paid plans can be cancelled any time and are pro-rated.",
  },
];

export function FAQSection(): ReactElement {
  const emails = useOrgEmailAddresses();

  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn(
        "py-24",
        "w-full",
        "flex flex-col justify-start items-center",
        "bg-background",
      )}
    >
      <div className="container px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything teams ask before they ship with SchemaVaults.
          </p>
        </div>

        <div className="w-full divide-y divide-border border-y border-border">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              className="group py-5 px-1 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary
                className={cn(
                  "flex w-full cursor-pointer items-center justify-between gap-4",
                  "text-left text-base md:text-lg font-medium",
                  "list-none",
                  "hover:text-foreground/80 transition-colors",
                )}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                    "group-open:rotate-180",
                  )}
                  aria-hidden="true"
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
          </a>
          .
        </p>
      </div>
    </section>
  );
}

export default FAQSection;
