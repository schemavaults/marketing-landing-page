"use client";

import useLoginPageHref from "@/hooks/useLoginPageHref";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import {
  headerNavLinks,
  type HeaderNavLink,
} from "./headerNavLinks";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ThemeSelector,
} from "@schemavaults/ui";
import { LogIn, Mail, Menu, UserPlus } from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";

export interface MobileDropdownMenuProps {
  triggerClassName?: string;
}

export function MobileDropdownMenu({
  triggerClassName,
}: MobileDropdownMenuProps): ReactElement {
  const loginHref: string = useLoginPageHref();
  const registerHref: string = useRegisterPageHref();
  const privateBeta: boolean = usePrivateBeta();

  const menuItemClassName: string = "hover:cursor-pointer";
  const menuItemIconClassName: string = "h-4 w-4 mr-2";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={triggerClassName}
          aria-label="Open navigation menu"
        >
          <Menu className="h-4 w-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        {/*
          The mobile menu used to offer only Login and Register, which left
          visitors on phones with no way to reach How It Works, Features,
          Pricing or the waitlist. It now mirrors the desktop navigation.
        */}
        <DropdownMenuLabel>Explore</DropdownMenuLabel>
        {headerNavLinks.map((navLink: HeaderNavLink) => (
          <DropdownMenuItem key={navLink.sectionId} asChild>
            <a href={`#${navLink.sectionId}`} className={menuItemClassName}>
              {navLink.label}
            </a>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuLabel>
          {privateBeta ? "Get access" : "Account"}
        </DropdownMenuLabel>
        {privateBeta && (
          <DropdownMenuItem asChild>
            <a
              href={`#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`}
              className={menuItemClassName}
            >
              <Mail className={menuItemIconClassName} aria-hidden="true" />
              Join the waitlist
            </a>
          </DropdownMenuItem>
        )}
        <Link href={loginHref}>
          <DropdownMenuItem className={menuItemClassName}>
            <LogIn className={menuItemIconClassName} aria-hidden="true" />
            Login
          </DropdownMenuItem>
        </Link>

        <Link href={registerHref}>
          <DropdownMenuItem className={menuItemClassName}>
            <UserPlus className={menuItemIconClassName} aria-hidden="true" />
            {privateBeta ? "Redeem invite code" : "Register"}
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <div className="px-2 py-1.5">
          <ThemeSelector variant="segmented" size="sm" />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
