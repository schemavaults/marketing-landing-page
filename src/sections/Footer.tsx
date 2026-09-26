"use client";

import type { default as LinkComponent } from "next/link";
import { ThemeSelector, Wordmark } from "@schemavaults/ui";
import type { ImageProps } from "next/image";
import type { FC, ReactElement } from "react";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";

export interface FooterProps {
  logoHref: string;
  Link: typeof LinkComponent;
  Image: FC<ImageProps>;
  /**
   * Destinations for the legal links in the footer bar. A link is only
   * rendered once it has a real destination — a "Privacy Policy" that goes
   * nowhere costs more credibility with a security reviewer than an absent
   * one, so fill these in rather than pointing them at "#".
   */
  legalHrefs?: Partial<Record<LegalLinkId, string>>;
  /** Destination for the "About" link. Omitted from the footer when unset. */
  aboutHref?: string;
}

export type LegalLinkId = "privacy" | "terms" | "cookies";

const legalLinkLabels: Readonly<Record<LegalLinkId, string>> = {
  privacy: "Privacy Policy",
  terms: "Terms of Service",
  cookies: "Cookie Policy",
};

const legalLinkOrder: readonly LegalLinkId[] = ["privacy", "terms", "cookies"];

export function Footer({
  Link,
  Image,
  logoHref,
  legalHrefs,
  aboutHref,
}: FooterProps): ReactElement {
  const currentDate = new Date();
  const emails = useOrgEmailAddresses();

  const legalLinks: readonly { id: LegalLinkId; href: string }[] =
    legalLinkOrder
      .map((id: LegalLinkId) => ({ id, href: legalHrefs?.[id] }))
      .filter(
        (entry): entry is { id: LegalLinkId; href: string } =>
          typeof entry.href === "string" && entry.href.length > 0,
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
              Define your data types once as schemas, then re-use them across
              your agents, workflows, and apps.
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

        <div className="border-t mt-12 pt-8 flex flex-col gap-4 sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground" suppressHydrationWarning>
            © {currentDate.getFullYear()} <Wordmark />. All rights reserved.
          </p>
          <ThemeSelector variant="segmented" size="sm" />
          {legalLinks.length > 0 && (
            <div className="flex space-x-4 text-xs text-muted-foreground">
              {legalLinks.map(({ id, href }) => (
                <Link key={id} href={href} className="hover:text-foreground">
                  {legalLinkLabels[id]}
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
