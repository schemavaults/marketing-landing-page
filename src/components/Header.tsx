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

interface HeaderNavLink {
  id: string;
  label: string;
}

const navLinks: readonly HeaderNavLink[] = [
  {
    id: MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION,
    label: "How It Works",
  },
  {
    id: MarketingLandingPageSectionIds.SEE_IT_IN_CODE_SECTION,
    label: "See It In Code",
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

  return (
    <header
      className={cn(
        "fixed top-0 z-50",
        /**
         * `w-full` rather than `w-screen`: 100vw includes the vertical
         * scrollbar, which pushed the header (and every other `w-screen`
         * section) a few pixels wider than the viewport and introduced a
         * horizontal scroll on desktop.
         */
        "w-full",
        "border-b",
        "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "px-2 md:px-4 lg:px-6 xl:px-8",
      )}
    >
      <div className="w-full flex h-16 items-center justify-between">
        <Link
          className="flex items-center space-x-2 shrink-0"
          href={brandHref}
        >
          <Image
            src={logoHref}
            alt="SchemaVaults Logo"
            width={40}
            height={40}
          />
          {/*
            Below `sm` the wordmark and the header CTA fight for the same
            pixels and visibly overlap on a 390px viewport. The logo alone
            still identifies the brand, and the wordmark is repeated in the
            hero immediately below.
          */}
          <Wordmark className="text-xl hidden sm:inline-block" />
        </Link>

        <nav
          aria-label="Page sections"
          className="hidden lg:flex items-center space-x-6 text-sm font-medium"
        >
          {navLinks.map((link: HeaderNavLink) => (
            <Link
              key={link.id}
              href={`#${link.id}`}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <ThemeSelector variant="compact" className="hidden lg:inline-flex" />
          <Link href={loginHref}>
            <Button variant="ghost" size="sm" className="hidden lg:inline-flex">
              Sign In
            </Button>
          </Link>

          {/*
            The header CTA has to be the one action a visitor can complete.
            While the product is invite-only that is the waitlist, not the
            register page.
          */}
          <Link
            href={
              privateBeta
                ? `#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`
                : registerHref
            }
          >
            <Button size="sm" className="whitespace-nowrap">
              {privateBeta ? "Get early access" : "Start free"}
            </Button>
          </Link>

          <MobileDropdownMenu triggerClassName="lg:hidden" />
        </div>
      </div>
    </header>
  );
}

export default Header;
