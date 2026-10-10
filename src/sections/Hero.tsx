"use client";

import usePrivateBeta from "@/hooks/usePrivateBeta";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { Badge, BackgroundBlur, Button, cn } from "@schemavaults/ui";
import { ArrowRight, BookOpenText, ChevronDown, Mail } from "lucide-react";
import type { ReactElement } from "react";

const backgroundImageHref =
  "/media/marketing-landing-page/hero-background.webp";

/**
 * Sub-headline. Kept short on purpose: the hero has roughly five seconds to
 * explain what the product does before a visitor scrolls or leaves, so the
 * detail lives in "How It Works" rather than here.
 */
const description: string =
  "Define your data types once as schemas, then re-use and compose them to validate and store data across your agents, workflows, apps, and content.";

/**
 * Proof points that are true of the product today. These are deliberately
 * capability claims rather than invented metrics or customer logos -- swap in
 * real social proof (user counts, logos, testimonials) as soon as it exists,
 * since that out-converts anything on this list.
 */
const trustSignals: readonly string[] = [
  "End-to-end TypeScript types",
  "Model Context Protocol ready",
  "Serverless or self-hosted",
  "Free forever plan",
];

function HeroSectionBackgroundContent(): ReactElement {
  return (
    <div className="w-full h-full">
      {/*
        Decorative only: the alt text is intentionally empty and the image is
        hidden from assistive tech so screen readers go straight to the
        headline. `fetchPriority` keeps it from competing with the LCP text.
      */}
      <img
        className="object-cover w-full h-full"
        src={backgroundImageHref}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1311}
        fetchPriority="low"
        decoding="async"
      />
    </div>
  );
}

function HeroSectionContent(): ReactElement {
  const privateBeta: boolean = usePrivateBeta();
  const registerHref: string = useRegisterPageHref();

  /**
   * One primary action only. During the private beta the waitlist is the real
   * conversion event (registration needs an invite code), so it takes the
   * primary button and registration drops to a quieter link.
   */
  const primaryCta: ReactElement = privateBeta ? (
    <Button size="lg" asChild>
      <a
        href={`#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`}
        className="flex flex-row flex-nowrap gap-2 items-center justify-center"
      >
        <Mail className="h-4 w-4" />
        Get early access
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
  );

  return (
    <div
      className={cn(
        "w-full min-h-[100svh]",
        "flex flex-col items-center justify-center",
        "gap-3 md:gap-5",
        "px-4 md:px-8 lg:px-16 xl:px-32",
        "py-24",
      )}
    >
      <Badge variant="secondary" className="mb-1">
        {privateBeta
          ? "Private beta — invites rolling out now"
          : "Now available — start on the free forever plan"}
      </Badge>

      <h1
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl",
          "text-center text-balance",
          "font-bold max-w-[90vw] md:max-w-[80vw] lg:max-w-[64rem]",
          "tracking-tight",
        )}
      >
        Type-safe data for AI agents, workflows, and apps
      </h1>

      <p className="max-w-[75vw] md:max-w-[65vw] lg:max-w-[48rem] text-center text-base md:text-lg text-muted-foreground text-pretty">
        {description}
      </p>

      <div className="flex flex-col flex-nowrap sm:flex-wrap sm:flex-row gap-3 md:gap-4 items-center justify-center mt-2 w-full sm:w-auto">
        {primaryCta}
        <Button size="lg" variant="outline" asChild>
          <a
            href={`#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`}
            className="flex flex-row flex-nowrap gap-2 items-center justify-center"
          >
            <BookOpenText className="h-4 w-4" />
            See how it works
          </a>
        </Button>
      </div>

      {/* Risk-reducing microcopy directly under the primary action. */}
      <p className="text-xs md:text-sm text-muted-foreground text-center">
        {privateBeta ? (
          <>One email when your invite is ready. No spam, unsubscribe anytime.</>
        ) : (
          <>
            Start on the free forever plan. Upgrade or self-host whenever you
            outgrow it.
          </>
        )}
      </p>

      {privateBeta && (
        <p className="text-xs md:text-sm text-muted-foreground text-center">
          Already have an invite code?{" "}
          <a href={registerHref} className="text-primary hover:underline">
            Register here
          </a>
          .
        </p>
      )}

      <ul
        className={cn(
          "mt-4 md:mt-6",
          "flex flex-row flex-wrap items-center justify-center",
          "gap-x-3 gap-y-2 md:gap-x-5",
          "text-xs md:text-sm text-muted-foreground",
          "max-w-[90vw] lg:max-w-[56rem]",
        )}
        aria-label="What you get with SchemaVaults"
      >
        {trustSignals.map((signal: string) => (
          <li
            key={signal}
            className="flex flex-row flex-nowrap items-center gap-2"
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-primary shrink-0"
            />
            {signal}
          </li>
        ))}
      </ul>

      {/* Scroll affordance: a full-bleed hero reads as the whole page without it. */}
      <a
        href={`#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`}
        className={cn(
          "mt-6 md:mt-10",
          "hidden sm:flex flex-col items-center gap-1",
          "text-xs text-muted-foreground hover:text-foreground transition-colors",
        )}
      >
        <span>Scroll to explore</span>
        <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
      </a>
    </div>
  );
}

export function HeroSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.HERO_SECTION}
      /*
       * `100svh` rather than `100vh`: on mobile browsers `100vh` includes the
       * collapsing URL bar, which pushed the primary CTA below the fold on
       * first paint.
       */
      className="min-h-[100svh] w-full overflow-hidden"
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
