import type { SchemaVaultsAppEnvironment } from "@schemavaults/app-definitions";

// @schemavaults/app-definitions no longer hardcodes the registry frontend or
// mail server domains, so the per-environment URLs this page links to and
// calls are defined here instead.

const REGISTRY_FRONTEND_URLS = {
  production: "https://registry.schemavaults.com",
  staging: "https://registry-staging.schemavaults.com",
  test: "http://schemavaults-registry",
  development: "http://localhost:8080",
} as const satisfies Record<SchemaVaultsAppEnvironment, string>;

const MAIL_SERVER_URLS = {
  production: "https://mail.schemavaults.com",
  staging: "https://mail-staging.schemavaults.com",
  test: "http://schemavaults-mail",
  development: "http://localhost:5346",
} as const satisfies Record<SchemaVaultsAppEnvironment, string>;

function resolveUrl(
  urls: Record<SchemaVaultsAppEnvironment, string>,
  environment: SchemaVaultsAppEnvironment,
  appName: string,
): string {
  const url: string | undefined = urls[environment];
  if (typeof url !== "string") {
    throw new Error(
      `No ${appName} URL found for app environment "${environment}"!`,
    );
  }
  return url;
}

export function getRegistryFrontendUrl(
  environment: SchemaVaultsAppEnvironment,
): string {
  return resolveUrl(REGISTRY_FRONTEND_URLS, environment, "registry frontend");
}

export function getMailServerUrl(
  environment: SchemaVaultsAppEnvironment,
): string {
  return resolveUrl(MAIL_SERVER_URLS, environment, "mail server");
}
