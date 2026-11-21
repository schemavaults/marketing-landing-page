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
import { ArrowRight } from "lucide-react";

export interface CTASectionProps {
  Link: typeof LinkComponent;
}

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
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {privateBeta
                ? "Get your invite to the private beta"
                : "Start building on your own schemas today"}
            </h2>
            <p className="mx-auto max-w-[620px] text-muted-foreground text-lg">
              {privateBeta ? (
                <>
                  We&rsquo;re inviting private-beta users in batches. Leave your
                  email and you&rsquo;ll get one message from us the moment your{" "}
                  <Wordmark /> invite is ready.
                </>
              ) : (
                <>
                  Create your first vault in minutes on the free plan, or leave
                  your email for occasional <Wordmark /> product updates.
                </>
              )}
            </p>
          </div>

          {/* The single conversion action on the page gets the spotlight: one
              form, nothing of equal visual weight competing beside it. */}
          {privateBeta ? (
            <JoinMailingListForm />
          ) : (
            <div className="space-y-6">
              <Button size="lg" asChild>
                <a
                  href={registerHref}
                  className="flex flex-row flex-nowrap gap-2 items-center justify-center"
                >
                  Start free — no credit card
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <JoinMailingListForm />
            </div>
          )}

          {/* Secondary routes, deliberately demoted to text links. As buttons
              they competed with the primary action for the same click. */}
          <p className="text-sm text-muted-foreground">
            Evaluating for a team?{" "}
            <Link
              href={`mailto:${emails.salesEmail}`}
              className="text-foreground font-medium underline underline-offset-4 hover:text-primary"
            >
              Talk to sales
            </Link>
            {" · "}
            Already a user?{" "}
            <Link
              href={`mailto:${emails.supportEmail}`}
              className="text-foreground font-medium underline underline-offset-4 hover:text-primary"
            >
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
