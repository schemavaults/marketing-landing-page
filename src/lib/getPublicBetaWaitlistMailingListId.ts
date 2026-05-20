"use client";

import isValidUuid from "@/lib/isValidUuid";

export default function getPublicBetaWaitlistMailingListId(): string {
  const envVar: string | undefined =
    process.env.NEXT_PUBLIC_PUBLIC_BETA_WAITLIST_MAILING_LIST_ID;

  if (typeof envVar !== "string" || !isValidUuid(envVar)) {
    console.error(
      `Failed to parse a valid UUID from environment variable: 'NEXT_PUBLIC_PUBLIC_BETA_WAITLIST_MAILING_LIST_ID'`,
    );
    throw new Error(
      "Failed to load public beta waitlist mailing from environment variables!",
    );
  }

  return envVar;
}
