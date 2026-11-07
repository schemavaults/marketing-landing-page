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
import { useMemo } from "react";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import type { IOrganizationContactEmailAddressesContextType } from "@/contexts/OrganizationContactEmailAddressesContext";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { cn } from "@schemavaults/ui";

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
   * code, so sending a visitor straight to the register page is a dead end.
   * Point the self-serve plans at the waitlist instead and label the button
   * honestly; Enterprise always goes to a human.
   */
  const selfServeCta: { href: string; label: (plan: PlanName) => string } =
    useMemo(
      () =>
        privateBeta
          ? {
              href: `#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`,
              label: () => "Join the waitlist",
            }
          : {
              href: registerHref,
              label: (plan: PlanName) =>
                plan === "Free" ? "Get started free" : `Start ${plan} plan`,
            },
      [privateBeta, registerHref],
    );

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
        cta: selfServeCta.label("Free"),
        ctaVariant: "outline" as const,
        ctaLink: selfServeCta.href,
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
        cta: selfServeCta.label("Personal"),
        ctaVariant: "default" as const,
        ctaLink: selfServeCta.href,
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
        cta: selfServeCta.label("Teams"),
        ctaVariant: "default" as const,
        ctaLink: selfServeCta.href,
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
  }, [emails, selfServeCta]);

  const pricingPlansList: readonly PricingPlan<PlanName>[] = useMemo(
    () => Object.values(pricingConfig),
    [pricingConfig],
  );

  return (
    <section
      id={MarketingLandingPageSectionIds.PRICING_SECTION}
      className={cn(
        "w-full py-24 bg-gradient-to-b from-background to-muted/20",
        /** Offset anchor scrolling for the fixed header. */
        "scroll-mt-16",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Start on the free tier &mdash; no credit card, no trial clock.
            Upgrade only once you have outgrown it, and keep everything you
            built.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {pricingPlansList.map((plan: PricingPlan<PlanName>) => (
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
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
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
                  {/*
                    "Contact Sales" at text-4xl wrapped onto two lines and
                    pushed the Enterprise feature list out of alignment with
                    the other three cards. Only actual prices get the big
                    treatment.
                  */}
                  <span
                    className={cn(
                      "font-bold",
                      plan.price.startsWith("$")
                        ? "text-4xl"
                        : "text-2xl whitespace-nowrap",
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
                    <li
                      key={featureIndex}
                      className={cn(
                        "flex items-start gap-3",
                        /**
                         * A column of hard "X" marks on the entry plan reads
                         * as a list of reasons not to start. Keep the
                         * exclusions (they are honest and aid comparison) but
                         * stop them competing with what the plan does give
                         * you.
                         */
                        !feature.included && "opacity-60",
                      )}
                    >
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
                    <a href={plan.ctaLink}>{plan.cta}</a>
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

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-2">
            All plans include our core features and regular updates
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Prices in USD, billed monthly. Cancel anytime &mdash; your schemas
            and data are yours to export.
          </p>
          <p className="text-sm text-muted-foreground">
            Need something custom?{" "}
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
