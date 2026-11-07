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
import { ArrowRight, Mail } from "lucide-react";

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
        /** Offset anchor scrolling for the fixed header. */
        "scroll-mt-16",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance">
              {privateBeta
                ? "Get early access to SchemaVaults"
                : "Ready to simplify how you work with data?"}
            </h2>
            {/*
              The closing pitch has to match reality: during the private beta
              the only thing a visitor can actually do is join the list, so say
              that plainly instead of inviting them to "start building".
            */}
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg text-pretty">
              {privateBeta ? (
                <>
                  <Wordmark /> is in private beta. Leave your email and
                  we&rsquo;ll send you an invite code as access opens up &mdash;
                  plus a short note on what shipped. No spam, unsubscribe in one
                  click.
                </>
              ) : (
                <>
                  Create your first vault on the free tier in minutes. Or leave
                  your email and we&rsquo;ll send you the occasional note about
                  what&rsquo;s new in <Wordmark />.
                </>
              )}
            </p>
          </div>

          {!privateBeta && (
            <div className="flex justify-center">
              <Button size="lg" asChild>
                <a
                  href={registerHref}
                  className="flex flex-row flex-nowrap gap-2 items-center justify-start"
                >
                  Start free &mdash; no credit card
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          )}

          <JoinMailingListForm />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`mailto:${emails.salesEmail}`}>
              <Button
                variant="outline"
                size="lg"
                className="flex flex-row flex-nowrap gap-2 items-center justify-start"
              >
                <Mail className="h-4 w-4" />
                Talk to sales
              </Button>
            </Link>
            <Link href={`mailto:${emails.supportEmail}`}>
              <Button
                variant="ghost"
                size="lg"
                className="flex flex-row flex-nowrap gap-2 items-center justify-start"
              >
                <Mail className="h-4 w-4" />
                Contact support
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            Free forever tier &bull; No credit card required &bull; Cloud or
            self-hosted &bull; Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
