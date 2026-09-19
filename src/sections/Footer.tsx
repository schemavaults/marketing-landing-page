"use client";

import type { default as LinkComponent } from "next/link";
import { ThemeSelector, Wordmark } from "@schemavaults/ui";
import type { ImageProps } from "next/image";
import type { FC, ReactElement } from "react";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";

/**
 * Destinations for the company/legal links in the footer.
 *
 * These default to `"#"` so that existing consumers keep today's behaviour,
 * but every consuming app should pass real URLs: a dead "Privacy Policy" link
 * is a meaningful trust signal to lose on a page selling data storage.
 */
export interface FooterLegalHrefs {
  about?: string;
  privacyPolicy?: string;
  termsOfService?: string;
  cookiePolicy?: string;
}

export interface FooterProps {
  logoHref: string;
  Link: typeof LinkComponent;
  Image: FC<ImageProps>;
  legalHrefs?: FooterLegalHrefs;
}

export function Footer({
  Link,
  Image,
  logoHref,
  legalHrefs,
}: FooterProps): ReactElement {
  const currentDate = new Date();
  const emails = useOrgEmailAddresses();

  const aboutHref: string = legalHrefs?.about ?? "#";
  const legalLinks: readonly { href: string; label: string }[] = [
    { href: legalHrefs?.privacyPolicy ?? "#", label: "Privacy Policy" },
    { href: legalHrefs?.termsOfService ?? "#", label: "Terms of Service" },
    { href: legalHrefs?.cookiePolicy ?? "#", label: "Cookie Policy" },
  ];

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
              The schema-first data platform for AI agents, workflows, and apps.
              Define your data once, then validate, store and re-use it
              everywhere.
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
                  href={aboutHref}
                  className="text-muted-foreground hover:text-foreground"
                >
                  About
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
                  href={`mailto:${emails.salesEmail}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact Sales
                </Link>
              </li>
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

        <div className="border-t mt-12 pt-8 flex flex-col gap-4 sm:flex-row sm:justify-between items-center">
          <p className="text-xs text-muted-foreground" suppressHydrationWarning>
            &copy; {currentDate.getFullYear()} <Wordmark />. All rights
            reserved.
          </p>
          <ThemeSelector variant="segmented" size="sm" />
          <div className="flex space-x-4 text-xs text-muted-foreground">
            {legalLinks.map(({ href, label }) => (
              <Link key={label} href={href} className="hover:text-foreground">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
