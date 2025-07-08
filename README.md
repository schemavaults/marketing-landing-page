# @schemavaults/marketing-landing-page

This is the code for the landing page for [https://schemavaults.com](https://schemavaults.com). It's in its own package so it can be developed in isolation from actual functionality.

## Development

```bash
# first install dependencies with `bun install`
bun run dev
```

## Production

### Build Package
Build the `@schemavaults/marketing-landing-page` package:
```bash
# first install dependencies with `bun install`
bun run build
```

### Render page component in app

In the consuming app (e.g. `@schemavaults/web`), wrap the page component (which is the default export or `MarketingLandingPage`):
```tsx
"use client";

import type { ReactElement, PropsWithChildren } from "react"
import { JoinMailingListSubmitFunctionContext } from "@schemavaults/marketing-landing-page"
export default function Layout({ children }: PropsWithChildren): ReactElement {
  return (
    <JoinMailingListSubmitFunctionContext.Provider value={async (email: string): void => {
      // submitJoinMailingListApiRequest().then(() => ...)
    }}>
     { children }
    </JoinMailingListSubmitFunctionContext.Provider>
  )
}
````

### Get styles working

Generate TailwindCSS styles for this package using the [`@schemavaults/theme`](https://github.com/schemavaults/theme) package in the consuming app.

### Wrap in appropriate context providers

The `<MarketingLandingPage />` component must be wrapped in
