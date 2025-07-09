"use client";

import { createContext } from "react";

export interface IOrganizationContactEmailAddressesContextType {
  salesEmail: string;
  supportEmail: string;
}

export const OrganizationContactEmailAddressesContext =
  createContext<IOrganizationContactEmailAddressesContextType | null>(null);
