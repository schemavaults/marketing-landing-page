"use client";

import type { default as Link } from "next/link";
import { Button, cn, ThemeSelector, Wordmark } from "@schemavaults/ui";
import type { FC, ReactElement } from "react";
import type { ImageProps } from "next/image";
import useLoginPageHref from "@/hooks/useLoginPageHref";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
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

  const navLinks: readonly { href: string; label: string }[] = [
    {
      href: `#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`,
      label: "How It Works",
    },
    {
      href: `#${MarketingLandingPageSectionIds.FEATURES_SECTION}`,
      label: "Features",
    },
    {
      href: `#${MarketingLandingPageSectionIds.PRICING_SECTION}`,
      label: "Pricing",
    },
    {
      href: `#${MarketingLandingPageSectionIds.FAQ_SECTION}`,
      label: "FAQ",
    },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 z-50",
        // `w-screen` is 100vw, which ignores the vertical scrollbar and so
        // forces a horizontal scrollbar on desktop browsers that reserve space
        // for one. `w-full` tracks the actual content width.
        "w-full",
        "border-b",
        "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "px-2 md:px-4 lg:px-6 xl:px-8",
      )}
    >
      <div className="w-full flex h-16 items-center justify-between">
        {/* min-w-0 + shrink lets the brand give way instead of colliding with
            the call-to-action on narrow phones. */}
        <Link
          className="flex items-center space-x-2 min-w-0 shrink"
          href={brandHref}
        >
          <Image
            src={logoHref}
            alt="SchemaVaults Logo"
            width={40}
            height={40}
            className="h-8 w-8 sm:h-10 sm:w-10"
          />
          <Wordmark className="text-base sm:text-xl" />
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
          <ThemeSelector variant="compact" className="hidden md:inline-flex" />
          <Link href={loginHref}>
            <Button variant="ghost" size="sm" className="hidden md:inline-flex">
              Sign In
            </Button>
          </Link>

          {/* While the beta is invite-only, "Get Started" in the header sent
              visitors to a registration form they could not complete. Point it
              at the waitlist until self-serve sign-up is open. */}
          <Link
            href={
              privateBeta
                ? `#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`
                : registerHref
            }
          >
            <Button size="sm" className="whitespace-nowrap">
              {privateBeta ? (
                <>
                  <span className="sm:hidden">Early access</span>
                  <span className="hidden sm:inline">Get early access</span>
                </>
              ) : (
                "Get Started"
              )}
            </Button>
          </Link>

          <MobileDropdownMenu triggerClassName="md:hidden" />
        </div>
      </div>
    </header>
  );
}

export default Header;
