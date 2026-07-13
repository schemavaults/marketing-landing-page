"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import {
  Accordion,
  AccordionContent as AccordionContentPrimitive,
  AccordionItem as AccordionItemPrimitive,
  AccordionTrigger as AccordionTriggerPrimitive,
  cn,
} from "@schemavaults/ui";
import type { ComponentType, ReactElement, ReactNode } from "react";

const AccordionItem = AccordionItemPrimitive as unknown as ComponentType<{
  value: string;
  className?: string;
  children?: ReactNode;
}>;
const AccordionTrigger = AccordionTriggerPrimitive as unknown as ComponentType<{
  className?: string;
  children?: ReactNode;
}>;
const AccordionContent = AccordionContentPrimitive as unknown as ComponentType<{
  className?: string;
  children?: ReactNode;
}>;

interface FAQ {
  id: string;
  question: string;
  answer: ReactNode;
}

function useFAQs(salesEmail: string): readonly FAQ[] {
  return [
    {
      id: "what-is-a-vault",
      question: "What exactly is a “vault”?",
      answer:
        "A vault is a schema-enforced graph database — every node and edge conforms to a schema you defined. Think Postgres tables with the flexibility of a graph, and the type-safety of TypeScript.",
    },
    {
      id: "self-host",
      question: "Can I self-host?",
      answer:
        "Yes. Every paid tier lets you run vaults in-memory for local development. The Enterprise tier adds full self-hosting in your own datacenter with bring-your-own-compute and bring-your-own-model support.",
    },
    {
      id: "ai-agents",
      question: "How do AI agents interact with my vaults?",
      answer:
        "Vaults expose an MCP (Model Context Protocol) server your agents can plug into. Every read and write is type-checked against your schema, so agents can only produce output that matches the shape you expect — no more brittle JSON prompt-engineering.",
    },
    {
      id: "existing-stack",
      question: "Do I have to rewrite my existing app?",
      answer:
        "No. Import a schema once and reuse it in your frontend, backend, and workflows via our TypeScript SDKs. Most teams start by wrapping a single object type and grow from there.",
    },
    {
      id: "limits",
      question: "What happens if I hit a plan limit?",
      answer:
        "We notify you well before you hit a hard limit and let you upgrade in a click. We never delete data or lock you out mid-workflow because you crossed a threshold.",
    },
    {
      id: "cancel",
      question: "Can I cancel any time?",
      answer:
        "Yes. Paid plans are billed month-to-month with no long-term commitment. Cancel from your account dashboard and you'll retain access until the end of your billing period.",
    },
    {
      id: "something-else",
      question: "I have another question.",
      answer: (
        <>
          We&apos;d love to hear it. Email our team at{" "}
          <a
            href={`mailto:${salesEmail}`}
            className="text-primary hover:underline"
          >
            {salesEmail}
          </a>{" "}
          and a human will get back to you within one business day.
        </>
      ),
    },
  ];
}

export function FAQSection(): ReactElement {
  const emails = useOrgEmailAddresses();
  const faqs = useFAQs(emails.salesEmail);

  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn(
        "py-20 md:py-24",
        "w-screen",
        "flex justify-center items-start",
        "bg-background",
      )}
    >
      <div className="container px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-3">
            Questions? We&apos;ve got answers.
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground text-lg">
            Everything you need to know before you spin up your first vault.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq: FAQ) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-left text-base md:text-lg font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export default FAQSection;
