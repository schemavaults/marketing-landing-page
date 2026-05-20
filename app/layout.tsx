import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import "@schemavaults/theme/globals.css";
import ClientProviders from "./client-providers";

export const metadata: Metadata = {
  title: "SchemaVaults",
  description: "Schema-validated secure cloud data storage",
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
