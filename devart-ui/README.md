# devart-ui — the prototypes rebuilt on @devart/ui-react

Every prototype in [`pages/`](../pages/) rebuilt on the real Devart UI library
([`ds-bundle/`](../ds-bundle/README.md), `window.DevartUI`, 61 components) — **every
state included**. What the library does not have is built once, as a React component, in
the **Insightis custom kit** ([`insightis-kit/`](insightis-kit/)), and composed from
DevartUI primitives wherever it can be.

No npm, no build step: pages are plain HTML with `React.createElement`, and open from
`file://`, a local server or GitHub Pages alike.

- **Kit storybook:** [`insightis-kit/storybook.html`](insightis-kit/storybook.html) — every
  custom component, every state.
- **The originals stay where they are.** `pages/*.html` on `kit-theme.css` remain the reference
  each page here is checked against; nothing in `devart-ui/` loads from `pages/`.

## Layout

```
devart-ui/
  README.md                    ← this file: rules + progress
  insightis-kit/
    core/ik-core.js|.css       ← h, cx, Icon, Logo, theme, Providers, mount, Tip, story
    <Name>/<Name>.js           ← one custom component per folder, registers IK.<Name>
    <Name>/<Name>.css          ← its styles (DS tokens only), if utilities can't express it
    <Name>/<Name>.stories.js   ← every state of it, for the storybook
    insightis-kit.css|.js      ← GENERATED index — tools/build-index.mjs
    storybook.html
  pages/                       ← mirrors pages/: approved/, concept/, concept/auth/
  tools/
    build-index.mjs            ← regenerate the kit index after adding/removing a folder
    check.mjs                  ← static check — run before every commit
```

The `pages/` tree mirrors the original one file for file, so relative links between
prototypes (`../concept/chats-landing.html`) keep working unchanged.

