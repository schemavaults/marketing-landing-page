import { z } from "zod";

export default function isValidUuid(maybeUuid: unknown): maybeUuid is string {
  if (typeof maybeUuid !== "string") {
    return false;
  }
  return z.string().uuid().safeParse(maybeUuid).success;
}
