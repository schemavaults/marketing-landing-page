"use client";

import {
  type IOrganizationContactEmailAddressesContextType,
  OrganizationContactEmailAddressesContext,
} from "@/contexts/OrganizationContactEmailAddressesContext";
import type { PropsWithChildren, ReactElement } from "react";

interface OrganizationContactEmailAddressesProviderProps
  extends IOrganizationContactEmailAddressesContextType {}

export function OrganizationContactEmailAddressesProvider({
  children,
  ...props
}: PropsWithChildren<OrganizationContactEmailAddressesProviderProps>): ReactElement {
  return (
    <OrganizationContactEmailAddressesContext.Provider
      value={{
        ...props,
      }}
    >
      {children}
    </OrganizationContactEmailAddressesContext.Provider>
  );
}

export default OrganizationContactEmailAddressesProvider;
