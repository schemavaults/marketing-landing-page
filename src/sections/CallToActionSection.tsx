"use client";

import JoinMailingListForm from "@/components/JoinMailingListForm";
import { Button, Wordmark } from "@schemavaults/ui";
import { cn } from "@schemavaults/ui";
import type { ReactElement } from "react";
import type { default as LinkComponent } from "next/link";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { ArrowRight, Mail } from "lucide-react";

export interface CTASectionProps {
  Link: typeof LinkComponent;
}

export function CTASection({ Link }: CTASectionProps): ReactElement {
  const emails = useOrgEmailAddresses();
  const registerHref: string = useRegisterPageHref();
  const privateBeta: boolean = usePrivateBeta();

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
                ? "Be first in line when we open the doors."
                : "Ready to simplify how you work with data?"}
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg">
              {privateBeta ? (
                <>
                  <Wordmark /> is in private beta. Drop your email and we&apos;ll
                  ping you the moment early access opens — no spam, just the
                  launch invite.
                </>
              ) : (
                <>
                  Spin up your first vault in minutes. Start on the free plan,
                  invite your team when you&apos;re ready, and self-host
                  whenever you need to.
                </>
              )}
            </p>
          </div>

          {privateBeta ? (
            <JoinMailingListForm />
          ) : (
            <div className="flex justify-center">
              <Link href={registerHref}>
                <Button
                  size="lg"
                  className="flex flex-row flex-nowrap gap-2 items-center justify-start"
                >
                  Create your free account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`mailto:${emails.salesEmail}`}>
              <Button
                variant="outline"
                size="lg"
                className="flex flex-row flex-nowrap gap-2 items-center justify-start"
              >
                <Mail className="h-4 w-4" />
                Contact Sales
              </Button>
            </Link>
            <Link href={`mailto:${emails.supportEmail}`}>
              <Button
                variant="outline"
                size="lg"
                className="flex flex-row flex-nowrap gap-2 items-center justify-start"
              >
                <Mail className="h-4 w-4" />
                Contact Support
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            Free forever plan · No setup fees · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
