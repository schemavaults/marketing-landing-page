"use client";

import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { cn } from "@schemavaults/ui";
import { ChevronDown } from "lucide-react";
import type { ReactElement } from "react";

export interface FaqEntry {
  id: string;
  question: string;
  /**
   * Plain text, deliberately. Keeping answers as strings lets the same content
   * serve the rendered page and the FAQPage structured data below, so Google
   * can surface these questions directly in search results.
   */
  answer: string;
}

export interface FaqSectionProps {
  /** Override the default question set entirely. */
  faqs?: readonly FaqEntry[];
  /**
   * Emit FAQPage JSON-LD alongside the rendered questions. Only enable this on
   * the one page that actually shows the FAQ, and only while the answers here
   * match what a visitor sees.
   */
  structuredData?: boolean;
}

/**
 * Objection handling. Every question below is one a visitor silently asks
 * before they are willing to hand over an email address or a credit card; a
 * landing page that leaves them unanswered loses the visitor to a competitor's
 * docs rather than to a considered "no".
 *
 * Keep answers short, concrete, and honest about what is not built yet —
 * over-claiming here is what turns a signup into a refund.
 */
function buildDefaultFaqs(
  privateBeta: boolean,
  salesEmail: string,
): readonly FaqEntry[] {
  return [
    {
      id: "what-is-a-vault",
      question: "What exactly is a “vault”?",
      answer:
        "A vault is a datastore whose contents are guaranteed to match a schema you defined. " +
        "Writes that do not fit the schema are rejected at the boundary, and reads come back " +
        "with the types you declared, so every consumer — a web app, a background job, an AI " +
        "agent — works from the same contract instead of its own hand-written assumptions.",
    },
    {
      id: "vs-validation-library",
      question:
        "How is this different from using a validation library in my app?",
      answer:
        "A validation library validates data inside one process. The schema still lives in that " +
        "codebase, so every other service, pipeline and agent re-implements (and eventually " +
        "drifts from) it. SchemaVaults makes the schema a shared source of truth and enforces " +
        "it at the storage layer, so there is exactly one definition to change when your data " +
        "model changes.",
    },
    {
      id: "vs-relational-database",
      question: "Why not just use a relational database?",
      answer:
        "Use one if your data is genuinely tabular and stable. Vaults are a better fit when your " +
        "records are deeply nested or reference each other as a graph, when schemas compose out " +
        "of other schemas, and when the things reading and writing your data include agents and " +
        "workflows that need to discover the shape of the data at runtime rather than at deploy " +
        "time.",
    },
    {
      id: "agents",
      question: "How do AI agents fit in?",
      answer:
        "Vaults are exposed over the Model Context Protocol (MCP), so an agent can list the " +
        "schemas it is allowed to touch and write structured output straight into a vault. " +
        "Because the vault enforces the schema, a malformed or hallucinated record is rejected " +
        "instead of quietly poisoning downstream steps.",
    },
    {
      id: "hosting",
      question: "Can I keep my data in my own infrastructure?",
      answer:
        "Yes. The same vault can run on our managed cloud, in-memory for local development and " +
        "tests, or self-hosted in your own datacenter or compute cluster. Self-hosting is " +
        "included with Enterprise plans.",
    },
    {
      id: "lock-in",
      question: "What happens to my data if I want to leave?",
      answer:
        "Your schemas are declarative documents and your records are exportable, so a vault can " +
        "be moved between the managed cloud and your own infrastructure without rewriting your " +
        "application code. If you want a migration path reviewed before you commit, email " +
        salesEmail +
        " and we will walk through it with you.",
    },
    {
      id: "code-required",
      question: "Do I need to write code to use it?",
      answer:
        "No. You can define a schema in the visual editor, or describe what you are storing to " +
        "our assistant and refine what it drafts. TypeScript SDKs are there when you want them, " +
        "not as a prerequisite.",
    },
    privateBeta
      ? {
          id: "beta-access",
          question: "When can I get access?",
          answer:
            "We are inviting private-beta users in batches. Join the waitlist and you will get " +
            "exactly one email when your invite is ready — no drip campaign. Beta use is free, " +
            "and we will tell you before anything starts costing money.",
        }
      : {
          id: "free-plan",
          question: "Is the free plan really free?",
          answer:
            "Yes — no card required, and it does not expire. It is capped on storage, vaults and " +
            "monthly agent queries rather than crippled on features, so you can build something " +
            "real before deciding whether to pay.",
        },
  ];
}

/**
 * Native <details>/<summary> rather than a JS accordion: the answer text stays
 * in the DOM for crawlers whether or not it is expanded, it costs no
 * hydration, and keyboard and screen-reader behaviour is the browser's.
 */
function FaqItem({ entry }: { entry: FaqEntry }): ReactElement {
  return (
    <details
      id={entry.id}
      className={cn(
        "group",
        "border-b border-border last:border-b-0",
        "[&_summary::-webkit-details-marker]:hidden",
      )}
    >
      <summary
        className={cn(
          "flex flex-row items-center justify-between gap-4",
          "cursor-pointer list-none",
          "py-5 text-left text-base md:text-lg font-semibold",
          "hover:text-primary transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
        )}
      >
        <span>{entry.question}</span>
        <ChevronDown
          className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="pb-5 pr-9 text-muted-foreground text-base leading-relaxed">
        {entry.answer}
      </div>
    </details>
  );
}

export function FaqSection({
  faqs,
  structuredData = true,
}: FaqSectionProps): ReactElement {
  const privateBeta: boolean = usePrivateBeta();
  const emails = useOrgEmailAddresses();
  const entries: readonly FaqEntry[] =
    faqs ?? buildDefaultFaqs(privateBeta, emails.salesEmail);

  const faqPageJsonLd: string = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry: FaqEntry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  })
    // Escape `<` so a question or answer containing "</script>" can never
    // break out of the script element.
    .replace(/</g, "\\u003c");

  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn(
        "w-full py-20 md:py-24",
        "bg-muted/50",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-3 mb-10 md:mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Questions you are probably about to ask
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
            Still unsure after reading these?{" "}
            <a
              href={`mailto:${emails.salesEmail}`}
              className="text-primary hover:underline"
            >
              Ask us directly
            </a>{" "}
            — a human answers.
          </p>
        </div>

        <div
          className={cn(
            "max-w-3xl mx-auto",
            "rounded-lg border bg-background/60 px-5 md:px-6",
          )}
        >
          {entries.map((entry: FaqEntry) => (
            <FaqItem key={entry.id} entry={entry} />
          ))}
        </div>
      </div>

      {structuredData && (
        <script
          type="application/ld+json"
          // Content is authored in this file (or passed by the host app), and
          // JSON.stringify escapes the values.
          dangerouslySetInnerHTML={{ __html: faqPageJsonLd }}
        />
      )}
    </section>
  );
}

export default FaqSection;
