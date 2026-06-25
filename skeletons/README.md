# skeletons/ — per-component loading skeletons

One **loading-state fragment per kit component**, mirroring `../components/`. A component is
skeletoned **once, here**; pages never hand-author skeleton markup — they **compose** these
fragments, exactly like the kit composes components and never uses them raw.

## Why this folder exists

When a page is promoted to `../pages/approved/` (via `/approve-page`), it gains an in-page
**Loaded ↔ Skeleton** toggle. The Skeleton state must be assembled from these shared fragments
so every screen renders a component's loading state identically and it only has to be designed
once.

## Rules

1. **One file per component**, named to match its sibling artefacts:
   `skeletons/<Component>.html` ↔ `components/<Component>.html` ↔ `current/<Component>.md` ↔
   `changes/<Component>.md`.
2. **Base the skeleton on prod.** Derive the placeholder boxes (width / height / border-radius /
   spacing / count) from the real production component — its `current/<Component>.md` baseline and
   its live box in `../pages/kit-theme.css`. The skeleton must occupy the **same footprint** as
   the loaded component so toggling causes **zero layout shift**.
3. **Built from the `.skel` primitive only** (`.skel` + `.skel.shimmer` default / `.skel.pulse`,
   radii `.r-sm/.r-lg/.r-xl/.r-full`) — see `../pages/kit-theme.css` → `/* Skeleton */`. Never
   invent a new skeleton component, new tokens, or raw hex / inline `color-mix()` / fixed colors.
4. **Each fragment is a self-contained `.sk-skel` block** ready to drop into a page's swap pair:
   ```html
   <div class="sk-loaded"> …real component… </div>
   <div class="sk-skel">   …paste skeletons/<Component>.html… </div>
   ```
   The page toggle (`html.skel-on`, defined in `kit-theme.css` after the Skeleton block) hides one
   sibling and shows the other.
5. **Header comment** on every fragment, same shape as `../components/*.html`:
   ```html
   <!--
     <Component> skeleton — loading state.
     Mirrors: components/<Component>.html · current/<Component>.md
     Base box from: pages/kit-theme.css → .<selector>
     Repeats: <e.g. 3 rows / N cards> (match prod default count)
   -->
   ```
6. **Reproduce a documented Loading state if one exists.** If `changes/<Component>.md` /
   `current/<Component>.md` specify a `Loading` state, the fragment must match it (e.g. File,
   Autocomplete, Skeleton itself).
7. **Nothing live depends on this folder being complete** — fragments are created on demand the
   first time a component is skeletoned (usually when its first page is approved). Reuse before
   creating: if the fragment already exists, compose it, don't re-author.

## Coverage

A skeleton fragment exists for **every component in the kit catalog** (`../changes/` ∪
`../current/`), plus the composite page-section fragments from `../components/` (ProviderCard,
ProviderIcon, MetricsTable, MetricsToolbar, MetricsHero, DetailPanel, CategoryFilter, Selector).
Each base box was taken from prod. The folder listing (`ls skeletons/`) is the index — every
`<X>.html` mirrors `changes/<X>.md` / `current/<X>.md`.

Even atomic controls (Button, Checkbox, Switch, Badge, …) have a fragment, so a container
skeleton can drop one in when the control sits inside loading content.

### Intentionally NOT skeletoned

These have no fragment on purpose — adding one would be meaningless:

| Excluded | Why |
|---|---|
| `Skeleton` | it **is** the loading primitive — no skeleton-of-a-skeleton |
| `Overlay`, `ScrollShadow` | pure backdrop / edge-fade — no content box to placeholder |
| `Radius`, `colors`, `typography` | design tokens, not components |
| `prod-gap-report` | a report doc, not a component |

When a brand-new component is added to the kit, create its skeleton here too (unless it falls in
the excluded set above).

## Relationship to the toggle plumbing

The show/hide mechanism (`.sk-loaded` / `.sk-skel` / `html.skel-on`) and the topbar
SegmentedControl that flips it live in `../pages/kit-theme.css` and are wired by `/approve-page`.
This folder only holds the **content** of the `.sk-skel` side, per component.
