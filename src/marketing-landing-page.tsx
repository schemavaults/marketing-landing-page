"use client";

import type { FC, ReactElement } from "react";
import { cn } from "@schemavaults/ui";
import type { ImageProps } from "next/image";
import type { default as Link } from "next/link";
import Header from "@/components/Header";

/** Landing Page Sections */
import HeroSection from "@/sections/Hero";
import ExampleSection from "@/sections/Example";
import CoreFeaturesSection from "@/sections/CoreFeaturesSection";
import CallToActionSection from "@/sections/CallToActionSection";
import Footer from "@/sections/Footer";

export interface MarketingLandingPageProps {
  Image: FC<ImageProps>;
  Link: typeof Link;
  logoHref?: string;
}

export function MarketingLandingPage(
  props: MarketingLandingPageProps,
): ReactElement {
  const logoHref: string = props.logoHref ?? "/media/logo.png";
  return (
    <>
      <Header logoHref={logoHref} Image={props.Image} Link={props.Link} />
      <main
        className={cn(
          "w-full overflow-x-hidden min-h-full",
          "flex flex-col gap-0",
        )}
      >
        <HeroSection />
        <CoreFeaturesSection />
        <ExampleSection />
        <CallToActionSection />
      </main>
      <Footer Link={props.Link} Image={props.Image} logoHref={logoHref} />
    </>
  );
}

export default MarketingLandingPage;
