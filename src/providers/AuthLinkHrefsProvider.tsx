"use client";

import {
  AuthLinkHrefsContext,
  AuthLinkHrefsContextType,
} from "@/contexts/AuthLinkHrefsContext";
import type { PropsWithChildren, ReactElement } from "react";

interface AuthLinksHrefsProviderProps extends AuthLinkHrefsContextType {}

export function AuthLinksHrefsProvider(
  props: PropsWithChildren<AuthLinksHrefsProviderProps>,
): ReactElement {
  const { loginHref, registerHref } = props;

  return (
    <AuthLinkHrefsContext.Provider
      value={{
        loginHref,
        registerHref,
      }}
    >
      {props.children}
    </AuthLinkHrefsContext.Provider>
  );
}

export default AuthLinksHrefsProvider;
