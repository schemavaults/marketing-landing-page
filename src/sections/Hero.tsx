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
  "Define your schemas once. Store, validate, and query the same shape from your AI agents, workflows, apps, and content — end-to-end type-safe.";

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
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-full",
          "border border-border/60 bg-background/60 backdrop-blur",
          "px-3 py-1 text-xs md:text-sm",
        )}
      >
        <span className="text-muted-foreground">Introducing</span>
        <Wordmark />
        {privateBeta && (
          <>
            <span className="text-muted-foreground">·</span>
            <span className="font-medium">Now in private beta</span>
          </>
        )}
      </div>
      <h1
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl",
          "text-center tracking-tight",
          "font-bold max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw]",
        )}
      >
        Type-safe data for AI agents, workflows, and apps.
      </h1>
      <p className="max-w-[75vw] md:max-w-[65vw] lg:max-w-[58vw] xl:max-w-[50vw] text-center text-base md:text-lg text-muted-foreground">
        {description}
      </p>
      <div className="flex flex-col flex-nowrap sm:flex-wrap sm:flex-row gap-3 md:gap-4 items-center justify-center mt-2">
        {privateBeta ? (
          <Button size="lg" asChild>
            <a
              href={`#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`}
              className="flex flex-row flex-nowrap gap-2 items-center justify-start"
            >
              <Mail className="h-4 w-4" />
              Join the launch waitlist
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
            href={`#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`}
            className="flex flex-row flex-nowrap gap-2 items-center justify-start"
          >
            <BookOpenText className="h-4 w-4" />
            See how it works
          </a>
        </Button>
        {privateBeta && (
          <Button size="lg" variant="outline" asChild>
            <a
              href={registerHref}
              className="flex flex-row flex-nowrap gap-2 items-center justify-start"
            >
              Have an invite code?
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        )}
      </div>
      <p className="text-xs md:text-sm text-muted-foreground mt-1">
        {privateBeta
          ? "No spam · Unsubscribe anytime"
          : "Free forever plan · No credit card required"}
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
