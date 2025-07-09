"use client";

import { useCallback, type ReactElement } from "react";
import MarketingLandingPage from "@/marketing-landing-page";
import Image from "next/image";
import Link from "next/link";
import { JoinMailingListSubmitFunctionContext } from "@/contexts/JoinMailingListSubmitFunctionContext";
import { useToast } from "@schemavaults/ui";

export default function MarketingLandingPagePreview(): ReactElement {
  const { toast } = useToast();

  const sleep = useCallback(async (ms: number): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => resolve(), ms);
    });
  }, []);

  const mockJoinMailingListCallback = useCallback(
    async (email: string): Promise<void> => {
      await sleep(1750);
      console.log("[mockJoinMailingListCallback] email: ", email);
      return;
    },
    [toast, sleep],
  );

  return (
    <JoinMailingListSubmitFunctionContext.Provider
      value={mockJoinMailingListCallback}
    >
      <MarketingLandingPage
        key="standalone-vault-graph-browser-page"
        Image={Image}
        Link={Link}
        brandHref="https://schemavaults.com"
        loginHref="https://schemavaults.com/auth/login"
        registerHref="https://schemavaults.com/auth/register"
        debug={process.env.NODE_ENV === "development"}
      />
    </JoinMailingListSubmitFunctionContext.Provider>
  );
}
