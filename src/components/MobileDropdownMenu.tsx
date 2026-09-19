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
  BookOpenText,
  CircleHelp,
  LayoutGrid,
  LogIn,
  Mail,
  Menu,
  Tag,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";

export interface MobileDropdownMenuProps {
  triggerClassName?: string;
}

const menuItemClassName: string = "hover:cursor-pointer";
const menuItemIconClassName: string = "h-4 w-4 mr-2";

interface SectionLink {
  href: string;
  label: string;
  Icon: typeof Menu;
}

const sectionLinks: readonly SectionLink[] = [
  {
    href: `#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`,
    label: "How It Works",
    Icon: BookOpenText,
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
];

export function MobileDropdownMenu({
  triggerClassName,
}: MobileDropdownMenuProps): ReactElement {
  const loginHref: string = useLoginPageHref();
  const registerHref: string = useRegisterPageHref();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={triggerClassName}>
          <Menu className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Open navigation menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Navigation Menu</DropdownMenuLabel>
        {/* Previously the mobile menu only offered Login/Register, which left
            phone visitors with no way to reach pricing, features or the
            waitlist except by scrolling the whole page. */}
        {sectionLinks.map(({ href, label, Icon }: SectionLink) => (
          <Link key={href} href={href}>
            <DropdownMenuItem className={menuItemClassName}>
              <Icon className={menuItemIconClassName} aria-hidden="true" />
              {label}
            </DropdownMenuItem>
          </Link>
        ))}

        <DropdownMenuSeparator />

        <Link href={loginHref}>
          <DropdownMenuItem className={menuItemClassName}>
            <LogIn className={menuItemIconClassName} aria-hidden="true" />
            Login
          </DropdownMenuItem>
        </Link>

        <Link href={registerHref}>
          <DropdownMenuItem className={menuItemClassName}>
            <UserPlus className={menuItemIconClassName} aria-hidden="true" />
            Register
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MobileDropdownMenu;
