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
      "Store data in graph vaults where every write is validated against a schema you control — more flexible than SQL, safer than plain document stores.",
  },
  {
    icon: BotMessageSquare,
    title: "Type-Safe Agent Memory",
    description:
      "Give AI agents structured memory over MCP. Every thought, artifact, and tool result gets stored with the exact shape you designed.",
  },
  {
    icon: Workflow,
    title: "Reliable Workflows",
    description:
      "Never debug \"what shape is this?\" again. Vault-backed workflows carry typed context between every step, service, and retry.",
  },
  {
    icon: Recycle,
    title: "One Schema, Every Surface",
    description:
      "Compose and nest schemas once, then reuse the same types across your frontend, backend, workflows, and agents. Zero drift.",
  },
  {
    icon: AppWindowMac,
    title: "Visual & Agentic Editor",
    description:
      "Design schemas with the visual editor, describe them to our AI, or write them in code with the TypeScript SDK. All three stay in sync.",
  },
  {
    icon: Cloud,
    title: "Cloud or Self-Hosted",
    description:
      "Ship on our managed cloud, run in-memory for lightning-fast local workflows, or deploy inside your own VPC. Same SDK either way.",
  },
  {
    icon: Globe,
    title: "Global Multi-Region Sync",
    description:
      "Replicate vaults across regions so users get data from the closest edge — with strong consistency guarantees you can reason about.",
  },
  {
    icon: Code,
    title: "End-to-End TypeScript",
    description:
      "Auto-generated types flow from schema to SDK to UI. Rename a field once and let the compiler find every caller for you.",
  },
  {
    icon: Zap,
    title: "Millisecond Graph Queries",
    description:
      "Traverse deeply nested relationships in milliseconds with a query planner tuned for schema-aware workloads.",
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
          <p className="mx-auto max-w-[720px] text-muted-foreground text-lg">
            A schema-first data layer purpose-built for AI agents, modern
            workflows, and product teams — designed so non-engineers can ship
            without giving up type safety.
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
