import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@schemavaults/theme/globals.css";
import ClientProviders from "./client-providers";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const SITE_URL: string = "https://schemavaults.com";
const SITE_NAME: string = "SchemaVaults";
/**
 * One description, reused for the <meta> tag, the Open Graph card and the
 * Twitter card. Links to the landing page get shared in Slack, in Discord and
 * on social far more often than they get typed in, so a page without card
 * metadata renders as a bare URL and loses most of that referral traffic.
 */
const SITE_DESCRIPTION: string =
  "Define your data once as a schema, then let every app, workflow and AI agent you build read and write exactly the shapes you designed — validated on the way in, typed on the way out.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SchemaVaults — Define your data once. Trust it everywhere.",
    template: "%s | SchemaVaults",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "schema registry",
    "schema validation",
    "graph database",
    "type-safe data",
    "AI agent memory",
    "Model Context Protocol",
    "MCP",
    "TypeScript SDK",
    "data vault",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "SchemaVaults — Define your data once. Trust it everywhere.",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/media/marketing-landing-page/hero-background.webp",
        width: 1200,
        height: 630,
        alt: "SchemaVaults",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SchemaVaults — Define your data once. Trust it everywhere.",
    description: SITE_DESCRIPTION,
    images: ["/media/marketing-landing-page/hero-background.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const googleMeasurementId: string | undefined =
  process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID?.trim() || undefined;

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
      {googleMeasurementId && <GoogleAnalytics gaId={googleMeasurementId} />}
    </html>
  );
}
