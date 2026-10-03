"use client";

import type { default as LinkComponent } from "next/link";
import { ThemeSelector, Wordmark } from "@schemavaults/ui";
import type { ImageProps } from "next/image";
import type { FC, ReactElement } from "react";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";

export interface LandingPageLegalHrefs {
  privacyPolicy?: string;
  termsOfService?: string;
  cookiePolicy?: string;
}

export interface FooterProps {
  logoHref: string;
  Link: typeof LinkComponent;
  Image: FC<ImageProps>;
  /**
   * Links to the published legal pages. Each is omitted from the footer until
   * a real URL is supplied — a `href="#"` placeholder reads as a broken or
   * missing policy, which is the opposite of reassuring on a page that asks
   * for an email address.
   */
  legalHrefs?: LandingPageLegalHrefs;
  /** Optional link to an about/company page. Omitted when not supplied. */
  aboutHref?: string;
  /** Optional link to developer documentation. Omitted when not supplied. */
  docsHref?: string;
}

const footerLinkClassName: string =
  "text-muted-foreground hover:text-foreground";

export function Footer({
  Link,
  Image,
  logoHref,
  legalHrefs,
  aboutHref,
  docsHref,
}: FooterProps): ReactElement {
  const currentDate = new Date();
  const emails = useOrgEmailAddresses();

  const legalLinks: readonly { label: string; href: string }[] = [
    { label: "Privacy Policy", href: legalHrefs?.privacyPolicy },
    { label: "Terms of Service", href: legalHrefs?.termsOfService },
    { label: "Cookie Policy", href: legalHrefs?.cookiePolicy },
  ].filter(
    (link): link is { label: string; href: string } =>
      typeof link.href === "string" && link.href.length > 0,
  );

  return (
    <footer className="border-t bg-muted/50">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src={logoHref}
                alt="SchemaVaults Logo"
                width={40}
                height={40}
              />
              <Wordmark className="text-xl" />
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              The next-generation data validation, storage, and workflow
              platform for the modern AI age.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`}
                  className={footerLinkClassName}
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href={`#${MarketingLandingPageSectionIds.FEATURES_SECTION}`}
                  className={footerLinkClassName}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href={`#${MarketingLandingPageSectionIds.SOCIAL_PROOF_SECTION}`}
                  className={footerLinkClassName}
                >
                  Why SchemaVaults
                </Link>
              </li>
              <li>
                <Link
                  href={`#${MarketingLandingPageSectionIds.PRICING_SECTION}`}
                  className={footerLinkClassName}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href={`#${MarketingLandingPageSectionIds.FAQ_SECTION}`}
                  className={footerLinkClassName}
                >
                  FAQ
                </Link>
              </li>
              {docsHref && (
                <li>
                  <Link href={docsHref} className={footerLinkClassName}>
                    Documentation
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="space-y-2 text-sm">
              {aboutHref && (
                <li>
                  <Link href={aboutHref} className={footerLinkClassName}>
                    About
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href="https://mail.schemavaults.com"
                  className={footerLinkClassName}
                >
                  Mailing Lists
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${emails.supportEmail}`}
                  className={footerLinkClassName}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={"https://auth.schemavaults.com/help"}
                  className={footerLinkClassName}
                >
                  Auth Help Center
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${emails.supportEmail}`}
                  className={footerLinkClassName}
                >
                  Contact Support
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${emails.salesEmail}`}
                  className={footerLinkClassName}
                >
                  Contact Sales
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <p className="text-xs text-muted-foreground" suppressHydrationWarning>
            © {currentDate.getFullYear()} <Wordmark />. All rights reserved.
          </p>
          <ThemeSelector variant="segmented" size="sm" />
          {legalLinks.length > 0 && (
            <div className="flex space-x-4 text-xs text-muted-foreground">
              {legalLinks.map(({ label, href }) => (
                <Link key={label} href={href} className="hover:text-foreground">
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
