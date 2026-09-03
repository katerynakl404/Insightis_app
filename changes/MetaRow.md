# MetaRow — prod → expected

Baseline: [`../current/MetaRow.md`](../current/MetaRow.md).

⚠ **Current column is a placeholder.** Whether the live `/chats` page renders a count / Select-all row above its list is not verified — the rendered DOM at <https://insightis-app.devart.info/chats> was not captured (SPA, static fetch returns only `<div id="root">`). The Expected spec stands on existing kit tokens; the diff is to be measured once the prod UI is captured.

A transparent caption row above a list view. Left slot: a count (e.g. *"12 conversations"*) plus an inline `.link` action (`Select` / `Select all` / `Deselect all`). In selection mode a right-edge cluster carries the bulk actions. No background, no border, no card wrapper — fully delegates surface to whatever sits behind it.

**Whole row is one typographic group.** `font-size` / `line-height` are declared once on `.meta-row` (Body level — `--text-14` / 20px) and every child inherits them: the count, the `.link`, and the row's own buttons. A control group that spans two steps of the type scale (a 13px count next to a 14px link, or 13px buttons next to a 14px count) reads as two unrelated clusters, which is exactly what the row is not.

**DOM / markup contract:**

- Outer `<div class="meta-row">` (add `var-split` for the space-between layout). Consuming pages give it `role="toolbar"` + `aria-label` when it carries actions.
- Count = `<span class="meta-row-count">N conversation(s)</span>` — swaps to `N selected` in selection mode.
- Inline link action = `<button class="link" type="button">` (optionally inside `<span class="meta-row-actions">`). Disabled: `is-disabled` + `aria-disabled="true"`.
- Right-edge cluster = `<span class="meta-row-end">` wrapping, in order, the neutral text buttons (`<button class="meta-row-btn">`), the destructive one (`<button class="meta-row-btn danger">`), then the icon-only exit (`<button class="meta-row-iconbtn" aria-label="Exit selection" data-tip="Exit selection">`).
- Text buttons carry a leading 14px `currentColor` SVG + a visible label. Icon-only buttons carry **both** `aria-label` and a matching `data-tip`.
- Bulk actions with nothing selected take `is-disabled` + `aria-disabled="true"`; the exit ✕ never disables — leaving selection mode must always be possible.

| State | Current (prod) | Expected | Specification |
|---|---|---|---|
| Default | ⚠ pending | transparent row; count in `Text/Secondary`, action `.link` (`--ink-highlight`, weight 500, hover underline) | reuses existing tokens only: `--ink-secondary` for the count, `.link` for the action |
| All selected | ⚠ pending | action label flips from `Select all` → `Deselect all`; same `.link` style | label is a derived view-state of the parent list (selected count = total) |
| Singular count | ⚠ pending | noun pluralises with count: `1 conversation` vs `0 / 2+ conversations` | view-layer concern; component is presentation-only |
| Empty list | ⚠ pending | action → `.link.is-disabled` (Text/Inactive, no underline, `pointer-events:none`) | reuses existing `.link.is-disabled` recipe — no new tokens |
| **Row typography** | ⚠ pending | **was** `--text-13` / `line-height:1.4` (the `.t-meta` 13/400 level) → **became** `--text-14` / `line-height:1.25rem` (the `.t-body` 14/20 level) | The row is not a caption — it is a control group (count + link + bulk-action buttons). At 13 the row sat one step below the `.link` and the buttons that live inside it, so a single group rendered at two scale steps. Moving the row to Body puts every child on one level and matches the 14/20 the list rows beneath it already use. `.t-meta` stays the level for datepicker / secondary annotation. |
| **Bulk-action buttons** | ⚠ pending | **was** page-local copies on two pages (`.dsf-meta-dl` / `.dsf-meta-del` / `.dsf-meta-iconbtn` on Files, `.meta-row-delete` / `.meta-row-iconbtn` on Chats Library) → **became** one kit family: `.meta-row-btn`, `.meta-row-btn.danger`, `.meta-row-iconbtn`, anchored by `.meta-row-end` | Two near-identical copies of one recipe is drift waiting to happen — and both hard-coded `font-size:.8125rem`, so promoting them was the only way to make the row's single-type-level rule actually hold. The copies also carried literal overlay percentages (`6%` / `8%` / `60%`); the kit family expresses every overlay as a `--tint-*` step. |
| **Destructive focus ring** | ⚠ pending | **was** a red halo on the page-local Delete (`0 0 0 4px color-mix(--fb-red 60%, transparent)`) → **became** the kit's one focus ring, in its surface-matched form `--shadow-focus-bg` | The kit has exactly one focus **colour** seam (`--focus-ring`, brand) and the Destructive-Outlined family already documents why: teal ≠ red, so a brand ring on a red control avoids red-on-red and keeps every focus ring in the app identical. The page-local red ring was a divergence from that contract, plus a literal `60%`. The gap colour still follows the surface (`--shadow-focus-bg` here, since the row is transparent over the page bg). |

