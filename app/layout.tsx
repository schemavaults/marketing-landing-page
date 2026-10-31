import type { PropsWithChildren } from "react";
import type { Metadata, Viewport } from "next";
import "@schemavaults/theme/globals.css";
import ClientProviders from "./client-providers";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const siteUrl: string = "https://schemavaults.com";

/**
 * The one-line description of the product, reused for the meta description and
 * the social card so that every surface says the same thing. Keep this in step
 * with the hero headline in `src/sections/Hero.tsx`.
 */
const siteDescription: string =
  "SchemaVaults is a schema-first vault for the data your AI agents, workflows, and apps all share. " +
  "Define your data types once, then validate and store data everywhere — type-safe end to end.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SchemaVaults — define your data once, trust it everywhere",
    template: "%s | SchemaVaults",
  },
  description: siteDescription,
  applicationName: "SchemaVaults",
  keywords: [
    "schema validation",
    "type-safe data storage",
    "graph database",
    "AI agent memory",
    "Model Context Protocol",
    "MCP",
    "TypeScript SDK",
    "headless CMS",
    "data pipelines",
    "schema registry",
  ],
  alternates: {
    canonical: "/",
  },
  // A shared link that unfurls with nothing but a bare URL converts far worse
  // than one with a title, description and image, and most early traffic for a
  // developer tool arrives via a link pasted into Slack, X or LinkedIn.
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "SchemaVaults",
    title: "SchemaVaults — define your data once, trust it everywhere",
    description: siteDescription,
    locale: "en_US",
    images: [
      {
        url: "/media/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "SchemaVaults",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SchemaVaults — define your data once, trust it everywhere",
    description: siteDescription,
    images: ["/media/android-chrome-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
