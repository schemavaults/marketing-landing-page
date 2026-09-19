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

const navLinkClassName: string =
  "transition-colors hover:text-foreground/80 text-foreground/60";

export function Header({
  brandHref,
  logoHref,
  Image,
  Link,
}: HeaderProps): ReactElement {
  const loginHref: string = useLoginPageHref();
  const registerHref: string = useRegisterPageHref();
  const privateBeta: boolean = usePrivateBeta();

  return (
    <header
      className={cn(
        "fixed top-0 z-50",
        // `w-screen` is 100vw, which is wider than the content box whenever a
        // classic scrollbar is visible and produces a horizontal scrollbar.
        "w-full",
        "border-b",
        "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "px-2 md:px-4 lg:px-6 xl:px-8",
      )}
    >
      <div className="w-full flex h-16 items-center justify-between">
        <Link className="flex items-center space-x-2" href={brandHref}>
          <Image
            src={logoHref}
            alt="SchemaVaults Logo"
            width={40}
            height={40}
          />
          <Wordmark className="text-xl" />
        </Link>

        <nav
          aria-label="Section navigation"
          className="hidden md:flex items-center space-x-6 text-sm font-medium"
        >
          <Link
            href={`#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`}
            className={navLinkClassName}
          >
            How It Works
          </Link>
          <Link
            href={`#${MarketingLandingPageSectionIds.FEATURES_SECTION}`}
            className={navLinkClassName}
          >
            Features
          </Link>
          <Link
            href={`#${MarketingLandingPageSectionIds.PRICING_SECTION}`}
            className={navLinkClassName}
          >
            Pricing
          </Link>
          <Link
            href={`#${MarketingLandingPageSectionIds.FAQ_SECTION}`}
            className={navLinkClassName}
          >
            FAQ
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeSelector variant="compact" className="hidden md:inline-flex" />
          <Link href={loginHref}>
            <Button variant="ghost" size="sm" className="hidden md:inline-flex">
              Sign In
            </Button>
          </Link>

          {/* Self-serve registration is invite-gated during the private beta,
              so the persistent header CTA points at the waitlist instead of a
              sign-up form most visitors cannot complete. */}
          <Link
            href={
              privateBeta
                ? `#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`
                : registerHref
            }
          >
            <Button size="sm">
              {privateBeta ? "Join Waitlist" : "Get Started"}
            </Button>
          </Link>

          <MobileDropdownMenu triggerClassName="md:hidden" />
        </div>
      </div>
    </header>
  );
}

export default Header;
