# CLAUDE.md

Project: Insightis — every screen of the product as a working prototype, built on DevartUI.

**`devart-ui/` — the prototypes, on `@devart/ui-react`** (the vendored `ds-bundle/`). Every page, every state, built from DevartUI components; what DevartUI lacks lives once in the **Insightis custom kit** (`devart-ui/insightis-kit/<Name>/`, React, `window.InsightisKit`). Review chrome — the ReviewBar, the auth flow's top nav, URL-seeded review states — is not product and lives apart, in the **review kit** (`devart-ui/review-kit/`, `window.ReviewKit`); the custom kit never refers to it. Its own rules, page template and progress table: [`devart-ui/README.md`](devart-ui/README.md) — read it before touching anything there. Run `node devart-ui/tools/check.mjs` before committing it.

**дизайн DevartUI — the user's own design-system repository** — `../Design system/devart.ui.react` (components in `src/components/<Name>/`, a real Storybook). Always call it **«дизайн DevartUI»**, never plain "DevartUI", so it is not confused with the vendored copy or the frontend package. `ds-bundle/` here is only a vendored copy of its bundle and can lag behind it: check дизайн DevartUI before saying DevartUI lacks something, and say which of the two you mean. Re-vendoring is not drop-in — renames in the repo break the custom kit until it is migrated in the same pass. Other sessions edit and re-bundle that repo too; do not touch it unasked.

**`legacy-html/` — the previous approach, archived 2026-10-16** ([what, why, how to restore](legacy-html/README.md)). The HTML/CSS prototypes on `kit-theme.css`, the preview kit (storybook), the change docs (`changes/`, `current/`, `page-changes/`), components, skeletons, reports, specs and the CHANGELOG — moved there as whole trees, so every relative link inside still works. **Frozen: no new work goes there.** Two parts of it are still read:
- `legacy-html/pages/` is the reference every devart-ui page is checked against (`devart-ui/tools/compare.mjs`, `interact.mjs`, `measure.mjs` load the originals from it);
- the locked page rules in `legacy-html/page-changes/<page>.md` still bind the devart-ui pages.
The project instructions as they stood before the archive, verbatim: [`legacy-html/CLAUDE.md`](legacy-html/CLAUDE.md) — read them when working inside that folder.

Links stay relative so a clone never breaks. Old published addresses (`…/pages/…`, `…/insightis-preview-kit.html`, `…/changes/…` …) are redirected into `legacy-html/` by the root `404.html` on GitHub Pages.

## Design decisions (locked — they bind devart-ui too)

**Spacing follows the 4px design-system step** — never override the global `.cl-page` gap in a page `<style>` block. Use `margin-top` on individual section wrappers at valid 4px-step rem values (`.5rem`, `.75rem`, `1rem`, `1.25rem`, `1.5rem`, `2rem`, …).

**Visibility-toggle classes must never sit directly on a kit component** — kit components (`.banner`, `.card`, `.chip-row`, `.swt`, etc.) define their own `display` property (often `flex`). Putting a visibility class such as `mx-c1-only`, `mx-c3-only`, `mx-browse`, `mx-mymetrics` directly on the component overrides that `display` and breaks its layout. **Always wrap in a neutral `<div>`:**
```html
<!-- ✓ correct -->
<div class="mx-c1-only"><div class="banner" …>…</div></div>

<!-- ✗ breaks layout — mx-c1-only{display:block} overrides banner{display:flex} -->
<div class="banner mx-c1-only" …>…</div>
```
This applies to every visibility-toggle class. The wrapper `<div>` has no semantics of its own and does not affect spacing.

**Card hover** — all card / list-row components (`.chat-row`, `.ds-card`, `.ds-conn-row`, any future card) use the Chats Library hover recipe — NOT `border-color: var(--border-hover)`:
```css
background: var(--state-hover);
border-color: color-mix(in srgb, var(--brand-primary) 25%, transparent);
box-shadow: 0 2px 6px -1px rgba(15,23,42,.08), 0 1px 2px 0 rgba(15,23,42,.04);
```
Rest state also carries a ghost shadow: `box-shadow: 0 1px 2px 0 rgba(15,23,42,.03)`.
`--border-hover` is reserved for **form inputs only** (`.field`, `.ta`, `.igrp`).

**Type / icon marks are SQUARE — never stretch one to fit its label.** A coloured mark that carries a short label (`.dsf-file-ic` file-type mark, connector marks, avatars, any future `--mark-bg` square) keeps a 1:1 box. If the label does not fit the box, the label changes (shorten it, map it per type — `xlsx → XLS`) or the box grows on BOTH axes. Never `min-width` + horizontal padding so the mark widens with the text: a row of marks of different widths stops reading as one column. This costs row height — the Files table's 32px mark makes its rows 53px against the Connections table's 45px — and that is accepted; the shape wins over row-height parity (user directive 2026-09-20, after a 24px-tall variable-width version was tried and reverted the same day).
