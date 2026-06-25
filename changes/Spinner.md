# Spinner — prod → expected

Source: `@insightis/ui` `Spinner`. Storybook: `#spinner` section (`insightis-preview-kit.html:1055`), shared with [CircularProgress](CircularProgress.md).

**No change (—).** Indeterminate loading spinner. Marked "No change —" in the storybook. This doc records the real reproduction values so the spinner is self-reproducing; only underlying hex shifts (documented in [`colors`](colors.md)).

## What the spinner is

Two distinct things in the kit carry the "spinner" name — document both:

1. **Standalone `.spin` SVG** — the catalogue spinner (storybook `#spinner` preview).
2. **`.spinner` inline loader** — a CSS border-ring used inside buttons (`.btn .spinner`, `.iconbtn .spinner`) and file-upload rows (`.file .file-r .spinner`).

## 1 · Standalone spinner — `.spin` SVG (storybook `#spinner`, lines 1062 / 1066)

| Property | Value |
|---|---|
| Size | **24×24px** (`width="24" height="24"`) |
| viewBox | `0 0 24 24` |
| Geometry | single arc `path d="M21 12a9 9 0 1 1-6.219-8.56"` (≈ 270° open ring, r = 9 in viewBox units) |
| Stroke width | **2.5px** |
| Stroke colour | `--brand-primary` · `fill:none`, default `stroke-linecap` (butt) |
| Animation | `.spin{animation:spin 1s linear infinite}` → `@keyframes spin{to{transform:rotate(360deg)}}` (`pages/kit-theme.css:1004`) |

The `.spin` class itself carries **only** the rotation animation; size, stroke, and colour live on the inline SVG attributes. No padding (it is a bare SVG).

## 2 · Inline loader ring — `.spinner` (border-based)

**Button / IconButton variant** (`pages/kit-theme.css:571`):

| Property | Value |
|---|---|
| Size | **.85em × .85em** (scales with button font-size) |
| Radius | **9999px** (full circle) |
| Border | **2px solid `currentColor`**, `border-right-color:transparent` (the gap that makes it read as a spinner) |
| Display | `inline-block`, `vertical-align:-.1em` |
| Animation | `btn-spin .7s linear infinite` |

**File-upload-row variant** (`pages/kit-theme.css:1570`, shown when `.file.s-loading`):

| Property | Value |
|---|---|
| Size | **14×14px** |
| Radius | **9999px** |
| Border | **2px solid `currentColor`**, `border-right-color:transparent` |
| Animation | `btn-spin .7s linear infinite` |

No padding on either loader ring — they are sized by `width`/`height` and inherit colour via `currentColor`.

## A11y

- Spinner is decorative/loading-state only; conveys progress via motion. Consumer should pair with an `aria-busy`/`aria-live` region or visible "Loading…" text — spinner alone is not announced.

## No change (—)

Sizes (24px standalone, .85em button, 14px file-row), 2px / 2.5px strokes, full radius, `currentColor` / `--brand-primary` colours, `spin 1s` / `btn-spin .7s` linear-infinite animations. Only brand hex shifts → [colors](colors.md).
