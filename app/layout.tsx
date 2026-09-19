import type { PropsWithChildren } from "react";
import type { Metadata, Viewport } from "next";
import "@schemavaults/theme/globals.css";
import ClientProviders from "./client-providers";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://schemavaults.com";
const siteName = "SchemaVaults";
const title = "SchemaVaults — Define your data once. Trust it everywhere.";
const description =
  "The schema-first data platform for AI agents, workflows, and apps." +
  " " +
  "Define your data types once as schemas, then validate, store and re-use them everywhere.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${siteName}`,
  },
  description,
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
    title,
    description,
    locale: "en_US",
    // TODO: replace with a purpose-built 1200x630 social card once design
    // provides one; until then the square logo at least gives link previews
    // something to render.
    images: [
      {
        url: "/media/logo.png",
        width: 512,
        height: 512,
        alt: `${siteName} logo`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/media/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
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
