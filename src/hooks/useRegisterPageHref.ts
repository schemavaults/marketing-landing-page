"use client";

import { AuthLinkHrefsContext } from "@/contexts/AuthLinkHrefsContext";
import { useContext } from "react";

export function useRegisterPageHref(): string {
  const authLinkHrefs = useContext(AuthLinkHrefsContext);
  return authLinkHrefs.registerHref;
}

export default useRegisterPageHref;
