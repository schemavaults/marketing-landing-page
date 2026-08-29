"use client";

import useLoginPageHref from "@/hooks/useLoginPageHref";
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
import type { LucideIcon } from "lucide-react";
import { ReactElement } from "react";

interface MobileNavigationLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

/**
 * The desktop nav exposes every section of the page, but on mobile this menu
 * previously offered only Login and Register — leaving a phone visitor with no
 * way to reach pricing or the waitlist except by scrolling the whole page.
 */
const sectionLinks: readonly MobileNavigationLink[] = [
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
    label: "Mailing List",
    icon: Mail,
  },
];

export interface MobileDropdownMenuProps {
  triggerClassName?: string;
}

export function MobileDropdownMenu({
  triggerClassName,
}: MobileDropdownMenuProps): ReactElement {
  const loginHref: string = useLoginPageHref();
  const registerHref: string = useRegisterPageHref();

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
          <Menu className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Navigation Menu</DropdownMenuLabel>

        {sectionLinks.map((link: MobileNavigationLink) => (
          <DropdownMenuItem key={link.href} className={menuItemClassName} asChild>
            <Link href={link.href}>
              <link.icon className={menuItemIconClassName} />
              {link.label}
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem className={menuItemClassName} asChild>
          <Link href={loginHref}>
            <LogIn className={menuItemIconClassName} />
            Login
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className={menuItemClassName} asChild>
          <Link href={registerHref}>
            <UserPlus className={menuItemIconClassName} />
            Register
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
