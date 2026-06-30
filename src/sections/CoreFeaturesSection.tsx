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
      "Vaults are databases governed by a schema — a contract for the exact shape of every record. More flexible than relational, safer than schemaless.",
  },
  {
    icon: BotMessageSquare,
    title: "Type-Safe Agent Memory",
    description:
      "Your AI agents store memories and produce outputs in the shape you actually expect. Persist thoughts and artifacts through Model Context Protocol (MCP) — no more JSON-parsing roulette.",
  },
  {
    icon: Workflow,
    title: "Workflows & Data Pipelines",
    description:
      "Move data between steps with guaranteed types at every hop. No more silent drift, no more 3 a.m. 'undefined is not a function'.",
  },
  {
    icon: Recycle,
    title: "Stop Repeating Yourself",
    description:
      "Write schemas once and share them across your frontend apps, backend services, and workflows. Compose and nest schemas like Lego bricks.",
  },
  {
    icon: AppWindowMac,
    title: "Low-Code Type Safety",
    description:
      "Sketch a schema in our visual editor, describe it to our AI, or hand-roll it with our TypeScript SDK. Whichever you reach for, the result is fully typed.",
  },
  {
    icon: Cloud,
    title: "Serverless or Self-Hosted",
    description:
      "Run on our managed cloud, embed in-memory for tests, or self-host in your own compute cluster. Same SDK, same schemas, your choice of where the data lives.",
  },
  {
    icon: Globe,
    title: "Global CDN Sync",
    description:
      "Replicate vaults across regions so your data lands fast for every user — no matter where they are.",
  },
  {
    icon: Code,
    title: "Developer Friendly",
    description:
      "End-to-end type safety in our TypeScript SDKs — autocomplete from your IDE all the way through to the database.",
  },
  {
    icon: Zap,
    title: "Lightning Fast Queries",
    description:
      "Traverse complex graphs in milliseconds. Our query optimizer plans across vaults so deep joins stay snappy.",
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
            Built for the messy, evolving data behind modern AI apps. Powerful enough for production graph workloads — and you never have to write a line of code unless you want to.
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
