"use client";

import usePrivateBeta from "@/hooks/usePrivateBeta";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { Badge, BackgroundBlur, Button, cn, Wordmark } from "@schemavaults/ui";
import {
  ArrowRight,
  BookOpenText,
  ChevronDown,
  Cloud,
  Code2,
  BotMessageSquare,
  PencilRuler,
} from "lucide-react";
import type { ReactElement } from "react";

const backgroundImageHref =
  "/media/marketing-landing-page/hero-background.webp";

/**
 * The single sentence a first-time visitor should be able to repeat back to a
 * colleague after five seconds on the page. Keep it outcome-first: what the
 * visitor gets, not what we built.
 */
const subheadline: string =
  "SchemaVaults is the schema registry and data vault that keeps your apps, workflows, and AI agents reading and writing the exact data shapes you designed — validated on the way in, typed on the way out.";

/**
 * Short, concrete capability proof points rendered directly under the primary
 * call-to-action. These answer "is this actually for me?" above the fold,
 * without making a visitor scroll to the features grid first.
 */
const capabilityHighlights: readonly {
  icon: typeof PencilRuler;
  label: string;
}[] = [
  { icon: PencilRuler, label: "Visual schema editor" },
  { icon: Code2, label: "End-to-end typed SDKs" },
  { icon: BotMessageSquare, label: "MCP-native for agents" },
  { icon: Cloud, label: "Serverless or self-hosted" },
];

function HeroSectionBackgroundContent(): ReactElement {
  return (
    <div className="w-full h-full">
      {/* Decorative only: the headline carries the meaning, so this image is
          intentionally hidden from assistive technology. */}
      <img
        className="object-cover w-full h-full"
        src={backgroundImageHref}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
      />
    </div>
  );
}

function HeroSectionContent(): ReactElement {
  const privateBeta: boolean = usePrivateBeta();
  const registerHref: string = useRegisterPageHref();

  const waitlistHref = `#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`;
  const howItWorksHref = `#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`;

  return (
    <div
      className={cn(
        "w-full h-full",
        "flex flex-col items-center justify-center",
        "gap-3 md:gap-4",
        // Offset the fixed 4rem header so centered content is never clipped.
        "pt-20 pb-10 md:pt-24 md:pb-12",
        "px-4 md:px-8 lg:px-16 xl:px-32",
      )}
    >
      <Badge variant="secondary" className="mb-1 gap-1.5">
        <Wordmark className="text-xs md:text-sm" />
        <span>{privateBeta ? "is in private beta" : "is live"}</span>
      </Badge>

      <h1
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl",
          "text-center text-balance",
          "font-bold max-w-[90vw] md:max-w-[75vw] lg:max-w-[60vw]",
        )}
      >
        Define your data once.
        <br className="hidden sm:inline" />{" "}
        <span className="whitespace-nowrap">Trust it everywhere.</span>
      </h1>

      <p
        className={cn(
          "max-w-[85vw] md:max-w-[70vw] lg:max-w-[58vw] xl:max-w-[52rem]",
          "text-center text-pretty",
          "text-base md:text-lg",
          "text-muted-foreground",
        )}
      >
        {subheadline}
      </p>

      {/* One unmistakable primary action. During the private beta the register
          page requires an invite code, so the waitlist — not registration — is
          the action almost every visitor can actually complete. */}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center mt-1">
        {privateBeta ? (
          <Button size="lg" asChild>
            <a
              href={waitlistHref}
              className="flex flex-row flex-nowrap gap-2 items-center justify-center"
            >
              Get early access
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        ) : (
          <Button size="lg" asChild>
            <a
              href={registerHref}
              className="flex flex-row flex-nowrap gap-2 items-center justify-center"
            >
              Start free
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        )}
        <Button size="lg" variant="outline" asChild>
          <a
            href={howItWorksHref}
            className="flex flex-row flex-nowrap gap-2 items-center justify-center"
          >
            <BookOpenText className="h-4 w-4" />
            See how it works
          </a>
        </Button>
      </div>

      <p className="text-xs md:text-sm text-muted-foreground text-center">
        {privateBeta
          ? "Free during the beta · No credit card · One email when your invite is ready"
          : "Free plan forever · No credit card required · Self-host or let us host it"}
      </p>

      {privateBeta && (
        <a
          href={registerHref}
          className="text-xs md:text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
        >
          Already have an invite code? Register here
        </a>
      )}

      <ul
        className={cn(
          "mt-3 md:mt-5",
          "flex flex-row flex-wrap items-center justify-center",
          "gap-x-4 gap-y-2 md:gap-x-6",
          "text-xs md:text-sm text-muted-foreground",
          "max-w-[90vw] lg:max-w-[64rem]",
        )}
      >
        {capabilityHighlights.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex flex-row flex-nowrap items-center gap-1.5"
          >
            <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{label}</span>
          </li>
        ))}
      </ul>

      {/* An explicit affordance that there is more below. Full-bleed heroes
          otherwise read as the entire page on laptop-sized viewports. */}
      <a
        href={howItWorksHref}
        aria-label="Scroll to see how SchemaVaults works"
        className={cn(
          "hidden md:flex",
          "mt-4 items-center justify-center",
          "h-9 w-9 rounded-full border border-border/60 bg-background/60",
          "text-muted-foreground hover:text-foreground transition-colors",
        )}
      >
        <ChevronDown className="h-5 w-5 animate-bounce" aria-hidden="true" />
      </a>
    </div>
  );
}

export function HeroSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.HERO_SECTION}
      aria-label="SchemaVaults introduction"
      // Deliberately shorter than the viewport: letting the next section peek
      // above the fold is one of the most reliable ways to get visitors to
      // keep scrolling instead of bouncing off a full-screen splash.
      className={cn(
        "w-full min-h-[40rem] h-auto",
        "lg:min-h-[88vh]",
        "overflow-hidden",
      )}
    >
      <BackgroundBlur
        background={HeroSectionBackgroundContent}
        foreground={HeroSectionContent}
        intensity="xs"
      />
    </section>
  );
}

export default HeroSection;
