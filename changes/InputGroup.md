# InputGroup — prod → expected

Source: `@insightis/ui` `InputGroup/index.tsx` + `InputGroupAddon`, `InputGroupInput`. Baseline: [`../current/InputGroup.md`](../current/InputGroup.md).

## Shell — primary variant

Shares the **form-control system** with [Input](Input.md) and [TextArea](TextArea.md): same hover / focus / error tokens, no outer ring (replaces the earlier proposal to use the Button-style `--shadow-focus`).

### DOM / markup structure
```html
<div class="igrp-wrap">                  <!-- optional column wrapper, gap 4px, width 240px -->
  <span class="igrp-lbl">Search</span>     <!-- optional label: .75rem / 500 / --ink-secondary -->
  <div class="igrp">                       <!-- shell; add .var-outline / .is-xs|sm|lg|xl / .s-* as needed -->
    <span class="igrp-add">…icon/text…</span>          <!-- leading addon -->
    <input class="igrp-input" placeholder="…">          <!-- inner field -->
    <button class="iconbtn iconbtn-tertiary igrp-clear" type="button" aria-label="Clear search">…×svg…</button>  <!-- optional clearable X -->
    <span class="igrp-add igrp-kbd-slot"><kbd class="igrp-kbd">⌘K</kbd></span>   <!-- optional trailing kbd slot -->
  </div>
</div>
```
- **`.igrp-wrap`** — `display:flex; flex-direction:column; gap:4px; width:240px`.
- **`.igrp-lbl`** — `font-size:.75rem; font-weight:500; color:var(--ink-secondary)`.
- **`.igrp`** — `display:flex; align-items:center; padding-right:0; color:var(--ink-secondary); transition:border-color .15s, box-shadow .15s, color .15s`.
- **`.igrp-add`** — `display:inline-flex; align-items:center; justify-content:center; height:100%; padding:0 10px; gap:8px; color:var(--ink-secondary)`. Addon `svg` is **fixed `20px × 20px`** (NOT size-dependent — there is no per-size icon scaling).
- **`.igrp-input`** — `flex:1; height:100%; background:transparent; border:none; outline:none; min-width:0; padding:0 8px; font-size:.875rem; font-family:inherit; color:var(--ink)`. Placeholder: `color:var(--ink-inactive)`.

| State | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Default | border `border`, bg `background`, text `content-secondary` | — | — no change (hex → [colors](colors.md)) | radius `6px`, heights xs 28 / sm 32 / md 36 / lg 40 / xl 44 px; input padding `0 8px`, addon padding `0 10px`, gap `8px`, font-size `.875rem`; border `1px solid --border`, bg `--bg` (outline variant `--card`) |
| Hover | ⚠ none defined | — | **shipped** — border `Stroke/Border_Hover` (`--border-hover`) | `.igrp:hover{border-color:var(--border-hover)}` — light `#7C8CA2` (slate-450) / dark `#475569` (slate-600) |
| Pressed | ⚠ none defined | — | **shipped** — border `--input-focus`; no bg change | `.igrp:active,.igrp.s-pressed{border-color:var(--input-focus)}` — same recipe as [Input](Input.md): border-only swap, no bg lift |
| Focus (inner input `:focus-visible`) | shell border → `content-primary` (no ring) | — | 1 px neutral border via `--input-focus` (light `Slate-600 #475569` / dark `Slate-500 #64748B`), no outer ring | `.igrp:focus-within{border-color:var(--input-focus);box-shadow:none}`. `--input-focus` softened from Slate-900 / Slate-100 through `--ink-secondary` (Slate-550 / Grey-400) to Slate-600 light / Slate-500 dark — see [Input](Input.md). (Form-control focus uses a neutral *border*, not the brand focus *ring* — distinct from `--shadow-focus`.) |
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

## Addons (`InputGroupAddon` → `.igrp-add`)
| State | Current (prod) | v1.0 | Expected |
|---|---|---|---|
| Default | text `content-secondary`, icon size 16/20 by control size | — | text `--ink-secondary`; icon **fixed `20×20`** at every size (prod's per-size 16/20 claim does not ship in the kit) |
| Click delegates to input focus | yes (unless target is a `<button>`) | — | — no change |
| Group disabled | `opacity-50` via `group-data-[disabled=true]` | — | — no change |

`.igrp-add`: `display:inline-flex; align-items:center; justify-content:center; height:100%; padding:0 10px; gap:8px; color:var(--ink-secondary)`.

## Clearable X (`.igrp-clear` — search-style InputGroups)
Pure-CSS reveal: hidden by default, shown only when the input has content.

| Property | Value |
|---|---|
| Element | `<button class="iconbtn iconbtn-tertiary igrp-clear" type="button">` (reuses [IconButton](IconButton.md) tertiary) |
| Box | `width:24px; height:24px; flex:none; margin-right:4px` |
| Icon | `svg` `14px × 14px` |
| Default | `display:none` |
| Revealed | `.igrp:has(.igrp-input:not(:placeholder-shown)) .igrp-clear{display:inline-flex}` |
| Behaviour | JS click handler empties `.igrp-input` and refocuses it |

## kbd slot (`.igrp-kbd-slot` / `.igrp-kbd` — trailing shortcut chip)
Trailing addon variant carrying a keyboard hint (e.g. ⌘K), styled as a chip on the input surface.

| Element | Value |
|---|---|
| `.igrp-kbd-slot` (a `.igrp-add`) | `padding:0 8px 0 4px; gap:8px` |
| `.igrp-kbd` | `font-size:.6875rem; font-family:inherit; line-height:1.4`; `border:var(--border-width) solid var(--border)`; `border-radius:4px`; `padding:1px 6px`; `background:var(--card2)`; `color:var(--ink-body)` |

## Responsive behaviour (≤ 767 px)

Page-level overrides (not the kit default) — Metrics toolbar `.mx-c3-toolbar .igrp`:

| | Prod (Current) | Expected (shipped) |
|---|---|---|
| `.mx-c3-toolbar .igrp` | `38.4px`, page bg | `width:100%; background:var(--card); height:2.5rem` (40px) |
| `.mx-c3-toolbar .igrp-add` | — | `padding:0 6px 0 10px` |
| `.mx-c3-toolbar .igrp-add svg` | `20px` (kit default) | `16px × 16px` |
| `.mx-c3-toolbar .igrp-input` | `padding:0 8px` | `padding-left:3px` |

> **Note — iOS font-size:** prod uses `14px` on inputs at all breakpoints. Bumping to `16px` on mobile eliminates iOS Safari auto-zoom but makes placeholder visually oversized in a compact field. Kept at `14px` (`.875rem`); iOS zoom is a known prod-parity limitation.

## No change (—)
Layout grammar (`inline-start` / `inline-end` / `block-start` / `block-end` align), label / error-text auto-rendering, kbd shortcut indent.

## ⚠ Best-practice states — to define
- **Read-only** styling — not distinct from default.
