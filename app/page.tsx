import "server-only";
import type { ReactElement } from "react";
import {
  getAppEnvironment,
  type SchemaVaultsAppEnvironment,
} from "@schemavaults/app-definitions";
import isPrivateBetaFlagSet from "@/lib/isPrivateBetaFlagSet";
import IndexPageView from "./view";

export default async function IndexPageServerComponent(): Promise<ReactElement> {
  return (
    <IndexPageView
      environment={getAppEnvironment() satisfies SchemaVaultsAppEnvironment}
      private_beta={isPrivateBetaFlagSet() satisfies boolean}
    />
  );
}
