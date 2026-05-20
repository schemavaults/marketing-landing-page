import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import "@schemavaults/theme/globals.css";
import ClientProviders from "./client-providers";

export const metadata: Metadata = {
  title: "SchemaVaults",
  description:
    "Preview app displaying @schemavaults/marketing-landing-page (without having to load the full @schemavaults/web application)",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className="w-full h-auto min-h-screen scroll-smooth"
      suppressHydrationWarning
    >
      <body className="w-full h-auto min-h-screen scroll-smooth">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
