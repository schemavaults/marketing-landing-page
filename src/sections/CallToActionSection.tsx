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
      className={cn(
        "py-24",
        "w-full",
        "scroll-mt-16",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to simplify how you work with data?
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg">
              {privateBeta ? (
                <>
                  <Wordmark /> is in private beta today. Leave your email and we
                  will let you know the moment early access opens up.
                </>
              ) : (
                <>
                  Create your first vault on the free plan in minutes. Leave
                  your email to get product updates from the <Wordmark /> team.
                </>
              )}
            </p>
          </div>

          {/*
            One primary conversion action per section: the waitlist during
            private beta, registration afterwards.
          */}
          {privateBeta ? (
            <JoinMailingListForm />
          ) : (
            <div className="flex flex-col items-center gap-6">
              <Button size="lg" asChild>
                <a
                  href={registerHref}
                  className="flex flex-row flex-nowrap gap-2 items-center justify-center"
                >
                  Start free
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <JoinMailingListForm />
            </div>
          )}

          <p className="text-sm text-muted-foreground">
            Free tier, forever &bull; No setup fees &bull; Cancel anytime
          </p>

          {/*
            Secondary contact routes are deliberately rendered as quiet
            text links so they do not compete with the primary action above.
          */}
          <p className="text-sm text-muted-foreground">
            Questions about a larger deployment?{" "}
            <Link
              href={`mailto:${emails.salesEmail}`}
              className="text-primary hover:underline"
            >
              Talk to sales
            </Link>{" "}
            or{" "}
            <Link
              href={`mailto:${emails.supportEmail}`}
              className="text-primary hover:underline"
            >
              contact support
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
