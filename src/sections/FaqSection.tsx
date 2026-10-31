"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import { cn } from "@schemavaults/ui";
import { ChevronDown } from "lucide-react";
import type { ReactElement, ReactNode } from "react";

export interface FaqEntry {
  /** Stable identifier, used as the accordion item value. */
  id: string;
  question: string;
  answer: ReactNode;
}

export interface FaqSectionProps {
  /**
   * Override the default questions. Supplying your own list replaces the
   * defaults entirely, so you can keep this section in step with whatever
   * objections sales is actually hearing.
   */
  faqs?: readonly FaqEntry[];
}

/**
 * Objection handling. A visitor who is interested but unsure almost never
 * asks — they leave. Every entry here answers a question that otherwise
 * silently costs a conversion, and each answer is limited to capabilities
 * claimed elsewhere on this page.
 */
function useDefaultFaqs(): readonly FaqEntry[] {
  const privateBeta: boolean = usePrivateBeta();

  const shared: readonly FaqEntry[] = [
    {
      id: "what-is-a-vault",
      question: "What is a vault, exactly?",
      answer:
        "A vault is a database governed by a schema — a specification for the shape of the data allowed inside it. " +
        "Anything written to a vault is validated against that schema first, so everything you read back out already matches the type you expected. " +
        "Vaults store relationships between records as a graph, which makes them more flexible than a traditional relational database and stricter than a plain document store.",
    },
    {
      id: "why-not-just-zod",
      question:
        "I already define schemas in my code. Why do I need SchemaVaults?",
      answer:
        "Because those definitions usually live in one codebase. The moment a second service, a mobile app, a workflow runner, or an AI agent needs the same type, the definition gets copied — and the copies drift. " +
        "SchemaVaults keeps the schema in one place, enforces it at the storage boundary rather than in each caller, and hands every consumer the same types. Our TypeScript SDKs infer those types for you, so a schema change shows up in your editor instead of in production.",
    },
    {
      id: "do-i-have-to-write-code",
      question: "Do I have to write code to use it?",
      answer:
        "No. You can build a schema in the visual schema editor, or describe what you are trying to store to our AI and have it drafted for you. " +
        "If you would rather work in code, our TypeScript SDKs cover the same ground — the three approaches produce the same schema, so teams with and without engineers can work in the same vault.",
    },
    {
      id: "self-hosting",
      question: "Does my data have to live in your cloud?",
      answer:
        "No. Run vaults on our cloud platform if you want the easiest setup and scaling, in-memory for fast local development, or inside your own datacenter or compute cluster if your data is not allowed to leave your infrastructure. " +
        "Self-hosting is available on our Enterprise plan.",
    },
    {
      id: "ai-agents",
      question: "How do AI agents work with a vault?",
      answer:
        "Agents read and write vault data over Model Context Protocol (MCP), so they can store memories and artifacts without you writing glue code. " +
        "Because the vault validates on write, an agent cannot quietly invent a new shape for your data — malformed output is rejected at the boundary instead of poisoning everything downstream.",
    },
  ];

  if (!privateBeta) {
    return shared;
  }

  return [
    {
      id: "when-can-i-use-it",
      question: "When can I actually start using SchemaVaults?",
      answer:
        "SchemaVaults is in private beta today, which means sign-up requires an invite code. " +
        "Join the waitlist and we will email you as soon as early access opens up — you do not need to talk to anyone first, and there is nothing to pay.",
    },
    ...shared,
    {
      id: "waitlist-expectations",
      question: "What happens after I join the waitlist?",
      answer:
        "You get one email when early access is ready for you, plus the occasional short note about what we have shipped. " +
        "No credit card, no sales call, and you can unsubscribe from any email we send.",
    },
  ];
}

export function FaqSection({ faqs }: FaqSectionProps): ReactElement {
  const defaultFaqs: readonly FaqEntry[] = useDefaultFaqs();
  const entries: readonly FaqEntry[] = faqs ?? defaultFaqs;
  const emails = useOrgEmailAddresses();

  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn(
        "py-24 bg-muted/50",
        "w-full",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance">
            Questions people ask before they sign up
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg text-pretty">
            If yours is not here, ask us directly — we answer every email.
          </p>
        </div>

        {/*
          Native <details>/<summary> rather than the UI library's Accordion:
          the accordion's sub-component prop types in @schemavaults/ui@0.54.2
          do not accept `children`, and a disclosure widget is one of the few
          places the platform already does the right thing. The answers are in
          the DOM whether or not JavaScript has loaded, which means search
          engines index them and visitors can read them before hydration.
        */}
        <div className="max-w-3xl mx-auto w-full divide-y divide-border rounded-lg border border-border bg-background">
          {entries.map((entry: FaqEntry) => (
            <details key={entry.id} className="group px-5 py-1">
              <summary
                className={cn(
                  "flex w-full cursor-pointer items-center justify-between gap-4",
                  "py-4 text-left text-base md:text-lg font-medium",
                  "list-none [&::-webkit-details-marker]:hidden",
                  "rounded-sm outline-none",
                  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  "hover:text-primary transition-colors",
                )}
              >
                {entry.question}
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted-foreground",
                    "transition-transform duration-200",
                    "group-open:rotate-180",
                  )}
                  aria-hidden="true"
                />
              </summary>
              <div className="pb-5 pr-8 text-muted-foreground text-base leading-relaxed">
                {entry.answer}
              </div>
            </details>
          ))}
        </div>

        <p className="text-center mt-10 text-sm text-muted-foreground">
          Still have a question?{" "}
          <a
            href={`mailto:${emails.salesEmail}`}
            className="text-primary hover:underline"
          >
            Email our team
          </a>
        </p>
      </div>
    </section>
  );
}

export default FaqSection;
