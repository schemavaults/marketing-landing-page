import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import "@schemavaults/theme/globals.css";
import ClientProviders from "./client-providers";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://schemavaults.com"),
  title: {
    default: "SchemaVaults — Type-safe data for AI agents, workflows & apps",
    template: "%s — SchemaVaults",
  },
  description:
    "Define your data shapes once. Compose, validate, and store them across every agent, workflow, website, and app — with end-to-end type safety. Cloud or self-hosted.",
  applicationName: "SchemaVaults",
  keywords: [
    "type-safe data",
    "schema validation",
    "AI agents",
    "data vault",
    "graph database",
    "TypeScript",
    "Model Context Protocol",
    "MCP",
    "agent memory",
    "data pipelines",
    "content management",
  ],
  openGraph: {
    type: "website",
    siteName: "SchemaVaults",
    title: "SchemaVaults — Type-safe data for AI agents, workflows & apps",
    description:
      "The schema-first data platform. Compose your data shapes once, then validate and store them across every agent, workflow, and app you build.",
    url: "https://schemavaults.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "SchemaVaults — Type-safe data for AI agents, workflows & apps",
    description:
      "The schema-first data platform. Compose your data shapes once, then validate and store them across every agent, workflow, and app you build.",
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
