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
        "py-24 scroll-mt-16",
        "w-full",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to simplify how you work with data?
            </h2>
            {/*
              The two states deliberately say different things. Previously this
              section promised "early access" while the pricing table above it
              said "Get Started Free", which left visitors unsure whether they
              could sign up today.
            */}
            {privateBeta ? (
              <p className="mx-auto max-w-[620px] text-muted-foreground text-lg">
                <Wordmark /> is in private beta. Leave your email and we will
                send your invite code as soon as a spot opens up — plus a short
                heads-up before launch pricing changes.
              </p>
            ) : (
              <p className="mx-auto max-w-[620px] text-muted-foreground text-lg">
                Start building on <Wordmark /> today for free, or join the
                mailing list for new features, schema patterns, and release
                notes.
              </p>
            )}
          </div>

          {!privateBeta && (
            <div className="flex justify-center">
              <Button size="lg" asChild>
                <a
                  href={registerHref}
                  className="flex flex-row flex-nowrap gap-2 items-center justify-center"
                >
                  Create your free vault
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          )}

          <JoinMailingListForm
            label={privateBeta ? "Join the waitlist" : "Join mailing list"}
          />

          {privateBeta && (
            <p className="text-sm text-muted-foreground">
              Already have an invite code?{" "}
              <a href={registerHref} className="text-primary hover:underline">
                Register now
              </a>
              .
            </p>
          )}

          <p className="text-sm text-muted-foreground">
            {privateBeta
              ? "Free plan at launch • No setup fees • Unsubscribe anytime"
              : "Free forever plan • No setup fees • Cancel anytime"}
          </p>

          {/*
            Contact links stay as quiet text links: as full-size buttons they
            competed with the primary conversion above them.
          */}
          <p className="text-sm text-muted-foreground">
            Evaluating for a team?{" "}
            <Link
              href={`mailto:${emails.salesEmail}`}
              className="text-primary hover:underline"
            >
              Contact sales
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
