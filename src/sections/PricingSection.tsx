"use client";

import { Check, X } from "lucide-react";
import { Button } from "@schemavaults/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@schemavaults/ui";
import { Badge } from "@schemavaults/ui";
import { cn } from "@schemavaults/ui";
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
   * During the private beta, self-serve sign-up is gated behind an invite
   * code, so sending a visitor who just clicked "Start Teams Plan" to the
   * registration page is a dead end. Point every self-serve plan at the
   * waitlist instead, and say plainly that these prices are not yet final.
   */
  const waitlistHref: string = `#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`;
  const selfServeHref: string = privateBeta ? waitlistHref : registerHref;

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
        cta: privateBeta ? "Join the waitlist" : "Get Started Free",
        ctaVariant: "outline" as const,
        ctaLink: selfServeHref,
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
          { name: "Email support", included: true },
          { name: "API access", included: true },
          { name: "Advanced analytics", included: true },
          { name: "Priority support", included: false },
          { name: "Custom integrations", included: false },
          { name: "SSO authentication", included: false },
        ],
        cta: privateBeta ? "Join the waitlist" : "Start Personal Plan",
        ctaVariant: "default" as const,
        ctaLink: selfServeHref,
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
          { name: "Priority support", included: true },
          { name: "API access", included: true },
          { name: "Advanced analytics", included: true },
          { name: "Custom integrations", included: true },
          { name: "SSO authentication", included: true },
        ],
        cta: privateBeta ? "Join the waitlist" : "Start Teams Plan",
        ctaVariant: "default" as const,
        ctaLink: selfServeHref,
      },
      Enterprise: {
        name: "Enterprise",
        price: "Contact Sales",
        period: "",
        description: "For large organizations with custom needs",
        popular: false,
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
        cta: "Contact Sales",
        ctaVariant: "outline" as const,
        ctaLink: `mailto:${emails.salesEmail satisfies string}`,
      },
    };
  }, [emails, privateBeta, selfServeHref]);

  const pricingPlansList: readonly PricingPlan<PlanName>[] = useMemo(
    () => Object.values(pricingConfig),
    [pricingConfig],
  );

  return (
    <section
      id={MarketingLandingPageSectionIds.PRICING_SECTION}
      className="py-24 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4 text-balance">
            {privateBeta
              ? "Pricing we're planning at launch"
              : "Simple, transparent pricing"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            {privateBeta
              ? "Here is where we expect plans to land when SchemaVaults opens to the public. Join the waitlist and we will tell you before anything is charged."
              : "Choose the perfect plan for your needs. Start free and scale as you grow."}
          </p>
          {privateBeta && (
            <p className="mt-6 text-sm text-muted-foreground">
              <Badge variant="outline" className="mr-2 align-middle">
                Private beta
              </Badge>
              Plans and limits below are not final and may change before
              general availability.
            </p>
          )}
        </div>

        {/*
          `pt-4` on the grid leaves room for the "Most Popular" badge, which is
          positioned above the top edge of its card.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4 max-w-7xl mx-auto">
          {pricingPlansList.map((plan: PricingPlan<PlanName>) => (
            <Card
              key={plan.name}
              className={cn(
                "relative flex flex-col",
                // A ring rather than `scale-105`: scaling a grid item makes it
                // overlap its neighbours and blurs its text on some browsers.
                plan.popular
                  ? "border-primary ring-2 ring-primary/40 shadow-lg"
                  : "border-border",
              )}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground whitespace-nowrap">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-sm">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span
                    className={cn(
                      "font-bold",
                      // A worded price ("Contact Sales") wraps onto two lines
                      // at the size used for dollar amounts, which knocks that
                      // card's feature list out of alignment with the rest.
                      plan.price.startsWith("$") ? "text-4xl" : "text-3xl",
                    )}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground ml-1">
                      /{plan.period}
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check
                          className="h-5 w-5 text-green-500 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                      ) : (
                        <X
                          className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className={cn(
                          "text-sm",
                          feature.included
                            ? "text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        <span className="sr-only">
                          {feature.included ? "Included: " : "Not included: "}
                        </span>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-8">
                {plan.ctaLink ? (
                  <Button variant={plan.ctaVariant} className="w-full" asChild>
                    <a href={plan.ctaLink}>
                      {plan.cta}
                      <span className="sr-only">{` — ${plan.name} plan`}</span>
                    </a>
                  </Button>
                ) : (
                  <Button variant={plan.ctaVariant} className="w-full">
                    {plan.cta}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16 space-y-4">
          <p className="text-muted-foreground">
            Every plan includes schema validation, the visual schema editor,
            and our TypeScript SDKs.
          </p>
          <p className="text-sm text-muted-foreground">
            Need something custom, or want to self-host?{" "}
            <a
              href={`mailto:${emails.salesEmail}`}
              className="text-primary hover:underline"
            >
              Talk to our sales team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
