"use client";

export interface Feature {
  id: string;
  heading: string;
  subheading: string;
  body: string;
  image: string;
}

export interface FeaturesFlowProps {
  features?: Feature[];
}

import FullscreenImage from "@/components/FullscreenImage";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { Button, cn } from "@schemavaults/ui";
import { ArrowRight, ArrowDown } from "lucide-react";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";

const defaultFeatures: Feature[] = [
  {
    id: "1",
    heading: "Define Datatype Schema",
    subheading: "Structure Your Information",
    body:
      "Start by defining your data schema and types using our visual schema editor interface or agentic chatbot." +
      " " +
      "Create custom data structures that fit your specific needs.",
    image:
      "/media/marketing-landing-page/feature-flow-images/1-schema-editor.png",
  },
  {
    id: "2",
    heading: "Create Your Vault",
    subheading: "Secure Storage Solutions",
    body:
      "Deploy your data vault anywhere - on our cloud platform for easy scalability and set-up, in-memory for lightning-fast local access, or in your own datacenter." +
      " " +
      "Choose the storage solution that best fits your security and performance requirements.",
    image:
      "/media/marketing-landing-page/feature-flow-images/2-vault-graph-browser.png",
  },
  {
    id: "3",
    heading: "Integrate",
    subheading: "Trigger Events/Workflows & Load Vault Data",
    body:
      "Create intelligent agents or workflows that interact with your data and respond to real-time events (that actually know what type of data they're working with)." +
      " " +
      "Or, just use SchemaVaults as a powerful content management system.",
    image: "/media/marketing-landing-page/feature-flow-images/3-integrate.png",
  },
];

export function HowItWorksFeaturesFlow({
  features = defaultFeatures,
}: FeaturesFlowProps) {
  const privateBeta: boolean = usePrivateBeta();
  const registerHref: string = useRegisterPageHref();

  return (
    <section
      id={MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}
      className={cn(
        "w-full h-auto scroll-mt-16",
        "py-12 md:py-24 lg:py-32",
        "bg-gradient-to-b",
        "from-gray-50 dark:from-gray-600",
        "to-accent",
        "flex flex-col justify-start items-center",
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three steps from a blank page to schema-validated data your agents,
            apps, and workflows can rely on.
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-center gap-8">
          {features.map((feature, index) => (
            <div key={feature.id} className="flex items-center">
              <div className="flex flex-col items-center max-w-sm">
                <div className="relative mb-6">
                  <FullscreenImage
                    src={feature.image}
                    width={400}
                    height={350}
                    alt={feature.heading}
                    className="rounded-lg shadow-lg object-cover text-center"
                  />
                  <div className="absolute -top-4 -left-4 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">{feature.heading}</h3>
                  <h4 className="text-lg text-muted-foreground font-medium mb-3">
                    {feature.subheading}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.body}
                  </p>
                </div>
              </div>

              {index < features.length - 1 && (
                <div className="mx-8 flex items-center">
                  <ArrowRight className="h-8 w-8 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden space-y-8">
          {features.map((feature, index) => (
            <div key={feature.id} className="flex flex-col items-center">
              <div className="flex flex-col items-center max-w-md mx-auto">
                <div className="relative mb-6">
                  {/*
                    Was a raw <img>: that skipped next/image optimisation and
                    made the first in-view screenshot a heavy, unsized request
                    on exactly the devices with the least bandwidth.
                  */}
                  <FullscreenImage
                    src={feature.image}
                    width={400}
                    height={350}
                    alt={feature.heading}
                    className="rounded-lg shadow-lg w-full max-w-sm h-48 sm:h-60 object-cover"
                  />
                  <div className="absolute -top-4 -left-4 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="text-center px-4">
                  <h3 className="text-xl font-bold mb-2">{feature.heading}</h3>
                  <h4 className="text-lg text-muted-foreground font-medium mb-3">
                    {feature.subheading}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.body}
                  </p>
                </div>
              </div>

              {index < features.length - 1 && (
                <div className="mt-8 flex justify-center">
                  <ArrowDown className="h-8 w-8 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/*
          Mid-page conversion point: before this, the only actions between the
          hero and the footer were inside the pricing table.
        */}
        <div className="mt-14 lg:mt-20 flex flex-col items-center gap-3">
          <Button size="lg" asChild>
            <a
              href={
                privateBeta
                  ? `#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`
                  : registerHref
              }
              className="flex flex-row flex-nowrap gap-2 items-center justify-center"
            >
              {privateBeta
                ? "Get early access"
                : "Create your first vault free"}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <p className="text-xs md:text-sm text-muted-foreground text-center">
            {privateBeta
              ? "Takes 15 seconds. One email when your invite is ready."
              : "No setup fees. Start on the free forever plan."}
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksFeaturesFlow;
