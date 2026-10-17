"use client";

import SECTION_SCROLL_MARGIN_CLASSNAME from "@/lib/sectionScrollMargin";
import { Card, CardContent, cn } from "@schemavaults/ui";
import { BotMessageSquare, Network, ServerCog, ShieldCheck } from "lucide-react";
import type { ComponentType, ReactElement } from "react";

export interface Testimonial {
  id: string;
  /** The quote itself, without surrounding quotation marks. */
  quote: string;
  /** Who said it. */
  author: string;
  /** Their role and company, e.g. "Staff Engineer, Acme". */
  attribution?: string;
}

export interface TrustStripSectionProps {
  /**
   * Real, attributable customer or design-partner quotes.
   *
   * This is deliberately empty by default: invented testimonials are worse
   * than none at all. Two or three genuine quotes from private-beta design
   * partners -- with a name, a role, and a company -- are the single highest
   * leverage addition left on this page, so pass them in here as soon as they
   * exist.
   */
  testimonials?: readonly Testimonial[];
}

interface TrustPoint {
  icon: ComponentType<{ className?: string }>;
  label: string;
  detail: string;
}

/**
 * Pre-launch, we have no logo wall to show. What we do have are concrete,
 * checkable facts about how the product works -- which is what a technical
 * evaluator is actually looking for this high up the page.
 */
const trustPoints: readonly TrustPoint[] = [
  {
    icon: ShieldCheck,
    label: "Validated on write",
    detail: "Malformed records are rejected before they reach storage.",
  },
  {
    icon: Network,
    label: "Graph-native",
    detail: "Nest and link schemas without designing a migration first.",
  },
  {
    icon: BotMessageSquare,
    label: "Built for agents",
    detail: "Your schemas become MCP tools your agents can't misuse.",
  },
  {
    icon: ServerCog,
    label: "Your infrastructure, optionally",
    detail: "Managed cloud, in-memory for local dev, or self-hosted.",
  },
];

export function TrustStripSection({
  testimonials = [],
}: TrustStripSectionProps = {}): ReactElement {
  return (
    <section
      className={cn(
        "w-full border-y bg-background",
        "py-10 md:py-12",
        "flex justify-center items-start",
        SECTION_SCROLL_MARGIN_CLASSNAME,
      )}
    >
      <div className="container px-4 md:px-6 space-y-10">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((point: TrustPoint) => (
            <li key={point.label} className="flex flex-row items-start gap-3">
              <point.icon className="h-5 w-5 shrink-0 mt-0.5 text-primary" />
              <div>
                <p className="font-semibold text-sm">{point.label}</p>
                <p className="text-sm text-muted-foreground">{point.detail}</p>
              </div>
            </li>
          ))}
        </ul>

        {testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial: Testimonial) => (
              <Card key={testimonial.id} className="h-full">
                <CardContent className="pt-6 space-y-4">
                  <blockquote className="text-base leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <footer className="text-sm">
                    <span className="font-semibold">{testimonial.author}</span>
                    {testimonial.attribution && (
                      <span className="text-muted-foreground">
                        {" "}
                        &middot; {testimonial.attribution}
                      </span>
                    )}
                  </footer>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default TrustStripSection;
