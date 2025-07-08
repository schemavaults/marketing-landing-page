"use client";

import { createContext } from "react";

export const JoinMailingListSubmitFunctionContext = createContext<
  (email: string) => Promise<void>
>(() => {
  throw new Error(
    "Not within <JoinMailingListSubmitFunctionContext.Provider /> render tree!",
  );
});
