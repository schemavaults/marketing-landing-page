/**
 * The site header is `fixed` and 4rem (`h-16`) tall, so in-page anchor targets
 * need a matching scroll margin -- otherwise the heading of whichever section
 * the visitor jumps to lands underneath the header and looks truncated.
 */
export const SECTION_SCROLL_MARGIN_CLASSNAME: string =
  "scroll-mt-20 md:scroll-mt-24";

export default SECTION_SCROLL_MARGIN_CLASSNAME;
