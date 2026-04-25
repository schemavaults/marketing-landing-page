"use client";

import { BackgroundBlur, Button, cn, Wordmark } from "@schemavaults/ui";
import { ArrowRight } from "lucide-react";
import type { ReactElement } from "react";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import { PricingSectionId } from "./PricingSection";

const backgroundImageHref =
  "/media/marketing-landing-page/hero-background.webp";
const description: string =
  "Define your data types once as schemas, then use, re-use, and compose them across AI agents, workflows, websites, and apps — with end-to-end validation built in.";

function HeroSectionBackgroundContent(): ReactElement {
  return (
    <div className="w-screen h-screen">
      <img className="object-cover w-full h-full" src={backgroundImageHref} />
    </div>
  );
}

function HeroSectionContent(): ReactElement {
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
      <h1
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl",
          "text-center",
          "font-bold max-w-[90vw] md:max-w-[75vw] lg:max-w-[60vw]",
        )}
      >
        Type-safe data for the AI age.
      </h1>
      <h2 className="text-lg md:text-xl font-medium text-center tracking-tight text-muted-foreground">
        <Wordmark /> gives your agents, workflows, and apps a single source of
        truth for the shape of every byte they touch.
      </h2>
      <p className="max-w-[75vw] md:max-w-[65vw] lg:max-w-[58vw] xl:max-w-[50vw] text-center">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <a href={registerHref}>
          <Button size="lg" className="w-full sm:w-auto">
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </a>
        <a href={`#${PricingSectionId}`}>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            See Pricing
          </Button>
        </a>
      </div>
      <p className="text-xs md:text-sm text-muted-foreground">
        Free forever plan • No credit card required
      </p>
    </div>
  );
}

export function HeroSection(): ReactElement {
  return (
    <section
      id="hero"
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
