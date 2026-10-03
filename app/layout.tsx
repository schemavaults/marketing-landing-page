import type { PropsWithChildren } from "react";
import type { Metadata, Viewport } from "next";
import "@schemavaults/theme/globals.css";
import ClientProviders from "./client-providers";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const siteUrl: string = "https://schemavaults.com";
const title: string = "SchemaVaults — Type-safe data for AI agents, workflows & apps";
const description: string =
  "Define each data type once as a schema, then reuse it everywhere. SchemaVaults validates and stores data for your AI agents, pipelines, apps, and CMS — serverless or self-hosted.";

export const metadata: Metadata = {
  // Required for the relative OpenGraph/Twitter image URLs below to resolve.
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | SchemaVaults",
  },
  description,
  applicationName: "SchemaVaults",
  keywords: [
    "schema validation",
    "graph database",
    "type-safe storage",
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
  // Without these, every share of schemavaults.com on Slack, LinkedIn, X or
  // iMessage renders as a bare URL with no title, blurb or image.
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "SchemaVaults",
    title,
    description,
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
    title,
    description,
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
