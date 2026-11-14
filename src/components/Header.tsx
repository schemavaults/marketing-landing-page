"use client";

import type { default as Link } from "next/link";
import { Button, cn, ThemeSelector, Wordmark } from "@schemavaults/ui";
import type { FC, ReactElement } from "react";
import type { ImageProps } from "next/image";
import useLoginPageHref from "@/hooks/useLoginPageHref";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import { MobileDropdownMenu } from "./MobileDropdownMenu";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";

export interface HeaderProps {
  brandHref: string;
  logoHref: string;
  Image: FC<ImageProps>;
  Link: typeof Link;
}

export function Header({
  brandHref,
  logoHref,
  Image,
  Link,
}: HeaderProps): ReactElement {
  const loginHref: string = useLoginPageHref();
  const registerHref: string = useRegisterPageHref();
  const privateBeta: boolean = usePrivateBeta();

  /**
   * While signup is invite-only, "Get Started" leads to a page the visitor
   * cannot complete. Point the always-visible header CTA at the waitlist
   * instead so the one button that is on screen at all times is one they
   * can actually act on.
   */
  const headerCtaLabel: string = privateBeta
    ? "Get early access"
    : "Get Started";
  /** Narrow phones cannot fit the full label beside the wordmark. */
  const headerCtaShortLabel: string = privateBeta ? "Early access" : "Sign up";
  const headerCtaHref: string = privateBeta
    ? `#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`
    : registerHref;

  return (
    <header
      className={cn(
        "fixed top-0 z-50",
        "w-screen",
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
          {/*
            The wordmark does not wrap, so on very narrow phones it would be
            overlapped by the CTA. Below 360px the logo alone carries the brand.
          */}
          <Wordmark className="text-xl hidden min-[360px]:inline-block" />
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            href={`#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`}
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            How It Works
          </Link>
          <Link
            href={`#${MarketingLandingPageSectionIds.FEATURES_SECTION}`}
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Features
          </Link>
          <Link
            href={`#${MarketingLandingPageSectionIds.PRICING_SECTION}`}
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Pricing
          </Link>
          <Link
            href={`#${MarketingLandingPageSectionIds.FAQ_SECTION}`}
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            FAQ
          </Link>
        </nav>

        <div className="flex items-center space-x-2 md:space-x-4 shrink-0">
          <ThemeSelector variant="compact" className="hidden md:inline-flex" />
          <Link href={loginHref}>
            <Button variant="ghost" size="sm" className="hidden md:inline-flex">
              Sign In
            </Button>
          </Link>

          <Link href={headerCtaHref} className="shrink-0">
            <Button size="sm" className="whitespace-nowrap">
              <span className="hidden sm:inline">{headerCtaLabel}</span>
              <span className="sm:hidden">{headerCtaShortLabel}</span>
            </Button>
          </Link>

          <MobileDropdownMenu triggerClassName="md:hidden" />
        </div>
      </div>
    </header>
  );
}

export default Header;
