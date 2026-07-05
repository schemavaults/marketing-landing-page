import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { cn } from "@schemavaults/ui";
import {
  Boxes,
  Braces,
  Bot,
  Sparkles,
  ServerCog,
  ShieldCheck,
} from "lucide-react";
import type { ReactElement } from "react";

interface EcosystemChip {
  icon: typeof Boxes;
  label: string;
}

const ecosystem: readonly EcosystemChip[] = [
  { icon: Braces, label: "TypeScript & Zod" },
  { icon: Bot, label: "Model Context Protocol" },
  { icon: Sparkles, label: "Any LLM provider" },
  { icon: ServerCog, label: "REST + Streaming APIs" },
  { icon: Boxes, label: "Graph & Vector search" },
  { icon: ShieldCheck, label: "Self-host or cloud" },
] as const;

export function TrustBar(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.TRUST_BAR_SECTION}
      className={cn(
        "w-screen py-10 md:py-12",
        "border-y border-border/60",
        "bg-background/60",
        "flex justify-center items-center",
      )}
    >
      <div className="container px-4 md:px-6">
        <p
          className={cn(
            "text-center text-xs md:text-sm uppercase tracking-[0.18em]",
            "text-muted-foreground mb-6",
          )}
        >
          Speaks the same language as your stack
        </p>
        <ul
          className={cn(
            "flex flex-wrap items-center justify-center",
            "gap-3 md:gap-4",
          )}
        >
          {ecosystem.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className={cn(
                "flex items-center gap-2",
                "rounded-full border border-border/60 bg-muted/40",
                "px-3.5 py-1.5",
                "text-xs md:text-sm font-medium text-foreground/80",
                "hover:text-foreground hover:border-border transition-colors",
              )}
            >
              <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default TrustBar;
