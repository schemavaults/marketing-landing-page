import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import "@schemavaults/theme/globals.css";
import ClientProviders from "./client-providers";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const siteName = "SchemaVaults";
const title = "SchemaVaults — Type-safe data for AI agents, workflows & apps";
const description =
  "Define your data types once as schemas, then reuse them to validate and store data across your AI agents, workflows, apps, and CMS. Serverless or self-hosted.";

export const metadata: Metadata = {
  metadataBase: new URL("https://schemavaults.com"),
  title,
  description,
  openGraph: {
    type: "website",
    siteName,
    title,
    description,
    url: "https://schemavaults.com",
    images: [{ url: "/media/logo.png", alt: "SchemaVaults" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/media/logo.png"],
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
