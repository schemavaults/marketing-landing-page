"use client";

import {
  BrightnessThemeProvider,
  LazyFramerMotionProvider,
  Toaster,
  TooltipProvider,
} from "@schemavaults/ui";
import type { ReactElement, PropsWithChildren } from "react";

export default function ClientProviders({
  children,
}: PropsWithChildren): ReactElement {
  return (
    <BrightnessThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <LazyFramerMotionProvider>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </LazyFramerMotionProvider>
    </BrightnessThemeProvider>
  );
}
