"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import type { IOrganizationContactEmailAddressesContextType } from "@/contexts/OrganizationContactEmailAddressesContext";
import { cn } from "@schemavaults/ui";
import { ChevronDown } from "lucide-react";
import { useMemo, type ReactElement, type ReactNode } from "react";

export interface FaqEntry {
  id: string;
  question: string;
  answer: ReactNode;
  /** When true, the entry is only rendered while the private beta flag is set. */
  privateBetaOnly?: boolean;
}

export interface FaqSectionProps {
  /** Override the default question set (e.g. for a campaign-specific page). */
  faqs?: readonly FaqEntry[];
}

/**
 * NOTE FOR MAINTAINERS: these answers are written from the claims already made
 * elsewhere on this page (self-hosting, MCP, TypeScript SDKs, the free tier).
 * Review them whenever the product changes — a landing-page FAQ that overstates
 * what ships is worse for conversion than no FAQ at all.
 */
function buildDefaultFaqs(
  emails: IOrganizationContactEmailAddressesContextType,
): readonly FaqEntry[] {
  return [
    {
      id: "when-can-i-use-it",
      question: "Is SchemaVaults available yet?",
      privateBetaOnly: true,
      answer:
        "SchemaVaults is in private beta. Join the waitlist and we will email you as soon as your access is ready — you do not need an invite code to sign up for the list.",
    },
    {
      id: "vs-database-plus-validation",
      question:
        "How is this different from a database plus a validation library?",
      answer:
        "A validation library checks a shape at one boundary in one codebase. A vault enforces the schema at the storage layer, so every writer — your frontend, your backend, a workflow step, an AI agent — is held to the same definition. You define the type once instead of re-declaring it in every service that touches the data.",
    },
    {
      id: "do-i-need-to-write-code",
      question: "Do I have to write code to use it?",
      answer:
        "No. You can define a schema in the visual schema editor, or describe what you are trying to store and let the agentic editor draft it. TypeScript SDKs are there when you would rather define and consume schemas in code.",
    },
    {
      id: "ai-agents",
      question: "How do AI agents fit in?",
      answer:
        "Agents read and write vault data over Model Context Protocol (MCP). Because the vault enforces the schema, an agent's memories and outputs land in the shape you specified instead of whatever the model happened to emit that run.",
    },
    {
      id: "where-does-my-data-live",
      question: "Can I keep my data in my own infrastructure?",
      answer:
        "Yes. Run your vaults on our cloud, in memory for fast local development, or self-hosted in your own datacenter or compute cluster. Self-hosting and bring-your-own-compute are part of the Enterprise plan.",
    },
    {
      id: "migration",
      question: "What if I outgrow it, or want to move off?",
      answer:
        "Your schemas are declarative definitions you author, and your data is reachable through the API and the TypeScript SDKs, so you can read everything back out programmatically at any time.",
    },
    {
      id: "cost-to-start",
      question: "What does it cost to get started?",
      answer:
        "The Free plan is $0 forever and needs no credit card: 1 GB of storage, 3 vaults, and 100 agent queries a month. Upgrade only when you outgrow it.",
    },
    {
      id: "still-have-questions",
      question: "My question is not answered here.",
      answer: (
        <>
          Email us at{" "}
          <a
            href={`mailto:${emails.salesEmail}`}
            className="text-primary hover:underline"
          >
            {emails.salesEmail}
          </a>{" "}
          and a human will get back to you.
        </>
      ),
    },
  ];
}

export function FaqSection({ faqs }: FaqSectionProps = {}): ReactElement {
  const privateBeta: boolean = usePrivateBeta();
  const emails: IOrganizationContactEmailAddressesContextType =
    useOrgEmailAddresses();

  const entries: readonly FaqEntry[] = useMemo(() => {
    const source: readonly FaqEntry[] = faqs ?? buildDefaultFaqs(emails);
    return source.filter(
      (entry: FaqEntry): boolean => privateBeta || !entry.privateBetaOnly,
    );
  }, [faqs, emails, privateBeta]);

  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn(
        "py-24 bg-gradient-to-b from-muted/20 to-background",
        "w-full",
        "flex justify-center",
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Questions, answered
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
            The things teams ask us before they commit.
          </p>
        </div>

        {/*
          Rendered with native <details> rather than a JS accordion so every
          answer is present in the initial HTML: search engines index the
          questions, and the section still works before hydration.
        */}
        <div className="max-w-3xl mx-auto divide-y rounded-lg border bg-background">
          {entries.map((entry: FaqEntry) => (
            <details key={entry.id} id={entry.id} className="group">
              <summary
                className={cn(
                  "flex flex-row flex-nowrap items-center justify-between gap-4",
                  "cursor-pointer list-none select-none",
                  "px-5 py-4 text-left text-base md:text-lg font-medium",
                  "hover:underline focus-visible:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-ring rounded-lg",
                  "[&::-webkit-details-marker]:hidden",
                )}
              >
                {entry.question}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground",
                    "transition-transform duration-200",
                    "group-open:rotate-180",
                  )}
                />
              </summary>
              <div className="px-5 pb-5 pt-0 text-muted-foreground text-base">
                {entry.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
