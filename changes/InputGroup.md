# InputGroup — prod → expected

Source: `@insightis/ui` `InputGroup/index.tsx` + `InputGroupAddon`, `InputGroupInput`. Baseline: [`../current/InputGroup.md`](../current/InputGroup.md).

**Label colour — 2026-09-18.** `--ink-body`, matching Selector and TextArea.

## Shell — primary variant

Shares the **form-control system** with [Input](Input.md) and [TextArea](TextArea.md): same hover / focus / error tokens, no outer ring (replaces the earlier proposal to use the Button-style `--shadow-focus`).

### DOM / markup structure
```html
<div class="igrp-wrap">                  <!-- optional column wrapper, gap 4px, width 240px -->
  <span class="igrp-lbl">Search</span>     <!-- optional label: .75rem / 500 / --ink-secondary -->
  <div class="igrp">                       <!-- shell; add .var-filled / .is-xs|sm|lg|xl / .s-* as needed -->
    <span class="igrp-add">…icon/text…</span>          <!-- leading addon -->
    <input class="igrp-input" placeholder="…">          <!-- inner field -->
    <button class="igrp-act igrp-clear" type="button" aria-label="Clear search">…×svg…</button>  <!-- optional clearable X -->
    <span class="igrp-add igrp-kbd-slot"><kbd class="igrp-kbd">⌘K</kbd></span>   <!-- optional trailing kbd slot -->
  </div>
</div>
```
- **`.igrp-wrap`** — `display:flex; flex-direction:column; gap:4px; width:240px`.
- **`.igrp-lbl`** — `font-size:.75rem; font-weight:500; color:var(--ink-secondary)`.
- **`.igrp`** — `display:flex; align-items:center; padding-right:0; color:var(--ink-secondary); transition:border-color .15s, box-shadow .15s, color .15s`.
- **`.igrp-add`** — `display:inline-flex; align-items:center; justify-content:center; height:100%; padding:0 0 0 12px; gap:8px; color:var(--ink-secondary)`. **No right padding** — the gap to the input text belongs to the input, so it is stated once. Addon `svg` takes the **same glyph step as Input (`.field`)**, so an InputGroup and an Input of one size share a left edge and an icon size; see *Icon proportion* below.
- **`.igrp-input`** — `flex:1; height:100%; background:transparent; border:none; outline:none; min-width:0; padding:0 12px 0 4px; font-size:.875rem; font-family:inherit; color:var(--ink)`. Placeholder: `color:var(--ink-inactive)`.

**Prefix-to-text gap is 4px** (directive 2026-09-04). It was 22px — 10px of right padding on the prefix plus 12px of left padding on the input, each looking reasonable alone. The Metrics toolbar carried a page-scoped patch to work around it; the patch is gone and the base is right.

| State | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Default | border `border`, bg `background`, text `content-secondary` | — | — no change (hex → [colors](colors.md)) | radius `6px`, heights xs 28 / sm 32 / md 36 / lg 40 / xl 44 px; input padding `0 8px`, addon padding `0 10px`, gap `8px`, font-size `.875rem`; border `1px solid --border`, bg `--bg` (outline variant `--card`) |
| Hover | ⚠ none defined | — | **shipped** — border `Stroke/Border_Hover` (`--border-hover`) | `.igrp:hover{border-color:var(--border-hover)}` — light `#7C8CA2` (slate-450) / dark `#475569` (slate-600) |
| Pressed | ⚠ none defined | — | **shipped** — border `--input-focus`; no bg change | `.igrp:active,.igrp.s-pressed{border-color:var(--input-focus)}` — same recipe as [Input](Input.md): border-only swap, no bg lift |
| Focus (inner input `:focus-visible`) | shell border → `content-primary` (no ring) | — | 1 px neutral border via `--input-focus` (light `Slate-600 #475569` / dark `Slate-500 #64748B`), no outer ring | `.igrp:focus-within{border-color:var(--input-focus);box-shadow:none}`. `--input-focus` softened from Slate-900 / Slate-100 through `--ink-secondary` (Slate-550 / Grey-400) to Slate-600 light / Slate-500 dark — see [Input](Input.md). (Form-control focus uses a neutral *border*, not the brand focus *ring* — distinct from `--shadow-focus`.) |
| Error (`isInvalid` / `aria-invalid`) | border `red/20`, bg `red/5`, ring `red/20`, svg `red/60`, placeholder `red/60` | — | 1 px `--input-error` border (theme-adaptive: light `red-700` / dark `red-500`), no bg tint, no outer ring; icon + placeholder also `--input-error` | Theme-adaptive solves dark-mode AA fail (`red-700` 2.76:1 vs grey-900) |
| Disabled (inner `:disabled`) | `opacity-50 select-none`; addons inherit | — | `opacity:var(--opacity-disabled)` (`.65`), `pointer-events:none`; addons inherit | ⚠ low text contrast on `Text/Body @ .65` — known limitation |

