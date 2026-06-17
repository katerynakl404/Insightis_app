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
| Filled state C1 | Flat combined table | + Search toolbar (`#mx-c1-toolbar`) filters by name or provider |
| Filled state C2 | Structured table + own toolbar | Unchanged |
| Custom metric connector | No label | "via Skyvia Jira" sub-label in Provider cell (C1) |
| CTA copy | "Connect a Source" | "Connect a provider" |
| Dialog title | "Connect a source" | "Add a connector" |
| Dialog body | "Once connected, all metrics from that source…" | "Connectors link Insightis to a provider. All provider metrics appear automatically." |
| Add-custom connector select | "Select a source…" | "Select a connector…" |
| Banner title (C1 empty) | "Connect a data source to start using metrics" | "Connect a provider to start using metrics" |
| `+ Add new` pill | Always visible | Hidden in empty state, shown in filled state only |

### Mental model clarified

- A **connector** is an instance created in Data Sources, tied to a **provider**.
- After adding a connector, all provider metrics appear automatically (toggleable).
- **Custom metrics** are user-created, linked to a specific connector — shown with connector sub-label, have Edit + Delete via kebab menu.
- For predefined metrics, connector = provider (no redundant sub-label).

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
- Connect dialog `aria-labelledby="mx-conn-title"` updated to "Add a connector" ✓
- Empty / filled sections toggled via CSS visibility, not `hidden` attribute — screen readers see both; update to `aria-hidden` if needed in prod ✓
