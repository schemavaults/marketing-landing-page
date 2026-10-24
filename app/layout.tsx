import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import "@schemavaults/theme/globals.css";
import ClientProviders from "./client-providers";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://schemavaults.com";
const title = "SchemaVaults — Type-safe data for AI agents, workflows, and apps";
const description =
  "Define your data types once as schemas, then reuse and compose them to validate and store data for your workflows, websites, apps, and AI agents. Managed cloud or self-hosted.";

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
    "type-safe storage",
    "graph database",
    "AI agent memory",
    "Model Context Protocol",
    "data pipelines",
    "headless CMS",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "SchemaVaults",
    title,
    description,
  },
  // TODO: add app/opengraph-image.png (1200x630) and switch this to
  // "summary_large_image" -- a large-image card without an image renders blank.
  twitter: {
    card: "summary",
    title,
    description,
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
