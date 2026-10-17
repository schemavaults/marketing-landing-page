import type { Metadata } from "next";

export interface CreateMarketingLandingPageMetadataOptions {
  /**
   * Absolute origin the page is served from, e.g. `https://schemavaults.com`.
   * Used as the metadata base so relative asset paths resolve to absolute URLs
   * -- social crawlers reject relative image paths.
   */
  siteUrl?: string;
  /** Path (relative to `siteUrl`) of the social share image. */
  openGraphImagePath?: string;
  openGraphImageWidth?: number;
  openGraphImageHeight?: number;
  /** Set false while the page should stay out of search indexes. */
  indexable?: boolean;
}

const DEFAULT_SITE_URL: string = "https://schemavaults.com";

/**
 * TODO: replace with a purpose-built 1200x630 share card. The hero background
 * is the best asset we currently have, but at 1920x1311 it gets centre-cropped
 * by every social preview.
 */
const DEFAULT_OPEN_GRAPH_IMAGE_PATH: string =
  "/media/marketing-landing-page/hero-background.webp";
const DEFAULT_OPEN_GRAPH_IMAGE_WIDTH: number = 1920;
const DEFAULT_OPEN_GRAPH_IMAGE_HEIGHT: number = 1311;

const TITLE: string =
  "SchemaVaults — type-safe data storage for AI agents, workflows, and apps";
const DESCRIPTION: string =
  "Define your data types once as schemas, then validate, store, and reuse them across your apps, workflows, and AI agents. Managed cloud or self-hosted.";

/**
 * Metadata for the marketing landing page, including the Open Graph and
 * Twitter card tags a link preview needs.
 *
 * Without these, every share of schemavaults.com in Slack, iMessage, X or
 * LinkedIn renders as a bare URL with no title, description or image -- which
 * is a meaningful share-to-visit conversion loss on exactly the referral
 * traffic a pre-launch product depends on.
 */
export function createMarketingLandingPageMetadata(
  options: CreateMarketingLandingPageMetadataOptions = {},
): Metadata {
  const siteUrl: string = options.siteUrl ?? DEFAULT_SITE_URL;
  const imagePath: string =
    options.openGraphImagePath ?? DEFAULT_OPEN_GRAPH_IMAGE_PATH;
  const imageWidth: number =
    options.openGraphImageWidth ?? DEFAULT_OPEN_GRAPH_IMAGE_WIDTH;
  const imageHeight: number =
    options.openGraphImageHeight ?? DEFAULT_OPEN_GRAPH_IMAGE_HEIGHT;
  const indexable: boolean = options.indexable ?? true;

  return {
    metadataBase: new URL(siteUrl),
    title: TITLE,
    description: DESCRIPTION,
    applicationName: "SchemaVaults",
    keywords: [
      "schema validation",
      "graph database",
      "type-safe storage",
      "AI agent memory",
      "Model Context Protocol",
      "TypeScript",
      "data pipelines",
      "headless CMS",
    ],
    alternates: {
      canonical: "/",
    },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      type: "website",
      siteName: "SchemaVaults",
      url: "/",
      title: TITLE,
      description: DESCRIPTION,
      images: [
        {
          url: imagePath,
          width: imageWidth,
          height: imageHeight,
          alt: "SchemaVaults — schema-validated data storage",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
      images: [imagePath],
    },
  };
}

export default createMarketingLandingPageMetadata;
