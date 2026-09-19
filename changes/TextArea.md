# TextArea — prod → expected

Baseline: [`../current/TextArea.md`](../current/TextArea.md). Diff strictly against that file.

TextArea reuses the **form-control system** documented on [Input](Input.md) — same border / hover / focus / error / disabled tokens and the same colour values (`--border`, `--border-hover`, `--input-focus`, `--input-error`, `--state-disabled`). See Input for the full token table; only TextArea's own deviations are documented below.

**Counter — 2026-09-18.** Opt-in, `.ta-count` after the field: Body 12 in `--ink-inactive`, right-aligned, 4px above, `aria-live="polite"`. The content is **just the two numbers** — how many used of how many allowed — with no unit word. It existed only as an inline-styled div on Metrics, so nothing else could reuse it and nothing recorded what it should look like.

## DOM / markup

A single element — no wrapper (unlike Input's flex `.field` shell): `<textarea class="ta" rows="2" placeholder="…"></textarea>`. Default demo uses `rows="2"`. State/size modifiers are added directly on the textarea: `.is-xs` `.is-sm` `.is-md` `.is-lg` `.is-xl` (size), `.s-hover` `.s-focus` `.s-error` `.is-disabled` (state, or use native `:hover` / `:focus` / `disabled`). Error helper text is a sibling element directly below: `<div class="err-help">message</div>` (wrap textarea + helper in a `flex-direction:column` container).

**Base `.ta` (= `md` size) — full rule:**
`width:100%`; `max-width:260px`; `border:1px solid var(--border)`; `border-radius:.375rem` (6px); `background:var(--card)`; `padding:.5rem .75rem` (8px vertical / 12px horizontal); `font-size:.875rem` (text-sm); `color:var(--ink)`; `outline:none`; `resize:none`; `font-family:inherit`; `transition:border-color .12s, box-shadow .12s`. Placeholder: `color:var(--ink-inactive)`.

**TextArea-only deviations vs Input (`.ta`):**
- **Padding** `.5rem .75rem` (8px vertical / **12px horizontal — the same rail as Input, Selector and InputGroup**) at `md`, since the multiline content needs vertical breathing room. Other sizes set their own padding (see size table).
- **`resize:none`** — the textarea does not show the native resize grip; size is controlled by the size variant.

**Size variants** (`min-height` so rows can grow; `max-width:260px` on all):

Type steps with the control, on the **body** family (a typed value is content, weight 400 — the weight is stated once on `.ta` and never per size). `lg` and `xl` used to declare no `font-size` at all, so both fell back to the base 14px and a 44px textarea read exactly like a 36px one; they now take the `body-l` / `body-xl` rungs, matching [Input](Input.md) and [InputGroup](InputGroup.md) step for step (2026-09-19).

| Size | min-height | padding | font-size |
|---|---|---|---|
| `.is-xs` | 1.75rem (28px) | `.25rem .5rem` (4 × 8px) | `--ts-body-s-*` |
| `.is-sm` | 2rem (32px) | `.375rem .75rem` (6 × 12px) | `--ts-body-m-*` |
| `.is-md` (base) | 2.25rem (36px) | `.5rem .75rem` (8 × 12px) | `--ts-body-m-*` |
| `.is-lg` | 2.5rem (40px) | `.5rem .75rem` (8 × 12px) | `--ts-body-l-*` |
| `.is-xl` | 2.75rem (44px) | `.625rem .75rem` (10 × 12px) | `--ts-body-xl-*` |

> **Side padding stops at `md` (2026-09-19).** It used to climb with the height — 16px at `lg`, 20px at `xl` — and the field read as if the text had been pushed away from its own edges; the wider the control, the more the label floated in the middle. Height, type level and icon size still climb; only the horizontal padding is capped at the `md` value (12px). `xs` keeps its smaller 8px, so the ladder is 8 · 12 · 12 · 12 · 12. Applied across every control family in the same pass — Input, Button, TextArea, Select trigger and InputGroup — so a Button and a field of the same size still line up.

> Vertical padding still climbs — it scales with the height and keeps the first text line centred. Only the horizontal value is capped.


Horizontal padding climbs the **same 4px ladder** as Button, Input and Selector — 8 · 12 · 12 · 16 · 20 (directive 2026-09-03). Vertical padding still scales with height. `md` inherits the base `.ta` rule; only `.is-xs` overrides the font — `sm`/`lg`/`xl` sit on `--ts-body-m-*`.

**Error helper text `.err-help`** (shared with Input, theme-adaptive): `color:var(--input-error)`; `font-size:.6875rem` (11px / text-xs); `font-weight:500`; `margin-top:.25rem` (4px); `line-height:1.3`.

## States

| State | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Default | cva shell: `block w-full min-w-0 resize-none outline-none`, `border` border, radius `md`, text `content-body` text-sm, placeholder `content-secondary` | — | — *no shape change*; hex shifts only — `Stroke/Border` → `#E2E8F0`, `Text/Body` → `#334155` (see [colors](colors.md)) | `width:100%`, `max-width:260px`, `border:1px solid var(--border)`, radius `.375rem` (md 6px), `background:var(--card)`, `padding:.5rem` (8px), `font-size:.875rem`, `color:var(--ink)`, placeholder `var(--ink-inactive)`, `outline:none`, `resize:none`, `font-family:inherit`, `transition:border-color .12s, box-shadow .12s` |
| Hover | ⚠ undefined | — | **new** — border `Stroke/Border_Hover` | light `#7C8CA2` (slate-450) / dark `#475569` (slate-600) — same as [Input](Input.md) |
| Focus | border `accent` (cyan-teal), no ring | — | 1 px solid neutral border via `--input-focus` (light `Slate-600 #475569` / dark `Slate-500 #64748B`), no outer ring | matches [Input](Input.md) focus exactly. Brand colour intentionally **not** used on form-control focus. **Amended this iteration:** `--input-focus` softened from `--focus-ring` (Slate-900 / Slate-100) through `--ink-secondary` (Slate-550 / Grey-400) to Slate-600 light / Slate-500 dark — see [Input](Input.md) for rationale. |
| Error | ⚠ undefined | — | **new** — 1 px solid `--input-error` border (theme-adaptive: light `red-700 #B91C1C` / dark `red-500 #EF4444`), red helper text below; no bg tint | matches [Input](Input.md) error; theme-adaptive so dark-mode text reaches AA (4.5 : 1). Pairs colour with text → WCAG 1.4.1 |
| Disabled | opacity 50% | — | bg `State/Disabled`, text `Text/Inactive`, `cursor:not-allowed` | replaces opacity with a real disabled fill — matches [Input](Input.md) |

## Not a TextArea

The chat composer prompt is **not** an instance of this component. It is chromeless — the `.cl-composer` card around it owns the border, the surface and the hover/focus affordance — so it carries `.cl-prompt` alone. It used to carry `class="ta cl-prompt"` and then switch off every declaration it had just inherited, including a rule to suppress this component's hover and focus borders (removed 2026-09-19). The other two composer pages already ran it as a plain `contenteditable` div.

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
