# Building with @devart/ui-react

Radix-based primitives styled entirely through CVA recipes over CSS-variable
tokens. There is **no theme provider and no context to wrap** — every token is
plain CSS cascade.

## Setup

- **No wrapper is required.** Render any component directly.
- **Dark mode** is a class, not a prop: put `class="dark"` on an ancestor
  (normally `<html>`), and every token re-resolves. A scoped `.dark` on a
  subtree also works — but several components portal to `document.body`
  (Modal, Sheet, Popover, DropdownMenu, Tooltip, TruncatedTitleTooltip, and
  Sonner's Toaster), so a scoped theme never reaches them — put the class on
  the document root.
- **Font** is DM Sans, shipped with the bundle. `font-sans` resolves to it.
- **`TooltipProvider`** is the one wrapper with a real job: it sets the shared
  hover delay. Wrap the app (or the subtree) in it if you use tooltips.

## Both themes come free

Every colour token is redeclared under `.dark`, so a subtree re-themes with a
class and nothing else — no provider, no props, no JS, no component changes:

```jsx
<div className="dark bg-surface-page p-6">
  {/* everything in here is dark-themed */}
</div>
```

Build in light and it works in dark, provided you only ever name role tokens
(`bg-surface-card`, `text-ink-body`) and never a raw colour. Each component
has a `DarkTheme` story showing exactly this. The one limit: components that
portal to `document.body` (Modal, Sheet, Popover, DropdownMenu, Tooltip,
Toast) are not reached by a scoped class — put `dark` on `<html>` to theme an
open overlay.

## Styling idiom — Tailwind utilities over semantic tokens

Style with utility classes, and **never name a raw colour**. There is no
`bg-slate-200` here: the primitive ramps are deliberately not exposed to
Tailwind, so only role names resolve. That indirection is what makes the whole
system re-theme from one stylesheet.

| Family | Real class names |
|---|---|
| Page/surfaces | `bg-surface-page` `bg-surface-card` `bg-surface-card2` `bg-surface-chips` `bg-surface-accent` |
| Text | `text-ink-primary` `text-ink-body` `text-ink-secondary` `text-ink-inactive` `text-ink-highlight` |
| Brand | `bg-brand-primary` `text-brand-secondary` `border-brand-tertiary` `hover:bg-brand-hover` `pressed:bg-brand-press` |
| Borders | `border-stroke` `border-stroke-hover` `border-stroke-field-hover` |
| Interaction | `bg-state-hover` `bg-state-pressed` `bg-state-disabled` `ring-state-focus-ring` `ring-focus-ring-brand` |
| Feedback | `bg-fb-red` `text-fb-red-text` `bg-fb-green` `bg-fb-attention` `hover:bg-fb-error-hover` |
| Tables | `bg-table-header-bg` `bg-table-row-hover` `bg-table-row-pressed` |
| On solid fills | `text-content-on-solid` |

Tints use one scale: `bg-brand-primary/6`, `/8`, `/12` alongside `/5 /10 /20 …`.
Tokens built with `color-mix()` (most `badge-*`, `toast-*`, `card-border-*`)
take **no** opacity modifier — `bg-badge-brand-bg/50` silently emits nothing.

### Spacing — a 4px grid

Spacing is stock Tailwind, so the step number is the unit: `4` = 16px. Every
value must land on a step; an arbitrary `p-[0.92rem]` is always wrong.

| Step | `0` | `1` | `2` | `3` | `4` | `5` | `6` | `8` | `10` | `12` | `16` | `20` | `24` |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| px | 0 | 4 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 64 | 80 | 96 |

Half-steps exist for control internals only — `px` (1px), `0.5` (2), `1.5` (6),
`2.5` (10), `3.5` (14). Use them inside a control (icon gaps, chip padding),
never for page or section rhythm.

Applies to `p/px/py/pt/pb/pl/pr/ps/pe`, `m/mx/my/…`, `gap`, `gap-x`, `gap-y`,
`space-x`, `space-y`, `w`, `h`, `size`, `min-*`, `max-*`, `top/right/bottom/left`,
`inset*` — each also available at `sm:` `md:` `lg:` `xl:` `max-sm:` `max-md:`.

### Radius

| Class | Token | Value | Typical use |
|---|---|---|---|
| `rounded-sm` | `--radius-sm` | 2px | hairline chips, kbd keys |
| `rounded` | `--radius` | 4px | the default |
| `rounded-md` | `--radius-md` | 6px | buttons, inputs, menu items |
| `rounded-lg` | `--radius-lg` | 8px | cards, popovers, accordion rows |
| `rounded-xl` | `--radius-xl` | 12px | banners, large surfaces |

`rounded-full` (pills, avatars) and `rounded-none` are also available, as are
the per-corner and per-side forms (`rounded-t-lg`, `rounded-tl-md`, …).

### Elevation

Shadows are roles, not sizes — pick by what the surface is doing. Never write a
raw `shadow-[0_1px_2px_…]`.

| Class | Role |
|---|---|
| `shadow-rest` | a flat card at rest |
| `shadow-card-hover` | that card lifted under the pointer |
| `shadow-lift-hover` | a stronger lift for interactive tiles |
| `shadow-menu` | dropdown and context menus |
| `shadow-dropdown` | select/combobox listboxes |
| `shadow-overlay-soft` | popovers and soft floating panels |
| `shadow-segctrl-hover` / `shadow-segctrl-active` | the SegmentedControl pill |
| `shadow-thumb` / `shadow-thumb-hover` | slider and switch thumbs |
| `shadow-banner-ic` / `shadow-banner-grad-ic` | Banner icon wells |
| `shadow-plan-card-featured` | the featured plan card |

Stock `shadow-sm|md|lg|xl|2xl|inner|none` still resolve, but a role token is
always the better choice — it re-themes, a stock shadow does not.

### Motion and tracking

`duration-fast` (120ms) · `duration-base` (180ms) · `duration-slow` (240ms) —
never a raw `duration-200`. `tracking-tight|normal|caps|display`, where
`tracking-tight` is this system's -0.01em, **not** Tailwind's stock -0.025em.
Plus `opacity-disabled` (0.65) for the disabled treatment.

Custom variants: **`pressed:`** means *pressed or held open* (it expands to
`:active`, `[aria-expanded=true]`, and `[aria-expanded=true]:hover`). Use it on
anything that can open a menu, so the trigger keeps its fill while open; use
`active:` only where nothing can be held open. `aria-invalid:` is also enabled.


## Overlays inside a themed or scrolling container

Menus, popovers, tooltips, dialogs and sheets portal to `document.body` by
default. That breaks a scoped `.dark` (the overlay stays light) and lets the
overlay paint outside a card or panel. Wrap the subtree to contain them:

```jsx
<PortalContainerProvider>
  <DropdownMenu>…</DropdownMenu>   {/* menu renders in here, correctly themed */}
</PortalContainerProvider>
```

Every overlay component also takes an explicit `portalContainer` prop, which
wins over the provider. Put `dark` on `<html>` when you want a page-level dark
theme and the overlays to follow without a provider.
## House rules

These come from the design-system audit and are not optional:

1. **Type is chosen as a named style, never as a size.** Use
   `<Typography textStyle="...">`: `display` · `heading36|30|24|20|16` (500) ·
   `title30|24|20|16|14|12` (600) · `body16|14|12` (400) · `label14|12|10` (500)
   · `overline`. Each carries size, weight and line-height together. Pick the
   semantic tag separately with `element` — heading level follows content
   hierarchy, not visual weight, and there is one `h1` per page.
2. **Stay on the 4px step.** Never write an arbitrary value (`p-[0.92rem]`,
   `text-[13px]`). If nothing fits, that argues for a token, not a literal.
   Note that arbitrary *breakpoint* variants (`max-[880px]:`) emit no CSS at
   all — use `max-sm` / `max-md` / `sm` / `md` / `lg` / `xl`.
3. **Every icon-only control needs an accessible name.** `IconButton` requires
   `aria-label`; name the action ("Remove file"), not the surrounding row.
4. **Button variants**: `primary` `secondary` `outline`
   `tertiary` `destructive` `destructiveOutline` `destructiveTertiary`
   `transparent` `transparentUnderline`. There is **no `ghost`** — use
   `tertiary`. Sizes `xs|sm|md|lg|xl` carry padding 8/12/12/16/20; `Button`,
   `InputGroup` and `TextArea` share that ladder, so a button and a field of the
   same size line up. Prefer `sm` and `md`.
5. **Size a dialog by what it holds**, never one width for everything:
   `<ModalContent size="sm|md|lg">` — `sm` (360px) a confirm the user only
   reads and answers, `md` (480px, the default) anything the user fills in,
   `lg` (576px) a multi-step wizard. Rename is `md`, not `sm` — the user types
   into it, so it is a form. Footer buttons are `size="sm"`, right-aligned,
   Cancel `secondary` then the confirming action (`destructive` or `primary`).
6. **Don't re-declare focus.** Controls that render a `Button` inherit the ring;
   everything else uses the exported `focusRing` recipe.
7. **Never write a bare `<img>` for a connector or product logo.** There are no
   image assets to point at, so a `src` path — `/logos/slack.svg`, a CDN URL,
   anything — renders as a broken image. Use `ConnectorLogo`, which carries its
   marks inlined and falls back to a monogram tile for a connector it does not
   have yet: `<ConnectorLogo connector="Amazon S3" size="md" />`. Names resolve
   loosely, so pass whatever the page already calls the connector. Leave `label`
   off when the name is rendered beside the mark — the logo is decorative then.

## Page shells — getting the heights right

A full-height app screen is the one layout the library cannot infer for you, and
it is where a generated page goes wrong most often. The shape:

```jsx
<SidebarProvider defaultOpen className="h-svh min-h-0 overflow-hidden">
  <Sidebar collapsible="icon">
    <SidebarHeader>…</SidebarHeader>
    <SidebarContent>…</SidebarContent>
  </Sidebar>

  <SidebarInset className="min-h-0">
    <header className="flex shrink-0 items-center gap-3 border-stroke border-b px-6 py-4">
      <SidebarTrigger variant="tertiary" />
      <Typography element="h1" textStyle="title20">Connections</Typography>
      <Button className="ms-auto" size="sm">New connection</Button>
    </header>

    {/* the ONLY scrolling region */}
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-6">
      …
    </div>
  </SidebarInset>
</SidebarProvider>
```

Three rules, in the order they are usually missed:

1. **`min-h-0` on every flex ancestor of the scroller.** A flex item defaults to
   `min-height: auto`, so it refuses to shrink below its content: without this an
   `overflow-y-auto` child grows the page instead of scrolling, and the header
   scrolls away with it.
2. **Never `h-full` inside the shell.** `SidebarProvider` carries a `min-height`,
   so its computed `height` is `auto` — and a percentage height against an `auto`
   parent computes to `auto` too. `h-full` there is not wrong-looking, it is
   inert. Use `flex-1` plus `min-h-0`.
3. **Pin the shell only when the content scrolls inside it.** The default
   `min-h-svh` on `SidebarProvider` is right for a document-style page that
   scrolls as a whole; add `h-svh min-h-0 overflow-hidden` for an app screen with
   its own scroll region. `SidebarInset` fills the shell either way.

4. **Put `SidebarTrigger` in the `SidebarInset` header, never inside `Sidebar`.**
   Below `lg` the sidebar is not in the layout at all (see next section), so a
   trigger that lives inside it disappears together with the thing it opens.

Page padding is `p-6`, section gap `gap-4`–`gap-6`, and the page title is one
`h1` at `title20`.

### The same shell below `lg`

The shell is responsive already — `Sidebar` switches branch on its own, and the
generated page does not opt in or out of it. Under `sheetBreakpoint`
(`SidebarProvider`, default `BREAKPOINTS.lg` = 1024px) `Sidebar` stops rendering
the in-flow panel and renders a `Sheet` instead:

- it slides in **over** the page from the left, `--sidebar-width-mobile` (288px)
  wide, full height, on the `overlay-scrim` backdrop, 500ms each way;
- the content underneath keeps its full width — nothing reflows, so closing the
  panel puts every row back where it was. This is the part that differs from the
  desktop behaviour, where the panel is a sibling that pushes `SidebarInset`;
- it starts **closed** on every mount (its own state, separate from the desktop
  `open`), so a narrow screen always opens on content;
- the scrim, `Esc`, or the trigger closes it; `Sheet`'s own close button is
  hidden, so do not design a second one into the panel header.

Nothing here needs a prop, a wrapper or a media query in page code — the only
thing a shell can get wrong is where the trigger sits (rule 4).
`Sidebar/MobileOverlay` is the story that shows the state. If you do write a
breakpoint yourself, use the named variants (`max-sm` `max-md` `sm` `md` `lg`
`xl`): arbitrary ones such as `max-[880px]:` emit no CSS (house rule 2).

## Tables

`Table` ships its own frame — border, radius, header band — so never wrap it in a
`Card`. Cell padding comes from `TableCell` / `TableHead` (10px/16px, identical in
both so a header lines up with its own column); never re-pad a cell.

```jsx
<Table layout="fixed">
  <TableHeader>
    <TableRow>
      <TableHead className="w-1/2">Source</TableHead>
      <TableHead className="w-32">Status</TableHead>
      <TableHead className="w-32 text-right">Rows</TableHead>
      <TableHead className="w-12"><span className="sr-only">Actions</span></TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {rows.map((r) => (
      <TableRow key={r.id} data-interactive>
        <TableCell className="font-medium">{r.name}</TableCell>
        <TableCell>{r.status}</TableCell>
        <TableCell className="text-right">{r.rows}</TableCell>
        <TableActionsCell>
          <IconButton aria-label={`Actions for ${r.name}`} size="2xs" variant="tertiary">
            <MoreHorizontal />
          </IconButton>
        </TableActionsCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

- **`layout="fixed"` plus a width on each first-row `TableHead`** for anything
  that loads, paginates or filters. The default `auto` layout re-measures every
  column from its content, so columns visibly jump between an empty state, a
  loading `colSpan` row, and each page of data. Give one column the slack
  (`w-1/2`, or no width at all) and pin the rest.
- **Row actions go in `TableActionsCell`**, never a hand-rolled `TableCell`: it is
  a fixed 48px, right-aligned, and fades its buttons in on row hover or keyboard
  focus *without* reflowing, because the width is reserved either way. Add the
  matching `<TableHead className="w-12">` with an `sr-only` label. Size row
  actions `2xs` — a 24px box around a 14px glyph, one step below the shared
  Button/IconButton ladder.
- **Clickable rows take `data-interactive`**, which is what switches the
  hover/press fills on. Selection is `className="is-selected"` or
  `data-state="selected"`; both paint `--tbl-row-pressed`, the same surface as the
  header band, in both themes.
- Numeric columns are `text-right` on **both** the head and the cell.

## Foundations are browsable

Four cards render the real token scales, generated from the tokens themselves
rather than transcribed: **Colors** (every semantic and component role, by
group), **Radius**, **Shadows** (by role) and **Spacing** (the 4px step). Open
them rather than guessing a token name.

## Where the truth lives

- `_ds/<folder>/styles.css` and its imports — the tokens and the full compiled
  utility surface. Read it before inventing a class.
- `guidelines/SPEC.md` — the authoritative reference: the three token layers,
  how to add a token, theming and its failure modes.
- `components/<Group>/<Name>/<Name>.prompt.md` and `.d.ts` — per-component API.

## A representative composition

```jsx
<Card className="flex flex-col gap-4 rounded-lg bg-surface-card p-6">
  <Typography element="h2" textStyle="title20" textColor="primary">
    Storage
  </Typography>
  <Typography element="p" textStyle="body14" textColor="secondary">
    2.4 GB of 10 GB used across all connections.
  </Typography>

  <ProgressBar value={24} />

  <div className="flex items-center justify-end gap-2 border-stroke border-t pt-4">
    <Button variant="tertiary" size="md">Manage</Button>
    <Button variant="primary" size="md">Upgrade</Button>
  </div>
</Card>
```

Library components carry the design language; the agent's own glue (`flex`,
`gap-4`, `p-6`, `border-stroke`) is written in the vocabulary above.

# DevartUI (@devart/ui-react@1.0.0)

This design system is the published @devart/ui-react React library, bundled as a single
browser global. All 51 components are the real upstream code.

## Where things are

- `_ds_bundle.js` — the whole-DS bundle at the project root; loads every component to `window.DevartUI`. First line is a `/* @ds-bundle: … */` metadata header.
- `styles.css` — the single stylesheet entry: it `@import`s the tokens, fonts, and component styles (`_ds_bundle.css`). Link this one file.
- `components/<group>/<Name>/<Name>.prompt.md` (example JSX + variants), `<Name>.d.ts` (types), `<Name>.html` (variant grid).
- `tokens/*.css` — CSS custom properties, names verbatim from upstream.
- `fonts/` — `@font-face` files + `fonts.css` (when the package ships fonts).
- `guidelines/` — the design system's own usage guidance (2 doc(s), see `guidelines/index.md`). Read these before composing larger layouts.

For a specific component, `read_file("components/<group>/<Name>/<Name>.prompt.md")`.

## Loading

Add these two lines to your page once (React must be on the page first):

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
```

Components are then available at `window.DevartUI.*`. Mount into a dedicated child node (e.g. `<div id="ds-root">`), not the host page's own React root, so the two trees don't collide:

```jsx
const { Accordion } = window.DevartUI;
ReactDOM.createRoot(document.getElementById('ds-root')).render(<Accordion />);
```

Wrap the tree in the provider — most components read theme/i18n from context:

```jsx
<TooltipProvider><PortalContainerProvider>{children}</PortalContainerProvider></TooltipProvider>
```

## Tokens

340 CSS custom properties from @devart/ui-react. Names are
preserved verbatim from upstream. They are declared inside `_ds_bundle.css` (this DS ships one compiled stylesheet rather than separate token files).

- **color** (42): `--surface-card`, `--surface-card2`, `--surface-chips`, …
- **spacing** (3): `--tw-ring-inset`, `--tw-space-x-reverse`, `--tw-space-y-reverse`
- **typography** (33): `--font-sans`, `--font-size-xxs`, `--font-size-xs`, …
- **radius** (7): `--radius-sm`, `--radius`, `--radius-md`, …
- **shadow** (18): `--shadow-thumb`, `--shadow-thumb-hover`, `--shadow-modal`, …
- **other** (237): `--modal-w-sm`, `--modal-w-md`, `--modal-w-lg`, …

## Components

### components
- `Accordion`
- `Autocomplete`
- `Avatar`
- `Badge`
- `Banner`
- `Button`
- `Card`
- `Checkbox`
- `CircularProgress` — Circular progress indicator that renders an SVG ring around optional children.
- `Collapsible` — The root container that manages the open/closed state.
- `ConnectorLogo` — The brand mark for a data-source connector, at one of four tile sizes.
- `DropdownMenu` — The root component that manages the open/closed state of the dropdown.
- `File`
- `FilterChips` — The row. value / onValueChange behave like any controlled radio group
- `IconButton`
- `Input`
- `InputGroup` — A composite container that wraps an input and associated addons (icons, text, buttons)
- `Modal`
- `PageHeader` — The title row every screen starts with: an optional back control, the page's
- `Pagination`
- `PasswordInput` — Password field using link InputGroup + addons: lock icon, input, visibility toggle.
- `Popover` — The root component that manages the open/closed state of the popover.
- `ProgressBar`
- `RadioButton`
- `ResizablePanelGroup` — Horizontal or vertical group of resizable panels.
- `ScrollShadow` — A scrollable container component that automatically displays fade-in/fade-out shadows
- `SegmentedControl`
- `Separator`
- `Sheet` — The root container for the Sheet.
- `Sidebar` — The main container for the application's sidebar.
- `SingleDatePicker` — A complete single date picker with calendar, text input, and confirm button.
- `Skeleton`
- `Spinner`
- `StatusView`
- `Stepper` — Headless stepper that renders the current step's render function,
- `StepSlider` — Slider constrained to a short list of named stops, drawn as dots on the
- `Switch`
- `Table`
- `Tabs` — Underline tabs  the active tab is marked by a brand-coloured bottom
- `TextArea`
- `Timeline`
- `ToastMessage`
- `Toggle`
- `ToggleGroup`
- `Tooltip` — The root component that manages the state and logic for an individual tooltip.
- `TruncatedTitleTooltip` — Wraps any trigger element with a tooltip that appears only when the target
- `Typography`

### foundations
- `Colors` — Every semantic and component-scoped colour token, by role. The primitive
- `Radius` — The radius scale, each step shown at its real value.
- `Shadows` — Elevation as roles rather than sizes  pick by what the surface is doing.
- `Spacing` — The 4px step. The step number is the unit: 4 is 16px.
