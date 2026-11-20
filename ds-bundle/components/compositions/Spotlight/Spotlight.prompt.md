Spotlight from @devart/ui-react. Use via `window.DevartUI.Spotlight` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Dims and blurs everything around one or more targets; the cutout stays sharp
and live.

```jsx
<Spotlight target='[data-tour="composer"]' onScrimClick={nudge} />
<Spotlight target={[attachRef, '[data-tour="model"]']} padding={6} />   // lit as one union
```

A target is a selector, an element, a ref, or an array of them. Pass a
measured `rect` (and `bounds`) instead when something else already measures —
`Tour` does.

## What it draws

- **The scrim** — one layer over the bounds: the modal scrim (`--overlay-scrim`)
  under `--spotlight-blur`, with a rounded hole cut by its `clip-path`. The
  hole is not painted, so clicks inside it reach the page; the scrim takes
  every other click (`onScrimClick`).
- **The ring** — 2px Brand/Primary with a halo and a glow (`shadow-spotlight`)
  and a pulse (`pulse={false}` stops it). Its corner is concentric with the
  target: the target's own `border-radius` (or its nearest rounded ancestor's,
  for a square part such as a table row) + `padding`. `radius` overrides.

The hole and the ring glide to a new target on `--spotlight-move`. `leaving`
fades the layer out and lets every click through while it unmounts. All
motion stops under `prefers-reduced-motion`.

## Where it may dim

`boundary` (selector, element or ref) limits the scrim to one area — a page's
review strip or app chrome outside it stays live. Default: the viewport.

## `useTargetRect`

`useTargetRect(target, { padding, boundary })` → `{ rect, bounds, radius, vw, vh }`
is exported from this entry: the measurement the tour family shares, kept
current through resize, scroll, DOM changes and font loading. Use it to place
your own furniture against the same rect.

Portalled to `document.body`, or the nearest `PortalContainer`, at
`--spotlight-z` (70). While it is in the page, toasts sit one step under the
scrim (`--spotlight-z` − 1): a toast that lands as a tour opens ("HubSpot
connected") is dimmed with the rest of the page, not laid over the tour. What pops out of
a lit control — a tooltip, a menu, a popover — goes one step over the scrim
(`--spotlight-z` + 1, under the guide card), so it stays crisp.

## Props

```ts
interface SpotlightProps {
  /** What to light: a selector, an element, a ref, or an array of them (lit as one union). */
  target?: string | Element | { current: Element | null; } | readonly TourTarget[];
  /** A rect already measured (and padded) — wins over `target`. `null` dims everything. */
  rect?: TargetRect;
  /** The area the scrim covers, with `rect`. Default: the boundary, else the viewport. */
  bounds?: TargetRect;
  /** The cutout's and the ring's corner. Default: concentric with the targets — their own radius + `padding` (`useTargetRect( */
  radius?: number;
  /** Grows the lit area on every side. */
  padding?: number;
  /** The area the scrim may cover (selector, element or ref). Default: the viewport. */
  boundary?: string | Element | { current: Element | null; } | readonly TourTarget[];
  /** A click anywhere on the scrim. The cutout takes no clicks of its own. */
  onScrimClick?: (event: MouseEvent<HTMLDivElement>) => void;
  /** The ring's breathing pulse. */
  pulse?: boolean;
  /** Fades the layer out and lets every click through — while it unmounts. */
  leaving?: boolean;
  className?: string;
  /** Render into this element instead of `document.body`. */
  portalContainer?: HTMLElement;
  ref?: React.Ref;
}
```
