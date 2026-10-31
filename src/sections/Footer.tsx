"use client";

import type { default as LinkComponent } from "next/link";
import { ThemeSelector, Wordmark } from "@schemavaults/ui";
import type { ImageProps } from "next/image";
import type { FC, ReactElement } from "react";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";

/**
 * Hrefs for pages that live outside this component. Each one is optional, and
 * a link is omitted entirely when its href is not supplied.
 *
 * These used to be hard-coded as `href="#"`. A policy link that goes nowhere is
 * worse than no link at all: on a product whose whole proposition is holding
 * other people's data, a dead "Privacy Policy" is the single fastest way to
 * lose a security-conscious evaluator, and search engines treat empty-fragment
 * links as a quality signal too.
 */
export interface SiteLegalLinkHrefs {
  privacyPolicyHref?: string;
  termsOfServiceHref?: string;
  cookiePolicyHref?: string;
  aboutHref?: string;
}

export interface FooterProps extends SiteLegalLinkHrefs {
  logoHref: string;
  Link: typeof LinkComponent;
  Image: FC<ImageProps>;
}

export function Footer({
  Link,
  Image,
  logoHref,
  privacyPolicyHref,
  termsOfServiceHref,
  cookiePolicyHref,
  aboutHref,
}: FooterProps): ReactElement {
  const currentDate = new Date();
  const emails = useOrgEmailAddresses();
  const privateBeta: boolean = usePrivateBeta();

  const legalLinks: readonly { label: string; href: string }[] = (
    [
      { label: "Privacy Policy", href: privacyPolicyHref },
      { label: "Terms of Service", href: termsOfServiceHref },
      { label: "Cookie Policy", href: cookiePolicyHref },
    ] as const
  ).flatMap(({ label, href }) =>
    typeof href === "string" && href.length > 0 ? [{ label, href }] : [],
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
              Schema-first data validation, storage, and workflows — one
              definition your agents, apps, and pipelines all share.
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
              {privateBeta && (
                <li>
                  <Link
                    href={`#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`}
                    className={linkClassName}
                  >
                    Join the waitlist
                  </Link>
                </li>
              )}
              {/*<li>
                <Link
                  href="https://docs.schemavaults.com"
                  className={linkClassName}
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className={linkClassName}>
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
                  Contact Sales
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

        <div className="border-t mt-12 pt-8 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <p className="text-xs text-muted-foreground" suppressHydrationWarning>
            © {currentDate.getFullYear()} <Wordmark />. All rights reserved.
          </p>
          <ThemeSelector variant="segmented" size="sm" />
          {legalLinks.length > 0 && (
            <ul className="flex space-x-4 text-xs text-muted-foreground list-none p-0 m-0">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-foreground">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
