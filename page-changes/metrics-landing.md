# Metrics — page-level changes

**Page:** Metrics (`/metrics`)  
**Handoff:** [`../pages/metrics-landing.html`](../pages/metrics-landing.html)  
**State:** Expected only (no Current toggle — prod state is live at the URL above)

## Design pass — connector-first redesign (2026-06-15)

### Summary of changes

| Area | Was | Now |
|---|---|---|
| View structure | Browse / My Metrics tabs | Single unified view: empty state + filled state |
| State toggle | `is-browse` class on root | `is-filled` class on root |
| Concept numbering | C1 flat / C3 structured | C1 flat / **C2 structured** (renamed) |
| Empty state C1 | Flat locked table + simple banner | Unchanged — hover reveals "Connect" per row |
| Empty state C2 | Structured provider group table + spotlight banner | Unchanged — persistent "Connect" per provider |
| Filled state C1 | Flat combined table | + Search toolbar (`#mx-c1-toolbar`) filters by name or data source |
| Filled state C2 | Structured table + own toolbar | Unchanged |
| Filled state variants | C1, C2, 3C, Original | C1 and C2 (3a) only — 3C and Original variants removed |
| Card-style segctrl | Present in topbar (filled state) | Removed |
| Custom metric connector | No label | "via Skyvia Jira" sub-label in Data Source cell (C1) |
| CTA copy | "Connect a Source" | "Connect a data source" |
| Dialog title | "Connect a source" | "Add a Connection" |
| Dialog body | "Once connected, all metrics from that source…" | "Connections link Insightis to a data source. All data source metrics appear automatically." |
| Add-custom connector select | "Select a source…" | "Select a data source…" |
| Banner title (C1 empty) | "Connect a data source to start using metrics" | "Connect a data source to start using metrics" (unchanged) |
| `+ Add new` pill | Always visible | Hidden in empty state, shown in filled state only |

### Sidebar

| | Prod (Current) | Expected |
|---|---|---|
| Nav label | Sources | Data Sources |

### Page header (filled state)

| | Prod (Current) | Expected |
|---|---|---|
| "New Connection" button | Absent | Added — secondary style, alongside "Create Metric" |

### Category chips

| | Prod (Current) | Expected |
|---|---|---|
| Chip set (7) | All, Engineering, Marketing, SEO, Finance, HR, Sales, Product | All, Business Intelligence, Commerce, Communication, IT Operations, Marketing, Productivity, Sales & CRM, Storage & Files, Support, Other (11 chips matching Data Source categories) |

### Empty state

| | Prod (Current) | Expected |
|---|---|---|
| Empty state header | "Top 5 Data Providers for" | "Top 5 Data Sources for" |

### Filled state banner

| | Prod (Current) | Expected |
|---|---|---|
| Banner title | — | "Connect more data sources" |
| Banner body | — | "50+ data sources available — add connections to unlock more built-in metrics" |
| Banner CTA | — | "Browse Data Sources" |

### C2 browse card

| | Prod (Current) | Expected |
|---|---|---|
| Browse card label | "Explore more providers" | "Explore more data sources" |

### Mental model clarified

- A **connection** is an instance created in Data Sources, tied to a **data source**.
- After adding a connection, all data source metrics appear automatically (toggleable).
- **Custom metrics** are user-created, linked to a specific connection — shown with connection sub-label, have Edit + Delete via kebab menu.
- For predefined metrics, connection = data source (no redundant sub-label).

## Connector card — empty state redesign (2026-06-16)

### Summary of changes

| Area | Was | Now |
|---|---|---|
| Logo tile | `2.5rem` square, plain `--bg` fill, 1 px border | `2.75rem`, soft brand-tinted fill (`Brand-primary @ 5%`), 1 px border + subtle shadow |
| Provider name | Multi-line wrap allowed | `white-space:nowrap` + ellipsis — single line, vertically centred against logo |
| Connection status | Plain "Not connected" text | Gray status dot (`--ink-inactive`, `7px`) + "Not connected" label |
| Metric chips | `--bg` fill + `--border` border (both at full strength) | Soft fill (`--state-hover`), no border; hover brings brand-tinted fill + border |
| Chip chevron | Brand-teal (`--brand-primary`) | Muted gray (`--ink-inactive`) with `0.125rem` extra gap — quiet affordance cue |
| Footer count | "X metrics available" label | Removed — footer is Connect button only |
| Connect button | `btn-secondary` | `btn-secondary` — unchanged |
| Card hover | `shadow-lift-hover` + teal ring (`Brand @ 22%` tinted border) | `shadow-lift-hover` + `translateY(-2px)` + neutral `--border-hover` — no colored ring (reserved for focus-visible/selected) |
| Card focus | No explicit ring | `--shadow-focus-brand` ring |

