"use client";

import { cn } from "@schemavaults/ui";
import { ChevronDown } from "lucide-react";
import type { ReactElement, ReactNode } from "react";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";

export interface FaqEntry {
  id: string;
  question: string;
  answer: ReactNode;
}

export interface FaqSectionProps {
  faqs?: FaqEntry[];
}

/**
 * Objection handling. Every answer here should only restate a claim that is
 * made elsewhere on this page -- do not add new product promises (compliance
 * certifications, SLAs, benchmarks) without sign-off.
 */
function useDefaultFaqs(): FaqEntry[] {
  const privateBeta: boolean = usePrivateBeta();
  const { salesEmail, supportEmail } = useOrgEmailAddresses();

  return [
    {
      id: "why-not-validation-in-my-app",
      question: "How is this different from validating data in my own app?",
      answer:
        "App-level validation lives in one codebase, so every other consumer of that data has to re-describe the same shapes and trust that they still match. " +
        "With SchemaVaults the schema is the source of truth: a vault only accepts data that satisfies it, and your frontend, backend, workflows, and agents all read the same definition " +
        "instead of each keeping their own copy.",
    },
    {
      id: "do-i-have-to-write-code",
      question: "Do I have to write code to use it?",
      answer:
        "No. You can define a schema in the visual schema editor, or describe what you are trying to store to our agentic chatbot and have it drafted for you. " +
        "TypeScript SDKs are there when you want end-to-end types in your own code, but they are optional -- SchemaVaults works just as well as a schema-validated content management system.",
    },
    {
      id: "where-does-my-data-live",
      question: "Where does my data actually live?",
      answer:
        "Wherever you need it to. Run your vaults on our managed cloud, in-memory for fast local access, or inside your own datacenter or compute cluster. " +
        "Managed vaults can sync across multiple storage regions so reads land close to your users.",
    },
    {
      id: "agents-and-mcp",
      question: "Can my AI agents read and write vault data?",
      answer:
        "Yes. Agents connect over the Model Context Protocol (MCP), so they can store memories and artifacts in your vaults and read them back later -- " +
        "with the same schema enforcement as everything else, which means an agent cannot quietly write a thought or an output in the wrong shape.",
    },
    {
      id: "schema-reuse",
      question: "Can I reuse and compose schemas across projects?",
      answer:
        "That is the point of them. Define a datatype once, nest it inside other schemas, and reuse it across vaults and across apps. " +
        "Shared definitions can live in the schema registry so the rest of your team consumes the same version instead of forking it.",
    },
    {
      id: "lock-in",
      question: "What if I want to move off SchemaVaults later?",
      answer:
        "Self-hosting is a supported deployment target rather than an afterthought, so you can run your vaults on infrastructure you control instead of ours. " +
        `If you want to talk through a specific migration or exit plan before committing, email ${salesEmail}.`,
    },
    {
      id: "availability",
      question: privateBeta
        ? "When can I start using SchemaVaults?"
        : "How do I get started?",
      answer: privateBeta
        ? "SchemaVaults is in private beta today, which means access is invite-only while we work with early teams. " +
          "Join the launch waitlist below and we will email you when public early access opens -- the pricing above is what you can expect at launch. " +
          "If you already have an invite code, you can register right now."
        : "Start on the free plan -- $0 forever, no setup fees -- define your first schema, and create a vault. " +
          "You can upgrade, downgrade, or cancel later without migrating your data.",
    },
    {
      id: "support",
      question: "How do I get help or talk to a human?",
      answer: `Support questions go to ${supportEmail}. For evaluations, custom deployments, self-hosting, and anything procurement-shaped, email ${salesEmail} and a human will answer.`,
    },
  ];
}

/**
 * Rendered with native <details> rather than a JS accordion so that every
 * answer is in the server-rendered HTML: search engines and LLM crawlers index
 * the text, and the section still works before hydration.
 */
function FaqItem({ entry }: { entry: FaqEntry }): ReactElement {
  return (
    <details
      id={entry.id}
      className={cn(
        "group border-b border-border last:border-b-0",
        "[&_summary::-webkit-details-marker]:hidden",
      )}
    >
      <summary
        className={cn(
          "flex flex-row flex-nowrap items-center justify-between gap-4",
          "cursor-pointer list-none py-5 px-1",
          "text-left text-base md:text-lg font-medium",
          "hover:text-primary transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
        )}
      >
        {entry.question}
        <ChevronDown
          className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="pb-5 px-1 text-muted-foreground leading-relaxed">
        {entry.answer}
      </div>
    </details>
  );
}

export function FaqSection({ faqs }: FaqSectionProps = {}): ReactElement {
  const defaultFaqs: FaqEntry[] = useDefaultFaqs();
  const entries: FaqEntry[] = faqs ?? defaultFaqs;

  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn(
        "py-24 scroll-mt-16",
        "w-full",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Questions you are probably about to ask
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
            The honest answers, before you spend an afternoon finding out.
          </p>
        </div>

        <div className="max-w-3xl mx-auto rounded-lg border bg-card px-4 md:px-6">
          {entries.map((entry: FaqEntry) => (
            <FaqItem key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
