"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import { cn } from "@schemavaults/ui";
import { KeyRound, PackageOpen, ServerCog } from "lucide-react";
import type { ComponentType, ReactElement } from "react";

interface TrustPillar {
  id: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
  body: string;
}

/**
 * Objection handling, not feature listing. Every item here answers a reason a
 * technical evaluator would *not* adopt a hosted data platform. Each claim is
 * drawn from capabilities the product already advertises elsewhere on this
 * page — keep it that way, and keep anything unverifiable out.
 */
const pillars: readonly TrustPillar[] = [
  {
    id: "ownership",
    icon: ServerCog,
    title: "Run it where your data has to live",
    body:
      "Use our cloud when you want it managed, run a vault in-memory for local development," +
      " " +
      "or deploy into your own datacenter when policy says the data cannot leave it. Same schemas either way.",
  },
  {
    id: "portability",
    icon: PackageOpen,
    title: "Your schemas are not a lock-in",
    body:
      "Schemas are plain, composable definitions you author and export — not a proprietary format you rent." +
      " " +
      "Nest them, re-use them across projects, and take them with you.",
  },
  {
    id: "access",
    icon: KeyRound,
    title: "Validation at the boundary",
    body:
      "Every write is checked against its schema before it is stored, so malformed agent output and drifting" +
      " " +
      "client payloads fail loudly at the edge instead of quietly corrupting your data.",
  },
];

export function TrustSection(): ReactElement {
  const emails = useOrgEmailAddresses();

  return (
    <section
      id={MarketingLandingPageSectionIds.TRUST_SECTION}
      className={cn(
        "w-full py-20",
        "scroll-mt-16",
        "border-y bg-background",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-balance">
            Built for the parts your security review asks about
          </h2>
          <p className="mx-auto max-w-[650px] text-muted-foreground text-lg text-pretty">
            Where your data lives, who can change its shape, and whether you
            can leave.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {pillars.map((pillar: TrustPillar) => (
            <div key={pillar.id} className="flex flex-col gap-3">
              <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <pillar.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{pillar.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12">
          Need a security review, a DPA, or a self-hosted deployment?{" "}
          <a
            href={`mailto:${emails.salesEmail}`}
            className="text-primary hover:underline"
          >
            Talk to our team
          </a>
          .
        </p>
      </div>
    </section>
  );
}

export default TrustSection;
