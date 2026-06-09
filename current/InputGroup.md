# InputGroup — current (prod)

Live baseline from `@insightis/ui` `InputGroup/index.tsx` + `InputGroupAddon`, `InputGroupInput`.

A composite wrapper that fuses an input with leading / trailing / block addons (icons, labels, kbds, IconButtons) into a single visual unit, with shared focus / error / disabled wiring.

## Spec — shell
- `relative flex w-full items-center rounded-md`, `outline-none`, transition `[border,color,box-shadow]`.
- Sizes (h / min-h): xs 28 / sm 32 / md 36 / lg 40 / xl 44 px.
- Variants:
  - **primary** (default): border `border`, bg `background`, text `content-secondary`.
  - **outline**: border `border`, bg `card`, text `content-secondary`.
- On internal input `focus-visible`: border `content-primary`.
- Layout container above shell: `flex w-full flex-col gap-1` (optional label + shell + optional error text).
- Label: Typography `label` `weight=medium` `textColor=secondary`, size class `text-xs` (xs/sm) / `text-sm` (md/lg/xl).

## Spec — addon (`InputGroupAddon`)
- `flex h-full items-center justify-center gap-2 cursor-text select-none`.
- Icon sizing: xs `size-4`, sm/md/lg/xl `size-5`.
- align variants:
  - **inline-start**: `order-first pl-2.5`.
  - **inline-end**: `order-last pr-2.5`.
  - **block-start**: `order-first w-full justify-start px-2.5 pt-3` (stacks input below).
  - **block-end**: `order-last w-full justify-start px-3 pb-3`.
- Clicking the addon delegates focus to the inner input (unless target is a `<button>`).
- Group disabled state: `group-data-[disabled=true]/input-group:opacity-50`.

## States
- **Default** — variant border + bg, text `content-secondary`.
- **Focus** (inner input `:focus-visible`) — shell border → `content-primary` (no ring).
- **Error** (`isInvalid` / inner `aria-invalid=true`) — border `red/20`, bg `red/5`, ring `red/20`, svg `red/60`, placeholder `red/60`; error message `text-destructive` below shell.
- **Disabled** (`InputGroupInput:disabled`) — `opacity-50`, `select-none`; addons inherit via `group-data-[disabled=true]`.
- **Stacking with block-* addon** — shell switches to `h-auto flex-col`; input gets `pt-3` / `pb-3` accordingly.
- No explicit hover / pressed / loading defined.