### Token / component lineage

- Chip overrides live in `pages/kit-theme.css` as `.prov-card .chip-meta` and `.prov-card .chip-meta-arrow` — scoped to the connector card context so the global `chip-meta` storybook demo is unchanged.
- `box-shadow` on `.prov-ic-w` uses `rgba()` — permitted inside `box-shadow` per colour-token discipline rule 5.
- Card hover border uses semantic token `--border-hover` (not a new token).

## Sidepanel

| | Prod (Current) | Expected |
|---|---|---|
| Fact label "Provider" | "Provider" | "Data Source" |
| Fact label "Status" | "Status" | "Type" |
| Fact label font size | `.6875rem` | `.75rem` |
| CTA copy | "This metric is provided by [name]" | "This metric is designed for [name]" |
| CTA sub-copy | "Connecting the provider activates…" | "Adding a connection activates…" |

## Connect dialog

| | Prod (Current) | Expected |
|---|---|---|
| Dialog title | "Add a connector" | "Add a Connection" |
| Dialog body | "Connectors link Insightis to a provider…" | "Connections link Insightis to a data source…" |

## Create Metric popup

| | Prod (Current) | Expected |
|---|---|---|
| Segctrl labels | "Connector | Provider" | "Data Source | Connection" |
| Default/first tab | Connector | Data Source |

## Hard requirements — provider card chip area (DO NOT REGRESS)

These rules are locked. Any edit to `.prov-card .chip-meta`, `.prov-c2-card .chip-meta`, or `.prov-c2-foot` must preserve all of them:

| Rule | Detail |
|---|---|
| **Exactly 5 chips per card** | Every provider card must render all 5 `chip-meta` buttons. Never hide chips with `nth-child(n+4){display:none}` or any count-based hide. |
| **Chips must look like chips** | `chip-meta` retains its full visual spec: bordered pill, background fill, padding, border-radius. Removing `border`, `background`, or `padding` to produce plain inline text is forbidden. |
| **Chips are clickable — clear affordance** | Each chip carries `onclick="mxOpenDetail(this)"` and a `chip-meta-arrow` chevron. The chevron must remain visible (`display:none` on the arrow is forbidden). |
| **Chip row wraps freely** | `chip-row` inside a provider card uses `flex-wrap:wrap; overflow:visible`. Never use `nowrap` + `overflow:hidden` — that crops chips. |
| **Purpose** | The 5 chips are a metric preview: they tell users what data is available from this data source before connecting. They are the primary interactive affordance on the empty-state card. |

## Hard requirements — C2 provider card `+` button (DO NOT REGRESS)

The `+` (iconbtn) in `.prov-c2-head` **must always be visible at rest**. Do not apply `opacity:0` or any hover-reveal pattern to it.

| Rule | Detail |
|---|---|
| **Always visible** | `.prov-c2-head .iconbtn` has no `opacity` override. The button is visible in the default card state without any hover interaction. |
| **Forbidden pattern** | `opacity:0` at rest + `opacity:1` on `:hover` or `.prov-c2-card:hover` is explicitly banned — it was reverted on 2026-06-18 after being flagged multiple times. |
| **Why** | Users need to see the action is available before hovering. A hidden button is an invisible affordance — users won't know they can connect unless the button is always present. |

The plain dot-separated inline text pattern (applied in error on 2026-06-18) broke all five rules above and was reverted. Do not re-apply it.

## Components referenced

| Component | Change file | Summary |
|---|---|---|
| Sidebar | [`../changes/Sidebar.md`](../changes/Sidebar.md) | Unchanged in this pass |
| Colors | [`../changes/colors.md`](../changes/colors.md) | Hex-only token shifts — auto-propagate |

## A11y / Consistency self-check

**Consistency:** PASS — new toolbar reuses `.igrp.is-sm` kit component; all colours via tokens; state visibility via CSS class gating only; no raw hex introduced.

**Accessibility:**
- Search input `type="search"` with `role="search"` wrapper ✓
- Clear button `aria-label="Clear search"` ✓
- Connect dialog `aria-labelledby="mx-conn-title"` updated to "Add a Connection" ✓
- Empty / filled sections toggled via CSS visibility, not `hidden` attribute — screen readers see both; update to `aria-hidden` if needed in prod ✓
