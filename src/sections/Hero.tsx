"use client";

import usePrivateBeta from "@/hooks/usePrivateBeta";
import useLoginPageHref from "@/hooks/useLoginPageHref";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { Badge, BackgroundBlur, Button, cn, Wordmark } from "@schemavaults/ui";
import { ArrowRight, BookOpenText, Mail } from "lucide-react";
import type { ReactElement } from "react";

const backgroundImageHref =
  "/media/marketing-landing-page/hero-background.webp";
const description: string =
  "Define your data types once as schemas. Use, re-use and compose them to validate & store data for your workflows, websites, mobile apps, or content management systems.";

/** Short, concrete reassurances. Keep these to claims made elsewhere on the page. */
const trustPoints: readonly string[] = [
  "Free plan, $0 forever",
  "Managed cloud or self-hosted",
  "No setup fees",
];

function HeroSectionBackgroundContent(): ReactElement {
  return (
    <div className="w-full h-full">
      {/* Decorative: the hero's meaning is carried by the copy, not the image. */}
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
  const loginHref: string = useLoginPageHref();

  return (
    <div
      className={cn(
        "w-full h-full",
        "flex flex-col items-center justify-center",
        "gap-2 md:gap-4",
        "pt-16",
        "px-4 md:px-8 lg:px-16 xl:px-32",
      )}
    >
      {privateBeta && (
        <Badge variant="outline" className="mb-1 backdrop-blur">
          Private beta &mdash; public early access opening soon
        </Badge>
      )}
      <h1
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl",
          "text-center",
          "font-bold max-w-[90vw] md:max-w-[75vw] lg:max-w-[60vw]",
        )}
      >
        Type-safe data for AI agents, workflows, and apps
      </h1>
      <p className="text-lg md:text-xl font-medium text-center tracking-tight text-muted-foreground">
        <Wordmark /> is schema-validated cloud storage
      </p>
      <p className="max-w-[75vw] md:max-w-[65vw] lg:max-w-[58vw] xl:max-w-[50vw] text-center">
        {description}
      </p>

      {/* One primary action. Everything else is deliberately secondary. */}
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
      </div>

      <p className="text-xs md:text-sm text-muted-foreground text-center mt-1">
        {trustPoints.join(" • ")}
      </p>

      {privateBeta && (
        <p className="text-xs md:text-sm text-muted-foreground text-center">
          Already have an invite code?{" "}
          <a href={registerHref} className="text-primary hover:underline">
            Register
          </a>{" "}
          or{" "}
          <a href={loginHref} className="text-primary hover:underline">
            sign in
          </a>
          .
        </p>
      )}
    </div>
  );
}

export function HeroSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.HERO_SECTION}
      className="h-dvh w-full min-h-[40rem] overflow-hidden scroll-mt-16"
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
