import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import "@schemavaults/theme/globals.css";
import ClientProviders from "./client-providers";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const siteName: string = "SchemaVaults";
const siteUrl: string = "https://schemavaults.com";
const siteTitle: string =
  "SchemaVaults — Type-safe data for AI agents, workflows, and apps";
const siteDescription: string =
  "Define your data types once as schemas, then use, re-use and compose them to validate and store data for your workflows, websites, mobile apps, and content management systems.";

/**
 * Note: this is the preview app in this repository. The metadata that actually
 * ships on schemavaults.com lives in the consuming Next.js app — keep the two
 * in sync, since a bare link preview costs clicks everywhere the homepage gets
 * shared.
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
    "schema",
    "graph database",
    "type-safe data",
    "AI agents",
    "Model Context Protocol",
    "MCP",
    "data validation",
    "content management system",
    "TypeScript",
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
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
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
