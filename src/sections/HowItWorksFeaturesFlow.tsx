"use client";

export interface Feature {
  id: string;
  heading: string;
  subheading: string;
  body: string;
  image: string;
}

export interface FeaturesFlowProps {
  features?: Feature[];
}

import FullscreenImage from "@/components/FullscreenImage";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import useRegisterPageHref from "@/hooks/useRegisterPageHref";
import useTrackConversionEvent from "@/hooks/useTrackConversionEvent";
import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";
import { Button, cn } from "@schemavaults/ui";
import { ArrowRight, ArrowDown, Maximize2 } from "lucide-react";
import type { ReactElement } from "react";

const defaultFeatures: Feature[] = [
  {
    id: "1",
    heading: "Define Datatype Schema",
    subheading: "Structure Your Information",
    body:
      "Start by defining your data schema and types using our visual schema editor interface or agentic chatbot." +
      " " +
      "Create custom data structures that fit your specific needs.",
    image:
      "/media/marketing-landing-page/feature-flow-images/1-schema-editor.png",
  },
  {
    id: "2",
    heading: "Create Your Vault",
    subheading: "Secure Storage Solutions",
    body:
      "Deploy your data vault anywhere - on our cloud platform for easy scalability and set-up, in-memory for lightning-fast local access, or in your own datacenter." +
      " " +
      "Choose the storage solution that best fits your security and performance requirements.",
    image:
      "/media/marketing-landing-page/feature-flow-images/2-vault-graph-browser.png",
  },
  {
    id: "3",
    heading: "Integrate",
    subheading: "Trigger Events/Workflows & Load Vault Data",
    body:
      "Create intelligent agents or workflows that interact with your data and respond to real-time events (that actually know what type of data they're working with)." +
      " " +
      "Or, just use SchemaVaults as a powerful content management system.",
    image: "/media/marketing-landing-page/feature-flow-images/3-integrate.png",
  },
];

function StepCopy({ feature }: { feature: Feature }): ReactElement {
  return (
    <div className="text-center">
      <h3 className="text-xl font-bold mb-2">{feature.heading}</h3>
      <h4 className="text-lg text-muted-foreground font-medium mb-3">
        {feature.subheading}
      </h4>
      <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
        {feature.body}
      </p>
    </div>
  );
}

function StepNumber({ index }: { index: number }): ReactElement {
  return (
    <div
      className="absolute -top-4 -left-4 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-md"
      aria-hidden="true"
    >
      {index + 1}
    </div>
  );
}

/**
 * A fixed-ratio frame for the product screenshots: it keeps the three steps'
 * headings on the same baseline and shows each screenshot whole instead of
 * cropping it to a fixed pixel height.
 */
const screenshotFrameClassName: string = cn(
  "aspect-[4/3] w-full overflow-hidden",
  "rounded-lg border bg-background/70 p-2 shadow-lg",
);

/** Hints that the product screenshots can be opened at full size. */
function EnlargeHint(): ReactElement {
  return (
    <span
      className={cn(
        "pointer-events-none absolute bottom-2 right-2",
        "flex flex-row flex-nowrap gap-1 items-center",
        "rounded-md bg-background/85 px-2 py-1",
        "text-[11px] font-medium text-muted-foreground",
      )}
    >
      <Maximize2 className="h-3 w-3" aria-hidden="true" />
      Click to enlarge
    </span>
  );
}

export function HowItWorksFeaturesFlow({
  features = defaultFeatures,
}: FeaturesFlowProps) {
  const privateBeta: boolean = usePrivateBeta();
  const registerHref: string = useRegisterPageHref();
  const track = useTrackConversionEvent();

  return (
    <section
      id={MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION}
      className={cn(
        "w-full h-auto",
        "py-12 md:py-24 lg:py-32",
        "bg-gradient-to-b",
        "from-gray-50 dark:from-gray-600",
        "to-accent",
        "flex flex-col justify-start items-center",
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-balance">
            Schema to production in three steps
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            No migrations to write, no validation code to copy between services.
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-start justify-center gap-8">
          {features.map((feature, index) => (
            <div key={feature.id} className="flex items-start">
              <div className="flex flex-col items-center w-[22rem]">
                <div className="relative mb-6 w-full">
                  <div className={screenshotFrameClassName}>
                    <FullscreenImage
                      src={feature.image}
                      width={400}
                      height={350}
                      alt={`${feature.heading} — ${feature.subheading}`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <StepNumber index={index} />
                  <EnlargeHint />
                </div>
                <StepCopy feature={feature} />
              </div>

              {index < features.length - 1 && (
                <div className="mx-8 flex items-center self-center">
                  <ArrowRight
                    className="h-8 w-8 text-primary"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden space-y-8">
          {features.map((feature, index) => (
            <div key={feature.id} className="flex flex-col items-center">
              <div className="flex flex-col items-center max-w-md mx-auto">
                {/* Screenshots are the strongest proof on this page, so show
                    them whole rather than cropping to a fixed height — and let
                    mobile open them full-screen too. */}
                <div className="relative mb-6 w-full max-w-sm">
                  <div className={screenshotFrameClassName}>
                    <FullscreenImage
                      src={feature.image}
                      width={400}
                      height={350}
                      alt={`${feature.heading} — ${feature.subheading}`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <StepNumber index={index} />
                  <EnlargeHint />
                </div>
                <div className="px-4">
                  <StepCopy feature={feature} />
                </div>
              </div>

              {index < features.length - 1 && (
                <div className="mt-8 flex justify-center">
                  <ArrowDown
                    className="h-8 w-8 text-primary"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* A visitor who just read the whole flow is the most likely to convert;
            previously the nearest action was another two sections away. */}
        <div className="mt-14 flex justify-center">
          <Button size="lg" asChild>
            <a
              href={
                privateBeta
                  ? `#${MarketingLandingPageSectionIds.CALL_TO_ACTION_SECTION}`
                  : registerHref
              }
              className="flex flex-row flex-nowrap gap-2 items-center justify-start"
              onClick={() =>
                track("hero_primary_cta_click", {
                  section:
                    MarketingLandingPageSectionIds
                      .HOW_IT_WORKS_FEATURES_FLOW_SECTION,
                  label: privateBeta
                    ? "Request an invite"
                    : "Build your first vault",
                })
              }
            >
              {privateBeta ? "Request an invite" : "Build your first vault"}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksFeaturesFlow;
