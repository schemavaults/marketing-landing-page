import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import "@schemavaults/theme/globals.css";
import ClientProviders from "./client-providers";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://schemavaults.com"),
  title: {
    default: "SchemaVaults — Type-safe data for AI agents, workflows, and apps",
    template: "%s · SchemaVaults",
  },
  description:
    "SchemaVaults is a schema-first graph database with an MCP server, TypeScript SDKs, and a visual editor. Define your data types once, then use them to validate agent outputs, back your apps, and power your workflows.",
  keywords: [
    "schema database",
    "graph database",
    "AI agents",
    "MCP",
    "Model Context Protocol",
    "typed data",
    "TypeScript SDK",
    "vault",
    "data validation",
  ],
  applicationName: "SchemaVaults",
  openGraph: {
    type: "website",
    url: "https://schemavaults.com",
    siteName: "SchemaVaults",
    title: "SchemaVaults — Type-safe data for AI agents, workflows, and apps",
    description:
      "The schema-first graph database you can just talk to. Type-safe from schema to agent to app.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SchemaVaults — Type-safe data for AI agents, workflows, and apps",
    description:
      "The schema-first graph database you can just talk to. Type-safe from schema to agent to app.",
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