## Sizes (per-size spec — heights line up with Button `.btn-xs … .btn-xl`)

Base `.igrp`: `border-radius:6px`, `border:1px solid var(--border)`, `font-size:.875rem`; input padding `0 12px`, addon padding `0 10px 0 12px`, gap `8px`. Only height differs per size (md is the unmodified base).

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
| Default | `.igrp` | `--surface-card` | `#FFFFFF` / dark `#17171E` — matches `.field` and `.ta` |
| Filled (recess) | `.igrp.var-filled` | `--surface-page` | opt-in; the default shell is `--surface-card` |

> Both variants share identical border / hover / focus / pressed / error / disabled recipes (below); only the resting fill differs. Hover border `--border-hover` (slate-450 light `#7C8CA2` / slate-600 dark `#475569`); focus + pressed border `--input-focus` (slate-600 light `#475569` / slate-500 dark `#64748B`).

## Shell — outline variant
Same as primary, only bg swaps to `card` (`#FFFFFF` / dark `#17171E`). No own changes.

## Addons (`InputGroupAddon` → `.igrp-add`)
| State | Current (prod) | v1.0 | Expected |
|---|---|---|---|
| Default | text `content-secondary`, icon size 16/20 by control size | — | text `--ink-secondary`; glyph on the shared control step, and it steps with the **label**, not the box — see *Icon proportion* |
| Click delegates to input focus | yes (unless target is a `<button>`) | — | — no change |
| Group disabled | `opacity-50` via `group-data-[disabled=true]` | — | — no change |

`.igrp-add`: `display:inline-flex; align-items:center; justify-content:center; height:100%; gap:8px; color:var(--ink-secondary)`; left padding comes from the size ladder, right padding is always 0.

### Icon proportion (2026-09-19)

