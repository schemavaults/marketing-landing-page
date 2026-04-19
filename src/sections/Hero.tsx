"use client";

import { BackgroundBlur, Button, cn, Wordmark } from "@schemavaults/ui";
import { ArrowRight, Sparkles } from "lucide-react";
import type { ReactElement } from "react";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";

const backgroundImageHref =
  "/media/marketing-landing-page/hero-background.webp";
const headline: string = "Type-safe data, from schema to storage.";
const description: string =
  "Define your data types once as schemas. Use, re-use and compose them to validate & store data for your workflows, websites, mobile apps, or content management systems.";

function HeroSectionBackgroundContent(): ReactElement {
  return (
    <div className="w-screen h-screen relative">
      <img className="object-cover w-full h-full" src={backgroundImageHref} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/60" />
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
        "gap-4 md:gap-6",
        "px-4 md:px-8 lg:px-16 xl:px-32",
      )}
    >
      <div
        className={cn(
          "inline-flex items-center gap-2",
          "rounded-full border border-primary/20 bg-background/70 backdrop-blur",
          "px-3 py-1 text-xs md:text-sm text-foreground/80",
          "shadow-sm",
        )}
      >
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        Now accepting early-access signups
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center">
        Welcome to <Wordmark />
      </h1>
      <p className="text-xl md:text-2xl font-medium text-center max-w-[80vw] md:max-w-[60vw] lg:max-w-[50vw]">
        {headline}
      </p>
      <p className="max-w-[75vw] md:max-w-[65vw] lg:max-w-[58vw] xl:max-w-[50vw] text-center text-muted-foreground md:text-lg">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
        <a href={registerHref}>
          <Button size="lg" className="w-full sm:w-auto">
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </a>
        <a href="#how-it-works-features-flow">
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            See How It Works
          </Button>
        </a>
      </div>
      <p className="text-xs md:text-sm text-muted-foreground mt-1">
        No credit card required · Free tier forever
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
