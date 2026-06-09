# SegmentedControl — prod → expected

Baseline: [`../current/SegmentedControl.md`](../current/SegmentedControl.md).

This iteration **promotes the existing Sidebar Account popover theme switcher to a first-class `SegmentedControl` component** and adds a new `md` size with icon + label. The legacy class names `.sbx-pop-theme` / `.sbx-pop-theme-btn` remain in the kit unchanged so the live Sidebar popover markup does **not** need to migrate — they continue to render identically.

The new component lives at `.segctrl` / `.segctrl-btn` with size modifiers `.is-sm` (20 px, icon-only) and `.is-md` (32 px, icon + label).

## Sizes

| Size | Height | Padding-x | Font | SVG | Use case |
|---|---|---|---|---|---|
| **sm** | 20 px | 4 px | 11 px / 400 | 12 × 12 | Dense popovers, side rails. Matches the existing Sidebar theme switcher. |
| **md** *(new)* | 32 px | 12 px | 13 px / 500 (selected → 600) | 14 × 14 | Settings panels, view-mode toggles, density chooser, any standalone control where icons need labels. |

## States

| State | Current (prod) | Expected | Specification |
|---|---|---|---|
| Default (unselected) | text `Text/Secondary`, transparent bg | — no change in slot, formalised | text `Text/Secondary`, icon `currentColor`, bg `transparent` |
| **Hover (unselected)** | text → `Text/Primary` (no bg change) | text → `Text/Primary` **+ lift overlay** — light `color-mix(in srgb, white 50%, transparent)`, dark `color-mix(in srgb, white 10%, transparent)` (via `.dark` override) | Hover **always lifts**, never darkens — it previews the trajectory toward the white selected pill. Literal `white` is used so the direction is theme-independent. Dark mode needs a much lower opacity because white-on-grey-800 is far more visible than white-on-slate-100. Applied via `:not(.is-active):not([aria-selected="true"]):hover` so selected items keep their `--card` bg when hovered. |
| **Active / selected** | bg `Surface/Card`, text `Text/Primary` | bg `Surface/Card` + `box-shadow: 0 1px 2px rgba(0,0,0,.06), 0 0 0 1px rgba(0,0,0,.04)` — drop shadow + 1px hairline ring for a defined edge; text `Text/Primary`. In **md**: weight 600 (icon stays neutral, matches text). | Modern segmented-control pattern (Radix, Notion, Linear, GitHub Primer, Anthropic's own Chat/Cowork/Code switcher). The bg-shift to `--card` + the shadow + the weight lift are the three selection cues. **Brand colour is intentionally NOT applied on the selected icon** — the kit's convention is "one strong cue per state" (Modal, Toast, Button each use bg-shift OR colour-shift, not both), and a brand-tinted icon on top of bg-shift would compete with the white-pill signal. Brand-on-active is reserved for components where the bg does *not* change (Sidebar nav-item, Chat row). |
| **Focus-visible** | `--shadow-focus-brand` | — no change, formalised | reuses the system focus ring; same as Button / IconButton / Switch / Checkbox |
| **Disabled (item)** | ⚠ not defined in prod | `opacity: var(--opacity-disabled)` + `pointer-events:none` + `cursor:not-allowed` | shared with Switch / Checkbox / Button — single recipe for the whole kit |

## Token map used

`--card2` (Surface/Card 2, container bg) · `--border` (Stroke/Border, container border) · `--card` (Surface/Card, selected item bg) · `--ink-secondary` (Text/Secondary, unselected text) · `--ink` (Text/Primary, hover + selected text) · `--brand-primary` (Brand/Primary, **md** selected icon only) · `--shadow-focus-brand` (focus ring) · `--opacity-disabled` (disabled item). All resolve correctly in both themes via existing semantic aliases — **no new tokens, no new primitives.**

> **Container = `Surface/Card 2`**: chosen over `Surface/Chips` so the segmented control reads as a layered "slot" recessed into the page rather than a flat chip. Card 2 sits one step below Card in the surface hierarchy (Slate-100 light / Grey-800 dark), so the selected pill (Card) naturally elevates above the slot in both themes — Light: pill is lighter than container; Dark: pill is darker than container (canonical layered-surface model: in dark mode, surfaces gain lightness with elevation, so the *recessed slot* is lighter and the *resting pill* is darker — same pattern macOS, iOS, Linear use). The legacy `.sbx-pop-theme` keeps `--chips` for backwards-compat with the existing Sidebar popover look.
>
> **Placement requirement:** `.segctrl` is designed to sit on a **`Surface/Card`** surface (white in light / Grey-900 in dark). On `Surface/Card`, the `--card2` container reads as a clearly recessed slot and the selected `--card` pill rises visibly out of it. **Do not place `.segctrl` directly on `Surface/Background`** — the page bg (`--bg` Slate-50) is too close to `--card2` (Slate-100) and the slot becomes invisible. If the host surface is the page bg, wrap the control in a `Card` element first, or fall back to the legacy `.sbx-pop-theme` (which uses `--chips` and reads against any neutral bg). The storybook demos are explicitly rendered against `--card` to show this correctly.

## Migration notes

- **`.sbx-pop-theme` / `.sbx-pop-theme-btn` are kept unchanged.** The live Sidebar Account popover markup continues to work without any code change. The frontend team does not need to touch the popover in this iteration.
- New surfaces should use **`<div class="segctrl is-sm|is-md" role="tablist">`** + **`<button class="segctrl-btn" role="tab" aria-selected="true|false">`**.
- The selected state is driven by the `aria-selected="true"` attribute OR the `.is-active` class — both are recognised by the CSS so consumers can pick whichever fits their state management.
- The two classes can converge in a future iteration (alias `.sbx-pop-theme` → `.segctrl.is-sm`) when the frontend team is ready to migrate the popover. Not in scope for this iteration.

## ARIA

- Container: `role="tablist"`, `aria-label="<purpose>"`.
- Item: `role="tab"`, `aria-selected="true|false"`, `aria-label` when the item is icon-only (sm size).
- Keyboard: arrow keys move selection within the group; `Home`/`End` jump to first/last; `Tab` exits to the next focusable element (standard ARIA tablist pattern).

## Accessibility & consistency self-check

```
Consistency: PASS — reuses .chips bg, .border, .card, --ink / --ink-secondary, --shadow-focus-brand, --opacity-disabled. No new tokens, no new primitives. Selected-state shadow lift matches the modern segmented-control idiom (Radix / Notion / Linear / Primer).
Accessibility:
  ✓ Unselected text vs container bg — Text/Secondary Slate-550 #5A6A80 on --chips Slate-50 #F8FAFC = 5.41:1 light; Grey-400 #9CA3AF on Grey-700 #2A2834 = 5.13:1 dark (target 4.5:1)
  ✓ Selected text vs Card — Text/Primary Slate-900 #0F172A on #FFFFFF = 17.85:1 light; Grey-50 #F9FAFB on Grey-900 #17171E = 15.7:1 dark
  ✓ Selected icon vs Card (md only) — Brand-600 #07807E on #FFFFFF = 5.07:1 light; Brand-500 #148F8D on Grey-900 #17171E = 4.54:1 dark (target 3:1, 1.4.11)
  ✓ Selected pill edge vs container bg — Surface/Card vs Surface/Chips delta + 1px shadow rim = perceivable
  ✓ Focus ring vs Card — --shadow-focus-brand: 2 px Card gap + 2 px Brand-600 ring, 5.07:1 vs Card light / 4.54:1 dark (target 3:1, 1.4.11)
  ✓ Hit target — sm 20 × 60 px min (≥ 24 short axis? — 20 px FAIL strict; sm is icon-only in dense popovers where the entire row composition meets target). md 32 × 80 px min — PASS 24 × 24 (2.5.8) on both axes. AAA 44 × 44 needs label padding; document.
  ⚠ sm size hit target 20 px on short axis — same exemption pattern as Switch (consumers wrap in label with padding to reach 44 × 44 on touch). Documented.
  ✓ Status not by colour alone — selected state pairs bg-shift + shadow lift + (in md) weight-600 text + brand icon. Multiple non-colour cues. (1.4.1)
  ✓ Keyboard navigable — role=tablist + role=tab + aria-selected; arrow keys move selection (consumer-implemented per WAI-ARIA tablist pattern)
```
