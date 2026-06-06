"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { cn } from "@schemavaults/ui";
import { ChevronDown } from "lucide-react";
import type { ReactElement } from "react";

interface FAQEntry {
  id: string;
  question: string;
  answer: string;
}

const defaultFAQs: readonly FAQEntry[] = [
  {
    id: "vs-relational-db",
    question:
      "How is SchemaVaults different from a relational database like Postgres?",
    answer:
      "Postgres stores rows; SchemaVaults stores typed, composable schemas alongside the data they describe. " +
      "That means your AI agents, workflow steps, and frontend code all see the same end-to-end type signature " +
      "for every record — without you maintaining a separate schema-management layer.",
  },
  {
    id: "ai-agent-mcp",
    question: "Can my AI agents use this directly? Do you support MCP?",
    answer:
      "Yes. Vaults expose a Model Context Protocol (MCP) interface so your agents can read and write schema-validated " +
      "data without you writing glue code. Every read carries a precise type; every write is validated against the " +
      "schema before it lands. No more agents inventing fields that don't exist.",
  },
  {
    id: "self-host",
    question: "Can I self-host, or do I have to use your cloud?",
    answer:
      "Both. Run vaults serverlessly on our cloud for zero-ops scaling, in-memory locally for the fastest possible " +
      "development loop, or inside your own datacenter for full data sovereignty. The Enterprise plan includes " +
      "self-hosting and bring-your-own-compute options.",
  },
  {
    id: "languages",
    question: "What languages and frameworks are supported?",
    answer:
      "First-class TypeScript SDKs for both frontend and backend code, with schema definitions you can share " +
      "across React, Next.js, Node, Bun, and edge runtimes. The MCP interface and HTTP API make SchemaVaults " +
      "accessible from any language that can speak HTTP.",
  },
  {
    id: "data-security",
    question: "How is my data secured?",
    answer:
      "All vaults are encrypted at rest and in transit. Access is governed by per-vault API keys with scoped " +
      "permissions, and enterprise customers can bring their own KMS, enable SSO, and pin data to specific " +
      "regions. Schemas themselves can be marked private so they never appear in the global registry.",
  },
  {
    id: "migration",
    question: "Can I migrate or export my data later?",
    answer:
      "Yes. Your schemas and vault data are yours — export the full graph as JSON or a self-hostable bundle at " +
      "any time. There is no proprietary storage format you can't read without us.",
  },
  {
    id: "pricing-change",
    question: "What happens if I outgrow the Free plan?",
    answer:
      "Upgrade in-app whenever you're ready — your vaults, schemas, and integrations carry over unchanged. " +
      "If you need something between Personal and Teams, or a custom Enterprise SLA, reach out to sales.",
  },
];

export interface FAQSectionProps {
  faqs?: readonly FAQEntry[];
}

export function FAQSection({
  faqs = defaultFAQs,
}: FAQSectionProps): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn(
        "py-24",
        "w-screen",
        "flex justify-center items-start",
        "bg-background",
      )}
    >
      <div className="container px-4 md:px-6 max-w-3xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground text-lg">
            Still figuring out if SchemaVaults is the right fit? Start here.
          </p>
        </div>

        <div className="rounded-lg border divide-y">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              className="group px-4 md:px-6 py-2 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary
                className={cn(
                  "flex items-center justify-between gap-4",
                  "py-3 cursor-pointer list-none",
                  "text-left text-base font-semibold",
                  "hover:underline",
                )}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform duration-200",
                    "group-open:rotate-180",
                  )}
                />
              </summary>
              <div className="pb-4 text-muted-foreground text-base leading-relaxed">
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
