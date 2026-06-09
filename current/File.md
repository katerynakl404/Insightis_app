# File — current (prod)

Live baseline from `@insightis/ui` `File/index.tsx`.

A file chip / list row with leading icon, name + size, and a right slot (loading / error / dismiss / retry).

## Spec
- Layout: `flex min-w-0 items-center justify-between gap-2`.
- Radius `rounded` (= `sm 2px`), border `border`, padding `px-2 py-1`.
- Default icon: `FileIcon size-6 text-accent`.
- Name: Typography `span`, `text-content-body`, `weight medium`, `truncate`.
- Size (optional): Typography `span`, `text-content-secondary`, `text-xs`, `truncate`.

## Variants / sub-parts
- **FileSkeleton** — loading-state placeholder (uses Skeleton).
- **FileRightSlot** — composes default right-side controls.
- **FileDismiss** — IconButton with `X`, fires `onDismiss`.
- **FileRetry** — IconButton with refresh icon, fires `onRetry`.

## States
- **Default** — border `border`, icon `accent`, text `content-body`.
- **isLoading** — `pointer-events-none`; right slot renders a Spinner / skeleton.
- **isError** — border `red/20`, bg `red/5`, ring `red/20`, all svgs `text-red/60`; right slot may show Retry + Dismiss.
- **Interactive (onClick provided)** — `cursor-pointer`, `role="button"`, `tabIndex={0}`, focus-visible `ring-2 ring-ring ring-offset-2`; Enter / Space trigger onClick.
- No hover / disabled state distinct from the interactive baseline (focus-visible is the only explicit focus affordance).
