"use client";

import usePrivateBeta from "@/hooks/usePrivateBeta";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { BackgroundBlur, Button, cn, Wordmark } from "@schemavaults/ui";
import { ArrowRight, BookOpenText, Mail } from "lucide-react";
import type { ReactElement } from "react";

const backgroundImageHref =
  "/media/marketing-landing-page/hero-background.webp";

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
        "gap-3 md:gap-5",
        "px-4 md:px-8 lg:px-16 xl:px-32",
      )}
    >
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-full",
          "border border-border/60 bg-background/60 backdrop-blur",
          "px-3 py-1 text-xs font-medium text-muted-foreground",
          "shadow-sm",
        )}
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        {privateBeta
          ? "Private beta — invite-only access"
          : "Now in public beta"}
      </div>
      <h1
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl",
          "text-center leading-[1.1]",
          "font-bold max-w-[92vw] md:max-w-[80vw] lg:max-w-[68vw]",
          "tracking-tight",
        )}
      >
        Type-safe data for AI agents, workflows, and apps.
      </h1>
      <h2
        className={cn(
          "text-lg md:text-xl lg:text-2xl",
          "font-medium text-center tracking-tight text-muted-foreground",
          "max-w-[80vw] md:max-w-[68vw] lg:max-w-[58vw]",
        )}
      >
        Define your schemas once with <Wordmark />. Store, validate, and query
        the same data across every agent, workflow, mobile app, and CMS you
        build — without writing types twice.
      </h2>
      <div className="flex flex-col flex-nowrap sm:flex-wrap sm:flex-row gap-3 md:gap-4 items-center justify-center mt-3">
        <Button size="lg" asChild>
          <a
            href={registerHref}
            className="flex flex-row flex-nowrap gap-2 items-center justify-start"
          >
            {privateBeta ? "Register with invite code" : "Start free"}
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
        {privateBeta && (
          <Button size="lg" variant="ghost" asChild>
            <a
              href={`#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`}
              className="flex flex-row flex-nowrap gap-2 items-center justify-start"
            >
              <Mail className="h-4 w-4" />
              Join the launch waitlist
            </a>
          </Button>
        )}
      </div>
      <p className="text-xs md:text-sm text-muted-foreground mt-1 text-center">
        Free forever tier • No credit card required • Self-host or cloud
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
