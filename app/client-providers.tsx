"use client";

import { LazyFramerMotionProvider, Toaster } from "@schemavaults/ui";
import type { ReactElement, PropsWithChildren } from "react";

export default function ClientProviders({
  children,
}: PropsWithChildren): ReactElement {
  return (
    <LazyFramerMotionProvider key="lazy-framer-motion-provider">
      {children}
      <Toaster />
    </LazyFramerMotionProvider>
  );
}
