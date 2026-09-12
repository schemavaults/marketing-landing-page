import type { Metadata, Viewport } from "next";

export const MARKETING_SITE_URL: string = "https://schemavaults.com";
export const MARKETING_SITE_NAME: string = "SchemaVaults";

export const MARKETING_PAGE_TITLE: string =
  "SchemaVaults — Type-safe data for AI agents, workflows and apps";

export const MARKETING_PAGE_DESCRIPTION: string =
  "Define your data types once as schemas, then re-use and compose them to validate" +
  " and store data across your workflows, websites, mobile apps and CMS." +
  " Cloud or self-hosted.";

/**
 * TODO: replace with a purpose-built 1200x630 social card (PNG or JPEG).
 *
 * This is currently the hero background photograph: it carries no product
 * name, positioning line or logo, so a shared link previews as an anonymous
 * starfield. Dimensions below are the file's real ones -- declaring a 1.91:1
 * card we do not have would just make platforms crop it badly. WebP is also
 * not rendered by every link unfurler.
 */
export const MARKETING_SOCIAL_IMAGE: string =
  "/media/marketing-landing-page/hero-background.webp";
export const MARKETING_SOCIAL_IMAGE_WIDTH: number = 1920;
export const MARKETING_SOCIAL_IMAGE_HEIGHT: number = 1311;

/**
 * Metadata for the marketing landing page.
 *
 * Exported from the package so that the consuming schemavaults.com app can
 * re-use it verbatim for the "/" route rather than keeping a second, drifting
 * copy of the title/description/social card.
 *
 * @param siteUrl - Origin the page is served from. Override for preview
 *   deployments so that canonical & Open Graph URLs stay accurate.
 */
export function buildMarketingLandingPageMetadata(
  siteUrl: string = MARKETING_SITE_URL,
): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: MARKETING_PAGE_TITLE,
      template: `%s | ${MARKETING_SITE_NAME}`,
    },
    description: MARKETING_PAGE_DESCRIPTION,
    applicationName: MARKETING_SITE_NAME,
    keywords: [
      "schema validation",
      "graph database",
      "type-safe data",
      "AI agent memory",
      "Model Context Protocol",
      "MCP",
      "data pipelines",
      "headless CMS",
      "TypeScript SDK",
    ],
    alternates: {
      canonical: "/",
    },
    // Without these, links shared in Slack, iMessage, X or LinkedIn render as
    // a bare URL with no title, summary or preview image.
    openGraph: {
      type: "website",
      url: siteUrl,
      siteName: MARKETING_SITE_NAME,
      title: MARKETING_PAGE_TITLE,
      description: MARKETING_PAGE_DESCRIPTION,
      images: [
        {
          url: MARKETING_SOCIAL_IMAGE,
          width: MARKETING_SOCIAL_IMAGE_WIDTH,
          height: MARKETING_SOCIAL_IMAGE_HEIGHT,
          alt: "SchemaVaults — schema-validated data storage",
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: MARKETING_PAGE_TITLE,
      description: MARKETING_PAGE_DESCRIPTION,
      images: [MARKETING_SOCIAL_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const marketingLandingPageViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default buildMarketingLandingPageMetadata;
