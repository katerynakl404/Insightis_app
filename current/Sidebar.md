# Sidebar — current (prod)

Live on prod (from the `@insightis/ui` `Sidebar/` package; theme identical to the rest of `@insightis/ui`). The previous version of this file documented only the menu item — this revision adds the overall composition and each sub-part.

## Overall composition (`<Sidebar>`)
- Layout: `<SidebarHeader>` (logo / brand) → `<SidebarContent>` (menus & groups) → `<SidebarFooter>` (user / tokens / settings) → `<SidebarRail>` + `<SidebarTrigger>` for collapse.
- Width tokens (`constants.ts`): full `14.75rem`, icon-collapsed `3.563rem`, mobile drawer `18rem`.
- Container surface: `bg-card text-content-primary`, side-aware border (`group-data-[side=left]:border-r` / `right:border-l` with `border-border`).
- Responsive: on mobile renders as a `Sheet side="top"` drawer; on desktop as a sticky column with `transition-[width] duration-200`.
- Variants (`variant`):
  - **sidebar** (default) — flat side panel with `border-r/l`.
  - **floating** — detached card-style: `rounded-md border border-border shadow`, `p-2` outer.
  - **inset** — same float padding; pairs with `SidebarInset` main area that adopts `rounded-xl shadow` when collapsed.
- Collapse modes (`collapsible`):
  - **offcanvas** (default) — slides out of view (`w-0`, off-screen).
  - **icon** — collapses to `3.563rem`, hides labels and sub-menus.
  - **none** — non-collapsible; renders a plain `flex h-full w-[--sidebar-width] flex-col bg-card`.

## Sub-parts
| Part | Key classes | Purpose |
|---|---|---|
| **SidebarHeader** | `flex gap-2 p-4` | Logo / brand / collapse trigger row. |
| **SidebarContent** | `flex min-h-0 flex-1 flex-col gap-2 overflow-auto`; `group-data-[collapsible=icon]:overflow-hidden` | Scrollable body holding groups & menus. |
| **SidebarFooter** | `flex flex-col gap-2 p-2` | Bottom area (user row, tokens meter, secondary actions). |
| **SidebarGroup** | `relative flex w-full min-w-0 flex-col` | Logical section wrapper inside content. |
| **SidebarMenu** | `flex w-full flex-col gap-1` | Vertical list of `SidebarMenuItem`s. |
| **SidebarMenuButton** | `flex w-full items-center gap-2`, radius `md`, `font-medium text-sm`, text `content-body`; hover/active `text-accent`; `data-[active=true]:bg-accent/6` + text & icon `accent` + **left-edge accent rail** (`::before`, 3 px × nearly full row height, rounded, `bg-accent`, `left:0`); sizes default `h-8` / sm `h-7 text-xs` / lg `h-12`; icon-collapsed `size-8`, label hidden. Variants: `default` / `bordered` / `ghost`. | Interactive menu row. |
| **SidebarMenuSub** | `mt-1 ms-6 px-2.5 ps-2 border-l border-border translate-x-px`; hidden in icon mode. | Nested sub-list. |
| **SidebarMenuSubButton** | `h-7 rounded-md px-2 text-content-secondary text-xs/sm`, hover/active `text-accent`, focus `ring-2 ring-primary`, active `bg-background text-accent`. | Sub-item. |
| **SidebarRail** | `absolute inset-y-0 w-4` invisible click-zone with `after:w-[2px]` 2px line; `cursor-e-resize`; runs `toggleSidebar` on click. | Edge handle that collapses/expands. |
| **SidebarTrigger** | `Button h-7 w-7` containing `PanelLeft` icon, `aria-label / sr-only "Toggle Sidebar"`; runs `toggleSidebar`. | Explicit toggle button. |
| **SidebarInset** | `main relative flex h-full flex-1 flex-col bg-background overflow-hidden`; on `inset` variant: `m-2 ml-0 rounded-xl shadow`. | Main content shell paired with `variant="inset"`. |
| **SidebarProvider** / `useSidebar` | React Context exposing `state`, `open`, `openMobile`, `isMobile`, `toggleSidebar`. | State container required at the top level. |

## States (menu items — already in the kit)
- **Default** — text `content-body`.
- **Hover** — text `accent`.
- **Active** (`data-[active=true]`) — faint accent-tinted background (≈ `bg-accent/6%`) + text & icon `accent` + `font-medium`, plus a **left-edge vertical accent rail** (`::before` pseudo, ~3 px wide × nearly full row height, fully rounded, `bg-accent`, anchored at the leading edge `left:0`). The rail is the dominant active cue in prod; the tinted background is a secondary cue.
- **Focus (keyboard)** — sub-button defines `ring-2 ring-primary`; main `SidebarMenuButton` relies on global `:focus-visible` ring (no component-scoped ring). ⚠ no consistent focus ring across button types — covered in changes.
- **Disabled** — sub-button defines `disabled:opacity-30 pointer-events-none`; main button has no explicit disabled rule. ⚠ inconsistent — covered in changes.
- **Collapsed (icon mode)** — labels (`<span class="lbl">`) hidden via `group-data-[collapsible=icon]:hidden`; sub-menus hidden entirely.

## Variants on `SidebarMenuButton`
- **default** — `text-accent` hover.
- **bordered** — `bg-background` + 1px ring `border`, hover ring `sidebar-accent`.
- **ghost** — `bg-transparent`, active `text-secondary`.
