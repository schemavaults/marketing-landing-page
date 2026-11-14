"use client";

import JoinMailingListForm from "@/components/JoinMailingListForm";
import { Button, Wordmark } from "@schemavaults/ui";
import { cn } from "@schemavaults/ui";
import type { ReactElement } from "react";
import type { default as LinkComponent } from "next/link";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { Check, Mail } from "lucide-react";

export interface CTASectionProps {
  Link: typeof LinkComponent;
}

export function CTASection({ Link }: CTASectionProps): ReactElement {
  const emails = useOrgEmailAddresses();
  const privateBeta: boolean = usePrivateBeta();

  /**
   * Spell out what the visitor actually gets for their email address.
   * "Join our mailing list" asks for something and promises nothing.
   */
  const waitlistBenefits: readonly string[] = [
    "An invite as soon as early access opens",
    "Launch pricing locked in for beta members",
    "No charge during the private beta",
  ];

  return (
    <section
      id={MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}
      className={cn(
        "py-24 scroll-mt-16",
        "w-full",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance">
              {privateBeta
                ? "Be first in line when SchemaVaults opens up"
                : "Ready to simplify how you work with data?"}
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg text-balance">
              {privateBeta ? (
                <>
                  <Wordmark />{" "}
                  is in private beta. Leave your email and we&rsquo;ll send
                  your invite the moment early access opens.
                </>
              ) : (
                <>
                  Define your first schema in minutes. Start free with{" "}
                  <Wordmark />, no credit card required.
                </>
              )}
            </p>
          </div>

          {privateBeta && (
            <ul className="flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-2 items-center justify-center">
              {waitlistBenefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex flex-row flex-nowrap gap-2 items-center text-sm text-muted-foreground"
                >
                  <Check
                    className="h-4 w-4 shrink-0 text-green-600 dark:text-green-500"
                    aria-hidden="true"
                  />
                  {benefit}
                </li>
              ))}
            </ul>
          )}

          <JoinMailingListForm />

          <div className="pt-4 space-y-3">
            <p className="text-sm text-muted-foreground">
              Evaluating <Wordmark /> for a team, or need self-hosting?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`mailto:${emails.salesEmail}`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex flex-row flex-nowrap gap-2 items-center justify-center w-full"
                >
                  <Mail className="h-4 w-4" />
                  Talk to sales
                </Button>
              </Link>
              <Link href={`mailto:${emails.supportEmail}`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex flex-row flex-nowrap gap-2 items-center justify-center w-full"
                >
                  <Mail className="h-4 w-4" />
                  Ask a technical question
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
