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
    icon: Database,
    title: "Schema-Enforced Vaults",
    description:
      "A vault is a database that only accepts data matching its schema — the shape you defined up front. More flexible than a relational DB, safer than a document store.",
  },
  {
    icon: BotMessageSquare,
    title: "Type-Safe Agent Memory",
    description:
      "Guarantee your AI agents produce output — and store memories — in exactly the shape you expected." +
      " " +
      "First-class Model Context Protocol (MCP) support out of the box.",
  },
  {
    icon: Workflow,
    title: "Workflows & Data Pipelines",
    description:
      "Every stage of your pipeline knows the shape of its input and output. Stop patching mystery objects three steps downstream.",
  },
  {
    icon: Recycle,
    title: "Write Schemas Once",
    description:
      "Reuse the same data types across your frontend, backend, and workflows. Nest schemas within schemas — no duplicated definitions to drift apart.",
  },
  {
    icon: AppWindowMac,
    title: "Low-Code or Code-First",
    description:
      "Use the visual schema editor, describe what you need in plain English, or drop into our TypeScript SDKs. Same result, your choice.",
  },
  {
    icon: Cloud,
    title: "Serverless or Self-Hosted",
    description:
      "Run on our managed cloud for zero ops, or self-host in your own cluster for full control over data residency and compute.",
  },
  {
    icon: Globe,
    title: "Global Edge Sync",
    description:
      "Replicate across storage regions so your users hit the closest copy — millisecond reads no matter where they are.",
  },

  {
    icon: Code,
    title: "Developer Friendly",
    description:
      "End-to-end type safety with TypeScript SDKs. Read and write schema-validated data without a compile-time surprise in production.",
  },
  {
    icon: Zap,
    title: "Lightning Fast Queries",
    description:
      "Complex graph traversals in milliseconds, powered by an optimizer built for schema-aware storage.",
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
            The graph database you can just talk to
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
            Everything you need to model, store, and query typed data at
            scale — without writing a line of code unless you want to.
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
