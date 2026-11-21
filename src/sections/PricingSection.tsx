"use client";

import { Check, X } from "lucide-react";
import { Button, cn } from "@schemavaults/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@schemavaults/ui";
import { Badge } from "@schemavaults/ui";
import { useMemo } from "react";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import type { IOrganizationContactEmailAddressesContextType } from "@/contexts/OrganizationContactEmailAddressesContext";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";

const plan_names = [
  "Free",
  "Personal",
  "Teams",
  "Enterprise",
] as const satisfies readonly string[];

type PlanName = (typeof plan_names)[number];

interface PricingPlan<N extends PlanName> {
  name: N;
  price: string;
  // Time period for price
  period?: string;
  description: string;
  popular?: boolean;
  /**
   * When set, the feature list is introduced with "Everything in <inherits>,
   * plus" — which reads as an upgrade rather than as a fresh list the visitor
   * has to diff against the column to its left.
   */
  inherits?: PlanName;
  features: readonly {
    name: string;
    included: boolean;
  }[];
  cta: string;
  ctaVariant: "outline" | "default";
  ctaLink?: string;
}

type PricingConfig = {
  [K in PlanName]: PricingPlan<K>;
};

/**
 * Listing every unavailable feature with a ✗ makes the cheaper plans feel
 * broken instead of sufficient. Show a couple of the most decision-relevant
 * gaps (they create the upgrade reason) and stop there.
 */
const MAX_EXCLUDED_FEATURES_SHOWN: number = 3;

