"use client";

import type { FC, ReactElement, ReactNode } from "react";
import {
  Accordion,
  AccordionContent as AccordionContentRaw,
  AccordionItem as AccordionItemRaw,
  AccordionTrigger as AccordionTriggerRaw,
  cn,
} from "@schemavaults/ui";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";

// Radix's React-19 prop typings drop children/value/className from these
// primitives; widen locally so they match runtime behavior.
type AccordionItemP = { value: string; className?: string; children?: ReactNode };
type AccordionTriggerP = { className?: string; children?: ReactNode };
type AccordionContentP = { className?: string; children?: ReactNode };
const AccordionItem = AccordionItemRaw as unknown as FC<AccordionItemP>;
const AccordionTrigger =
  AccordionTriggerRaw as unknown as FC<AccordionTriggerP>;
const AccordionContent =
  AccordionContentRaw as unknown as FC<AccordionContentP>;

interface FAQItem {
  q: string;
  a: string;
}

const faqs: readonly FAQItem[] = [
  {
    q: "What exactly is a “vault”?",
    a:
      "A vault is a database whose contents are enforced by a schema you define. " +
      "Think of it as a typed graph store: every node and edge conforms to a shape you control, " +
      "so the data your agents and workflows read is the data you expected to be there.",
  },
  {
    q: "How is this different from Postgres + Zod, or a JSON document store?",
    a:
      "Postgres + Zod keeps types in your application code; SchemaVaults makes the schema a first-class, " +
      "shareable artifact that lives next to the data. JSON document stores accept anything; SchemaVaults " +
      "validates writes against your schema and gives you a typed SDK so the same definition flows " +
      "from your editor to your agent to your frontend.",
  },
  {
    q: "Do my AI agents need to know about SchemaVaults?",
    a:
      "Not really. Agents talk to vaults over the Model Context Protocol (MCP). " +
      "They get tools whose inputs and outputs are typed by your schemas, " +
      "so the model can't silently produce malformed memory or hand off bad data downstream.",
  },
  {
    q: "Can I self-host, or do I have to use your cloud?",
    a:
      "Both. Use the managed cloud for the fastest setup and global sync, run a vault in-memory for " +
      "local-first apps, or host it inside your own datacenter on Enterprise. Same SDKs, same schemas — " +
      "switch the deployment target without rewriting your code.",
  },
  {
    q: "What languages and frameworks are supported?",
    a:
      "First-class TypeScript SDKs today, with end-to-end type safety from schema → SDK → agent tools. " +
      "Anything that can speak HTTP or MCP can integrate; richer SDKs for other languages are on the roadmap.",
  },
  {
    q: "How is my data secured?",
    a:
      "Vaults are private by default, scoped to your organization, and authenticated with short-lived " +
      "credentials. Enterprise plans add SSO, bring-your-own-compute, and self-hosting for teams with " +
      "stricter compliance requirements.",
  },
  {
    q: "When can I start using it?",
    a:
      "SchemaVaults is in private beta. Join the waitlist below to get an invite the moment we open " +
      "additional access — or contact sales if you have a production use case that needs prioritized onboarding.",
  },
];

export function FAQSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn("py-24 bg-muted/30", "w-full", "flex justify-center items-start")}
    >
      <div className="container px-4 md:px-6 max-w-3xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground text-lg">
            Everything you need to know before sending data into a vault.
          </p>
        </div>

        <Accordion type="single" collapsible variant="bordered" className="w-full">
          {faqs.map(
            (item: FAQItem, index: number): ReactElement => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ),
          )}
        </Accordion>
      </div>
    </section>
  );
}

export default FAQSection;
