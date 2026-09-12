"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import { cn } from "@schemavaults/ui";
import { ChevronDown } from "lucide-react";
import { useMemo, type ReactElement } from "react";

export interface FrequentlyAskedQuestion {
  id: string;
  question: string;
  answer: string;
}

/**
 * Objection handling. Every answer here must stay consistent with the
 * claims made in the feature & pricing sections -- if a plan limit or a
 * capability changes, update it in both places.
 */
function buildFaqs(privateBeta: boolean): readonly FrequentlyAskedQuestion[] {
  const faqs: FrequentlyAskedQuestion[] = [
    {
      id: "what-is-a-vault",
      question: "What exactly is a “vault”?",
      answer:
        "A vault is a database whose contents are enforced by a schema — a specification for the shape of the data allowed inside it." +
        " " +
        "Because vaults are graph-backed rather than strictly relational, you can model connected data without flattening it into join tables first.",
    },
    {
      id: "do-i-need-to-write-code",
      question: "Do I need to write code to use SchemaVaults?",
      answer:
        "No. You can define a schema in the visual schema editor, or describe what you are trying to store to our agentic chatbot and let it draft the schema for you." +
        " " +
        "If you would rather work in code, our TypeScript SDKs give you the same capabilities with end-to-end type safety.",
    },
    {
      id: "how-does-it-help-ai-agents",
      question: "How does this help my AI agents?",
      answer:
        "Agents connect over Model Context Protocol (MCP) and read and write into your vaults." +
        " " +
        "Because every write is validated against your schema, agent memories and artifacts come back in the shape you expected instead of free-form text you have to re-parse.",
    },
    {
      id: "self-hosting",
      question: "Can I keep my data on my own infrastructure?",
      answer:
        "Yes. You can let us manage your data in the cloud, run a vault in-memory for fast local access, or host it in your own datacenter or compute cluster." +
        " " +
        "Self-hosting and bring-your-own-compute are available on the Enterprise plan.",
    },
    {
      id: "reuse-schemas",
      question: "Can I reuse the same schema across several projects?",
      answer:
        "That is the point. Write a schema once and use the same data types in your frontend apps, backend services and workflows, and nest schemas inside other schemas to compose larger structures.",
    },
    {
      id: "pricing",
      question: "What does it cost to start?",
      answer:
        "Nothing. The Free plan is $0 forever and includes 1 GB of storage, 3 vaults, 5 schemas in the global registry and 100 agent queries per month." +
        " " +
        "There are no setup fees, and paid plans can be cancelled at any time.",
    },
    {
      id: "custom-requirements",
      question: "My requirements do not fit any of these plans.",
      answer:
        "Enterprise plans cover custom integrations, SSO, a custom SLA, self-hosting and dedicated 24/7 support." +
        " " +
        "Get in touch with our sales team and we will put together something that fits.",
    },
  ];

  if (privateBeta) {
    faqs.unshift({
      id: "when-can-i-use-it",
      question: "When can I start using SchemaVaults?",
      answer:
        "SchemaVaults is currently in private beta, so registration requires an invite code." +
        " " +
        "Join the waitlist and we will email you as soon as early access opens up — we will not email you about anything else.",
    });
  }

  return faqs;
}

/**
 * Native <details>/<summary> rather than a JS accordion: every answer stays
 * in the crawlable DOM (so the section is eligible for FAQ rich results),
 * it is keyboard accessible without any extra wiring, and it costs no
 * client-side JavaScript.
 */
function FrequentlyAskedQuestionEntry({
  faq,
}: {
  faq: FrequentlyAskedQuestion;
}): ReactElement {
  return (
    <details
      // Namespaced: bare ids such as "pricing" would collide with the
      // section anchors the header nav links to.
      id={`faq-${faq.id}`}
      className={cn(
        "group",
        "border-b border-border last:border-b-0",
        "py-1",
      )}
    >
      <summary
        className={cn(
          "flex flex-row items-center justify-between gap-4",
          "py-4 cursor-pointer list-none",
          "text-left text-base md:text-lg font-medium",
          "hover:text-primary transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
          // Hide the default disclosure marker across browsers.
          "[&::-webkit-details-marker]:hidden",
        )}
      >
        {faq.question}
        <ChevronDown
          aria-hidden="true"
          className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <p className="pb-4 pr-9 text-base text-muted-foreground leading-relaxed">
        {faq.answer}
      </p>
    </details>
  );
}

export function FrequentlyAskedQuestionsSection(): ReactElement {
  const privateBeta: boolean = usePrivateBeta();
  const emails = useOrgEmailAddresses();
  const faqs: readonly FrequentlyAskedQuestion[] = useMemo(
    () => buildFaqs(privateBeta),
    [privateBeta],
  );

  // Structured data makes the section eligible for FAQ rich results in
  // search, which materially increases SERP real estate for a young domain.
  const faqJsonLd: string = useMemo(
    () =>
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq: FrequentlyAskedQuestion) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }),
    [faqs],
  );

  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn(
        "py-24",
        "w-full",
        "scroll-mt-16",
        "bg-muted/50",
        "flex justify-center items-start",
      )}
    >
      <script
        type="application/ld+json"
        // Serialised from the static `faqs` array above; no user input.
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Questions, answered
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
            The things prospective customers ask us most often.
          </p>
        </div>

        <div className="max-w-3xl mx-auto w-full rounded-lg border bg-background px-6">
          {faqs.map((faq: FrequentlyAskedQuestion) => (
            <FrequentlyAskedQuestionEntry key={faq.id} faq={faq} />
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
      </div>
    </section>
  );
}

export default FrequentlyAskedQuestionsSection;
