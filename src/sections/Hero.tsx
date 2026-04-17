"use client";

import { BackgroundBlur, Button, cn, Wordmark } from "@schemavaults/ui";
import { ArrowRight, Check } from "lucide-react";
import type { ReactElement } from "react";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";

const backgroundImageHref =
  "/media/marketing-landing-page/hero-background.webp";

const tagline: string =
  "The type-safe data platform for the AI age.";

const description: string =
  "Define your data types once as schemas. Use, re-use and compose them to validate & store data for your workflows, websites, mobile apps, or content management systems.";

const valueProps: readonly string[] = [
  "End-to-end type safety from schema to agent",
  "Cloud, in-memory, or self-hosted vaults",
  "No code required — talk to your data",
];

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
        "gap-4 md:gap-6",
        "px-4 md:px-8 lg:px-16 xl:px-32",
      )}
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl text-center font-bold tracking-tight">
        Welcome to <Wordmark />
      </h1>
      <p className="text-xl md:text-2xl text-center font-medium max-w-[80vw] md:max-w-[60vw]">
        {tagline}
      </p>
      <p className="max-w-[75vw] md:max-w-[65vw] lg:max-w-[58vw] xl:max-w-[50vw] text-center text-muted-foreground">
        {description}
      </p>
      <ul className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-2">
        {valueProps.map((prop) => (
          <li
            key={prop}
            className="flex items-center gap-2 text-sm md:text-base"
          >
            <Check className="h-4 w-4 text-primary shrink-0" />
            <span>{prop}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
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
