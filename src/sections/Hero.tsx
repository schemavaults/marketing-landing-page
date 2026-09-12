"use client";

import usePrivateBeta from "@/hooks/usePrivateBeta";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { BackgroundBlur, Badge, Button, cn, Wordmark } from "@schemavaults/ui";
import { ArrowRight, BookOpenText, Mail } from "lucide-react";
import type { ReactElement } from "react";

const backgroundImageHref =
  "/media/marketing-landing-page/hero-background.webp";
const description: string =
  "lets you define your data types once as schemas — then use, re-use and compose them to validate & store data for your workflows, websites, mobile apps, or content management systems.";

/**
 * Short, scannable proof points rendered directly beneath the hero CTAs.
 * Every claim here must stay consistent with the pricing & feature sections.
 */
const trustSignals: readonly string[] = [
  "Free tier, forever",
  "No setup fees",
  "Cloud or self-hosted",
] as const;

function HeroSectionBackgroundContent(): ReactElement {
  return (
    <div className="w-full h-full" aria-hidden="true">
      <img
        className="object-cover w-full h-full"
        src={backgroundImageHref}
        alt=""
        role="presentation"
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
        // Offset the fixed 4rem header so content is never clipped
        // on short viewports.
        "pt-20 pb-12",
        "px-4 md:px-8 lg:px-16 xl:px-32",
      )}
    >
      <Badge variant="secondary" className="mb-1">
        {privateBeta ? "Private beta — invite only" : "Now generally available"}
      </Badge>

      {/*
        The <h1> carries the value proposition rather than a greeting:
        it is the single line most visitors read, and the strongest
        on-page SEO signal.
      */}
      <h1
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl",
          "text-center text-balance",
          "font-bold max-w-[90vw] md:max-w-[80vw] lg:max-w-[65vw]",
        )}
      >
        Type-safe data for AI agents, workflows, and apps
      </h1>

      <p className="max-w-[75vw] md:max-w-[65vw] lg:max-w-[58vw] xl:max-w-[50vw] text-center text-base md:text-lg text-muted-foreground text-pretty">
        <Wordmark className="font-semibold text-foreground" /> {description}
      </p>

      {/*
        A single primary action per screen. During private beta the
        waitlist is the conversion event; afterwards it is registration.
      */}
      <div className="flex flex-col flex-nowrap sm:flex-wrap sm:flex-row gap-3 md:gap-4 items-center justify-center mt-2 w-full sm:w-auto">
        {privateBeta ? (
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <a
              href={`#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`}
              className="flex flex-row flex-nowrap gap-2 items-center justify-center"
            >
              <Mail className="h-4 w-4" />
              Join the launch waitlist
            </a>
          </Button>
        ) : (
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <a
              href={registerHref}
              className="flex flex-row flex-nowrap gap-2 items-center justify-center"
            >
              Start free
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        )}

        <Button
          size="lg"
          variant="outline"
          className="w-full sm:w-auto"
          asChild
        >
          <a
            href={`#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`}
            className="flex flex-row flex-nowrap gap-2 items-center justify-center"
          >
            <BookOpenText className="h-4 w-4" />
            See how it works
          </a>
        </Button>
      </div>

      {privateBeta && (
        <p className="text-sm text-muted-foreground text-center">
          Already have an invite code?{" "}
          <a
            href={registerHref}
            className="text-primary underline underline-offset-4 hover:no-underline"
          >
            Register here
          </a>
        </p>
      )}

      <ul className="flex flex-row flex-wrap gap-x-4 gap-y-1 items-center justify-center mt-2 text-xs md:text-sm text-muted-foreground">
        {trustSignals.map((signal: string) => (
          <li key={signal} className="flex items-center gap-2">
            <span aria-hidden="true" className="text-primary">
              &#10003;
            </span>
            {signal}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HeroSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.HERO_SECTION}
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
