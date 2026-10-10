import "server-only";
import type { ReactElement } from "react";
import {
  getAppEnvironment,
  type SchemaVaultsAppEnvironment,
} from "@schemavaults/app-definitions";
import isPrivateBetaFlagSet from "@/lib/isPrivateBetaFlagSet";
import IndexPageView from "./view";
import getPublicBetaWaitlistMailingListId from "@/lib/getPublicBetaWaitlistMailingListId";
import MarketingLandingPageStructuredData from "@/components/MarketingLandingPageStructuredData";

const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://schemavaults.com";

export default function IndexPageServerComponent(): ReactElement {
  const environment: SchemaVaultsAppEnvironment = getAppEnvironment();
  const private_beta: boolean = isPrivateBetaFlagSet() satisfies boolean;
  let mailing_list_id: string | undefined = undefined;
  try {
    mailing_list_id = getPublicBetaWaitlistMailingListId() satisfies string;
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
        `Failed to load public beta waitlist mailing list ID in non-production ('${environment}') environment: `,
        e,
      );
    }
  }

  return (
    <>
      <MarketingLandingPageStructuredData
        siteUrl={SITE_URL}
        logoUrl={`${SITE_URL}/media/logo.png`}
        privateBeta={private_beta}
      />
      <IndexPageView
        environment={environment}
        mailing_list_id={mailing_list_id}
        private_beta={private_beta}
      />
    </>
  );
}
