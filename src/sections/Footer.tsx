"use client";

import type { default as LinkComponent } from "next/link";
import { ThemeSelector, Wordmark } from "@schemavaults/ui";
import type { ImageProps } from "next/image";
import type { FC, ReactElement } from "react";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";

/**
 * Hrefs for the legal documents linked in the footer bar.
 *
 * Each one is optional and the corresponding link is omitted when it is not
 * supplied: these previously pointed at `#`, and a policy link that goes
 * nowhere reads as carelessness about exactly the thing a prospective customer
 * is trying to evaluate.
 */
export interface MarketingLandingPageLegalHrefs {
  privacyPolicyHref?: string;
  termsOfServiceHref?: string;
  cookiePolicyHref?: string;
}

export interface FooterProps {
  logoHref: string;
  Link: typeof LinkComponent;
  Image: FC<ImageProps>;
  /** Optional "About" page; the link is hidden when not provided. */
  aboutHref?: string;
  legalHrefs?: MarketingLandingPageLegalHrefs;
}

export function Footer({
  Link,
  Image,
  logoHref,
  aboutHref,
  legalHrefs,
}: FooterProps): ReactElement {
  const currentDate = new Date();
  const emails = useOrgEmailAddresses();

  const legalLinks: readonly { label: string; href: string }[] = [
    { label: "Privacy Policy", href: legalHrefs?.privacyPolicyHref },
    { label: "Terms of Service", href: legalHrefs?.termsOfServiceHref },
    { label: "Cookie Policy", href: legalHrefs?.cookiePolicyHref },
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
                  className="text-muted-foreground hover:text-foreground"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href={`#${MarketingLandingPageSectionIds.FEATURES_SECTION}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href={`#${MarketingLandingPageSectionIds.CODE_EXAMPLE_SECTION}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  See the code
                </Link>
              </li>
              <li>
                <Link
                  href={`#${MarketingLandingPageSectionIds.PRICING_SECTION}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href={`#${MarketingLandingPageSectionIds.FAQ_SECTION}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  FAQ
                </Link>
              </li>
              {/*<li>
                <Link
                  href="https://docs.schemavaults.com"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  API Reference
                </Link>
              </li>*/}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="space-y-2 text-sm">
              {aboutHref && (
                <li>
                  <Link
                    href={aboutHref}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href="https://mail.schemavaults.com"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Mailing Lists
                </Link>
              </li>
              {/* <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Blog
                </Link>
              </li> */}
              {/* <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Careers
                </Link>
              </li> */}
              <li>
                <Link
                  href={`mailto:${emails.salesEmail}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Talk to Sales
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${emails.supportEmail}`}
                  className="text-muted-foreground hover:text-foreground"
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
                  className="text-muted-foreground hover:text-foreground"
                >
                  Auth Help Center
                </Link>
              </li>
              {/* <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Community
                </Link>
              </li> */}
              {/* <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Status
                </Link>
              </li> */}
              <li>
                <Link
                  href={`mailto:${emails.supportEmail}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground" suppressHydrationWarning>
            © {currentDate.getFullYear()} <Wordmark />. All rights reserved.
          </p>
          <ThemeSelector variant="segmented" size="sm" />
          {legalLinks.length > 0 && (
            <div className="flex space-x-4 text-xs text-muted-foreground">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-foreground"
                >
                  {link.label}
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
