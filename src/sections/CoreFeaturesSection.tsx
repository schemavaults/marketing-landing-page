import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
} from "@schemavaults/ui";
import {
  Database,
  Zap,
  Shield,
  Globe,
  Code,
  BarChart3,
  Cloud,
  BotMessageSquare,
  Workflow,
  AppWindowMac,
  Recycle,
} from "lucide-react";
import { ReactElement } from "react";

const features = [
  {
    icon: BotMessageSquare,
    title: "Type-Safe Agent Thoughts",
    description:
      "Ensure your AI agents store memories and produce output in the shape you expected. " +
      "Persist thoughts and artifacts in your vaults over Model Context Protocol (MCP).",
  },
  {
    icon: Recycle,
    title: "Stop Repeating Yourself",
    description:
      "Write schemas once and share the exact same data types across frontends, backends, " +
      "and workflows. Compose schemas inside other schemas.",
  },
  {
    icon: Database,
    title: "Vault Graph Storage",
    description:
      "Vaults are schema-enforced graph databases — far more flexible than traditional relational tables, " +
      "with first-class support for relationships between entities.",
  },
  {
    icon: Workflow,
    title: "Workflows & Data Pipelines",
    description:
      "Stop guessing what shape your data is in at each stage of your workflows. " +
      "Every node knows its inputs and outputs.",
  },
  {
    icon: AppWindowMac,
    title: "Low-Code Type Safety",
    description:
      "Define a schema in our rich visual editor — or just tell our AI what you're trying to store. " +
      "Reach for our TypeScript SDKs whenever you want full control.",
  },
  {
    icon: Cloud,
    title: "Serverless or Self-Hosted",
    description:
      "Run on our managed cloud, in-memory for lightning-fast local access, or in your own datacenter. " +
      "Bring your own compute and models on Enterprise.",
  },
  {
    icon: Code,
    title: "Developer Friendly",
    description:
      "End-to-end type safety from schema to client. Our TypeScript SDKs make consuming and writing " +
      "validated data feel native.",
  },
  {
    icon: Globe,
    title: "Global CDN Sync",
    description:
      "Replicate data across regions so it reaches your users fast — wherever they are.",
  },
  {
    icon: Zap,
    title: "Lightning Fast Queries",
    description:
      "Complex graph traversals in milliseconds, powered by our query optimization engine.",
  },
];

export function CoreFeaturesSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.FEATURES_SECTION}
      className={cn(
        "py-24 bg-muted/50",
        "w-screen",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            The graph database you can just talk to.
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
            Storage, validation, and developer ergonomics built for AI-native
            workflows. Use the visual editor — or our TypeScript SDKs. Never
            write a line of code unless you want to.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CoreFeaturesSection;
