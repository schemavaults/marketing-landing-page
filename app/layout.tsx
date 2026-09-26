import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import "@schemavaults/theme/globals.css";
import ClientProviders from "./client-providers";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://schemavaults.com";
const siteName = "SchemaVaults";
const siteTitle =
  "SchemaVaults — Type-safe data for AI agents, workflows, and apps";
const siteDescription =
  "Define your data types once as schemas, then re-use and compose them across your AI agents, workflows, websites, mobile apps, and content. Schema-enforced storage in the cloud or self-hosted.";

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
    "type-safe database",
    "graph database",
    "AI agent memory",
    "Model Context Protocol",
    "MCP",
    "TypeScript SDK",
    "data pipelines",
    "headless CMS",
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
    images: [
      {
        url: "/media/marketing-landing-page/hero-background.webp",
        alt: `${siteName} — schema-enforced storage for agents, workflows, and apps`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/media/marketing-landing-page/hero-background.webp"],
  },
  icons: {
    icon: [
      { url: "/media/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/media/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/media/apple-touch-icon.png",
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
