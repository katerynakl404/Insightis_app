# Sheet — prod → expected

Source: `@insightis/ui` `Sheet/index.tsx`. Baseline: [`../current/Sheet.md`](../current/Sheet.md).

## SheetOverlay
| State | Current (prod) · was | Expected · became |
|---|---|---|
| Open | `fixed inset-0 z-50 bg-black/80` + `animate-in fade-in-0` | scrim → **`--overlay-scrim`** (`rgba(15,23,42,.45)` light / `rgba(2,6,23,.6)` dark) — unified with every other overlay (`.ov` / `.dlg-overlay` / `.cl-side-backdrop` / `.acct-overlay`); the prod `bg-black/80` is superseded |
| Closed | `animate-out fade-out-0` | — no change |

## SheetContent
| State | Current (prod) · was | Expected · became | Specification |
|---|---|---|---|
| Open (any side) | `fixed z-50 gap-4 p-6 bg-background shadow-lg`, `transition ease-in-out`, 500ms open / 300ms close | — no change (hex → [colors](colors.md)) | `bg-background` becomes `Surface/Background` (`#F8FAFC` / dark `#0F0E14`) — same harmonization concern as [Popover](Popover.md): peer modals use `Surface/Card`, Sheet uses `Surface/Background` |
| Close button | top-right `X 16px`, bespoke `opacity-70 hover:opacity-100`, focus `ring-2 ring-ring ring-offset-2` | **reuses `IconButton tertiary`** — drop the bespoke close styling entirely | Hover, pressed, and focus all flow through `.iconbtn-tertiary` (transparent → Brand/Primary @ 6 % hover bg → Brand/Primary @ 8 % pressed bg → `--focus-ring-brand` 2 px + 2 px Surface/Card gap focus). The kit's previous Sheet states table had a dedicated **Close-button focus** row documenting a bespoke ring spec; that row was dropped because the tertiary IconButton's own focus state already documents the same ring. |
| Side: top | `inset-x-0 top-0 border-b`, slide-from-top | — no change |
| Side: bottom | `inset-x-0 bottom-0 border-t`, slide-from-bottom | — no change |
| Side: left | `inset-y-0 left-0 w-3/4 sm:max-w-sm border-r`, slide-from-left | — no change |
| Side: right (default) | `inset-y-0 right-0 w-3/4 sm:max-w-sm border-l`, slide-from-right | — no change |

## Sub-parts
| Part | Current (prod) · was | Expected · became |
|---|---|---|
| SheetHeader | `flex flex-col space-y-2 text-center sm:text-left` | — no change |
| SheetFooter | `flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2` | — no change |
| SheetTitle | `font-semibold text-foreground text-lg` | — no change (hex → [colors](colors.md)) |
| SheetDescription | `text-muted-foreground text-sm` | — no change (hex → [colors](colors.md)) |

## Concrete dimensions

**Prod `SheetContent` (Tailwind, React source):** panel `gap-4` = **16px** internal gap · `p-6` = **24px** padding all sides · `shadow-lg` · transitions **500ms open / 300ms close**, `ease-in-out`. Overlay scrim **Expected `--overlay-scrim`** (`rgba(15,23,42,.45)` light / `rgba(2,6,23,.6)` dark — unified with all overlays; prod was `bg-black/80` / 80% black), full-screen `fixed inset-0`, `z-50`, `fade-in-0` / `fade-out-0`. Side width: left/right `w-3/4` (**75% viewport**) capped at `sm:max-w-sm` (**384px**); top/bottom span `inset-x-0` (full width), auto height. Title `text-lg` (**18px / 600**); description `text-sm` (**14px**).

**Kit-demo `.sht` (storybook, `pages/kit-theme.css:1646–1656`)** — a miniature illustrative box, *not* the prod dimensions:

| Element | Selector | Dimensions / padding | Other |
|---|---|---|---|
| Demo frame | `.sht` | **240×240px**, **radius 6px**, `overflow:hidden` | border 1px `--border`, bg `--bg` |
| Scrim | `.sht .sht-mask` | `inset:0` (fills frame) | `var(--overlay-scrim)` — unified scrim (was `rgba(0,0,0,.6)`) |
| Panel (right, default) | `.sht .sht-panel` | **width 65%**, full height (`top:0;bottom:0;right:0`) · **padding 16px** · **gap 8px** | bg `--bg`, `box-shadow -4px 0 10px rgba(0,0,0,.15)`, flex column |
| Panel — left | `.sht.var-left .sht-panel` | width 65%, anchored left | shadow `4px 0 10px …` |
| Panel — top | `.sht.var-top .sht-panel` | full width, **height 55%**, anchored top | shadow `0 4px 10px …` |
| Panel — bottom | `.sht.var-bottom .sht-panel` | full width, **height 55%**, anchored bottom | shadow `0 -4px 10px …` |
| Title | `.sht .sht-t` | font **1rem / 600** | colour `--ink` |
| Description | `.sht .sht-d` | font **.75rem** | colour `--ink-secondary` |
| Close button | `.sht .sht-x` | **24×24px**, positioned `top:6px; right:6px` · **reuses IconButton tertiary** (see Close-button row above) | inner `svg` **14×14px** |

(⚠ The legacy `.prod .sht .sht-x` rule at `kit-theme.css:415` declares a **20×20px** bespoke close button — `display:inline-flex` / `align-items:center` / `justify-content:center`, `border:none`, `background:transparent`, `color:var(--ink)`, `opacity:.7`, `cursor:pointer`, `border-radius:2px`, positioned `top:8px; right:8px`, with `:hover{opacity:1}` (line 416) — superseded by the 24×24 IconButton-tertiary version at line 1652; the prod-scope rule still lingers.)

## ⚠ Best-practice states — to define
- **Surface harmonization** — settle Sheet vs Popover vs Modal on either `bg-card` or `bg-background`, not both.
- **`role="dialog"` description** — `SheetDescription` should be referenced via `aria-describedby` (Radix does this; verify in consumers).

## No change (—)
Animation durations, z-index, padding, side grammar, default `side="right"`, `isCloseButtonVisible` default `true`.
