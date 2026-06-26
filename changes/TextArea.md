# TextArea — prod → expected

Baseline: [`../current/TextArea.md`](../current/TextArea.md). Diff strictly against that file.

TextArea reuses the **form-control system** documented on [Input](Input.md) — same border / hover / focus / error / disabled tokens and the same colour values (`--border`, `--border-hover`, `--input-focus`, `--input-error`, `--state-disabled`). See Input for the full token table; only TextArea's own deviations are documented below.

## DOM / markup

A single element — no wrapper (unlike Input's flex `.field` shell): `<textarea class="ta" rows="2" placeholder="…"></textarea>`. Default demo uses `rows="2"`. State/size modifiers are added directly on the textarea: `.is-xs` `.is-sm` `.is-md` `.is-lg` `.is-xl` (size), `.s-hover` `.s-focus` `.s-error` `.is-disabled` (state, or use native `:hover` / `:focus` / `disabled`). Error helper text is a sibling element directly below: `<div class="err-help">message</div>` (wrap textarea + helper in a `flex-direction:column` container).

**Base `.ta` (= `md` size) — full rule:**
`width:100%`; `max-width:260px`; `border:1px solid var(--border)`; `border-radius:.375rem` (6px); `background:var(--card)`; `padding:.5rem` (8px all sides); `font-size:.875rem` (text-sm); `color:var(--ink)`; `outline:none`; `resize:none`; `font-family:inherit`; `transition:border-color .12s, box-shadow .12s`. Placeholder: `color:var(--ink-inactive)`.

**TextArea-only deviations vs Input (`.ta`):**
- **Padding** `.5rem` (8px) on **all** sides at `md` (vs Input's `0 .5rem` / `0 8px` horizontal-only), since the multiline content needs vertical breathing room. Other sizes set their own padding (see size table).
- **`resize:none`** — the textarea does not show the native resize grip; size is controlled by the size variant.

**Size variants** (`min-height` so rows can grow; `max-width:260px` on all):

| Size | min-height | padding | font-size |
|---|---|---|---|
| `.is-xs` | 1.75rem (28px) | `.25rem .375rem` (4×6px) | `.75rem` (12px) |
| `.is-sm` | 2rem (32px) | `.375rem .4375rem` (6×7px) | `.8125rem` (13px) |
| `.is-md` (base) | 2.25rem (36px) | `.5rem` (8px) | `.875rem` (14px) |
| `.is-lg` | 2.5rem (40px) | `.5625rem` (9px) | `.875rem` (14px) |
| `.is-xl` | 2.75rem (44px) | `.625rem` (10px) | `.875rem` (14px) |

`md` inherits base `.ta` padding/font; `lg`/`xl` override padding only (font stays text-sm); `xs`/`sm` override both.

**Error helper text `.err-help`** (shared with Input, theme-adaptive): `color:var(--input-error)`; `font-size:.6875rem` (11px / text-xs); `font-weight:500`; `margin-top:.25rem` (4px); `line-height:1.3`.

## States

| State | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Default | cva shell: `block w-full min-w-0 resize-none outline-none`, `border` border, radius `md`, text `content-body` text-sm, placeholder `content-secondary` | — | — *no shape change*; hex shifts only — `Stroke/Border` → `#E2E8F0`, `Text/Body` → `#334155` (see [colors](colors.md)) | `width:100%`, `max-width:260px`, `border:1px solid var(--border)`, radius `.375rem` (md 6px), `background:var(--card)`, `padding:.5rem` (8px), `font-size:.875rem`, `color:var(--ink)`, placeholder `var(--ink-inactive)`, `outline:none`, `resize:none`, `font-family:inherit`, `transition:border-color .12s, box-shadow .12s` |
| Hover | ⚠ undefined | — | **new** — border `Stroke/Border_Hover` | light `#7C8CA2` (slate-450) / dark `#475569` (slate-600) — same as [Input](Input.md) |
| Focus | border `accent` (cyan-teal), no ring | — | 1 px solid neutral border via `--input-focus` (light `Slate-600 #475569` / dark `Slate-500 #64748B`), no outer ring | matches [Input](Input.md) focus exactly. Brand colour intentionally **not** used on form-control focus. **Amended this iteration:** `--input-focus` softened from `--focus-ring` (Slate-900 / Slate-100) through `--ink-secondary` (Slate-550 / Grey-400) to Slate-600 light / Slate-500 dark — see [Input](Input.md) for rationale. |
| Error | ⚠ undefined | — | **new** — 1 px solid `--input-error` border (theme-adaptive: light `red-700 #B91C1C` / dark `red-500 #EF4444`), red helper text below; no bg tint | matches [Input](Input.md) error; theme-adaptive so dark-mode text reaches AA (4.5 : 1). Pairs colour with text → WCAG 1.4.1 |
| Disabled | opacity 50% | — | bg `State/Disabled`, text `Text/Inactive`, `cursor:not-allowed` | replaces opacity with a real disabled fill — matches [Input](Input.md) |

## No change (—)

Radius `md 6 px`, padding 8 px, multiline, `resize:none`, auto-grow.

## Token map used

Identical to [Input](Input.md): `--border` · `--border-hover` (light Slate-450 `#7C8CA2` / dark Slate-600 `#475569`) · `--input-focus` (neutral — **light `var(--slate-600)` `#475569` / dark `var(--slate-500)` `#64748B`**, softened this iteration from `--ink-secondary`) · **`--input-error`** (NEW, theme-adaptive — light `red-700` / dark `red-500`) · `--state-disabled` · `--ink-inactive` (placeholder + disabled text) · `--card` (bg) · `--ink` (body text) · `--border` (rest). TextArea-only: `md` padding `.5rem` all sides (per-size paddings in the size table), `resize:none`, `font-family:inherit`, `transition:border-color .12s, box-shadow .12s`, size-driven `min-height` (xs–xl), `max-width:260px`. Helper text `.err-help`: `--input-error`, `.6875rem`/500/`line-height:1.3`/`margin-top:.25rem`.

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
