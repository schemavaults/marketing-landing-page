"use client";

import { createContext } from "react";

/**
 * Names of the conversion events the landing page reports.
 *
 * Keep this list small and stable: each name is a funnel step we want to be
 * able to compare week-over-week, not a generic click log.
 */
export const conversionEventNames = [
  "hero_waitlist_submit_intent",
  "hero_primary_cta_click",
  "hero_secondary_cta_click",
  "hero_invite_code_click",
  "pricing_cta_click",
  "waitlist_join_succeeded",
  "waitlist_join_failed",
  "contact_sales_click",
  "faq_question_opened",
] as const satisfies readonly string[];

export type ConversionEventName = (typeof conversionEventNames)[number];

export interface ConversionEventProperties {
  /** Which landing page section the event originated from. */
  section?: string;
  /** Free-form label, e.g. the pricing plan name or FAQ question. */
  label?: string;
}

export type TrackConversionEventFunction = (
  event: ConversionEventName,
  properties?: ConversionEventProperties,
) => void;

/**
 * Defaults to a no-op so the landing page renders identically whether or not
 * the host app has wired up an analytics provider.
 */
export const ConversionEventsContext =
  createContext<TrackConversionEventFunction>(() => {
    /** no-op */
  });

export default ConversionEventsContext;
