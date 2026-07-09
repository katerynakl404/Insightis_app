# Modal — prod → expected

Modal's shell tokens stay close to prod; the changes are mostly inherited from the components it embeds (Button + text colours).

| Part | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Border | `Stroke/Border` `#F0F5FA` | — | `#E2E8F0` (Slate-200) | Bumped one step for visibility — matches `--border` light token update |
| Title | `content-primary` `#111827` | — | `Text/Primary` `#0F172A` (Slate-900) | Token rename; visually near-identical |
| Body text | `content-secondary` | — | `Text/Secondary` (Slate-500 / Grey-400) | Token rename |
| **Cancel action** | `Button outline` (teal border / transparent bg) | — | **`Button secondary`** — filled card-style, lower emphasis than Outlined; hover always lighter than default | Emphasis shift: secondary fills with `Surface/Card` so "Cancel" reads below the primary destructive action |
| **Destructive action** | `Button destructive` (themed: light `#C10007`, dark `#7D1B1B` ⚠ failed AA) | — | **`Button destructive`** — now uses theme-independent `Feedback/Red` (`#B91C1C`, Red-700) with hover `Feedback/Error_Hover` (Red-800) and press `Feedback/Error_Press` (Red-850). AA in both themes. | Dark theme was 2.76:1 against Card surface — failed WCAG AA. Fix at semantic layer (`--fb-red` pinned to Red-700, theme-independent). |

## Component reuse note

The Modal kit demo previously rendered its Expected column under the `.prod` scope, so the inner Cancel/Delete buttons resolved against prod tokens — masking the fact that both Button variants have changed. The Expected column now uses the default token scope:

- Cancel `<button class="btn btn-sm btn-secondary">` (was `btn-outline`)
- Delete `<button class="btn btn-sm btn-destructive">` (unchanged classname; new tokens under the hood)

## No change (—)
Surface `Card` — the React/Tailwind value that renders the same as the shipped kit (`bg-card` = `--card`), so it's kept as-is. (Radius, padding, shadow and overlay are **not** "no change": the kit `.dlg` overrides them visually — see "Resolved" below.)

## Kit reproduction — shipped `.dlg` values (kit-theme.css 933–943)

The values above describe the React/Radix/Tailwind prod component. The **shipped kit** `.dlg` modal diverges — these are the values to reproduce from the kit:

| Part | Selector | Shipped value |
|---|---|---|
| Overlay | `.dlg-overlay` | `background:var(--overlay-scrim)` = `rgba(15,23,42,.45)` light / `rgba(2,6,23,.6)` dark (NOT `black/80`) |
| Shell | `.dlg` | `background:var(--card); border:1px solid var(--border); border-radius:.875rem` (14px); `box-shadow:var(--shadow-modal)` (deepest elevation rung — light `0 20px 40px -8px rgba(0,0,0,.22)`, dark boosted `0 24px 48px -12px rgba(0,0,0,.72), 0 8px 18px -6px rgba(0,0,0,.55), inset 0 1px 0 0 rgba(255,255,255,.05)`); `max-width:calc(100vw - 2rem); display:flex; flex-direction:column` |
| Header | `.dlg-hdr` | `display:flex; align-items:center; gap:.75rem; padding:.875rem 1.25rem .5rem; flex:none` |
| Title | `.dlg-title` | `font-size:1.25rem; line-height:1.75rem; font-weight:500; color:var(--ink); margin:0; flex:1; min-width:0` |
| Progress wrapper | `.dlg-progress` | `padding:0 1.25rem .875rem; flex:none; display:flex; flex-direction:column; gap:.375rem` (omit entire block on single-step dialogs) |
| Progress text | `.dlg-progress-txt` | `font-size:.75rem; color:var(--ink-secondary)` (e.g. "Step 1 of 2") |
| Progress track | `.dlg-progress-track` | `height:3px; background:var(--border); border-radius:99px; overflow:hidden` |
| Progress fill | `.dlg-progress-fill` | `height:100%; background:var(--brand-primary); border-radius:99px; transition:width .4s ease`; width set inline per step (e.g. `width:50%`) |
| Body | `.dlg-body` | `flex:1; overflow:hidden; position:relative; min-height:0` |
| Step | `.dlg-step` | `position:absolute; inset:0; overflow-y:auto; padding:1.25rem; display:flex; flex-direction:column; gap:1rem` — all steps stacked in same space, no layout shift |
| Hidden step | `.dlg-step.is-hidden` | `display:none` |
| Footer | `.dlg-ftr` | `border-top:1px solid var(--border); padding:.875rem 1.25rem; display:flex; justify-content:flex-end; gap:.5rem; flex:none` |

## Resolved — kit `.dlg` authoritative where it diverges visually

Decision (same rule as [`Popover.md`](Popover.md)): a React/Tailwind value is kept only where it renders the **same** as the shipped kit (e.g. Surface = `Card` = `--card`). Where the React/Tailwind value would render **differently** — the four properties below — the shipped kit `.dlg` value is **authoritative**, and the React/Tailwind value is a superseded prod-reference only (not the target).

| Property | React/Tailwind (superseded prod-reference) | Shipped kit (`.dlg`) — **authoritative** |
|---|---|---|
| Overlay | `black/80` | **`--overlay-scrim`** (`rgba(15,23,42,.45)` light / `rgba(2,6,23,.6)` dark) |
| Radius | `lg/xl` | **`.875rem` (14px)** |
| Box-shadow | `shadow-lg` (Tailwind) | **`var(--shadow-modal)`** — light `0 20px 40px -8px rgba(0,0,0,.22)`, theme-aware dark override |
| Padding | 16px (uniform) | header **`.875rem 1.25rem .5rem`**; step **`1.25rem`** |

## Sizing
There are **no** size-variant classes (sm/md/lg) in the CSS. Dimensions are set inline on the `.dlg` element: `style="width:480px;height:580px"` (storybook skeleton). The shell caps at `max-width:calc(100vw - 2rem)` so it never overflows the viewport on narrow screens.

## Scrollable body pattern
Each `.dlg-step` is `overflow-y:auto` inside the `flex:1; overflow:hidden` body, so long content scrolls within the step while header, progress and footer stay pinned (`flex:none` on each). No extra classes needed.

## Still needed (per kit)
- Loading state inside the modal (not yet defined in CSS)
