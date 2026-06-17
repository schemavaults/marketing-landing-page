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

const faqs: readonly FAQEntry[] = [
  {
    id: "what-is-a-vault",
    question: "What exactly is a 'vault'?",
    answer:
      "A vault is a typed graph database whose contents are enforced by a schema you define. Think of it as a database where every record is guaranteed to match a shape you specified — so your apps, workflows, and agents never have to defensively check 'is this field actually a string?' again.",
  },
  {
    id: "self-host-or-cloud",
    question: "Can I self-host, or do I have to use your cloud?",
    answer:
      "Both. You can let us host your vaults on our managed cloud for zero-setup scaling, run an in-memory vault locally for lightning-fast development, or deploy into your own datacenter or compute cluster for full control over residency and compliance.",
  },
  {
    id: "vs-traditional-db",
    question: "How is this different from Postgres / Mongo / a vector DB?",
    answer:
      "Traditional relational databases force you to pre-design rigid table shapes. Document stores let anything in and push validation to your app code. Vector DBs are search indexes, not sources of truth. SchemaVaults gives you graph-shaped storage with first-class, evolvable, composable schemas — so your data is flexible and validated, without you owning the validation code.",
  },
  {
    id: "ai-agents",
    question: "How does this help my AI agents?",
    answer:
      "LLMs are notoriously sloppy at producing structured output. SchemaVaults exposes your schemas via Model Context Protocol (MCP) so agents read and write data that's guaranteed to match the shape you expect — no more brittle JSON parsing or retry loops over malformed agent output.",
  },
  {
    id: "languages-sdks",
    question: "Which languages and frameworks are supported?",
    answer:
      "Our first-class SDKs are TypeScript / JavaScript, designed for end-to-end type safety from your backend through to your React / Next.js frontend. The HTTP and MCP APIs work from any language. More SDKs are on the roadmap — let us know which you need.",
  },
  {
    id: "free-tier",
    question: "Is there really a free forever plan?",
    answer:
      "Yes. The Free plan includes 1 GB of storage, 3 vaults, 5 schemas in the global registry, and 100 agent queries per month — no credit card required. It's enough to build and ship a real side project.",
  },
  {
    id: "private-beta",
    question: "When can I sign up?",
    answer:
      "SchemaVaults is currently in private beta. Drop your email in the form above and we'll send you an invite the moment early access opens. You can also reach out to sales if you have an immediate production use case.",
  },
];

export function FAQSection(): ReactElement {
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
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know before you sign up. Still curious?
            We're one email away.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              className={cn(
                "group rounded-lg border border-border bg-background/60",
                "px-5 py-4",
                "transition-colors hover:border-primary/40",
                "open:border-primary/50 open:shadow-sm",
              )}
            >
              <summary
                className={cn(
                  "flex cursor-pointer list-none items-center justify-between",
                  "text-base md:text-lg font-semibold",
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
