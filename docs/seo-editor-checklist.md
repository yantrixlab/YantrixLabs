# SEO Editor Checklist (Two-Silo Policy)

## Silo Rules
- Agency pages/blog posts must not link to `/tools/gst-invoice` in body content.
- Tools/GST pages/blog posts must not link to `/services` in body content.
- Allowed exception: global header nav and tool footer text "Built by Yantrix Labs".

## Metadata Rules
- Every indexable page must have an absolute self canonical under `https://yantrixlab.com/...`.
- Agency pages use `og-agency.png`.
- GST/tool pages use `og-gst-tool.png`.
- Homepage uses `ProfessionalService` JSON-LD.
- GST tool page uses `SoftwareApplication` JSON-LD.

## Publishing Rules
- GST blog posts link back to `/tools/gst-invoice`.
- Agency blog posts link to `/services` or `/`.
- Keep one primary keyword intent per page.

## Validation
- Run `npm run seo:check` before merge.
- Verify sitemap contains the page URL.
- Verify robots still allows crawl and points to sitemap.
