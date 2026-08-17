"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { cn } from "@schemavaults/ui";
import { ChevronDown } from "lucide-react";
import type { ReactElement } from "react";

interface FaqEntry {
  q: string;
  a: string;
}

const faqs: readonly FaqEntry[] = [
  {
    q: "What is a SchemaVault?",
    a:
      "A vault is a schema-enforced graph database. You define the shape of your" +
      " data once as a schema, then every read and write into the vault is" +
      " validated against it — so your agents, workflows, and apps never have" +
      " to guess what shape the data is in.",
  },
  {
    q: "How is this different from a traditional database?",
    a:
      "Traditional databases store rows or documents; SchemaVaults stores a" +
      " typed graph you can query, traverse, and reuse. Schemas are first-class" +
      " and portable — the same definition powers your TypeScript SDK types," +
      " your validation, and your agents' tool signatures.",
  },
  {
    q: "Do I have to write code?",
    a:
      "No. Use the visual schema editor or describe your data to our AI to" +
      " scaffold schemas and vaults. If you prefer code, our TypeScript SDKs" +
      " give you end-to-end type safety from schema to production.",
  },
  {
    q: "How does it work with AI agents?",
    a:
      "SchemaVaults exposes your vaults over Model Context Protocol (MCP), so" +
      " agents can read and write structured memories, thoughts, and artifacts" +
      " that match a schema you defined — no more parsing free-form JSON.",
  },
  {
    q: "Can I self-host?",
    a:
      "Yes. Run in our managed cloud for the fastest setup, or self-host" +
      " in-memory or on your own compute cluster. Enterprise plans include" +
      " bring-your-own-compute and bring-your-own-models options.",
  },
  {
    q: "Is there a free plan?",
    a:
      "Yes — the Free plan is free forever and includes 1 GB of storage, 3" +
      " vaults, 5 schemas in the global registry, and 100 agent queries per" +
      " month. No credit card required.",
  },
];

export function FaqSection(): ReactElement {
  return (
    <section
      id="faq"
      className={cn(
        "py-24",
        "w-full",
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
            Everything you need to know before you spin up your first vault.
          </p>
        </div>
        <ul className="w-full divide-y border rounded-lg bg-background/60">
          {faqs.map((faq, i) => (
            <li key={i}>
              <details className="group">
                <summary
                  className={cn(
                    "flex items-center justify-between gap-4",
                    "px-5 py-4 cursor-pointer select-none",
                    "text-left text-base md:text-lg font-medium",
                    "list-none [&::-webkit-details-marker]:hidden",
                    "hover:bg-muted/40 transition-colors",
                  )}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-muted-foreground",
                      "transition-transform duration-200",
                      "group-open:rotate-180",
                    )}
                  />
                </summary>
                <div className="px-5 pb-5 -mt-1 text-muted-foreground text-base leading-relaxed">
                  {faq.a}
                </div>
              </details>
            </li>
          ))}
        </ul>
        <p className="text-center text-sm text-muted-foreground mt-10">
          Still have questions?{" "}
          <a
            href={`#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`}
            className="text-primary hover:underline"
          >
            Get in touch
          </a>
          .
        </p>
      </div>
    </section>
  );
}

export default FaqSection;
