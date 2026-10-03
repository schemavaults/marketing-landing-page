"use client";

import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import useTrackConversionEvent from "@/hooks/useTrackConversionEvent";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { cn } from "@schemavaults/ui";
import { ChevronDown } from "lucide-react";
import type { ReactElement, ReactNode } from "react";

export interface FaqEntry {
  id: string;
  question: string;
  /** Rendered answer. May contain links and other markup. */
  answer: ReactNode;
  /**
   * Plain-text version of the answer, used for the FAQPage structured data.
   * Required when `answer` is not a plain string.
   */
  plainTextAnswer?: string;
}

export interface FaqSectionProps {
  /** Override the default question set. */
  faqs?: readonly FaqEntry[];
}

/**
 * The objections that stop a developer from signing up for a data platform.
 * Leaving them unanswered on the page does not make them go away — it just
 * moves the decision off-site.
 */
function useDefaultFaqs(): readonly FaqEntry[] {
  const emails = useOrgEmailAddresses();
  const privateBeta: boolean = usePrivateBeta();

  const faqs: FaqEntry[] = [
    {
      id: "vs-relational",
      question: "How is a vault different from a Postgres table?",
      answer:
        "A relational table fixes your columns up front and pushes every relationship into a join. A vault is a graph enforced by a schema: records can nest other schemas, link to each other, and evolve without a migration for every shape change — while still rejecting anything that does not match the schema you defined.",
    },
    {
      id: "vs-zod",
      question: "I already validate with Zod. What does this add?",
      answer:
        "Zod validates at one boundary, in one language, in one repository. SchemaVaults makes that schema the storage contract: the same definition validates what your backend writes, what your frontend reads, what your pipeline emits, and what your agents produce — enforced server-side, not only where someone remembered to call .parse().",
    },
    {
      id: "lock-in",
      question: "Am I locked in?",
      answer:
        "No. Schemas and vault contents are exportable, and you can run vaults on our cloud, in your own compute cluster, or in-memory for local development. Moving a vault between those targets does not change your schema or your application code.",
    },
    {
      id: "migrations",
      question: "What happens when a schema needs to change?",
      answer:
        "Schemas are versioned and composable. You can nest a schema inside another and evolve them independently, so adding a field does not require coordinating a deploy across every consumer at once.",
    },
    {
      id: "agents",
      question: "How do AI agents actually use this?",
      answer:
        "Vaults expose Model Context Protocol (MCP) tools generated from your schemas, so an agent reads and writes through a typed interface instead of free-form text. Output that does not match the schema is rejected before it is stored, which means a bad generation fails loudly rather than silently corrupting your data.",
    },
    {
      id: "security",
      question: "Where does my data live, and who can see it?",
      answer:
        "You choose the storage target: our managed cloud, your own datacenter or cluster, or in-memory. Access is scoped per vault, and self-hosting is available if your data cannot leave your infrastructure.",
    },
    {
      id: "non-developers",
      question: "Do I need to write code to get started?",
      answer:
        "No. You can define a schema in the visual editor, or describe what you are trying to store and let the assistant draft it. TypeScript SDKs are there when you want them, not a prerequisite.",
    },
  ];

  if (privateBeta) {
    faqs.unshift({
      id: "beta-access",
      question: "SchemaVaults is in private beta — when can I use it?",
      answer: (
        <>
          Invites go out in batches. Join the waitlist above and we will email
          you as soon as yours is ready — there is nothing else to do and no
          payment details to enter. If you have a specific use case or a
          deadline, email{" "}
          <a
            href={`mailto:${emails.salesEmail}`}
            className="text-primary hover:underline"
          >
            {emails.salesEmail}
          </a>{" "}
          and we can look at moving you up the list.
        </>
      ),
      plainTextAnswer:
        "Invites go out in batches. Join the waitlist and we will email you as soon as yours is ready — there is nothing else to do and no payment details to enter. If you have a specific use case or a deadline, email " +
        emails.salesEmail +
        " and we can look at moving you up the list.",
    });
  }

  return faqs;
}

/**
 * Serialises the question set as schema.org FAQPage data so the answers are
 * eligible for rich results, rather than being invisible to search.
 */
function FaqStructuredData({
  entries,
}: {
  entries: readonly FaqEntry[];
}): ReactElement | null {
  const mainEntity = entries
    .map((entry) => {
      const text: string | undefined =
        entry.plainTextAnswer ??
        (typeof entry.answer === "string" ? entry.answer : undefined);
      if (!text) return undefined;
      return {
        "@type": "Question",
        name: entry.question,
        acceptedAnswer: {
          "@type": "Answer",
          text,
        },
      };
    })
    .filter((question): question is NonNullable<typeof question> => !!question);

  if (mainEntity.length === 0) return null;

  const json: string = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  }).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export function FaqSection({ faqs }: FaqSectionProps = {}): ReactElement {
  const defaultFaqs: readonly FaqEntry[] = useDefaultFaqs();
  const entries: readonly FaqEntry[] = faqs ?? defaultFaqs;
  const emails = useOrgEmailAddresses();
  const track = useTrackConversionEvent();

  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn(
        "py-24 w-full bg-muted/50",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6">
        <FaqStructuredData entries={entries} />

        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance">
            Questions worth asking first
          </h2>
          <p className="mx-auto max-w-[42rem] text-muted-foreground text-lg text-pretty">
            The things we would want to know before putting our own data
            somewhere new.
          </p>
        </div>

        {/* Native <details> rather than a JS accordion: the answers are in the
            DOM for crawlers, keyboard accessible for free, and still readable
            if the client bundle fails to load. */}
        <div className="mx-auto max-w-3xl divide-y rounded-xl border bg-background">
          {entries.map((entry) => (
            <details
              key={entry.id}
              className="group px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
              onToggle={(event) => {
                if (!(event.currentTarget as HTMLDetailsElement).open) return;
                track("faq_question_opened", {
                  section: MarketingLandingPageSectionIds.FAQ_SECTION,
                  label: entry.question,
                });
              }}
            >
              <summary
                className={cn(
                  "flex flex-row flex-nowrap gap-4 items-center justify-between",
                  "cursor-pointer list-none",
                  "text-base font-medium",
                  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                )}
              >
                {entry.question}
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="pt-3 text-muted-foreground leading-relaxed text-pretty">
                {entry.answer}
              </div>
            </details>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          Still unsure?{" "}
          <a
            href={`mailto:${emails.salesEmail}`}
            className="text-primary hover:underline"
            onClick={() =>
              track("contact_sales_click", {
                section: MarketingLandingPageSectionIds.FAQ_SECTION,
              })
            }
          >
            Ask us directly
          </a>{" "}
          — a real person answers.
        </p>
      </div>
    </section>
  );
}

export default FaqSection;
