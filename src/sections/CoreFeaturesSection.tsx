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
    title: "Vault Graph Storage",
    description:
      "Vaults are databases governed by a schema — a strict specification for the shape of data they accept. More flexible than a relational database, more reliable than a document store.",
  },
  {
    icon: BotMessageSquare,
    title: "Type-Safe Agent Memory",
    description:
      "Stop hoping your AI agents produce well-formed output. Vaults validate every memory, thought, and artifact at write time, and expose them to agents over Model Context Protocol (MCP).",
  },
  {
    icon: Workflow,
    title: "Workflows & Data Pipelines",
    description:
      "Know the exact shape of your data at every stage of every workflow — no more runtime surprises in production.",
  },
  {
    icon: Recycle,
    title: "Write Schemas Once",
    description:
      "Define a schema one time and reuse it everywhere — frontend, backend, workflows, AI agents. Compose and nest schemas without duplicating types.",
  },
  {
    icon: AppWindowMac,
    title: "Low-Code Schema Editor",
    description:
      "Design schemas visually, describe them to our AI, or import them from your TypeScript SDK. Whichever way fits your team.",
  },
  {
    icon: Cloud,
    title: "Serverless or Self-Hosted",
    description:
      "Run on our managed cloud for zero-ops scaling, or self-host in your own datacenter for full control over data residency and compliance.",
  },
  {
    icon: Globe,
    title: "Global Edge Sync",
    description:
      "Replicate your data to storage regions close to your users, so reads stay fast no matter where in the world they sign in.",
  },
  {
    icon: Code,
    title: "End-to-End Type Safety",
    description:
      "First-class TypeScript SDKs generate types from your schemas, so your IDE catches the bug before your tests do.",
  },
  {
    icon: Zap,
    title: "Fast Graph Queries",
    description:
      "Traverse deeply nested relationships in a single query without N+1 round trips — even across millions of nodes.",
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
            The graph database that you can just talk to
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
            Powerful features designed to handle the most complex graph
            workloads at any scale. Built so you never have to write a line of
            code (unless you want to!).
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
