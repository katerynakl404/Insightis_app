# devart-ui — the prototypes rebuilt on @devart/ui-react

Every prototype in [`legacy-html/pages/`](../legacy-html/pages/) rebuilt on the real Devart UI library
([`ds-bundle/`](../ds-bundle/README.md), `window.DevartUI`, 61 components) — **every
state included**. What the library does not have is built once, as a React component, in
the **Insightis custom kit** ([`insightis-kit/`](insightis-kit/)), and composed from
DevartUI primitives wherever it can be.

No npm, no build step: pages are plain HTML with `React.createElement`, and open from
`file://`, a local server or GitHub Pages alike.

- **The review chrome is not the kit.** What exists only so a reviewer can flip a page's states
  (the ReviewBar, the auth flow's top nav, URL-seeded review states) is the **review kit**
  ([`review-kit/`](review-kit/), `window.ReviewKit`, `RK`). It composes the custom kit; the
  custom kit never refers to it (`tools/check.mjs` enforces this).
- **Kit storybook:** [`insightis-kit/storybook.html`](insightis-kit/storybook.html) — the
  storybook of THIS layer only (DevartUI's own components live in the Storybook of дизайн DevartUI), in two
  sections: **Components** — used by more than one page — and **Page elements** — found on one
  page only, grouped by that page with a link to it (`GROUPS` in the storybook; once a second
  page uses one, move it up). One kit, one folder: the split is the storybook's, not the disk's.
  One component per view (`#/<Name>`), its stories at
  Desktop or Phone (375px iframes, so media queries see a real phone), a Docs tab with the
  header comment of `<Name>/<Name>.js`, and what it is built from — the DevartUI components
  its code calls and the kit components it composes. The review kit has its own view:
  `storybook.html?kit=review`. Docs and "built from" are read over http (not on `file://`).
  A new folder lands under "Other" until it is added to `GROUPS` in the storybook.
- **The originals are archived, not gone.** The HTML/CSS pages on `kit-theme.css` moved with the
  rest of the previous approach into [`legacy-html/`](../legacy-html/README.md) on 2026-10-16 —
  frozen, and still the reference each page here is checked against
  (`legacy-html/pages/<page>.html`); nothing in `devart-ui/` loads from them.

## Layout

```
devart-ui/
  README.md                    ← this file: rules + progress
  insightis-kit/               ← the product: window.InsightisKit (IK)
    core/ik-core.js|.css       ← h, cx, Icon, Logo, theme + plan stores, Providers, mount, Tip, story
    <Name>/<Name>.js           ← one custom component per folder, registers IK.<Name>
    <Name>/<Name>.css          ← its styles (DS tokens only), if utilities can't express it
    <Name>/<Name>.stories.js   ← every state of it, for the storybook
    insightis-kit.css|.js      ← GENERATED index — tools/build-index.mjs
    storybook.html             ← the kit's storybook; ?kit=review → the review kit's
  review-kit/                  ← review chrome, NOT product: window.ReviewKit (RK)
    core/rk-core.js            ← RK.useQueryState (URL-seeded review states), RK.story
    ReviewBar/                 ← the sticky strip above every page: title, status, state switches
    AuthReviewNav/             ← the auth flow's top nav (stands in for the ReviewBar there)
    AuthScreenSwitch/          ← its "Screen" jump menu
    review-kit.css|.js         ← GENERATED index — tools/build-index.mjs
  pages/                       ← mirrors legacy-html/pages/: approved/, concept/, concept/auth/;
                                 <page>.rules.md beside a page = its rules locked since the move
  ds-bridge/                   ← TEMPORARY, only while it is needed (now: one CSS fix of Spotlight — the JS ones
                                 were retired 2026-10-19 with the bundle rebuilt from дизайн DevartUI):
                                 components or fixes of дизайн DevartUI the vendored ds-bundle/ lacks,
                                 as JS ports of the same API, loaded first by insightis-kit.js; delete
                                 the folder + re-run build-index.mjs once a rebuilt bundle ships them
  tools/
    build-index.mjs            ← regenerate BOTH kit indexes after adding/removing a folder
    check.mjs                  ← static check — run before every commit
```

The `pages/` tree mirrors the original one (`legacy-html/pages/`) file for file, so relative links between
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
<link rel="stylesheet" href="../../review-kit/review-kit.css">
<script src="../../../ds-bundle/_vendor/react.js"></script>
<script src="../../../ds-bundle/_ds_bundle.js"></script>
<script src="../../insightis-kit/insightis-kit.js"></script>
<script src="../../review-kit/review-kit.js"></script>
</head>
<body>
<div id="root"></div>
<script>
(function () {
  var IK = window.InsightisKit, RK = window.ReviewKit, D = window.DevartUI, R = window.React, h = IK.h;
  function App() {
    var plan = RK.useQueryState('plan', 'paid');
    return h(IK.Fragment, null,
      h(RK.ReviewBar, { title: 'Data Sources', status: 'approved', controls: [
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

(`../../` from `pages/approved/`; one more `../` from `pages/concept/auth/`.) The review kit
loads after the custom kit, never before. An auth page has no ReviewBar: it renders
`RK.AuthReviewNav` then `IK.AuthLayout`, side by side in a Fragment.

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
1b. **What DevartUI ships, the kit does not copy** (decided 2026-10-19). Where the kit had its
   own version of something дизайн DevartUI now has — the list-page layout, the code block, the
   list row with its ⋮ / pin / rename, the sidebar parts — the kit uses DevartUI's and takes its
   behaviour whole, even where that departs from the original (list pages scroll in their column,
   their title row sticks below `lg`). What is missing is added to дизайн DevartUI, one capability
   at a time. The departures are listed in `DIFFERENCES.md` § A (A78–A86).
2. **Not in DevartUI → an Insightis kit component.** One folder in `insightis-kit/`, registered
   as `IK.<Name>`, built from DevartUI primitives (Popover, DropdownMenu, Button, Card …)
   wherever it can be, with a `<Name>.stories.js` showing **every** state and variant. Never
   a component defined inside a page — if two pages could use it, it is a kit component.
   After adding a folder: `node devart-ui/tools/build-index.mjs`.
2a. **Product or review chrome?** Would it exist in the shipped product? Yes → `insightis-kit/`
   (`IK.<Name>`). No — it is only there so a reviewer can see a state (a state switch, a
   screen jump menu, a "Concept" scaffold header, a deep-link helper) → `review-kit/`
   (`RK.<Name>`, stories via `RK.story`). Review chrome may use the custom kit; nothing in
   `insightis-kit/` may use `RK` (`tools/check.mjs` fails on it). App state that a product
   component reads stays in the custom kit even when the ReviewBar is what flips it (the
   theme and plan stores).
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
   here too. Read the page's rules first: `legacy-html/page-changes/<page>.md` (locked before
   2026-10-16, still binding) and `pages/<path>.rules.md` beside the page (locked since).
   Seeding a state from the URL (`RK.useQueryState`) keeps deep links working.
6. **Copy is verbatim** from the original — buttons Title Case, labels and dialog titles
   Sentence case, as the original already has them.
7. **Icons are copied verbatim** from the original's SVG into `IK.defineIcons({...})` in the
   file that needs them (shared ones in `ik-core.js`). Connector / product logos are
   `IK.ConnectorMark` (same props as `D.ConnectorLogo`) — never `D.ConnectorLogo` directly,
   never a hand-written `<img>`: it uses DevartUI's mark where the library has one and the
   original prototype's logo otherwise (decided 2026-10-08).
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
| `.card` · `.promo-card` · `.ds-card` | `Card` · `PromoCard` · `IconCard` |
| `.field` / `.input` · `.igrp` · `.ta` · password | `Input` · `InputGroup` · `TextArea` · `PasswordInput` |
| `.cbx` · `.radio` · `.swt` | `Checkbox` · `RadioGroup` + `RadioButton` · `Switch` |
| `.segctrl` · `.tabs` · filter `.chip` | `SegmentedControl` · `Tabs` · `FilterChips` |
| `.menu` / `.mi` · `.pop` · `[data-tip]` | `DropdownMenu` · `Popover` · `Tooltip` |
| `.modal` · `.sheet` | `Modal` · `Sheet` |
| `.tbl` · row actions · pagination | `Table` + `TableActionsCell` · `Pagination` |
| progress · spinner · skeleton · empty state | `ProgressBar` / `CircularProgress` · `Spinner` · `Skeleton` · `StatusView` |
| accordion · collapsible · stepper · step slider | `Accordion` · `Collapsible` · `Stepper` · `StepSlider` |
| upload tray · file · metarow · counter · avatar | `ActivityTray` · `File` · `MetaRow` · `Counter` · `Avatar` |
| datepicker · autocomplete · scroll fade · resizable | `SingleDatePicker` / `DateRangePicker` · `Autocomplete` · `ScrollShadow` · `ResizablePanelGroup` |
| app sidebar shell | `SidebarProvider` / `Sidebar` / `SidebarInset` (wrapped by `IK.AppShell`) |
| page title row `.cl-page` + `.cl-page-head` | `ListPageLayout` + `PageHeader` (wrapped by `IK.ListPage`) |
| code run `.cp-code` · tool-call arguments / output | `CodeBlock` (`header`, `lineNumbers`, `maxHeight`, `wrap`, `variant="error"`) + `codeSyntaxVariants` |
| chat row `.chat-row` · its ⋮ · pin · inline rename | `SelectableListCard` `layout="row"` · `RowMenuButton` · `PinToggle` · `InlineRename` |
| sidebar nav row · Pinned / Recent · chat row · user row · balance row · burger | `SidebarNavItem` · `SidebarSection` · `SidebarChatItem` · `SidebarUser` · `SidebarStat` · `SidebarMobileTrigger` |
| account menu: Resources ↗ · theme row | `DropdownMenuItem` `isExternal` · `DropdownMenuSegmentedItem` |

Component APIs: no `.d.ts` ships with the bundle — read the source, it is unminified:
`grep -n "var Button = \|function Button(" ds-bundle/_ds_bundle.js`, or list exports with
`for (const k in DevartUI) console.log(k)` in a page's console (`Object.keys` misses them while
`ds-bridge` overlays a fixed component — then only the fixed ones are own keys).

## Progress

| Page | Status | Custom kit components it brought | Notes |
|---|---|---|---|
| concept/auth/* (14) | Rebuilt · verified | AuthLayout, AuthCard, AuthStatus, AuthIllustration, AuthField, AuthResendButton, AuthGoogleButton, AuthTerms (+ review kit: AuthReviewNav, AuthScreenSwitch) | always dark and 804/856px tall like the original; Screen `<select>` → DropdownMenu (A10); 0.2–4% pixel diff, all group A |

| concept/tokens-popover-review | Rebuilt · verified | BalancePopover, Meter, Coin | keeps the original's own Light/Dark button (no ReviewBar), opens light, not stored |
| concept/coin-review | Rebuilt · verified | Coin (8 SVGs in `Coin/assets/`) | reproduces the original as it renders (no kit-theme.css): 0% pixel diff |
| app shell (for 9 pages) | Kit ready | AppShell, AppSidebar, SidebarChats, AccountMenu, PlanFeatures, Locked, PlanLock, UpgradePopover, UpgradeModal, ConnectorMark | API in each file's header; `AppShell` is a direct child of `#root` after the ReviewBar; `IK.chatsWith()` for per-page chat lists |

| approved/data-sources_connections-landing | Rebuilt · verified | ListPage (shared), ConnectDialog (shared), DsCatalog, DsLastCheck, DsConnections, DsConnectionDialogs, DsConnectionPanel | logos via ConnectorMark (original logos where DevartUI has none) |
| approved/data-sources_files-landing | Rebuilt · verified | DsDropZone, DsFileMark, DsFilesTable, DsFilePreview, DsFileDialogs, DsStorageMark, ChatRow, SortableList | |
| approved/user_profile-modal | Rebuilt · verified | AcctModal, AcctSettings, AcctBalance, AcctPlans | AcctModal is an in-page panel, not `D.Modal` (the original sits over the main column only); the three plan dialogs are SHOWN (the original hides them by a bug) |
| concept/balance-versions-v2-v3 | Rebuilt · verified | (Acct* retired variants) | |
| approved/chat-landing | Rebuilt · verified | Composer, ChatPrompt, ChatHero | |
| approved/chat_page-landing | Rebuilt · verified | ChatHeader, ChatThread, ChatToolCalls | `AppShell classic` (older sidebar copy) |
| approved/metrics-landing | Rebuilt · verified | MxProviderCard, MxMetricsTable, MxMetricSheet, MxMetricDialog (+ shared ListPage, ConnectDialog) · MxMetricList, FavoriteToggle (concept) | review switch List: Table · Rows — Rows is a concept (Card rows + Favorites), browser-checked only; rules: `pages/approved/metrics-landing.rules.md` |
| concept/chats-landing | Rebuilt · verified | ChatLibrary (+ ChatRow extended) | the original's row-menu items ignore a mouse click (a bug) — they work here |
| concept/chat_page-charts-landing | Rebuilt · verified | AskUserPanel, ChatChart, ChatFilePreview, ChatCodeRun (in ChatToolCalls) | review switches: Popover state, AskUserPanel; `?pop=` / `?ask=` deep links |
| concept/onboarding | Built · browser-checked (no legacy original) | OnbSetup, OnbSourcePicker, OnbTour, Onboarding (store + data) · design DevartUI (§117–§123, committed and published 2026-10-19; in the vendored bundle): StepProgress, ChoiceGroup/ChoiceCard, Spotlight, Coachmark, AnnotationGroup/Annotation, Tour, CardFooter `sticky` | steps 1–3 here; steps 4–5 overlay approved/metrics-landing + chat-landing (`?onb=`); AskUserPanel now on D.StepProgress + D.ChoiceCard; rules: `pages/concept/onboarding.rules.md` |
| concept/chat_page-queue | Rebuilt · verified | QueueBand, QueueItem, ThinkingIndicator | the 16-state picker + Reset in the ReviewBar; `?state=` deep link; drag reorder checked by hand (the scripts cannot drag) |
| approved/workspaces + workspace-emails | Built · browser-checked (no legacy original) | Workspaces (store, WsNotice, WsSharedBy, WsSearch), WsList, WsOverview, WsMembers, WsConnections, WsMetrics, WsFiles, WsDialogs, PickRow, WsEmail (+ DsConnections / DsConnectionPanel / DsFilesTable / DsFileMark / MxMetricsTable / MxMetricDialog / DsConnectionDialogs / Composer / ChatHero / AcctSettings / AppSidebar / ListPage / PlanFeatures extended) | shared workspaces, phase 1; overlays approved Data Sources, Files, Metrics, Chat, Account behind `?ws=1` (off = as approved); rules: `pages/approved/workspace.rules.md` |

"Verified" = `compare.mjs` + `interact.mjs` (every theme, viewport, review state and scenario):
0 product text missing or extra, 0 JS errors, every remaining difference DevartUI's own (group A
in `working/devart-compare/DIFFERENCES.md`) or review chrome. Last full pass: 2026-10-15.

Gotcha: `D.LinkButton` forces every `svg` inside it to 16px — a logo link is a plain `<a>`.
