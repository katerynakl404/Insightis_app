# Input — prod → expected

Baseline: [`../current/Input.md`](../current/Input.md). Diff strictly against that file.

Input now shares one **form-control system** with [TextArea](TextArea.md):
identical hover / focus / error / disabled tokens and shape.

## States

| State | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Default | `InputGroup` shell: `border-border`, `bg-card`/`bg-background`, radius `md`, `h-9` (36 px), `px-1.5` inner, placeholder `content-secondary` | — | — *no shape change*; hex shifts only — `Stroke/Border` → `#E2E8F0`, placeholder remapped to `Text/Inactive` → `#7C8CA2` (see [colors](colors.md)) | h 2.25rem/36px, radius `md .375rem/6px`, bg `--card`, padding `0 .5rem`/8px, border `--border`, text-sm, `transition:border-color, box-shadow` |
| Hover | ⚠ undefined | — | **new** — border `Stroke/Border_Hover` (`--border-hover`) | light `#7C8CA2` (slate-450) / dark `#475569` (slate-600). Aligns with [Button Secondary](Button.md) hover affordance |
| Pressed *(amended — no bg lift)* | ⚠ undefined | — | border `--input-focus` only; **no** bg change | the earlier kit recipe added `--state-pressed` as a bg lift on `:active`/`.s-pressed`. Removed — a single tap should not promote the field to a "selected" surface. Border swap is enough to acknowledge the click and matches the focus visual. |
| Focus / Pressed | `has-[input:focus-visible]:border-content-primary` — dark slate border, no ring | — | 1 px solid neutral border via `--input-focus` (light `Slate-600 #475569` / dark `Slate-500 #64748B`), **no box-shadow ring** — neutral border only | brand colour is intentionally **not** used on form-control focus — keeps the indicator on the neutral axis. **Amended this iteration:** `--input-focus` was softened from `var(--focus-ring)` (Slate-900 / Slate-100) through `var(--ink-secondary)` (Slate-550 / Grey-400) and finally to `var(--slate-600)` light / `var(--slate-500)` dark, because the near-black border read too heavy when a parent wrapper picked it up via `:focus-within` (chat-landing's composer card made this obvious). New colour still clears WCAG 1.4.11 — Slate-600 = 7.04:1 on white Card / Slate-500 ≈ 4.5:1 on dark Card. Same border applies on `:active`/`.s-pressed`. |
| Error | border `red/20`, bg `red/5`, ring `red/20`, icon `red/60`, placeholder `red/60` | — | 1 px solid `--input-error` border (theme-adaptive: light `red-700 #B91C1C` / dark `red-500 #EF4444`), red helper text below; **no** bg tint, **no** outer ring | drop the red bg + ring; status is now paired with helper text → not by colour alone (WCAG 1.4.1). Token is theme-adaptive because the global `Feedback/Red` is locked to `red-700` in both themes (badge/button contract) but `#B91C1C` only reaches 2.76 : 1 on the dark Card — fails 3 : 1 for the border AND 4.5 : 1 for body text. |
| Disabled | `pointer-events-none cursor-not-allowed`, opacity-based dimming | — | bg `State/Disabled` (`--state-disabled`), border `Stroke/Border`, placeholder `Text/Inactive`, text `Text/Inactive` (`--ink-inactive`), `cursor:not-allowed` | replaces opacity with a real disabled fill — clearer affordance, AA-safe text |

## Responsive behaviour (≤ 767 px)

| | Prod (Current) | Expected |
|---|---|---|
| Full-width page search height on mobile (`.cl-search.field`, `.ds-search.field`) | `38.4px` — **no change at any breakpoint** | `2.25rem` (36px) on ≤ 767px — standard kit default height; reduces visual weight on narrow screens. Page-level override per search class. |

> **Note — iOS font-size:** prod uses `14px` (`text-sm`) on inputs at all breakpoints. Bumping to `16px` on mobile eliminates iOS Safari auto-zoom but makes the placeholder visually oversized in a 36px field. Kept at `14px` to preserve visual density; iOS zoom is a known prod-parity limitation.

## No change (—)

Height 36 px, radius `md 6 px`, padding-x 8 px, text-sm, `transition` property list. (Placeholder token is **remapped** — `content-secondary` → `Text/Inactive` (`--ink-inactive`) — not a no-change; see States · Default and [colors](colors.md).)

## Token map used

`--border` (Stroke/Border) · `--border-hover` (Stroke/Border_Hover — light Slate-450 `#7C8CA2` / dark Slate-600 `#475569`) · `--input-focus` = neutral, **light `var(--slate-600)` `#475569` / dark `var(--slate-500)` `#64748B`** · **`--input-error` — NEW, theme-adaptive** (light `red-700` `#B91C1C` · dark `red-500` `#EF4444`) · `--state-disabled` (State/Disabled) · `--ink-inactive` (Text/Inactive — also the placeholder colour) · `--card` (Surface/Card). Note: `--input-focus` history — briefly bound to `--brand-tertiary` based on the Figma source → corrected to neutral `--focus-ring` (Slate-900 / Slate-100, very dark/light) → softened to `--ink-secondary` (Slate-550 / Grey-400) → **softened again this iteration** to Slate-600 light / Slate-500 dark so the form-control focus stays on the neutral axis but no longer reads heavy when a `:focus-within` parent picks it up.

## Accessibility & consistency self-check
```
Consistency: PASS — all colours via tokens (no raw hex outside Primitives); state coverage parity with TextArea (Hover/Focus/Error/Disabled defined in both); light + dark verified.
Accessibility:
  Focus border vs Card  (--input-focus, neutral)
    ✓ light #475569 / #FFFFFF = 7.04:1 (target 3:1, 1.4.11)
    ✓ dark  #64748B / #17171E ≈ 4.5:1
  Error border vs Card  (--input-error)
    ✓ light #B91C1C / #FFFFFF = 6.42:1
    ✓ dark  #EF4444 / #17171E = 5.32:1   (was 2.76:1 with red-700 — FIX)
  Error helper text vs Card  (--input-error)
    ✓ light #B91C1C / #FFFFFF = 6.42:1   (target 4.5:1, 1.4.3)
    ✓ dark  #EF4444 / #17171E = 5.32:1   (was 2.76:1 with red-700 — FIX)
  ✓ Focus-visible affordance preserved — 1 px border-colour change to --input-focus (2.4.7)
  ✓ Status not by colour alone — error pairs red border with helper text (1.4.1)
  ⚠ Border vs Card (default, inactive) — light 1.27:1 / dark 1.55:1. Border is decorative when the field is not interactive; hover/focus/error all raise contrast above 3:1. Project-wide call documented in colors.md.
  ⚠ Disabled placeholder vs bg — light #7C8CA2 / #E2E8F0 = 2.93:1. Below 4.5:1 for normal text, but disabled state is exempt per WCAG 1.4.3 ("inactive component"). Documented for visibility.
```
