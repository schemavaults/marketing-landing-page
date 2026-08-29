/**
 * The site header is `fixed` and 4rem (`h-16`) tall, so an in-page anchor jump
 * would otherwise scroll a section's heading underneath it. Every landing page
 * section that owns an anchor id applies this class so the heading lands just
 * below the header instead of behind it.
 */
const sectionAnchorOffsetClassName: string = "scroll-mt-16 md:scroll-mt-20";

export default sectionAnchorOffsetClassName;
