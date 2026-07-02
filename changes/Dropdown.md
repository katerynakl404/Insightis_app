# Dropdown menu — prod → expected

All dimensions below apply to **every** menu in the system — base text menu (Edit / Duplicate / Delete), context menu with icons (Help / Feedback / Guide), chat-row kebab menu — driven by a single `.mi` rule. Prod values come from live DevTools inspection.

| Part | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Surface bg | `bg-background` | — | `Surface/Card` (`.menu{background:var(--card)}`) | Token rename + semantically correct surface layer |
| Surface border | none (prod `.menu` had no border) | — | `1px solid var(--border)` | Hairline frame so the menu reads as a distinct surface on any background |
| Surface radius | `rounded-md` (6 px) | — | `rounded-lg` (8 px) — `.menu{border-radius:8px}` | One step rounder; matches modal shell update |
| Surface padding | `p-1` (4 px) | — | `4 px` (`.menu{padding:4px}`, unchanged) | — |
| Surface elevation | `shadow-md` (Tailwind: `0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1)`) | — | `--shadow-overlay` — light `0 10px 15px -3px rgba(0,0,0,.12), 0 4px 6px -4px rgba(0,0,0,.08)`, theme-aware dark `0 16px 32px -8px rgba(0,0,0,.65), 0 6px 14px -4px rgba(0,0,0,.5), inset 0 1px 0 0 rgba(255,255,255,.04)` | Same elevation feel, softer outer edge; the single floating-surface rung (also `.sbx-chat-menu`, `.pop`, `.acpl-list`, `.sbx-pop`, `.toast`) |
| **Item padding** | `py-0.5 px-1.5` (`2 / 6 px`) — prod's actual `.prod .mi` values per DevTools | — | `6 / 12 px` | Roomier hit target; clears WCAG 2.5.8 (≥ 24 px) |
| **Item gap (icon ↔ label)** | `gap-1.5` (`6 px`) | — | `8 px` | Modest breathing room from the label |
| **Item radius** | `rounded` (`4 px`, Tailwind default) | — | `4 px` | `.mi` keeps the 4 px item radius (the `.menu` shell steps md → lg to 8 px; items stay 4 px) |
| **Item height** | `~24 px` (cramped) | — | `~32 px` | Bigger hit target without overshooting |
| Item text | `content-primary` `#111827` · text-sm `14 px` · DM Sans | — | `--ink-body` · `font-size:14px` · `font-family:inherit` (DM Sans) · `font-weight` inherited (400 — `.mi` sets none) · line-height left to flex centering (no explicit value) | Token rename; visually near-identical |
| Item hover bg | `primary/10` | — | `State/Hover` | Unified with the rest of the kit's low-emphasis hover system |
| Destructive item text | `red` — themed (light `#C10007`, dark `#FF5151`) | — | `Feedback/Red_Text` — theme-adaptive (`Red-700 #B91C1C` light, `Red-400 #F25555` dark) | Dark `#FF5151` replaced with Red-400 `#F25555` (5.27:1 vs Card dark); see A11y note below |
| **Leading icon (`.mi-ic`)** *(when present)* | 16 px Lucide at `stroke-width="2"` (bold) | — | `.mi .mi-ic{width:16px;height:16px;flex:none;color:currentColor}` — 16 px Lucide at **`stroke-width="1.75"`** (inherits item text colour via `currentColor`, so danger icons turn red automatically) | One step lighter for a more modern feel |
| **Menu width** | fixed `176 px` (or per-variant override e.g. `.sbx-chat-menu` was `160 px`) | — | **fluid** — `min-width: 140 px`, `max-width: 320 px`, `width: max-content` | Menu hugs the longest item label within bounds; all variants inherit from base `.menu` — no per-variant override |
| **Separator (`.menu-sep`)** | always present | — | **Removed in ≤3-row menus.** Kept only in 4-row menus where it splits action groups. | 3-item menus (Pin/Unpin · Rename · Delete) read as one tight group without a divider |
| **Item hover/pressed** | `primary/10` (brand-mix — collided with `--state-pressed` perceptually) | — | `.mi:hover` → `var(--state-hover)` (neutral); `.mi:active` → `var(--state-pressed)`. `.mi.danger:hover` → `color-mix(in srgb,var(--fb-red) 8%,var(--card))`; `.mi.danger:active` → `color-mix(in srgb,var(--fb-red) 14%,var(--card))` | Unified with `.sbx-nav-item`, `.sbx-pop-item`, `.btn-tertiary`, `.cl-dd` |
| **Item disabled (`.mi.is-disabled`)** | did not exist | — | `color:var(--ink-inactive); cursor:not-allowed; pointer-events:none` (no bg change; pointer-events removal blocks hover/click) | Implemented in CSS — already shipped, not a future state |
| **Item transition** | — | — | none — `.mi` declares no `transition`; hover/press bg swap is instant | Matches the rest of the menu family |
| **Item focus / selected / checked** | did not exist | — | not yet defined — no `.mi:focus-visible`, `.mi.is-selected`, or checked rule exists in the CSS | Open state, genuinely undecided (see storybook States) |

