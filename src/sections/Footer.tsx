"use client";

import type { default as LinkComponent } from "next/link";
import { ThemeSelector, Wordmark } from "@schemavaults/ui";
import type { ImageProps } from "next/image";
import type { FC, ReactElement } from "react";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";

/**
 * Links to pages that may not exist yet. Anything left undefined is simply not
 * rendered -- a footer link that goes nowhere costs more trust than a missing
 * one, especially for a data-storage vendor.
 */
export interface FooterLegalHrefs {
  privacyPolicy?: string;
  termsOfService?: string;
  cookiePolicy?: string;
}

export interface FooterProps {
  logoHref: string;
  Link: typeof LinkComponent;
  Image: FC<ImageProps>;
  aboutHref?: string;
  docsHref?: string;
  statusPageHref?: string;
  legalHrefs?: FooterLegalHrefs;
}

export function Footer({
  Link,
  Image,
  logoHref,
  aboutHref,
  docsHref,
  statusPageHref,
  legalHrefs,
}: FooterProps): ReactElement {
  const currentDate = new Date();
  const emails = useOrgEmailAddresses();

  interface LegalLink {
    label: string;
    href?: string;
  }

  const legalLinks: readonly Required<LegalLink>[] = (
    [
      { label: "Privacy Policy", href: legalHrefs?.privacyPolicy },
      { label: "Terms of Service", href: legalHrefs?.termsOfService },
      { label: "Cookie Policy", href: legalHrefs?.cookiePolicy },
    ] satisfies LegalLink[]
  ).filter(
    (link: LegalLink): link is Required<LegalLink> =>
      typeof link.href === "string" && link.href.length > 0,
  );

  const linkClassName: string = "text-muted-foreground hover:text-foreground";

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
                  className={linkClassName}
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href={`#${MarketingLandingPageSectionIds.FEATURES_SECTION}`}
                  className={linkClassName}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href={`#${MarketingLandingPageSectionIds.PRICING_SECTION}`}
                  className={linkClassName}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href={`#${MarketingLandingPageSectionIds.FAQ_SECTION}`}
                  className={linkClassName}
                >
                  FAQ
                </Link>
              </li>
              {docsHref && (
                <li>
                  <Link href={docsHref} className={linkClassName}>
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
                  <Link href={aboutHref} className={linkClassName}>
                    About
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href="https://mail.schemavaults.com"
                  className={linkClassName}
                >
                  Mailing Lists
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${emails.salesEmail}`}
                  className={linkClassName}
                >
                  Talk to Sales
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${emails.supportEmail}`}
                  className={linkClassName}
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
                  className={linkClassName}
                >
                  Auth Help Center
                </Link>
              </li>
              {statusPageHref && (
                <li>
                  <Link href={statusPageHref} className={linkClassName}>
                    Status
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href={`mailto:${emails.supportEmail}`}
                  className={linkClassName}
                >
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col gap-4 sm:flex-row sm:gap-0 justify-between items-center">
          <p className="text-xs text-muted-foreground" suppressHydrationWarning>
            © {currentDate.getFullYear()} <Wordmark />. All rights reserved.
          </p>
          <ThemeSelector variant="segmented" size="sm" />
          {legalLinks.length > 0 ? (
            <div className="flex space-x-4 text-xs text-muted-foreground">
              {legalLinks.map(({ label, href }) => (
                <Link key={label} href={href} className="hover:text-foreground">
                  {label}
                </Link>
              ))}
            </div>
          ) : (
            <span className="text-xs text-muted-foreground">
              Questions about your data?{" "}
              <Link
                href={`mailto:${emails.supportEmail}`}
                className="hover:text-foreground underline"
              >
                Ask us
              </Link>
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
