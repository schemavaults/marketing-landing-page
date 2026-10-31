import MarketingLandingPageSectionIds from "@/MarketingLandingPageSectionIds";

export interface HeaderNavLink {
  label: string;
  sectionId: MarketingLandingPageSectionIds;
}

/**
 * The in-page section links shown in the header.
 *
 * Lives in its own module so that both the desktop header and the mobile
 * dropdown can import it without the two components importing each other.
 */
export const headerNavLinks: readonly HeaderNavLink[] = [
  {
    label: "How It Works",
    sectionId:
      MarketingLandingPageSectionIds.HOW_IT_WORKS_FEATURES_FLOW_SECTION,
  },
  {
    label: "Features",
    sectionId: MarketingLandingPageSectionIds.FEATURES_SECTION,
  },
  {
    label: "Pricing",
    sectionId: MarketingLandingPageSectionIds.PRICING_SECTION,
  },
  { label: "FAQ", sectionId: MarketingLandingPageSectionIds.FAQ_SECTION },
] as const;

export default headerNavLinks;
