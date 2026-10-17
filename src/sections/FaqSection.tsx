"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import SECTION_SCROLL_MARGIN_CLASSNAME from "@/lib/sectionScrollMargin";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import { cn } from "@schemavaults/ui";
import { ChevronDown } from "lucide-react";
import type { ReactElement, ReactNode } from "react";

export interface FaqEntry {
  id: string;
  question: string;
  answer: ReactNode;
}

export interface FaqSectionProps {
  heading?: string;
  subheading?: string;
  /** Replaces the default list entirely when provided. */
  faqs?: readonly FaqEntry[];
}

/**
 * Objection handling. Every answer here has to stay true to what the product
 * actually does today -- an FAQ that over-promises costs more trust than it
 * buys. Anything we cannot answer honestly belongs in a sales conversation,
 * not on this list.
 */
function useDefaultFaqs(): readonly FaqEntry[] {
  const privateBeta: boolean = usePrivateBeta();

  const faqs: FaqEntry[] = [
    {
      id: "what-is-it",
      question: "Is this a database, or a validation library?",
      answer:
        "Both, and that is the point. A vault is a graph data store that will only accept records matching the schema you gave it, so validation is not a step you can forget to run — it is a property of the storage itself. Because it is a graph rather than a set of relational tables, you can nest and link schemas without designing a migration first.",
    },
    {
      id: "no-code",
      question: "Do I need to write code to use it?",
      answer:
        "No. You can define a schema in the visual editor, or describe what you want to store and let the assistant draft it for you. TypeScript SDKs are there for teams who would rather keep schemas in source control — they are an option, not a prerequisite.",
    },
    {
      id: "where-data-lives",
      question: "Where does my data actually live?",
      answer:
        "Wherever suits you: our managed cloud if you want nothing to operate, in-memory for fast local development and tests, or your own datacenter or compute cluster. Managed vaults can also sync across multiple storage regions so reads stay close to your users.",
    },
    {
      id: "agents",
      question: "How does this help with AI agents?",
      answer:
        "Agents reach your vaults over Model Context Protocol, with tools described by your schemas. That means an agent's memories, notes, and structured output are checked against the same definitions your application code uses, instead of relying on a prompt to ask nicely for the right shape.",
    },
    {
      id: "lock-in",
      question: "How much am I locking myself in?",
      answer:
        "Schemas are declarative definitions, and you are free to keep them in your own repository. Self-hosting is available on the Enterprise plan, so the same vaults can run on infrastructure you control.",
    },
    {
      id: "outgrow-plan",
      question: "What if I outgrow the plan I pick?",
      answer:
        "Move up whenever you need to — the free tier exists so you can build something real before you decide. If none of the published tiers fits, talk to us and we will work out something that does.",
    },
  ];

  if (privateBeta) {
    faqs.unshift({
      id: "access",
      question: "Can I start using it today?",
      answer:
        "We are in private beta, so sign-up is by invite code for now. Join the waitlist below and we will email you when your account can be created — once, when access opens, not on a drip campaign.",
    });
  }

  return faqs;
}

export function FaqSection({
  heading = "Questions worth asking first",
  subheading,
  faqs,
}: FaqSectionProps = {}): ReactElement {
  const defaultFaqs: readonly FaqEntry[] = useDefaultFaqs();
  const emails = useOrgEmailAddresses();
  const entries: readonly FaqEntry[] = faqs ?? defaultFaqs;

  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn(
        "py-24 bg-muted/50",
        "w-full",
        "flex justify-center items-start",
        SECTION_SCROLL_MARGIN_CLASSNAME,
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {heading}
          </h2>
          {subheading && (
            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
              {subheading}
            </p>
          )}
        </div>

        {/*
          Native <details> rather than a JS accordion: the answers stay in the
          document for crawlers (FAQ answers are what long-tail search traffic
          actually lands on) and the section needs no client-side JS to open.
        */}
        <div className="max-w-3xl mx-auto w-full divide-y rounded-lg border bg-background">
          {entries.map((faq: FaqEntry) => (
            <details key={faq.id} className="group px-5 py-4">
              <summary
                className={cn(
                  "flex flex-row items-center justify-between gap-4",
                  "cursor-pointer list-none",
                  "text-base md:text-lg font-medium",
                  "marker:hidden [&::-webkit-details-marker]:hidden",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
                )}
              >
                {faq.question}
                <ChevronDown
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <div className="pt-3 pr-9 text-muted-foreground text-base leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          Still unsure whether it fits your stack?{" "}
          <a
            href={`mailto:${emails.salesEmail}`}
            className="text-primary hover:underline"
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
