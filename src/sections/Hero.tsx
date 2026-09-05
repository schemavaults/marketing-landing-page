"use client";

import usePrivateBeta from "@/hooks/usePrivateBeta";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { Badge, BackgroundBlur, Button, cn, Wordmark } from "@schemavaults/ui";
import { ArrowRight, BookOpenText, Mail } from "lucide-react";
import type { ReactElement } from "react";

const backgroundImageHref =
  "/media/marketing-landing-page/hero-background.webp";
const description: string =
  "Define your data types once as schemas. Use, re-use and compose them to validate & store data for your workflows, websites, mobile apps, or content management systems.";

function HeroSectionBackgroundContent(): ReactElement {
  return (
    <div className="w-full h-full min-h-screen">
      <img
        className="object-cover w-full h-full"
        src={backgroundImageHref}
        // Decorative background: hidden from assistive tech, but it is the
        // largest paint on the page so it is fetched at high priority.
        alt=""
        aria-hidden="true"
        fetchPriority="high"
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
        "w-full h-auto min-h-screen",
        "flex flex-col items-center justify-center",
        "gap-2 md:gap-4",
        "px-4 md:px-8 lg:px-16 xl:px-32",
        // Clear the fixed header, and give short/landscape viewports room to
        // breathe instead of clipping the calls to action.
        "pt-24 pb-16 md:pt-28 md:pb-20",
      )}
    >
      <div className="flex flex-row flex-wrap gap-3 items-center justify-center">
        <Wordmark className="text-lg md:text-xl" />
        {privateBeta && (
          <Badge variant="secondary" className="text-xs md:text-sm">
            Private beta &mdash; now taking waitlist signups
          </Badge>
        )}
      </div>
      <h1
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl",
          "text-center",
          "font-bold max-w-[90vw] md:max-w-[75vw] lg:max-w-[60vw]",
        )}
      >
        Type-safe data for AI agents, workflows, and apps.
      </h1>
      <p className="max-w-[75vw] md:max-w-[65vw] lg:max-w-[58vw] xl:max-w-[50vw] text-center text-lg text-muted-foreground">
        {description}
      </p>
      <div className="flex flex-col flex-nowrap sm:flex-wrap sm:flex-row gap-3 md:gap-4 items-center justify-center mt-2">
        {privateBeta ? (
          <Button size="lg" asChild data-analytics-id="hero-cta-waitlist">
            <a
              href={`#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`}
              className="flex flex-row flex-nowrap gap-2 items-center justify-start"
            >
              <Mail className="h-4 w-4" />
              Join the launch waitlist
            </a>
          </Button>
        ) : (
          <Button size="lg" asChild data-analytics-id="hero-cta-register">
            <a
              href={registerHref}
              className="flex flex-row flex-nowrap gap-2 items-center justify-start"
            >
              Get started free
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        )}
        <Button
          size="lg"
          variant="outline"
          asChild
          data-analytics-id="hero-cta-how-it-works"
        >
          <a
            href={`#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`}
            className="flex flex-row flex-nowrap gap-2 items-center justify-start"
          >
            <BookOpenText className="h-4 w-4" />
            See how it works
          </a>
        </Button>
      </div>
      {/*
        During the private beta, registration requires an invite code, so it is
        a dead end for most visitors. Keep it reachable, but do not compete with
        the waitlist for attention.
      */}
      {privateBeta && (
        <a
          href={registerHref}
          className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 mt-1"
          data-analytics-id="hero-cta-invite-code"
        >
          Already have an invite code? Register here
        </a>
      )}
      <p className="text-sm text-muted-foreground text-center mt-2">
        Free tier available &bull; No setup fees &bull; Cancel anytime
      </p>
    </div>
  );
}

export function HeroSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.HERO_SECTION}
      className="min-h-screen h-auto w-full overflow-x-hidden"
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
