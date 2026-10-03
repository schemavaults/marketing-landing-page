"use client";

import JoinMailingListForm from "@/components/JoinMailingListForm";
import { Button, Wordmark } from "@schemavaults/ui";
import { cn } from "@schemavaults/ui";
import type { ReactElement } from "react";
import type { default as LinkComponent } from "next/link";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import useTrackConversionEvent from "@/hooks/useTrackConversionEvent";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { ArrowRight, Mail } from "lucide-react";

export interface CTASectionProps {
  Link: typeof LinkComponent;
}

export function CTASection({ Link }: CTASectionProps): ReactElement {
  const emails = useOrgEmailAddresses();
  const privateBeta: boolean = usePrivateBeta();
  const registerHref: string = useRegisterPageHref();
  const track = useTrackConversionEvent();

  return (
    <section
      id={MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}
      className={cn("py-24", "w-full", "flex justify-center items-start")}
    >
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance">
              {privateBeta
                ? "Get your invite when the next batch goes out"
                : "Ready to simplify how you work with data?"}
            </h2>
            <p className="mx-auto max-w-[38rem] text-muted-foreground text-lg text-pretty">
              {privateBeta ? (
                <>
                  Leave your email and we will send your <Wordmark /> invite as
                  soon as one is free. It takes one field and no payment
                  details.
                </>
              ) : (
                <>
                  Create your first vault in minutes. The free plan needs no
                  card, and you can self-host whenever you want to.
                </>
              )}
            </p>
          </div>

          {privateBeta ? (
            <JoinMailingListForm
              section={MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}
              submitLabel="Request an invite"
            />
          ) : (
            <div className="flex justify-center">
              <Button size="lg" asChild>
                <a
                  href={registerHref}
                  className="flex flex-row flex-nowrap gap-2 items-center justify-start"
                  onClick={() =>
                    track("hero_primary_cta_click", {
                      section:
                        MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION,
                      label: "Start building free",
                    })
                  }
                >
                  Start building free
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          )}

          {/* Secondary routes are deliberately quieter than the primary action
              above: a row of equally-weighted buttons splits the click. */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href={`mailto:${emails.salesEmail}`}
              onClick={() =>
                track("contact_sales_click", {
                  section:
                    MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION,
                })
              }
            >
              <Button
                variant="outline"
                size="lg"
                className="flex flex-row flex-nowrap gap-2 items-center justify-start"
              >
                <Mail className="h-4 w-4" />
                Talk to us about your use case
              </Button>
            </Link>
            <Link
              href={`mailto:${emails.supportEmail}`}
              className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
            >
              Contact support
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            {privateBeta
              ? "Free during beta • No card required • Unsubscribe in one click"
              : "Free to start • No setup fees • Cancel anytime"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
