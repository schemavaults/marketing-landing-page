"use client";

import useLoginPageHref from "@/hooks/useLoginPageHref";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@schemavaults/ui";
import {
  CircleHelp,
  LayoutList,
  LogIn,
  Mail,
  Menu,
  Route,
  Tag,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";

export interface MobileDropdownMenuProps {
  triggerClassName?: string;
}

/**
 * The desktop nav is `hidden md:flex`, so before this menu carried the section
 * links a phone visitor had no way to reach "How it works", pricing, the FAQ or
 * the waitlist from the header at all — only Login/Register, neither of which
 * is the action we want from a first-time mobile visitor.
 */
export function MobileDropdownMenu({
  triggerClassName,
}: MobileDropdownMenuProps): ReactElement {
  const loginHref: string = useLoginPageHref();
  const registerHref: string = useRegisterPageHref();
  const privateBeta: boolean = usePrivateBeta();

  const menuItemClassName: string = "hover:cursor-pointer";
  const menuItemIconClassName: string = "h-4 w-4 mr-2";

  const sectionLinks: readonly {
    href: string;
    label: string;
    icon: typeof Route;
  }[] = [
    {
      href: `#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`,
      label: "How It Works",
      icon: Route,
    },
    {
      href: `#${MarketingLandingPageSectionIds.FEATURES_SECTION}`,
      label: "Features",
      icon: LayoutList,
    },
    {
      href: `#${MarketingLandingPageSectionIds.PRICING_SECTION}`,
      label: "Pricing",
      icon: Tag,
    },
    {
      href: `#${MarketingLandingPageSectionIds.FAQ_SECTION}`,
      label: "FAQ",
      icon: CircleHelp,
    },
    {
      href: `#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`,
      label: privateBeta ? "Get early access" : "Stay in the loop",
      icon: Mail,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={triggerClassName}
          aria-label="Open navigation menu"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Explore</DropdownMenuLabel>
        {sectionLinks.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}>
            <DropdownMenuItem className={menuItemClassName}>
              <Icon className={menuItemIconClassName} />
              {label}
            </DropdownMenuItem>
          </Link>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <Link href={loginHref}>
          <DropdownMenuItem className={menuItemClassName}>
            <LogIn className={menuItemIconClassName} />
            Sign in
          </DropdownMenuItem>
        </Link>

        <Link href={registerHref}>
          <DropdownMenuItem className={menuItemClassName}>
            <UserPlus className={menuItemIconClassName} />
            {privateBeta ? "Register with invite code" : "Register"}
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
