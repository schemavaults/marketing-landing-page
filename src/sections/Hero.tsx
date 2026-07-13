"use client";

import usePrivateBeta from "@/hooks/usePrivateBeta";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { BackgroundBlur, Button, cn, Wordmark } from "@schemavaults/ui";
import { ArrowRight, BookOpenText, Mail, ShieldCheck } from "lucide-react";
import type { ReactElement } from "react";

const backgroundImageHref =
  "/media/marketing-landing-page/hero-background.webp";
const description: string =
  "Define your data shapes once as schemas, then use, re-use, and compose them across your AI agents, workflows, apps, and content — with end-to-end type safety guaranteed.";

const trustBadges: readonly string[] = [
  "TypeScript-first",
  "Zod-powered validation",
  "MCP-ready for AI agents",
  "Self-hostable",
];

function HeroSectionBackgroundContent(): ReactElement {
  return (
    <div className="w-screen h-screen">
      <img
        className="object-cover w-full h-full"
        src={backgroundImageHref}
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        // @ts-expect-error - fetchpriority is a valid HTML attribute the React types don't yet recognize
        fetchpriority="high"
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
        Type-safe data for AI agents, workflows, and apps
      </h1>
      <h2 className="text-lg md:text-xl font-medium text-center tracking-tight text-muted-foreground">
        Welcome to <Wordmark /> — the graph database you can just talk to.
      </h2>
      <p className="max-w-[75vw] md:max-w-[65vw] lg:max-w-[58vw] xl:max-w-[50vw] text-center">
        {description}
      </p>
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
        {privateBeta && (
          <Button size="lg" asChild>
            <a
              href={`#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`}
              className="flex flex-row flex-nowrap gap-2 items-center justify-start"
            >
              <Mail className="h-4 w-4" />
              Join the launch waitlist
            </a>
          </Button>
        )}
        <Button size="lg" asChild>
          <a
            href={registerHref}
            className="flex flex-row flex-nowrap gap-2 items-center justify-start"
          >
            {privateBeta ? "Register with invite code" : "Get started free"}
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </div>
      <p className="flex flex-row flex-wrap items-center justify-center gap-1.5 text-xs md:text-sm text-muted-foreground mt-1">
        <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Free forever plan • No credit card required • Cancel anytime</span>
      </p>
      <ul
        className={cn(
          "mt-4 md:mt-6",
          "flex flex-row flex-wrap items-center justify-center",
          "gap-x-4 gap-y-2",
          "text-xs md:text-sm text-muted-foreground",
        )}
        aria-label="Built with"
      >
        {trustBadges.map((label: string) => (
          <li
            key={label}
            className={cn(
              "px-3 py-1 rounded-full",
              "border border-border/60 bg-background/40 backdrop-blur",
              "whitespace-nowrap",
            )}
          >
            {label}
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
