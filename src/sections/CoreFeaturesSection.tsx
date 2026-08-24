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
    title: "Vault graph storage",
    description:
      "Vaults are schema-enforced databases that model your data as a graph — more expressive than a relational schema and safer than a document store.",
  },
  {
    icon: BotMessageSquare,
    title: "Type-safe agent memory",
    description:
      "Your AI agents read and write memory in the exact shape you expected — stream thoughts and artifacts into your vaults over Model Context Protocol (MCP).",
  },
  {
    icon: Workflow,
    title: "Workflows & data pipelines",
    description:
      "Stop guessing what shape your data is in at each stage. Every step validates against the same schema you defined once.",
  },
  {
    icon: Recycle,
    title: "One schema, everywhere",
    description:
      "Write it once and reuse it across your frontend, backend, workflows, and agents. Nest and compose schemas so change lands in a single place.",
  },
  {
    icon: AppWindowMac,
    title: "Low-code type safety",
    description:
      "Model your data in our rich visual editor, describe it in plain English to our AI, or drop into the TypeScript SDK — whichever fits the moment.",
  },
  {
    icon: Cloud,
    title: "Serverless or self-hosted",
    description:
      "Run on our managed cloud when you want zero ops, or bring your own compute for data residency and compliance.",
  },
  {
    icon: Globe,
    title: "Global edge sync",
    description:
      "Replicate your vaults across regions so every user hits your data at edge latency — no matter where they are.",
  },
  {
    icon: Code,
    title: "Developer-friendly",
    description:
      "End-to-end TypeScript type safety. First-class SDKs and MCP support so your editor autocompletes the shape your vault actually stores.",
  },
  {
    icon: Zap,
    title: "Lightning-fast queries",
    description:
      "Traverse complex graphs in milliseconds. Our query planner optimizes across schemas so joins stay cheap as your data grows.",
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
            Built for the AI-native stack — with the ergonomics of a modern
            document store, the guarantees of a typed schema, and the traversal
            power of a graph database. Write code only when you want to.
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
