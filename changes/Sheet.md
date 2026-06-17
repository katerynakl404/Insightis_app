# Sheet — prod → expected

Source: `@insightis/ui` `Sheet/index.tsx`. Baseline: [`../current/Sheet.md`](../current/Sheet.md).

## SheetOverlay
| State | Current (prod) · was | Expected · became |
|---|---|---|
| Open | `fixed inset-0 z-50 bg-black/80` + `animate-in fade-in-0` | — no change |
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

## ⚠ Best-practice states — to define
- **Surface harmonization** — settle Sheet vs Popover vs Modal on either `bg-card` or `bg-background`, not both.
- **`role="dialog"` description** — `SheetDescription` should be referenced via `aria-describedby` (Radix does this; verify in consumers).

## No change (—)
Animation durations, z-index, padding, side grammar, default `side="right"`, `isCloseButtonVisible` default `true`.
