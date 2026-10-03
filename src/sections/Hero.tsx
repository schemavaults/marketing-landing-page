"use client";

import JoinMailingListForm from "@/components/JoinMailingListForm";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import useTrackConversionEvent from "@/hooks/useTrackConversionEvent";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { Badge, BackgroundBlur, Button, cn } from "@schemavaults/ui";
import {
  ArrowRight,
  BookOpenText,
  BotMessageSquare,
  ServerCog,
  ShieldCheck,
} from "lucide-react";
import type { ReactElement } from "react";

const backgroundImageHref =
  "/media/marketing-landing-page/hero-background.webp";
const description: string =
  "Define each data type once as a schema. Reuse it everywhere — your agents, pipelines, apps, and CMS all read and write against the same validated source of truth.";

/**
 * Three short reasons-to-believe shown directly under the hero CTA. Each one
 * is expanded on further down the page, so the hero can stay skimmable while
 * still answering "why should I trust this?" above the fold.
 */
const reassurances: readonly { icon: typeof ShieldCheck; label: string }[] = [
  { icon: ShieldCheck, label: "Every read & write schema-validated" },
  { icon: BotMessageSquare, label: "MCP-native for AI agents" },
  { icon: ServerCog, label: "Serverless or self-hosted" },
];

function HeroSectionBackgroundContent(): ReactElement {
  return (
    <div className="w-full h-full">
      {/* Decorative only: the empty alt keeps it out of the accessibility tree. */}
      <img
        className="object-cover w-full h-full"
        src={backgroundImageHref}
        alt=""
        aria-hidden="true"
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
}

function HeroSectionContent(): ReactElement {
  const privateBeta: boolean = usePrivateBeta();
  const registerHref: string = useRegisterPageHref();
  const track = useTrackConversionEvent();

  return (
    <div
      className={cn(
        "w-full min-h-svh",
        "flex flex-col items-center justify-center",
        "gap-4 md:gap-5",
        // Offset the fixed 4rem header so centred content is never tucked
        // underneath it, and allow the section to grow on short viewports
        // instead of clipping the call to action.
        "pt-24 pb-16 md:pt-28 md:pb-20",
        "px-4 md:px-8 lg:px-16 xl:px-32",
      )}
    >
      <Badge variant="outline" className="bg-background/70 backdrop-blur">
        {privateBeta
          ? "Private beta — invites rolling out"
          : "Available now"}
      </Badge>

      <h1
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl",
          "text-center text-balance",
          "font-bold max-w-[90vw] md:max-w-[80vw] lg:max-w-[64rem]",
        )}
      >
        Type-safe data for AI agents, workflows, and apps
      </h1>

      <p className="max-w-[75vw] md:max-w-[65vw] lg:max-w-[48rem] text-center text-pretty text-base md:text-lg text-muted-foreground">
        {description}
      </p>

      {privateBeta ? (
        <>
          {/* During the private beta the waitlist is the only action almost
              every visitor can actually complete, so it goes above the fold
              rather than a screen-length scroll away. */}
          <JoinMailingListForm
            section={MarketingLandingPageSectionIds.HERO_SECTION}
            submitLabel="Request an invite"
            privacyNote="We email you when your invite is ready. No spam, unsubscribe in one click."
            className="mt-2"
          />
          <div className="flex flex-col flex-nowrap sm:flex-row gap-3 md:gap-4 items-center justify-center">
            <Button size="lg" variant="outline" asChild>
              <a
                href={`#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`}
                className="flex flex-row flex-nowrap gap-2 items-center justify-start"
                onClick={() =>
                  track("hero_secondary_cta_click", {
                    section: MarketingLandingPageSectionIds.HERO_SECTION,
                    label: "See how it works",
                  })
                }
              >
                <BookOpenText className="h-4 w-4" />
                See how it works
              </a>
            </Button>
            <Button size="lg" variant="link" asChild>
              <a
                href={registerHref}
                className="flex flex-row flex-nowrap gap-2 items-center justify-start"
                onClick={() =>
                  track("hero_invite_code_click", {
                    section: MarketingLandingPageSectionIds.HERO_SECTION,
                  })
                }
              >
                Already have an invite code?
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col flex-nowrap sm:flex-row gap-3 md:gap-4 items-center justify-center mt-2">
          <Button size="lg" asChild>
            <a
              href={registerHref}
              className="flex flex-row flex-nowrap gap-2 items-center justify-start"
              onClick={() =>
                track("hero_primary_cta_click", {
                  section: MarketingLandingPageSectionIds.HERO_SECTION,
                  label: "Start building free",
                })
              }
            >
              Start building free
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a
              href={`#${MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}`}
              className="flex flex-row flex-nowrap gap-2 items-center justify-start"
              onClick={() =>
                track("hero_secondary_cta_click", {
                  section: MarketingLandingPageSectionIds.HERO_SECTION,
                  label: "See how it works",
                })
              }
            >
              <BookOpenText className="h-4 w-4" />
              See how it works
            </a>
          </Button>
        </div>
      )}

      <ul
        className={cn(
          "mt-2 flex flex-col sm:flex-row flex-wrap",
          "gap-x-6 gap-y-2 items-center justify-center",
          "text-sm text-muted-foreground",
        )}
      >
        {reassurances.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex flex-row flex-nowrap gap-2 items-center"
          >
            <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
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
      className="flex min-h-svh w-full overflow-hidden"
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
