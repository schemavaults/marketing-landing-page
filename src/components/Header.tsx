"use client";

import type { default as Link } from "next/link";
import { Button, cn, ThemeSelector, Wordmark } from "@schemavaults/ui";
import type { FC, ReactElement } from "react";
import type { ImageProps } from "next/image";
import useLoginPageHref from "@/hooks/useLoginPageHref";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import useTrackConversionEvent from "@/hooks/useTrackConversionEvent";
import { MobileDropdownMenu } from "./MobileDropdownMenu";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";

export interface HeaderProps {
  brandHref: string;
  logoHref: string;
  Image: FC<ImageProps>;
  Link: typeof Link;
}

export const headerNavigationLinks: readonly {
  id: MarketingLandingPageSectionIds;
  label: string;
}[] = [
  {
    id: MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION,
    label: "How It Works",
  },
  {
    id: MarketingLandingPageSectionIds.FEATURES_SECTION,
    label: "Features",
  },
  {
    id: MarketingLandingPageSectionIds.PRICING_SECTION,
    label: "Pricing",
  },
  {
    id: MarketingLandingPageSectionIds.FAQ_SECTION,
    label: "FAQ",
  },
];

export function Header({
  brandHref,
  logoHref,
  Image,
  Link,
}: HeaderProps): ReactElement {
  const loginHref: string = useLoginPageHref();
  const registerHref: string = useRegisterPageHref();
  const privateBeta: boolean = usePrivateBeta();
  const track = useTrackConversionEvent();

  // Registering is invite-gated during the private beta, so the persistent
  // header CTA points at the thing a visitor can actually do.
  const ctaLabel: string = privateBeta ? "Request an invite" : "Get Started";
  const shortCtaLabel: string = privateBeta ? "Get invite" : "Start";
  const ctaHref: string = privateBeta
    ? `#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`
    : registerHref;

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50",
        "w-full",
        "border-b",
        "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "px-2 md:px-4 lg:px-6 xl:px-8",
      )}
    >
      <div className="w-full flex h-16 items-center justify-between">
        <Link
          className="flex items-center space-x-2 min-w-0 shrink"
          href={brandHref}
        >
          <Image
            src={logoHref}
            alt="SchemaVaults Logo"
            width={40}
            height={40}
          />
          <Wordmark className="text-xl truncate" />
        </Link>

        <nav
          aria-label="Page sections"
          className="hidden md:flex items-center space-x-6 text-sm font-medium"
        >
          {headerNavigationLinks.map(({ id, label }) => (
            <Link
              key={id}
              href={`#${id}`}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2 md:space-x-4 shrink-0">
          <ThemeSelector variant="compact" className="hidden md:inline-flex" />
          <Link href={loginHref}>
            <Button variant="ghost" size="sm" className="hidden md:inline-flex">
              Sign In
            </Button>
          </Link>

          <Link
            href={ctaHref}
            onClick={() =>
              track("hero_primary_cta_click", {
                section: "header",
                label: ctaLabel,
              })
            }
          >
            <Button size="sm" className="whitespace-nowrap">
              <span className="md:hidden">{shortCtaLabel}</span>
              <span className="hidden md:inline">{ctaLabel}</span>
            </Button>
          </Link>

          <MobileDropdownMenu triggerClassName="md:hidden" />
        </div>
      </div>
    </header>
  );
}

export default Header;
