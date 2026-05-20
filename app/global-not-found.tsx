import "@schemavaults/theme/globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import GlobalNotFoundView from "@/components/GlobalNotFoundView";
import type { ReactElement } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound(): ReactElement {
  return (
    <html
      lang="en"
      className="w-full h-auto min-h-screen scroll-smooth"
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} w-full flex flex-col grow min-h-screen h-full scroll-smooth`}
      >
        <GlobalNotFoundView />
      </body>
    </html>
  );
}
