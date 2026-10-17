"use client";

import type { FC, ReactElement } from "react";
import { cn } from "@schemavaults/ui";
import type { ImageProps } from "next/image";
import type { default as Link } from "next/link";
import Header from "@/components/Header";

import AuthLinksHrefsProvider from "@/providers/AuthLinkHrefsProvider";

/** Landing Page Sections */
import HeroSection from "@/sections/Hero";
import TrustStripSection, { type Testimonial } from "@/sections/TrustStripSection";
import HowItWorksFeaturesFlow from "@/sections/HowItWorksFeaturesFlow";
import CoreFeaturesSection from "@/sections/CoreFeaturesSection";
import CodeExampleSection from "@/sections/CodeExampleSection";
import PricingSection from "@/sections/PricingSection";
import FaqSection from "@/sections/FaqSection";
import CallToActionSection from "@/sections/CallToActionSection";
import Footer, {
  type MarketingLandingPageLegalHrefs,
} from "@/sections/Footer";

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
  /** Optional "About" page linked from the footer. */
  aboutHref?: string;
  /** Footer legal links; each is omitted when its href is not supplied. */
  legalHrefs?: MarketingLandingPageLegalHrefs;
  /**
   * Real, attributable quotes from customers or design partners, rendered
   * directly beneath the hero. Left empty until we have some -- see
   * `TrustStripSection`.
   */
  testimonials?: readonly Testimonial[];
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
              <HeroSection />
              <TrustStripSection testimonials={props.testimonials} />
              <HowItWorksFeaturesFlow />
              <CoreFeaturesSection />
              <CodeExampleSection />
              <PricingSection />
              <FaqSection />
              <CallToActionSection Link={props.Link} />
              <Footer
                Link={props.Link}
                Image={props.Image}
                logoHref={logoHref}
                aboutHref={props.aboutHref}
                legalHrefs={props.legalHrefs}
              />
            </main>
          </AuthLinksHrefsProvider>
        </OrganizationContactEmailAddressesProvider>
      </PrivateBetaContext.Provider>
    </DebugContext.Provider>
  );
}

export default MarketingLandingPage;
