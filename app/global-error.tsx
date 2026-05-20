"use client";
import { ErrorPage } from "@schemavaults/ui";

import "@schemavaults/theme/globals.css";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html
      lang="en"
      className="w-full h-auto min-h-screen scroll-smooth"
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} w-full flex flex-col grow min-h-screen h-full scroll-smooth`}
      >
        <ErrorPage error={error} reset={reset} />
      </body>
    </html>
  );
}
