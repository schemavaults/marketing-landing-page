import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import "@schemavaults/theme/globals.css";
import ClientProviders from "./client-providers";

export const metadata: Metadata = {
  title: "@schemavaults/marketing-landing-page Preview",
  description:
    "Preview app displaying @schemavaults/marketing-landing-page (without having to load the full @schemavaults/web application)",
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="w-full h-full min-h-screen">
      <body className="w-full h-full min-h-screen">
        <ClientProviders key="marketing-landing-page-app-client-providers">
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
