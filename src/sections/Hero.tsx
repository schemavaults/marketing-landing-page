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
  "Schemas your AI agents, workflows, and frontends all share. Define your data types once — then validate, store, and reuse them anywhere.";

function HeroSectionBackgroundContent(): ReactElement {
  return (
    <div className="w-screen h-screen">
      <img
        className="object-cover w-full h-full"
        src={backgroundImageHref}
        alt=""
        role="presentation"
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
        "gap-3 md:gap-5",
        "px-4 md:px-8 lg:px-16 xl:px-32",
      )}
    >
      <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-primary">
        <Wordmark />
      </p>
      <h1
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl",
          "text-center",
          "font-bold max-w-[90vw] md:max-w-[80vw] lg:max-w-[65vw]",
          "tracking-tight",
        )}
      >
        Type-safe data your AI agents can actually trust.
      </h1>
      <h2 className="text-lg md:text-xl font-medium text-center tracking-tight text-muted-foreground max-w-[80vw] md:max-w-[60vw]">
        Define your schemas once. Use them everywhere — across agents,
        workflows, web apps, and CMSes.
      </h2>
      <p className="max-w-[75vw] md:max-w-[65vw] lg:max-w-[58vw] xl:max-w-[50vw] text-center text-muted-foreground">
        {description}
      </p>
      <div className="flex flex-col flex-nowrap sm:flex-wrap sm:flex-row gap-3 md:gap-4 items-center justify-center mt-3">
        <Button size="lg" asChild>
          <a
            href={privateBeta
              ? `#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`
              : registerHref}
            className="flex flex-row flex-nowrap gap-2 items-center justify-start"
          >
            {privateBeta ? (
              <>
                <Mail className="h-4 w-4" />
                Join the launch waitlist
              </>
            ) : (
              <>
                Get started — it's free
                <ArrowRight className="h-4 w-4" />
              </>
            )}
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
              href={registerHref}
              className="flex flex-row flex-nowrap gap-2 items-center justify-start"
            >
              Register with invite code
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        )}
      </div>
      <p className="text-xs text-muted-foreground/80 mt-1">
        {privateBeta
          ? "Be first in line · No spam · Unsubscribe anytime"
          : "Free forever for personal projects · No credit card required"}
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
