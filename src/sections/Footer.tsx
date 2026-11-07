"use client";

import type { default as LinkComponent } from "next/link";
import { ThemeSelector, Wordmark } from "@schemavaults/ui";
import type { ImageProps } from "next/image";
import type { FC } from "react";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";

interface FooterLegalLink {
  href: string;
  label: string;
}

/**
 * TODO(legal): every one of these is still a placeholder `#` anchor that
 * scrolls to the top of the page. They MUST be pointed at real pages before
 * the public launch — Privacy/Terms/Cookie links are the first thing a
 * procurement or security reviewer clicks on a data-storage vendor's site,
 * and a link that goes nowhere reads as "this company is not ready".
 *
 * Deliberately left as `#` rather than guessed paths so this does not ship a
 * set of 404s; collected here so the fix is one edit.
 */
const legalLinks: readonly FooterLegalLink[] = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Cookie Policy" },
];

export interface FooterProps {
  logoHref: string;
  Link: typeof LinkComponent;
  Image: FC<ImageProps>;
}

export function Footer({ Link, Image, logoHref }: FooterProps) {
  const currentDate = new Date();
  const emails = useOrgEmailAddresses();
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
                  href={`#${MarketingLandingPageSectionIds.SEE_IT_IN_CODE_SECTION}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  See It In Code
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
              <li>
                <Link
                  href={`#${MarketingLandingPageSectionIds.TRUST_SECTION}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Why SchemaVaults
                </Link>
              </li>
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

        <div className="border-t mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground" suppressHydrationWarning>
            © {currentDate.getFullYear()} <Wordmark />. All rights reserved.
          </p>
          <ThemeSelector variant="segmented" size="sm" />
          <div className="flex space-x-4 text-xs text-muted-foreground">
            {/** See the TODO(legal) note on `legalLinks` above. */}
            {legalLinks.map((legalLink: FooterLegalLink, index: number) => (
              <Link
                key={`${legalLink.label}-${index}`}
                href={legalLink.href}
                className="hover:text-foreground"
              >
                {legalLink.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