The leading glyph was `20px` while the trailing clear `✕` was `14px`, and the component had conceded the mismatch twice instead of fixing it: an `is-xl` override shrank the glyph to `18px`, and the Metrics toolbar carried a page-scoped patch pulling it to `16px` on off-grid `10px / 6px` padding. Audit [#15](../reports/2026-09-04-insightis-ux-audit.md) named InputGroup among the controls whose glyphs should climb one shared ladder; the fix landed on `.field` and never reached `.igrp`.

The rules now, all mirrored from Input (`.field`), all in `kit-theme.css`:

| | Rule |
|---|---|
| Glyph size | Follows the **control**, not the label — the shared **ICON SCALE** (`--icon-xs … --icon-xl`), so the glyph grows with the field and matches a Button of the same size |
| Leading vs trailing | **Identical size.** The trailing one only adds a padded box for the tap target |
| Trailing box | **Glyph + 8** — 4px of padding on each side, so it tracks the ICON SCALE. The box is a *result*, never a picked number; it keeps the inner padding at 4px, which is what puts the trailing glyph exactly on the leading one's rail |
| Trailing inset | `side-pad − 4px` (the box's own padding), so both glyphs land on the same rail |
| Side padding | **Capped at the `md` value (12px) from `md` up**, same as Button and Input at each size; `xs` keeps 8px |
| Icon → text gap | The input's left pad alone (`4px`), stated once, at every size |

Consequences: the `is-xl` glyph override is gone, both copies of the Metrics toolbar patch are gone, and the trailing slot is one recipe (`.igrp-act`) covering the clear `✕`, the password toggle and anything docked later, so no instance can be hand-inset again. It used to be `.iconbtn.iconbtn-tertiary` with the field overriding both its box and its glyph — a Button variant used only after cancelling it, which painted a `--state-hover` pill inside the input. **An icon in a field is not a tertiary button and needs no background highlight** (agreed rule): it is a sub-part of the field, takes the field's glyph step and colour, and has no surface of its own.

## Surface variants

`.igrp` fills with `--surface-card`, matching [Input](Input.md) `.field` and [TextArea](TextArea.md) `.ta`. `.igrp.var-filled` is the opt-in recess (`--surface-page`), for a field that should read as a well cut into its surface.

**Inverted 2026-09-19.** The card surface used to be the `var-outline` variant and `--surface-page` the default — but every InputGroup in the product carried `var-outline`, so the default was the one shape nothing used and every field had to opt out of it. Default and variant swapped; `var-outline` is gone from CSS and markup. Autofill's inset shadow follows the surface in both.

**Removed in the same pass:** `.mx-c3-toolbar .igrp{background:var(--surface-card);height:2.5rem}` — a page-scoped override sitting in `kit-theme.css` that re-declared the surface and the height for markup which already composed the right classes.

## Clearable X (`.igrp-clear` — search-style InputGroups)
Pure-CSS reveal: hidden by default, shown only when the input has content.

| Property | Value |
|---|---|
| Element | `<button class="igrp-act igrp-clear" type="button">` — the field's trailing-action sub-part, sibling to `.igrp-add`. **Not an [IconButton](IconButton.md)**, and explicitly not a tertiary one |
| Surface | **None.** No background, no border, no hover pill — the field already owns hover, focus and press, and a second surface inside it fights the first. Hover moves the glyph colour only; focus still rings |
| Box | Glyph + 8, so it tracks the ICON SCALE — see *Icon proportion* |
| Icon | The field's glyph step, so it pairs with the leading icon — see *Icon proportion* |
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

The three glyph / padding overrides this row used to carry are gone (2026-09-19) — they existed only to work around the oversized base glyph, and two of them sat off the 4px grid. The toolbar now takes the component's own ladder; width, surface and height stay, because those are page layout, not a restyle of the component.

> **Note — iOS font-size:** prod uses `14px` on inputs at all breakpoints. Bumping to `16px` on mobile eliminates iOS Safari auto-zoom but makes placeholder visually oversized in a compact field. Kept at `14px` (`.875rem`); iOS zoom is a known prod-parity limitation.

## No change (—)
Layout grammar (`inline-start` / `inline-end` / `block-start` / `block-end` align), label / error-text auto-rendering, kbd shortcut indent.

## ⚠ Best-practice states — to define
- **Read-only** styling — not distinct from default.

## Search fields converted from Input to InputGroup (2026-09-19)

DS Connections and Chats were building their search control out of `.field` + a leading `.field-icon` + a trailing `.iconbtn.iconbtn-tertiary.iconbtn-2xs`, plus page CSS for the clear button's show/hide and for suppressing the native WebKit clear ✕.

That is an InputGroup: an input with addons. Both now use `.igrp.is-lg.var-outline` with `.igrp-add` / `.igrp-input` / `.igrp-act.igrp-clear` — matching the Metrics toolbar search, which already did. Consequences:

- The trailing clear stops being an IconButton, which the ladder [explicitly forbids](../pages/kit-theme.css) for a control docked inside a field — an icon in a field needs no surface, because the field already owns hover / focus / press.
- The kit already owns the clear's visibility (`.igrp:has(.igrp-input:not(:placeholder-shown)) .igrp-clear`), so both pages dropped their own `:has()` rule.
- **Native WebKit clear suppression moved into the kit**: `.igrp .igrp-input[type="search"]::-webkit-search-cancel-button/-decoration` and the `.field` equivalent. Three pages were each re-declaring those two pseudo-elements.

Page CSS is now one line each: `max-width:none;width:100%`.
