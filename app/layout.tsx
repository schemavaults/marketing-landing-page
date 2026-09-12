import type { PropsWithChildren } from "react";
import type { Metadata, Viewport } from "next";
import "@schemavaults/theme/globals.css";
import ClientProviders from "./client-providers";
import {
  buildMarketingLandingPageMetadata,
  marketingLandingPageViewport,
} from "@/metadata";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = buildMarketingLandingPageMetadata();

export const viewport: Viewport = marketingLandingPageViewport;

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
