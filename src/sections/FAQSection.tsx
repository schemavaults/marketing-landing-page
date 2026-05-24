"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  cn,
  Wordmark,
} from "@schemavaults/ui";
import type { ReactElement, ReactNode } from "react";

interface FAQ {
  id: string;
  question: string;
  answer: ReactNode;
}

const faqs: FAQ[] = [
  {
    id: "what-is",
    question:
      "What is SchemaVaults — is it a database, a validator, or both?",
    answer: (
      <>
        Both. <Wordmark /> lets you define your data shape once as a schema,
        then validate every read and write against it. Each "vault" is a
        schema-enforced graph database — so the same definitions power your
        runtime validation, your storage layer, and your AI agent tool calls.
      </>
    ),
  },
  {
    id: "how-different",
    question:
      "How is this different from Postgres + Zod, MongoDB, or a vector store?",
    answer: (
      <>
        Traditional setups force you to redefine your data shape in three
        places: the database schema, your application validators, and your
        agent tool definitions. <Wordmark /> unifies all three. Schemas are
        first-class, composable, and exposed natively over Model Context
        Protocol (MCP) so AI agents can read and write structured data
        without you wiring up custom tools.
      </>
    ),
  },
  {
    id: "self-host",
    question: "Can I self-host, or do I have to use your cloud?",
    answer: (
      <>
        Both options are first-class. Run vaults on our managed cloud for
        zero-ops scaling, in-memory for local development, or in your own
        datacenter for compliance and data residency. Enterprise plans
        include bring-your-own-compute and bring-your-own-model options.
      </>
    ),
  },
  {
    id: "ai-agents",
    question: "Do I need to use AI agents to get value from this?",
    answer: (
      <>
        Not at all. <Wordmark /> works great as a plain content management
        system or a typed graph database for your workflows. The AI agent
        integration is a bonus for teams building agentic products — but the
        core type-safety and storage features stand on their own.
      </>
    ),
  },
  {
    id: "languages",
    question: "Which languages and frameworks are supported?",
    answer: (
      <>
        First-class TypeScript SDKs today, with end-to-end type safety from
        schema to client. The REST and MCP APIs work from any language, and
        the visual schema editor and chat-based schema creation let
        non-developers contribute too.
      </>
    ),
  },
  {
    id: "pricing",
    question: "What does the Free plan actually include?",
    answer: (
      <>
        1 GB of storage, 3 vaults, 5 schemas in the global registry, and 100
        agent queries per month — forever, no credit card required. Plenty
        of room to prototype real projects before you ever upgrade.
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
        "w-full",
        "bg-muted/30",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6 max-w-4xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground text-lg">
            Everything you need to know before getting started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {faqs.map((faq) => (
            <Card
              key={faq.id}
              className="border shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <CardTitle className="text-base md:text-lg leading-snug">
                  {faq.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
