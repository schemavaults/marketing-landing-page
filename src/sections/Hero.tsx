"use client";

import usePrivateBeta from "@/hooks/usePrivateBeta";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import SECTION_SCROLL_MARGIN_CLASSNAME from "@/lib/sectionScrollMargin";
import { Badge, BackgroundBlur, Button, cn, Wordmark } from "@schemavaults/ui";
import { ArrowRight, BookOpenText, Mail } from "lucide-react";
import type { ReactElement } from "react";

const backgroundImageHref =
  "/media/marketing-landing-page/hero-background.webp";
const description: string =
  "Define your data types once as schemas. Use, re-use and compose them to validate & store data for your workflows, websites, mobile apps, or content management systems.";

function HeroSectionBackgroundContent(): ReactElement {
  return (
    <div className="w-full h-full">
      {/*
        Decorative background: `alt=""` keeps it out of the accessibility tree,
        and `fetchPriority="high"` tells the browser this is the LCP candidate.
      */}
      <img
        className="object-cover w-full h-full"
        src={backgroundImageHref}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
}

function HeroSectionContent(): ReactElement {
  const privateBeta: boolean = usePrivateBeta();
  const registerHref: string = useRegisterPageHref();

  const waitlistHref: string = `#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`;

  /**
   * One visually dominant call-to-action per state. During the private beta the
   * action a visitor can actually complete is joining the waitlist, so that is
   * the primary button and self-serve registration becomes a quiet text link
   * for the minority who already hold an invite code.
   */
  const trustSignals: readonly string[] = privateBeta
    ? ["No credit card", "One email at launch", "Unsubscribe anytime"]
    : ["Free tier, no credit card", "Self-host or cloud", "TypeScript-native"];

  return (
    <div
      className={cn(
        "w-full h-full",
        "flex flex-col items-center justify-center",
        "gap-3 md:gap-5",
        "pt-16 pb-8",
        "px-4 md:px-8 lg:px-16 xl:px-32",
      )}
    >
      {privateBeta && (
        <Badge variant="secondary" className="mb-1">
          Private beta &middot; invite only
        </Badge>
      )}
      <h1
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl",
          "text-center text-balance",
          "font-bold max-w-[90vw] md:max-w-[75vw] lg:max-w-[60vw]",
        )}
      >
        Define your data once. Trust it everywhere.
      </h1>
      <h2 className="text-lg md:text-xl font-medium text-center tracking-tight text-muted-foreground max-w-[85vw] md:max-w-[65vw]">
        <Wordmark /> is schema-validated storage for AI agents, workflows, and
        apps.
      </h2>
      <p className="max-w-[75vw] md:max-w-[65vw] lg:max-w-[58vw] xl:max-w-[50vw] text-center">
        {description}
      </p>
      <div className="flex flex-col flex-nowrap sm:flex-wrap sm:flex-row gap-3 md:gap-4 items-center justify-center mt-2">
        {privateBeta ? (
          <Button size="lg" asChild>
            <a
              href={waitlistHref}
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
              Get started free
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
      <ul className="flex flex-row flex-wrap gap-x-4 gap-y-1 items-center justify-center text-xs md:text-sm text-muted-foreground mt-1">
        {trustSignals.map((signal: string) => (
          <li key={signal} className="flex flex-row items-center gap-2">
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
      /*
       * `svh` rather than `vh`: on mobile browsers with a dynamic toolbar,
       * `100vh` is taller than the visible viewport, which pushed the hero's
       * call-to-action below the fold on first paint.
       */
      className={cn(
        "h-[100svh] min-h-[32rem] w-full overflow-hidden",
        SECTION_SCROLL_MARGIN_CLASSNAME,
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
