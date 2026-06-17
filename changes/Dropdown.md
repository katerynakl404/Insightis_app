# Dropdown menu — prod → expected

All dimensions below apply to **every** menu in the system — base text menu (Edit / Duplicate / Delete), context menu with icons (Help / Feedback / Guide), chat-row kebab menu — driven by a single `.mi` rule. Prod values come from live DevTools inspection.

| Part | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Surface bg | `bg-background` | — | `Surface/Card` | Token rename + semantically correct surface layer |
| Surface radius | `rounded-md` (6 px) | — | `rounded-lg` (8 px) | One step rounder; matches modal shell update |
| Surface padding | `p-1` (4 px) | — | `4 px` (unchanged) | — |
| Surface elevation | `shadow-md` (Tailwind: `0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1)`) | — | `0 6px 16px -4px rgba(0,0,0,.12), 0 2px 4px -2px rgba(0,0,0,.06)` | Same elevation feel, softer outer edge |
| **Item padding** | `py-0.5 px-1.5` (`2 / 6 px`) — prod's actual `.prod .mi` values per DevTools | — | `6 / 12 px` | Roomier hit target; clears WCAG 2.5.8 (≥ 24 px) |
| **Item gap (icon ↔ label)** | `gap-1.5` (`6 px`) | — | `8 px` | Modest breathing room from the label |
| **Item radius** | `rounded` (`4 px`, Tailwind default) | — | `6 px` | Matches the step the surface takes (md → lg) |
| **Item height** | `~24 px` (cramped) | — | `~32 px` | Bigger hit target without overshooting |
| Item text | `content-primary` `#111827` · text-sm `14 px` · DM Sans | — | `Text/Primary` `#0F172A` · text-sm `14 px` · DM Sans | Token rename; visually near-identical |
| Item hover bg | `primary/10` | — | `State/Hover` | Unified with the rest of the kit's low-emphasis hover system |
| Destructive item text | `red` — themed (light `#C10007`, dark `#FF5151`) | — | `Feedback/Red_Text` — theme-adaptive (`Red-700 #B91C1C` light, `Red-400 #F25555` dark) | Dark `#FF5151` replaced with Red-400 `#F25555` (5.27:1 vs Card dark); see A11y note below |
| **Leading icon** *(when present)* | 16 px Lucide at `stroke-width="2"` (bold) | — | 16 px Lucide at **`stroke-width="1.75"`** | One step lighter for a more modern feel |
| **Menu width** | fixed `176 px` (or per-variant override e.g. `.sbx-chat-menu` was `160 px`) | — | **fluid** — `min-width: 140 px`, `max-width: 320 px`, `width: max-content` | Menu hugs the longest item label within bounds; all variants inherit from base `.menu` — no per-variant override |
| **Separator (`.menu-sep`)** | always present | — | **Removed in ≤3-row menus.** Kept only in 4-row menus where it splits action groups. | 3-item menus (Pin/Unpin · Rename · Delete) read as one tight group without a divider |
| **Item hover/pressed** | `primary/10` (brand-mix — collided with `--state-pressed` perceptually) | — | `.mi:hover` → `--state-hover` (neutral); `.mi:active` → `--state-pressed`. `.mi.danger` keeps red-tinted hover (8% Feedback/Red mix) | Unified with `.sbx-nav-item`, `.sbx-pop-item`, `.btn-tertiary`, `.cl-dd` |

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
