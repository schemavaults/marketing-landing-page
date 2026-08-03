"use client";

import JoinMailingListForm from "@/components/JoinMailingListForm";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import { Button, Wordmark, cn } from "@schemavaults/ui";
import type { ReactElement } from "react";
import type { default as LinkComponent } from "next/link";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { ArrowRight, Mail, Sparkles, ShieldCheck, Zap } from "lucide-react";

export interface CTASectionProps {
  Link: typeof LinkComponent;
}

const waitlistBenefits: readonly {
  icon: typeof Sparkles;
  label: string;
}[] = [
  { icon: Sparkles, label: "First access when the public beta opens" },
  { icon: ShieldCheck, label: "Launch pricing locked in for early customers" },
  { icon: Zap, label: "Direct line to the team for feedback and support" },
];

export function CTASection({ Link }: CTASectionProps): ReactElement {
  const emails = useOrgEmailAddresses();
  const privateBeta: boolean = usePrivateBeta();
  const registerHref: string = useRegisterPageHref();

  return (
    <section
      id={MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}
      className={cn("py-24", "w-full", "flex justify-center items-start")}
    >
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {privateBeta
                ? "Get on the launch waitlist"
                : "Start building with type-safe data today"}
            </h2>
            <p className="mx-auto max-w-[620px] text-muted-foreground text-lg">
              {privateBeta ? (
                <>
                  <Wordmark /> is in private beta. Drop your email to be
                  notified the moment public access opens — no marketing spam,
                  just the launch signal.
                </>
              ) : (
                <>
                  Create an account and spin up your first vault in under two
                  minutes. Free tier, no credit card required.
                </>
              )}
            </p>
          </div>

          {privateBeta && (
            <>
              <JoinMailingListForm />

              <ul className="grid gap-3 sm:grid-cols-3 max-w-3xl mx-auto text-left">
                {waitlistBenefits.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <Icon className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
            <Link href={registerHref}>
              <Button
                size="lg"
                className="flex flex-row flex-nowrap gap-2 items-center justify-center"
              >
                {privateBeta ? "Register with invite code" : "Get started free"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
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

          <p className="text-sm text-muted-foreground">
            Free forever tier · No setup fees · Self-hosting available
          </p>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
