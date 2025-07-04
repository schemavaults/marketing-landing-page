"use client";

import { createContext } from "react";

export interface AuthLinkHrefsContextType {
  loginHref: string;
  registerHref: string;
}

export const AuthLinkHrefsContext = createContext<AuthLinkHrefsContextType>({
  loginHref: "https://schemavaults.com/auth/login",
  registerHref: "https://schemavaults.com/auth/register",
});
