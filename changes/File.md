# File — prod → expected

Source: `@insightis/ui` `File/index.tsx` + `FileRightSlot`, `FileDismiss`, `FileRetry`, `FileSkeleton`. Baseline: [`../current/File.md`](../current/File.md).

| State | Current (prod) · was | Expected · became | Specification |
|---|---|---|---|
| Default | border `border`, icon `accent` (size-6), name `Text/Body` medium, size `Text/Secondary` xs | — no change (hex → [colors](colors.md)) | `.file`: `display:flex; align-items:center; justify-content:space-between; gap:8px; border:1px solid var(--border); border-radius:2px; padding:4px 8px; width:240px; background:var(--card); min-width:0`. Icon `.file-ic` `24×24px`, `color:var(--brand-tertiary)`, `flex:none` |
| Hover (interactive, `onClick`) | ⚠ none defined | ⚠ — to define | not in shipped CSS — recommend bg `var(--state-hover)` for parity with menu rows |
| Focus-visible (interactive) | `ring-2 ring-ring ring-offset-2` (global ring) | use `--focus-ring` 2px + 2px gap | not in shipped CSS — recommend `box-shadow:0 0 0 2px var(--card),0 0 0 4px var(--focus-ring)` (brand-tinted ring, matches Button focus) |
| Pressed (interactive) | ⚠ none defined | ⚠ — to define | not in shipped CSS — optional, recommend bg `var(--state-pressed)` |
| Loading | `pointer-events-none`; right slot renders Spinner/Skeleton | — no change | `.file.s-loading{pointer-events:none}`; `.file.s-loading .file-r .spinner{display:inline-block}`. Spinner (`.file .file-r .spinner`) `14×14px`, `border-radius:9999px`, `border:2px solid currentColor` with `border-right-color:transparent`, `animation:btn-spin .7s linear infinite` (shared `@keyframes btn-spin{to{transform:rotate(360deg)}}`). Right slot inherits `color:var(--ink-secondary)` |
| Error | border `red/20`, bg `red/5`, ring `red/20`, svgs `red/60` | — no change (hex → [colors](colors.md)) | `.file.s-error{border-color:color-mix(in srgb,var(--fb-red) 20%,transparent); background:color-mix(in srgb,var(--fb-red) 5%,transparent)}` — **no ring**. Icon + right-slot svgs: `.file.s-error .file-ic, .file.s-error .file-r svg{color:color-mix(in srgb,var(--fb-red-text) 75%,transparent)}` |
| Disabled | ⚠ none defined | ⚠ — to define | not in shipped CSS — recommend bg `var(--state-disabled)`, text `var(--ink-inactive)`, `pointer-events:none` |

## Structure / markup
```
.file [.s-loading | .s-error]
  .file-l            (display:flex; align-items:center; gap:8px; min-width:0; flex:1)
    svg.file-ic      (FileIcon — viewBox 0 0 24 24, fill:none, stroke:currentColor, stroke-width:2; page-with-fold path + corner polyline)
    .file-meta       (display:flex; flex-direction:column; min-width:0)
      .file-name     (font-size:.875rem; font-weight:500; color:var(--ink-body); white-space:nowrap; overflow:hidden; text-overflow:ellipsis)
      .file-size     (font-size:.75rem; color:var(--ink-secondary))
  .file-r            (display:flex; align-items:center; gap:4px; color:var(--ink-secondary))
    — loading: span.spinner
    — error: Retry + Dismiss iconbtns (rotate-cw + x svgs)
    — default: Dismiss iconbtn (x svg)
```
Dismiss / Retry use bare `.iconbtn` (24×24, transparent bg, no border). No dark-mode override; no `@media` rule — width is fixed `240px`.

## No change (—)
Container layout, icon size, name/size typography, sub-parts (Dismiss / Retry / Skeleton / RightSlot).

> Summary: File has **no component-level change** — only inherited token-hex shifts via [`changes/colors.md`](colors.md). Pending work is **state coverage** (hover, pressed, disabled) and aligning the focus ring with the rest of the system.
