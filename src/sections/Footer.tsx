"use client";

import type { default as LinkComponent } from "next/link";
import { ThemeSelector, Wordmark } from "@schemavaults/ui";
import type { ImageProps } from "next/image";
import type { FC, ReactElement, ReactNode } from "react";
import useOrgEmailAddresses from "@/hooks/useOrgEmailAddresses";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";

/**
 * Optional external destinations. Anything omitted is simply not rendered: a
 * link that goes to `#` is worse than an absent link, because a visitor who
 * clicks "Privacy Policy" and lands back on the same page learns that the
 * company is careless with exactly the thing they were checking.
 */
export interface MarketingSiteLegalHrefs {
  privacyPolicyHref?: string;
  termsOfServiceHref?: string;
  cookiePolicyHref?: string;
}

export interface MarketingSiteCompanyHrefs {
  aboutHref?: string;
  blogHref?: string;
  careersHref?: string;
  docsHref?: string;
  statusHref?: string;
}

export interface FooterProps
  extends MarketingSiteLegalHrefs,
    MarketingSiteCompanyHrefs {
  logoHref: string;
  Link: typeof LinkComponent;
  Image: FC<ImageProps>;
  mailingListsHref?: string;
  authHelpCenterHref?: string;
}

const DEFAULT_MAILING_LISTS_HREF: string = "https://mail.schemavaults.com";
const DEFAULT_AUTH_HELP_CENTER_HREF: string =
  "https://auth.schemavaults.com/help";

export function Footer({
  Link,
  Image,
  logoHref,
  privacyPolicyHref,
  termsOfServiceHref,
  cookiePolicyHref,
  aboutHref,
  blogHref,
  careersHref,
  docsHref,
  statusHref,
  mailingListsHref = DEFAULT_MAILING_LISTS_HREF,
  authHelpCenterHref = DEFAULT_AUTH_HELP_CENTER_HREF,
}: FooterProps): ReactElement {
  const currentDate = new Date();
  const emails = useOrgEmailAddresses();

  function FooterLink({
    href,
    children,
  }: {
    href?: string;
    children: ReactNode;
  }): ReactElement | null {
    if (!href) return null;
    return (
      <li>
        <Link
          href={href}
          className="text-muted-foreground hover:text-foreground"
        >
          {children}
        </Link>
      </li>
    );
  }

  const legalLinks: readonly { href?: string; label: string }[] = [
    { href: privacyPolicyHref, label: "Privacy Policy" },
    { href: termsOfServiceHref, label: "Terms of Service" },
    { href: cookiePolicyHref, label: "Cookie Policy" },
  ];
  const renderableLegalLinks = legalLinks.filter(
    (link): link is { href: string; label: string } => !!link.href,
  );

  return (
    <footer className="w-full border-t bg-muted/50">
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
              Define your data once, then let every app, workflow and AI agent
              you build read and write exactly the shapes you designed.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Product</h4>
            <ul className="space-y-2 text-sm">
              <FooterLink
                href={`#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`}
              >
                How It Works
              </FooterLink>
              <FooterLink
                href={`#${MarketingLandingPageSectionIds.FEATURES_SECTION}`}
              >
                Features
              </FooterLink>
              <FooterLink
                href={`#${MarketingLandingPageSectionIds.PRICING_SECTION}`}
              >
                Pricing
              </FooterLink>
              <FooterLink href={`#${MarketingLandingPageSectionIds.FAQ_SECTION}`}>
                FAQ
              </FooterLink>
              <FooterLink href={docsHref}>Documentation</FooterLink>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="space-y-2 text-sm">
              <FooterLink href={aboutHref}>About</FooterLink>
              <FooterLink href={mailingListsHref}>Mailing Lists</FooterLink>
              <FooterLink href={blogHref}>Blog</FooterLink>
              <FooterLink href={careersHref}>Careers</FooterLink>
              <FooterLink href={`mailto:${emails.salesEmail}`}>
                Talk to Sales
              </FooterLink>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Support</h4>
            <ul className="space-y-2 text-sm">
              <FooterLink href={authHelpCenterHref}>
                Auth Help Center
              </FooterLink>
              <FooterLink href={statusHref}>Status</FooterLink>
              <FooterLink href={`mailto:${emails.supportEmail}`}>
                Contact Support
              </FooterLink>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground" suppressHydrationWarning>
            © {currentDate.getFullYear()} <Wordmark />. All rights reserved.
          </p>
          <ThemeSelector variant="segmented" size="sm" />
          {renderableLegalLinks.length > 0 && (
            <div className="flex space-x-4 text-xs text-muted-foreground">
              {renderableLegalLinks.map((link) => (
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
