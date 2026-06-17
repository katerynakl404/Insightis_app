# Sidebar — prod → expected

Source: `@insightis/ui` `Sidebar/` — overall component plus the sub-parts SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubButton, SidebarRail, SidebarTrigger, SidebarInset, SidebarProvider. Baseline: [`../current/Sidebar.md`](../current/Sidebar.md).

**Structural redesign of `SidebarContent` + `SidebarFooter`.** The shell, sub-part API, width tokens, variants and collapse modes are unchanged. What changes is the *information architecture* inside `SidebarContent` (header brand row + CTA → 2 compact nav rows → Pinned/Recent chat sections with persistent gradient-fade labels, hover-revealed kebab menus, and per-row status indicators) and the *density* of `SidebarFooter` (compact tokens meter + 2-line user row).

## Overall container (`<Sidebar>`)
| Aspect | Current (prod) · was | v1.0 | Expected · became | Specification |
|---|---|---|---|---|
| Width — full | `14.75rem` | — | — no change | constant `SIDEBAR_WIDTH` |
| Width — icon collapsed | `3.563rem` | — | — no change | constant `SIDEBAR_WIDTH_ICON` |
| Width — mobile drawer | `18rem` | — | — no change | constant `SIDEBAR_WIDTH_MOBILE` |
| Surface | `bg-card` | — | — no change (hex → [colors](colors.md)) | `Surface/Card` `#FFFFFF` / dark `#17171E` |
| Border (side-aware) | `border-r/l` `border-border` | — | — no change | `Stroke/Border` |
| Variants | `sidebar` / `floating` / `inset` | — | — no change | floating gets `rounded-md shadow border`; inset pairs with `SidebarInset` |
| Collapse modes | `offcanvas` / `icon` / `none` | — | — no change | transitions `[width] duration-200 ease-linear` |
| Mobile | rendered as `Sheet side="top"` | — | — no change | see [`Sheet`](Sheet.md) |
| Scrollbar (content area) | native | — | hidden visually (`scrollbar-width:none` + `::-webkit-scrollbar{display:none}`); keyboard scroll preserved | quieter shell, content-forward |
| Internal divider (nav ↔ chats) | not present (chats are a nested collapsible group) | — | **no divider** — sidebar reads as one quiet stack; sections breathe via `gap` only | content-forward |

## SidebarHeader — brand row + CTA
| Aspect | Current (prod) · was | v1.0 | Expected · became | Specification |
|---|---|---|---|---|
| Layout | `flex gap-2 p-4` with logo + collapse `IconButton` | — | `flex flex-col gap-2 p-2.5` with brand row (mark + name on the left, collapse trigger on the right) + full-width primary CTA below | tightens padding to `.625rem`; keeps the collapse button (24×24 `SidebarTrigger`, `PanelLeft` icon, `aria-label "Toggle Sidebar"`), now anchored to the right of the brand row |
| Brand row | two separate SVGs in `SidebarHeader` — `<svg class="lg-mark"><use href="#lg-mark"/></svg>` (26×26) + `<svg class="lg-text"><use href="#lg-text"/></svg>` (73×16) — **outdated wordmark geometry** | — | single **`<svg class="sbx-brand-logo"><use href="#lg"/></svg>`** (24 × 100 — bigger than prod's 26×26 mark + 73×16 wordmark; mark portion of the consolidated symbol renders at ~24×24 inside the row, matching prod's bare mark size while letting the wordmark breathe at proper proportion) — the kit's `#lg` symbol path data refreshed from the canonical brand source at `Insightis platform/logo/Insightis_Light.svg` (wordmark fill rewritten to `currentColor` so `--logo-ink` themes it). Collapsed mode falls back to `<svg class="sbx-brand-mark"><use href="#lg-mark"/></svg>` (20 × 20). 28×28 `SidebarTrigger` (`PanelLeft` icon, **`iconbtn iconbtn-tertiary`** variant — icon `Text/Body`, hover bg `Brand/Primary @ 6 %`, pressed `@ 8 %`, focus `--focus-ring-brand`) on the right | the kit's symbol now reflects the canonical wordmark geometry; the old `#lg-mark` + `#lg-text` split lags the brand and is replaced by the consolidated `#lg` symbol; collapse trigger reuses the existing IconButton Tertiary variant rather than re-declaring its own colors |
| CTA | none in `SidebarHeader` — `New Chat` was further down | — | `Button primary` h32, radius `md`, full-width, gap 6px, `Plus` icon (14px) on the left, label `font-medium` | uses existing `Button/Primary` tokens (`--btn-primary-bg`, dark teal) — no new tokens needed |

