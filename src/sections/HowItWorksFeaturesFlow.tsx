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
import { cn } from "@schemavaults/ui";
import { ArrowRight, ArrowDown } from "lucide-react";

const defaultFeatures: Feature[] = [
  {
    id: "1",
    heading: "Define your schema",
    subheading: "Visual editor, chat, or TypeScript",
    body:
      "Sketch out your data shape in our visual schema editor, describe it to our AI, or write it in TypeScript." +
      " " +
      "Compose and nest schemas to model anything from a single document to a full domain.",
    image:
      "/media/marketing-landing-page/feature-flow-images/1-schema-editor.png",
  },
  {
    id: "2",
    heading: "Spin up a vault",
    subheading: "Cloud, in-memory, or self-hosted",
    body:
      "Deploy a fully-typed graph database in seconds — managed in our cloud, embedded in-memory for local-first apps, or hosted in your own datacenter for full data sovereignty." +
      " " +
      "Same schema, anywhere it runs.",
    image:
      "/media/marketing-landing-page/feature-flow-images/2-vault-graph-browser.png",
  },
  {
    id: "3",
    heading: "Ship & integrate",
    subheading: "Type-safe agents, workflows, and apps",
    body:
      "Wire up AI agents, event-driven workflows, and frontends that already know the shape of every record they read or write." +
      " " +
      "Or just use SchemaVaults as a headless, AI-native CMS.",
    image: "/media/marketing-landing-page/feature-flow-images/3-integrate.png",
  },
];

export function HowItWorksFeaturesFlow({
  features = defaultFeatures,
}: FeaturesFlowProps) {
  return (
    <section
      id={MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}
      className={cn(
        "w-screen h-auto",
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
            Get ready to transform how you manage and interact with your data.
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
                  <img
                    src={feature.image}
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
      </div>
    </section>
  );
}

export default HowItWorksFeaturesFlow;
