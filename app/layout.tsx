import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import "@schemavaults/theme/globals.css";
import ClientProviders from "./client-providers";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const siteTitle =
  "SchemaVaults — Type-safe data for AI agents, workflows, and apps";
const siteDescription =
  "Define your data types once as schemas, then re-use them to validate and store data across your AI agents, workflows, apps, and CMS. The graph database you can just talk to.";
const siteUrl = "https://schemavaults.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s — SchemaVaults",
  },
  description: siteDescription,
  applicationName: "SchemaVaults",
  keywords: [
    "schema",
    "type-safe",
    "graph database",
    "AI agents",
    "MCP",
    "Model Context Protocol",
    "data validation",
    "TypeScript",
    "Zod",
    "workflows",
    "vault",
    "headless CMS",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "SchemaVaults",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/media/marketing-landing-page/hero-background.webp",
        width: 1200,
        height: 630,
        alt: "SchemaVaults — Type-safe data for AI agents, workflows, and apps",
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
