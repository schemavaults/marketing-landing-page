"use client";

import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { Card, CardContent, cn } from "@schemavaults/ui";
import { Quote } from "lucide-react";
import type { ImageProps } from "next/image";
import type { FC, ReactElement } from "react";

export interface Testimonial {
  id: string;
  /** The quote itself, without surrounding quotation marks. */
  quote: string;
  authorName: string;
  /** e.g. "Staff Engineer" */
  authorTitle?: string;
  /** e.g. "Acme Corp" */
  authorOrganization?: string;
  /** Optional square headshot. Rendered at 40x40. */
  avatarHref?: string;
}

export interface SocialProofLogo {
  id: string;
  /** Accessible name of the company/project, used as the image alt text. */
  name: string;
  logoHref: string;
}

export interface SocialProofStat {
  id: string;
  /** The number itself, pre-formatted, e.g. "1,200+" or "99.98%". */
  value: string;
  /** What the number measures, e.g. "developers on the waitlist". */
  label: string;
}

export interface SocialProofSectionProps {
  heading?: string;
  subheading?: string;
  logosHeading?: string;
  testimonials?: readonly Testimonial[];
  logos?: readonly SocialProofLogo[];
  stats?: readonly SocialProofStat[];
  /** Required only when `logos` or testimonial avatars are supplied. */
  Image?: FC<ImageProps>;
}

/**
 * Social proof is the single highest-leverage thing a pre-launch landing page
 * can add: visitors discount every claim a vendor makes about itself, and
 * discount almost none of what a named peer says.
 *
 * This section is intentionally **data-driven with no fabricated defaults** —
 * it renders `null` until real quotes, logos or metrics are supplied, so the
 * page never ships invented proof. Populate it from the consuming app:
 *
 *     <MarketingLandingPage
 *       socialProof={{
 *         stats: [{ id: "waitlist", value: "1,200+", label: "developers on the waitlist" }],
 *         testimonials: [{ id: "1", quote: "…", authorName: "…", authorOrganization: "…" }],
 *       }}
 *       … />
 *
 * Until then, the cheapest real proof to collect is (a) a live waitlist count,
 * (b) two or three quotes from existing private-beta users, and (c) logos of
 * any organization already running a vault.
 */
export function SocialProofSection({
  heading = "Teams already building on SchemaVaults",
  subheading,
  logosHeading = "Building with SchemaVaults",
  testimonials,
  logos,
  stats,
  Image,
}: SocialProofSectionProps): ReactElement | null {
  const hasTestimonials: boolean = !!testimonials && testimonials.length > 0;
  const hasLogos: boolean = !!logos && logos.length > 0;
  const hasStats: boolean = !!stats && stats.length > 0;

  if (!hasTestimonials && !hasLogos && !hasStats) {
    // Nothing real to show yet — render nothing rather than a placeholder.
    return null;
  }

  return (
    <section
      id={MarketingLandingPageSectionIds.SOCIAL_PROOF_SECTION}
      className={cn(
        "w-full py-20 md:py-24",
        "bg-background",
        "flex justify-center items-start",
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            {heading}
          </h2>
          {subheading && (
            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
              {subheading}
            </p>
          )}
        </div>

        {hasStats && (
          <dl
            className={cn(
              "grid gap-6 mb-12",
              "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
              "max-w-4xl mx-auto",
            )}
          >
            {stats!.map((stat: SocialProofStat) => (
              <div key={stat.id} className="text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-4xl font-bold tracking-tight">
                    {stat.value}
                  </span>
                  <span className="block mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        )}

        {hasTestimonials && (
          <ul
            className={cn(
              "grid gap-6",
              "md:grid-cols-2 lg:grid-cols-3",
              "list-none p-0 m-0",
            )}
          >
            {testimonials!.map((testimonial: Testimonial) => (
              <li key={testimonial.id} className="flex">
                <Card className="flex flex-col w-full shadow-lg border-0">
                  <CardContent className="flex flex-col gap-4 pt-6 grow">
                    <Quote
                      className="h-5 w-5 text-primary shrink-0"
                      aria-hidden="true"
                    />
                    <blockquote className="text-base leading-relaxed grow">
                      {testimonial.quote}
                    </blockquote>
                    <div className="flex flex-row items-center gap-3 pt-2 border-t">
                      {testimonial.avatarHref && Image && (
                        <Image
                          src={testimonial.avatarHref}
                          alt=""
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      )}
                      <div className="flex flex-col text-sm">
                        <span className="font-semibold">
                          {testimonial.authorName}
                        </span>
                        {(testimonial.authorTitle ||
                          testimonial.authorOrganization) && (
                          <span className="text-muted-foreground">
                            {[
                              testimonial.authorTitle,
                              testimonial.authorOrganization,
                            ]
                              .filter((part): part is string => !!part)
                              .join(", ")}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}

        {hasLogos && Image && (
          <div className={cn("mt-14", hasTestimonials && "pt-10 border-t")}>
            <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">
              {logosHeading}
            </p>
            <ul className="flex flex-row flex-wrap items-center justify-center gap-8 md:gap-12 list-none p-0 m-0">
              {logos!.map((logo: SocialProofLogo) => (
                <li key={logo.id}>
                  <Image
                    src={logo.logoHref}
                    alt={logo.name}
                    width={120}
                    height={40}
                    className="h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default SocialProofSection;
