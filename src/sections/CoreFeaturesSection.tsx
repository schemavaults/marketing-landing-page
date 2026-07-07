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
  Globe,
  Cloud,
  BotMessageSquare,
  Recycle,
} from "lucide-react";
import { ReactElement } from "react";

const features = [
  {
    icon: BotMessageSquare,
    title: "Type-safe agent memory",
    description:
      "Agents store thoughts, memories, and artifacts in the exact shape you expect — over Model Context Protocol (MCP) — so no more brittle prompt-parsing.",
  },
  {
    icon: Recycle,
    title: "Write schemas once, use everywhere",
    description:
      "Share the same nestable, versioned schemas across your frontend, backend, and workflows. One source of truth for every data-type in your stack.",
  },
  {
    icon: Database,
    title: "Schema-enforced graph vaults",
    description:
      "Vaults are databases guarded by your schemas — more flexible than a relational DB, safer than a document store, and queryable as a graph.",
  },
  {
    icon: Zap,
    title: "Lightning-fast graph queries",
    description:
      "Traverse complex relationships in milliseconds with a query engine tuned for schema-aware graph workloads.",
  },
  {
    icon: Cloud,
    title: "Cloud, in-memory, or self-hosted",
    description:
      "Run in our managed cloud for zero-ops scale, in-memory for local speed, or in your own datacenter for full control.",
  },
  {
    icon: Globe,
    title: "Global multi-region sync",
    description:
      "Replicate vaults across regions so your users, agents, and apps read from the closest edge — wherever they are.",
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
            One typed data layer for your agents, workflows, and apps — with a
            visual schema editor, an agentic chat, and TypeScript SDKs when you
            want them.
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
