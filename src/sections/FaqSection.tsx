"use client";

import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import usePrivateBeta from "@/hooks/usePrivateBeta";
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
 * Objection handling. Every question here is one a prospect would otherwise
 * have to email sales about before they were willing to sign up.
 */
export function FaqSection(): ReactElement {
  const emails = useOrgEmailAddresses();
  const privateBeta: boolean = usePrivateBeta();

  const questions: readonly FrequentlyAskedQuestion[] = [
    {
      id: "what-is-a-vault",
      question: "What exactly is a vault?",
      answer:
        "A vault is a database whose contents are enforced by a schema — a specification for the shape of the data allowed inside it. Vaults are graph-shaped, so related records link to each other directly rather than through join tables, which makes them more flexible than a traditional relational database for deeply nested or evolving data.",
    },
    {
      id: "why-not-validation-library",
      question:
        "How is this different from validating with a schema library in my own code?",
      answer:
        "A validation library enforces a shape inside one codebase at runtime. SchemaVaults stores the schema itself, so the same definition is enforced by the vault and shared by every consumer — your frontend, your backend, your pipelines, and your agents — instead of being copied and quietly drifting apart in each one.",
    },
    {
      id: "do-i-need-to-write-code",
      question: "Do I have to write code to use it?",
      answer:
        "No. You can define a schema in our visual schema editor, or just describe what you are trying to store to our agentic chatbot and let it draft the schema for you. If you would rather work in code, our TypeScript SDKs give you end-to-end type safety over the same schemas.",
    },
    {
      id: "agents",
      question: "How do AI agents connect to a vault?",
      answer:
        "Over Model Context Protocol (MCP). Your agents read from and write to vaults through MCP, which means their memories and artifacts land in storage that already knows what shape they are supposed to be — and rejects them when they are not.",
    },
    {
      id: "hosting",
      question: "Can I keep my data on my own infrastructure?",
      answer:
        "Yes. You can run on our cloud platform for the fastest setup, in-memory for local development and low-latency access, or in your own datacenter. Self-hosting and bring-your-own compute and models are available on the Enterprise plan.",
    },
    {
      id: "cost",
      question: "What does it cost to start?",
      answer:
        "Nothing. The Free plan is $0 forever and includes storage, vaults, schemas, and a monthly allowance of agent queries — no setup fees and no card required to try it. You can move to a paid plan when you outgrow it, and cancel any time.",
    },
    {
      id: "access",
      question: privateBeta
        ? "How do I get access during the private beta?"
        : "How long does it take to get started?",
      answer: privateBeta ? (
        <>
          SchemaVaults is currently in private beta. Join the launch waitlist
          below and we will email you when your access is ready. If someone has
          already given you an invite code, you can register with it right now.
        </>
      ) : (
        <>
          Minutes. Create an account, define your first schema in the editor or
          with the chatbot, and create a vault to store data against it — no
          infrastructure to provision first.
        </>
      ),
    },
    {
      id: "custom",
      question: "We have requirements that are not on this page.",
      answer: (
        <>
          That is what the Enterprise plan is for — custom integrations, SSO,
          self-hosting, and custom SLAs. Email{" "}
          <a
            href={`mailto:${emails.salesEmail}`}
            className="text-primary hover:underline"
            data-analytics-id="faq-contact-sales"
          >
            {emails.salesEmail}
          </a>{" "}
          and tell us what you need.
        </>
      ),
    },
  ];

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
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Questions, answered
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
            The things people usually ask us before they sign up.
          </p>
        </div>

        {/*
          Native <details> keeps every answer in the DOM for search engines and
          for visitors who land with JavaScript still loading, while staying
          keyboard accessible without any extra wiring.
        */}
        <div className="max-w-3xl mx-auto w-full divide-y rounded-lg border bg-background">
          {questions.map((faq: FrequentlyAskedQuestion) => (
            <details key={faq.id} id={`faq-${faq.id}`} className="group px-5">
              <summary
                className={cn(
                  "flex flex-row items-center justify-between gap-4",
                  "py-4 text-left text-base md:text-lg font-medium",
                  // Safari draws its own disclosure triangle unless the
                  // webkit marker is hidden explicitly.
                  "cursor-pointer list-none [&::-webkit-details-marker]:hidden",
                  "hover:text-primary transition-colors",
                )}
              >
                {faq.question}
                <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="pb-5 pr-9 text-muted-foreground text-base">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          Still not sure?{" "}
          <a
            href={`mailto:${emails.supportEmail}`}
            className="text-primary hover:underline"
            data-analytics-id="faq-contact-support"
          >
            Ask us anything
          </a>
          .
        </p>
      </div>
    </section>
  );
}

export default FaqSection;
