"use client";

import usePrivateBeta from "@/hooks/usePrivateBeta";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { BackgroundBlur, Button, cn, Wordmark } from "@schemavaults/ui";
import { ArrowRight, BookOpenText, Mail } from "lucide-react";
import type { ReactElement } from "react";

const backgroundImageHref =
  "/media/marketing-landing-page/hero-background.webp";
const description: string =
  "Define your data types once as schemas, then use them everywhere — to validate LLM output, ground agent memory, power workflows, and serve content to your apps. No more shape-guessing, no more brittle JSON.";

const valuePropChips: readonly string[] = [
  "Type-safe by default",
  "LLM & MCP native",
  "Cloud or self-hosted",
  "TypeScript SDKs",
] as const;

function HeroSectionBackgroundContent(): ReactElement {
  return (
    <div className="w-screen h-screen">
      <img className="object-cover w-full h-full" src={backgroundImageHref} />
    </div>
  );
}

function HeroSectionContent(): ReactElement {
  const privateBeta: boolean = usePrivateBeta();
  const registerHref: string = useRegisterPageHref();

  return (
    <div
      className={cn(
        "w-screen h-screen",
        "flex flex-col items-center justify-center",
        "gap-2 md:gap-4",
        "px-4 md:px-8 lg:px-16 xl:px-32",
      )}
    >
      <h1
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl",
          "text-center",
          "font-bold max-w-[90vw] md:max-w-[75vw] lg:max-w-[60vw]",
        )}
      >
        Welcome to <Wordmark />
      </h1>
      <h2 className="text-lg md:text-xl font-medium text-center tracking-tight text-muted-foreground max-w-[90vw] md:max-w-[70vw] lg:max-w-[55vw]">
        The type-safe graph database for AI agents, workflows, and apps.
      </h2>
      <p className="max-w-[75vw] md:max-w-[65vw] lg:max-w-[58vw] xl:max-w-[50vw] text-center">
        {description}
      </p>
      <ul
        aria-label="Key capabilities"
        className="flex flex-row flex-wrap gap-2 items-center justify-center max-w-[90vw] mt-1"
      >
        {valuePropChips.map((chip) => (
          <li
            key={chip}
            className={cn(
              "px-3 py-1 rounded-full text-xs md:text-sm",
              "border border-border bg-background/40 backdrop-blur-sm",
              "text-foreground/80",
            )}
          >
            {chip}
          </li>
        ))}
      </ul>
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
        {privateBeta ? (
          <Button size="lg" asChild>
            <a
              href={`#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`}
              className="flex flex-row flex-nowrap gap-2 items-center justify-start"
            >
              <Mail className="h-4 w-4" />
              Join the launch waitlist
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        ) : (
          <Button size="lg" asChild>
            <a
              href={registerHref}
              className="flex flex-row flex-nowrap gap-2 items-center justify-start"
            >
              Get started — it's free
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        )}
      </div>
      {privateBeta && (
        <p className="text-xs text-muted-foreground mt-1">
          Have an invite code?{" "}
          <a href={registerHref} className="underline hover:text-foreground">
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
      className="h-screen w-screen min-h-screen overflow-hidden"
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
