import "server-only";
import type { ReactElement } from "react";
import {
  getAppEnvironment,
  type SchemaVaultsAppEnvironment,
} from "@schemavaults/app-definitions";
import isPrivateBetaFlagSet from "@/lib/isPrivateBetaFlagSet";
import IndexPageView from "./view";
import getPublicBetaWaitlistMailingListId from "@/lib/getPublicBetaWaitlistMailingListId";

function safeLoadMailingListId(): string | undefined {
  try {
    return getPublicBetaWaitlistMailingListId();
  } catch (e: unknown) {
    return undefined;
  }
}

export default async function IndexPageServerComponent(): Promise<ReactElement> {
  return (
    <IndexPageView
      environment={getAppEnvironment() satisfies SchemaVaultsAppEnvironment}
      mailing_list_id={safeLoadMailingListId() satisfies string | undefined}
      private_beta={isPrivateBetaFlagSet() satisfies boolean}
    />
  );
}
