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
  Code2,
  LayoutGrid,
  LogIn,
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

interface MobileNavLink {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

/**
 * The desktop header nav is hidden below `md`, so without these entries a
 * phone visitor had no way to reach How It Works, Features, Pricing or the FAQ
 * other than scrolling the whole page.
 */
const sectionLinks: readonly MobileNavLink[] = [
  {
    href: `#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`,
    label: "How It Works",
    icon: Route,
  },
  {
    href: `#${MarketingLandingPageSectionIds.FEATURES_SECTION}`,
    label: "Features",
    icon: LayoutGrid,
  },
  {
    href: `#${MarketingLandingPageSectionIds.CODE_EXAMPLE_SECTION}`,
    label: "See the code",
    icon: Code2,
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
        {sectionLinks.map((link: MobileNavLink) => (
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
