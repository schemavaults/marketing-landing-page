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
            {privateBeta ? (
              <p className="mx-auto max-w-[600px] text-muted-foreground text-lg">
                <Wordmark />{" "}
                is in private beta. Leave your email and you will be among the
                first to know when public early access opens &mdash; no other
                mail, and you can unsubscribe in one click.
              </p>
            ) : (
              <p className="mx-auto max-w-[600px] text-muted-foreground text-lg">
                Start building on <Wordmark />{" "}
                today, or leave your email for product updates &mdash; no other
                mail, and you can unsubscribe in one click.
              </p>
            )}
          </div>

          {!privateBeta && (
            <div className="flex justify-center">
              <Button size="lg" asChild>
                <a
                  href={registerHref}
                  className="flex flex-row flex-nowrap gap-2 items-center justify-start"
                >
                  Start free
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          )}

          <JoinMailingListForm />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`mailto:${emails.salesEmail}`}>
              <Button
                variant="ghost"
                size="lg"
                className="flex flex-row flex-nowrap gap-2 items-center justify-start"
              >
                <Mail className="h-4 w-4" />
                Contact Sales
              </Button>
            </Link>
            <Link href={`mailto:${emails.supportEmail}`}>
              <Button
                variant="ghost"
                size="lg"
                className="flex flex-row flex-nowrap gap-2 items-center justify-start"
              >
                <Mail className="h-4 w-4" />
                Contact Support
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            {privateBeta
              ? "Free plan at launch • No setup fees • Cancel anytime"
              : "Free plan, $0 forever • No setup fees • Cancel anytime"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
