# InputGroup — prod → expected

Source: `@insightis/ui` `InputGroup/index.tsx` + `InputGroupAddon`, `InputGroupInput`. Baseline: [`../current/InputGroup.md`](../current/InputGroup.md).

## Shell — primary variant

Shares the **form-control system** with [Input](Input.md) and [TextArea](TextArea.md): same hover / focus / error tokens, no outer ring (replaces the earlier proposal to use the Button-style `--focus-ring-brand`).

| State | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Default | border `border`, bg `background`, text `content-secondary` | — | — no change (hex → [colors](colors.md)) | radius `6px`, heights xs 28 / sm 32 / md 36 / lg 40 / xl 44 px; input padding `0 8px`, addon padding `0 10px`, gap `8px`, font-size `.875rem`; border `1px solid --border`, bg `--bg` (outline variant `--card`) |
| Hover | ⚠ none defined | — | **shipped** — border `Stroke/Border_Hover` (`--border-hover`) | `.igrp:hover{border-color:var(--border-hover)}` — light `#7C8CA2` (slate-450) / dark `#475569` (slate-600) |
| Pressed | ⚠ none defined | — | **shipped** — border `--input-focus`; no bg change | `.igrp:active,.igrp.s-pressed{border-color:var(--input-focus)}` — same recipe as [Input](Input.md): border-only swap, no bg lift |
| Focus (inner input `:focus-visible`) | shell border → `content-primary` (no ring) | — | 1 px neutral border via `--input-focus` (light `Slate-600 #475569` / dark `Slate-500 #64748B`), no outer ring | `.igrp:focus-within{border-color:var(--input-focus);box-shadow:none}`. `--input-focus` softened from `--focus-ring` (Slate-900 / Slate-100) through `--ink-secondary` (Slate-550 / Grey-400) to Slate-600 light / Slate-500 dark — see [Input](Input.md) |
| Error (`isInvalid` / `aria-invalid`) | border `red/20`, bg `red/5`, ring `red/20`, svg `red/60`, placeholder `red/60` | — | 1 px `--input-error` border (theme-adaptive: light `red-700` / dark `red-500`), no bg tint, no outer ring; icon + placeholder also `--input-error` | Theme-adaptive solves dark-mode AA fail (`red-700` 2.76:1 vs grey-900) |
| Disabled (inner `:disabled`) | `opacity-50 select-none`; addons inherit | — | `opacity:var(--opacity-disabled)` (`.65`), `pointer-events:none`; addons inherit | ⚠ low text contrast on `Text/Body @ .65` — known limitation |

## Sizes (per-size spec — heights line up with Button `.btn-xs … .btn-xl`)

Base `.igrp`: `border-radius:6px`, `border:1px solid var(--border)`, `font-size:.875rem`; input padding `0 8px`, addon padding `0 10px`, gap `8px`. Only height differs per size (md is the unmodified base).

| Size | Class | Height |
|---|---|---|
| xs | `.igrp.is-xs` | `28px` |
| sm | `.igrp.is-sm` | `32px` |
| md (default) | `.igrp` | `36px` |
| lg | `.igrp.is-lg` | `40px` |
| xl | `.igrp.is-xl` | `44px` |

## Variants (per-variant spec — bg token is the only difference)

| Variant | Class | Background token | Resolves to |
|---|---|---|---|
| Primary (default) | `.igrp` | `--bg` (Surface/Background) | light `#F8FAFC` / dark page bg |
| Outline | `.igrp.var-outline` | `--card` (Surface/Card) | `#FFFFFF` / dark `#17171E` |

> Both variants share identical border / hover / focus / pressed / error / disabled recipes (below); only the resting fill differs. Hover border `--border-hover` (slate-450 light `#7C8CA2` / slate-600 dark `#475569`); focus + pressed border `--input-focus` (slate-600 light `#475569` / slate-500 dark `#64748B`).

## Shell — outline variant
Same as primary, only bg swaps to `card` (`#FFFFFF` / dark `#17171E`). No own changes.

## Addons (`InputGroupAddon`)
| State | Current (prod) | v1.0 | Expected |
|---|---|---|---|
| Default | text `content-secondary`, icon size 16/20 by control size | — | — no change |
| Click delegates to input focus | yes (unless target is a `<button>`) | — | — no change |
| Group disabled | `opacity-50` via `group-data-[disabled=true]` | — | — no change |

## Responsive behaviour (≤ 767 px)

| | Prod (Current) | Expected |
|---|---|---|
| Full-width page search height on mobile (`.mx-c3-toolbar .igrp`) | `38.4px` — **no change at any breakpoint** | `2.25rem` (36px) on ≤ 767px — standard kit default; saves vertical space on narrow screens. Page-level override. |

> **Note — iOS font-size:** prod uses `14px` on inputs at all breakpoints. Bumping to `16px` on mobile eliminates iOS Safari auto-zoom but makes placeholder visually oversized in a compact field. Kept at `14px`; iOS zoom is a known prod-parity limitation.

## No change (—)
Layout grammar (`inline-start` / `inline-end` / `block-start` / `block-end` align), label / error-text auto-rendering, kbd shortcut indent.

## ⚠ Best-practice states — to define
- **Read-only** styling — not distinct from default.
