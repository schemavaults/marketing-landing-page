"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import SECTION_SCROLL_MARGIN_CLASSNAME from "@/lib/sectionScrollMargin";
import {
  Button,
  CodeBlock,
  cn,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@schemavaults/ui";
import { ArrowRight } from "lucide-react";
import type { ReactElement } from "react";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";

export interface CodeExample {
  id: string;
  /** Short tab label, e.g. "Define a schema". */
  label: string;
  /** One sentence explaining what the snippet demonstrates. */
  caption: string;
  /** File path shown in the code block header. */
  title: string;
  /** Language label shown in the code block header. */
  language: string;
  code: string;
}

export interface CodeExampleSectionProps {
  heading?: string;
  subheading?: string;
  examples?: readonly CodeExample[];
}

/**
 * NOTE: these snippets are illustrative of the SDK surface and should be kept
 * in step with the published `@schemavaults/sdk` API. Override them with the
 * `examples` prop (or edit them here) rather than letting them drift.
 */
const defaultExamples: readonly CodeExample[] = [
  {
    id: "define",
    label: "1. Define a schema",
    caption:
      "Describe the shape of your data once — in the visual editor, by asking the assistant, or in TypeScript.",
    title: "schemas/support-ticket.ts",
    language: "ts",
    code: [
      'import { z } from "zod";',
      "",
      "export const SupportTicket = z.object({",
      "  subject: z.string().min(1),",
      '  severity: z.enum(["low", "medium", "high"]),',
      "  reporter: z.string().email(),",
      "  tags: z.array(z.string()).default([]),",
      "});",
      "",
      "export type SupportTicket = z.infer<typeof SupportTicket>;",
    ].join("\n"),
  },
  {
    id: "store",
    label: "2. Store & query",
    caption:
      "Writes are validated against the schema before they land, so a vault can never hold a malformed record.",
    title: "app/create-ticket.ts",
    language: "ts",
    code: [
      'import { SupportTicket } from "../schemas/support-ticket";',
      'import { vault } from "./vault";',
      "",
      "// Rejected at the edge if it does not match the schema:",
      "await vault.collection(SupportTicket).insert({",
      '  subject: "Export job never finished",',
      '  severity: "high",',
      '  reporter: "dana@example.com",',
      "});",
      "",
      "// Reads come back fully typed -- no casts, no guessing:",
      "const urgent = await vault",
      "  .collection(SupportTicket)",
      '  .where({ severity: "high" });',
    ].join("\n"),
  },
  {
    id: "agents",
    label: "3. Hand it to an agent",
    caption:
      "Expose the same schemas to your agents over Model Context Protocol, so their output is checked the same way your app's is.",
    title: "agents/triage.ts",
    language: "ts",
    code: [
      'import { SupportTicket } from "../schemas/support-ticket";',
      'import { vault } from "../app/vault";',
      "",
      "// The agent gets tools whose inputs and outputs are",
      "// described by your schema, not by a prose prompt:",
      "const tools = vault.mcpTools({",
      "  schemas: [SupportTicket],",
      '  access: "read-write",',
      "});",
      "",
      "// Anything the agent writes back is validated first.",
    ].join("\n"),
  },
];

export function CodeExampleSection({
  heading = "End-to-end type safety, in three steps",
  subheading = "Your schema is the contract. The editor, the vault, your app, and your agents all read from the same definition — so a change in one place can't silently break the others.",
  examples = defaultExamples,
}: CodeExampleSectionProps = {}): ReactElement {
  const privateBeta: boolean = usePrivateBeta();
  const registerHref: string = useRegisterPageHref();
  const firstExample: CodeExample | undefined = examples[0];

  return (
    <section
      id={MarketingLandingPageSectionIds.CODE_EXAMPLE_SECTION}
      className={cn(
        "py-24",
        "w-full",
        "flex justify-center items-start",
        SECTION_SCROLL_MARGIN_CLASSNAME,
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {heading}
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
            {subheading}
          </p>
        </div>

        {firstExample && (
          <Tabs
            defaultValue={firstExample.id}
            className="max-w-3xl mx-auto w-full"
          >
            <TabsList className="mx-auto mb-6 flex flex-wrap justify-center">
              {examples.map((example: CodeExample) => (
                <TabsTrigger key={example.id} value={example.id}>
                  {example.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {examples.map((example: CodeExample) => (
              <TabsContent
                key={example.id}
                value={example.id}
                className="space-y-4"
              >
                <p className="text-muted-foreground text-center text-sm md:text-base max-w-2xl mx-auto">
                  {example.caption}
                </p>
                <CodeBlock
                  value={example.code}
                  language={example.language}
                  title={example.title}
                  showLineNumbers
                  maxHeight="22rem"
                />
              </TabsContent>
            ))}
          </Tabs>
        )}

        <div className="text-center mt-10 space-y-3">
          <p className="text-sm text-muted-foreground">
            Prefer not to write any code? Define the same schema in the visual
            editor, or just describe it to the assistant.
          </p>
          {!privateBeta && (
            <Button variant="outline" asChild>
              <a
                href={registerHref}
                className="flex flex-row flex-nowrap gap-2 items-center justify-center"
              >
                Create your first vault
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

export default CodeExampleSection;
