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
  "Define your data model once. Reuse the same schemas across AI agents, workflows, web apps, and backends — with graph-native storage that runs in the cloud, on your infra, or in-memory.";

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
        "gap-3 md:gap-4",
        "px-4 md:px-8 lg:px-16 xl:px-32",
      )}
    >
      <Badge
        variant="outline"
        className="bg-background/60 backdrop-blur-sm border-primary/40 text-xs md:text-sm px-3 py-1 flex flex-row items-center gap-1.5"
      >
        <Sparkles className="h-3 w-3" />
        {privateBeta
          ? "Now in private beta · Invite-only"
          : "Type-safe by design · MCP-native"}
      </Badge>
      <h1
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl",
          "text-center",
          "font-bold max-w-[90vw] md:max-w-[75vw] lg:max-w-[60vw]",
          "leading-tight",
        )}
      >
        Type-safe data,{" "}
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          everywhere your code runs.
        </span>
      </h1>
      <h2 className="text-lg md:text-xl lg:text-2xl font-medium text-center tracking-tight text-muted-foreground max-w-[85vw] md:max-w-[70vw] lg:max-w-[55vw]">
        <Wordmark /> is the graph database and schema registry built for AI
        agents, workflows, and modern apps.
      </h2>
      <p className="max-w-[75vw] md:max-w-[65vw] lg:max-w-[58vw] xl:max-w-[50vw] text-center text-muted-foreground">
        {description}
      </p>
      <div className="flex flex-col flex-nowrap sm:flex-wrap sm:flex-row gap-3 md:gap-4 items-center justify-center mt-2">
        <Button size="lg" asChild>
          <a
            href={registerHref}
            className="flex flex-row flex-nowrap gap-2 items-center justify-start"
          >
            {privateBeta ? "Register with invite code" : "Start free — no card required"}
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
        {privateBeta && (
          <Button size="lg" variant="secondary" asChild>
            <a
              href={`#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`}
              className="flex flex-row flex-nowrap gap-2 items-center justify-start"
            >
              <Mail className="h-4 w-4" />
              Join the launch waitlist
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
      <p className="text-xs md:text-sm text-muted-foreground/80 text-center mt-1">
        Free forever plan · Bring your own compute · Works with Model Context Protocol
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
