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
import SECTION_SCROLL_MARGIN_CLASSNAME from "@/lib/sectionScrollMargin";
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
        "flex justify-center items-start",
        SECTION_SCROLL_MARGIN_CLASSNAME,
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Stop guessing what shape your data is in
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg">
              {privateBeta ? (
                <>
                  <Wordmark />{" "}
                  is in private beta. Leave your email and
                  you&apos;ll be among the first to build on it when access
                  opens.
                </>
              ) : (
                <>
                  Create your first vault on the free tier in a few minutes
                  — no credit card, no setup fees.
                </>
              )}
            </p>
          </div>

          {privateBeta ? (
            <JoinMailingListForm />
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild>
                <a
                  href={registerHref}
                  className="flex flex-row flex-nowrap gap-2 items-center justify-center"
                >
                  Get started free
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          )}

          {/*
            Contact links are an escape hatch, not the primary action -- as
            equally-weighted buttons they were competing with the sign-up above
            them, so they are plain links now.
          */}
          <p className="text-sm text-muted-foreground">
            Evaluating for a team?{" "}
            <Link
              href={`mailto:${emails.salesEmail}`}
              className="text-primary hover:underline"
            >
              Talk to sales
            </Link>{" "}
            &middot; Need a hand?{" "}
            <Link
              href={`mailto:${emails.supportEmail}`}
              className="text-primary hover:underline"
            >
              Contact support
            </Link>
          </p>

          {!privateBeta && (
            <p className="text-sm text-muted-foreground">
              Free forever tier &middot; No setup fees &middot; Upgrade or
              cancel anytime
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default CTASection;
