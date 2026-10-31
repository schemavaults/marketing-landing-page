"use client";

import usePrivateBeta from "@/hooks/usePrivateBeta";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { Badge, BackgroundBlur, Button, cn, Wordmark } from "@schemavaults/ui";
import {
  ArrowRight,
  BookOpenText,
  Check,
  ChevronDown,
  Mail,
} from "lucide-react";
import type { ReactElement } from "react";

const backgroundImageHref =
  "/media/marketing-landing-page/hero-background.webp";

/**
 * Short, concrete reassurances rendered directly under the primary call to
 * action. Each one restates a capability claimed elsewhere on this page, so
 * the hero never promises something the rest of the page does not back up.
 */
const trustSignals: readonly string[] = [
  "Self-host or use our cloud",
  "Validated on write, typed on read",
  "TypeScript SDK + MCP",
] as const;

function HeroSectionBackgroundContent(): ReactElement {
  return (
    <div className="w-full h-full min-h-[100svh]">
      {/*
        Decorative only: the hero's meaning is carried by the headline, so this
        image is hidden from assistive technology with an empty alt.
        `fetchPriority` keeps it from competing with the (LCP) headline text.
      */}
      <img
        className="object-cover w-full h-full"
        src={backgroundImageHref}
        alt=""
        aria-hidden="true"
        decoding="async"
        fetchPriority="low"
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
        "w-full h-full min-h-[100svh]",
        "flex flex-col items-center justify-center",
        "gap-4 md:gap-5",
        // Top padding clears the fixed 4rem header; bottom padding leaves room
        // for the scroll affordance.
        "pt-24 pb-16 md:pt-28 md:pb-20",
        "px-4 md:px-8 lg:px-16 xl:px-32",
      )}
    >
      <Badge variant="secondary" className="text-xs md:text-sm">
        {privateBeta
          ? "Private beta · join the launch waitlist"
          : "Now available"}
      </Badge>

      <h1
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl",
          "text-center text-balance",
          "font-bold tracking-tight",
          "max-w-[90vw] md:max-w-[80vw] lg:max-w-[64rem]",
        )}
      >
        Define your data once. Trust it everywhere.
      </h1>

      <p
        className={cn(
          "text-lg md:text-xl lg:text-2xl",
          "font-medium text-center text-pretty tracking-tight",
          "max-w-[85vw] md:max-w-[48rem]",
        )}
      >
        <Wordmark /> is a schema-first vault for the data your AI agents,
        workflows, and apps all share.
      </p>

      <p
        className={cn(
          "text-center text-pretty text-muted-foreground",
          "max-w-[80vw] md:max-w-[42rem]",
        )}
      >
        Describe your data types once as schemas, then re-use and compose them
        to validate and store data across your workflows, websites, mobile
        apps, and content management systems — without redefining the same
        types in five places.
      </p>

      {/* One unmistakable primary action, one secondary, one quiet tertiary. */}
      <div
        className={cn(
          "flex flex-col flex-nowrap sm:flex-row sm:flex-wrap",
          "gap-3 md:gap-4 items-stretch sm:items-center justify-center",
          "mt-2 w-full sm:w-auto",
        )}
      >
        {privateBeta ? (
          <Button size="lg" asChild>
            <a
              href={`#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`}
              className="flex flex-row flex-nowrap gap-2 items-center justify-center"
            >
              <Mail className="h-4 w-4" />
              Join the launch waitlist
            </a>
          </Button>
        ) : (
          <Button size="lg" asChild>
            <a
              href={registerHref}
              className="flex flex-row flex-nowrap gap-2 items-center justify-center"
            >
              Start free
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        )}

        <Button size="lg" variant="outline" asChild>
          <a
            href={`#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`}
            className="flex flex-row flex-nowrap gap-2 items-center justify-center"
          >
            <BookOpenText className="h-4 w-4" />
            See how it works
          </a>
        </Button>
      </div>

      {/*
        During private beta, registration requires an invite code, so it is a
        dead end for most visitors. It stays reachable, but as a quiet text
        link rather than a second primary button.
      */}
      {privateBeta && (
        <p className="text-sm text-muted-foreground text-center">
          Already have an invite code?{" "}
          <a
            href={registerHref}
            className="text-primary font-medium underline-offset-4 hover:underline"
          >
            Redeem it here
          </a>
        </p>
      )}

      <ul
        className={cn(
          "flex flex-col sm:flex-row sm:flex-wrap",
          "gap-x-5 gap-y-2 items-start sm:items-center justify-center",
          "mt-2 text-sm text-muted-foreground",
        )}
      >
        {trustSignals.map((signal: string) => (
          <li
            key={signal}
            className="flex flex-row flex-nowrap gap-1.5 items-center"
          >
            <Check className="h-4 w-4 shrink-0 text-primary" />
            {signal}
          </li>
        ))}
      </ul>

      {/* Scroll affordance: tells visitors there is more page below the fold. */}
      <a
        href={`#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`}
        aria-label="Scroll to see how SchemaVaults works"
        className={cn(
          "hidden md:flex mt-6",
          "h-10 w-10 items-center justify-center rounded-full",
          "border border-border/60 text-muted-foreground",
          "transition-colors hover:text-foreground hover:border-border",
        )}
      >
        <ChevronDown className="h-5 w-5 animate-bounce" aria-hidden="true" />
      </a>
    </div>
  );
}

export function HeroSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.HERO_SECTION}
      // `min-h` rather than a fixed `h-screen` so the hero can grow instead of
      // clipping its own call to action on short or landscape viewports.
      className="w-full h-auto min-h-[100svh] overflow-x-hidden"
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
