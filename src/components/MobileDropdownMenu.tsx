"use client";

import useLoginPageHref from "@/hooks/useLoginPageHref";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@schemavaults/ui";
import { DollarSign, FileText, LogIn, Menu, Sparkles, UserPlus } from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";

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
        <Link href="#features">
          <DropdownMenuItem className={menuItemClassName}>
            <Sparkles className={menuItemIconClassName} />
            Features
          </DropdownMenuItem>
        </Link>

        <Link href="#pricing-section">
          <DropdownMenuItem className={menuItemClassName}>
            <DollarSign className={menuItemIconClassName} />
            Pricing
          </DropdownMenuItem>
        </Link>

        <Link href="https://docs.schemavaults.com">
          <DropdownMenuItem className={menuItemClassName}>
            <FileText className={menuItemIconClassName} />
            Documentation
          </DropdownMenuItem>
        </Link>

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