export default function PricingSection() {
  const emails: IOrganizationContactEmailAddressesContextType =
    useOrgEmailAddresses();

  const registerHref: string = useRegisterPageHref();
  const privateBeta: boolean = usePrivateBeta();

  const waitlistHref: string = `#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`;

  /**
   * During the private beta the registration page requires an invite code, so
   * sending a visitor there from a pricing card is a dead end: they bounce off
   * a form they cannot complete. Point self-serve plans at the waitlist until
   * sign-up is actually open.
   */
  const selfServeCtaLink: string = privateBeta ? waitlistHref : registerHref;

  // Easy configuration - adjust prices, limits, and features here
  const pricingConfig: PricingConfig = useMemo(() => {
    return {
      Free: {
        name: "Free",
        price: "$0",
        period: "forever",
        description: "Perfect for trying out SchemaVaults",
        popular: false,
        features: [
          { name: "1 GB storage", included: true },
          { name: "3 vaults", included: true },
          { name: "5 schemas in global registry", included: true },
          { name: "100 agent queries/month", included: true },
          { name: "Community support", included: true },
          { name: "API access", included: false },
          { name: "Advanced analytics", included: false },
          { name: "Priority support", included: false },
          { name: "Custom integrations", included: false },
          { name: "SSO authentication", included: false },
        ],
        cta: privateBeta ? "Get early access" : "Get Started Free",
        ctaVariant: "outline" as const,
        ctaLink: selfServeCtaLink,
      },
      Personal: {
        name: "Personal",
        price: "$19",
        period: "per month",
        description: "For individual developers and small projects",
        popular: true,
        inherits: "Free",
        features: [
          { name: "50 GB storage", included: true },
          { name: "25 vaults", included: true },
          { name: "100 schemas per vault", included: true },
          { name: "5,000 agent queries/month", included: true },
          { name: "Email support", included: true },
          { name: "API access", included: true },
          { name: "Advanced analytics", included: true },
          { name: "Priority support", included: false },
          { name: "Custom integrations", included: false },
          { name: "SSO authentication", included: false },
        ],
        cta: privateBeta ? "Join the waitlist" : "Start Personal Plan",
        ctaVariant: "default" as const,
        ctaLink: selfServeCtaLink,
      },
      Teams: {
        name: "Teams",
        price: "$79",
        period: "per month",
        description: "For growing teams and collaborative workflows",
        popular: false,
        inherits: "Personal",
        features: [
          { name: "500 GB storage", included: true },
          { name: "Unlimited vaults", included: true },
          { name: "Unlimited schemas", included: true },
          { name: "50,000 agent queries/month", included: true },
          { name: "Priority support", included: true },
          { name: "API access", included: true },
          { name: "Advanced analytics", included: true },
          { name: "Custom integrations", included: true },
          { name: "SSO authentication", included: true },
        ],
        cta: privateBeta ? "Join the waitlist" : "Start Teams Plan",
        ctaVariant: "default" as const,
        ctaLink: selfServeCtaLink,
      },
      Enterprise: {
        name: "Enterprise",
        // "Custom" keeps the price row the same visual weight as the other
        // three columns; the CTA below already says to contact us.
        price: "Custom",
        period: "pricing",
        description: "For large organizations with custom needs",
        popular: false,
        inherits: "Teams",
        features: [
          { name: "Unlimited storage", included: true },
          { name: "Unlimited vaults", included: true },
          { name: "Unlimited schemas", included: true },
          { name: "Unlimited agent queries", included: true },
          { name: "24/7 dedicated support", included: true },
          { name: "API access", included: true },
          { name: "Advanced analytics", included: true },
          { name: "Custom integrations", included: true },
          { name: "SSO authentication", included: true },
          { name: "Self-hosting options", included: true },
          { name: "Bring your own compute/models", included: true },
          { name: "Custom SLA", included: true },
        ],
        cta: "Talk to us",
        ctaVariant: "outline" as const,
        ctaLink: `mailto:${emails.salesEmail satisfies string}`,
      },
    };
  }, [emails, privateBeta, selfServeCtaLink]);

  const pricingPlansList: readonly PricingPlan<PlanName>[] = useMemo(
    () => Object.values(pricingConfig),
    [pricingConfig],
  );

  return (
    <section
      id={MarketingLandingPageSectionIds.PRICING_SECTION}
      className="w-full py-24 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free and scale as you grow. Every plan includes schema
            validation, the schema editor and the SDKs — the limits change, the
            guarantees do not.
          </p>
          {privateBeta && (
            <p className="mt-6 mx-auto max-w-2xl text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                During the private beta, every plan is free.
              </span>{" "}
              These are the prices we expect to launch with, published early so
              you can budget — nothing is charged while you are on the beta, and
              we will tell you before that changes.
            </p>
          )}
        </div>

        {/* pt-6 reserves room for the "Most Popular" badge and the scaled-up
            card so neither is clipped by the grid at any breakpoint. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto pt-6">
          {pricingPlansList.map((plan: PricingPlan<PlanName>) => {
            const includedFeatures = plan.features.filter(
              (feature) => feature.included,
            );
            const excludedFeatures = plan.features
              .filter((feature) => !feature.included)
              .slice(0, MAX_EXCLUDED_FEATURES_SHOWN);

            return (
              <Card
                key={plan.name}
                className={cn(
                  "relative flex flex-col",
                  plan.popular
                    ? "border-primary shadow-lg lg:scale-105 lg:z-10"
                    : "border-border",
                )}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground whitespace-nowrap">
                    Most Popular
                  </Badge>
                )}

                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-muted-foreground ml-1">
                        /{plan.period}
                      </span>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  {plan.inherits && (
                    <p className="text-sm font-medium mb-3">
                      Everything in {plan.inherits}, plus:
                    </p>
                  )}
                  <ul className="space-y-3">
                    {includedFeatures.map((feature) => (
                      <li
                        key={feature.name}
                        className="flex items-start gap-3 text-sm"
                      >
                        <Check
                          className="h-5 w-5 text-green-500 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="text-foreground">{feature.name}</span>
                      </li>
                    ))}
                  </ul>

                  {excludedFeatures.length > 0 && (
                    <ul className="space-y-3 mt-4 pt-4 border-t">
                      {excludedFeatures.map((feature) => (
                        <li
                          key={feature.name}
                          className="flex items-start gap-3 text-sm"
                        >
                          <X
                            className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span className="text-muted-foreground">
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>

                <CardFooter className="pt-8">
                  {plan.ctaLink ? (
                    <Button
                      variant={plan.ctaVariant}
                      className="w-full"
                      asChild
                    >
                      <a href={plan.ctaLink}>{plan.cta}</a>
                    </Button>
                  ) : (
                    <Button variant={plan.ctaVariant} className="w-full">
                      {plan.cta}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16 space-y-3">
          <p className="text-muted-foreground">
            Change or cancel your plan whenever you like — no annual lock-in, no
            setup fees.
          </p>
          <p className="text-sm text-muted-foreground">
            Need something custom, or a security review before you commit?{" "}
            <a
              href={`mailto:${emails.salesEmail}`}
              className="text-primary hover:underline"
            >
              Talk to our team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