## A page

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Insightis · Data Sources</title>
<link rel="stylesheet" href="../../../ds-bundle/styles.css">
<link rel="stylesheet" href="../../insightis-kit/insightis-kit.css">
<script src="../../../ds-bundle/_vendor/react.js"></script>
<script src="../../../ds-bundle/_ds_bundle.js"></script>
<script src="../../insightis-kit/insightis-kit.js"></script>
</head>
<body>
<div id="root"></div>
<script>
(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  function App() {
    var plan = IK.useQueryState('plan', 'paid');
    return h(IK.Fragment, null,
      h(IK.ReviewBar, { title: 'Data Sources', status: 'approved', controls: [
        { label: 'Plan', value: plan[0], onChange: plan[1],
          options: [{ value: 'paid', label: 'Paid' }, { value: 'free', label: 'Free' }] }] }),
      /* … the screen … */);
  }
  IK.mount(App);
})();
</script>
</body>
</html>
```

(`../../` from `pages/approved/`; one more `../` from `pages/concept/auth/`.)

## Rules

1. **DevartUI first, as it ships.** If the library has the component, use it as it is: its
   variants and sizes, never a `className` that repaints it. Layout utilities on it (`w-full`,
   `ms-auto`, `flex-1`) are fine. Where a DevartUI component's OWN look differs from the kit
   (badge weight, InputGroup inset, card shadow …), DevartUI's look is accepted — decided
   2026-10-08; the list lives in `working/devart-compare/DIFFERENCES.md` § A.
1a. **Everything else is visually identical to the original** — layout, spacing, sizes, copy,
   colours, which theme it shows, and even the original's quirks (a page that overflows the
   viewport, a review sheet with no dark theme, an always-dark auth flow): the rebuilt page
   must LOOK like the original, not like what it meant (decided 2026-10-08). A review sheet
   that hard-codes colours outside the token set may reproduce them, each such line marked
   `ik-allow-raw`. Proof is `tools/compare.mjs` + `tools/measure.mjs` (below): the only
   differences left are DevartUI's own.
2. **Not in DevartUI → an Insightis kit component.** One folder in `insightis-kit/`, registered
   as `IK.<Name>`, built from DevartUI primitives (Popover, DropdownMenu, Button, Card …)
   wherever it can be, with a `<Name>.stories.js` showing **every** state and variant. Never
   a component defined inside a page — if two pages could use it, it is a kit component.
   After adding a folder: `node devart-ui/tools/build-index.mjs`.
3. **Styling vocabulary = the DevartUI one.** Tailwind utilities over semantic tokens
   (`bg-surface-card`, `text-ink-secondary`, `border-stroke`, `gap-4`, `rounded-lg`,
   `shadow-rest`) — see [`ds-bundle/README.md`](../ds-bundle/README.md). Only utilities that
   were **compiled** into `_ds_bundle.css` work (`tools/check.mjs` verifies every class). What
   utilities cannot express goes in the component's CSS file with DS tokens:
   `hsl(var(--x))` when the token is a bare HSL triplet (most colours), `var(--x)` when it is
   already a colour (`--state-hover`, `--badge-*`, anything `color-mix`) — check
   `ds-bundle/tokens/globals.css`. **No raw colours, no arbitrary values, 4px step.**
4. **Page-owned CSS is layout only**, in one `<style>` block, every class prefixed `pg-`.
   No colour, type or component appearance in a page.
5. **Every state of the original.** The ReviewBar carries the original topbar's switches
   one for one — same labels, same order, same default — and every menu, popover, modal,
   drawer, hover, empty / loading / error state and responsive layout of the original works
   here too. Read `page-changes/<page>.md` first: its locked rules apply here unchanged.
   Seeding a state from the URL (`IK.useQueryState`) keeps deep links working.
6. **Copy is verbatim** from the original — buttons Title Case, labels and dialog titles
   Sentence case, as the original already has them.
7. **Icons are copied verbatim** from the original's SVG into `IK.defineIcons({...})` in the
   file that needs them (shared ones in `ik-core.js`). Connector / product logos are
   `D.ConnectorLogo`, never an `<img>`.
8. **Tooltips** are `IK.Tip` / `D.Tooltip` — never a `title=` attribute. `IK.Providers` fixes
   the timing (300 ms on every hover, no warm-up).
9. **Overlays portal to `<body>`**, so dark theme lives on `<html>` (`IK.setTheme`) — never a
   scoped `.dark`.
10. **Locked decisions in [`CLAUDE.md`](../CLAUDE.md) still bind the custom kit**: square
    type/icon marks, the card hover recipe, plan gating (locked ≠ disabled), the 4px grid,
    "visibility class never on a component — wrap it".

## Verifying a page

1. `node devart-ui/tools/check.mjs` — clean.
2. `node devart-ui/tools/compare.mjs --only <path>` — every theme × desktop/phone × every
   original topbar state: pixel diff, missing / extra / changed text, JS errors. Report in
   `working/devart-compare/<stamp>/report.html`. Expect 0 missing, 0 extra, 0 JS errors.
3. `node devart-ui/tools/measure.mjs <specs.json>` — the same element on both pages, computed
   styles with token names; use it to prove every remaining difference is DevartUI's own.
4. `node devart-ui/tools/interact.mjs --only <path>` — **interactive states**, with real pointer
   and keyboard events: a hover sweep over every interactive element (style change + any
   tooltip / popover that appears), the Tab focus order with each stop's focus ring, and the
   scripted scenarios in `tools/scenarios/<page path>.json` (open a menu, type a password,
   tick a box … then capture both sides). Every page ships its scenarios file covering every
   overlay and typed state it has. Report in `working/devart-interact/<stamp>/report.html`.
5. In the browser: anything the scripts cannot reach (drag, timing), against the original.

## Kit → DevartUI

| Insightis kit (`kit-theme.css`) | Devart UI |
|---|---|
| `.btn` · `.iconbtn` · `.link` | `Button` · `IconButton` · `LinkButton` |
| `.badge` · `.banner` · `.alert` · `.toast` | `Badge` · `Banner` · `Alert` · `ToastMessage` / `Toaster` |
| `.card` · `.promo-card` · `.ds-card` | `Card` · `PromoCard` · `DataSourceCard` |
| `.field` / `.input` · `.igrp` · `.ta` · password | `Input` · `InputGroup` · `TextArea` · `PasswordInput` |
| `.cbx` · `.radio` · `.swt` | `Checkbox` · `RadioGroup` + `RadioButton` · `Switch` |
| `.segctrl` · `.tabs` · filter `.chip` | `SegmentedControl` · `Tabs` · `FilterChips` |
| `.menu` / `.mi` · `.pop` · `[data-tip]` | `DropdownMenu` · `Popover` · `Tooltip` |
| `.modal` · `.sheet` | `Modal` · `Sheet` |
| `.tbl` · row actions · pagination | `Table` + `TableActionsCell` · `Pagination` |
| progress · spinner · skeleton · empty state | `ProgressBar` / `CircularProgress` · `Spinner` · `Skeleton` · `StatusView` |
| accordion · collapsible · stepper · step slider | `Accordion` · `Collapsible` · `Stepper` · `StepSlider` |
| upload tray · file · metarow · counter · avatar | `UploadTray` · `File` · `MetaRow` · `Counter` · `Avatar` |
| datepicker · autocomplete · scroll fade · resizable | `SingleDatePicker` / `DateRangePicker` · `Autocomplete` · `ScrollShadow` · `ResizablePanelGroup` |
| app sidebar shell | `SidebarProvider` / `Sidebar` / `SidebarInset` (wrapped by `IK.AppShell`) |

Component APIs: no `.d.ts` ships with the bundle — read the source, it is unminified:
`grep -n "var Button = \|function Button(" ds-bundle/_ds_bundle.js`, or list exports with
`Object.keys(DevartUI)` in a page's console.

## Progress

| Page | Status | Custom kit components it brought | Notes |
|---|---|---|---|
| concept/auth/* (14) | Rebuilt | AuthLayout, AuthScreenSwitch, AuthCard, AuthStatus, AuthIllustration, AuthField, AuthResendButton, AuthGoogleButton, AuthTerms | Screen `<select>` → DropdownMenu; Card / Alert / Checkbox / PasswordInput look is DevartUI's; status titles `heading20` (18px is off the scale); opens dark until a theme has been chosen anywhere |

| concept/tokens-popover-review | Rebuilt | BalancePopover, Meter, Coin | own Light/Dark toggle → ReviewBar |
| concept/coin-review | Rebuilt | Coin (8 SVGs copied to `Coin/assets/`) | the original loads no kit-theme.css (tokens undefined); the rebuild draws its stated sizes |
| app shell (for 9 pages) | Kit ready | AppShell, AppSidebar, SidebarChats, AccountMenu, PlanFeatures, Locked, PlanLock, UpgradePopover, UpgradeModal | API in each file's header; `AppShell` is a direct child of `#root` after the ReviewBar |

| approved/data-sources_connections-landing | Rebuilt | DsPage, DsCatalog, DsLastCheck, DsConnections, DsConnectionDialogs, DsConnectionPanel | ConnectorLogo letter tiles for 47 of 76 connectors (A32) |
| approved/data-sources_files-landing | Rebuilt | DsDropZone, DsFileMark, DsFilesTable, DsFilePreview, DsFileDialogs, DsStorageMark, ChatRow, SortableList | |
| approved/user_profile-modal | Rebuilt | AcctModal, AcctSettings, AcctBalance, AcctPlans | AcctModal is an in-page panel, not `D.Modal` (the original sits over the main column only) |
| concept/balance-versions-v2-v3 | Rebuilt | (Acct* retired variants) | |

Gotcha: `D.LinkButton` forces every `svg` inside it to 16px — a logo link is a plain `<a>`.
