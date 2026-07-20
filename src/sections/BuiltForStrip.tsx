"use client";

import { cn } from "@schemavaults/ui";
import {
  Bot,
  Boxes,
  Layers,
  Layout,
  Workflow as WorkflowIcon,
} from "lucide-react";
import type { ReactElement } from "react";

interface UseCase {
  icon: typeof Bot;
  label: string;
}

const useCases: readonly UseCase[] = [
  { icon: Bot, label: "AI agents & MCP servers" },
  { icon: WorkflowIcon, label: "Data pipelines" },
  { icon: Layout, label: "CMS-backed sites" },
  { icon: Boxes, label: "Internal tools" },
  { icon: Layers, label: "Mobile & web apps" },
];

export function BuiltForStrip(): ReactElement {
  return (
    <section
      className={cn(
        "w-screen",
        "border-y bg-background/40",
        "py-6 md:py-8",
        "flex flex-col items-center justify-center gap-4",
      )}
      aria-label="Built for"
    >
      <p className="text-xs md:text-sm uppercase tracking-widest text-muted-foreground text-center px-4">
        Purpose-built for the teams shipping
      </p>
      <div
        className={cn(
          "container px-4 md:px-6",
          "flex flex-row flex-wrap items-center justify-center",
          "gap-x-6 gap-y-3 md:gap-x-10",
        )}
      >
        {useCases.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 text-sm md:text-base text-muted-foreground"
          >
            <Icon className="h-4 w-4 md:h-5 md:w-5 text-primary/80" />
            <span className="font-medium">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BuiltForStrip;
