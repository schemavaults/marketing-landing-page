"use client";

import { cn, Wordmark } from "@schemavaults/ui";
import { ChevronDown } from "lucide-react";
import type { ReactNode, ReactElement } from "react";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";

interface FAQItem {
  id: string;
  question: string;
  answer: ReactNode;
}

export function FAQSection(): ReactElement {
  const emails = useOrgEmailAddresses();

  const faqs: FAQItem[] = [
    {
      id: "what-is-it",
      question: "Is SchemaVaults a database, an ORM, or something else?",
      answer: (
        <>
          Both — and a little more. A <strong>vault</strong> is a graph data
          store whose contents are enforced by a <strong>schema</strong> you
          define. You get the storage layer and the type contract in one
          place, so the same shape powers your database, your SDK types, and
          your agent tools.
        </>
      ),
    },
    {
      id: "vs-zod-prisma",
      question:
        "How is this different from rolling my own Zod + Prisma + Postgres stack?",
      answer: (
        <>
          You can absolutely do that — and many teams do. The difference is
          that with <Wordmark /> the schema, validation, storage, and
          agent-facing tool descriptions all come from a single source of
          truth. No drift between your Zod types, your DB migrations, and
          what your MCP tools tell the model.
        </>
      ),
    },
    {
      id: "self-host",
      question: "Can I self-host or run it in my own VPC?",
      answer: (
        <>
          Yes. Use our managed cloud for the fastest start, run vaults
          in-memory for local dev, or deploy into your own datacenter on the
          Enterprise plan — including bring-your-own compute and models.
        </>
      ),
    },
    {
      id: "ai-agents",
      question: "How does this help AI agents specifically?",
      answer: (
        <>
          Agents read and write your vault through Model Context Protocol
          (MCP), and every read/write is type-checked against your schema.
          That means the model can&apos;t silently produce malformed memories
          or artifacts — you get the shape guarantees you&apos;d expect from
          a typed backend, applied to LLM output.
        </>
      ),
    },
    {
      id: "languages",
      question: "Which languages and frameworks are supported?",
      answer: (
        <>
          First-class TypeScript SDKs today, with the same schemas usable
          across your Next.js, Node, Bun, and edge runtimes. The schema
          editor and chatbot mean you don&apos;t need to write code at all
          to define data — but the SDKs are there when you do.
        </>
      ),
    },
    {
      id: "limits",
      question: "What happens if I exceed the limits on my plan?",
      answer: (
        <>
          We&apos;ll let you know before anything breaks. You can upgrade,
          downgrade, or cancel at any time — there are no setup fees and no
          long-term contracts on self-serve plans.
        </>
      ),
    },
    {
      id: "data-portability",
      question: "Can I export my data and schemas?",
      answer: (
        <>
          Yes. Schemas are portable definitions you own, and vault contents
          can be exported at any time. You&apos;re never locked in.
        </>
      ),
    },
    {
      id: "more-questions",
      question: "I have a question that isn't here.",
      answer: (
        <>
          Reach out to{" "}
          <a
            href={`mailto:${emails.salesEmail}`}
            className="text-primary hover:underline"
          >
            {emails.salesEmail}
          </a>{" "}
          for sales and partnership questions, or{" "}
          <a
            href={`mailto:${emails.supportEmail}`}
            className="text-primary hover:underline"
          >
            {emails.supportEmail}
          </a>{" "}
          for technical help. We&apos;re a small team and we read every
          email.
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
        "bg-muted/30",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The things prospective customers ask us most often. Don&apos;t see
            yours? Ask us directly.
          </p>
        </div>
        <div className="rounded-lg border bg-background divide-y">
          {faqs.map((faq) => (
            <details key={faq.id} className="group">
              <summary
                className={cn(
                  "flex items-center justify-between gap-4",
                  "px-4 md:px-6 py-4 cursor-pointer select-none",
                  "text-left text-base md:text-lg font-medium",
                  "hover:bg-muted/50 rounded-lg",
                  "list-none [&::-webkit-details-marker]:hidden",
                )}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                    "group-open:rotate-180",
                  )}
                />
              </summary>
              <div className="px-4 md:px-6 pb-5 pt-1 text-muted-foreground text-base leading-relaxed">
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
