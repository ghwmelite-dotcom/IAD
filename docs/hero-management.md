# Hero Slides management

Scope: /admin/hero manages the homepage carousel without a site rebuild.

- One versioned draft manifest and one published manifest in D1; images in R2.
- Existing four slides remain the initial published version and outage fallback.
- Editors can add/replace images, edit English/French copy and CTA links, set separate desktop/mobile focal points, select full-bleed/portrait framing, reorder, enable/disable and remove slides.
- Save draft does not alter the public site. Publish validates at least one enabled slide and atomically saves a new published snapshot. A revision conflict returns 409 rather than overwriting another editor.
- Only real cookie sessions with super_admin, content_manager, admin or director roles can manage hero content; demo headers are never accepted. Mutations require a same-origin custom request header. All saves, publications and uploads are audited.
- Image uploads: JPEG, PNG, WebP; strict signature validation; 6 MiB server limit. The editor resizes large uploads to 2400px and encodes WebP in the browser. No SVG uploads. R2 keys are immutable; draft uploads require an authorised session to preview. Public delivery only serves images referenced by the published manifest.
- Public API serves published enabled slides with no-store headers. The homepage fetches on load and when returning to the tab, with a 60-second refresh while visible. Failed refreshes retain the last successful content; bundled slides cover a first-load outage.
- Preview reflects desktop/mobile framing and English/French copy. Unsaved work triggers navigation protection. Public changes appear after refresh or the next polling interval.

Data migration: 0016_hero_content.sql (additive). No existing data is modified.
