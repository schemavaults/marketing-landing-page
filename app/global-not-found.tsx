"use client";

import "@schemavaults/theme/globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ErrorPage } from "@schemavaults/ui";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body className="w-full h-auto min-h-screen">
        <ErrorPage
          error={404}
          message="The page you are looking for does not exist."
          reset={() => {
            window.location.reload();
          }}
        />
      </body>
    </html>
  );
}
