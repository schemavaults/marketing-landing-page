"use client";

import { cn } from "@schemavaults/ui";
import { ChevronDown } from "lucide-react";
import type { ReactElement } from "react";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import type { IOrganizationContactEmailAddressesContextType } from "@/contexts/OrganizationContactEmailAddressesContext";
import {
  buildDefaultFrequentlyAskedQuestions,
  type FrequentlyAskedQuestion,
} from "@/data/frequentlyAskedQuestions";

export interface FAQSectionProps {
  questions?: readonly FrequentlyAskedQuestion[];
}

export function FAQSection({ questions }: FAQSectionProps): ReactElement {
  const privateBeta: boolean = usePrivateBeta();
  const emails: IOrganizationContactEmailAddressesContextType =
    useOrgEmailAddresses();
  const faqs: readonly FrequentlyAskedQuestion[] =
    questions ?? buildDefaultFrequentlyAskedQuestions(privateBeta);

  return (
    <section
      id={MarketingLandingPageSectionIds.FAQ_SECTION}
      className={cn(
        "py-24 w-full scroll-mt-16",
        "bg-muted/30",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Questions, answered
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
            The things prospective users ask us most often before they sign up.
          </p>
        </div>

        {/*
          Native <details>/<summary> rather than a JS accordion: the answers
          stay in the server-rendered HTML (so search engines and link previews
          can read them), keyboard and screen-reader behaviour comes for free,
          and there is no hydration cost on a page whose job is to load fast.
        */}
        <div className="max-w-3xl mx-auto divide-y rounded-lg border bg-background">
          {faqs.map((faq: FrequentlyAskedQuestion) => (
            <details key={faq.id} className="group px-5 py-4">
              <summary
                className={cn(
                  "flex w-full cursor-pointer list-none items-center justify-between gap-4",
                  "text-left text-base md:text-lg font-medium",
                  "marker:content-none [&::-webkit-details-marker]:hidden",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm",
                )}
              >
                {faq.question}
                <ChevronDown
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 text-muted-foreground text-base leading-relaxed">
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
            Talk to our team
          </a>{" "}
          or{" "}
          <a
            href={`mailto:${emails.supportEmail}`}
            className="text-primary hover:underline"
          >
            contact support
          </a>
          .
        </p>
      </div>
    </section>
  );
}

export default FAQSection;
