"use client";

import { DebugContext } from "@/contexts/DebugContext";
import { useContext } from "react";

export function useDebug(): boolean {
  return useContext(DebugContext);
}

export default useDebug;
