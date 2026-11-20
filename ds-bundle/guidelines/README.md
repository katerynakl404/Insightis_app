# @devart/ui-react

Shared component library built on Radix UI primitives, Tailwind CSS, and CVA variants.

## Where this lives

| Remote | Role |
|---|---|
| `git.devart.com/devart/components/devart.ui.react` | corporate repo — the package's home, and where a release eventually lands |
| `git.devart.com/katerynak/design-system` | design-side working copy — where design-system changes are staged before they go back upstream |

Both hold the same package. Prototypes are built against the design copy.

## Install

**There is no published tarball yet.** `publishConfig.registry` still points at a
Nexus repository DevOps has not provisioned, so `pnpm add @devart/ui-react`
resolves to nothing:

```ini
# package.json — placeholder, not a working registry
"registry": "https://dbfnexus.devart.com/repository/PENDING-DEVOPS/"
```

`scripts/verify-dist.mjs` only asserts the *host* is internal (`dbfnexus.devart.com`
or `git.devart.com`), not that the path exists — so the build passes and publishing
would still fail. The ticket is `AIINS-1537-NEXUS-SETUP.md`. Until it closes, two
paths work.

### A — linked package (React apps)

```bash
git clone https://git.devart.com/katerynak/design-system.git
cd design-system && pnpm install && pnpm build
```

`pnpm build` is not optional here: outside the monorepo the `source` export
condition never applies, so every subpath resolves into `dist/` and an unbuilt
clone imports nothing. Then, from the consuming app:

```bash
pnpm add link:../design-system
```

Continue with Peer dependencies and Importing below.

### B — prebuilt bundle (prototypes, no npm, no build step)

`ds-bundle/` is a browser-ready build of the whole library — every component as
an ES module on `window.DevartUI`, the compiled Tailwind utilities, the tokens in
both themes, the fonts, and one markdown guideline per component. A prototype
drops the folder in and writes JSX against it; there is no install and no
bundler. This is how the Insightis and LinkAI prototypes consume the
library.

Rebuilding it is one command:

```bash
pnpm bundle              # the whole chain, in order
pnpm bundle --storybook  # force the Storybook build
```

`scripts/bundle.mjs` runs the steps and decides the slow one for itself: the
component roster comes from the Storybook index, so `pnpm build-storybook` is
required whenever a component was added or removed — skip it and the new
component is silently absent from a bundle that still validates clean. The
script diffs the source directories against what the last bundle holds and
builds Storybook only when that set changed; class strings, tokens and props
reach the bundle through `pnpm build` alone.

**One run at a time, per checkout.** Every step writes the same `dist/`,
`ds-bundle/` and `.design-sync/.cache/`, so two runs side by side interleave
their output and neither reports anything wrong — the bundle that comes out is
partly each. A lock at `.design-sync/.cache/bundle.lock` makes the second run
refuse and name the first. A lock whose process is gone is taken over, not
obeyed, and the takeover also clears the `dist/_ds-entry.*` a killed run leaves
behind — without that, the next `pnpm build` fails with a page of TS2835 that
mentions neither the kill nor this script.

`ds-bundle/` is generated, git-ignored and never hand-edited; the emitting step
and the exact chain live in `.design-sync/config.json` (`buildCmd`). Conventions
a prototype must follow: `.design-sync/conventions.md`. Everything learned about
this pipeline the hard way: `.design-sync/NOTES.md`.

Reads from an internal registry are anonymous once one exists, so consumers will
need no token — the same arrangement the backend uses for `dbForgeNuget`. Only a
publish pipeline authenticates. Everything outside the `@devart` scope still
resolves from npmjs.com.

## Peer dependencies

Consumers must provide:

| Peer | Range | Notes |
|---|---|---|
| `react` | `^19` | Never nested from this package — dual React → "Invalid hook call" |
| `react-dom` | `^19` | Required by Radix primitives |
| `tailwindcss` | `^3.4` | Required by `@devart/ui-react/tailwind-preset` |
| `@types/react` | `^19` | Optional (`peerDependenciesMeta`) |

## Importing

Always use subpath imports — never barrel-import from `@devart/ui-react`:

