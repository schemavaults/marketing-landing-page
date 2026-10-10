/**
 * FAQ content lives outside the React component so that both the rendered
 * accordion and the JSON-LD `FAQPage` structured data read from one source --
 * Google penalises FAQ markup that does not match the visible page.
 */

export interface FrequentlyAskedQuestion {
  id: string;
  question: string;
  answer: string;
}

/**
 * Objection handling. Every answer below restates a capability that is already
 * claimed elsewhere on the page -- nothing here introduces a new promise. When
 * the product changes, update the matching feature copy and this list together.
 */
export function buildDefaultFrequentlyAskedQuestions(
  privateBeta: boolean,
): readonly FrequentlyAskedQuestion[] {
  const availability: FrequentlyAskedQuestion = privateBeta
    ? {
        id: "availability",
        question: "When can I start using SchemaVaults?",
        answer:
          "SchemaVaults is in private beta and invites are going out in batches." +
          " " +
          "Join the waitlist below and we will email you once your invite code is ready." +
          " " +
          "If you already have an invite code, you can register and start building right now.",
      }
    : {
        id: "availability",
        question: "How long does it take to get started?",
        answer:
          "Create an account, define your first schema in the visual editor (or describe it to our AI), and spin up a vault." +
          " " +
          "You can be reading and writing schema-validated data from your app the same day — no infrastructure to provision.",
      };

  return [
    {
      id: "what-is-a-vault",
      question: "What exactly is a vault?",
      answer:
        'A vault is a database whose contents are enforced by a schema — a specification for the "shape" of the data allowed inside it.' +
        " " +
        "Because vaults store data as a graph rather than as fixed tables, they stay more flexible than a traditional relational database while still rejecting anything that does not match your types.",
    },
    {
      id: "vs-relational",
      question: "How is this different from Postgres or a normal database?",
      answer:
        "A relational database validates columns; SchemaVaults validates whole data types, and those types are the same objects your application code consumes." +
        " " +
        "Schemas can be nested inside other schemas and re-used across projects, so you define a type once instead of re-declaring it in your database, your API layer, and your frontend.",
    },
    {
      id: "no-code",
      question: "Do I need to write code to use it?",
      answer:
        "No. You can define schemas in the visual schema editor or simply describe what you are trying to store to our agentic chatbot." +
        " " +
        "If you would rather work in code, our TypeScript SDKs give you the same schemas with end-to-end type safety.",
    },
    {
      id: "ai-agents",
      question: "How does this help my AI agents?",
      answer:
        "Agents connect to your vaults over Model Context Protocol (MCP), so they read and write data that is validated against your schemas." +
        " " +
        "That means an agent's memories, thoughts, and artifacts come back in the shape you expected instead of free-form text you have to re-parse.",
    },
    {
      id: "hosting",
      question: "Where is my data stored? Can I self-host?",
      answer:
        "You choose. Run your vault on our cloud platform for the fastest set-up, in-memory for local development and lightning-fast local access, or inside your own datacenter or compute cluster." +
        " " +
        "Self-hosting and bring-your-own-compute are available on the Enterprise plan.",
    },
    {
      id: "reuse",
      question: "Can I share one schema across several apps?",
      answer:
        "Yes — that is the point. Publish a schema once and consume the same data type from your frontend apps, backend services, workflows, and data pipelines," +
        " " +
        "including schemas published to the global schema registry.",
    },
    {
      id: "pricing",
      question: "What does it cost to try?",
      answer:
        "The Free plan is $0 forever and includes 1 GB of storage, 3 vaults, 5 schemas in the global registry, and 100 agent queries per month." +
        " " +
        "Paid plans start at $19/month when you outgrow it, and Enterprise pricing is handled by our sales team.",
    },
    availability,
  ];
}
