"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import { cn } from "@schemavaults/ui";
import { ChevronDown } from "lucide-react";
import type { ReactElement, ReactNode } from "react";

interface FaqEntry {
  id: string;
  question: string;
  answer: ReactNode;
}

/**
 * The questions a technical evaluator asks before they will create an
 * account. Answering them on the page — rather than making someone email
 * sales — removes the most common reason a warm visitor leaves.
 *
 * Every answer below is grounded in a capability or limit already stated
 * elsewhere on this page (pricing tiers, self-hosting, MCP, TypeScript SDKs).
 * If a claim here ever stops being true, change it here too.
 */
function useFaqEntries(): readonly FaqEntry[] {
  const privateBeta: boolean = usePrivateBeta();
  const emails = useOrgEmailAddresses();

  return [
    {
      id: "vs-database",
      question: "How is a vault different from a normal database?",
      answer:
        "A vault is a graph store that enforces a schema — a specification for the shape of the data it will accept." +
        " " +
        "You get the relationship traversal of a graph database and the guarantees of a typed system, without" +
        " having to maintain a separate migration and validation layer to keep the two in sync.",
    },
    {
      id: "no-code",
      question: "Do I have to write code to use it?",
      answer:
        "No. You can define a schema in the visual editor, or describe what you are storing to the assistant and" +
        " let it draft the schema for you. The TypeScript SDKs exist for teams who prefer schemas in version" +
        " control — they are an option, not a requirement.",
    },
    {
      id: "self-host",
      question: "Can I keep the data in my own infrastructure?",
      answer:
        "Yes. The same schemas run against our cloud, an in-memory vault for local development, or a deployment" +
        " in your own datacenter or compute cluster. Self-hosting is available on the Enterprise plan, and you" +
        " can bring your own compute and models.",
    },
    {
      id: "agents",
      question: "How do AI agents fit in?",
      answer:
        "Agents talk to your vaults over the Model Context Protocol (MCP), so their memories, thoughts and" +
        " artifacts are validated against your schemas before they are stored. An agent cannot quietly write a" +
        " shape you did not agree to.",
    },
    {
      id: "limits",
      question: "What happens if I outgrow the free tier?",
      answer:
        "Upgrade whenever you need to and keep everything you have already built — schemas, vaults and data" +
        " carry over between plans. The free tier is free forever and does not require a credit card, so there" +
        " is no trial clock to beat.",
    },
    {
      id: "getting-started",
      question: privateBeta
        ? "How do I get into the private beta?"
        : "How long does it take to get started?",
      answer: privateBeta ? (
        <>
          Join the waitlist below and we will send an invite code as spots open
          up. If you have a production use case you would like to discuss
          sooner, email{" "}
          <a
            href={`mailto:${emails.salesEmail}`}
            className="text-primary hover:underline"
          >
            {emails.salesEmail}
          </a>{" "}
          and tell us what you are building.
        </>
      ) : (
        <>
          Minutes. Create an account, define your first schema, and your vault
          is ready to accept data — there is nothing to install and no
          infrastructure to provision. Stuck? Email{" "}
          <a
            href={`mailto:${emails.supportEmail}`}
            className="text-primary hover:underline"
          >
            {emails.supportEmail}
          </a>
          .
        </>
      ),
    },
  ];
}

export function FaqSection(): ReactElement {
  const faqEntries: readonly FaqEntry[] = useFaqEntries();
  const emails = useOrgEmailAddresses();

  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn(
        "w-full py-24",
        "scroll-mt-16",
        "bg-muted/30",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance">
            Questions worth answering first
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground text-lg text-pretty">
            The things people ask us before they sign up.
          </p>
        </div>

        {/*
          Built on native <details>/<summary> rather than the Accordion from
          @schemavaults/ui for two reasons:
            1. The library's published Accordion types do not expose
               `children`, so the component does not typecheck from a
               consumer (worth fixing upstream — see the review notes).
            2. An FAQ is the one section search engines should index in full.
               <details> needs no client JavaScript, keeps every answer in the
               initial HTML, and is keyboard- and screen-reader-accessible for
               free.
        */}
        <div className="max-w-3xl mx-auto w-full divide-y rounded-lg border bg-background">
          {faqEntries.map((entry: FaqEntry) => (
            <details key={entry.id} className="group px-5 py-4">
              <summary
                className={cn(
                  "flex w-full cursor-pointer list-none items-center justify-between gap-4",
                  "text-left font-medium",
                  "marker:content-none [&::-webkit-details-marker]:hidden",
                  "hover:text-primary transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
                )}
              >
                {entry.question}
                <ChevronDown
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <div className="pt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                {entry.answer}
              </div>
            </details>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          Still unsure whether it fits?{" "}
          <a
            href={`mailto:${emails.salesEmail}`}
            className="text-primary hover:underline"
          >
            Ask us directly
          </a>{" "}
          — we would rather tell you it is the wrong tool than waste your time.
        </p>
      </div>
    </section>
  );
}

export default FaqSection;
