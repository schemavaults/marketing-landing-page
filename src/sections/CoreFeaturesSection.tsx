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
 * Ordered by how strongly each item motivates a visitor who has just read the
 * hero, not by how impressive it is to build. The first three cards are the
 * ones that get read; everything after that is reassurance for the visitor who
 * is already interested.
 */
const features = [
  {
    icon: Recycle,
    title: "Define once, reuse everywhere",
    description:
      "Write a schema one time and use the same data types in your frontend apps, backend " +
      "services, and workflows. Nest schemas inside other schemas instead of copying them.",
  },
  {
    icon: Database,
    title: "Vault graph storage",
    description:
      'A "vault" is a datastore enforced by a schema — a specification for the shape of data ' +
      "it will accept. More flexible than a traditional relational database when your records " +
      "are nested or reference each other.",
  },
  {
    icon: BotMessageSquare,
    title: "Type-safe agent output",
    description:
      "Your AI agents store memories and produce output in the shape you expected, or the " +
      "write is rejected. Agents reach their vaults over the Model Context Protocol (MCP).",
  },
  {
    icon: Workflow,
    title: "Workflows & data pipelines",
    description:
      "Stop guessing what shape your data is in at each stage of a pipeline. Every step reads " +
      "and writes against the same contract.",
  },
  {
    icon: AppWindowMac,
    title: "Low-code type safety",
    description:
      "Use the schema editor to define a schema — or just tell our assistant what you are " +
      "trying to store and refine what it drafts. TypeScript SDKs are there if you prefer code.",
  },
  {
    icon: Code,
    title: "Developer friendly",
    description:
      "End-to-end type safety: our TypeScript SDKs give you schema-validated reads and writes " +
      "with types you did not have to hand-maintain.",
  },
  {
    icon: Cloud,
    title: "Serverless or self-hosted",
    description:
      "Let us manage your data in the cloud, run a vault in-memory for local development, or " +
      "host it in your own datacenter or compute cluster.",
  },
  {
    icon: Globe,
    title: "Multi-region replication",
    description:
      "Replicate a vault across storage regions so reads land close to your users, wherever " +
      "they are.",
  },
  {
    icon: Zap,
    title: "Built for graph traversals",
    description:
      "Query engine designed around traversing relationships between records, rather than " +
      "bolting graph access onto a table scan.",
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
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            One definition, enforced everywhere it matters
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
            Your schema stops being a comment in a README and becomes the thing
            your storage, your SDKs and your agents all answer to. Built so you
            never have to write a line of code — unless you want to.
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
