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
  ThemeSelector,
} from "@schemavaults/ui";
import {
  BookOpenText,
  CircleHelp,
  LayoutGrid,
  LogIn,
  Menu,
  Sparkles,
  Tag,
  UserPlus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";

export interface MobileDropdownMenuProps {
  triggerClassName?: string;
}

interface MobileNavigationLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

/**
 * The desktop navigation is hidden below the `md` breakpoint, so without these
 * entries mobile visitors have no way to reach any section of the page except
 * by scrolling the whole thing.
 */
const sectionLinks: readonly MobileNavigationLink[] = [
  {
    href: `#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`,
    label: "How It Works",
    icon: BookOpenText,
  },
  {
    href: `#${MarketingLandingPageSectionIds.USE_CASES_SECTION}`,
    label: "Use Cases",
    icon: Sparkles,
  },
  {
    href: `#${MarketingLandingPageSectionIds.FEATURES_SECTION}`,
    label: "Features",
    icon: LayoutGrid,
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
];

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
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Navigation Menu</DropdownMenuLabel>
        {sectionLinks.map((link: MobileNavigationLink) => (
          <Link key={link.href} href={link.href}>
            <DropdownMenuItem className={menuItemClassName}>
              <link.icon className={menuItemIconClassName} />
              {link.label}
            </DropdownMenuItem>
          </Link>
        ))}

        <DropdownMenuSeparator />

        <Link href={loginHref}>
          <DropdownMenuItem className={menuItemClassName}>
            <LogIn className={menuItemIconClassName} />
            Login
          </DropdownMenuItem>
        </Link>

        <Link href={registerHref}>
          <DropdownMenuItem className={menuItemClassName}>
            <UserPlus className={menuItemIconClassName} />
            Register
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <div className="px-2 py-1.5">
          <ThemeSelector variant="compact" />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
