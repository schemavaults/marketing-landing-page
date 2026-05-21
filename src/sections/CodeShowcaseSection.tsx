"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { CodeBlock, cn } from "@schemavaults/ui";
import { Braces, BotMessageSquare, Database } from "lucide-react";
import type { ReactElement } from "react";

const defineSchemaCode = `import { defineSchema, s } from "@schemavaults/sdk";

export const Article = defineSchema("Article", {
  title: s.string().min(1).max(200),
  body: s.markdown(),
  author: s.ref("User"),
  tags: s.array(s.string()).default([]),
  publishedAt: s.datetime().optional(),
});

// One schema. Reuse it in your frontend, backend,
// agents, and CMS — fully type-safe everywhere.
export type Article = s.infer<typeof Article>;`;

const writeReadCode = `import { vault } from "./vault";
import { Article } from "./schemas/Article";

// Validated on write — invalid shapes throw at the type
// AND runtime layer. No silent bad data in your DB.
const post = await vault.insert(Article, {
  title: "Hello, SchemaVaults",
  body: "# Getting started ...",
  author: currentUser.id,
  tags: ["intro", "tutorial"],
});

// Type-safe graph traversal across references.
const withAuthor = await vault
  .find(Article, post.id)
  .expand("author");
//      ^? Article & { author: User }`;

const agentCode = `import { createAgent } from "@schemavaults/agents";
import { Article } from "./schemas/Article";

// Give your agent typed tools that read/write
// SchemaVault data — no more JSON soup.
export const editor = createAgent({
  model: "claude-opus-4-7",
  tools: {
    publishArticle: vault.tool.insert(Article),
    findArticles: vault.tool.search(Article),
  },
});

// Agent outputs and memories are validated against
// your schemas — broken thoughts are caught at the
// MCP boundary, never written to your vault.`;

interface Sample {
  id: string;
  icon: typeof Braces;
  title: string;
  description: string;
  code: string;
  language: string;
  filename: string;
}

const samples: readonly Sample[] = [
  {
    id: "define",
    icon: Braces,
    title: "1. Define your schema",
    description:
      "Declare a schema once. SchemaVaults infers TypeScript types automatically — write your data model in one place, get end-to-end safety for free.",
    code: defineSchemaCode,
    language: "ts",
    filename: "schemas/Article.ts",
  },
  {
    id: "store",
    icon: Database,
    title: "2. Validate, store, and query",
    description:
      "Inserts and queries are validated against your schema. Traverse references across your graph with full type-inference — no DSL, no codegen step.",
    code: writeReadCode,
    language: "ts",
    filename: "server/articles.ts",
  },
  {
    id: "agent",
    icon: BotMessageSquare,
    title: "3. Plug into agents and workflows",
    description:
      "Expose vaults to LLM agents as typed MCP tools. Agent thoughts, memories, and artifacts are schema-validated — so bad outputs never silently pollute your data.",
    code: agentCode,
    language: "ts",
    filename: "agents/editor.ts",
  },
];

export function CodeShowcaseSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.CODE_SHOWCASE_SECTION}
      className={cn(
        "w-screen h-auto",
        "py-16 md:py-24 lg:py-32",
        "bg-background",
        "flex flex-col items-center",
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Built for developers. Loved by AI agents.
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
            A single source of truth for your data shapes — usable from your
            TypeScript SDK, your visual editor, or natural-language prompts.
          </p>
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          {samples.map((sample, index) => {
            const reverse = index % 2 === 1;
            return (
              <div
                key={sample.id}
                className={cn(
                  "grid gap-8 lg:gap-12 items-center",
                  "lg:grid-cols-2",
                )}
              >
                <div
                  className={cn(
                    "space-y-4",
                    reverse ? "lg:order-2" : "lg:order-1",
                  )}
                >
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                    <sample.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                    {sample.title}
                  </h3>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    {sample.description}
                  </p>
                </div>
                <div className={reverse ? "lg:order-1" : "lg:order-2"}>
                  <CodeBlock
                    value={sample.code}
                    language={sample.language}
                    title={sample.filename}
                    showLineNumbers
                    variant="default"
                    size="sm"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CodeShowcaseSection;
