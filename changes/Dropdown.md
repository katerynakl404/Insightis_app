# Dropdown menu — prod → expected

All dimensions below apply to **every** menu in the system — base text menu (Edit / Duplicate / Delete), context menu with icons (Help / Feedback / Guide), chat-row kebab menu — driven by a single `.mi` rule. Prod values come from live DevTools inspection.

| Part | Current (prod) | Expected |
|---|---|---|
| Surface bg | `bg-background` | `Surface/Card` |
| Surface radius | `rounded-md` (6 px) | `rounded-lg` (8 px) |
| Surface padding | `p-1` (4 px) | `4 px` (unchanged) |
| Surface elevation | `shadow-md` (Tailwind: `0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1)`) | matched in the kit via `0 6px 16px -4px rgba(0,0,0,.12), 0 2px 4px -2px rgba(0,0,0,.06)` — same elevation feel, softer outer edge |
| **Item padding** | `py-0.5 px-1.5` (`2 / 6 px`) — prod's actual `.prod .mi` values per DevTools | `6 / 12 px` — roomier hit target |
| **Item gap (icon ↔ label)** | `gap-1.5` (`6 px`) | `8 px` — modest breathing room from the label |
| **Item radius** | `rounded` (`4 px`, Tailwind default) | `6 px` — same step the surface takes (md → lg) |
| **Item height** | `~24 px` (cramped) | `~32 px` (modestly roomy — bigger hit target without overshooting) |
| Item text | `content-primary` `#111827` · text-sm `14 px` · DM Sans | `Text/Primary` `#0F172A` · text-sm `14 px` · DM Sans |
| Item hover bg | `primary/10` | `State/Hover` |
| Destructive item text | `red` — themed (light `#C10007`, dark `#FF5151`) | `Feedback/Red_Text` — theme-adaptive (`Red-700 #B91C1C` light, `Red-400 #F25555` dark) |
| **Leading icon** *(when present, e.g. Help / Feedback / Guide context menu)* | 16 px Lucide at `stroke-width="2"` (bold) | 16 px Lucide at **`stroke-width="1.75"`** (refined — one step lighter for a more modern feel) |

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
