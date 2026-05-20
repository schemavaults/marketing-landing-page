"use client";

import { ErrorPage, Button } from "@schemavaults/ui";
import type { ReactElement } from "react";
import Link from "next/link";
import { Home } from "lucide-react";

export default function GlobalNotFoundView(): ReactElement {
  return (
    <ErrorPage
      error={404}
      message="The page you are looking for does not exist."
      reset={(): void => {
        window.location.reload();
      }}
      additionalButtons={[
        <Link href="/">
          <Button
            variant={"secondary"}
            className="flex flex-row flex-nowrap gap-2 items-center justify-start"
            onClick={async () => {
              window.location.href = "/";
            }}
          >
            <Home className="h-4 w-4" />
            Back to index page
          </Button>
        </Link>,
      ]}
    />
  );
}
