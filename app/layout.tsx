import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import "@schemavaults/theme/globals.css";
import ClientProviders from "./client-providers";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://schemavaults.com";

const SITE_DESCRIPTION: string =
  "Type-safe data for AI agents, workflows, and apps. Define your data types once as schemas, then re-use and compose them to validate and store data anywhere.";

/**
 * Open Graph / Twitter metadata matters for conversion, not just SEO: without
 * it, every link shared in Slack, X, or LinkedIn unfurls as a bare URL with no
 * headline or image, which measurably suppresses referral click-through.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SchemaVaults — Type-safe data for AI agents, workflows, and apps",
    template: "%s | SchemaVaults",
  },
  description: SITE_DESCRIPTION,
  applicationName: "SchemaVaults",
  keywords: [
    "schema validation",
    "graph database",
    "type-safe data",
    "AI agent memory",
    "Model Context Protocol",
    "MCP",
    "TypeScript SDK",
    "headless CMS",
    "data pipelines",
    "self-hosted database",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "SchemaVaults",
    url: SITE_URL,
    title: "SchemaVaults — Type-safe data for AI agents, workflows, and apps",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/media/marketing-landing-page/hero-background.webp",
        width: 1920,
        height: 1311,
        alt: "SchemaVaults — type-safe data for AI agents, workflows, and apps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SchemaVaults — Type-safe data for AI agents, workflows, and apps",
    description: SITE_DESCRIPTION,
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
