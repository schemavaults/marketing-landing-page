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
  CircleHelp,
  LayoutGrid,
  LogIn,
  Mail,
  Menu,
  Route,
  Tag,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import type { ComponentType, ReactElement } from "react";

export interface MobileDropdownMenuProps {
  triggerClassName?: string;
}

interface MobileNavigationLink {
  href: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
}

/**
 * The desktop <nav> links are hidden below the `md` breakpoint, so without
 * these entries mobile visitors have no way to reach any section of the
 * page other than by scrolling past it.
 */
const sectionLinks: readonly MobileNavigationLink[] = [
  {
    href: `#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`,
    label: "How It Works",
    Icon: Route,
  },
  {
    href: `#${MarketingLandingPageSectionIds.FEATURES_SECTION}`,
    label: "Features",
    Icon: LayoutGrid,
  },
  {
    href: `#${MarketingLandingPageSectionIds.PRICING_SECTION}`,
    label: "Pricing",
    Icon: Tag,
  },
  {
    href: `#${MarketingLandingPageSectionIds.FAQ_SECTION}`,
    label: "FAQ",
    Icon: CircleHelp,
  },
  {
    href: `#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`,
    label: "Mailing List",
    Icon: Mail,
  },
] as const;

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
        {sectionLinks.map(({ href, label, Icon }: MobileNavigationLink) => (
          <Link key={href} href={href}>
            <DropdownMenuItem className={menuItemClassName}>
              <Icon className={menuItemIconClassName} />
              {label}
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
          <ThemeSelector variant="segmented" size="sm" />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
