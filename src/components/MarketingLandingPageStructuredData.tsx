import type { ReactElement } from "react";
import {
  buildDefaultFrequentlyAskedQuestions,
  type FrequentlyAskedQuestion,
} from "@/data/frequentlyAskedQuestions";

export interface MarketingLandingPageStructuredDataProps {
  /** Canonical origin of the marketing site, e.g. `https://schemavaults.com`. */
  siteUrl: string;
  /** Absolute URL of the logo used in the `Organization` entry. */
  logoUrl?: string;
  /** Mirrors the landing page's private-beta state so the FAQ markup matches. */
  privateBeta?: boolean;
  /** Overrides the FAQ list; must match what the page renders. */
  questions?: readonly FrequentlyAskedQuestion[];
}

/**
 * Emits JSON-LD describing the product, the organisation, and the on-page FAQ.
 *
 * This is a plain server component so it can be dropped into any consuming
 * Next.js app's `page.tsx`. It only ever restates content that is visible on
 * the page -- structured data that disagrees with the rendered page is treated
 * as spam by search engines.
 */
export function MarketingLandingPageStructuredData({
  siteUrl,
  logoUrl,
  privateBeta,
  questions,
}: MarketingLandingPageStructuredDataProps): ReactElement {
  const origin: string = siteUrl.replace(/\/+$/, "");
  const faqs: readonly FrequentlyAskedQuestion[] =
    questions ?? buildDefaultFrequentlyAskedQuestions(privateBeta ?? false);

  const graph: readonly unknown[] = [
    {
      "@type": "Organization",
      "@id": `${origin}/#organization`,
      name: "SchemaVaults",
      url: origin,
      ...(logoUrl ? { logo: logoUrl } : {}),
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "sales@schemavaults.com",
        },
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "support@schemavaults.com",
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${origin}/#software`,
      name: "SchemaVaults",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      url: origin,
      publisher: { "@id": `${origin}/#organization` },
      description:
        "Define your data types once as schemas, then re-use and compose them to validate and store data across AI agents, workflows, apps, and content management systems.",
      offers: [
        {
          "@type": "Offer",
          name: "Free",
          price: "0",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          name: "Personal",
          price: "19",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          name: "Teams",
          price: "79",
          priceCurrency: "USD",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${origin}/#faq`,
      mainEntity: faqs.map((faq: FrequentlyAskedQuestion) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }),
      }}
    />
  );
}

export default MarketingLandingPageStructuredData;
