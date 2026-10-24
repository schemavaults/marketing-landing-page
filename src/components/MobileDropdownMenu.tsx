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
  Mail,
  Menu,
  Sparkles,
  Tag,
  UserPlus,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import type { ComponentType, ReactElement } from "react";

export interface MobileDropdownMenuProps {
  triggerClassName?: string;
}

interface SectionLink {
  id: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
}

/** Mobile visitors need the same way through the page as desktop visitors. */
const sectionLinks: readonly SectionLink[] = [
  {
    id: MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION,
    label: "How It Works",
    Icon: Workflow,
  },
  {
    id: MarketingLandingPageSectionIds.FEATURES_SECTION,
    label: "Features",
    Icon: Sparkles,
  },
  {
    id: MarketingLandingPageSectionIds.PRICING_SECTION,
    label: "Pricing",
    Icon: Tag,
  },
  {
    id: MarketingLandingPageSectionIds.FAQ_SECTION,
    label: "FAQ",
    Icon: CircleHelp,
  },
  {
    id: MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION,
    label: "Mailing List",
    Icon: Mail,
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
        <DropdownMenuLabel>Navigation Menu</DropdownMenuLabel>
        {sectionLinks.map(({ id, label, Icon }: SectionLink) => (
          <DropdownMenuItem key={id} className={menuItemClassName} asChild>
            <a href={`#${id}`}>
              <Icon className={menuItemIconClassName} />
              {label}
            </a>
          </DropdownMenuItem>
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
