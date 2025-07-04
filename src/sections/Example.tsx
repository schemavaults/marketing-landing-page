"use client";

import type { ReactElement } from "react";

export function ExampleSection(): ReactElement {
  return (
    <section className="h-screen w-screen overflow-hidden flex items-center justify-center">
      <div className="max-w-[80vw] md:max-w-[70vw]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
    </section>
  );
}

export default ExampleSection;
