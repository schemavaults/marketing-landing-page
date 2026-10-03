"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
  Wordmark,
} from "@schemavaults/ui";
import { Quote } from "lucide-react";
import type { FC } from "react";
import type { ImageProps } from "next/image";
import type { ReactElement } from "react";

export interface Testimonial {
  /** The pull quote, without surrounding quotation marks. */
  quote: string;
  /** Who said it. */
  author: string;
  /** Their role and company, e.g. "Staff Engineer, Acme". */
  role?: string;
}

export interface CustomerLogo {
  src: string;
  /** Company name — also used as the image alt text. */
  name: string;
  width?: number;
  height?: number;
}

export interface SocialProofSectionProps {
  /**
   * Real customer or design-partner quotes. Nothing is rendered when this is
   * empty, so the section never ships placeholder praise.
   */
  testimonials?: readonly Testimonial[];
  /** Real customer or design-partner logos. Omitted entirely when empty. */
  logos?: readonly CustomerLogo[];
  /** Required only when `logos` are supplied. */
  Image?: FC<ImageProps>;
}

interface ComparisonRow {
  concern: string;
  handRolled: string;
  documentDb: string;
  schemaVaults: string;
}

/**
 * The three options a prospective user is actually choosing between. Every
 * claim in the SchemaVaults column is one the rest of the page substantiates.
 */
const comparisonRows: readonly ComparisonRow[] = [
  {
    concern: "Source of truth for your types",
    handRolled: "Copy-pasted between every service",
    documentDb: "Lives in app code, not the database",
    schemaVaults: "One schema, shared by every consumer",
  },
  {
    concern: "When invalid data is caught",
    handRolled: "Only where someone remembered to validate",
    documentDb: "After it is already written",
    schemaVaults: "Rejected at the vault boundary",
  },
  {
    concern: "AI agent input & output",
    handRolled: "Prompt and hope",
    documentDb: "Prompt and hope",
    schemaVaults: "MCP tools typed from your schema",
  },
  {
    concern: "Relationships between records",
    handRolled: "Hand-written joins in app code",
    documentDb: "Denormalise, or join at read time",
    schemaVaults: "Native graph traversal",
  },
  {
    concern: "Editing data without a developer",
    handRolled: "Build and maintain an admin panel",
    documentDb: "Build and maintain an admin panel",
    schemaVaults: "Schema editor & vault browser included",
  },
  {
    concern: "Where it runs",
    handRolled: "Yours to operate",
    documentDb: "Wherever the vendor allows",
    schemaVaults: "Our cloud, your cluster, or in-memory",
  },
];

function TestimonialsBlock({
  testimonials,
}: {
  testimonials: readonly Testimonial[];
}): ReactElement {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
      {testimonials.map((testimonial) => (
        <Card key={`${testimonial.author}:${testimonial.quote.slice(0, 24)}`}>
          <CardHeader>
            <Quote
              className="h-6 w-6 text-primary"
              aria-hidden="true"
            />
          </CardHeader>
          <CardContent className="space-y-4">
            <blockquote className="text-base leading-relaxed">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <footer className="text-sm">
              <span className="font-semibold">{testimonial.author}</span>
              {testimonial.role && (
                <span className="text-muted-foreground">
                  {" "}
                  — {testimonial.role}
                </span>
              )}
            </footer>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function LogosBlock({
  logos,
  Image,
}: {
  logos: readonly CustomerLogo[];
  Image: FC<ImageProps>;
}): ReactElement {
  return (
    <div className="mb-16 space-y-4 text-center">
      <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Already building on SchemaVaults
      </p>
      <ul className="flex flex-row flex-wrap items-center justify-center gap-8 md:gap-12">
        {logos.map((logo) => (
          <li key={logo.name}>
            <Image
              src={logo.src}
              alt={logo.name}
              width={logo.width ?? 120}
              height={logo.height ?? 40}
              className="h-8 w-auto object-contain opacity-70 transition-opacity hover:opacity-100 dark:invert"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SocialProofSection({
  testimonials,
  logos,
  Image,
}: SocialProofSectionProps = {}): ReactElement {
  const hasTestimonials: boolean = !!testimonials && testimonials.length > 0;
  const hasLogos: boolean = !!logos && logos.length > 0 && !!Image;

  return (
    <section
      id={MarketingLandingPageSectionIds.SOCIAL_PROOF_SECTION}
      className={cn(
        "py-24 w-full",
        "flex justify-center items-start",
        "bg-background",
      )}
    >
      <div className="container px-4 md:px-6">
        {hasLogos && Image && <LogosBlock logos={logos!} Image={Image} />}
        {hasTestimonials && (
          <TestimonialsBlock testimonials={testimonials!} />
        )}

        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance">
            Why not just validate in your app code?
          </h2>
          <p className="mx-auto max-w-[46rem] text-muted-foreground text-lg text-pretty">
            You can — until the third service, the second language, and the
            first AI agent all need to agree on the same shape.
          </p>
        </div>

        {/* Desktop: a single scannable comparison table. */}
        <div className="hidden md:block overflow-hidden rounded-xl border">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">
              How SchemaVaults compares to hand-rolled validation and a
              document database
            </caption>
            <thead>
              <tr className="bg-muted/60">
                <th scope="col" className="p-4 text-left font-semibold">
                  What you care about
                </th>
                <th
                  scope="col"
                  className="p-4 text-left font-semibold text-muted-foreground"
                >
                  Validation in each app
                </th>
                <th
                  scope="col"
                  className="p-4 text-left font-semibold text-muted-foreground"
                >
                  A document database
                </th>
                <th scope="col" className="p-4 text-left font-semibold">
                  <Wordmark />
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.concern} className="border-t">
                  <th
                    scope="row"
                    className="p-4 text-left align-top font-medium"
                  >
                    {row.concern}
                  </th>
                  <td className="p-4 align-top text-muted-foreground">
                    {row.handRolled}
                  </td>
                  <td className="p-4 align-top text-muted-foreground">
                    {row.documentDb}
                  </td>
                  <td className="p-4 align-top font-medium bg-primary/5">
                    {row.schemaVaults}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: the same content, stacked, without a horizontal scroller. */}
        <div className="md:hidden grid gap-4">
          {comparisonRows.map((row) => (
            <Card key={row.concern}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{row.concern}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Validation in each app
                  </p>
                  <CardDescription>{row.handRolled}</CardDescription>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    A document database
                  </p>
                  <CardDescription>{row.documentDb}</CardDescription>
                </div>
                <div className="rounded-md bg-primary/5 p-3">
                  <p className="text-xs uppercase tracking-wide text-primary">
                    SchemaVaults
                  </p>
                  <p className="font-medium">{row.schemaVaults}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SocialProofSection;
