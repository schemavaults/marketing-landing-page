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

/**
 * Kept as string literals rather than inline JSX text: JSX drops the
 * whitespace that would otherwise sit between <Wordmark /> and the copy
 * around it, which renders as "SchemaVaultsis in private beta".
 */
const privateBetaBlurb: string =
  " is in private beta. Leave your email and you will be among the first to" +
  " hear when the public beta opens \u2014 no invite code required.";
const publicBlurbBefore: string =
  "Get product updates, new schema patterns, and release notes from the ";
const publicBlurbAfter: string =
  " team. One email at a time, no noise.";

export function CTASection({ Link }: CTASectionProps): ReactElement {
  const emails = useOrgEmailAddresses();
  const privateBeta: boolean = usePrivateBeta();
  const registerHref: string = useRegisterPageHref();

  return (
    <section
      id={MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}
      className={cn(
        "py-24 w-full scroll-mt-16",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance">
              Ready to simplify how you work with data?
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg text-pretty">
              {privateBeta ? (
                <>
                  <Wordmark />
                  {privateBetaBlurb}
                </>
              ) : (
                <>
                  {publicBlurbBefore}
                  <Wordmark />
                  {publicBlurbAfter}
                </>
              )}
            </p>
          </div>

          <JoinMailingListForm />

          {!privateBeta && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a
                  href={registerHref}
                  className="flex flex-row flex-nowrap gap-2 items-center justify-start"
                >
                  Get started free
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`mailto:${emails.salesEmail}`}>
              <Button
                variant="outline"
                size="lg"
                className="flex flex-row flex-nowrap gap-2 items-center justify-start"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Contact Sales
              </Button>
            </Link>
            <Link href={`mailto:${emails.supportEmail}`}>
              <Button
                variant="outline"
                size="lg"
                className="flex flex-row flex-nowrap gap-2 items-center justify-start"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Contact Support
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            {privateBeta
              ? "No credit card • We only email about the beta • Unsubscribe anytime"
              : "Try free • No setup fees • Cancel anytime"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
