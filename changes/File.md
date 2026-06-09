# File — prod → expected

Source: `@insightis/ui` `File/index.tsx` + `FileRightSlot`, `FileDismiss`, `FileRetry`, `FileSkeleton`. Baseline: [`../current/File.md`](../current/File.md).

| State | Current (prod) · was | Expected · became | Specification |
|---|---|---|---|
| Default | border `border`, icon `accent` (size-6), name `Text/Body` medium, size `Text/Secondary` xs | — no change (hex → [colors](colors.md)) | radius `sm 2px`, `px-2 py-1` |
| Hover (interactive, `onClick`) | ⚠ none defined | ⚠ — to define | recommend bg `State/Hover` for parity with menu rows |
| Focus-visible (interactive) | `ring-2 ring-ring ring-offset-2` (global ring) | use `--focus-ring-brand` 2px + 2px gap | brand-tinted ring, matches Button focus |
| Pressed (interactive) | ⚠ none defined | ⚠ — to define | optional — recommend bg `State/Pressed` |
| Loading | `pointer-events-none`; right slot renders Spinner/Skeleton | — no change | uses [`Skeleton`](Skeleton.md) + [`Spinner`](../current/Spinner.md) — no own tokens |
| Error | border `red/20`, bg `red/5`, ring `red/20`, svgs `red/60` | — no change (hex → [colors](colors.md)) | `Feedback/Red` family |
| Disabled | ⚠ none defined | ⚠ — to define | bg `State/Disabled`, text `Text/Inactive`, `pointer-events-none` |

## No change (—)
Container layout, icon size, name/size typography, sub-parts (Dismiss / Retry / Skeleton / RightSlot).

> Summary: File has **no component-level change** — only inherited token-hex shifts via [`changes/colors.md`](colors.md). Pending work is **state coverage** (hover, pressed, disabled) and aligning the focus ring with the rest of the system.
