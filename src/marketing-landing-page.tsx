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
import SocialProofSection from "@/sections/SocialProofSection";
import PricingSection from "@/sections/PricingSection";
import FaqSection from "@/sections/FaqSection";
import CallToActionSection from "@/sections/CallToActionSection";
import Footer from "@/sections/Footer";
import type {
  MarketingSiteCompanyHrefs,
  MarketingSiteLegalHrefs,
} from "@/sections/Footer";
import type { SocialProofSectionProps } from "@/sections/SocialProofSection";

/** Context Providers */
import DebugContext from "@/contexts/DebugContext";
import OrganizationContactEmailAddressesProvider from "@/providers/OrganizationContactEmailAddressesProvider";
import type { AuthLinkHrefsContextType } from "@/contexts/AuthLinkHrefsContext";
import type { IOrganizationContactEmailAddressesContextType } from "@/contexts/OrganizationContactEmailAddressesContext";
import PrivateBetaContext from "@/contexts/PrivateBetaContext";

export interface MarketingLandingPageProps
  extends
    AuthLinkHrefsContextType,
    IOrganizationContactEmailAddressesContextType,
    MarketingSiteLegalHrefs,
    MarketingSiteCompanyHrefs {
  Image: FC<ImageProps>;
  Link: typeof Link;
  logoHref?: string;
  brandHref: string;
  debug?: boolean;
  privateBeta?: boolean;
  /**
   * Real quotes, logos and metrics. The social proof section renders nothing
   * at all when this is omitted, so the page never ships placeholder proof —
   * but supplying even one named quote is the highest-leverage change
   * available to this page.
   */
  socialProof?: Omit<SocialProofSectionProps, "Image">;
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
              <HowItWorksFeaturesFlow />
              <CoreFeaturesSection />
              <SocialProofSection {...props.socialProof} Image={props.Image} />
              <PricingSection />
              <FaqSection />
              <CallToActionSection Link={props.Link} />
              <Footer
                Link={props.Link}
                Image={props.Image}
                logoHref={logoHref}
                privacyPolicyHref={props.privacyPolicyHref}
                termsOfServiceHref={props.termsOfServiceHref}
                cookiePolicyHref={props.cookiePolicyHref}
                aboutHref={props.aboutHref}
                blogHref={props.blogHref}
                careersHref={props.careersHref}
                docsHref={props.docsHref}
                statusHref={props.statusHref}
              />
            </main>
          </AuthLinksHrefsProvider>
        </OrganizationContactEmailAddressesProvider>
      </PrivateBetaContext.Provider>
    </DebugContext.Provider>
  );
}

export default MarketingLandingPage;
