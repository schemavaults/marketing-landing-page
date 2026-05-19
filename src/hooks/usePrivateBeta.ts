"use client";

import PrivateBetaContext from "@/contexts/PrivateBetaContext";
import { useContext } from "react";

export default function usePrivateBeta(): boolean {
  return useContext(PrivateBetaContext);
}
