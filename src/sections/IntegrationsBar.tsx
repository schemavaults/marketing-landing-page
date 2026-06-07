"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { cn } from "@schemavaults/ui";
import type { ReactElement } from "react";

const integrations: readonly string[] = [
  "TypeScript",
  "Zod",
  "Next.js",
  "Model Context Protocol",
  "OpenAI",
  "Anthropic",
  "React",
  "Node.js",
] as const;

export function IntegrationsBar(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.INTEGRATIONS_BAR_SECTION}
      className={cn(
        "w-full",
        "py-10 md:py-12",
        "border-y border-border/60",
        "bg-muted/30",
        "flex flex-col items-center justify-center gap-6",
      )}
    >
      <p className="text-xs md:text-sm uppercase tracking-widest text-muted-foreground font-medium">
        Works with the stack you already use
      </p>
      <ul
        className={cn(
          "flex flex-row flex-wrap items-center justify-center",
          "gap-x-6 md:gap-x-10 gap-y-3",
          "px-4 md:px-8",
          "max-w-5xl",
        )}
      >
        {integrations.map((name) => (
          <li
            key={name}
            className={cn(
              "text-sm md:text-base font-semibold tracking-tight",
              "text-foreground/70 hover:text-foreground transition-colors",
            )}
          >
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default IntegrationsBar;
