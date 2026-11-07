"use client";

import usePrivateBeta from "@/hooks/usePrivateBeta";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { Badge, BackgroundBlur, Button, cn, Wordmark } from "@schemavaults/ui";
import { ArrowRight, BookOpenText, Mail } from "lucide-react";
import type { ReactElement } from "react";

const backgroundImageHref =
  "/media/marketing-landing-page/hero-background.webp";

/**
 * Hero body copy. Leads with the outcome ("write the schema once") rather
 * than the mechanism, then names the places that outcome pays off.
 */
const description: string =
  "Write the schema once, then re-use and compose it to validate and store data everywhere else — AI agents, pipelines, backends, mobile apps and your CMS. No drifting types, no hand-written validators, no surprises in production.";

/**
 * Risk-reducing microcopy. Rendered directly under the primary call to
 * action, where it answers the "what is this going to cost me?" objection at
 * the moment the visitor is deciding whether to click.
 */
const trustSignals: readonly string[] = [
  "Free forever tier",
  "No credit card required",
  "Cloud or self-hosted",
];

function HeroSectionBackgroundContent(): ReactElement {
  return (
    <div className="w-full h-full min-h-[100svh]">
      {/*
        The hero background is the page's largest-contentful-paint candidate,
        so it is fetched eagerly at high priority. It is decorative, hence the
        empty alt text and aria-hidden.
      */}
      <img
        className="object-cover w-full h-full"
        src={backgroundImageHref}
        alt=""
        aria-hidden="true"
        loading="eager"
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
        "w-full h-full min-h-[100svh]",
        "flex flex-col items-center justify-center",
        "gap-3 md:gap-4",
        /** Clear the fixed 4rem header so centred content is never clipped. */
        "pt-20 pb-12 md:pt-24",
        "px-4 md:px-8 lg:px-16 xl:px-32",
      )}
    >
      <Badge variant="secondary" className="mb-1">
        {privateBeta
          ? "Private beta — invite only"
          : "Now available — free tier, no credit card"}
      </Badge>

      <h1
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl",
          "text-center text-balance",
          "font-bold max-w-[90vw] md:max-w-[75vw] lg:max-w-[60vw]",
        )}
      >
        Define your data once. Trust it everywhere.
      </h1>

      <h2 className="text-lg md:text-xl font-medium text-center tracking-tight text-muted-foreground">
        <Wordmark /> is type-safe data storage for AI agents, workflows and
        apps.
      </h2>

      <p className="max-w-[75vw] md:max-w-[65vw] lg:max-w-[58vw] xl:max-w-[50vw] text-center text-pretty">
        {description}
      </p>

      {/*
        One dominant call to action only. During the private beta the primary
        action is the waitlist (the thing an anonymous visitor can actually
        complete); registration needs an invite code, so it is demoted to a
        quiet tertiary link instead of competing for the click.
      */}
      <div className="flex flex-col flex-nowrap sm:flex-wrap sm:flex-row gap-3 md:gap-4 items-center justify-center mt-2">
        {privateBeta ? (
          <Button size="lg" asChild>
            <a
              href={`#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`}
              className="flex flex-row flex-nowrap gap-2 items-center justify-start"
            >
              <Mail className="h-4 w-4" />
              Get early access
            </a>
          </Button>
        ) : (
          <Button size="lg" asChild>
            <a
              href={registerHref}
              className="flex flex-row flex-nowrap gap-2 items-center justify-start"
            >
              Start free
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        )}

        <Button size="lg" variant="outline" asChild>
          <a
            href={`#${MarketingLandingPageSectionIds.SEE_IT_IN_CODE_SECTION}`}
            className="flex flex-row flex-nowrap gap-2 items-center justify-start"
          >
            <BookOpenText className="h-4 w-4" />
            See it in code
          </a>
        </Button>
      </div>

      <ul className="flex flex-row flex-wrap gap-x-4 gap-y-1 items-center justify-center text-xs md:text-sm text-muted-foreground mt-1">
        {trustSignals.map((signal: string) => (
          <li key={signal} className="flex flex-row items-center gap-2">
            <span aria-hidden="true" className="text-primary">
              &bull;
            </span>
            {signal}
          </li>
        ))}
      </ul>

      {privateBeta && (
        <p className="text-sm text-muted-foreground mt-1">
          Already have an invite code?{" "}
          <a href={registerHref} className="text-primary hover:underline">
            Register here
          </a>
          .
        </p>
      )}
    </div>
  );
}

export function HeroSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.HERO_SECTION}
      className={cn(
        "w-full min-h-[100svh] overflow-hidden",
        /** Offset anchor scrolling for the fixed header. */
        "scroll-mt-16",
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
