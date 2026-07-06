# Tracking (letter-spacing) — foundation baseline

Storybook: [`insightis-preview-kit.html` → Typography](../insightis-preview-kit.html). Live CSS: [`../pages/kit-theme.css`](../pages/kit-theme.css).

This is a **foundation document**, not a prod→expected diff. Letter-spacing is a baseline the rest of the kit composes against; it flows through a small token scale so tracking stays consistent and **no component authors a raw `em` value**.

## Tracking tokens (flat scale)

Defined in `pages/kit-theme.css` (`:root`, right after the `--text-*` font-size scale):

| Token | value | Role |
|---|---|---|
| `--tracking-tight` | `-.01em` | Display headings & mono numerics — pulls large / tabular text a hair tighter (`.card-c .c-title`, `.cp-metric-val`, mono metric cells) |
| `--tracking-normal` | `0` | Body text & non-overline titles — the default, made explicit where a rule needs to state it (`.mx-panel-sect-title`) |
| `--tracking-label` | `.05em` | The **project-wide overline tracking** — every small UPPERCASE label / section header / badge (`.side .grp`, `.block-h`, `.spec b`, `.stbl th`, `.colhint`, `.spec-group`, `.pg-wip-tag`, `.pg-approved-tag`, `.mx-dl dt`, `.dp-label`, file-type badges, storybook overlines) |
| `--tracking-caps` | `.08em` | The **wider section overline** shared by the sidebar section label (`.sbx-sect-label`) and the composer menu heading (`.cl-menu-label`) — one intentional step airier than `--tracking-label` |

## Why two positive steps

`--tracking-label` (.05em) is the standard for the many small-caps labels across the kit. `--tracking-caps` (.08em) is a deliberately wider treatment reserved for the **sidebar / composer section overlines** — the composer "Recent files" heading mirrors the sidebar's `.sbx-sect-label` exactly, so both must resolve to the same token. Keeping them as two named steps (rather than one) preserves that intentional difference while still routing every value through a token.

## Migration note (this change)

Before: letter-spacing was authored as **six** different raw `em` values scattered across `kit-theme.css`, the storybook, and page `<style>` blocks (`-.01`, `.01`, `.03`, `.04`, `.05`, `.06`, `.08`). That spread was itself the inconsistency. The consolidation:

- `-.01em` → `--tracking-tight` (no visual change)
- `.01em` → `--tracking-normal` (`.mx-panel-sect-title`; imperceptible `.01`→`0`, non-uppercase title)
- `.03 / .04 / .06em` → `--tracking-label` (**snapped to `.05em`** — the visible harmonisation: table headers, spec-group, badges, `.mx-dl dt`, file-type badges)
- `.05em` → `--tracking-label` (no visual change)
- `.08em` → `--tracking-caps` (no visual change — **sidebar + composer untouched**)

Adding these four tokens obligated regenerating `FALLBACK_TOKEN_NAMES` in `insightis-preview-kit.html` (done — the `--tracking-*` names are in the embedded list, so the `file://` spec inspector and the http drift-check both stay green).

**Out of scope:** `dark-token-changelog.html` is a standalone generated doc with its own hard-coded styling (`#888`, `#e5e7eb`) that does not link `kit-theme.css`; its raw values are intentionally left (the tokens wouldn't resolve there and it isn't a kit deliverable).

## How to reproduce

- Large heading / mono numerics → `--tracking-tight`.
- Any small UPPERCASE label, table header, or badge → `--tracking-label`.
- Sidebar / composer section overline → `--tracking-caps`.
- Everything else (body, normal titles) → `--tracking-normal` / leave unset.

## Consistency self-check

- [x] A flat `--tracking-*` scale (tight / normal / label / caps) is defined in `:root`; grep confirms **zero** raw `letter-spacing:<em>` values remain in live files (`pages/**`, `insightis-preview-kit.html`).
- [x] Six pre-existing raw values consolidated to four tokens; only `.03/.04/.06`→`.05` produces a (small) visual shift, all on non-locked labels/badges.
- [x] Sidebar (`.sbx-sect-label`) and composer (`.cl-menu-label`) both resolve to `--tracking-caps` (`.08em`) — verified `0.8px` computed, unchanged.
- [x] `FALLBACK_TOKEN_NAMES` regenerated; no `.spec-drift-note` banner and no console warning on http.
- [x] Foundation framing — no prod Current/Expected columns.
- [x] All links relative (`../insightis-preview-kit.html`, `../pages/kit-theme.css`) so a clone never breaks.
