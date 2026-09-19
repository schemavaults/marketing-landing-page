"use client";

import usePrivateBeta from "@/hooks/usePrivateBeta";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { Badge, BackgroundBlur, Button, cn, Wordmark } from "@schemavaults/ui";
import { ArrowRight, BookOpenText, Mail, Sparkles } from "lucide-react";
import type { ReactElement } from "react";

const backgroundImageHref =
  "/media/marketing-landing-page/hero-background.webp";
const description: string =
  "Define your data types once as schemas. Use, re-use and compose them to validate & store data for your workflows, websites, mobile apps, or content management systems.";

function HeroSectionBackgroundContent(): ReactElement {
  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Decorative: the hero image carries no information, so it is hidden
          from assistive tech. It is also the LCP element, hence the eager,
          high-priority fetch. */}
      <img
        className="object-cover w-full h-full"
        src={backgroundImageHref}
        alt=""
        aria-hidden="true"
        loading="eager"
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
        "w-full min-h-svh",
        "flex flex-col items-center justify-center",
        "gap-3 md:gap-5",
        // Offset the fixed 64px header so the content is optically centered
        // within the *visible* viewport rather than behind the header.
        "pt-24 pb-16",
        "px-4 md:px-8 lg:px-16 xl:px-32",
      )}
    >
      {privateBeta && (
        <Badge
          variant="secondary"
          className="flex flex-row flex-nowrap gap-1.5 items-center"
        >
          <Sparkles className="h-3 w-3" aria-hidden="true" />
          Private beta &mdash; now accepting invite codes
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
      <h2 className="text-lg md:text-xl font-medium text-center text-balance tracking-tight text-muted-foreground">
        <Wordmark /> is the schema-first data platform for AI agents, workflows,
        and apps.
      </h2>
      <p className="max-w-[75vw] md:max-w-[65vw] lg:max-w-[58vw] xl:max-w-[50vw] text-center text-pretty">
        {description}
      </p>
      <div className="flex flex-col flex-nowrap sm:flex-wrap sm:flex-row gap-3 md:gap-4 items-center justify-center mt-2">
        {privateBeta ? (
          <>
            {/* During the private beta the waitlist is the action almost every
                visitor can actually complete, so it is the single primary CTA. */}
            <Button size="lg" asChild>
              <a
                href={`#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`}
                className="flex flex-row flex-nowrap gap-2 items-center justify-start"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Join the launch waitlist
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href={registerHref}
                className="flex flex-row flex-nowrap gap-2 items-center justify-start"
              >
                Register with invite code
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </>
        ) : (
          <Button size="lg" asChild>
            <a
              href={registerHref}
              className="flex flex-row flex-nowrap gap-2 items-center justify-start"
            >
              Get started free
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        )}
        <Button size="lg" variant="ghost" asChild>
          <a
            href={`#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`}
            className="flex flex-row flex-nowrap gap-2 items-center justify-start"
          >
            <BookOpenText className="h-4 w-4" aria-hidden="true" />
            See how it works
          </a>
        </Button>
      </div>
      <p className="text-sm text-muted-foreground text-center text-balance">
        {privateBeta
          ? "Waitlist members get first access when the public beta opens. No credit card required."
          : "Free forever tier • No credit card required • Cloud or self-hosted"}
      </p>
    </div>
  );
}

export function HeroSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.HERO_SECTION}
      className="relative w-full min-h-svh overflow-hidden scroll-mt-16"
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
