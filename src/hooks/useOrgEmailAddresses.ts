"use client";

import {
  type IOrganizationContactEmailAddressesContextType,
  OrganizationContactEmailAddressesContext,
} from "@/contexts/OrganizationContactEmailAddressesContext";
import { useContext } from "react";

export function useOrgEmailAddresses(): IOrganizationContactEmailAddressesContextType {
  const emails = useContext(OrganizationContactEmailAddressesContext);
  if (!emails) {
    throw new Error(
      "Failed to load organization email addresses!" +
        " " +
        "Is useOrgEmailAddresses() being called within a <OrganizationContactEmailAddressesContext.Provider> render tree?",
    );
  }
  return emails;
}

export default useOrgEmailAddresses;
