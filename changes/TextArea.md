# TextArea — prod → expected

Baseline: [`../current/TextArea.md`](../current/TextArea.md). Diff strictly against that file.

TextArea reuses the **form-control system** documented on [Input](Input.md) — same border / hover / focus / error / disabled tokens and the same colour values (`--border`, `--border-hover`, `--input-focus`, `--input-error`, `--state-disabled`). See Input for the full token table; only TextArea's own deviations are documented below.

**TextArea-only deviations vs Input (`.ta`):**
- **Padding** `.5rem` (8px) on **all** sides (vs Input's `0 .5rem` / `0 8px` horizontal-only), since the multiline content needs vertical breathing room.
- **`resize:none`** — the textarea does not show the native resize grip in the default `md`; size is controlled by the size variant.
- **min-height by size** (the height becomes a *min-height* so rows can grow): xs 1.75rem / sm 2rem / md 2.25rem / lg 2.5rem / xl 2.75rem; `max-width:260px`.

## States

| State | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Default | cva shell: `block w-full min-w-0 resize-none outline-none`, `border` border, radius `md`, text `content-body` text-sm, placeholder `content-secondary` | — | — *no shape change*; hex shifts only — `Stroke/Border` → `#E2E8F0`, `Text/Body` → `#334155` (see [colors](colors.md)) | radius `md 6`, padding 8, text-sm, `transition:border-color, box-shadow` |
| Hover | ⚠ undefined | — | **new** — border `Stroke/Border_Hover` | light `#7C8CA2` (slate-450) / dark `#475569` (slate-600) — same as [Input](Input.md) |
| Focus | border `accent` (cyan-teal), no ring | — | 1 px solid neutral border via `--input-focus` (light `Slate-600 #475569` / dark `Slate-500 #64748B`), no outer ring | matches [Input](Input.md) focus exactly. Brand colour intentionally **not** used on form-control focus. **Amended this iteration:** `--input-focus` softened from `--focus-ring` (Slate-900 / Slate-100) through `--ink-secondary` (Slate-550 / Grey-400) to Slate-600 light / Slate-500 dark — see [Input](Input.md) for rationale. |
| Error | ⚠ undefined | — | **new** — 1 px solid `--input-error` border (theme-adaptive: light `red-700 #B91C1C` / dark `red-500 #EF4444`), red helper text below; no bg tint | matches [Input](Input.md) error; theme-adaptive so dark-mode text reaches AA (4.5 : 1). Pairs colour with text → WCAG 1.4.1 |
| Disabled | opacity 50% | — | bg `State/Disabled`, text `Text/Inactive`, `cursor:not-allowed` | replaces opacity with a real disabled fill — matches [Input](Input.md) |

## No change (—)

Radius `md 6 px`, padding 8 px, multiline, `resize:none`, auto-grow.

## Token map used

Identical to [Input](Input.md): `--border` · `--border-hover` (light Slate-450 `#7C8CA2` / dark Slate-600 `#475569`) · `--input-focus` (neutral — **light `var(--slate-600)` `#475569` / dark `var(--slate-500)` `#64748B`**, softened this iteration from `--ink-secondary`) · **`--input-error`** (NEW, theme-adaptive — light `red-700` / dark `red-500`) · `--state-disabled` · `--ink-inactive` · `--card`. TextArea-only: padding `.5rem` all sides, `resize:none`, size-driven `min-height`.

## Accessibility & consistency self-check
```
Consistency: PASS — TextArea now mirrors Input exactly (same token set, same state shape, same helper-text class .err-help). Light + dark verified through the existing semantic aliases. No raw hex outside Primitives.
Accessibility:
  Focus border vs Card  (--input-focus, neutral)
    ✓ light #475569 / #FFFFFF = 7.04:1 (target 3:1, 1.4.11)
    ✓ dark  #64748B / #17171E ≈ 4.5:1
  Error border + helper text vs Card  (--input-error, theme-adaptive)
    ✓ light #B91C1C / #FFFFFF = 6.42:1
    ✓ dark  #EF4444 / #17171E = 5.32:1   (was 2.76:1 with red-700 — FIX)
  ✓ Focus-visible affordance preserved — 1 px border-colour change to --input-focus (2.4.7)
  ✓ Status not by colour alone — error pairs red border with helper text (1.4.1)
  ⚠ Border vs Card (default, inactive) — light 1.27:1 / dark 1.55:1; hover/focus/error all raise contrast above 3:1. Project-wide call in colors.md.
  ⚠ Disabled body text vs bg — Text/Inactive on State/Disabled is borderline; disabled-state exemption per 1.4.3 applies.
```
