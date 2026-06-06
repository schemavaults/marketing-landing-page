"use client";

import JoinMailingListForm from "@/components/JoinMailingListForm";
import { Button, Wordmark } from "@schemavaults/ui";
import { cn } from "@schemavaults/ui";
import type { ReactElement } from "react";
import type { default as LinkComponent } from "next/link";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { Check, Mail } from "lucide-react";

export interface CTASectionProps {
  Link: typeof LinkComponent;
}

export function CTASection({ Link }: CTASectionProps): ReactElement {
  const emails = useOrgEmailAddresses();

  return (
    <section
      id={MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}
      className={cn("py-24", "w-full", "flex justify-center items-start")}
    >
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Stop hand-rolling validation. Ship type-safe data.
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg">
              Be the first to build on <Wordmark /> the moment public access
              opens. Drop your email below — we&apos;ll send a single message
              when early access is live.
            </p>
          </div>

          <ul className="flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-2 justify-center text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500 shrink-0" />
              Free forever tier
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500 shrink-0" />
              No credit card to start
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500 shrink-0" />
              Self-host or cloud
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500 shrink-0" />
              One unsubscribe email — no spam
            </li>
          </ul>

          <JoinMailingListForm />

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
            Try Free • No setup fees • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
