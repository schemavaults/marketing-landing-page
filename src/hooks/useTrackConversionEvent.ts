"use client";

import ConversionEventsContext, {
  type TrackConversionEventFunction,
} from "@/contexts/ConversionEventsContext";
import { useContext } from "react";

export function useTrackConversionEvent(): TrackConversionEventFunction {
  return useContext(ConversionEventsContext);
}

export default useTrackConversionEvent;
