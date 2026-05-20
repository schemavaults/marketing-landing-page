import { z } from "zod";

export default function isValidEmail(
  maybeEmail: unknown,
): maybeEmail is string {
  if (typeof maybeEmail !== "string") {
    return false;
  }
  return z.string().email().safeParse(maybeEmail).success;
}