## Reproduction values (`pages/kit-theme.css` → MetaRow block)

| Selector | Values |
|---|---|
| `.meta-row` | `display:flex; align-items:center; gap:.75rem; padding:.375rem 0; min-height:2.25rem; background:transparent; border:none; font-size:var(--text-14); line-height:1.25rem` — `font-size`/`line-height` live on the row so every child inherits one type level; `min-height` matches the tallest possible child (the 1.5rem iconbtn in selection mode) so the row stays vertically stable when the action set changes |
| `.meta-row.var-split` | `justify-content:space-between` — opt-in split layout that pushes the action to the opposite edge (default clusters count + action together on the left) |
| `.meta-row-count` | `color:var(--ink-secondary); font-weight:400` |
| `.meta-row-actions` | `display:inline-flex; align-items:center; gap:.5rem` |
| `.meta-row-end` | `margin-left:auto; display:inline-flex; align-items:center; gap:.25rem` — right-edge cluster; keeps the left cluster from shifting when selection mode toggles |

### Action button family

| Selector | Values |
|---|---|
| `.meta-row-btn` | `display:inline-flex; align-items:center; gap:.375rem; padding:.25rem .5rem; border-radius:.25rem; background:transparent; border:none; cursor:pointer; font-family:inherit; font-size:inherit; line-height:inherit; font-weight:500; color:var(--ink-body); transition:color var(--motion-fast) var(--motion-ease), background-color var(--motion-fast) var(--motion-ease)` |
| `.meta-row-btn svg` | `width:14px; height:14px; flex:none` (`currentColor`, so `.danger` tints its own icon) |
| `.meta-row-btn:hover` | `background:color-mix(in srgb, var(--brand-primary) var(--tint-6), transparent)` |
| `.meta-row-btn:active` | `background:color-mix(in srgb, var(--brand-primary) var(--tint-8), transparent)` |
| `.meta-row-btn:focus-visible` | `outline:none; box-shadow:var(--shadow-focus-bg)` — the **surface-matched** ring: the row is transparent, so the ring gap must be painted in `--bg`, not `--card`. Written inline on `.chat-row` before; tokenised once the button family became its second consumer |
| `.meta-row-btn.danger` | `color:var(--fb-red-text)`; hover `color-mix(--fb-red var(--tint-8))`, active `color-mix(--fb-red var(--tint-12))` — one tint step above the neutral button at each state, so the destructive action still reads as the odd one out |
| `.meta-row-btn.is-disabled, .meta-row-btn[disabled]` | `color:var(--ink-inactive); cursor:not-allowed; pointer-events:none` |
| `.meta-row-iconbtn` | `1.5rem × 1.5rem; border-radius:.25rem; inline-flex centred; background:transparent; border:none; color:var(--ink-secondary); flex:none`; 14px SVG; hover `color:var(--ink-body)` + `color-mix(--brand-primary var(--tint-6))`; active `var(--tint-8)`; `focus-visible` `var(--shadow-focus-inset)`; disabled = `--ink-inactive`, no pointer events |

