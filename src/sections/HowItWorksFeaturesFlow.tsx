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
import { Fragment, type ReactElement } from "react";

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

/**
 * A single step in the flow.
 *
 * Previously this section rendered two complete copies of every step (one
 * `hidden lg:flex` desktop tree and one `lg:hidden` mobile tree). That made the
 * browser download every screenshot twice and made every heading appear twice
 * in the accessibility tree. There is now a single responsive tree.
 */
function FeatureFlowStep({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}): ReactElement {
  return (
    <li className="flex flex-col items-center w-full max-w-md lg:max-w-[22rem]">
      {/*
        The three screenshots have different intrinsic aspect ratios. Without a
        fixed frame height the columns end at different points and the step
        headings no longer share a baseline, which makes the row read as three
        unrelated cards rather than one sequence.
      */}
      <div className="relative mb-6 w-full">
        <FullscreenImage
          src={feature.image}
          width={400}
          height={350}
          alt={`${feature.heading} — ${feature.subheading}`}
          className="rounded-lg shadow-lg object-cover w-full h-48 sm:h-56 lg:h-[14rem] bg-background"
        />
        <div
          className={cn(
            "absolute -top-4 -left-4",
            "bg-primary text-primary-foreground",
            "rounded-full w-12 h-12",
            "flex items-center justify-center text-xl font-bold",
          )}
          aria-hidden="true"
        >
          {index + 1}
        </div>
      </div>
      <div className="text-center px-4 lg:px-0 w-full">
        <h3 className="text-xl font-bold mb-2">
          <span className="sr-only">{`Step ${index + 1}: `}</span>
          {feature.heading}
        </h3>
        <h4 className="text-lg text-muted-foreground font-medium mb-3">
          {feature.subheading}
        </h4>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {feature.body}
        </p>
      </div>
    </li>
  );
}

export function HowItWorksFeaturesFlow({
  features = defaultFeatures,
}: FeaturesFlowProps) {
  return (
    <section
      id={MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}
      className={cn(
        "w-full h-auto",
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
            Three steps from idea to typed data
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Define a schema, create a vault, and point your agents, apps, and
            workflows at it. No migrations to hand-write, no types to keep in
            sync.
          </p>
        </div>

        <ol
          className={cn(
            "flex flex-col lg:flex-row",
            "items-center lg:items-start justify-center",
            "gap-8 lg:gap-0",
            "list-none p-0 m-0",
          )}
        >
          {features.map((feature: Feature, index: number) => (
            <Fragment key={feature.id}>
              <FeatureFlowStep feature={feature} index={index} />
              {index < features.length - 1 && (
                <li
                  className={cn(
                    "flex items-center justify-center",
                    "lg:mx-6 lg:mt-24",
                  )}
                  aria-hidden="true"
                >
                  <ArrowDown className="h-8 w-8 text-primary lg:hidden" />
                  <ArrowRight className="hidden lg:block h-8 w-8 text-primary" />
                </li>
              )}
            </Fragment>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default HowItWorksFeaturesFlow;
