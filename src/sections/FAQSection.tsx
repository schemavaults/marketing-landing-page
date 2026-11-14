"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import { cn } from "@schemavaults/ui";
import { ChevronDown } from "lucide-react";
import type { ReactElement, ReactNode } from "react";

export interface FrequentlyAskedQuestion {
  id: string;
  question: string;
  /** Rendered answer. */
  answer: ReactNode;
  /** Plain-text equivalent of `answer`, used for FAQPage structured data. */
  answerText: string;
}

/**
 * Objection handling.
 *
 * NOTE FOR MAINTAINERS: every answer below is deliberately scoped to claims
 * already made elsewhere on this page (deployment targets, SDKs, MCP support,
 * plan limits). Before adding anything about compliance certifications,
 * uptime, SLAs, or data retention, confirm it with the team first --
 * unverifiable claims on a pricing page cost more trust than they buy.
 */
function useFrequentlyAskedQuestions(): readonly FrequentlyAskedQuestion[] {
  const privateBeta: boolean = usePrivateBeta();
  const { salesEmail, supportEmail } = useOrgEmailAddresses();

  const whatIsAVault =
    "A vault is a datastore whose contents are enforced by a schema — a specification for the shape of the data allowed inside it. " +
    "Vaults store data as a graph rather than as fixed relational tables, so you can nest and reference schemas inside one another and still get a hard guarantee about the shape of anything you read or write.";

  const vsPostgres =
    "A relational database validates columns but knows nothing about your application types, so you end up redefining the same shape in your migrations, your API layer, and your frontend. " +
    "A document database skips validation entirely. SchemaVaults keeps one schema as the source of truth: the storage layer enforces it and the TypeScript SDKs derive your types from it, so the definition cannot drift out of sync with the data.";

  const noCode =
    "No. You can define schemas in the visual schema editor, or describe what you are storing to the agentic chat assistant and have it build the schema for you. " +
    "TypeScript SDKs are there if you would rather define things in code, but they are optional.";

  const whereData =
    "Your choice. Run a vault on our cloud platform for the fastest setup, in-memory for local development and tests, or inside your own datacenter or compute cluster. " +
    "Self-hosting and bring-your-own-compute are available on the Enterprise plan.";

  const agents =
    "Agents are good at producing text and bad at producing consistently-shaped output. Giving an agent a vault via Model Context Protocol (MCP) means its memories, thoughts, and artifacts are validated against your schema on write — " +
    "so a malformed tool response fails loudly at the boundary instead of silently corrupting state that something downstream depends on.";

  const lockIn =
    "Your schemas are declarative definitions and your data is yours. Because the same vault can run on our cloud, in-memory, or on your own infrastructure, changing where it runs does not mean rewriting how your application talks to it.";

  const pricingQuestion = privateBeta
    ? "What happens to pricing when the beta ends?"
    : "Can I change plans later?";
  const pricingAnswerText = privateBeta
    ? "The plans listed above are what we intend to launch with. Join the waitlist and we will tell you before anything changes — you will not be moved onto a paid plan without opting in. " +
      `If you have a requirement that does not fit a listed plan, email ${salesEmail}.`
    : "Yes. Start on the free plan and upgrade when you outgrow it; you can move between plans at any time. " +
      `For anything outside the listed plans, email ${salesEmail}.`;

  return [
    {
      id: "what-is-a-vault",
      question: "What exactly is a “vault”?",
      answer: whatIsAVault,
      answerText: whatIsAVault,
    },
    {
      id: "vs-postgres",
      question:
        "How is this different from Postgres with Zod, or from a plain document database?",
      answer: vsPostgres,
      answerText: vsPostgres,
    },
    {
      id: "do-i-need-to-write-code",
      question: "Do I have to write code to use it?",
      answer: noCode,
      answerText: noCode,
    },
    {
      id: "where-does-data-live",
      question: "Where does my data actually live? Can I self-host?",
      answer: whereData,
      answerText: whereData,
    },
    {
      id: "ai-agents",
      question: "How does this help with AI agents?",
      answer: agents,
      answerText: agents,
    },
    {
      id: "lock-in",
      question: "Am I locked in?",
      answer: lockIn,
      answerText: lockIn,
    },
    {
      id: "pricing-change",
      question: pricingQuestion,
      answerText: pricingAnswerText,
      answer: privateBeta ? (
        <>
          The plans above are what we intend to launch with. Join the waitlist
          and we will tell you before anything changes &mdash; you will not be
          moved onto a paid plan without opting in. Have a requirement that
          does not fit a listed plan?{" "}
          <a
            href={`mailto:${salesEmail}`}
            className="text-primary hover:underline"
          >
            Talk to us
          </a>
          .
        </>
      ) : (
        <>
          Yes. Start on the free plan and upgrade when you outgrow it; you can
          move between plans at any time. For anything outside the listed
          plans,{" "}
          <a
            href={`mailto:${salesEmail}`}
            className="text-primary hover:underline"
          >
            contact sales
          </a>
          .
        </>
      ),
    },
    {
      id: "more-questions",
      question: "I have a question that is not answered here.",
      answerText:
        `We would rather answer it than have you guess. Email ${supportEmail} for technical questions, ` +
        `or ${salesEmail} for anything about plans, procurement, or self-hosting.`,
      answer: (
        <>
          We would rather answer it than have you guess. Email{" "}
          <a
            href={`mailto:${supportEmail}`}
            className="text-primary hover:underline"
          >
            {supportEmail}
          </a>{" "}
          for technical questions, or{" "}
          <a
            href={`mailto:${salesEmail}`}
            className="text-primary hover:underline"
          >
            {salesEmail}
          </a>{" "}
          for anything about plans, procurement, or self-hosting.
        </>
      ),
    },
  ];
}

/**
 * Built on native <details>/<summary> rather than a JS accordion so that every
 * answer is present in the server-rendered HTML: crawlable by search engines
 * and readable even if the client bundle never loads.
 */
export function FAQSection(): ReactElement {
  const questions = useFrequentlyAskedQuestions();

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answerText,
      },
    })),
  };

  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn(
        "py-24 w-full scroll-mt-16",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-balance">
            Questions, answered
          </h2>
          <p className="mx-auto max-w-[640px] text-muted-foreground text-lg text-balance">
            The things people ask us before they commit.
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-border rounded-lg border border-border bg-background/40">
          {questions.map((faq) => (
            <details key={faq.id} className="group px-5 py-1">
              <summary
                className={cn(
                  "flex w-full cursor-pointer list-none items-center justify-between gap-4",
                  "py-4 text-left text-base md:text-lg font-medium",
                  "hover:text-primary transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
                  "[&::-webkit-details-marker]:hidden",
                )}
              >
                {faq.question}
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="pb-5 pr-9 text-muted-foreground text-base leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        // Content is a static, locally-constructed object -- no user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
    </section>
  );
}

export default FAQSection;
