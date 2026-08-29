"use client";

import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import sectionAnchorOffsetClassName from "@/lib/sectionAnchorOffsetClassName";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { cn } from "@schemavaults/ui";
import { ChevronDown } from "lucide-react";
import type { ReactElement, ReactNode } from "react";

interface FrequentlyAskedQuestion {
  id: string;
  question: string;
  answer: ReactNode;
}

/**
 * Objections a technical evaluator forms while reading the rest of this page,
 * answered in the order they tend to occur. Every answer restates a capability
 * that is already claimed in another section (self-hosting, schema re-use,
 * MCP, the free tier) rather than introducing a new promise.
 */
function useFrequentlyAskedQuestions(): readonly FrequentlyAskedQuestion[] {
  const emails = useOrgEmailAddresses();
  const privateBeta: boolean = usePrivateBeta();

  const questions: FrequentlyAskedQuestion[] = [
    {
      id: "why-not-database-plus-validation-library",
      question:
        "How is this different from a database plus a validation library?",
      answer:
        "With a database and a separate validation library, the schema lives in your application code and the storage layer trusts whatever it is handed. " +
        "SchemaVaults makes the schema the thing the vault enforces, so the same definition validates data on write, describes it on read, and generates the types your apps and agents consume. " +
        "There is one definition to change instead of one per service.",
    },
    {
      id: "do-i-have-to-write-code",
      question: "Do I have to write code to use it?",
      answer:
        "No. You can define a schema in the visual editor, or describe what you are trying to store to the agentic chat assistant and let it draft the schema for you. " +
        "If you would rather work in code, the TypeScript SDKs cover the same surface, and the two approaches operate on the same schemas.",
    },
    {
      id: "agent-integration",
      question: "How do AI agents read and write my vaults?",
      answer:
        "Through the Model Context Protocol (MCP). Agents store thoughts, memories, and artifacts in your vaults as schema-validated records, which means their output is checked against the shape you defined instead of being trusted as free-form text.",
    },
    {
      id: "data-ownership",
      question: "Where does my data actually live? Am I locked in?",
      answer:
        "Wherever you choose. Run vaults on our managed cloud, in memory for fast local access, or in your own datacenter or compute cluster. " +
        "Enterprise plans additionally support bringing your own compute and models. Because your schemas are explicit definitions rather than an opaque internal format, the shape of your data is always something you hold.",
    },
    {
      id: "scaling-and-latency",
      question: "What about latency for users in other regions?",
      answer:
        "Vaults can sync across multiple storage regions over a global CDN, so reads are served near your users rather than from a single home region. " +
        "Queries and graph traversals run through a query optimization engine designed for complex traversals.",
    },
    {
      id: "cost-to-start",
      question: "What does it cost to try?",
      answer: (
        <>
          Nothing. The Free plan is $0 forever and includes 1&nbsp;GB of
          storage, 3 vaults, and 100 agent queries per month &mdash; enough to
          model a real schema and see whether the workflow fits how your team
          works. Paid plans start at $19/month and you can move up or cancel at
          any time.
        </>
      ),
    },
    {
      id: "getting-help",
      question: "What if I need something the plans do not cover?",
      answer: (
        <>
          Enterprise plans cover custom integrations, SSO, self-hosting,
          dedicated 24/7 support, and custom SLAs. If your requirements sit
          outside the published plans, write to{" "}
          <a
            href={`mailto:${emails.salesEmail}`}
            className="text-primary hover:underline"
          >
            {emails.salesEmail}
          </a>{" "}
          and we will scope it with you.
        </>
      ),
    },
  ];

  if (privateBeta) {
    questions.unshift({
      id: "private-beta-access",
      question: "Can I sign up today?",
      answer: (
        <>
          SchemaVaults is currently in private beta, so new accounts need an
          invite code. Join the launch waitlist below and we will send you an
          invite as access opens up &mdash; there is nothing to pay and nothing
          to install in the meantime. If you already hold an invite code, you
          can register right away.
        </>
      ),
    });
  }

  return questions;
}

export function FaqSection(): ReactElement {
  const questions: readonly FrequentlyAskedQuestion[] =
    useFrequentlyAskedQuestions();

  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn(
        "py-24",
        "w-full",
        "flex justify-center items-start",
        sectionAnchorOffsetClassName,
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Questions worth asking first
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
            The things engineering teams usually want settled before they model
            their first schema.
          </p>
        </div>

        {/*
          Native <details>/<summary> rather than a JS accordion: the answers are
          present in the server-rendered HTML (so search engines index them and
          in-page find works), and the section stays interactive even before
          hydration.
        */}
        <div className="max-w-3xl mx-auto w-full divide-y divide-border rounded-lg border">
          {questions.map((faq: FrequentlyAskedQuestion) => (
            <details key={faq.id} name="faq" className="group">
              <summary
                className={cn(
                  "flex flex-row flex-nowrap items-center justify-between gap-4",
                  "px-5 py-4 cursor-pointer list-none",
                  "text-left text-base md:text-lg font-semibold",
                  "hover:bg-muted/50 transition-colors",
                  "marker:content-none [&::-webkit-details-marker]:hidden",
                )}
              >
                {faq.question}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted-foreground",
                    "transition-transform duration-200",
                    "group-open:rotate-180",
                  )}
                />
              </summary>
              <div className="px-5 pb-5 pt-0 text-muted-foreground text-base leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
