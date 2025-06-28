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
      '"Vaults" are graph databases enforced by a "schema" (a specification for the "shape" of data allowed). More flexible than a traditional relational database.',
  },
  {
    icon: BotMessageSquare,
    title: "Type-Safe Agent Thoughts",
    description:
      "Ensure your AI agents store memories and produce output in the shape that you expected. Store thoughts and artifacts in your vaults with Model Context Protocol (MCP).",
  },
  {
    icon: Workflow,
    title: "Workflows & Data Pipelines",
    description:
      "Stop guessing what shape your data is in at each stage of your workflows.",
  },
  {
    icon: Recycle,
    title: "Stop repeating yourself",
    description:
      "Write schemas once and use the same data-types in your frontend apps, backend apps, and workflows. Nest schemas within other schemas.",
  },
  {
    icon: AppWindowMac,
    title: "Low-Code Type Safety",
    description:
      "Use our rich schema editor to define a schema-- or just tell our AI what you're trying to store. (Or use our TypeScript SDKs, if you prefer)",
  },
  {
    icon: Cloud,
    title: "Serverless or Self-Hosted",
    description:
      "Let us manage your data in the cloud; alternatively, host your data locally or in your own compute cluster.",
  },
  {
    icon: Globe,
    title: "Global CDN Sync",
    description:
      "Sync data across multiple storage regions for getting data to your users fast-- regardless of where they are.",
  },

  {
    icon: Code,
    title: "Developer Friendly",
    description:
      "Built with end-to-end type safety-- use our TypeScript SDKs to easily consume & write schema-validated data.",
  },
  {
    icon: Zap,
    title: "Lightning Fast Queries",
    description:
      "Execute complex graph traversals in milliseconds with our advanced query optimization engine.",
  },
];

export function CoreFeaturesSection(): ReactElement {
  return (
    <section
      id="features"
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
