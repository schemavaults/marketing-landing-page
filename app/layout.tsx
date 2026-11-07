import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import "@schemavaults/theme/globals.css";
import ClientProviders from "./client-providers";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const siteUrl: string = "https://schemavaults.com";
const siteName: string = "SchemaVaults";
const siteTitle: string =
  "SchemaVaults — Type-safe data for AI agents, workflows and apps";
const siteDescription: string =
  "Define your data types once as schemas, then re-use and compose them to validate and store data across your AI agents, workflows, backends, apps and CMS. Cloud or self-hosted.";

/**
 * Previously just a bare title and one-line description. Without OpenGraph
 * and Twitter metadata, every link to the homepage — in Slack, on X, in a
 * forwarded email — rendered as a bare grey URL with no title, description or
 * image, which throws away the referral traffic that marketing pages depend
 * on most.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "schema validation",
    "type-safe data",
    "graph database",
    "AI agent memory",
    "Model Context Protocol",
    "MCP",
    "data vault",
    "headless CMS",
    "TypeScript SDK",
    "data pipelines",
    "self-hosted database",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
    images: [
      {
        /**
         * TODO(marketing): replace with a purpose-built 1200x630 OG image.
         * This falls back to the hero background, which is the right aspect
         * ratio but carries no wordmark or value proposition.
         */
        url: "/media/marketing-landing-page/hero-background.webp",
        width: 1200,
        height: 630,
        alt: "SchemaVaults — type-safe data for AI agents, workflows and apps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/media/marketing-landing-page/hero-background.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className="w-full h-auto min-h-screen scroll-smooth"
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} w-full flex flex-col grow min-h-screen h-full scroll-smooth`}
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
