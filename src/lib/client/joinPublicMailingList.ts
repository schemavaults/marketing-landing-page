"use client";

import {
  getAppEnvironment,
  type SchemaVaultsAppEnvironment,
} from "@schemavaults/app-definitions";

import isValidEmail from "@/lib/isValidEmail";
import isValidUuid from "@/lib/isValidUuid";
import { getMailServerUrl } from "@/lib/schemavaults-app-urls";

export interface IJoinMailingListOpts {
  mailing_list_id: string;
  email: string;
  environment: SchemaVaultsAppEnvironment;
  debug?: boolean;
}

function getSchemaVaultsMailServerUrl(
  environment: SchemaVaultsAppEnvironment = getAppEnvironment(),
): string {
  return getMailServerUrl(environment);
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

  await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({
      mailing_list_id,
      email,
    }),
  });
}
