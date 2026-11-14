"use client";

import usePrivateBeta from "@/hooks/usePrivateBeta";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import {
  BackgroundBlur,
  Badge,
  Button,
  cn,
  CodeBlock,
  Wordmark,
} from "@schemavaults/ui";
import {
  ArrowRight,
  BookOpenText,
  Cloud,
  Mail,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { ReactElement } from "react";

const backgroundImageHref =
  "/media/marketing-landing-page/hero-background.webp";

const description: string =
  "Define each data type once as a schema. Re-use and compose it to validate and store data across your agents, workflows, websites, mobile apps, and CMS — with end-to-end TypeScript types you never hand-write twice.";

/**
 * A short, concrete proof-of-product snippet.
 *
 * Shown directly in the hero: for a developer audience, seeing the shape of
 * the API above the fold converts far better than another paragraph of prose.
 */
const heroCodeSample: string = `// One schema, defined once.
const BlogPost = vault.schema("BlogPost", {
  title:  vault.string().max(120),
  body:   vault.markdown(),
  author: vault.ref("Author"),
});

// Reads & writes are validated and fully typed.
const post = await vault.get(BlogPost, postId);
post.author.name; // typed. no casting, no guessing.`;

/**
 * Factual, verifiable capability claims -- no invented metrics or logos.
 * Swap these for customer logos / real usage numbers once they exist.
 */
const trustSignals: readonly { icon: typeof Cloud; label: string }[] = [
  { icon: ShieldCheck, label: "Schema-enforced on every write" },
  { icon: Cloud, label: "Cloud, in-memory, or self-hosted" },
  { icon: Workflow, label: "MCP-ready for AI agents" },
];

function HeroSectionBackgroundContent(): ReactElement {
  return (
    <div className="w-full h-full">
      {/*
        eslint-disable-next-line @next/next/no-img-element --
        Decorative full-bleed background; intentionally not next/image so the
        package stays host-framework agnostic. Marked high priority for LCP.
      */}
      <img
        className="object-cover w-full h-full"
        src={backgroundImageHref}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
}

function HeroSectionContent(): ReactElement {
  const privateBeta: boolean = usePrivateBeta();
  const registerHref: string = useRegisterPageHref();

  /**
   * Exactly one visually primary action. During the private beta the only
   * action most visitors can actually complete is joining the waitlist, so
   * that becomes the primary CTA and registration drops to secondary.
   */
  const primaryCta: ReactElement = privateBeta ? (
    <Button size="lg" asChild>
      <a
        href={`#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`}
        className="flex flex-row flex-nowrap gap-2 items-center justify-center"
      >
        <Mail className="h-4 w-4" />
        Get early access
      </a>
    </Button>
  ) : (
    <Button size="lg" asChild>
      <a
        href={registerHref}
        className="flex flex-row flex-nowrap gap-2 items-center justify-center"
      >
        Start building free
        <ArrowRight className="h-4 w-4" />
      </a>
    </Button>
  );

  return (
    <div
      className={cn(
        "w-full min-h-svh",
        "flex flex-col items-center justify-center",
        "gap-4 md:gap-5",
        // Clear the fixed 4rem header so nothing is hidden behind it on
        // short viewports (e.g. phones in landscape).
        "pt-24 pb-16 md:pt-28 md:pb-20",
        "px-4 md:px-8 lg:px-16 xl:px-32",
      )}
    >
      {privateBeta && (
        <Badge
          variant="secondary"
          className="flex flex-row flex-nowrap items-center gap-1.5 px-3 py-1"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Private beta &mdash; public launch coming soon
        </Badge>
      )}

      <h1
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl",
          "text-center text-balance",
          "font-bold max-w-[90vw] md:max-w-[80vw] lg:max-w-[62vw]",
        )}
      >
        Stop shipping data your code can&rsquo;t trust
      </h1>

      <h2 className="text-lg md:text-xl font-medium text-center text-balance tracking-tight text-muted-foreground">
        <Wordmark />{" "}
        is type-safe data storage for AI agents, workflows, and apps.
      </h2>

      <p className="max-w-[85vw] md:max-w-[65vw] lg:max-w-[52vw] text-center text-balance text-muted-foreground">
        {description}
      </p>

      <div className="flex flex-col flex-nowrap sm:flex-wrap sm:flex-row gap-3 md:gap-4 items-center justify-center mt-1 w-full sm:w-auto">
        {primaryCta}
        <Button size="lg" variant="outline" asChild>
          <a
            href={`#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`}
            className="flex flex-row flex-nowrap gap-2 items-center justify-center"
          >
            <BookOpenText className="h-4 w-4" />
            See how it works
          </a>
        </Button>
      </div>

      {privateBeta && (
        <a
          href={registerHref}
          className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
        >
          Already have an invite code? Register here
        </a>
      )}

      <div className="w-full max-w-xl mt-2 text-left hidden sm:block">
        <CodeBlock
          value={heroCodeSample}
          language="ts"
          title="schema.ts"
          variant="subtle"
          size="sm"
          maxHeight="18rem"
        />
      </div>

      <ul className="flex flex-row flex-wrap gap-x-5 gap-y-2 items-center justify-center mt-1">
        {trustSignals.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex flex-row flex-nowrap gap-1.5 items-center text-xs md:text-sm text-muted-foreground"
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HeroSection(): ReactElement {
  return (
    <section
      id={MarketingLandingPageSectionIds.HERO_SECTION}
      className="w-full min-h-svh h-auto scroll-mt-16"
    >
      <BackgroundBlur
        background={HeroSectionBackgroundContent}
        foreground={HeroSectionContent}
        intensity="xs"
      />
    </section>
  );
}

export default HeroSection;
