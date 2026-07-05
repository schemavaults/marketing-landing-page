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
      className={cn(
        "py-24",
        "w-full",
        "flex justify-center items-start",
        "bg-gradient-to-b from-background to-muted/40",
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {privateBeta
                ? "Ready to simplify how you work with data?"
                : "Ship your first typed vault today."}
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg">
              {privateBeta ? (
                <>
                  Start building with <Wordmark /> the moment public access
                  opens. Drop your email below — we&apos;ll ping you the second
                  early access is live.
                </>
              ) : (
                <>
                  Spin up a free vault in under a minute. No credit card. Keep
                  what you build.
                </>
              )}
            </p>
          </div>

          {privateBeta ? (
            <JoinMailingListForm />
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button size="lg" asChild>
                <a
                  href={registerHref}
                  className="flex flex-row flex-nowrap gap-2 items-center justify-center"
                >
                  Start free
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Link href={`mailto:${emails.salesEmail}`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex flex-row flex-nowrap gap-2 items-center justify-center"
                >
                  <Mail className="h-4 w-4" />
                  Talk to sales
                </Button>
              </Link>
            </div>
          )}

          {privateBeta && (
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
            </div>
          )}

          <p className="text-sm text-muted-foreground">
            Free forever tier • No credit card • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
