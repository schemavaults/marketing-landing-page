"use client";

import JoinMailingListForm from "@/components/JoinMailingListForm";
import { Button, Wordmark } from "@schemavaults/ui";
import { cn } from "@schemavaults/ui";
import type { ReactElement } from "react";
import type { default as LinkComponent } from "next/link";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { ArrowRight, Check, Mail } from "lucide-react";

export interface CTASectionProps {
  Link: typeof LinkComponent;
}

/** What a visitor actually gets for handing over an email address. */
const waitlistBenefits: readonly string[] = [
  "An invite as soon as early access opens",
  "Launch pricing locked in before general availability",
  "Nothing to pay and no sales call",
] as const;

export function CTASection({ Link }: CTASectionProps): ReactElement {
  const emails = useOrgEmailAddresses();
  const privateBeta: boolean = usePrivateBeta();
  const registerHref: string = useRegisterPageHref();

  return (
    <section
      id={MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}
      className={cn("py-24", "w-full", "flex justify-center items-start")}
    >
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance">
              {privateBeta
                ? "Be first in line when SchemaVaults opens up"
                : "Start building on SchemaVaults today"}
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg text-pretty">
              {privateBeta ? (
                <>
                  <Wordmark />{" "}
                  is in private beta. Leave your email and
                  we&apos;ll send you an invite the moment early access is
                  ready — you&apos;ll be building on it the same day.
                </>
              ) : (
                <>
                  Create a vault, define your first schema, and connect your
                  apps and agents. The Free plan never expires.
                </>
              )}
            </p>
          </div>

          {privateBeta ? (
            <>
              <JoinMailingListForm />

              <ul
                className={cn(
                  "flex flex-col sm:flex-row sm:flex-wrap",
                  "gap-x-6 gap-y-2 items-start sm:items-center justify-center",
                  "text-sm text-muted-foreground",
                )}
              >
                {waitlistBenefits.map((benefit: string) => (
                  <li
                    key={benefit}
                    className="flex flex-row flex-nowrap gap-1.5 items-start sm:items-center text-left"
                  >
                    <Check
                      className="h-4 w-4 shrink-0 mt-0.5 sm:mt-0 text-primary"
                      aria-hidden="true"
                    />
                    {benefit}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a
                  href={registerHref}
                  className="flex flex-row flex-nowrap gap-2 items-center justify-center"
                >
                  Create your free vault
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          )}

          {/*
            Contact links are a fallback, not a competing call to action, so
            they sit below the primary action as quiet text rather than as
            buttons of equal visual weight. Support is dropped during the
            private beta: nobody has an account to need help with yet.
          */}
          <p className="text-sm text-muted-foreground">
            Evaluating <Wordmark /> for a team?{" "}
            <Link
              href={`mailto:${emails.salesEmail}`}
              className="text-primary font-medium underline-offset-4 hover:underline inline-flex items-center gap-1"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              Talk to sales
            </Link>
            {!privateBeta && (
              <>
                {" · "}
                <Link
                  href={`mailto:${emails.supportEmail}`}
                  className="text-primary font-medium underline-offset-4 hover:underline"
                >
                  Contact support
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
