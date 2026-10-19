# Popover — current (prod)

Live baseline from `@insightis/ui` `Popover/index.tsx` + `PopoverContent.tsx`.

Built on Radix `@radix-ui/react-popover`. Exports: `Popover` (Root), `PopoverTrigger`, `PopoverContent`.

## Spec — `PopoverContent`
- `z-50 w-72` (288px), radius `md 6px`, border `border`, bg `background`, text `content-primary`.
- Padding `p-4` (16px), `shadow-md`, `outline-none`.
- Default `align="center"`, `sideOffset={4}` — portalled.

## Animations
- **Open** — `animate-in fade-in-0 zoom-in-95` + side-aware slide:
  - `data-[side=bottom]:slide-in-from-top-2`
  - `data-[side=top]:slide-in-from-bottom-2`
  - `data-[side=left]:slide-in-from-right-2`
  - `data-[side=right]:slide-in-from-left-2`
- **Close** — `animate-out fade-out-0 zoom-out-95`.
- Origin: `--radix-popover-content-transform-origin` for natural pop direction.

## States
- **Open** (`data-state=open`) — content visible, animated in.
- **Closed** (`data-state=closed`) — content unmounted (Radix default) or animated out.
- No explicit hover / focus / disabled on the surface itself — focus management is Radix's: trigger gets focus on close, content traps focus while open.
- Trigger delegates all visual states to whatever the consumer passes (typically a Button or IconButton).