```ts
import { Button } from '@devart/ui-react/Button';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalBody, ModalFooter } from '@devart/ui-react/Modal';
import { cn } from '@devart/ui-react/cn';
import { useIsMobile } from '@devart/ui-react/use-mobile';
```

To set up Tailwind in a consuming app:

```ts
// tailwind.config.ts
import { preset, contentGlobs } from '@devart/ui-react/tailwind-preset';

export default {
  presets: [preset],
  content: ['./src/**/*.{ts,tsx}', ...contentGlobs],
  theme: { extend: { /* app-own additions only */ } },
};
```

Tailwind v3 presets do not merge `content` — spreading `contentGlobs` (absolute globs into the package's `src` and `dist`) is mandatory, not optional, or the package's own class names never get generated.

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@import '@devart/ui-react/globals.css'; /* tokens only */
@import '@devart/ui-react/fonts.css';   /* optional: self-hosted DM Sans — skip if you ship your own font and set --font-sans */
```

`@devart/ui-react/globals.css` is pure CSS-variable declarations, with no `@tailwind` directives of its own — the consumer owns those, so Tailwind's base/reset never runs twice.

---

## Client-only package

`@devart/ui-react` is a client-only package — every component and hook it ships requires the React client runtime. Every public entry point carries the `'use client'` directive, so a consumer using React Server Components can import any of them directly from a server component without adding its own `'use client'` boundary.

- The public API is subpath-only (`@devart/ui-react/Button`, `@devart/ui-react/cn`, `@devart/ui-react/use-mobile`, …) — there is no root entry, and internal modules are not reachable; deep imports into the package's internals are not part of the supported API.
- The package contains no server components and none are planned. A `components.json` that previously claimed `"rsc": true` has been removed.

---

## Theming and overrides

Dark mode is `darkMode: ['class']`: tokens are declared for `:root` and `.dark` only, and the cascade does the rest. There is no `data-theme` attribute and no bare `prefers-color-scheme` fallback in the token file itself — a consumer that offers a "system" option must resolve it in JS and toggle the `dark` class (this is what `apps/web`'s `ThemeProvider` does).

Override any token by redefining its `--*` variable after the import. Whether a class takes a Tailwind alpha modifier (`/20`) depends on how `src/lib/constants.ts` wraps the variable:

- HSL-triplet tokens are wrapped `hsl(var(--x) / <alpha-value>)`, so `bg-brand-primary/20` works.
- `color-mix()` tokens are exposed as bare `var(...)` and accept **no** alpha modifier — wrapping one in `hsl()` would emit invalid CSS. Current bare-`var()` keys: `--btn-secondary-bg-hover`, `--btn-outline-bg-hover`, `--btn-outline-bg-press`, `--btn-outline-destructive-bg-hover`, `--btn-outline-destructive-bg-press`, `--badge-brand-bg`, `--badge-brand-border`, `--badge-brand-text`, `--badge-green-bg`, `--badge-green-border`, `--badge-green-text`, `--toast-bg-*`, `--toast-border-*`, `--segctrl-btn-hover-bg`, `--tbl-row-selected-hover`, `--icon-wrapper-bg`, `--card-border-hover`, `--card-border-press`, `--card-lift-border`, `--plan-card-featured-border`, `--dropzone-border-active`, `--dropzone-bg-active`, `--banner-grad-sub`, `--banner-grad-ic-bg`, `--banner-grad-ic-border`, `--banner-grad-ic-shadow`, `--overlay-scrim`.

Geometry and typography axes are token-driven the same way, all seeded with Tailwind's own default values so adopting them changes nothing visually: `--radius-sm` / `--radius` / `--radius-md` / `--radius-lg` / `--radius-xl`, `--sidebar-width` / `--sidebar-width-icon` / `--sidebar-width-mobile`, `--shadow-thumb` / `--shadow-thumb-hover`, `--font-sans` (redefine the variable, or override `theme.fontFamily.sans` in your own preset extension, to ship a different typeface), the type scale — `--font-size-{xxs,xs,compact,sm,base,lg,xl,2xl,3xl,4xl}`, with `--line-height-{xs,sm,base,lg,xl,2xl,3xl,4xl}` paired for every step but `xxs`/`compact` (override the `sm` step, for example, by redefining both `--font-size-sm` and `--line-height-sm` in your own `:root`) — and the weight scale, `--font-weight-{light,normal,medium,semibold,bold,extrabold,black}` (override `--font-weight-semibold` in your own `:root`, for example, to change what `font-semibold` renders).

Deliberately **not** tokenized: `spacing` (default Tailwind scale), `letterSpacing`, and z-index; `lineHeight` is tokenized only as the half Tailwind itself pairs with a font size, so the standalone `leading-*` scale is not.

Breakpoints behave unlike every other token. `--breakpoint-sm` / `--breakpoint-md` / `--breakpoint-lg` / `--breakpoint-xl` do exist and are readable from JS or `calc()`, but the preset generates them from the `BREAKPOINTS` constant (exported by `@devart/ui-react/use-mobile`) that also drives `theme.extend.screens` and `useIsMobile`/`useMaxWidth` — so redefining one in your own `:root` moves nothing, because a CSS variable cannot appear in a `@media` query. To actually change a breakpoint, set `screens` in your own Tailwind config (as `theme.extend.screens`, if you want Tailwind's default `2xl` to survive) and pass the matching pixel value through `useIsMobile(breakpoint)`, `DateRangePicker`'s `mobileBreakpoint` prop, or `SidebarProvider`'s `sheetBreakpoint` prop.

---

## Component catalog

50 directories under `src/components/`, each reachable as
`@devart/ui-react/<Name>` through the `./*` wildcard export.

| Component | Based on | Variants |
|---|---|---|
| **Accordion** | Radix Accordion | — |
| **Autocomplete** | Custom | — |
| **ActivityTray** | Custom + CVA | — *(the floating tray of async operations — uploads and the like)* |
| **AsyncList** | Custom | — *(empty / error / first-load / next-page states around a list; no data fetching)* |
| **Avatar** | Radix Avatar | `size`, `rounded` |
| **Badge** | CVA | `variant`, `size`, `rounded` |
| **Banner** | CVA | `variant`, `size` |
| **Button** | CVA + Radix Slot | `variant`, `size`, `align`, `rounded`, `fullWidth` |
| **Card** | CVA | `variant`, `layout`, `rounded`, `fullWidth` |
| **Checkbox** | Radix Checkbox + CVA | `variant`, `size`, `rounded`, `labelPosition`, `gap` |
| **ChoiceCard** | CVA + Checkbox | `indicator`, `layout` *(`ChoiceGroup`: one answer or several, as cards; columns through `className`)* |
| **CircularProgress** | Custom (SVG) | — |
| **Collapsible** | Radix Collapsible | — |
| **ConfirmationDialog** | Modal | `variant` *(a two-button confirmation, 360px)* |
| **ConnectorLogo** | CVA | `size` |
| **CtaBanner** | Banner + Button | — *(a `Banner` with one call-to-action)* |
| **Datepicker** | react-day-picker | — |
| **DialogTitleFallback** | Radix Dialog | — *(a11y helper: supplies a title when a dialog has none)* |
| **DropdownMenu** | Radix DropdownMenu | `variant` |
| **File** | CVA | `variant`, `size`, `rounded` |
| **FilterChips** | Radix ToggleGroup | — *(`items`, `value`, `onValueChange`)* |
| **Foundations** | Custom | — *(docs-only token previews: Colors, Radius, Shadows, Spacing)* |
| **GuideCard** | CVA + Typography | `width`, `side` *(the card of a tour step; placement, scrim and focus stay with `Tour`)* |
| **IconCard** | CVA | `disabled` *(icon-and-caption catalog tile; `IconCardSkeleton`)* |
| **IconButton** | CVA + Radix Slot | `variant`, `size`, `rounded` |
| **IconHint** | CVA + Radix Tooltip | `variant`, `size` *(the glyph that explains itself on hover, on focus, and on a tap where there is no hover; not a control — nothing is clickable on a desktop; `tooltip` and `label` required)* |
| **Input** | HTML | — |
| **InputGroup** | Custom | `variant`, `size`, `align` |
| **ListPageLayout** | Custom | — *(one scroll container, centred column, sticky header)* |
| **ListSelectionBar** | Custom | — *(count, select-all, actions, exit for a multi-select list)* |
| **Modal** | Radix Dialog | `size`, `align`, `flexDirection` |
| **PageHeader** | Custom | — |
| **Pagination** | Custom | — |
| **PasswordInput** | Custom | — |
| **Popover** | Radix Popover + hover mode | — |
| **PortalContainer** | Custom | — *(retargets Radix portals into a subtree — required for scoped theming)* |
| **ProgressBar** | Radix Progress + CVA | `variant`, `size`, `rounded` |
| **RadioButton** | Radix RadioGroup + CVA | `variant`, `size`, `labelPosition`, `gap` |
| **Resizable** | react-resizable-panels | — |
| **ResizableMainSideLayout** | react-resizable-panels | — *(main pane plus a side pane that collapses to nothing)* |
| **ScrollShadow** | Custom | `focusable` *(a Tab stop only while it overflows with nothing focusable inside)* |
| **SearchInput** | InputGroup | `size`, `variant` *(results dropdown is this package's extension)* |
| **Select** | Radix Select | `size` |
| **SelectableListCard** | CVA | `layout` (`card` | `row`), `checkboxAlign` |
| **SegmentedControl** | Radix Tabs + CVA | `variant`, `size`, `rounded` |
| **Separator** | Radix Separator | `variant`, `orientation` |
| **Sheet** | Radix Dialog | `side` |
| **Sidebar** | Custom + Radix Slot/Tooltip | `variant`, `size` |
| **Skeleton** | CSS | `animation`, `rounded` |
| **Spinner** | Custom | `size`, `color` |
| **StatusMark** | CVA | `variant`, `size`, `interactive` *(the state's glyph alone, always `aria-hidden`; the explaining one is `IconHint`)* |
| **StatusView** | CVA | `ladder`, `size`, `surface`, `tone`, `circles`; per part `iconSize`, `titleSize`, `contentWidth` |
| **StepProgress** | CVA + Radix Tooltip | `labelPosition`, `size` *(`size` is this package's)* |
| **StepSlider** | Radix Slider | `size` |
| **Stepper** | Custom | — |
| **Switch** | Radix Switch | `variant`, `size`, `rounded`, `labelPosition`, `gap` |
| **Table** | HTML | `layout` (`auto` \| `fixed`) |
| **Tabs** | Radix Tabs | `size` |
| **TextArea** | HTML + CVA | `variant`, `size`, `rounded` |
| **Timeline** | Radix Collapsible | `status` |
| **Toast** | Sonner | — |
| **Toggle** | Radix Toggle | `variant`, `size`, `rounded` |
| **ToggleGroup** | Radix ToggleGroup | — |
| **Tooltip** | Radix Tooltip | — |
| **TruncatedTitleTooltip** | Radix Tooltip | — *(shows the tooltip only when the text is actually clipped)* |
| **Typography** | HTML | `variant`, `scale`, `textStyle`, `weight`, `leading`, `textColor`, `align`, `noWrap`, `underline`, `lineThrough`, `overline` |

`Toggle` and `ToggleGroup` both export `toggleVariants`. In the `ds-bundle`
entry the collision is resolved by renaming ToggleGroup's to
`toggleGroupVariants`; under npm the two subpaths never meet, so neither is
renamed.

**FilterChips narrows the *data*; `SegmentedControl` switches the *view*** — they
look alike and are not interchangeable. FilterChips is controlled: toggling the
active chip off reports `''`, and a strip that must keep one chip active ignores
that value rather than storing it.

Per-component usage notes — anatomy, the states a page must wire up, and the
patterns that go wrong — live next to the component as `<Name>.md` and ship into
`ds-bundle/guidelines/`. **21 of the 63 carry one today** (ActivityTray, Badge,
Button, Card, Checkbox, DropdownMenu, FilterChips, IconButton, InputGroup,
MetaRow, Modal, PageHeader, Pagination, SegmentedControl, Sidebar, StatusView,
Switch, Table, Tabs, ToggleGroup, Typography, plus the four Foundations pages). The rest are undocumented — and an undocumented
component is the one an agent assembles wrong, because it has no pattern to copy.

---

## Button variants

Button is the best reference for how CVA components work in this package:

```tsx
// Variants
<Button variant="primary">Save</Button>       // default
<Button variant="secondary">Cancel</Button>
<Button variant="outline">Edit</Button>
<Button variant="destructive">Delete</Button>
<Button variant="transparent">Learn more</Button>

// Sizes: xs | sm | md (default) | lg | xl
<Button size="sm">Small</Button>

// Slots for icons
<Button leftSlot={<PlusIcon />}>Add item</Button>
<Button rightSlot={<ChevronRightIcon />}>Next</Button>

// Full width
<Button fullWidth>Submit</Button>

// Render as a different element
<Button asChild><a href="/settings">Settings</a></Button>
```

All CVA components accept `className` which is merged via `cn()` and appended after variant classes.

---

## Radix composition pattern

Radix-based components are exported as composable named parts. Example with Modal:

```tsx
import {
  Modal, ModalContent, ModalHeader, ModalTitle,
  ModalBody, ModalFooter, ModalTrigger, ModalClose
} from '@devart/ui-react/Modal';

<Modal open={isOpen} onOpenChange={setIsOpen}>
  <ModalTrigger asChild>
    <Button>Open</Button>
  </ModalTrigger>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Title</ModalTitle>
    </ModalHeader>
    <ModalBody>Content here</ModalBody>
    <ModalFooter>
      <ModalClose asChild><Button variant="secondary">Close</Button></ModalClose>
    </ModalFooter>
  </ModalContent>
</Modal>
```

The same compositional pattern applies to `Popover`, `DropdownMenu`, `Tabs`, `Tooltip`, and `Sheet`.

### Popover that opens on hover

`Tooltip` cannot hold a button and Radix `HoverCard` ignores tap and keyboard, so `Popover` has an opt-in hover mode for interactive hints such as an upgrade prompt:

```tsx
<Popover openOnHover closeOnViewportChange>
  <PopoverTrigger asChild>
    <Button variant="secondary">Connect source</Button>
  </PopoverTrigger>
  <PopoverContent side="right" fallbackSides={['left', 'bottom']} align="start" aria-label="Pro feature">
    …
    <Button size="sm" fullWidth>Upgrade to unlock</Button>
  </PopoverContent>
</Popover>
```

- `openOnHover` — a mouse hover opens after `delay` (300 ms) and closes `closeDelay` (160 ms) after the pointer leaves the trigger or the content, so it can travel between them. Pen and touch never hover; a tap opens by press. A click on a hover-opened popover pins it open (that click is cancelled, so a link trigger does not navigate on it); the next click closes it. A press-opened or pinned popover ignores the pointer leaving. Esc and an outside press close it as usual.
- Focus follows how it opened: hover and mouse clicks leave focus where it is, Enter / Space moves it to the first control inside, and closing returns it to the trigger only if the content held it.
- `fallbackSides` on `PopoverContent` — sides to try in order when `side` does not fit, measured once per open from the trigger and the content's own size. Radix alone only flips to the opposite side, so without it `right` can never become `bottom` on a narrow screen.
- `closeOnViewportChange` — a window scroll (outside the content) or resize closes it.
- As a `DropdownMenu` item: wrap the item in `PopoverTrigger asChild` and give it `onSelect={(e) => e.preventDefault()}` so the pin click does not close the menu. The menu stays open while the popover is used, and Esc closes only the popover.
- `modal` is ignored in hover mode: a modal popover blocks pointer events outside itself, so the trigger could never be hovered again.

---

---

## cn() and cva() — mandatory conventions

### cn()

`cn()` is the **only** way to construct class strings in this package. Never concatenate strings or use template literals for Tailwind classes.

```ts
import { cn } from '@devart/ui-react/cn';

// correct
cn('px-2 py-1', isActive && 'bg-primary', className)

// wrong — cn() resolves conflicts between Tailwind utilities; raw concatenation does not
`px-2 py-1 ${isActive ? 'bg-primary' : ''} ${className}`
```

### cva()

Any component with visual variants **must** define them with `cva()`. Do not branch on variant props with conditionals or string maps — CVA is the single source of truth for variant classes and enables typed `VariantProps`.

```ts
// correct
const badgeVariants = cva('inline-flex items-center', {
  variants: {
    variant: {
      primary: 'bg-primary text-white',
      secondary: 'bg-chip text-content-body',
    },
    size: { sm: 'h-5 text-xs', md: 'h-6 text-sm' },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
});

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  className?: string;
}

// wrong — ad-hoc branching instead of cva
const cls = variant === 'primary' ? 'bg-primary text-white' : 'bg-chip text-content-body';
```

Always export the variants object (e.g. `badgeVariants`) alongside the component so consumers can reuse the classes without rendering the component.

---

## Color tokens

**Never use arbitrary color values** — no hex (`#1a2b3c`), no raw hsl (`hsl(192 89% 21%)`), no Tailwind arbitrary syntax (`bg-[#1a2b3c]`). Every color must come from a token.

Most tokens support the Tailwind alpha modifier (`/value`); `color-mix()`-backed ones do not — see Theming and overrides above.

```ts
// correct — token with opacity
'bg-brand-primary/20'
'text-ink-secondary/60'
'border-fb-red/30'

// wrong — arbitrary values
'bg-[#0a3d52]'
'text-[hsl(179,94%,26%)]'
```

Design System v2 is the only token system (the pre-redesign palette has been deleted). A compact sample by group — the full surface is `THEME_COLORS` in `src/lib/constants.ts`:

| Group | Example classes |
|---|---|
| `brand` | `bg-brand-primary`, `text-brand-secondary` |
| `ink` | `text-ink-primary`, `text-ink-body`, `text-ink-secondary` |
| `surface` | `bg-surface-page`, `bg-surface-card`, `bg-surface-card2` |
| `stroke` | `border-stroke`, `border-stroke-hover` |
| `state` | `bg-state-hover`, `bg-state-pressed`, `bg-state-disabled` |
| `fb` (feedback) | `text-fb-red`, `bg-fb-green/10`, `text-fb-attention` |
| `table` / `tbl` | `bg-table-row-hover`, `bg-tbl-row-pressed` |
| `badge` | `bg-badge-primary-bg`, `text-badge-secondary-text` |
| `btn` | `bg-btn-primary-bg`, `bg-btn-primary-bg-hover` |
| `toast` | `bg-toast-bg-success`, `border-toast-border-error` (no alpha) |
| `dropzone` | `border-dropzone-border`, `bg-dropzone-bg-active` (no alpha) |

Both light and dark values are defined for theme-dependent tokens — theming is automatic. To add a new color token: define it in `globals.css` for `:root` (and `.dark` if it is theme-dependent), then expose it in `src/lib/constants.ts`'s `THEME_COLORS`. For a non-color axis (radius, shadow, duration, …) expose it in `tailwind-preset.ts` instead.

---

## Adding a new component

1. Create `src/components/<Name>/index.tsx`
2. Define variants with `cva()` if the component has visual variants; export the variants object alongside the component
3. Use only token-based color classes — no arbitrary values; add new tokens to `globals.css` + `src/lib/constants.ts` (or `tailwind-preset.ts` for non-color axes) if needed
4. Construct all class strings with `cn()`
5. Use a Radix primitive for any interactive behavior (focus, keyboard, a11y)
6. Support `className` prop merged via `cn(variants(...), className)`
7. Export the component and any variant types from `index.tsx` — the wildcard export in `package.json` handles the rest
8. Title the story by what the component is — the developers' rule, kept as is. Use `Components/<Name>` for a primitive that UIs are built from, including its own parts and groups (`Modal`, `InputGroup`, `ToggleGroup`). Use `Compositions/<Name>` for a ready-made block that assembles other kit controls and is used as is (`Pagination`, `PasswordInput`, `Sidebar`). `Typography`, `Spinner`, `Tooltip`, `Separator`, `Skeleton` and `ScrollShadow` are helpers, so depending on them does not make a component a composition. This package's own sections, `Proposed changes` and `Foundations`, sit above the two
