"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import { cn } from "@schemavaults/ui";
import { ChevronDown } from "lucide-react";
import { useMemo, type ReactElement } from "react";

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

export interface FaqSectionProps {
  /** Override the default question set (e.g. to localize or A/B test copy). */
  faqs?: readonly FaqEntry[];
  /**
   * Emit https://schema.org/FAQPage JSON-LD so search engines can surface
   * these answers directly in results. Defaults to `true`.
   */
  structuredData?: boolean;
}

function buildDefaultFaqs(privateBeta: boolean): readonly FaqEntry[] {
  const accessFaq: FaqEntry = privateBeta
    ? {
        id: "access",
        question: "How do I get access during the private beta?",
        answer:
          "Two ways. If you already have an invite code, register with it and you can start building today." +
          " " +
          "Otherwise, join the launch waitlist and we will email you as soon as the public beta opens.",
      }
    : {
        id: "access",
        question: "How do I get started?",
        answer:
          "Create a free account, define your first schema in the visual editor (or just describe it to our AI), and spin up a vault." +
          " " +
          "The Free plan is $0 forever, so you can evaluate SchemaVaults before talking to anyone.",
      };

  return [
    {
      id: "what-is-it",
      question: "Is SchemaVaults a database or a schema registry?",
      answer:
        "Both, and that is the point. A schema defines the shape your data is allowed to take; a vault is a graph database that enforces that schema on every write." +
        " " +
        "Because schemas live outside any single vault, you define a type once and re-use or nest it across every vault, app, and workflow that needs it.",
    },
    {
      id: "no-code",
      question: "Do I have to write code to use it?",
      answer:
        "No. You can define schemas in the visual schema editor, or describe what you are trying to store to our agentic chatbot and let it draft the schema for you." +
        " " +
        "If you would rather work in code, our TypeScript SDKs give you the same end-to-end type safety.",
    },
    {
      id: "agents",
      question: "How do AI agents fit in?",
      answer:
        "Agents connect over the Model Context Protocol (MCP) and read and write typed memories and artifacts directly in your vaults." +
        " " +
        "Because the vault validates every write against your schema, an agent cannot quietly persist output in a shape the rest of your system does not expect.",
    },
    {
      id: "hosting",
      question: "Where does my data actually live?",
      answer:
        "Wherever you need it to. Run vaults on our cloud for the fastest set-up, in-memory for local development and tests, or inside your own datacenter." +
        " " +
        "Cloud vaults can sync across multiple storage regions so reads stay fast for users anywhere, and Enterprise plans add self-hosting plus bring-your-own compute and models.",
    },
    {
      id: "existing-stack",
      question: "Can I use this alongside the stack I already have?",
      answer:
        "Yes. SchemaVaults is designed to sit next to your existing services rather than replace them — use it as the typed source of truth for agent memory, as the validation layer in a data pipeline, or simply as a content management system." +
        " " +
        "API access and the TypeScript SDKs are available on every paid plan.",
    },
    accessFaq,
  ];
}

function buildFaqPageJsonLd(entries: readonly FaqEntry[]): string {
  const payload = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((faq: FaqEntry) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  // Escape `<` so the serialized JSON can never terminate the <script> block.
  return JSON.stringify(payload).replace(/</g, "\\u003c");
}

export function FaqSection({
  faqs,
  structuredData = true,
}: FaqSectionProps = {}): ReactElement {
  const privateBeta: boolean = usePrivateBeta();
  const emails = useOrgEmailAddresses();

  const entries: readonly FaqEntry[] = useMemo(
    () => faqs ?? buildDefaultFaqs(privateBeta),
    [faqs, privateBeta],
  );

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
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            The things people ask us most often before they trust a new platform
            with their data.
          </p>
        </div>

        {/* Native <details> rather than a JS accordion: the answers are in the
            DOM for crawlers, and they still expand if hydration is slow or
            fails. */}
        <div className="max-w-3xl mx-auto w-full divide-y divide-border border-y border-border">
          {entries.map((faq: FaqEntry) => (
            <details key={faq.id} className="group py-4">
              <summary
                className={cn(
                  "flex flex-row flex-nowrap gap-4 items-center justify-between",
                  "cursor-pointer list-none",
                  "text-base font-semibold text-left",
                  "hover:text-primary transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
                )}
              >
                {faq.question}
                <ChevronDown
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <p className="pt-3 pr-8 text-muted-foreground text-base leading-relaxed text-pretty">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          Still have a question?{" "}
          <a
            href={`mailto:${emails.salesEmail}`}
            className="text-primary hover:underline"
          >
            Ask our team directly
          </a>
          .
        </p>

        {structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: buildFaqPageJsonLd(entries) }}
          />
        )}
      </div>
    </section>
  );
}

export default FaqSection;
