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

import { cn } from "@schemavaults/ui";
import { ArrowRight, ArrowDown } from "lucide-react";

const defaultFeatures: Feature[] = [
  {
    id: "1",
    heading: "Define Data Type",
    subheading: "Structure Your Information",
    body: "Start by defining your data schema and types. Our intuitive interface allows you to create custom data structures that fit your specific needs, ensuring consistency and reliability across your entire system.",
    image: "https://placehold.co/300x400",
  },
  {
    id: "2",
    heading: "Create Your Vault",
    subheading: "Secure Storage Solutions",
    body: "Deploy your data vault anywhere - in the cloud for scalability, on your device for privacy, or in-memory for lightning-fast access. Choose the storage solution that best fits your security and performance requirements.",
    image: "https://placehold.co/300x400",
  },
  {
    id: "3",
    heading: "Deploy Smart Agents",
    subheading: "Intelligent Automation",
    body: "Create powerful agents that interact with your data and respond to real-time events. These intelligent systems can process information, trigger actions, and provide insights automatically, streamlining your workflow.",
    image: "https://placehold.co/300x400",
  },
];

export function HowItWorksFeaturesFlow({
  features = defaultFeatures,
}: FeaturesFlowProps) {
  return (
    <section
      id="how-it-works-features-flow"
      className={cn(
        "w-screen h-auto",
        "py-12 md:py-24 lg:py-32",
        "bg-gradient-to-b from-gray-50 to-white",
        "flex flex-col justify-start items-center",
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get started in three simple steps and transform how you manage and
            interact with your data
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-center gap-8">
          {features.map((feature, index) => (
            <div key={feature.id} className="flex items-center">
              <div className="flex flex-col items-center max-w-sm">
                <div className="relative mb-6">
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.heading}
                    className="rounded-lg shadow-lg w-80 h-60 object-cover"
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
                    src={feature.image || "/placeholder.svg"}
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
