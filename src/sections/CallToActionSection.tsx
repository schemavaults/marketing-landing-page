"use client";

import JoinMailingListForm from "@/components/JoinMailingListForm";
import { Button, Wordmark } from "@schemavaults/ui";
import { cn } from "@schemavaults/ui";
import type { ReactElement } from "react";
import type { default as LinkComponent } from "next/link";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { Mail } from "lucide-react";

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
              Get early access to <Wordmark />
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg">
              Join the waitlist for first-look access, founding-member pricing,
              and direct line-of-sight to the team shipping the product. Drop
              your email below — we&rsquo;ll only reach out when there&rsquo;s
              something worth your time.
            </p>
          </div>

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
