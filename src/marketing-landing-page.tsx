"use client";

import type { FC, ReactElement } from "react";
import { cn } from "@schemavaults/ui";
import type { ImageProps } from "next/image";
import type { default as Link } from "next/link";
import Header from "@/components/Header";

import AuthLinksHrefsProvider from "@/providers/AuthLinkHrefsProvider";

/** Landing Page Sections */
import HeroSection from "@/sections/Hero";
import HowItWorksFeaturesFlow from "./sections/HowItWorksFeaturesFlow";
import CoreFeaturesSection from "@/sections/CoreFeaturesSection";
import PricingSection from "./sections/PricingSection";
import CallToActionSection from "@/sections/CallToActionSection";
import Footer from "@/sections/Footer";
import { DebugContext } from "./contexts/DebugContext";

export interface MarketingLandingPageProps {
  Image: FC<ImageProps>;
  Link: typeof Link;
  logoHref?: string;
  brandHref: string;
  loginHref: string;
  registerHref: string;
  debug?: boolean;
}

export function MarketingLandingPage(
  props: MarketingLandingPageProps,
): ReactElement {
  const debug: boolean = props.debug ?? false;
  const logoHref: string = props.logoHref ?? "/media/logo.png";
  return (
    <DebugContext.Provider value={debug}>
      <AuthLinksHrefsProvider
        loginHref={props.loginHref}
        registerHref={props.registerHref}
      >
        <Header
          brandHref={props.brandHref}
          logoHref={logoHref}
          Image={props.Image}
          Link={props.Link}
        />
        <main
          className={cn(
            "w-full overflow-x-hidden min-h-screen h-auto",
            "flex flex-col gap-0",
          )}
        >
          <HeroSection />
          <HowItWorksFeaturesFlow />
          <CoreFeaturesSection />
          <PricingSection />
          <CallToActionSection />
          <Footer Link={props.Link} Image={props.Image} logoHref={logoHref} />
        </main>
      </AuthLinksHrefsProvider>
    </DebugContext.Provider>
  );
}

export default MarketingLandingPage;
