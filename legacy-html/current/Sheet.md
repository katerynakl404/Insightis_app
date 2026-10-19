# Sheet — current (prod)

Live baseline from `@insightis/ui` `Sheet/index.tsx`.

Built on Radix `@radix-ui/react-dialog`. A side-anchored drawer with overlay, animations, and an embedded close button. Used internally by `Sidebar` for its mobile drawer.

## Exports
- `Sheet` (Root), `SheetTrigger`, `SheetClose`, `SheetPortal`.
- `SheetOverlay`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription`.

## Spec — `SheetOverlay`
- `fixed inset-0 z-50`, bg `black/80`.
- Open: `animate-in fade-in-0`. Close: `animate-out fade-out-0`.

## Spec — `SheetContent`
- `fixed z-50 gap-4 p-6`, bg `background`, `shadow-lg`, `transition ease-in-out`.
- Open animation duration 500ms; close 300ms.
- Built-in close button: top-right `X` 16px, `opacity-70 hover:opacity-100`, focus ring `ring-2 ring-ring ring-offset-2`. Hidden if `isCloseButtonVisible={false}`.

## Variants (`side`)
- **top** — `inset-x-0 top-0`, `border-b`; slides from top.
- **bottom** — `inset-x-0 bottom-0`, `border-t`; slides from bottom.
- **left** — `inset-y-0 left-0`, `h-full w-3/4 sm:max-w-sm`, `border-r`; slides from left.
- **right** (default) — `inset-y-0 right-0`, `h-full w-3/4 sm:max-w-sm`, `border-l`; slides from right.

## Sub-parts
- **SheetHeader** — `flex flex-col space-y-2 text-center sm:text-left`.
- **SheetFooter** — `flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2`.
- **SheetTitle** — `font-semibold text-foreground text-lg`.
- **SheetDescription** — `text-muted-foreground text-sm`.

## States
- **Open** (`data-state=open`) — content slides in, overlay fades in.
- **Closed** (`data-state=closed`) — content slides out, overlay fades out, then Radix unmounts.
- Close button hover (opacity-70 → opacity-100) + focus ring (`ring-ring`).
- No disabled state on the surface; focus is trapped while open (Radix Dialog).
