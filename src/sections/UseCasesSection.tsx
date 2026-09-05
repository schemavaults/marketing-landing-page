"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
} from "@schemavaults/ui";
import { AppWindowMac, BotMessageSquare, Check, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactElement } from "react";

interface UseCase {
  id: string;
  icon: LucideIcon;
  audience: string;
  headline: string;
  description: string;
  outcomes: readonly string[];
}

/**
 * Visitors self-identify before they evaluate features. This section lets each
 * audience recognise their own problem before they reach the feature grid.
 */
const useCases: readonly UseCase[] = [
  {
    id: "ai-agents",
    icon: BotMessageSquare,
    audience: "For AI engineers",
    headline: "Agents that remember in a known shape",
    description:
      "Agent output is only as useful as it is predictable. Give your agents a schema to write against and a vault to write into, over Model Context Protocol.",
    outcomes: [
      "Validate agent output before it reaches your systems",
      "Persist thoughts and artifacts between runs",
      "Connect over MCP without bespoke glue code",
    ],
  },
  {
    id: "workflows",
    icon: Workflow,
    audience: "For data & platform teams",
    headline: "Pipelines that stop guessing",
    description:
      "Every stage of a pipeline makes assumptions about the shape of its input. Make those assumptions explicit once, and enforce them everywhere the data travels.",
    outcomes: [
      "Catch malformed records at the boundary, not in production",
      "Trigger workflows from real-time vault events",
      "Share one definition across every job and service",
    ],
  },
  {
    id: "apps",
    icon: AppWindowMac,
    audience: "For product teams",
    headline: "One schema, every surface",
    description:
      "Use SchemaVaults as a typed content backend for a website or mobile app — or as a full content management system your non-engineers can actually edit.",
    outcomes: [
      "End-to-end types from the vault to your frontend",
      "Edit content in a rich schema-aware editor",
      "Nest and compose schemas instead of duplicating them",
    ],
  },
];

export function UseCasesSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.USE_CASES_SECTION}
      className={cn("py-24", "w-full", "flex justify-center items-start")}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Built for the way you already work
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
            Whatever writes and reads your data — an agent, a pipeline, or a
            product — it works against the same schemas.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase: UseCase) => (
            <Card key={useCase.id} className="flex flex-col shadow-lg border-0">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4">
                  <useCase.icon className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm font-medium text-primary">
                  {useCase.audience}
                </p>
                <CardTitle className="text-xl">{useCase.headline}</CardTitle>
                <CardDescription className="text-base">
                  {useCase.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {useCase.outcomes.map((outcome: string) => (
                    <li
                      key={outcome}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UseCasesSection;
