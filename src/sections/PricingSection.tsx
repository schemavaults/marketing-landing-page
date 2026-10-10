"use client";

import { Check } from "lucide-react";
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

export default function PricingSection() {
  const emails: IOrganizationContactEmailAddressesContextType =
    useOrgEmailAddresses();

  const registerHref: string = useRegisterPageHref();
  const privateBeta: boolean = usePrivateBeta();

  /**
   * During the private beta a "Get Started Free" button that lands on an
   * invite-code wall is a dead end, so self-serve plans point at the waitlist
   * instead. Enterprise always routes to a human.
   */
  // Easy configuration - adjust prices, limits, and features here
  const pricingConfig: PricingConfig = useMemo(() => {
    const selfServeCtaLink: string = privateBeta
      ? `#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`
      : registerHref;
    const selfServeCta = (label: string): string =>
      privateBeta ? "Join the waitlist" : label;

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
        cta: selfServeCta("Get started free"),
        ctaVariant: "outline" as const,
        ctaLink: selfServeCtaLink,
      },
      Personal: {
        name: "Personal",
        price: "$19",
        period: "per month",
        description: "For individual developers and small projects",
        popular: true,
        features: [
          { name: "50 GB storage", included: true },
          { name: "25 vaults", included: true },
          { name: "100 schemas per vault", included: true },
          { name: "5,000 agent queries/month", included: true },
          { name: "API access", included: true },
          { name: "Advanced analytics", included: true },
          { name: "Email support", included: true },
          { name: "Priority support", included: false },
          { name: "Custom integrations", included: false },
          { name: "SSO authentication", included: false },
        ],
        cta: selfServeCta("Start Personal plan"),
        ctaVariant: "default" as const,
        ctaLink: selfServeCtaLink,
      },
      Teams: {
        name: "Teams",
        price: "$79",
        period: "per month",
        description: "For growing teams and collaborative workflows",
        popular: false,
        features: [
          { name: "500 GB storage", included: true },
          { name: "Unlimited vaults", included: true },
          { name: "Unlimited schemas", included: true },
          { name: "50,000 agent queries/month", included: true },
          { name: "API access", included: true },
          { name: "Advanced analytics", included: true },
          { name: "Custom integrations", included: true },
          { name: "SSO authentication", included: true },
          { name: "Priority support", included: true },
        ],
        cta: selfServeCta("Start Teams plan"),
        ctaVariant: "default" as const,
        ctaLink: selfServeCtaLink,
      },
      Enterprise: {
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "For large organizations with custom needs",
        popular: false,
        features: [
          { name: "Unlimited storage, vaults & schemas", included: true },
          { name: "Unlimited agent queries", included: true },
          { name: "Self-hosting options", included: true },
          { name: "Bring your own compute/models", included: true },
          { name: "SSO authentication", included: true },
          { name: "Custom integrations", included: true },
          { name: "24/7 dedicated support", included: true },
          { name: "Custom SLA", included: true },
        ],
        cta: "Talk to sales",
        ctaVariant: "outline" as const,
        ctaLink: `mailto:${emails.salesEmail satisfies string}`,
      },
    };
  }, [emails, privateBeta, registerHref]);

  const pricingPlansList: readonly PricingPlan<PlanName>[] = useMemo(
    () => Object.values(pricingConfig),
    [pricingConfig],
  );

  return (
    <section
      id={MarketingLandingPageSectionIds.PRICING_SECTION}
      className="py-24 w-full scroll-mt-16 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {privateBeta
              ? "Here is what pricing will look like at launch. Waitlist members get first access to the free plan."
              : "Start free and scale as you grow. No setup fees, and you can change or cancel your plan at any time."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 max-w-7xl mx-auto">
          {pricingPlansList.map((plan: PricingPlan<PlanName>) => {
            const included = plan.features.filter((f) => f.included);
            const excluded = plan.features.filter((f) => !f.included);

            return (
              <Card
                key={plan.name}
                className={cn(
                  "relative flex flex-col",
                  /*
                   * `scale-105` on every breakpoint pushed the popular card
                   * over its neighbours in the single- and two-column layouts.
                   * Emphasise with a ring instead and only scale once the
                   * four-column grid has room for it.
                   */
                  plan.popular
                    ? "border-primary ring-2 ring-primary/40 shadow-lg z-10 lg:scale-105"
                    : "border-border",
                )}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground z-20">
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
                  <ul className="space-y-3">
                    {included.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check
                          className="h-5 w-5 text-green-500 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="text-sm text-foreground">
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/*
                   * Excluded features used to render as a column of red-X rows
                   * (five of them on the entry plan), which framed the cheapest
                   * tier almost entirely in negatives. One muted line keeps the
                   * information without the discouragement.
                   */}
                  {excluded.length > 0 && (
                    <p className="mt-5 pt-4 border-t text-xs text-muted-foreground leading-relaxed">
                      <span className="font-medium">Not included: </span>
                      {excluded.map((feature) => feature.name).join(", ")}
                    </p>
                  )}
                </CardContent>

                <CardFooter className="pt-6">
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
            All plans include our core features and regular updates. Change or
            cancel your plan at any time.
          </p>
          <p className="text-sm text-muted-foreground">
            Need something custom, or want to self-host?{" "}
            <a
              href={`mailto:${emails.salesEmail}`}
              className="text-primary hover:underline"
            >
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
