"use client";

import usePrivateBeta from "@/hooks/usePrivateBeta";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { BackgroundBlur, Button, cn, Wordmark } from "@schemavaults/ui";
import { ArrowRight, BookOpenText, Mail, Sparkles } from "lucide-react";
import type { ReactElement } from "react";

const backgroundImageHref =
  "/media/marketing-landing-page/hero-background.webp";
const description: string =
  "Define your data once as a schema. Validate, store, and reuse it across AI agents, workflows, websites, mobile apps, and CMSs — without writing the same types three times.";

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
      {privateBeta && (
        <div
          className={cn(
            "inline-flex items-center gap-2",
            "rounded-full border border-primary/30 bg-primary/10",
            "px-3 py-1 mb-2",
            "text-xs md:text-sm font-medium text-primary",
          )}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Now in private beta — public launch coming soon
        </div>
      )}
      <h1
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl",
          "text-center",
          "font-bold max-w-[90vw] md:max-w-[75vw] lg:max-w-[60vw]",
        )}
      >
        Type-safe data for AI agents, workflows &amp; apps
      </h1>
      <h2 className="text-lg md:text-xl font-medium text-center tracking-tight text-muted-foreground">
        Welcome to <Wordmark /> — the schema-first data platform.
      </h2>
      <p className="max-w-[75vw] md:max-w-[65vw] lg:max-w-[58vw] xl:max-w-[50vw] text-center">
        {description}
      </p>
      <div className="flex flex-col flex-nowrap sm:flex-wrap sm:flex-row gap-3 md:gap-4 items-center justify-center mt-2">
        {privateBeta ? (
          <>
            <Button size="lg" asChild>
              <a
                href={`#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`}
                className="flex flex-row flex-nowrap gap-2 items-center justify-start"
              >
                <Mail className="h-4 w-4" />
                Join the launch waitlist
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href={registerHref}
                className="flex flex-row flex-nowrap gap-2 items-center justify-start"
              >
                Register with invite code
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <a
                href={`#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`}
                className="flex flex-row flex-nowrap gap-2 items-center justify-start"
              >
                <BookOpenText className="h-4 w-4" />
                See how it works
              </a>
            </Button>
          </>
        ) : (
          <>
            <Button size="lg" asChild>
              <a
                href={registerHref}
                className="flex flex-row flex-nowrap gap-2 items-center justify-start"
              >
                Start free
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href={`#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`}
                className="flex flex-row flex-nowrap gap-2 items-center justify-start"
              >
                <BookOpenText className="h-4 w-4" />
                See how it works
              </a>
            </Button>
          </>
        )}
      </div>
      <p className="mt-3 text-xs md:text-sm text-muted-foreground text-center">
        TypeScript-native&nbsp;&middot;&nbsp; MCP-ready&nbsp;&middot;&nbsp; Cloud or self-hosted&nbsp;&middot;&nbsp; No credit card to start
      </p>
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
