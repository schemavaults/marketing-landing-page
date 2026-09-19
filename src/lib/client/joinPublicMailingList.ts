"use client";

import {
  getAppEnvironment,
  getHardcodedClientWebAppDomain,
  SCHEMAVAULTS_MAIL_APP_DEFINITION,
  type SchemaVaultsAppEnvironment,
} from "@schemavaults/app-definitions";

import isValidEmail from "@/lib/isValidEmail";
import isValidUuid from "@/lib/isValidUuid";

export interface IJoinMailingListOpts {
  mailing_list_id: string;
  email: string;
  environment: SchemaVaultsAppEnvironment;
  debug?: boolean;
}

function getSchemaVaultsMailServerUrl(
  environment: SchemaVaultsAppEnvironment = getAppEnvironment(),
): string {
  return getHardcodedClientWebAppDomain(
    SCHEMAVAULTS_MAIL_APP_DEFINITION.app_id,
    environment,
  );
}

export default async function joinPublicMailingList({
  mailing_list_id,
  email,
  environment,
  ...opts
}: IJoinMailingListOpts): Promise<void> {
  const debug: boolean = typeof opts.debug === "boolean" ? opts.debug : false;
  if (!isValidUuid(mailing_list_id)) {
    throw new Error(
      "Invalid 'mailing_list_id' of mailing list to subscribe to!",
    );
  }

  if (!isValidEmail(email)) {
    throw new Error("Invalid 'email' to use to subscribe to mailing list!");
  }

  if (debug) {
    console.log(
      "[joinMailingList] mailing_list_id and email appear semantically valid-- attempting to load endpoint to send mailing-list-join request to...",
    );
  }

  const mail_server_url: string = getSchemaVaultsMailServerUrl(environment);
  const endpoint: string = `${mail_server_url}/api/mailing-lists/join`;

  if (debug) {
    console.log(
      "[joinMailingList] Loaded endpoint to send mailing-list-join request to: ",
      endpoint,
    );
  }

  let response: Response;
  try {
    // NOTE: deliberately no `Content-Type: application/json` header. Without
    // it this stays a CORS "simple request"; adding it would trigger an
    // OPTIONS preflight against mail.schemavaults.com, which would silently
    // break every sign-up unless that route answers preflights.
    response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({
        mailing_list_id,
        email,
      }),
    });
  } catch (e: unknown) {
    throw new Error(
      "Could not reach the SchemaVaults mail server. Please check your connection and try again.",
      { cause: e },
    );
  }

  if (!response.ok) {
    if (debug) {
      console.error(
        `[joinMailingList] Mail server responded with a non-OK status: ${response.status}`,
      );
    }
    throw new Error(
      `Could not add you to the mailing list (server responded ${response.status}).` +
        " " +
        "Please try again in a moment.",
    );
  }
}
