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

/**
 * Ordered most-differentiating first. Visitors skim the first row and the last
 * line of a grid, so the claims that only SchemaVaults can make lead, and the
 * table-stakes infrastructure claims follow.
 */
const features = [
  {
    icon: Recycle,
    title: "Write a schema once, reuse it everywhere",
    description:
      "Use the same data types in your frontend apps, backend services, and workflows." +
      " " +
      "Compose and nest schemas inside other schemas instead of redefining them per project.",
  },
  {
    icon: BotMessageSquare,
    title: "Agents that can't invent their own data shapes",
    description:
      "Your AI agents store memories and produce output in the shape you expected, because the vault validates on write." +
      " " +
      "Read and write thoughts and artifacts over Model Context Protocol (MCP).",
  },
  {
    icon: Database,
    title: "Vault graph storage",
    description:
      'Vaults are databases governed by a schema — a specification for the shape of data allowed inside them.' +
      " " +
      "More flexible than a traditional relational database, and stricter than a document store.",
  },
  {
    icon: Workflow,
    title: "Workflows and data pipelines you can reason about",
    description:
      "Stop guessing what shape your data is in at each stage of a pipeline." +
      " " +
      "Every hand-off is checked against the schema it claims to satisfy.",
  },
  {
    icon: AppWindowMac,
    title: "Define schemas visually or in code",
    description:
      "Use the rich schema editor to build a schema, describe what you are trying to store to our AI, or write it with our TypeScript SDKs." +
      " " +
      "The three stay in sync.",
  },
  {
    icon: Code,
    title: "End-to-end type safety",
    description:
      "Our TypeScript SDKs give you inferred types for everything you read and write, so a schema change surfaces in your editor rather than in production.",
  },
  {
    icon: Cloud,
    title: "Serverless or self-hosted",
    description:
      "Let us manage your data in our cloud, or run vaults locally, in-memory, or in your own compute cluster." +
      " " +
      "Your data never has to leave your infrastructure.",
  },
  {
    icon: Globe,
    title: "Multi-region replication",
    description:
      "Sync vault data across storage regions so reads are served close to your users, wherever they are.",
  },
  {
    icon: Zap,
    title: "Built for graph traversals",
    description:
      "Follow relationships between records without hand-writing joins, with query planning tuned for connected data.",
  },
];

export function CoreFeaturesSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.FEATURES_SECTION}
      className={cn(
        "py-24 bg-muted/50",
        "w-full",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance">
            One source of truth for the shape of your data
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg text-pretty">
            Everything you need to define, validate, store, and query
            structured data — whether you reach for the visual editor, the
            chatbot, or the TypeScript SDK.
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
                  <feature.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
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
