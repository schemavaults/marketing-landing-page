"use client";

import { ErrorPage } from "@schemavaults/ui";
import type { ReactElement } from "react";

export default function GlobalNotFoundView(): ReactElement {
  return (
    <ErrorPage
      error={404}
      message="The page you are looking for does not exist."
      reset={(): void => {
        window.location.reload();
      }}
    />
  );
}
