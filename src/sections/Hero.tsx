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
  "Define your data types once as schemas. Re-use and compose them across your AI agents, workflows, websites, mobile apps, and CMS — with end-to-end type safety from storage to render.";

function HeroSectionBackgroundContent(): ReactElement {
  return (
    <div className="w-screen h-screen">
      <img
        className="object-cover w-full h-full"
        src={backgroundImageHref}
        alt=""
        aria-hidden="true"
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
      <p className="text-sm md:text-base font-semibold tracking-wide uppercase text-primary">
        <Wordmark />
      </p>
      <h1
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl",
          "text-center tracking-tight",
          "font-bold max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw]",
        )}
      >
        Type-safe data, from schema to production.
      </h1>
      <h2 className="text-lg md:text-xl font-medium text-center tracking-tight text-muted-foreground max-w-[80vw] md:max-w-[65vw]">
        One source of truth for AI agents, workflows, and apps — no more
        guessing what shape your data is in.
      </h2>
      <p className="max-w-[75vw] md:max-w-[65vw] lg:max-w-[58vw] xl:max-w-[50vw] text-center">
        {description}
      </p>
      <div className="flex flex-col flex-nowrap sm:flex-wrap sm:flex-row gap-3 md:gap-4 items-center justify-center mt-2">
        <Button size="lg" asChild>
          <a
            href={
              privateBeta
                ? `#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`
                : registerHref
            }
            className="flex flex-row flex-nowrap gap-2 items-center justify-start"
          >
            {privateBeta ? (
              <>
                <Mail className="h-4 w-4" />
                Join the launch waitlist
              </>
            ) : (
              <>
                Start free
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
      <p className="text-xs md:text-sm text-muted-foreground text-center mt-2">
        {privateBeta
          ? "Invite-only beta · No spam, one launch email when public access opens"
          : "Free forever plan · No credit card required · Self-host or use our cloud"}
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
