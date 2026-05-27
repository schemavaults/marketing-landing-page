import type { PropsWithChildren } from "react";
import type { Metadata, Viewport } from "next";
import "@schemavaults/theme/globals.css";
import ClientProviders from "./client-providers";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://schemavaults.com";
const TITLE = "SchemaVaults — Type-safe data for AI agents, workflows, and apps";
const DESCRIPTION =
  "Define your data types once as schemas. Re-use them to validate and store data for your AI agents, workflows, websites, mobile apps, or CMS — with end-to-end TypeScript safety.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | SchemaVaults",
  },
  description: DESCRIPTION,
  applicationName: "SchemaVaults",
  keywords: [
    "schema validation",
    "type-safe data",
    "graph database",
    "AI agents",
    "MCP",
    "Model Context Protocol",
    "TypeScript",
    "data vault",
    "structured data storage",
    "workflow data",
    "agentic data",
  ],
  authors: [{ name: "SchemaVaults" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "SchemaVaults",
    title: TITLE,
    description: DESCRIPTION,
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
    title: TITLE,
    description: DESCRIPTION,
    images: ["/media/marketing-landing-page/hero-background.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
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
