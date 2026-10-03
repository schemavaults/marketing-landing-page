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
import SocialProofSection, {
  type CustomerLogo,
  type Testimonial,
} from "@/sections/SocialProofSection";
import PricingSection from "@/sections/PricingSection";
import FaqSection from "@/sections/FaqSection";
import CallToActionSection from "@/sections/CallToActionSection";
import Footer, { type LandingPageLegalHrefs } from "@/sections/Footer";

/** Context Providers */
import DebugContext from "@/contexts/DebugContext";
import OrganizationContactEmailAddressesProvider from "@/providers/OrganizationContactEmailAddressesProvider";
import type { AuthLinkHrefsContextType } from "@/contexts/AuthLinkHrefsContext";
import type { IOrganizationContactEmailAddressesContextType } from "@/contexts/OrganizationContactEmailAddressesContext";
import PrivateBetaContext from "@/contexts/PrivateBetaContext";
import ConversionEventsContext, {
  type TrackConversionEventFunction,
} from "@/contexts/ConversionEventsContext";

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
  /**
   * Called for each landing page funnel event (CTA clicks, waitlist
   * submissions). Wire this to your analytics provider to find out which
   * calls to action actually convert; defaults to a no-op.
   */
  onConversionEvent?: TrackConversionEventFunction;
  /** Real customer/design-partner quotes. Nothing renders when omitted. */
  testimonials?: readonly Testimonial[];
  /** Real customer/design-partner logos. Nothing renders when omitted. */
  customerLogos?: readonly CustomerLogo[];
  /** Published legal pages. Each footer link is hidden until supplied. */
  legalHrefs?: LandingPageLegalHrefs;
  /** Optional about/company page link for the footer. */
  aboutHref?: string;
  /** Optional developer documentation link for the footer. */
  docsHref?: string;
}

const noopConversionEventHandler: TrackConversionEventFunction = () => {
  /** no-op */
};

export function MarketingLandingPage(
  props: MarketingLandingPageProps,
): ReactElement {
  const debug: boolean = props.debug ?? false;
  const logoHref: string = props.logoHref ?? "/media/logo.png";
  return (
    <DebugContext.Provider value={debug}>
      <ConversionEventsContext.Provider
        value={props.onConversionEvent ?? noopConversionEventHandler}
      >
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
                <HowItWorksFeaturesFlow />
                <CoreFeaturesSection />
                <SocialProofSection
                  testimonials={props.testimonials}
                  logos={props.customerLogos}
                  Image={props.Image}
                />
                <PricingSection />
                <FaqSection />
                <CallToActionSection Link={props.Link} />
                <Footer
                  Link={props.Link}
                  Image={props.Image}
                  logoHref={logoHref}
                  legalHrefs={props.legalHrefs}
                  aboutHref={props.aboutHref}
                  docsHref={props.docsHref}
                />
              </main>
            </AuthLinksHrefsProvider>
          </OrganizationContactEmailAddressesProvider>
        </PrivateBetaContext.Provider>
      </ConversionEventsContext.Provider>
    </DebugContext.Provider>
  );
}

export default MarketingLandingPage;
