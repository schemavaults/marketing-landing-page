import type { ReactElement } from "react";
import { cn } from "@schemavaults/ui";
import { ChevronDown } from "lucide-react";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: readonly FaqItem[] = [
  {
    id: "what-is-a-schema",
    question: 'What exactly is a "schema" and a "vault"?',
    answer:
      "A schema is a specification for the shape of your data — the fields, types, and relationships it must have. A vault is a graph database that only accepts data conforming to the schemas you've registered. Together they give you type-safe storage that your AI agents, workflows, and apps can rely on.",
  },
  {
    id: "how-is-this-different-from-postgres",
    question: "How is this different from Postgres or MongoDB?",
    answer:
      "SchemaVaults is a schema-first graph database designed for AI-era workloads. Where relational databases force you into rigid tables and document stores let anything through, vaults let you compose flexible graph structures while still enforcing your types on every write — with first-class support for the Model Context Protocol so agents can read and write memory safely.",
  },
  {
    id: "mcp-support",
    question: "Does it work with the Model Context Protocol (MCP)?",
    answer:
      "Yes. Every vault is exposed over MCP out of the box, so any MCP-compatible agent (Claude, ChatGPT, custom SDKs, and more) can read and write structured data with automatic schema validation on every call.",
  },
  {
    id: "self-hosting",
    question: "Can I self-host or bring my own compute?",
    answer:
      "Yes. Run vaults on our managed cloud, in-memory for local development, or in your own datacenter. Enterprise customers can bring their own compute and models with private networking and custom SLAs.",
  },
  {
    id: "existing-code",
    question: "Do I have to rewrite my existing code?",
    answer:
      "No. Define schemas visually or via chat, then use our TypeScript SDKs to read and write validated data from any Node.js, edge, or browser runtime. Existing services can start writing to a vault the same day.",
  },
  {
    id: "security",
    question: "Is my data secure?",
    answer:
      "Data is encrypted in transit and at rest. Vaults inherit your organization's access controls, and Enterprise plans add SSO, audit logging, self-hosting, and custom SLAs so you can meet your security and compliance requirements.",
  },
  {
    id: "pricing-scale",
    question: "What happens when I outgrow the Free plan?",
    answer:
      "Upgrade to Personal or Teams anytime — no data migration, no downtime. Usage overages are billed transparently, and you can move to Enterprise the moment you need self-hosting, SSO, or custom limits.",
  },
];

export function FAQSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn(
        "py-24",
        "w-screen",
        "flex justify-center items-start",
        "bg-muted/30",
      )}
    >
      <div className="container px-4 md:px-6 max-w-3xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground text-lg">
            Short answers to the things developers ask us most.
          </p>
        </div>
        <div className="w-full divide-y divide-border border-y border-border">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              className={cn("group py-5", "[&_summary::-webkit-details-marker]:hidden")}
            >
              <summary
                className={cn(
                  "flex cursor-pointer list-none items-start justify-between gap-4",
                  "text-left text-base md:text-lg font-semibold",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded",
                )}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className="h-5 w-5 shrink-0 mt-1 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
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

export default FAQSection;
