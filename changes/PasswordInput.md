# PasswordInput — prod → expected

Source: `@insightis/ui` `PasswordInput/index.tsx`. Baseline: [`../current/PasswordInput.md`](../current/PasswordInput.md).

**PasswordInput has no own visual tokens** — it composes [`InputGroup`](InputGroup.md), the `Lock` icon, an `InputGroupInput`, and a trailing toggle button. Every visual state is delegated to `.igrp` (see the State table below for the exact tokens, reproduced here so the component rebuilds stand-alone).

### DOM / markup (reproduce verbatim)
```html
<div class="igrp">
  <span class="igrp-add"><!-- Lock svg, 20×20, viewBox 0 0 24 24, stroke currentColor, stroke-width 2 --></span>
  <input class="igrp-input" type="password" value="…">
  <button class="iconbtn" type="button"
          style="height:24px;width:24px;background:transparent;border:none;color:var(--ink-secondary);margin-right:6px"
          aria-label="Show password">
    <!-- Eye svg, 16×16, viewBox 0 0 24 24; swaps to EyeOff when visible -->
  </button>
</div>
```
Lock glyph: `<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`. Eye glyph: `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>`. JS toggles `type` password↔text and swaps the trailing glyph + `aria-label`.

## Composition — reused components & exact dimensions

PasswordInput draws **all** dimensions from the components it composes; it adds nothing of its own.

The shipped kit demo composes the **default-size** InputGroup (`.igrp`, no `is-*` size modifier) plus a bare `.iconbtn` toggle styled inline. Exact dimensions below are read off `pages/kit-theme.css` and the storybook markup (CSS wins over prod's React props).

| Slot | Reused component + variant | Key dimensions (from `kit-theme.css`) |
|---|---|---|
| Shell | [`InputGroup`](InputGroup.md) default size (`.igrp`, no size modifier) | **height 36px** (`.igrp{height:36px}`, line 1582; `is-xs`=28 / `is-sm`=32 / `is-lg`=40 / `is-xl`=44, line 1603 — none applied here); radius **6px**; border **1px** `var(--border)`; bg `var(--bg)`; color `var(--ink-secondary)`; font-size **.875rem (14px)**; `padding-right:0`; transition `border-color .15s, box-shadow .15s, color .15s` |
| Text input | `InputGroupInput` (`.igrp-input`) | `flex:1`; fills shell height (`height:100%`); bg `transparent`; border none; outline none; padding **0 8px**; `min-width:0`; font-size **.875rem (14px)**; color `var(--ink)`; `font-family:inherit`; placeholder `var(--ink-inactive)` (lines 1586–1587) |
| Leading icon | `Lock` inside addon `.igrp-add` | `display:inline-flex`, centred; `height:100%`; addon padding **0 10px**, gap **8px**; color `var(--ink-secondary)`; svg **20px × 20px** (`.igrp-add svg`, line 1585) |
| Trailing toggle | bare `.iconbtn` toggle (Eye / EyeOff), inline-styled | **24px × 24px**, `background:transparent`, `border:none`, `color:var(--ink-secondary)`, `margin-right:6px`; svg **16px × 16px**; `aria-label` swaps "Show password" ↔ "Hide password". (Prod's React uses an IconButton `size="sm"`; the shipped kit demo renders a 24px bare button — reproduce the 24px button.) |

> Reference line — InputGroup default: **h 36px · radius 6px · border 1px `--border` · bg `--bg` · input padding 0 8px · 14px text · addon padding 0 10px, svg 20×20**. Toggle: **24×24 bare `.iconbtn`, transparent, svg 16×16, margin-right 6px**. Full specs: [`InputGroup`](InputGroup.md), [`IconButton`](IconButton.md).

| State | Current (prod) · was | Expected · became | Specification |
|---|---|---|---|
| Default | InputGroup default + Lock leading + Eye/EyeOff trailing | — no change | shell `.igrp`: border 1px `var(--border)`, bg `var(--bg)`, height 36px, radius 6px |
| Hover | inherits `InputGroup` (`.igrp:hover`, `.s-hover`) | — no change | border-color → `var(--border-hover)` (line 1588) |
| Visible toggle | input type swaps `password` → `text`; trailing icon swaps `EyeOff` → `Eye`; `aria-label` swaps "Show" ↔ "Hide" | — no change (behavior fine) | a11y is correct |
| Focus | inherits `InputGroup` (`.igrp:focus-within`, `.s-focus`) | — no change | border-color → `var(--input-focus)`; `box-shadow:none` (line 1589). (No brand focus ring on InputGroup today.) |
| Pressed | inherits `InputGroup` (`.igrp:active`, `.s-pressed`) | — no change | border-color → `var(--input-focus)`; border-only swap, no bg lift (line 1592) |
| Error | inherits `InputGroup` error styling (`.igrp.s-error`) | — no change (hex → [colors](colors.md)) | border-color `var(--input-error)`, **`background:transparent`** (NOT a red tint), svg + `::placeholder` color `var(--input-error)` (lines 1600–1601) |
| Disabled | inherits `InputGroup` (`.igrp.s-disabled`) | — no change | `opacity:var(--opacity-disabled)`; `pointer-events:none` (line 1602) — toggle button is dimmed with the whole group |

## No change (—)
Icons (Lock leading, Eye / EyeOff trailing), toggle behavior, `aria-label` swap, trailing toggle (24px transparent bare `.iconbtn`).

## ⚠ Best-practice states — to define
- **Caps Lock indicator** — surface a warning when caps-lock is on while focused (a11y nice-to-have).
- **Strength meter slot** — currently no surface for it; consumer must compose externally.
