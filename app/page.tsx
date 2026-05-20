import "server-only";
import type { ReactElement } from "react";
import {
  getAppEnvironment,
  type SchemaVaultsAppEnvironment,
} from "@schemavaults/app-definitions";
import isPrivateBetaFlagSet from "@/lib/isPrivateBetaFlagSet";
import IndexPageView from "./view";
import getPublicBetaWaitlistMailingListId from "@/lib/getPublicBetaWaitlistMailingListId";

export default function IndexPageServerComponent(): ReactElement {
  const environment: SchemaVaultsAppEnvironment = getAppEnvironment();
  let mailing_list_id: string | undefined = undefined;
  try {
    mailing_list_id = getPublicBetaWaitlistMailingListId();
  } catch (e: unknown) {
    mailing_list_id = undefined;
    if (environment === "production") {
      throw new Error(
        "Failed to load public beta waitlist mailing list ID in production!",
        {
          cause: e,
        },
      );
    } else {
      console.warn(
        "Failed to load public beta waitlist mailing list ID in non-production environment: ",
        e,
      );
    }
  }

  return (
    <IndexPageView
      environment={environment}
      mailing_list_id={mailing_list_id}
      private_beta={isPrivateBetaFlagSet() satisfies boolean}
    />
  );
}
