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
  LogIn,
  Menu,
  Route,
  Sparkles,
  Tag,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";

export interface MobileDropdownMenuProps {
  triggerClassName?: string;
}

/**
 * On mobile the desktop <nav> is hidden, which previously left visitors with
 * no way to reach How It Works / Features / Pricing / FAQ at all. The section
 * links belong here too.
 */
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
    icon: Sparkles,
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