## DOM / markup

```html
<div class="menu">                  <!-- surface shell -->
  <div class="mi">Edit</div>        <!-- plain text item -->
  <div class="mi">                  <!-- item with leading icon -->
    <svg class="mi-ic" …>…</svg>     <!-- 16px Lucide, stroke-width 1.75 -->
    Help Center
  </div>
  <hr class="menu-sep">              <!-- optional group divider (4-row menus only) -->
  <div class="mi danger">Delete</div><!-- destructive item -->
  <div class="mi is-disabled">…</div><!-- disabled item -->
</div>
```

Items are `<div class="mi">` (the kit ships them as `div`s; `.mi` carries `border:none;background:transparent;text-align:left;width:100%` so a `<button>` works identically). `.menu` defaults to `width:max-content` clamped 140–320 px (variants `.sbx-chat-menu`, `.chat-row-menu`, `.ds-conn-menu` inherit). **Menu size system (opt-in fixed widths):** `.menu.is-sm` = 14rem · `.menu.is-md` = 18rem · `.menu.is-lg` = 22rem — for menus that should read as a roomy, consistent popover rather than hug their content (the composer Attach/Connections/Models menus use **M** at the default 4px padding). Optional WIP stub `.menu-wip` prepends inside any not-yet-redesigned menu.

### `.menu-sep` (group divider)
`height:1px; margin:4px -4px; background:var(--border); border:0` — the negative `-4px` horizontal margin lets the 1px rule span edge-to-edge across the menu's 4 px padding. Adjacent `.cl-menu-label` collapses the top margin to 0.

## ⚠️ A11y note — destructive item contrast on dark

The previous expected used the single `Feedback/Red` token (Red-700 `#B91C1C`) for destructive
**text**, which fails WCAG AA on the dark Surface/Card (`#17171E`) at **2.76:1** — below the 4.5:1
normal-text threshold. Prod did not have this regression because its dark `--fb-red` is a
brighter `hsl(358 100% 66%)` (`#FF5151`).

**Fix:** introduced `Feedback/Red_Text` — a theme-adaptive companion to `Feedback/Red`. It uses
Red-700 in light (8.39:1 vs `#FFFFFF`) and **Red-400 `#F25555` in dark (5.27:1 vs `#17171E`)** —
comfortable AA in both themes. `Feedback/Red` itself stays theme-independent so the destructive
**Button** background (red fill + white text) keeps its AA against white in both themes.

Applied to: `.mi.danger` (this component), `.badge-red`, `.statv-error`, `.file.s-error` icon,
`.toast.var-error` icon + progress bar. See [colors](colors.md) for the token row.

## No change (—)
Surface padding `4 px`, item text size (`text-sm` 14 px), font (DM Sans), text colour at AA contrast — same in both columns.
