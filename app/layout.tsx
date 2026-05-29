import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import "@schemavaults/theme/globals.css";
import ClientProviders from "./client-providers";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const siteTitle = "SchemaVaults — Type-safe data for AI agents, workflows & apps";
const siteDescription =
  "Define your data types once as schemas, then validate, store, and reuse them everywhere — across your AI agents, workflows, websites, and apps. Run in the cloud, in-memory, or self-hosted.";
const ogImage = "/media/marketing-landing-page/hero-background.webp";

export const metadata: Metadata = {
  metadataBase: new URL("https://schemavaults.com"),
  title: {
    default: siteTitle,
    template: "%s | SchemaVaults",
  },
  description: siteDescription,
  keywords: [
    "schema validation",
    "type-safe data",
    "graph database",
    "AI agents",
    "data vaults",
    "Model Context Protocol",
    "MCP",
    "data pipelines",
    "content management",
    "TypeScript",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://schemavaults.com",
    siteName: "SchemaVaults",
    title: siteTitle,
    description: siteDescription,
    images: [{ url: ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
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
