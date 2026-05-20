"use client";
import { ErrorPage } from "@schemavaults/ui";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ErrorPage error={error} reset={reset} />
      </body>
    </html>
  );
}
