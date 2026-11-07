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
import SeeItInCodeSection from "@/sections/SeeItInCodeSection";
import CoreFeaturesSection from "@/sections/CoreFeaturesSection";
import TrustSection from "@/sections/TrustSection";
import PricingSection from "@/sections/PricingSection";
import FaqSection from "@/sections/FaqSection";
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
              {/*
                Section order follows the question a prospect asks next:
                hook (Hero) -> how does it work (HowItWorks) -> show me
                (SeeItInCode) -> what else (CoreFeatures) -> can I trust it
                (Trust) -> what does it cost (Pricing) -> but what about...
                (Faq) -> convert (CallToAction).
              */}
              <HeroSection />
              <HowItWorksFeaturesFlow />
              <SeeItInCodeSection />
              <CoreFeaturesSection />
              <TrustSection />
              <PricingSection />
              <FaqSection />
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
