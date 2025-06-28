"use client";

import { type ReactElement } from "react";
import MarketingLandingPage from "@/marketing-landing-page";
import Image from "next/image";
import Link from "next/link";

export default function MarketingLandingPagePreview(): ReactElement {
  return (
    <MarketingLandingPage
      key="standalone-vault-graph-browser-page"
      Image={Image}
      Link={Link}
    />
  );
}
