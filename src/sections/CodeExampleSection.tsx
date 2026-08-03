import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { CodeBlock, cn } from "@schemavaults/ui";
import type { ReactElement } from "react";

const defineSchemaSnippet = `import { schema, string, number, ref } from "@schemavaults/sdk";

// Define once. Reuse everywhere.
export const Author = schema("Author", {
  id: string().uuid(),
  name: string().min(1),
  handle: string().regex(/^@[a-z0-9_]+$/),
});

export const Post = schema("Post", {
  id: string().uuid(),
  title: string().min(1).max(200),
  wordCount: number().int().min(0),
  author: ref(Author),
});
`;

const useSchemaSnippet = `import { vault } from "@schemavaults/sdk";
import { Post } from "./schemas";

// Same schema — used from your app, your API, your agent.
const posts = vault("blog").collection(Post);

// Fully typed. Validated on read + write.
const draft = await posts.insert({
  title: "Ship type-safe data",
  wordCount: 640,
  author: { id: authorId },
});
`;

export function CodeExampleSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.CODE_EXAMPLE_SECTION}
      className={cn(
        "py-24",
        "w-screen",
        "bg-background",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Schemas your whole stack agrees on
          </h2>
          <p className="mx-auto max-w-[720px] text-muted-foreground text-lg">
            Define the shape of your data once. Every app, agent, and workflow
            reads and writes through the same validated type — no more
            <span className="whitespace-nowrap"> silent drift</span> between
            frontend, backend, and pipeline code.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 max-w-6xl mx-auto">
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Step 1
              </p>
              <h3 className="text-xl font-bold">Define your schema</h3>
              <p className="text-sm text-muted-foreground mt-1">
                One source of truth for what your data looks like.
              </p>
            </div>
            <CodeBlock
              value={defineSchemaSnippet}
              language="ts"
              title="schemas.ts"
              showLineNumbers
              showCopyButton
            />
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Step 2
              </p>
              <h3 className="text-xl font-bold">Use it anywhere</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Same types in your app, your backend, and your AI agents.
              </p>
            </div>
            <CodeBlock
              value={useSchemaSnippet}
              language="ts"
              title="publish.ts"
              showLineNumbers
              showCopyButton
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CodeExampleSection;
