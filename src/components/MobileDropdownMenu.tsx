"use client";

import useLoginPageHref from "@/hooks/useLoginPageHref";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import usePrivateBeta from "@/hooks/usePrivateBeta";
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
  CircleDollarSign,
  HelpCircle,
  LayoutList,
  LogIn,
  Mail,
  Menu,
  Route,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import type { ComponentType, ReactElement } from "react";

export interface MobileDropdownMenuProps {
  triggerClassName?: string;
}

interface MobileMenuSectionLink {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

/**
 * Section links were previously desktop-only, so a visitor on a phone could
 * reach Login and Register but had no way to jump to How It Works, Features,
 * Pricing, or the waitlist without scrolling the whole page.
 */
const sectionLinks: readonly MobileMenuSectionLink[] = [
  {
    id: MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION,
    label: "How It Works",
    icon: Route,
  },
  {
    id: MarketingLandingPageSectionIds.FEATURES_SECTION,
    label: "Features",
    icon: LayoutList,
  },
  {
    id: MarketingLandingPageSectionIds.PRICING_SECTION,
    label: "Pricing",
    icon: CircleDollarSign,
  },
  {
    id: MarketingLandingPageSectionIds.FAQ_SECTION,
    label: "FAQ",
    icon: HelpCircle,
  },
];

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
          <Menu className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Explore</DropdownMenuLabel>
        {sectionLinks.map((link: MobileMenuSectionLink) => (
          <Link key={link.id} href={`#${link.id}`}>
            <DropdownMenuItem className={menuItemClassName}>
              <link.icon className={menuItemIconClassName} />
              {link.label}
            </DropdownMenuItem>
          </Link>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Get started</DropdownMenuLabel>

        <Link
          href={`#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`}
        >
          <DropdownMenuItem className={menuItemClassName}>
            <Mail className={menuItemIconClassName} />
            {privateBeta ? "Get early access" : "Join mailing list"}
          </DropdownMenuItem>
        </Link>

        <Link href={registerHref}>
          <DropdownMenuItem className={menuItemClassName}>
            <UserPlus className={menuItemIconClassName} />
            {privateBeta ? "Register with invite code" : "Register"}
          </DropdownMenuItem>
        </Link>

        <Link href={loginHref}>
          <DropdownMenuItem className={menuItemClassName}>
            <LogIn className={menuItemIconClassName} />
            Login
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MobileDropdownMenu;
