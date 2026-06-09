# Input — prod → expected

Baseline: [`../current/Input.md`](../current/Input.md). Diff strictly against that file.

Input now shares one **form-control system** with [TextArea](TextArea.md):
identical hover / focus / error / disabled tokens and shape.

## States

| State | Current (prod) | Expected | Specification |
|---|---|---|---|
| Default | `InputGroup` shell: `border-border`, `bg-card`/`bg-background`, radius `md`, `h-9` (36 px), `px-1.5` inner, placeholder `content-secondary` | — *no shape change*; hex shifts only — `Stroke/Border` → `#E2E8F0`, placeholder `Text/Secondary` → `#64748B` (see [colors](colors.md)) | h 36, radius `md 6`, padding-x 8, text-sm, `transition:border-color, box-shadow` |
| Hover | ⚠ undefined | **new** — border `Stroke/Border_Hover` | light `#94A3B8` (slate-400) / dark `#475569` (slate-600). Aligns with [Button Secondary](Button.md) hover affordance |
| Pressed *(amended — no bg lift)* | ⚠ undefined | border `--input-focus` only; **no** bg change | the earlier kit recipe added `--state-pressed` as a bg lift on `:active`/`.s-pressed`. Removed — a single tap should not promote the field to a "selected" surface. Border swap is enough to acknowledge the click and matches the focus visual. |
| Focus | `has-[input:focus-visible]:border-content-primary` — dark slate border, no ring | 1 px solid neutral border via `--input-focus` (light `Slate-550 #5A6A80` / dark `Grey-400 #9CA3AF`), no outer ring | brand colour is intentionally **not** used on form-control focus — keeps the indicator on the neutral axis. **Amended this iteration:** `--input-focus` was softened from `var(--focus-ring)` (Slate-900 / Slate-100) to `var(--ink-secondary)` because the near-black border read too heavy when a parent wrapper picked it up via `:focus-within` (chat-landing's composer card made this obvious). New colour still clears WCAG 1.4.11 — 5.47:1 on white Card / 5.98:1 on dark Card. |
| Error | border `red/20`, bg `red/5`, ring `red/20`, icon `red/60`, placeholder `red/60` | 1 px solid `--input-error` border (theme-adaptive: light `red-700 #B91C1C` / dark `red-500 #EF4444`), red helper text below; **no** bg tint, **no** outer ring | drop the red bg + ring; status is now paired with helper text → not by colour alone (WCAG 1.4.1). Token is theme-adaptive because the global `Feedback/Red` is locked to `red-700` in both themes (badge/button contract) but `#B91C1C` only reaches 2.76 : 1 on the dark Card — fails 3 : 1 for the border AND 4.5 : 1 for body text. |
| Disabled | `pointer-events-none cursor-not-allowed`, opacity-based dimming | bg `State/Disabled`, border `Stroke/Border`, placeholder `Text/Inactive`, text `Text/Inactive`, `cursor:not-allowed` | replaces opacity with a real disabled fill — clearer affordance, AA-safe text |

## No change (—)

Height 36 px, radius `md 6 px`, padding-x 8 px, text-sm, placeholder token name (`content-secondary` → `Text/Secondary` — values shift only, see [colors](colors.md)), `transition` property list.

## Token map used

`--border` (Stroke/Border) · `--border-hover` (Stroke/Border_Hover) · `--input-focus` = `var(--ink-secondary)` (neutral, Slate-550 `#5A6A80` light / Grey-400 `#9CA3AF` dark) · **`--input-error` — NEW, theme-adaptive** (light `red-700` `#B91C1C` · dark `red-500` `#EF4444`) · `--state-disabled` (State/Disabled) · `--ink-inactive` (Text/Inactive) · `--card` (Surface/Card). Note: `--input-focus` history — briefly bound to `--brand-tertiary` based on the Figma source → corrected to neutral `--focus-ring` (Slate-900 / Slate-100, very dark/light) → **softened this iteration** to `--ink-secondary` (Slate-550 / Grey-400) so the form-control focus stays on the neutral axis but no longer reads heavy when a `:focus-within` parent picks it up.

## Accessibility & consistency self-check

```
Consistency: PASS — all colours via tokens (no raw hex outside Primitives); state coverage parity with TextArea (Hover/Focus/Error/Disabled defined in both); light + dark verified.
Accessibility:
  Focus border vs Card  (--input-focus = --focus-ring, neutral)
    ✓ light #0F172A / #FFFFFF = 17.85:1 (target 3:1, 1.4.11)
    ✓ dark  #F1F5F9 / #17171E = 16.10:1
  Error border vs Card  (--input-error)
    ✓ light #B91C1C / #FFFFFF = 6.42:1
    ✓ dark  #EF4444 / #17171E = 5.32:1   (was 2.76:1 with red-700 — FIX)
  Error helper text vs Card  (--input-error)
    ✓ light #B91C1C / #FFFFFF = 6.42:1   (target 4.5:1, 1.4.3)
    ✓ dark  #EF4444 / #17171E = 5.32:1   (was 2.76:1 with red-700 — FIX)
  ✓ Focus-visible affordance preserved — 1 px border-colour change to State/Focus_Ring (2.4.7)
  ✓ Status not by colour alone — error pairs red border with helper text (1.4.1)
  ⚠ Border vs Card (default, inactive) — light 1.27:1 / dark 1.55:1. Border is decorative when the field is not interactive; hover/focus/error all raise contrast above 3:1. Project-wide call documented in colors.md.
  ⚠ Disabled placeholder vs bg — light #7C8CA2 / #E2E8F0 = 2.93:1. Below 4.5:1 for normal text, but disabled state is exempt per WCAG 1.4.3 ("inactive component"). Documented for visibility.
```
