"use client";

import { useMemo, type ReactElement } from "react";
import MarketingLandingPage from "@/marketing-landing-page";
import Image from "next/image";
import Link from "next/link";
import { JoinMailingListSubmitFunctionContext } from "@/contexts/JoinMailingListSubmitFunctionContext";
import {
  getHardcodedClientWebAppDomain,
  SCHEMAVAULTS_REGISTRY_FRONTEND,
  type SchemaVaultsAppEnvironment,
} from "@schemavaults/app-definitions";
import joinPublicMailingList from "@/lib/client/joinPublicMailingList";
import isValidUuid from "@/lib/isValidUuid";
import isValidEmail from "@/lib/isValidEmail";
import type { TrackConversionEventFunction } from "@/contexts/ConversionEventsContext";

export interface MarketingLandingPageClientComponentProps {
  environment: SchemaVaultsAppEnvironment;
  mailing_list_id?: string;
  private_beta?: boolean;
}

async function mockJoinMailingListCallback(email: string): Promise<void> {
  async function sleep(ms: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      void reject;
      setTimeout(() => resolve(), ms);
    });
  }
  await sleep(1750);
  console.log("[mockJoinMailingListCallback] email: ", email);
  return;
}

export default function MarketingLandingPageClientComponent({
  environment,
  mailing_list_id,
  private_beta,
}: MarketingLandingPageClientComponentProps): ReactElement {
  const registry_url: string = useMemo(
    (): string =>
      getHardcodedClientWebAppDomain(
        SCHEMAVAULTS_REGISTRY_FRONTEND.app_id,
        environment,
      ),
    [environment],
  );

  const joinMailingListCallback: (email: string) => Promise<void> = useMemo(
    () =>
      environment === "production"
        ? async (email: string) => {
            if (!mailing_list_id || !isValidUuid(mailing_list_id)) {
              throw new TypeError("Failed to load mailing list ID!");
            } else if (typeof email !== "string" || !isValidEmail(email)) {
              throw new TypeError("Invalid email to join mailing list with!");
            }
            await joinPublicMailingList({
              email,
              mailing_list_id,
              environment,
            });
            return;
          }
        : mockJoinMailingListCallback,
    [environment, mailing_list_id],
  );

  // The real schemavaults.com app should pass its analytics client here; the
  // preview app just logs so the funnel events are visible while developing.
  const onConversionEvent: TrackConversionEventFunction = useMemo(
    () => (event, properties) => {
      if (environment === "production") return;
      console.log("[landing-page conversion event]", event, properties ?? {});
    },
    [environment],
  );

  return (
    <JoinMailingListSubmitFunctionContext.Provider
      value={joinMailingListCallback}
    >
      <MarketingLandingPage
        brandHref="https://schemavaults.com"
        loginHref={`${registry_url}/auth/login`}
        registerHref={`${registry_url}/auth/register`}
        salesEmail="sales@schemavaults.com"
        supportEmail="support@schemavaults.com"
        Image={Image}
        Link={Link}
        debug={environment === "development"}
        privateBeta={private_beta}
        onConversionEvent={onConversionEvent}
      />
    </JoinMailingListSubmitFunctionContext.Provider>
  );
}