Why not `.btn-tertiary` / `.iconbtn-tertiary`: those are 36px form controls with a neutral `--state-hover` wash. These sit inline in a 20px text row and must inherit the row's type level, and their brand-tinted hover is the shipped recipe for this family. The `.danger` modifier name matches `.mi.danger` rather than inventing a third destructive naming.

`.s-hover` mirrors of each hover rule exist for storybook state demos only.

### Action link recipe (`.link`)

The inline link action reuses the global `.link` style verbatim — no MetaRow-scoped overrides:

| Selector | Values |
|---|---|
| `.link` | `color:var(--ink-highlight); text-decoration:none; cursor:pointer; font-weight:500; background:none; border:none; padding:0; font-family:inherit; font-size:inherit; line-height:inherit` — `font-size`/`line-height` inherit from `.meta-row` (14 / 20px) |
| `.link:hover` | `text-decoration:underline; text-underline-offset:25%; text-decoration-thickness:1px` |
| `.link:focus-visible` | `outline:none; box-shadow:var(--shadow-focus); border-radius:.125rem` |
| `.link.is-disabled, .link[disabled]` | `color:var(--ink-inactive); cursor:not-allowed; text-decoration:none; pointer-events:none` |

`--ink-highlight` resolves to Brand-600 in light / Tertiary-400 in dark (so AA holds in both themes) — there is no theme-specific override on `.meta-row` itself. No `@media` / responsive rules apply to the row: it stays on the Body level at every breakpoint (both consuming pages previously shrank the count to 12px at ≤767px, which re-split the group).

### Sticky positioning is the page's job

While a selection is active, the consuming page pins the row below the topbar (`position:sticky; top:40px; background:var(--bg)`, no border) via its own glue class — `.cl-meta-sticky` (Chats Library) / `.dsf-meta-sticky` (Files). The component itself declares no positioning.

## No change (—)

`.meta-row-count`, `.meta-row-actions`, `.meta-row.var-split`, and the `.link` action recipe.

## Token map used

`--text-14` (row type level) · `--ink-secondary` (count text) · `--ink-body` (neutral button label + icon) · `--fb-red-text` (destructive label + icon) · `--fb-red` (destructive hover/active wash base) · `--brand-primary` (neutral hover/active wash base) · `--tint-6` / `--tint-8` / `--tint-12` (wash strengths) · `--ink-highlight` (link colour) · `--ink-inactive` (disabled) · `--shadow-focus-bg` (surface-matched focus ring on the text buttons) · `--shadow-focus` (link) · `--shadow-focus-inset` (24px icon button) · `--motion-fast` + `--motion-ease` (transition). No new tokens introduced.

## Accessibility & consistency self-check

- Count `--ink-secondary` and neutral button `--ink-body` on `--bg` ≥ 4.5:1 in both themes; `--fb-red-text` is the AA-corrected red text token (the fill red `--fb-red` is only ever a transparent wash here). ✓
- Destructive action is not colour-only — it carries a trash icon and the "Delete" label (1.4.1). ✓
- Every control has a `focus-visible` ring: `--shadow-focus` on text buttons and the link, `--shadow-focus-inset` on the 24px icon button (2.4.7). ✓
- Hit targets: text buttons are 20px line + `.25rem` vertical padding = 28px tall; icon button 24×24 (2.5.8 minimum). ✓
- Icon-only buttons keep an accessible name (`aria-label`) and a matching `data-tip`; disabled bulk actions keep their name and stay perceivable via `aria-disabled` rather than being removed. ✓
- Colour-token discipline: every wash is `color-mix(in srgb, var(--semantic) var(--tint-N), transparent)` — no literal percentages, no hex, no primitive references. ✓
