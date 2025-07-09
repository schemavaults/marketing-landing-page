"use client";

import JoinMailingListForm from "@/components/JoinMailingListForm";
import { Button, Wordmark } from "@schemavaults/ui";
import { cn } from "@schemavaults/ui";
import type { ReactElement } from "react";
import type { default as LinkComponent } from "next/link";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";

export interface CTASectionProps {
  Link: typeof LinkComponent;
}

export function CTASection({ Link }: CTASectionProps): ReactElement {
  const emails = useOrgEmailAddresses();

  return (
    <section
      className={cn("py-24", "w-full", "flex justify-center items-start")}
    >
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to simplify how you work with data?
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg">
              Start building with <Wordmark /> as soon as it is available to the
              public. Enter your email below to get notified when early access
              is available.
            </p>
          </div>

          <JoinMailingListForm />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`mailto:${emails.salesEmail}`}>
              <Button variant="outline" size="lg">
                Schedule Demo
              </Button>
            </Link>
            <Button variant="ghost" size="lg">
              View Documentation
            </Button>
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
