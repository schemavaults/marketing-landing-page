"use client";

import { useCallback, useMemo, type ReactElement } from "react";
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
import getPublicBetaWaitlistMailingListId from "@/lib/client/getPublicBetaWaitlistMailingListId";
import isValidUuid from "@/lib/isValidUuid";
import isValidEmail from "@/lib/isValidEmail";

export interface MarketingLandingPageClientComponentProps {
  environment: SchemaVaultsAppEnvironment;
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

  const mailing_list_id: string | undefined = useMemo(():
    | string
    | undefined => {
    try {
      return getPublicBetaWaitlistMailingListId();
    } catch (e: unknown) {
      return undefined;
    }
  }, []);

  const joinMailingListCallback = useCallback(
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
        debug={environment !== "production"}
        privateBeta={private_beta}
      />
    </JoinMailingListSubmitFunctionContext.Provider>
  );
}
