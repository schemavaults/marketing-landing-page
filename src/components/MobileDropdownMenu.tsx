"use client";

import useLoginPageHref from "@/hooks/useLoginPageHref";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
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
  CircleDollarSign,
  LayoutGrid,
  LogIn,
  Mail,
  Menu,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";

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
        <Button variant="ghost" size="sm" className={triggerClassName}>
          <Menu className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Navigation Menu</DropdownMenuLabel>
        <Link
          href={`#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`}
        >
          <DropdownMenuItem className={menuItemClassName}>
            <BookOpenText className={menuItemIconClassName} />
            How It Works
          </DropdownMenuItem>
        </Link>

        <Link href={`#${MarketingLandingPageSectionIds.FEATURES_SECTION}`}>
          <DropdownMenuItem className={menuItemClassName}>
            <LayoutGrid className={menuItemIconClassName} />
            Features
          </DropdownMenuItem>
        </Link>

        <Link href={`#${MarketingLandingPageSectionIds.PRICING_SECTION}`}>
          <DropdownMenuItem className={menuItemClassName}>
            <CircleDollarSign className={menuItemIconClassName} />
            Pricing
          </DropdownMenuItem>
        </Link>

        <Link
          href={`#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`}
        >
          <DropdownMenuItem className={menuItemClassName}>
            <Mail className={menuItemIconClassName} />
            Mailing List
          </DropdownMenuItem>
        </Link>

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
