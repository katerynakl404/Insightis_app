# Radius & spacing — foundation baseline

Storybook: [`insightis-preview-kit.html` → `#radius`](../insightis-preview-kit.html). Live CSS: [`../pages/kit-theme.css`](../pages/kit-theme.css).

This is a **foundation document**, not a prod→expected diff. Corner radius and spacing are baselines the rest of the kit composes against; they don't change column-by-column. The one thing to record as a correction (below) is that the old `--ui-radius` story was wrong.

## ⚠️ Correction — there is no `--ui-radius` base token

Prior docs referenced a `--ui-radius: 0.5rem` base token with multipliers (e.g. `calc(var(--ui-radius) * 0.5)`). **That token does not exist** anywhere in `pages/kit-theme.css`. Radii are **literal per-component values** — each component hard-codes its own `border-radius` (`6px`, `.375rem`, `9999px`, …). There is no tokenised base+multiplier system to point at. When reproducing a component, copy its literal radius from the rule; do not derive it from a base.

## Radius scale

Five steps in active use. Each maps to the nearest **Tailwind v3** `rounded-*` utility, but the concrete px is authoritative (the kit mixes Tailwind defaults with custom values, so always use the px).

| Step | px | rem equivalents seen in CSS | Tailwind v3 nearest | Role / components |
|---|---|---|---|---|
| **sm** | **2px** | — | `rounded-sm` (2px) | Smallest accent corners: tiny dismiss/close affordances (`.b-x`, `.sht-x` in `.prod`), the active-nav indicator bar (`.sb-item::before` is `9999px`, but the 2px sliver corners on `.sw` tab edges), `4px 4px 0 0` tab tops round down toward this end. Mostly micro-controls. |
| **md** | **6px** | — | `rounded-md` (6px) | The workhorse interactive radius — **buttons (`.btn`), icon-buttons (`.iconbtn`), inputs (`.field`, `.ta`), `.menu` in `.prod` scope**. Note: in the *expected* kit these same controls are authored as `.375rem` (see "6px ≡ .375rem" note below). Storybook labels this `md 6px`. |
| **lg** | **8px** | `.5rem` (8px) | `rounded-lg` (8px) | Container shells one level up from controls: **dropdown/menu shell (`.menu`)**, **cards (`.card-c`)**, **toasts (`.toast`)**, and `.5rem`-authored surfaces (`.lead`, `.ce-cell`, `.spec`, `.card-panel` uses `.625rem`). The shell that *holds* md controls. |
| **xl** | **12px / 14px** | `.75rem` (12px) · `.875rem` (14px) | `rounded-xl` (12px) → `rounded-2xl` (16px) | Largest rounded surfaces: **modal dialog (`.dlg`) = `.875rem` = 14px**, plus `.75rem` (12px) on a few large feature panels. Storybook shows a representative `12px` swatch; the modal is the 14px outlier. |
| **full** | **9999px** | `99px` / `999px` (equivalent intents) | `rounded-full` | Pills & circles: **switch track + thumb (`.swt`, `.swt::after`), chips (`.chip`), avatars, status dots (`.b-dot`), spinners (`.spinner`), progress tracks/fills (`.dlg-progress-*`), the active-nav indicator bar**. `99px` / `999px` appear in a couple of rules and resolve to the same fully-rounded intent as `9999px`. |

### The 6px ≡ `.375rem` thing (read this)

The storybook swatch and `.prod` rules use the literal **`6px`** for buttons/inputs/menu, but the **expected** kit authors the *same* controls as **`.375rem`** (`.btn`, `.iconbtn`, `.field`, `.ta`, `.badge`, etc.). At the kit's `16px` root, `.375rem` = **6px** — they're the same rendered corner. The mix is historical (prod shipped px; the redesign authored rem). Both are "the md step." When you see `.375rem` on a control, that **is** md/6px.

### Intermediate rem values that appear (not separate "steps")

`.25rem` (4px), `.625rem` (10px) also occur and sit between the named steps:
- **`.25rem` = 4px** — `.mi` menu items, `.cbx` checkbox (1.125rem variant), small badge (`.badge-sm`), inline mini-controls. The "inner item inside an 8px shell" radius.
- **`.625rem` = 10px** — `.card-panel`, `.block`, `.card-c` lift family. Between lg (8px) and xl (12px).

These are real literal values in the CSS; they're documented here so a reproduction matches, but they're variations around the five named steps rather than first-class tokens.

## Spacing scale — 4px step

Spacing follows a single **4px design-system step** (per [`../CLAUDE.md`](../CLAUDE.md)). There is no spacing token scale; values are authored directly at valid 4px multiples. Storybook prints the numbered scale:

| Step | px | rem | Typical use |
|---|---|---|---|
| 1 | 4px | `.25rem` | hairline gaps, icon-to-label in dense rows |
| 2 | 8px | `.5rem` | default control padding, small gaps |
| 3 | 12px | `.75rem` | comfortable inter-element gap |
| 4 | 16px | `1rem` | card padding (`.card-c` = 16px), section inner spacing |
| 5 | 20px | `1.25rem` | section spacing |
| 6 | 24px | `1.5rem` | block separation |
| 8 | 32px | `2rem` | major section separation |
| 10 | 40px | `2.5rem` | page-edge inset (`.cl-page > :first-child` padding-left = 2.5rem) |
| 12 | 48px | `3rem` | large layout gaps |

Sub-step fractional values used inside controls (`.375rem` = 6px, `.625rem` = 10px) exist for padding where the 4px grid would be too coarse for a control's optical balance — they're the same odd-px family as the radii and are fine on a control's internal padding, but **section-level layout spacing stays on the 4px step**.

**Locked layout rule** (from CLAUDE.md): never override the global `.cl-page` gap in a page `<style>` block. Adjust section spacing via `margin-top` on individual section wrappers at valid 4px-step rem values (`.5rem`, `.75rem`, `1rem`, `1.25rem`, `1.5rem`, `2rem`, …).

## How to reproduce

- Pick a component's radius by reading its own rule — there is no base token to compute from.
- Controls (button / input / icon-button / badge): **6px** (`.375rem`).
- Their container shells (menu / card / toast): **8px** (lg).
- Modal dialog: **14px** (`.875rem`).
- Anything pill- or circle-shaped: **9999px** (full).
- Inner menu items / small chips inside shells: **4px** (`.25rem`).
- All layout spacing: multiples of **4px**.

## Consistency self-check

- [x] No `--ui-radius` token exists in `pages/kit-theme.css` — grep confirms zero matches; doc states radii are literal per-component.
- [x] Five named steps (sm 2 / md 6 / lg 8 / xl 12–14 / full) each map to a Tailwind v3 utility with concrete px given.
- [x] 6px and `.375rem` documented as the same rendered corner (16px root) so the px/rem split in CSS doesn't read as two steps.
- [x] Intermediate `.25rem` (4) and `.625rem` (10) values noted as variations, not separate steps, with their consuming components.
- [x] Spacing documented as a single 4px step with the rem values actually authored in the kit; locked `.cl-page` gap rule restated.
- [x] Foundation framing — no prod Current/Expected columns; only the `--ui-radius` correction is called out as a change from prior docs.
- [x] All links relative (`../insightis-preview-kit.html`, `../pages/kit-theme.css`, `../CLAUDE.md`) so a clone never breaks.
