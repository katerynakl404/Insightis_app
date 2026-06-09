# InputGroup — prod → expected

Source: `@insightis/ui` `InputGroup/index.tsx` + `InputGroupAddon`, `InputGroupInput`. Baseline: [`../current/InputGroup.md`](../current/InputGroup.md).

## Shell — primary variant

Shares the **form-control system** with [Input](Input.md) and [TextArea](TextArea.md): same hover / focus / error tokens, no outer ring (replaces the earlier proposal to use the Button-style `--focus-ring-brand`).

| State | Current (prod) · was | Expected · became | Specification |
|---|---|---|---|
| Default | border `border`, bg `background`, text `content-secondary` | — no change (hex → [colors](colors.md)) | radius `md 6px`, heights xs 28 / sm 32 / md 36 / lg 40 / xl 44 |
| Hover | ⚠ none defined | **new** — border `Stroke/Border_Hover` | matches [Input](Input.md) hover |
| Pressed *(amended — no bg lift)* | ⚠ none defined | border `--input-focus`; **no** bg change | the earlier kit recipe added `--state-pressed` as a bg lift on `:active`/`.s-pressed`. Removed for the same reason as [Input](Input.md) — a tap should acknowledge with a border swap, not promote to a "selected" surface. |
| Focus (inner input `:focus-visible`) | shell border → `content-primary` (no ring) | 1 px neutral border via `--input-focus` (Slate-550 `#5A6A80` light / Grey-400 `#9CA3AF` dark), no outer ring | matches [Input](Input.md) focus exactly — single form-control treatment, brand colour **never** used on form-control focus. **Amended this iteration:** `--input-focus` softened from `--focus-ring` (Slate-900 / Slate-100) to `--ink-secondary` — see [Input](Input.md). |
| Error (`isInvalid` / `aria-invalid`) | border `red/20`, bg `red/5`, ring `red/20`, svg `red/60`, placeholder `red/60` | 1 px `--input-error` border (theme-adaptive: light `red-700` / dark `red-500`), no bg tint, no outer ring; icon + placeholder also `--input-error` | matches [Input](Input.md) error; theme-adaptive solves the dark-mode AA fail (`red-700` at 2.76 : 1 vs grey-900) |
| Disabled (inner `:disabled`) | `opacity-50 select-none`; addons inherit | — no change | matches [Input](Input.md) disabled — but ⚠ low text contrast on `Text/Body @50%` |

## Shell — outline variant
Same as primary, only the bg swaps to `card` (`#FFFFFF` / dark `#17171E`). No own changes.

## Addons (`InputGroupAddon`)
| State | Current (prod) · was | Expected · became |
|---|---|---|
| Default | text `content-secondary`, icon size 16/20 by control size | — no change |
| Click delegates to input focus | yes (unless target is a `<button>`) | — no change |
| Group disabled | `opacity-50` via `group-data-[disabled=true]` | — no change |

## No change (—)
Layout grammar (`inline-start` / `inline-end` / `block-start` / `block-end` align), label / error-text auto-rendering, kbd shortcut indent.

## ⚠ Best-practice states — to define
- **Read-only** styling — not distinct from default.
