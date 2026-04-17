"use client";

import { BackgroundBlur, Button, cn, Wordmark } from "@schemavaults/ui";
import type { ReactElement } from "react";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";

const backgroundImageHref =
  "/media/marketing-landing-page/hero-background.webp";
const tagline: string =
  "Type-safe data for modern apps, AI agents, and workflows.";
const description: string =
  "Define your data types once as schemas. Use, re-use and compose them to validate & store data for your workflows, websites, mobile apps, or content management systems.";

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
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center">
        Welcome to <Wordmark />
      </h2>
      <p className="max-w-[75vw] md:max-w-[65vw] lg:max-w-[58vw] xl:max-w-[50vw] text-center text-lg md:text-xl font-medium">
        {tagline}
      </p>
      <p className="max-w-[75vw] md:max-w-[65vw] lg:max-w-[58vw] xl:max-w-[50vw] text-center text-muted-foreground">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <a href={registerHref}>
          <Button size="lg">Get Started Free</Button>
        </a>
        <a href="#how-it-works-features-flow">
          <Button size="lg" variant="outline">
            See How It Works
          </Button>
        </a>
      </div>
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
