export default function isPrivateBetaFlagSet(): boolean {
  try {
    if (
      !!process.env.SCHEMAVAULTS_PRIVATE_BETA &&
      typeof process.env.SCHEMAVAULTS_PRIVATE_BETA === "string" &&
      process.env.SCHEMAVAULTS_PRIVATE_BETA.includes("true")
    ) {
      return true;
    }
  } catch {
    /** no-op */
  }

  try {
    if (
      !!process.env.NEXT_PUBLIC_SCHEMAVAULTS_PRIVATE_BETA &&
      typeof process.env.NEXT_PUBLIC_SCHEMAVAULTS_PRIVATE_BETA === "string" &&
      process.env.NEXT_PUBLIC_SCHEMAVAULTS_PRIVATE_BETA.includes("true")
    ) {
      return true;
    }
  } catch {
    /** no-op */
  }

  return false;
}
