"use client";

import type { FC, ReactElement } from "react";
import { cn } from "@schemavaults/ui";
import type { ImageProps } from "next/image";
import type { default as Link } from "next/link";
import Header from "@/components/Header";

import AuthLinksHrefsProvider from "@/providers/AuthLinkHrefsProvider";

/** Landing Page Sections */
import HeroSection from "@/sections/Hero";
import HowItWorksFeaturesFlow from "@/sections/HowItWorksFeaturesFlow";
import CoreFeaturesSection from "@/sections/CoreFeaturesSection";
import PricingSection from "@/sections/PricingSection";
import FAQSection from "@/sections/FAQSection";
import CallToActionSection from "@/sections/CallToActionSection";
import Footer from "@/sections/Footer";

/** Context Providers */
import DebugContext from "@/contexts/DebugContext";
import OrganizationContactEmailAddressesProvider from "@/providers/OrganizationContactEmailAddressesProvider";
import type { AuthLinkHrefsContextType } from "@/contexts/AuthLinkHrefsContext";
import type { IOrganizationContactEmailAddressesContextType } from "@/contexts/OrganizationContactEmailAddressesContext";
import PrivateBetaContext from "@/contexts/PrivateBetaContext";

export interface MarketingLandingPageProps
  extends
    AuthLinkHrefsContextType,
    IOrganizationContactEmailAddressesContextType {
  Image: FC<ImageProps>;
  Link: typeof Link;
  logoHref?: string;
  brandHref: string;
  debug?: boolean;
  privateBeta?: boolean;
}

export function MarketingLandingPage(
  props: MarketingLandingPageProps,
): ReactElement {
  const debug: boolean = props.debug ?? false;
  const logoHref: string = props.logoHref ?? "/media/logo.png";
  return (
    <DebugContext.Provider value={debug}>
      <PrivateBetaContext.Provider
        value={
          typeof props.privateBeta === "boolean" ? props.privateBeta : false
        }
      >
        <OrganizationContactEmailAddressesProvider
          salesEmail={props.salesEmail}
          supportEmail={props.supportEmail}
        >
          <AuthLinksHrefsProvider
            loginHref={props.loginHref}
            registerHref={props.registerHref}
          >
            {/*
              Keyboard users previously had to tab through the whole header
              (and the theme selector) before reaching the hero CTA.
            */}
            <a
              href="#main-content"
              className={cn(
                "sr-only focus:not-sr-only",
                "focus:fixed focus:top-2 focus:left-2 focus:z-[60]",
                "focus:rounded-md focus:bg-background focus:px-4 focus:py-2",
                "focus:ring-2 focus:ring-primary",
              )}
            >
              Skip to main content
            </a>
            <Header
              brandHref={props.brandHref}
              logoHref={logoHref}
              Image={props.Image}
              Link={props.Link}
            />
            <main
              id="main-content"
              className={cn(
                "w-full overflow-x-hidden min-h-screen h-auto",
                "flex flex-col gap-0",
              )}
            >
              <HeroSection />
              <HowItWorksFeaturesFlow />
              <CoreFeaturesSection />
              <PricingSection />
              {/*
                FAQ sits between pricing and the waitlist so that the questions
                that stop people signing up are answered immediately before the
                form they are being asked to fill in.
              */}
              <FAQSection />
              <CallToActionSection Link={props.Link} />
              <Footer
                Link={props.Link}
                Image={props.Image}
                logoHref={logoHref}
              />
            </main>
          </AuthLinksHrefsProvider>
        </OrganizationContactEmailAddressesProvider>
      </PrivateBetaContext.Provider>
    </DebugContext.Provider>
  );
}

export default MarketingLandingPage;
