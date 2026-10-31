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
import {
  headerNavLinks,
  type HeaderNavLink,
} from "./headerNavLinks";

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
   * During the private beta, registration is gated behind an invite code, so
   * a persistent "Get Started" button sends most visitors into a wall. Point
   * the always-visible call to action at the waitlist instead.
   */
  const primaryCtaHref: string = privateBeta
    ? `#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`
    : registerHref;
  const primaryCtaLabel: string = privateBeta
    ? "Join waitlist"
    : "Get Started";

  return (
    <header
      className={cn(
        "fixed top-0 z-50",
        // `w-full`, not `w-screen`: `w-screen` ignores the scrollbar gutter and
        // pushes a horizontal scrollbar onto the page on desktop browsers.
        "w-full",
        "border-b",
        "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "px-2 md:px-4 lg:px-6 xl:px-8",
      )}
    >
      <div className="w-full flex h-16 items-center justify-between gap-2">
        <Link className="flex items-center space-x-2 shrink-0" href={brandHref}>
          <Image
            src={logoHref}
            alt="SchemaVaults Logo"
            width={40}
            height={40}
          />
          <Wordmark className="text-xl" />
        </Link>

        <nav
          aria-label="Page sections"
          className="hidden md:flex items-center space-x-6 text-sm font-medium"
        >
          {headerNavLinks.map((navLink: HeaderNavLink) => (
            <Link
              key={navLink.sectionId}
              href={`#${navLink.sectionId}`}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {navLink.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <ThemeSelector variant="compact" className="hidden md:inline-flex" />
          <Link href={loginHref}>
            <Button variant="ghost" size="sm" className="hidden md:inline-flex">
              Sign In
            </Button>
          </Link>

          <Button size="sm" asChild>
            <a href={primaryCtaHref}>{primaryCtaLabel}</a>
          </Button>

          <MobileDropdownMenu triggerClassName="md:hidden" />
        </div>
      </div>
    </header>
  );
}

export default Header;
