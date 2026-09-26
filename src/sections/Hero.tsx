"use client";

import JoinMailingListForm from "@/components/JoinMailingListForm";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { Badge, BackgroundBlur, Button, cn, Wordmark } from "@schemavaults/ui";
import { ArrowRight, BookOpenText, Check, ChevronDown } from "lucide-react";
import type { ReactElement } from "react";

const backgroundImageHref =
  "/media/marketing-landing-page/hero-background.webp";

const description: string =
  "Define each data type once, then re-use and compose it across your agents, workflows, websites, and apps — so nothing ever writes a shape your code did not expect.";

/**
 * Short, checkable proof points. Every entry must be something the product
 * actually does today — vague superlatives here cost more trust than they buy.
 */
const proofPoints: readonly string[] = [
  "Type-safe end to end",
  "MCP-ready for AI agents",
  "Cloud, self-hosted, or in-memory",
];

function HeroSectionBackgroundContent(): ReactElement {
  return (
    <div className="w-full h-full min-h-[100svh]">
      {/* Decorative: the alt text is intentionally empty so screen readers
          skip straight to the headline. */}
      <img
        className="object-cover w-full h-full"
        src={backgroundImageHref}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
}

function HeroSectionContent(): ReactElement {
  const privateBeta: boolean = usePrivateBeta();
  const registerHref: string = useRegisterPageHref();

  return (
    <div
      className={cn(
        "w-full min-h-[100svh]",
        "flex flex-col items-center justify-center",
        "gap-3 md:gap-5",
        // Clear the fixed 4rem header without clipping content on short screens.
        "pt-24 pb-16 md:pt-28 md:pb-20",
        "px-4 md:px-8 lg:px-16 xl:px-32",
      )}
    >
      {privateBeta && (
        <Badge variant="secondary" className="mb-1">
          Private beta — now taking waitlist signups
        </Badge>
      )}

      <h1
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl",
          "text-center text-balance",
          "font-bold max-w-[90vw] md:max-w-[80vw] lg:max-w-[65vw]",
        )}
      >
        Define your schema once. Trust your data everywhere.
      </h1>

      <h2 className="text-lg md:text-xl font-medium text-center tracking-tight text-muted-foreground">
        <Wordmark /> — type-safe data for AI agents, workflows, and apps.
      </h2>

      <p className="max-w-[75vw] md:max-w-[65vw] lg:max-w-[58vw] xl:max-w-[50vw] text-center text-pretty">
        {description}
      </p>

      {/*
        During the private beta the waitlist is the only conversion a visitor
        can actually complete, so it belongs above the fold rather than at the
        bottom of the page.
      */}
      {privateBeta ? (
        <div className="w-full max-w-md mt-2">
          <JoinMailingListForm
            submitLabel="Get early access"
            placeholder="you@company.com"
            reassurance="No spam — launch updates only. Unsubscribe in one click."
          />
        </div>
      ) : null}

      <div className="flex flex-col flex-nowrap sm:flex-wrap sm:flex-row gap-3 md:gap-4 items-center justify-center mt-2">
        <Button size="lg" variant="outline" asChild>
          <a
            href={`#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`}
            className="flex flex-row flex-nowrap gap-2 items-center justify-start"
          >
            <BookOpenText className="h-4 w-4" />
            See how it works
          </a>
        </Button>
        <Button size="lg" variant={privateBeta ? "outline" : "default"} asChild>
          <a
            href={registerHref}
            className="flex flex-row flex-nowrap gap-2 items-center justify-start"
          >
            {privateBeta ? "I have an invite code" : "Get started free"}
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </div>

      <ul
        className={cn(
          "flex flex-col sm:flex-row flex-wrap",
          "gap-x-6 gap-y-1 items-center justify-center",
          "mt-3 text-sm text-muted-foreground",
        )}
      >
        {proofPoints.map((point: string) => (
          <li
            key={point}
            className="flex flex-row flex-nowrap gap-1.5 items-center"
          >
            <Check className="h-4 w-4 text-green-500 shrink-0" />
            {point}
          </li>
        ))}
      </ul>

      {/* Scroll affordance: a full-height hero with no visible cue reads as
          the entire page to a first-time visitor. */}
      <a
        href={`#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`}
        aria-label="Scroll to see how SchemaVaults works"
        className={cn(
          "hidden md:flex mt-6",
          "text-muted-foreground hover:text-foreground transition-colors",
        )}
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </a>
    </div>
  );
}

export function HeroSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.HERO_SECTION}
      className="w-full min-h-[100svh] overflow-hidden"
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
