# DropZone — component

**Status:** New kit component (no prod equivalent). CSS lives in `pages/kit-theme.css`; demoed in storybook `#dropzone`; first used on the Files page ([`pages/approved/data-sources_files-landing.html`](../pages/approved/data-sources_files-landing.html)).

File-upload target: drag-and-drop **and** click-to-browse. Centered dashed zone with the upload icon inline with the title, a helper line, and a Browse button.

## Anatomy

`.dsf-drop` › `.dsf-drop-head` ( `.dsf-drop-ic` + `.dsf-drop-title` ) + `.dsf-drop-sub` + `.btn.btn-outline.btn-sm`.

## States

| State | Trigger | Treatment |
|---|---|---|
| Rest | — | `1.5px` dashed `--dropzone-border` on `--dropzone-fill`; icon `Text/Secondary` |
| Hover / focus | `:hover` (`.s-hover`) · `:focus-within` (`.s-focus`) | border + icon tint toward `Brand/Primary`, faint brand wash on the fill |
| Drag over | `.is-dragover` (`.s-dragover`) — JS toggles on `dragover` / `drop` | solid `Brand/Primary` border + `State/Hover` fill (the active drop target) |

`.s-hover` / `.s-focus` / `.s-dragover` are storybook state hooks that mirror the live pseudo-classes.

## Colour tokens

- Rest reads `--card2` fill + **`--dropzone-border`** (Slate-300 light / Grey-600 dark) — one notch stronger than `--border`, because the page bg (Slate-50) is near-white so surface fills give almost no contrast; the dashed outline must carry the edge. Drag-over reads `--state-hover` + `--brand-primary`.
- Hover/focus overlay uses an inline `color-mix(in srgb, var(--brand-primary) …)` — single-use overlay following the sibling `.chip-meta` / `.chat-row-more` hover convention (not lifted to a token, consistent with the kit's other hover-border states).

## A11y

- The keyboard entry point is the inner **Browse** button (kit `.btn` focus ring); its focus lifts the whole zone via `:focus-within`, so keyboard users see the same affordance as mouse hover.
- Drag-over is conveyed by border **style** (dashed → solid) + colour + fill, not colour alone (WCAG 1.4.1).
- The icon is decorative (`aria-hidden`); the zone carries an `aria-label`.

## No change (—)

Brand-new component, so there is no prod → Expected diff and no Current column (per the new-component convention).
