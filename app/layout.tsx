import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import "@schemavaults/theme/globals.css";
import ClientProviders from "./client-providers";
import createMarketingLandingPageMetadata from "@/lib/createMarketingLandingPageMetadata";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

/*
 * Shared with the real schemavaults.com app via
 * `createMarketingLandingPageMetadata()` so the Open Graph / Twitter card tags
 * stay in one place instead of being re-typed per consumer.
 */
export const metadata: Metadata = createMarketingLandingPageMetadata({
  // Keep preview deployments out of search indexes.
  indexable:
    process.env.NEXT_PUBLIC_SCHEMAVAULTS_APP_ENVIRONMENT === "production",
});

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
