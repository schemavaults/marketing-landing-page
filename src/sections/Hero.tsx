"use client";

import usePrivateBeta from "@/hooks/usePrivateBeta";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import sectionAnchorOffsetClassName from "@/lib/sectionAnchorOffsetClassName";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { Badge, BackgroundBlur, Button, cn, Wordmark } from "@schemavaults/ui";
import {
  ArrowRight,
  BookOpenText,
  Check,
  Mail,
  ShieldCheck,
} from "lucide-react";
import type { ReactElement } from "react";

const backgroundImageHref =
  "/media/marketing-landing-page/hero-background.webp";
const description: string =
  "Define your data types once as schemas. Use, re-use and compose them to validate & store data for your workflows, websites, mobile apps, or content management systems.";

/**
 * Short, concrete reassurances shown directly beneath the primary call to
 * action. Each one restates a commitment already made elsewhere on this page
 * (the free tier in the pricing section, self-hosting in the features section)
 * so the visitor does not have to scroll to find the answer to "what does this
 * cost me to try?"
 */
const heroTrustSignals: readonly string[] = [
  "Free tier, forever",
  "Self-host or use our cloud",
  "TypeScript SDKs + MCP",
];

function HeroSectionBackgroundContent(): ReactElement {
  return (
    <div className="w-screen h-screen">
      <img
        className="object-cover w-full h-full"
        src={backgroundImageHref}
        alt=""
        aria-hidden="true"
        /**
         * This image is the hero's largest contentful paint. Loading it eagerly
         * at high priority keeps the headline from rendering over an empty
         * background on a cold visit.
         */
        fetchPriority="high"
        loading="eager"
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
        "w-screen h-screen",
        "flex flex-col items-center justify-center",
        "gap-2 md:gap-4",
        // Offset the fixed header so the content is centred within the
        // *visible* area rather than behind the header.
        "pt-16",
        "px-4 md:px-8 lg:px-16 xl:px-32",
      )}
    >
      {privateBeta && (
        <Badge variant="secondary" className="mb-1">
          Private beta &mdash; public launch coming soon
        </Badge>
      )}
      <h1
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl",
          "text-center",
          "font-bold max-w-[90vw] md:max-w-[75vw] lg:max-w-[60vw]",
        )}
      >
        Welcome to <Wordmark />
      </h1>
      <h2 className="text-lg md:text-xl font-medium text-center tracking-tight text-muted-foreground">
        Type-safe data for AI agents, workflows, and apps.
      </h2>
      <p className="max-w-[75vw] md:max-w-[65vw] lg:max-w-[58vw] xl:max-w-[50vw] text-center">
        {description}
      </p>
      <div className="flex flex-col flex-nowrap sm:flex-wrap sm:flex-row gap-3 md:gap-4 items-center justify-center mt-2">
        {/*
          Exactly one primary (filled) action is rendered at a time. During the
          private beta the register page is invite-gated, so the waitlist is the
          action almost every visitor can actually complete; the invite-code
          path drops to a quiet text link below.
        */}
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
      </div>

      {privateBeta && (
        <a
          href={registerHref}
          className={cn(
            "mt-1 text-sm text-muted-foreground",
            "hover:text-foreground transition-colors",
            "flex flex-row flex-nowrap gap-1.5 items-center",
          )}
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          Already have an invite code? Register here
        </a>
      )}

      <ul
        className={cn(
          "mt-3 md:mt-4",
          "flex flex-row flex-wrap gap-x-4 gap-y-1 justify-center",
          "text-xs md:text-sm text-muted-foreground",
        )}
      >
        {heroTrustSignals.map((signal: string) => (
          <li
            key={signal}
            className="flex flex-row flex-nowrap gap-1.5 items-center"
          >
            <Check className="h-3.5 w-3.5 text-green-500 shrink-0" />
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
      className={cn(
        "h-screen w-screen min-h-screen overflow-hidden",
        sectionAnchorOffsetClassName,
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
