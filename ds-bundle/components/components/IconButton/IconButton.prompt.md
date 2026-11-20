IconButton from @devart/ui-react. Use via `window.DevartUI.IconButton` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

An icon-only button. Same variants and the same states as `Button`, on a square
box: hover, press, disabled and radius follow [Button → Rules](../Button/Button.md#rules).

**`aria-label` is required.** Name the action, not the surrounding row: "Delete
connection", not "Connection". Without it the control is unusable by screen
reader and by e2e locators, which bind to the accessible name rather than a test
id.

## Sizes

`3xs` (20) `2xs` (24) `xs` (28) `sm` (32) `md` (36) `lg` (40) `xl` (44). The box
ladder from `xs` up mirrors `Button` step for step, so an icon-only control lines
up with a text button of the same size. The glyph is 20px on `lg` and `xl`,
16px on `sm` and `md`, 14px on `xs` and `2xs`, 12px on `3xs`.

**`2xs` is the row-action size** — use it for a kebab or an inline edit/delete
pair inside a table row or a list row, and nothing else.

**`3xs` is the tree-row toggle** — expand / collapse at the start of a tree row,
one on nearly every row, where a 24px box outweighed the names beside it. Not a
row action: those stay `2xs`.

```jsx
<TableActionsCell>
  <IconButton aria-label={`Edit ${name}`} size="2xs" variant="tertiary">
    <Pencil />
  </IconButton>
  <IconButton aria-label={`Delete ${name}`} size="2xs" variant="destructiveTertiary">
    <Trash2 />
  </IconButton>
</TableActionsCell>
```

## Variants worth knowing

- `tertiary` — the default for a secondary affordance: no border, no fill at
  rest, neutral hover.
- `destructiveTertiary` — its destructive twin. Red ink, red-tinted hover. The
  tint is matched to the neutral hover's perceived strength in **both** themes,
  which is why it reads as the same weight beside a `tertiary` sibling rather
  than shouting.
- `transparent` — no box at all (`p-0`, fit-content), for an inline trigger
  inside dense text.

Never paint a raw red icon in place of `destructiveTertiary`: a bare `<Trash2
className="text-fb-red" />` has no hit area, no hover and no focus ring.

## Behaviour

`isLoading` swaps the glyph for a `Spinner` and sets `aria-busy` without
disabling. Focus is the kit-wide brand ring on every variant, destructive
included — a red ring on a red control reads as noise.

`tooltip` names the action on hover and focus (`true` → the `aria-label`). With
`disabled` as well, the control is rendered `aria-disabled` so the tooltip still
opens — use it to say why the action is off. Same code as `Button`'s `tooltip`.

## Props

```ts
interface IconButtonProps {
  /** The control's name; it has no visible text. */
  "aria-label": string;
  asChild?: boolean;
  /** Replaces the icon with a spinner and blocks pointer interaction while keeping the variant fill. Sets `aria-busy`; does n */
  isLoading?: boolean;
  /** Shown on hover and focus; `true` shows the `aria-label`. A disabled button with a tooltip is rendered `aria-disabled`, s */
  tooltip?: React.ReactNode;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  ref?: React.Ref;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "transparent" | "tertiary" | "destructiveTertiary" | "destructive" | "primaryTertiary" | "outline" | "destructiveOutline";
  size?: "sm" | "md" | "lg" | "xl" | "xs" | "3xs" | "2xs";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "rounded" | "full";
}
```
