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
import CallToActionSection from "@/sections/CallToActionSection";
import Footer from "@/sections/Footer";
import { DebugContext } from "@/contexts/DebugContext";
import OrganizationContactEmailAddressesProvider from "@/providers/OrganizationContactEmailAddressesProvider";
import type { AuthLinkHrefsContextType } from "@/contexts/AuthLinkHrefsContext";
import { IOrganizationContactEmailAddressesContextType } from "./contexts/OrganizationContactEmailAddressesContext";

export interface MarketingLandingPageProps
  extends AuthLinkHrefsContextType,
    IOrganizationContactEmailAddressesContextType {
  Image: FC<ImageProps>;
  Link: typeof Link;
  logoHref?: string;
  brandHref: string;
  debug?: boolean;
}

export function MarketingLandingPage(
  props: MarketingLandingPageProps,
): ReactElement {
  const debug: boolean = props.debug ?? false;
  const logoHref: string = props.logoHref ?? "/media/logo.png";
  return (
    <DebugContext.Provider value={debug}>
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
            <HeroSection />
            <HowItWorksFeaturesFlow />
            <CoreFeaturesSection />
            <PricingSection />
            <CallToActionSection Link={props.Link} />
            <Footer Link={props.Link} Image={props.Image} logoHref={logoHref} />
          </main>
        </AuthLinksHrefsProvider>
      </OrganizationContactEmailAddressesProvider>
    </DebugContext.Provider>
  );
}

export default MarketingLandingPage;
