import type { PropsWithChildren } from "react";
import type { Metadata, Viewport } from "next";
import "@schemavaults/theme/globals.css";
import ClientProviders from "./client-providers";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], display: "swap" });

const siteUrl = "https://schemavaults.com";
const title = "SchemaVaults — Type-safe data for AI agents, workflows, and apps";
const description =
  "Define each data type once as a schema, then re-use it to validate and store data across your AI agents, workflows, websites, apps, and CMS — with end-to-end TypeScript types. Run it in our cloud, in-memory, or self-hosted.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | SchemaVaults",
  },
  description,
  applicationName: "SchemaVaults",
  keywords: [
    "schema validation",
    "type-safe database",
    "graph database",
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
  // A link shared in Slack, X, or a group chat is often the first impression
  // SchemaVaults gets. Without these tags it renders as a bare URL.
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "SchemaVaults",
    title,
    description,
    images: [
      {
        url: "/media/marketing-landing-page/hero-background.webp",
        width: 1200,
        height: 630,
        alt: "SchemaVaults — type-safe data for AI agents, workflows, and apps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/media/marketing-landing-page/hero-background.webp"],
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
