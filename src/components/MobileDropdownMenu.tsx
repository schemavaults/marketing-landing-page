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
  ThemeSelector,
} from "@schemavaults/ui";
import {
  Code2,
  HelpCircle,
  LogIn,
  Mail,
  Menu,
  Route,
  Sparkles,
  Tag,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import type { ComponentType, ReactElement } from "react";

export interface MobileDropdownMenuProps {
  triggerClassName?: string;
}

interface MobileNavLink {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

/**
 * The in-page navigation shown to desktop visitors in the header. Without
 * these, a visitor on a phone could only sign in or register — there was no
 * way to reach How It Works, Features, Pricing or the FAQ from the menu, even
 * though it was labelled "Navigation Menu".
 */
const sectionLinks: readonly MobileNavLink[] = [
  {
    id: MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION,
    label: "How It Works",
    icon: Route,
  },
  {
    id: MarketingLandingPageSectionIds.SEE_IT_IN_CODE_SECTION,
    label: "See It In Code",
    icon: Code2,
  },
  {
    id: MarketingLandingPageSectionIds.FEATURES_SECTION,
    label: "Features",
    icon: Sparkles,
  },
  {
    id: MarketingLandingPageSectionIds.PRICING_SECTION,
    label: "Pricing",
    icon: Tag,
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
          <Menu className="h-4 w-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end">
        <DropdownMenuLabel>Explore</DropdownMenuLabel>
        {sectionLinks.map((link: MobileNavLink) => (
          <DropdownMenuItem key={link.id} asChild className={menuItemClassName}>
            <Link href={`#${link.id}`}>
              <link.icon className={menuItemIconClassName} aria-hidden="true" />
              {link.label}
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Get started</DropdownMenuLabel>
        <DropdownMenuItem asChild className={menuItemClassName}>
          <Link
            href={`#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`}
          >
            <Mail className={menuItemIconClassName} aria-hidden="true" />
            {privateBeta ? "Get early access" : "Mailing list"}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className={menuItemClassName}>
          <Link href={registerHref}>
            <UserPlus className={menuItemIconClassName} aria-hidden="true" />
            {privateBeta ? "Register with invite code" : "Register"}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className={menuItemClassName}>
          <Link href={loginHref}>
            <LogIn className={menuItemIconClassName} aria-hidden="true" />
            Sign in
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <div className="flex items-center justify-between gap-2 px-2 py-1.5">
          <span className="text-sm text-muted-foreground">Theme</span>
          {/*
            `segmented` renders three labelled buttons and overflowed the
            dropdown panel, clipping "Dark". `compact` fits.
          */}
          <ThemeSelector variant="compact" />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MobileDropdownMenu;
