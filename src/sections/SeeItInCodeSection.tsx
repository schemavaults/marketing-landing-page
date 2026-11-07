"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
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

/**
 * !! ACTION REQUIRED BEFORE THIS SHIPS !!
 *
 * These snippets are *illustrative placeholders*. They were written to give
 * the landing page the "show me the code" proof that developer-tooling
 * visitors look for before they will sign up, but the exact SDK surface
 * (package names, method names, option shapes) has NOT been verified against
 * a published SchemaVaults client SDK — no such package was available in this
 * repository's dependency tree.
 *
 * Whoever owns the SDK should replace the `code` values below with real,
 * copy-pasteable examples. Everything else in this section (layout, tabs,
 * headings, CTA) is production-ready and needs no changes.
 *
 * They are deliberately collected in one array so that swap is a single edit.
 */
interface CodeSample {
  id: string;
  /** Short tab label. */
  label: string;
  /** One-line explanation rendered above the snippet. */
  caption: string;
  /** Language label shown in the code block header. */
  language: string;
  /** Filename shown in the code block header. */
  title: string;
  code: string;
}

const codeSamples: readonly CodeSample[] = [
  {
    id: "define",
    label: "1. Define",
    caption:
      "Describe the shape of your data once — in the visual editor, by asking the assistant, or in TypeScript.",
    language: "ts",
    title: "schemas/invoice.ts",
    code: `import { schema, s } from "@schemavaults/sdk";

export const Invoice = schema("Invoice", {
  customer: s.ref("Customer"),
  issuedAt: s.datetime(),
  currency: s.enum(["USD", "EUR", "GBP"]),
  lineItems: s.array(
    s.object({
      description: s.string(),
      quantity: s.integer().min(1),
      unitPriceCents: s.integer().min(0),
    }),
  ),
  status: s.enum(["draft", "sent", "paid", "void"]).default("draft"),
});`,
  },
  {
    id: "store",
    label: "2. Store",
    caption:
      "Write to a vault. Anything that does not match the schema is rejected at the boundary, not three services later.",
    language: "ts",
    title: "server/create-invoice.ts",
    code: `import { Vault } from "@schemavaults/sdk";
import { Invoice } from "./schemas/invoice";

const vault = await Vault.connect({ vault: "billing" });

// Fully typed in, fully typed out — no casts, no \`any\`.
const invoice = await vault.create(Invoice, {
  customer: customerId,
  issuedAt: new Date(),
  currency: "USD",
  lineItems: [
    { description: "Teams plan", quantity: 1, unitPriceCents: 7900 },
  ],
});

invoice.status; // "draft" | "sent" | "paid" | "void"`,
  },
  {
    id: "agents",
    label: "3. Use it anywhere",
    caption:
      "The same schema powers your agents, your workflows and your frontend — so they cannot disagree about the data.",
    language: "ts",
    title: "agents/billing-agent.ts",
    code: `import { Vault } from "@schemavaults/sdk";
import { Invoice } from "./schemas/invoice";

const vault = await Vault.connect({ vault: "billing" });

// Agents read and write through the schema, over MCP, so their
// output is validated before it ever reaches your database.
const overdue = await vault.query(Invoice, {
  where: { status: "sent", issuedAt: { before: cutoff } },
  traverse: { customer: true },
});

for (const invoice of overdue) {
  invoice.customer.email; // typed through the graph edge
}`,
  },
];

export function SeeItInCodeSection(): ReactElement {
  const privateBeta: boolean = usePrivateBeta();
  const registerHref: string = useRegisterPageHref();

  return (
    <section
      id={MarketingLandingPageSectionIds.SEE_IT_IN_CODE_SECTION}
      className={cn(
        "w-full py-24",
        "scroll-mt-16",
        "bg-background",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-10 md:mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance">
            From schema to typed data in three steps
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg text-pretty">
            Prefer clicking to typing? Every one of these steps also works from
            the visual schema editor — the SDK is there when you want it, not
            because you need it.
          </p>
        </div>

        <Tabs
          defaultValue={codeSamples[0].id}
          className="max-w-3xl mx-auto w-full"
        >
          <TabsList className="mx-auto">
            {codeSamples.map((sample: CodeSample) => (
              <TabsTrigger key={sample.id} value={sample.id}>
                {sample.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {codeSamples.map((sample: CodeSample) => (
            <TabsContent
              key={sample.id}
              value={sample.id}
              className="mt-6 space-y-4"
            >
              <p className="text-sm md:text-base text-muted-foreground text-center text-pretty max-w-2xl mx-auto">
                {sample.caption}
              </p>
              <CodeBlock
                value={sample.code}
                language={sample.language}
                title={sample.title}
                showLineNumbers
                maxHeight="24rem"
              />
            </TabsContent>
          ))}
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-10">
          <Button size="lg" asChild>
            <a
              href={
                privateBeta
                  ? `#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`
                  : registerHref
              }
              className="flex flex-row flex-nowrap gap-2 items-center justify-start"
            >
              {privateBeta ? "Get early access" : "Create your first vault"}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <span className="text-sm text-muted-foreground">
            Free forever tier &bull; No credit card required
          </span>
        </div>
      </div>
    </section>
  );
}

export default SeeItInCodeSection;
