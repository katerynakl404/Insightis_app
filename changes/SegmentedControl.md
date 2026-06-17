# SegmentedControl — prod → expected

Baseline: [`../current/SegmentedControl.md`](../current/SegmentedControl.md).

This iteration **promotes the existing Sidebar Account popover theme switcher to a first-class `SegmentedControl` component** and adds a new `md` size with icon + label. The legacy class names `.sbx-pop-theme` / `.sbx-pop-theme-btn` remain in the kit unchanged so the live Sidebar popover markup does **not** need to migrate — they continue to render identically.

The new component lives at `.segctrl` / `.segctrl-btn` with size modifiers `.is-sm` (20 px, icon-only) and `.is-md` (32 px, icon + label).

## Sizes

| Size | Height | Padding-x | Font | SVG | Use case |
|---|---|---|---|---|---|
| **sm** | 20 px | 4 px | 11 px / 400 | 12 × 12 | Dense popovers, side rails. Matches the existing Sidebar theme switcher. |
| **md** | 32 px | 12 px | 13 px / 500 | 14 × 14 | Settings panels, view-mode toggles, density chooser. Font weight stays 500 in every state — selected differs only by bg + rim, not by weight (text doesn't "shift" when toggling). |

## States

All states share the **same 1 px inset-rim recipe** so default → hover → active have identical footprint; only the rim tint and (for active) the drop-shadow differ. This is encoded via two paired tokens `--segctrl-hover-shadow` / `--segctrl-active-shadow`.

### Container

| Slot | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Container bg | `bg-chip` (`#F3F5F7`, `--chips`) | — | `--card2` (Slate-100 `#F1F5F9`) | Expected swaps token — `--card2` reads as "recessed slot" against a Card surface; `--chips` is the legacy sidebar value |
| Container border | `0.8px solid rgb(226,232,240)` (Stroke/Border Slate-200) | — | — (unchanged) | Same border token in both |
| Container height | `h-9` 36 px | — | `is-md` 32 px / `is-sm` 20 px | Expected adds size variants; 36 px prod = between the two |
| Container padding | `p-1` 4 px | — | 4 px (unchanged) | — |
| Container radius | `rounded-md` 6 px | — | 6 px (unchanged) | — |
| Container gap | `gap-1` 4 px | — | 4 px (unchanged) | — |

### Item states

| State | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| **Container / slot** | *(see table above)* | — | *(see table above)* | — |
| **Default (unselected)** | bg `transparent`, text `rgb(54,68,89)` ≈ Text/Primary (**same colour as active — no visual distinction between selected/unselected text**), height 28 px, padding `6 px / 12 px`, radius 4 px, font 14 px / 500, icons 24 × 24 | — | text `Text/Secondary`, icon `currentColor`, bg `transparent`, no rim, no shadow | Expected introduces colour differentiation: inactive → `Text/Secondary`, active → `Text/Primary` — provides a second non-colour cue (bg-shift) plus colour shift |
| **Hover (unselected)** | not captured (Tailwind hover class; no static bg change in DevTools) | text → `Text/Primary` + lift overlay — light `color-mix(in srgb, white 50%, transparent)` · dark `color-mix(in srgb, white 10%, transparent)` | text → `Text/Primary`, bg → `--segctrl-btn-hover-bg`, **rim → `--segctrl-hover-shadow`** | v1.0 used literal white overlay (tone-agnostic lift); Expected replaces with half-step token + inset rim so hover sits cleanly HALFWAY between slot and active pill. Rim recipe — light: `inset 0 0 0 1px color-mix(in srgb, var(--border) 50%, transparent)` · dark: `inset 0 0 0 1px color-mix(in srgb, var(--white) 3%, transparent)`. |
| **Active / selected** | bg `rgb(255,255,255)` (Surface/Card), text `rgb(54,68,89)` (same as inactive), `box-shadow: rgba(0,0,0,.05) 0px 1px 2px 0px` outset drop only — **no inset rim**, height 28 px, padding `6 px / 12 px`, radius 4 px, font 14 px / 500, icons 24 × 24 | bg `Surface/Card` + `box-shadow: 0 1px 2px rgba(0,0,0,.06), 0 0 0 1px rgba(0,0,0,.04)` (drop + hairline ring); text `Text/Primary`; **`is-md` font-weight 600** | bg `Surface/Card` (light) / `--chips` (dark), text `Text/Primary`, **rim → `--segctrl-active-shadow`** (light: `inset 0 0 0 1px var(--border), 0 1px 2px rgba(0,0,0,.06)` · dark: `inset 0 0 0 1px color-mix(in srgb, var(--white) 6%, transparent), 0 1px 2px rgba(0,0,0,.3)`) | Two changes from v1.0: (1) raw `rgba` shadow → `--segctrl-active-shadow` token (theme-aware, dark gets stronger drop); (2) weight 600 in md **removed** — caused visible text jump between states; selection cues now: bg-shift + rim only |
| **Icon size** | 24 × 24 Lucide (all states) | `is-sm` 12 × 12 · `is-md` 14 × 14 (unchanged) | `is-sm` 12 × 12 · `is-md` 14 × 14 | Prod icon large (fullwidth Settings modal); kit sizes constrained to dense use-cases |
| **Focus-visible** | `--shadow-focus-brand` (sidebar instance) | — | — no change, formalised | Reuses system focus ring; same as Button / IconButton / Switch / Checkbox |
| **Disabled (item)** | not defined in prod | — | `opacity: var(--opacity-disabled)` + `pointer-events:none` + `cursor:not-allowed` | Shared with Switch / Checkbox / Button — single recipe for the whole kit |

## Token map used

`--card2` (Surface/Card 2, container bg light) · `--chips` (Surface/Chips, container/selected bg dark) · `--border` (Stroke/Border, used by both active rim and 50%-alpha hover rim — system edge harmonised with every other 1 px border) · `--card` (Surface/Card, selected item bg light) · `--segctrl-btn-hover-bg` *(component-scoped, theme-aware: light = `--card`, dark = `--chips`)* · `--segctrl-active-shadow` *(component-scoped, theme-aware: light = `inset 0 0 0 1px var(--border), 0 1px 2px rgba(0,0,0,.06)`, dark = `inset 0 0 0 1px color-mix(in srgb, var(--white) 6%, transparent), 0 1px 2px rgba(0,0,0,.3)`)* · `--segctrl-hover-shadow` *(component-scoped, theme-aware: light = 50%-alpha `--border` rim, dark = 3%-alpha white rim)* · `--ink-secondary` (Text/Secondary, unselected text) · `--ink` (Text/Primary, hover + selected text) · `--shadow-focus-brand` (focus ring) · `--opacity-disabled` (disabled item). **No new primitives.** Three component-scoped tokens (`--segctrl-btn-hover-bg`, `--segctrl-hover-shadow`, `--segctrl-active-shadow`) keep the per-state recipes in one place and theme-resolve automatically.

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
