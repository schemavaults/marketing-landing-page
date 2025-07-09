"use client";

import { BackgroundBlur, cn, Wordmark } from "@schemavaults/ui";
import type { ReactElement } from "react";

const backgroundImageHref =
  "https://www.goodfreephotos.com/albums/astrophotography/starry-milky-way-galaxy.jpg";
const description: string =
  "Define your data types once as schemas. Use, re-use and compose them to validate & store data for your workflows, websites, mobile apps, or content management systems.";

function BehindBlurAnimation(): ReactElement {
  return (
    <div className="w-full h-full">
      <img className="object-cover w-full h-full" src={backgroundImageHref} />
    </div>
  );
}

function HeroSectionContent(): ReactElement {
  return (
    <div
      className={cn(
        "w-full h-auto min-h-[95vh]",
        "flex flex-col items-center justify-center",
        "gap-2 md:gap-4",
        "px-4 md:px-8 lg:px-16 xl:px-32",
      )}
    >
      <h2 className="text-4xl">
        Welcome to <Wordmark />
      </h2>
      <p className="max-w-[75vw] md:max-w-[65vw] lg:max-w-[58vw] xl:max-w-[50vw]">
        {description}
      </p>
    </div>
  );
}

export function HeroSection(): ReactElement {
  return (
    <section id="hero" className="h-screen w-screen">
      <BackgroundBlur
        background={BehindBlurAnimation}
        foreground={HeroSectionContent}
        intensity="xs"
      />
    </section>
  );
}

export default HeroSection;
