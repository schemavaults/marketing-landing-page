"use client";

import { AuthLinkHrefsContext } from "@/contexts/AuthLinkHrefsContext";
import { useContext } from "react";

export function useLoginPageHref(): string {
  const authLinkHrefs = useContext(AuthLinkHrefsContext);
  return authLinkHrefs.loginHref;
}

export default useLoginPageHref;
