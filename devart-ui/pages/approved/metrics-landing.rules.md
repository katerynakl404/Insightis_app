# Metrics — locked rules (since the move to DevartUI)

The rules locked before 2026-10-16 still bind: `legacy-html/page-changes/metrics-landing.md` → "Hard rules";
shared workspaces: `approved/workspace.rules.md`.

## List: Rows — a concept tried on this page

The library as rows instead of a table, with Favorites (user, 2026-10-21: "запропонуй покращену версію де метрики
будуть не таблицею а більше рядками + буде опцію додавати в улюблені"). The review switch **List: Table · Rows**;
Table, the default, is the page as approved.

| # | Rule |
|---|---|
| 1 | **On this page, behind a review switch** — never a page of its own (user, 2026-10-21: "в тебе роздвоїлись сторінки?"). Everything else — data, filters, notices, the details sheet (Panels), the empty state, the shared-workspaces states — is the same in both. |
| 2 | **A metric is a DevartUI Card row** (`variant="row"`, the chats list's row — its hover, focus, press; a two-line row grows, it is not clipped): switch (DevartUI's default size — "тогл мав би бути більшим") · the name, alias and star over the definition (one line, two on a phone) · the badge · ⋮. The star sits on the name's line, as the chats list's pin (user, 2026-10-30: "перенеси зірочку до тайтлу"). Rows are `IK.MxMetricList`, with the same rows model and props as `IK.MxMetricsTable`. |
| 3 | **The hierarchy holds: source → connection → metric** ("ієрархію ти не мав ломати"). A source is a section heading (title16 — it reads as a heading, not one more row: "тайтли губляться"; chevron · logo · name · how many metrics · Add Metric on hover), its connections sub-headings (title14) inside, the rows under them; 32px between sources. |
| 4 | **Favorites**: the star on every metric row (hidden until the row is hovered or focused while off, always on touch and on a phone; always shown while on) and Add to / Remove from Favorites at the top of the ⋮. A favourite **stays where it is** — no section of them on top ("складна логіка фейворітів зверху"). A **Favorites chip** (DevartUI Toggle, the filter pills' 28px) beside the filters leaves only the favourites, in their groups — shown once something is starred. The review switch **Favorites: Some · None** shows with Rows only. |
| 5 | **The star is a FavoriteToggle**: DevartUI PinToggle's control with a star (tertiary → primaryTertiary, filled when on, its tooltip the action). Setting it pops the star (grows, tilts, settles) as it fills; taking it back dips it and it comes back empty ("бракує анімацій при лайку і його забиранні"); none under reduced motion. Not plan-gated. A shared metric can be a favourite too. |
| 6 | **A shared row** keeps the table's rules: the switch on and disabled (only its owner turns it off), no ⋮ (its room kept so the badges stay in one column), the warning after the name when it can't be used. |

## Details panels

| # | Rule |
|---|---|
| 7 | **The unified panels are the only ones** — Metric details, the Connection details opened over it, on this page as on Data Sources, Files and a workspace's page (user, 2026-10-22: "лишаєм нову панель всюди"). No Panels switch. |
| 8 | **A metric is not shared or taken out of a workspace by itself**: its Workspaces says "Goes with its connection, <name>" — the name a link that opens Connection details over it, whole (Edit · Test Connection · Disconnect · Add Metric · Share via Workspace · its workspaces with ×). No Share button, no "Not shared yet" (user, 2026-10-22: "з лінком на сорс", "забери текст нот шерд"). |

### Not designed yet

- Favourites in the details sheet (Metric Details) — no star there yet.
- Favourites in the chat (the composer's metric suggestions).
| 9 | **Deleting a metric asks first** — the row's ⋮ and Metric details alike (and a workspace's Metrics tab): D.ConfirmationDialog "Delete <name>?" · "This action can't be undone. The metric will be permanently removed." · Cancel · Delete, then "<name> deleted" (IK.useMxDeleteConfirm; user, 2026-10-23: "видалення метрик через підтвердження"). |

## Create metric

| # | Rule |
|---|---|
| 10 | **Made from a data source or a connection, the form knows where it goes** (user, 2026-11-09): Add Metric on a source's heading, its "Create a custom metric →", a connection's sub-header or its details (here, on Data Sources, in a workspace) opens **"Create metric for <name>"** — no Link to, no Data Source / Connection picker. The page's own Create Metric (nothing chosen) keeps both. **Edit always has them**, opened on where the metric is linked; another data source or connection moves the metric under it. **Edit is the same wherever it opens**, a workspace included. In a **shared workspace** — it shares connections, not data sources — there is no Add Metric on a source's heading, and the workspace's own **Create Metric has no Link to**: the Connection picker alone, only that workspace's connections — with none added yet, its list says "No connections added to this workspace" (IK.MxMetricDialog `target`, `connectionOnly`). The form scrolls in DevartUI's ModalBody — its bar in the dialog's own padding, the fields inset alike on both sides (§176). |
