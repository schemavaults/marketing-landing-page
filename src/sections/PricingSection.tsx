"use client";

import { Check, X } from "lucide-react";
import { Button } from "@schemavaults/ui";
import {
  Callout,
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
import useTrackConversionEvent from "@/hooks/useTrackConversionEvent";
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

const waitlistHref: string = `#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`;

export default function PricingSection() {
  const emails: IOrganizationContactEmailAddressesContextType =
    useOrgEmailAddresses();

  const registerHref: string = useRegisterPageHref();
  const privateBeta: boolean = usePrivateBeta();
  const track = useTrackConversionEvent();

  // During the private beta nobody can self-serve a plan: sending them to the
  // invite-gated register page from a button labelled "Start Personal Plan" is
  // a dead end that costs us the lead. Point every self-serve plan at the
  // waitlist instead, and say so plainly above the table.
  const selfServeCta: (label: string) => Pick<
    PricingPlan<PlanName>,
    "cta" | "ctaLink"
  > = useMemo(
    () => (label: string) =>
      privateBeta
        ? { cta: "Join the waitlist", ctaLink: waitlistHref }
        : { cta: label, ctaLink: registerHref },
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
        ctaVariant: "outline" as const,
        ...selfServeCta("Get started free"),
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
        ctaVariant: "default" as const,
        ...selfServeCta("Start Personal plan"),
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
        ctaVariant: "default" as const,
        ...selfServeCta("Start Teams plan"),
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
      className="py-24 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Choose the perfect plan for your needs. Start free and scale as you
            grow.
          </p>
        </div>

        {privateBeta && (
          <Callout
            intent="note"
            title="Pricing for launch"
            className="mx-auto max-w-3xl mb-12"
          >
            SchemaVaults is in private beta, so these plans are not purchasable
            yet — they are what pricing will look like at launch, published
            early so you can budget. Beta invites are free and come with no
            payment details.
          </Callout>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {pricingPlansList.map((plan: PricingPlan<PlanName>) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                plan.popular
                  ? "border-primary shadow-lg lg:scale-105"
                  : "border-border"
              }`}
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
                  <span
                    className={
                      plan.price.startsWith("$")
                        ? "text-4xl font-bold"
                        : "text-2xl font-bold"
                    }
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
                  {plan.features.map((feature) => (
                    <li key={feature.name} className="flex items-start gap-3">
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
                        className={`text-sm ${feature.included ? "text-foreground" : "text-muted-foreground"}`}
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
                    <a
                      href={plan.ctaLink}
                      onClick={() =>
                        track(
                          plan.name === "Enterprise"
                            ? "contact_sales_click"
                            : "pricing_cta_click",
                          {
                            section:
                              MarketingLandingPageSectionIds.PRICING_SECTION,
                            label: plan.name,
                          },
                        )
                      }
                    >
                      {plan.cta}
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

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            All plans include our core features and regular updates
          </p>
          <p className="text-sm text-muted-foreground">
            Need something custom?{" "}
            <a
              href={`mailto:${emails.salesEmail}`}
              className="text-primary hover:underline"
              onClick={() =>
                track("contact_sales_click", {
                  section: MarketingLandingPageSectionIds.PRICING_SECTION,
                  label: "Need something custom",
                })
              }
            >
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
