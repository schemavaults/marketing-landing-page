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
  Shield,
  Globe,
  Code,
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
    title: "Schema-enforced Vaults",
    description:
      "A Vault is a database that only accepts data conforming to the schema you define. Graph-shaped, not row-shaped — model relationships the way they actually exist.",
  },
  {
    icon: BotMessageSquare,
    title: "Type-safe agent memory",
    description:
      "Your AI agents read & write through a typed Model Context Protocol (MCP) interface. No more re-parsing string blobs or hoping the model returned the right JSON.",
  },
  {
    icon: Workflow,
    title: "Workflows that can't drift",
    description:
      "Every stage of every pipeline validates against its schema. Bad data is rejected at the boundary, not three steps later in production.",
  },
  {
    icon: Recycle,
    title: "Write schemas once",
    description:
      "Share the same nested, composable schemas across your frontend, backend, agents, and pipelines. One source of truth — no drift between layers.",
  },
  {
    icon: AppWindowMac,
    title: "Visual editor or SDK",
    description:
      "Define schemas in a visual editor, describe them to our AI in plain English, or write them directly with our TypeScript SDK. Use whichever fits the task.",
  },
  {
    icon: Cloud,
    title: "Serverless or self-hosted",
    description:
      "Run on our managed cloud, in-memory for local dev, or fully self-hosted in your own compute. Same SDK, same schemas, your choice of deployment.",
  },
  {
    icon: Globe,
    title: "Global edge sync",
    description:
      "Replicate data across regions so users read from the closest vault. Strong consistency where you need it, eventual where you don't.",
  },
  {
    icon: Code,
    title: "End-to-end TypeScript",
    description:
      "Generated types flow from schema to SDK to UI. Rename a field once — your compiler tells you everywhere it broke.",
  },
  {
    icon: Shield,
    title: "Built for production",
    description:
      "Fine-grained access controls, audit logs, and encryption at rest. Bring your own auth provider or use ours.",
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
            Built for teams shipping AI agents, data pipelines, and apps that
            can&apos;t afford to guess what their data looks like. Code optional.
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