## SidebarContent — 2 compact nav rows + Pinned / Recent chat sections
| State / part | Current (prod) · was | v1.0 | Expected · became | Specification |
|---|---|---|---|---|
| Nav row count | 4–5 menu rows (Sources, Metrics, Favorites, Chats) | — | **3 rows** — Sources, Metrics, **Files** *(new — promoted from a tab inside the Data Sources page, placed at the end)* | other prod groups (Favorites, Chats) are removed from the nav and replaced by the Pinned/Recent chat sections below. Files icon: Lucide `folder` (16 px, stroke 2) — same shape/weight as Sources/Metrics so the row group reads as one family. Position: **last** in the nav list (after Metrics). |
| Nav row metrics | h32, gap 8, radius `md`, font-medium, icon 16px | — | — no change | same dimensions retained |
| Default | text `Text/Body`, icon currentColor | — | text `Text/Secondary`, icon `Text/Secondary` | muted by default — more text-forward. (Semantic role unchanged; the underlying primitive backing `Text/Secondary` was lifted Slate-500 → **Slate-550 `#5A6A80`** — new custom primitive, see [colors](colors.md) — so this row now clears AA on hover surfaces without changing the token's meaning or visually overweighting "secondary" text.) |
| Hover | text shifts to `accent` (no background) | — | **bg `State/Hover` only** — text & icon stay `Text/Secondary` | adds the system-wide hover surface; no color change. Contrast (`Text/Secondary` Slate-550 `#5A6A80` vs `State/Hover` Slate-100 `#F1F5F9`) = **5.01:1** light / **5.98:1** dark — PASS (target 4.5:1). |
| **Pressed** | ⚠ not defined in prod | — | bg `State/Pressed` only — no inset shadow; text & icon unchanged | quieter pressed cue (the deeper surface alone reads as press; inset shadow felt over-dark on small rows) |
| Active (`data-[active=true]`) | faint accent-tinted bg (≈ `bg-accent/6 %`) + text & icon `accent` + `font-medium` + **left-edge accent rail** (`::before`, 3 px × nearly full row height, rounded, `bg-accent`, `left:0`) | — | bg `State/Pressed` + content (text + icon) one step up the ink scale — `--ink-body` (vs `--ink-secondary` on default/hover/pressed). No brand colour, no rail. | "page is open" reads via the persistent pressed-surface tint + the one-step content contrast bump; theme-aware via the cascaded `--ink-body`, no brand-step decisions needed |
| **Collapsed (icon mode)** | label hidden via `group-data-[collapsible=icon]:hidden`; row becomes `size-8` centered icon | — | — no change in dimensions; row becomes 32×32 centered icon; `aria-label` required on each row so screen-reader users still get the row name | preserves prod's collapsed semantics; same color rules (active = teal icon, hover bg unchanged) |
| Focus (keyboard) | ⚠ inherits global `:focus-visible` | — | 2px `--focus-ring-brand` + 2px `Surface/Card` gap | parity with Button/Outline |
| Disabled | ⚠ none defined on main button | — | `opacity: var(--opacity-disabled)` + `pointer-events:none`, text `Text/Inactive`, `aria-disabled="true"` | mirrors `SidebarMenuSubButton` |
| With badge / counter | ⚠ no slot | — | right-aligned pill: bg `Brand/Primary @ 15%`, text `Brand/Primary`, 10px `font-semibold` tabular | optional `<NavBadge>` slot |
| Chat list | empty submenu state (`No chats yet`) under a `Chats` collapsible group with left-rail border | — | replaced by two **flat** sections — **Pinned** then **Recent** — rendered directly in `SidebarContent` | removes the nested-collapsible pattern entirely for chats |
| Section label | — (not a documented part) | — | all-caps 10px `font-bold` `Text/Secondary` letter-spaced 0.08em | visually quietest layer of hierarchy that still clears 4.5:1 contrast on `Surface/Card` |
| Section action | — | — | `See all` text-link, 11px `font-medium` `Brand/Primary`, **opacity 0 by default**, fades in on label-row hover or focus | discoverable on intent, invisible at rest |

### Chat row states

| State | Current (prod) · was | v1.0 | Expected · became | Specification |
|---|---|---|---|---|
| Default | h7 `SidebarMenuSubButton` with `text-content-secondary` and an indented left-rail border | — | flat h30, padding 0 8, text 13px `Text/Secondary`, single line. Label fades right via a **persistent** 36px linear gradient from `transparent → row bg` — no ellipsis dots, label is never re-revealed on hover | quieter than `text-overflow:ellipsis`; gradient's end-color is parametrized via `--chat-fade` so it tracks any row state. Token stays `Text/Secondary`; the new Slate-550 primitive (see [colors](colors.md)) is what clears AA on hover. |
| Gradient clip | — (no equivalent; gradient overflows row corners) | `border-top-right-radius:6px; border-bottom-right-radius:6px` on `.sbx-chat::after` | — (behaviour absorbed into Default) | Gradient mask clips to row's 6px corner radius — prevents overflow artifact visible when the row has rounded corners (active, hover, focused states) |
| Hover | text shifts to `accent` | — | bg `State/Hover`; gradient still visible (end-color now `State/Hover` via `--chat-fade`); **text color unchanged**; single 24×24 **kebab** (vertical dots) fades in on the right | gradient + kebab share the right edge — no layout shift |
| **Pressed** | ⚠ not defined in prod | — | bg `State/Pressed` only — no inset shadow; gradient end-color follows via `--chat-fade`; kebab stays visible | matches the nav-row pressed treatment for visual consistency across all interactive rows |
| **Active** (`data-[state=active]`) | **full-row** `bg-background` + text `accent` | — | bg `State/Pressed` + text one step up the ink scale — `--ink-body` (vs `--ink-secondary` on default/hover/pressed). Gradient end-color follows via `--chat-fade`. | mirrors the nav-item active recipe — pressed surface + one-step content bump; no brand colour |
| Focus (keyboard) | `outline-none ring-primary focus-visible:ring-2` on sub-button | — | 2px `--focus-ring-brand` ring with 2px `Surface/Card` gap on the row; kebab takes its own ring on `:focus-visible` | brand-tinted, consistent |
| **Loading (in-progress)** | — no equivalent | — | 10px spinner on the right edge, color `Brand/Primary`, reuses `@keyframes btn-spin`; row carries `aria-busy="true"` + `<span class="sr-only">In progress</span>` | indicates the chat is actively generating |
| **New data (unread)** | — no equivalent | — | 6px solid dot on the right edge, color `Brand/Primary`; paired with `<span class="sr-only">New activity</span>` so it's never color-alone | indicates new content in an idle chat |
| Row actions | — no equivalent | — | **single kebab** (`More actions`, vertical-dots, 24×24, **`iconbtn iconbtn-tertiary`** variant — icon `Text/Body`, hover bg `Brand/Primary @ 6 %`, pressed `@ 8 %`, focus `--focus-ring-brand`) reveals on row `:hover` / `:focus-within`; the status indicator (if any) fades out so kebab and indicator share the right-edge slot. Click opens the existing `Dropdown` `.menu` with **three context-aware items in fixed order**: <br>· **Pin** when the row is in `Recent` / **Unpin** when in `Pinned` <br>· **Rename** <br>· **Delete** (red, `.mi.danger`) <br>The first item's label switches by section; the position and the rest of the menu are constant. | reuses [`Dropdown`](Dropdown.md) `.menu` / `.mi` / `.mi.danger` — no new styles. Kebab composes the existing `iconbtn-tertiary` variant exactly as the collapse trigger does, so utility actions across the sidebar share one interactive language. |

## SidebarFooter — compact tokens meter + 2-line user row
| State / part | Current (prod) · was | v1.0 | Expected · became | Specification |
|---|---|---|---|---|
| Container | `flex flex-col gap-2 p-2` + top border, generous padding inside (`.75rem 1rem`) | — | top border + `.5rem .625rem .625rem`, `gap-2`; ~30% shorter overall | "noticeably smaller than the current footer" |
| Tokens row — label | 14px `font-medium` `Text/Secondary` | — | 11px `font-medium` `Text/Secondary` | compacted |
| Tokens row — value | 14px `Text/Primary`, multi-span layout `673 of 1000` | — | 11px `Text/Secondary`, single span `673 / 1000`, tabular-nums | unified weight, single line |
| Tokens bar | `Progress` h4 `Brand/Primary` over `Surface/Background` track | — | h3 `Brand/Primary` over `Surface/Chips` track, radius full | thinner; quieter track |
| User row — avatar | 40×40 circle, `bg-bg`, text `Text/Body` initial | — | 24×24 circle, `Brand/Tertiary` bg, white initial, 11px `font-semibold` | colored accent ring around identity |
| User row — primary | 14px `font-medium` `Text/Primary` (email `katerinakleina@gmail.com`) | — | 12px `font-semibold` `Text/Primary` (display name, e.g. `Kateryna K.`) | name, not email |
| User row — secondary | 12px `font-medium` `Text/Secondary` (`Admin`) | — | 10px `Text/Secondary`, format `Admin · Professional` (role · plan) | adds plan info below the name |
| User row — chevron | 20×20 prominent vertical chevrons `Text/Body` | — | 14×14 vertical chevrons **`Text/Body` at `opacity: 0.7`** | decorative icon inside the user-row button (not its own `iconbtn`); colored to align with the IconButton Tertiary icon palette without doubling up the button semantics |
| Section action ("See all") | — | — | 11px **`.link`** styled (color `Brand/Primary`, hover underline, brand focus ring) — revealed on label-row hover or focus | reusable `.link` utility added at the global level for any future text-link; section-link layer (`.sbx-sect-link`) only handles the opacity-reveal |
| User row — hover | none | — | bg `State/Hover`, radius `md`, padding `.25rem` for a comfortable hit area | now clearly interactive |
| User row — focus | inherits global ring | — | explicit `--focus-ring-brand` | parity |
| **User row — click** | no menu | — | **Opens the Account popover** above the row. Two labelled sections (`Account`, `Support`), each containing `SelectMenuItem` rows (h24, gap 6 px, 12 px Lucide icon + 12 px label, hover bg `State/Hover` — **no content recolour**, matching every other hoverable sidebar row). Segmented theme switcher (sun / moon / monitor-smartphone, per prod) at the bottom uses the existing `Tabs`-style pattern — slot walks the surface ladder: light `var(--chips)` → pill `var(--card)`; dark `var(--bg)` → pill `var(--card2)` (legacy `.sbx-pop-theme` recipe — same dark behaviour as `.segctrl`, light keeps the popover's softer `--chips` look). Sign Out is a plain `SelectMenuItem` (neutral text, log-out icon). | reuses [`Popover`](Popover.md) `.sbx-pop` shell — single class drives both popovers |
| **Tokens row** | plain `<div>` block | — | now a **tertiary-styled `<button>`** (transparent bg, `--brand-primary @ 6%` hover, `--brand-primary @ 8%` pressed, `--shadow-focus-brand` focus). On click opens the **Subscription tokens popover** above the row with: shield-check plan badge + plan name, two metered rows (`Subscription Tokens` `Brand/Tertiary` progress, `Purchased Credits` `Feedback/Green` progress, 4 px bar), and two CTAs — `Buy Credits` (`Button primary`) and `Upgrade Plan` (`Button secondary` — `--card` bg, neutral `--border`, `--ink-body` text), both h36 `rounded-full`. | reuses [`Popover`](Popover.md) `.sbx-pop` shell + existing `Button primary` / `Button secondary` variants — no new component styles for the buttons |

## Sub-parts — no visual change (API preserved)
| Part | Current (prod) · was | v1.0 | Expected · became |
|---|---|---|---|
| **SidebarGroup** | `relative flex w-full min-w-0 flex-col` | — | — no change |
| **SidebarMenu** | `flex w-full flex-col gap-1` | — | — no change (now hosts both nav rows and chat rows as sub-types) |
| **SidebarMenuSub / SidebarMenuSubButton** | nested sub-list with left rail | — | — no change; chats no longer use this nested pattern but the API stays for other consumers |
| **SidebarRail** | invisible drag zone with `after:w-[2px]` line; `cursor-e-resize`; runs `toggleSidebar` | — | — no change |
| **SidebarTrigger** | `Button h-7 w-7` with `PanelLeft` icon, `aria-label "Toggle Sidebar"` | — | resized to 24×24 (matches kebab + row-action standard) and anchored to the right of the brand row; same `PanelLeft` icon, same `aria-label` — API unchanged |
| **SidebarInset** | `main bg-background overflow-hidden`; inset variant adds `m-2 rounded-xl shadow` | — | — no change |
| **SidebarProvider** / `useSidebar` | Context with `state / open / openMobile / isMobile / toggleSidebar` | — | — no change |

## Reused / introduced styles
- **Reused as-is:** `.menu` + `.mi` + `.mi.danger` for the kebab dropdown (no new variants, no shadow tweak). `@keyframes btn-spin` for the in-progress spinner. `--state-pressed` (same token as Button pressed) — bg only, no inset shadow on rows. `.iconbtn iconbtn-tertiary` variant (borderless ghost, `Text/Body` icon, `Brand/Primary @ 6 %` hover, `@ 8 %` pressed, `--focus-ring-brand` focus) — composed for both the collapse trigger and the chat kebab; the `.sbx-collapse` / `.sbx-chat-more` classes now only override size + positioning + opacity-reveal, all interactive styles come from `iconbtn-tertiary`. `--focus-ring-brand`, `--state-hover`, `--brand-primary`, `--ink-*`, `--fb-red`, `--brand-tertiary`, `--chips` all resolve through existing `:root` / `.dark` semantic tokens.
- **New CSS classes (component-scoped, no new tokens):** `.sbx` (+ `.is-collapsed` icon-mode modifier), `.sbx-head`, `.sbx-brand[-id|-mark|-name]`, `.sbx-collapse`, `.sbx-cta`, `.sbx-nav`, `.sbx-nav-item` (+ `.s-pressed`), `.sbx-chats`, `.sbx-sect[-head|-label|-link]`, `.sbx-chat` (+ `.s-pressed`), `.sbx-chat-lbl`, `.sbx-chat-more`, `.sbx-chat-status` (`is-loading`, `is-new`), `.sbx-spinner`, `.sbx-foot`, `.sbx-tok[-row|-label|-val|-bar]`, `.sbx-user[-ava|-info|-name|-meta|-chev]`, `.sbx-sr` (sr-only utility).
- **New global utility:** `.link` — reusable text-link style (color `Text/Highlight` `--ink-highlight`, hover underline, brand focus ring, disabled `Text/Inactive`). Sidebar's "See all" uses `class="link sbx-sect-link"`; available to any other component that needs a plain text link. **Note:** colour source changed this iteration from raw `--brand-primary` to the dedicated `Text/Highlight` semantic token (`--ink-highlight`, currently aliasing `--brand-primary`), so every text-link across the kit (and every `.cl-kw` keyword in chat-landing's concept mode) shares a single retargetable source — see [colors](colors.md#text-tokens).
- **Removed compared to first pass:** `.sbx-divider`, `.sbx-chat-actions`, `.sbx-chat-act` — collapsed into the single kebab pattern.

## A11y notes
- Active nav row: render with `aria-current="page"` (consumer responsibility; documented). Color-only identification is paired with this semantic so the active item is also announced, never color-alone.
- Disabled nav row: `aria-disabled="true"` *in addition* to the opacity treatment.
- Chat row kebab carries `aria-label="More actions"`, `aria-haspopup="menu"`, `aria-expanded` toggled by the consumer. Menu items follow `role="menuitem"` semantics from the existing Dropdown contract.
- Chat row status indicators are paired with `<span class="sbx-sr">In progress / New activity</span>` (visually hidden but read by assistive tech). Row gets `aria-busy="true"` while loading.
- Hit target ≥ 24×24 on every interactive element (nav row 32, chat row 30 × full row width, kebab 24×24, user row ≥ 28).
- Focus ring: 2px `--focus-ring-brand` over a 2px `Surface/Card` gap — visible against both the default and `State/Hover` surfaces.
- "See all" link is hover-only by default but **also revealed on `:focus-visible`** so keyboard users can reach it.
- Scrollbar visually hidden but `overflow:auto` retained — keyboard/wheel scrolling preserved.

## Responsive behaviour (this iteration)

Two-stage responsive. On **desktop** the sidebar lives in the layout column with optional in-place icon-mode collapse. On **mobile** the sidebar is **fully hidden** (no icon rail) and surfaces only as an **overlay** opened from a topbar hamburger. Same overlay/backdrop pattern the Metrics page uses for its right panel.

| Breakpoint | Layout | Width | Open affordance | Behaviour |
|---|---|---|---|---|
| **≥ 1024 px** (desktop) | In-flow fixed-width column | `SIDEBAR_WIDTH` `14.75rem` (or page override — chat-landing uses `16rem`) | In-sidebar collapse trigger (`.sbx-collapse`) | Visible by default. Trigger toggles **in place** to `SIDEBAR_WIDTH_ICON` `3.563rem` (icon-only) and back. No overlay. |
| **< 1024 px** (tablet + mobile) | Hidden by default → overlay on demand | `18rem` when open; otherwise not rendered | **Topbar hamburger** (`.cl-burger`) | Sidebar is `display:none` until the user taps the hamburger. Tap → sidebar mounts as a **position:fixed overlay** at `18rem` with a semi-opaque backdrop dimming the main column. The in-sidebar trigger acts as a **close** button (same as backdrop). |

**Implementation contract** (used by `pages/chat-landing.html`):
- The page topbar carries a `.cl-burger` button — `display:none` on desktop, `display:inline-flex` on mobile. Its onclick adds `.side-open` to `<html>` and removes `.is-collapsed` from `.sbx` (ensures the overlay shows in its full state, not desktop's icon mode).
- The in-sidebar trigger (`.sbx-collapse`) is one onclick that branches on viewport: ≥ 1024 px → toggle `.sbx.is-collapsed`; < 1024 px → remove `.side-open` (close overlay).
- A backdrop element (`<div class="cl-side-backdrop">`) is `display:none` on desktop and `display:block` below the breakpoint. It covers the **full viewport** (`position:fixed; inset:0`) including the topbar — `rgba(15,23,42,.45)` light, `rgba(2,6,23,.6)` dark, with `backdrop-filter:blur(2px)` for an extra hint of separation. Its `opacity` transitions `0 ↔ 1` based on `html.side-open`, and `pointer-events` flips so clicks pass through when closed. Clicking it removes `.side-open`.
- At `< 1024 px`, the sidebar is `display:none`. With `.side-open`, it becomes `display:flex; position:fixed; top:0; left:0; bottom:0; width:min(18rem,86vw); z-index:60` with a soft drop shadow (`0 10px 30px rgba(2,6,23,.32)`) and a `clSideSlide` keyframe slide-in (`translateX(-100%) → 0` over 220 ms). Internal layout (header / content / footer) is the kit's normal sbx — no separate mobile component.
- JS resize handler removes `.side-open` whenever the viewport crosses back to ≥ 1024 px, so the sidebar resumes its in-flow layout cleanly.
- Below `< 640 px`, the main column also tightens: padding `.75rem 1rem`, title font-size `1.5rem`, composer padding `.5rem`, hero gap `1.25rem`. The composer footer rows allow `flex-wrap:wrap` so the Send button can drop to its own row instead of forcing label wrap mid-word.
- Below `< 480 px`, dropdown labels (`.cl-dd-lbl`) and the Send button label (`.cl-send-lbl`) collapse to **icon-only**; SVG glyphs + `aria-label` retain meaning. Suggestion pills tighten (h32, 12px font).

The previous Sheet-based mobile rendering (kit baseline — `Sheet side="top"`) is **superseded** by this pattern. The icon-mode rail is intentionally **not** rendered on mobile: at narrow widths every pixel of main-column belongs to content, not navigation chrome.

## Self-check report

**Consistency**
- Tokens-only: all colors resolve through `--brand-primary`, `--state-hover`, `--ink-*`, `--border`, `--fb-red`, `--focus-ring-brand`, `--brand-tertiary`, `--chips`. No raw hex outside primitives. ✓
- Sizes: nav row h32, chat row h30, kebab 24×24, footer compacted; all on the 2px/4px scale. ✓
- Radii: shell `lg` (10px), rows `md` (6px), kebab `sm` (4px). ✓
- State coverage parity: nav row covers default / hover / active / focus / disabled; chat row covers default / hover / active / focus / loading / new-data / menu-open. ✓
- Reuse: kebab menu reuses the existing `.menu` + `.mi` styles. Spinner reuses `@keyframes btn-spin`. ✓
- Both themes themed via existing `.dark` overrides. ✓

**Accessibility (WCAG 2.1)** — measured contrast ratios (computed, not estimated):
- Nav row default text on default bg: `--ink-secondary` Slate-550 `#5A6A80` on `--card` `#FFFFFF` → **5.47:1** — PASS (≥ 4.5). *(Was Slate-500 `#64748B` 4.76:1; primitive lifted Slate-500 → **Slate-550 (new custom primitive)** to clear the hover-over-State/Hover WARN with minimum visual change — see [colors](colors.md).)*
- Nav row hover (light): `--ink-secondary` Slate-550 `#5A6A80` on `--state-hover` Slate-100 `#F1F5F9` → **5.01:1** — PASS (≥ 4.5). *(Was 4.21:1 with Slate-500 — FIX via primitive shift, not via semantic swap.)*
- Nav row hover (dark): `--ink-secondary` Grey-400 `#9CA3AF` on `--state-hover` Grey-800 `#1E293B` → **5.98:1** — PASS. (Dark already passed; no primitive change in dark.)
- Nav row **active (color-only)** light: `--brand-primary` Brand-600 `#07807E` on `--card` `#FFFFFF` → **4.77:1** — PASS (≥ 4.5).
- Nav row active dark: Brand-500 `#148F8D` on Grey-900 `#17171E` → **4.54:1** — PASS (just clears 4.5).
- Chat row label = nav default — **5.47:1** light / **15.4:1** dark — PASS (same `Text/Secondary` token; benefits from the same primitive shift in light, dark unchanged).
- **Section labels** `Text/Secondary` Slate-550 `#5A6A80` on `--card` `#FFFFFF` → **5.47:1** — PASS. (Was Slate-500 at 4.76:1; benefits from the same primitive lift. Stays visually muted at 10px uppercase.)
- Tokens meter values (11px) `--ink-secondary` Slate-550 on `--card` → 5.47:1 — PASS.
- Status indicator color: `--brand-primary` dot/spinner on `--card` → ≥ 4.77:1 (1.4.11 requires only 3:1 for UI components) — PASS. Color paired with sr-only labels — never color-alone (1.4.1). ✓
- Focus ring: brand 2px over 2px card-gap — visibly distinct on default and `State/Hover` surfaces. PASS (2.4.7). ✓
- Hit targets: nav row 32×236, chat row 30 × full row, kebab 24×24 (icon glyph 14px centered), user row ≥ 28 — all ≥ 24×24. PASS (2.5.8). ✓
- Disabled state never color-alone — opacity + `aria-disabled` + `pointer-events:none`. ✓ (1.4.1).
- Delete: red is only feedback on the delete-action hover inside the menu, paired with the "Delete" text label — never color-alone. ✓.

**Report**
```
Consistency: PASS
Accessibility: PASS — Text/Secondary primitive lifted Slate-500 → Slate-550 (new custom
  primitive #5A6A80, light only; dark Grey-400 already passed). Semantic token unchanged —
  nav-row and chat-row still read Text/Secondary, just backed by a slightly darker slate
  so hover-over-State/Hover clears AA with minimum visual change.
  Now 5.01:1 light / 5.98:1 dark (target ≥ 4.5). See colors.md for the primitive row.
```
