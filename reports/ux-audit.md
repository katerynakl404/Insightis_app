# Insightis — UX audit (prod)

**Scope:** https://insightis-app.devart.info — walked screen by screen, plus an automated DOM/accessibility sweep on Chat, Metrics, Files and Chats Library, a CSSOM responsive probe, and a flow/error-state pass.
**Date:** 2026-09-02
**Status:** nothing here is agreed. This file stays separate; only signed-off findings get merged into [`prod-qa-dev-handoff.md`](prod-qa-dev-handoff.md).

## Method

Every finding names the principle it breaks, so the argument doesn't rest on taste:

- **Nielsen's 10 heuristics** — the standard inspection checklist.
- **UX laws** — Fitts, Hick, Jakob, Miller, Doherty threshold, Von Restorff, Gestalt grouping, Aesthetic–Usability, Postel's law (be liberal in what you accept).
- **WCAG 2.2** — including 2.5.8 Target Size (Minimum), new in 2.2 and the source of many findings below.
- **Automated sweep** — accessible names, form labels, heading outline, duplicate ids, tabindex, ARIA relationships, measured hit-target sizes, run per page.

**Severity:** 🔴 blocks or repeatedly misleads · 🟠 costs time on a common path · 🟡 friction or polish

Format: **What** → **Principle** → **Why it matters** → **Proposed solution**.

---

# 0 · Systemic findings (measured across all pages)

These repeat on every screen, so fixing them once fixes many symptoms.

### 0.1 🔴 Hit targets below the WCAG 2.2 minimum, product-wide
- **What:** measured across four pages. Nothing here is borderline — the minimum is 24 × 24 CSS px (WCAG 2.2 SC 2.5.8, AA):

  | Control | Measured | Where |
  |---|---|---|
  | Row checkbox | **18 × 18** | Files (every row) |
  | Header select-all checkbox | **18 × 18** | Files |
  | Metric toggle | **28 × 16** | Metrics (every row, ~20 rows) |
  | "Modified" sort header | **69 × 16** | Files |
  | "See all" | **34 × 17** | Sidebar, every page |
  | `RECENT` group header | 63 × **20** | Sidebar, every page |
  | Chat row title (the only clickable part) | 156 × **20** | Chats Library |
  | "Select all" link | 59 × **20** | Files, Chats Library |

- **Principle:** WCAG 2.2 SC 2.5.8; Fitts's law — acquisition time rises sharply as targets shrink.
- **Why it matters:** these are not decorative controls — they are selection, sorting, enabling and navigation. On a trackpad or a touch screen, a 16 px-tall target is a repeated miss.
- **Proposed solution:** enforce a 24 × 24 minimum hit area everywhere, using padding or a pseudo-element so the *visual* size can stay small while the *target* meets the minimum. This is the standard fix and costs no layout.

### 0.2 🔴 Icon-only buttons with no accessible name
- **What:** the Files list renders **12+ buttons with no accessible name at all** (the row `···` menus). The connections toggle in the composer is a `role="switch"` with no name. Both are invisible to assistive tech and unlabelled to everyone else.
- **Principle:** WCAG 4.1.2 (Name, Role, Value) — a straight failure, not a preference; Nielsen #6.
- **Why it matters:** a screen-reader user hears "button" twelve times with nothing to distinguish them. This is the single most mechanical accessibility defect in the product.
- **Proposed solution:** every icon-only control gets an `aria-label` **and** a tooltip with the same words. Metrics already does this correctly ("Toggle Monthly Savings", "View Monthly Savings details") — apply that same discipline to Files and the composer.

### 0.3 🟠 Heading outline is broken differently on every page
- **What:** measured:

  | Page | Outline |
  |---|---|
  | Chat conversation | **two `<h1>`** — the conversation title *and* "What insight are you looking for?" |
  | Metrics | no `<h1>` — H2 → H3 → **H6** ("Connect more data sources") |
  | Files | no `<h1>` — H2 → **H6** ("Drag & drop files here") |
  | Chats Library | no `<h1>` — H2 only |

- **Principle:** WCAG 1.3.1 (Info and Relationships); heading navigation is the primary way screen-reader users skim a page.
- **Root cause — heading level is being chosen to get a font size.** The evidence points one way in both directions:
  - the chat title is an `<h1>` rendered at **14 px** (`text-sm`) — the highest level, at the smallest size
  - the greeting is a second `<h1>` at **36 px** (`text-3xl`) — level picked to match its prominence
  - "Drag & drop files here" and "Connect more data sources" are `<h6>` — not headings at all, but a drop-zone label and a CTA, given the deepest level because it renders small
- **Proposed solution — separate the two concerns; they are unrelated:**

  | Concern | Decided by | Expressed as |
  |---|---|---|
  | **Level** (`h1`…`h6`) | the page's outline — what contains what | the tag, and nothing else |
  | **Size / weight** | visual hierarchy on screen | a typography class from the scale, applied independently |

  An `<h1>` at 14 px and an `<h2>` at 36 px are both entirely legitimate once the two are decoupled. Concretely:
  - **one `<h1>` per page** = the page's subject: "Files", "Metrics", "Chats Library", and the conversation title in a chat — styled at whatever size the design calls for
  - the chat greeting is **not** a heading — it is a prompt inside an empty state; a `<p>` with the display type class
  - the drop-zone label and "Connect more data sources" are **not** headings — plain elements with the small type class
  - never reach for a deeper level to make text smaller, or a shallower one to make it bigger
- **Note:** this matches how our own kit already states it — heading levels are semantic shorthands, styled per use; there are no `.h4`-style classes to grab for size.

### 0.4 🟠 Search fields are labelled only by placeholder
- **What:** "Search metrics…" and "Search conversations…" have no `<label>` and no `aria-label` — the placeholder is the only label.
- **Principle:** WCAG 1.3.1 / 3.3.2; a well-documented usability failure — the label vanishes the moment the user types, so anyone interrupted mid-task loses the field's identity.
- **Proposed solution:** a visually-hidden `<label>` (or `aria-label`) matching the placeholder, at minimum. The magnifier icon is not a label.

### 0.5 🟡 `aria-expanded` without `aria-controls`
- **What:** the `RECENT` group header and the row "More actions" buttons expose `aria-expanded` but never say what they expand.
- **Principle:** WCAG 4.1.2 / 1.3.1 — the state is announced, the relationship is not.
- **Proposed solution:** add `aria-controls` pointing at the region's id, or drop `aria-expanded` where nothing is actually controlled.

### 0.6 🟢 What is already right — worth protecting
Noted so a refactor doesn't regress them:
- `prefers-reduced-motion` is honoured (11 media rules) — rarer than it should be.
- A `(hover: none) and (pointer: coarse)` rule exists, so touch was considered.
- Metrics gives every toggle and detail link a descriptive accessible name ("Toggle Monthly Savings") — the pattern the rest of the app should copy.
- No duplicate element ids and no positive `tabindex` values were found on any page swept.
- The 404 offers a recovery route rather than dead-ending.

---

# 1 · Global chrome

### 1.1 🔴 Chats Library's only route is a 34 × 17 hover-revealed link
- **What:** the sidebar lists New Chat · Data Sources · Metrics · Files, then `RECENT`. There is no **Chats** item. The library at `/chats` is reachable only through a **"See all"** link inside the `RECENT` group — measured at **34 × 17 px**, and not visible in the resting sidebar. On the library page, no sidebar item is highlighted.
- **Principle:** Nielsen #1 (nothing marks where you are), #6 (recognition over recall), #7; WCAG 2.5.8 on the link itself.
- **Why it matters:** conversations are the product's core artefact, and the page built to manage them hangs off the smallest, least visible control in the app.
- **Proposed solution:** add **Chats** as a first-class sidebar item above Data Sources, active on both the library and any conversation. Keep `RECENT` beneath it as a shortcut.

### 1.2 🟠 Theme switcher is three unlabelled icons
- **What:** the account menu ends with a three-segment control (sun / moon / monitor) — no group label, no per-segment name, no tooltip. The active segment is marked only by a faint surface.
- **Principle:** Nielsen #6, #4 (every other row in this menu is icon + label); WCAG 4.1.2.
- **Proposed solution:** label the group "Theme", name each segment (Light / Dark / System), and give the active state a treatment that reads at a glance.

### 1.3 🟡 Balance appears twice, 40 px apart
- **What:** the sidebar footer shows "Balance · 14,999.9 left"; the account menu opened from that exact row also contains a **Balance** item — and the open menu covers the footer readout.
- **Principle:** Nielsen #8; Gestalt proximity.
- **Proposed solution:** pick one owner — either the footer row is the click target and the menu item goes, or the footer is a plain readout with no competing affordance.

### 1.4 🟡 Two identical "New Chat" links to the same route
- **What:** the DOM sweep found two `New Chat` links, same text, both `href="/chat"`.
- **Principle:** Nielsen #8; screen-reader users navigating by links hear the same destination twice.
- **Proposed solution:** keep one, or differentiate if they genuinely do different things.

---

# 2 · Chats Library (`/chats`)

### 2.1 🔴 Only the title text opens the conversation — the rest of the row is dead
- **What:** measured — the clickable element is the title text alone, **156 × 20 px**, inside a row roughly **1180 × 44 px**. Clicking anywhere else in the row (the whitespace after the title, the timestamp, the padding) does nothing. The row still shows a hover surface across its full width.
- **Principle:** Fitts (the target is ~2 % of the row's area); Jakob's law — every comparable list opens the item from anywhere in the row; Nielsen #1 — the full-width hover promises a target that isn't there.
- **Why it matters:** this is the page's primary action. The hover state actively misleads, and the real target is under the 24 px minimum on top of it.
- **Proposed solution:** make the row body the click target, exempting the checkbox and the kebab. The Files page already implements exactly this rule — reuse it. Keep the title as the accessible name of that target.

### 2.2 🟠 Rows carry only a title and a timestamp
- **What:** no snippet, no message count, no source badge. Titles are auto-generated from the first message — the seeded example is literally "Ввод случайного текста" ("random text input").
- **Principle:** Nielsen #6; Miller.
- **Why it matters:** when titles are auto-generated and often meaningless, a title-only row forces the user to open conversations to identify them — and makes search results unreadable.
- **Proposed solution:** add a one-line snippet of the last message and the connection used. Let users rename from the row (the kebab already exists).

### 2.3 🟠 "Show pinned only" is discoverable only by screen reader
- **What:** the icon button beside search has a correct accessible name — **"Show pinned only"** — but no visible label and no tooltip observed. Sighted users get an unexplained icon; the toggle's on/off state is not otherwise expressed.
- **Principle:** Nielsen #1 and #6 — a filter whose state is invisible; Von Restorff (a lone icon among text controls).
- **Why it matters:** a filter that can be silently left on is a classic source of "my data disappeared" confusion.
- **Proposed solution:** express it as a labelled chip in the controls row, alongside a count, so both its purpose and its state are visible. If it must stay an icon, add a tooltip and an unmistakable active state.

### 2.4 🟡 "Select all" appears with a single item
- **What:** with one conversation the row reads "1 conversation · Select all".
- **Principle:** Nielsen #8.
- **Proposed solution:** show from two items upward. (Dev report #1 covers the 0-item case on Files.)

### 2.5 🟡 One row in a full-height empty canvas
- **What:** with one conversation, the list is ~44 px and the rest of the pane is blank.
- **Principle:** Aesthetic–Usability; Nielsen #1 — a near-empty workspace reads as a failed load.
- **Proposed solution:** at low counts use the space for guidance rather than leaving it blank.

---

# 3 · Chat conversation (`/chat/<id>`)

### 3.1 🔴 The empty state is hidden with `opacity: 0` only — it stays focusable and announced
- **What:** in a conversation that already has messages, the empty state is still fully live. Measured:
  - its wrapper is `<div class="absolute right-0 bottom-full left-0 mb-5 …">` with **`opacity: 0`** — and **no** `aria-hidden`, **no** `inert`, **no** `display:none`
  - inside it, the greeting `<h1>` **"What insight are you looking for?"** — 36 px, 312 × 80, positioned at y 367–447, i.e. inside the viewport
  - the three suggestion buttons — "What needs my attention?" (213 × 34), "Show key trends" (151 × 34), "Summarize my data" (171 × 34) — all measured **`effectiveOpacity: 0`, `tabbable: true`, `aria-hidden: no`, `inert: no`**
- **Principle:** WCAG 2.4.3 (Focus Order), 2.4.7 (Focus Visible) — Tab lands on controls that cannot be seen; 1.3.1 / 4.1.2 — invisible content still in the accessibility tree; Nielsen #1.
- **Why it matters:** three separate consequences from one cause.
  1. **Keyboard users tab into nothing.** Focus moves to three invisible buttons that still respond to Enter, with no visible focus ring anywhere on screen. This is the classic "lost focus" failure.
  2. **Screen-reader users are told to start a conversation** they are already inside, and hear a second `<h1>` — this is the source of the two-`<h1>` outline in 0.3.
  3. **It is also the cause of finding 3.6** — the wide dead band between the last message and the composer is this invisible block occupying layout.
- **Proposed solution:** unmount the empty state when the conversation has messages. If it must stay mounted for a fade transition, pair the opacity with `inert` (which removes it from focus order *and* the accessibility tree in one attribute) and remove `inert` only when the state is actually shown. `opacity: 0` alone hides content from exactly one group of users — the sighted ones.

### 3.2 🟠 The Connections trigger never shows its own state
- **What:** the trigger always reads "Connections". Its menu holds Notion with a toggle. The **model** trigger immediately beside it *does* show its value ("Insightis Light", accessible name "Model: Insightis Light").
- **Principle:** Nielsen #1, #4 — two adjacent triggers in one toolbar behaving by opposite rules.
- **Why it matters:** which data the question runs against is the most consequential setting in the composer, and it is the only one the user cannot read without opening a menu.
- **Proposed solution:** show the active selection on the trigger — the connection name for one, "N connections" for several, and an explicit "No connections" when none. Mirror the model picker.

### 3.3 🟠 The connections toggle has no name and no stated scope
- **What:** it is a `role="switch"` with **no accessible name**, and nothing states whether switching it off affects this message, this conversation, or the workspace.
- **Principle:** WCAG 4.1.2; Nielsen #1, #5, #10.
- **Proposed solution:** name the switch, and put a one-line scope statement at the top of the menu. Pair with 3.2 so the resulting state is visible without reopening.

### 3.4 🟠 User and assistant turns are styled as different kinds of object
- **What:** the assistant reply is a bordered card spanning the column; the user's message is a small low-contrast pill in the top-right corner.
- **Principle:** Nielsen #4; Gestalt similarity; Von Restorff inverted — the user's own words become the least prominent thing on screen.
- **Proposed solution:** one message family, two variants — same type size, radius and rhythm — differentiated by alignment and surface only. The user's turn needs body-text contrast.

### 3.5 🟠 Send reads as disabled when it is the primary action
- **What:** Send renders grey and low-contrast beside a live composer; enabled and disabled are hard to tell apart.
- **Principle:** Nielsen #1, #6; WCAG 1.4.3 / 1.4.11 if the low-contrast state is the enabled one.
- **Proposed solution:** enabled Send = brand primary at full contrast; disabled = the DS disabled treatment. If it unlocks only once text exists, say so or don't render it yet.

### 3.6 🟠 Large dead zone between the last message and the composer
- **What:** messages pin to the top, the composer to the bottom; a short conversation leaves a wide blank band between them.
- **Principle:** Gestalt proximity; Jakob — chat interfaces grow from the bottom.
- **Proposed solution:** anchor the message column to the bottom. This also removes the jump when the first reply arrives.

### 3.7 🟡 Attach is icon-only while its two neighbours are labelled
- **What:** paperclip (icon only, tooltip "Attach file" — confirmed) · Connections (label + chevron) · Insightis Light (label + chevron).
- **Principle:** Nielsen #4 — consistency inside one control group.
- **Proposed solution:** label the attach control; it is the smaller change.

### 3.8 🟡 The attach tooltip covers the composer it belongs to
- **What:** the "Attach file" tooltip renders up and to the left, landing on the composer's own input area and border.
- **Principle:** Nielsen #1; Gestalt figure/ground.
- **Proposed solution:** place composer tooltips clear of the composer's border and flip side near the pane edge.

---

# 4 · Data Sources → Catalog

### 4.1 🟠 203 connectors with no ranking
- **What:** 203 connectors, alphabetical, one flat grid, category chips above. First screen is ActiveCampaign … Airtable.
- **Principle:** Hick; Miller; Nielsen #6, #8.
- **Why it matters:** alphabetical order only helps someone who already knows the name — and they will use search. Everyone else faces 203 undifferentiated tiles with the likeliest picks buried under "A".
- **Proposed solution:** a **Popular** group above the alphabet — 8–12 tiles from real connection counts, not guesses — with the full grid below.

### 4.2 🟡 Tile labels wrap to different baselines
- **What:** longer names ("Acuity Scheduling", "Azure Synapse Analytics", "Azure Application…") wrap or truncate, so tiles in one row have labels on different lines.
- **Principle:** Gestalt continuity; Aesthetic–Usability.
- **Proposed solution:** reserve two label lines in every tile so logos and labels share baselines; truncate at line two with a tooltip carrying the full name.

### 4.3 🟡 Filtered-empty state unverified
- **What:** a chip + search combination that matches nothing was not reachable in this pass.
- **Proposed solution:** confirm the state exists and distinguishes "no results for this filter" from "nothing here", with a route back to All. Files already specifies this pattern — reuse its wording.

---

# 5 · Data Sources → My Connections

### 5.1 🟠 Connection name duplicates the data source name
- **What:** the row reads "Notion" under **Connection name** and "Notion" under **Data Source**; Description is empty.
- **Principle:** Nielsen #2, #6 — the column meant to identify *which* account carries no distinguishing information.
- **Why it matters:** two connections to the same source produce two identically-named rows, and Description — the field that would disambiguate them — is empty with no affordance to fill it.
- **Proposed solution:** default the name to something distinguishing (workspace or account), prompt for it in the wizard, and render an empty Description as an "Add a description" affordance rather than a blank cell.

### 5.2 🟠 Sibling tabs offer different tooling
- **What:** Catalog has search and category chips; My Connections has neither.
- **Principle:** Nielsen #4.
- **Why it matters:** tolerable at one connection; the page that grows over time is the one without search.
- **Proposed solution:** give My Connections the same search, plus a filter by source once row counts justify it.

### 5.3 🟡 An "Actions" column that is empty at rest
- **What:** the table declares an **Actions** header but shows nothing under it until hover.
- **Principle:** Nielsen #6 — a labelled column that looks empty reads as missing data.
- **Proposed solution:** if actions are deliberately hover-revealed (as Files and Chats do), drop the header. If the header stays, show the control at rest.

---

# 6 · Metrics

### 6.1 🔴 A 28 × 16 toggle is the first and easiest target in every row
- **What:** each row leads with a toggle measuring **28 × 16 px** — under the 24 px minimum in both dimensions of hit area — followed by name, alias, description and a Built-in badge. ~20 built-in metrics arrive pre-enabled.
- **Principle:** WCAG 2.5.8; Fitts — the easiest target on the row is the consequential one; Nielsen #5.
- **Why it matters:** a mis-click silently changes what the assistant can use, with no undo and no visible consequence on this screen.
- **Proposed solution:** raise the hit area to 24 × 24 via padding; state once above the list what the toggle changes; consider moving it to the row's trailing edge so the metric name is the primary target. If disabling has effects elsewhere, surface them at the moment of the switch.

### 6.2 🟠 Two different labels for the same action on one screen
- **What:** the sweep found both **"Create Metric"** (top right) and **"Add Metric"** (in the group area).
- **Principle:** Nielsen #4 (consistency and standards) — the same action must have one name.
- **Why it matters:** users cannot tell whether these do the same thing, and inconsistent verbs undermine trust in the rest of the labelling.
- **Proposed solution:** pick one verb and use it everywhere. "Create" reads better for something that doesn't exist yet.

### 6.3 🟠 Descriptions truncate exactly where they differentiate
- **What:** "Monthly expenses as a share of monthly income = 100 *…", "Share of total spend going to Housing, in percent. Run…", "…Run EXACTL…". The formula is what gets cut.
- **Principle:** Nielsen #6, #2.
- **Why it matters:** several rows read near-identically ("Housing / Food / Transport / Leisure Expense Share %") and the differentiating content is the part removed.
- **Proposed solution:** two description lines plus a tooltip with the full text. Longer term the formula deserves its own presentation — monospace, wrappable — not prose in a clipped cell.

### 6.4 🟠 The alias — the string users must retype — is truncated
- **What:** aliases (`@nt_housing_expense_share…`, `@nt_top3_expense_concentr…`) sit in a muted middle column and clip.
- **Principle:** Nielsen #6 — this is precisely the string the user must reproduce in the composer's `@` mention.
- **Why it matters:** a truncated alias cannot be typed from memory and there is no copy affordance.
- **Proposed solution:** never truncate the alias; add click-to-copy with confirmation; ideally a "Use in chat" action so it is never retyped.

### 6.5 🟠 "Create metric" dialog offers no guidance for its hardest field
- **What:** Name, Alias (`@` prefix), Definition ("Describe how to compute this metric…", 1500-char counter), Link to (Data Source / Connection), source select. The counter is the only support the Definition field gets.
- **Principle:** Nielsen #10, #2, #5.
- **Why it matters:** built-in definitions contain SQL-like content ("= 100 *…", "SELECT \"Expense Item…\""), so users will try SQL — with no statement of what the field accepts, no example, and no validation before save.
- **Proposed solution:** helper text stating what Definition accepts, with one worked example; validate on blur, not on save; show the alias auto-deriving from the name as the user types so the relationship is visible rather than guessed.

### 6.6 🟡 "Active only" is a switch among chips that do the same job
- **What:** All / Built-in / Custom are chips on the left; "Active only" is a switch on the right.
- **Principle:** Nielsen #4; Von Restorff makes the switch read as a different class of control.
- **Proposed solution:** express it as a fourth chip, or bring both mechanics into one filter cluster.

### 6.7 🟡 Group header carries no count or state
- **What:** rows group under a collapsible "Notion" header with a logo — no count, no active count, no group actions.
- **Principle:** Nielsen #1 — the natural place for "how many, how many active".
- **Proposed solution:** add both counts; let the header carry enable/disable-all if that exists.

---

# 7 · Files

Behavioural defects are already itemised in the dev report (#1, #2, #5, #6, #7, #9, #10, #12, #16). Additional UX-level findings:

### 7.1 🔴 The drop zone's accessible name contradicts the visible text — and reality
- **What:** three different statements about the same thing:
  - visible heading: **"Drag & drop files here"**
  - the button's accessible name: **"Drop .csv, .xls, or .xlsx files here"**
  - the sub-line: "…files you upload are available to query in chats" (no formats)
  - what the list actually contains: **.md and .pdf files**
- **Principle:** Nielsen #2 (match with the real world) and #5; WCAG 2.5.3 (Label in Name) — the accessible name says something the visible label does not.
- **Why it matters:** a screen-reader user is told only three spreadsheet formats are accepted, which is false; a sighted user is told nothing about formats at all. Users will either not try a supported file or will be surprised when one is rejected.
- **Proposed solution:** one statement of accepted formats, in one place, matching what the uploader actually accepts. Visible text and accessible name must be the same sentence.

### 7.2 🔴 Every row's `···` menu has no accessible name
- **What:** 12+ unnamed buttons on the page — one per file row.
- **Principle:** WCAG 4.1.2.
- **Proposed solution:** `aria-label="More actions for <filename>"` plus the tooltip from dev report #6.

### 7.3 🟠 Row buttons announce the entire row as their name
- **What:** row targets have accessible names like "MD insightis-audit-v1-decisions.md Uploaded 1.4 KB 6h ago".
- **Principle:** WCAG 2.4.6 — a name should identify, not recite.
- **Proposed solution:** name the control by the filename; leave size, type and date as cell content in a properly-marked-up table row.

### 7.4 🟡 The type badge repeats the file extension
- **What:** each row shows a coloured extension chip (MD, PDF, CSV) beside a filename that already ends in that extension.
- **Principle:** Nielsen #8.
- **Proposed solution:** keep the icon for scanability and drop the redundant text, or drop the extension from the displayed name.

### 7.5 🟡 The drop zone occupies a third of the first screen permanently
- **What:** a full-width dashed zone above the list at all times, regardless of file count. *(Our own design deliberately keeps it visible — Files spec rule 1 — so this is a decision to revisit, not a defect.)*
- **Proposed solution:** worth measuring. If uploads are rare relative to browsing, a compact upload button plus a full-page drag overlay gives the same capability far cheaper. Flagged as a question for the design owner.

---

# 8 · Dialogs and overlays

Sizing, padding and button-variant defects are dev report #10, #12, #17. UX-level:

### 8.1 🟠 Destructive confirms never name the object
- **What:** "Delete chat?" — "This action can't be undone. The chat will be permanently removed."
- **Principle:** Nielsen #5 — a destructive confirm should name what is being destroyed.
- **Why it matters:** kebabs are opened by hovering rows, so having the wrong row's menu open is easy. The confirm is the last chance to catch that and it withholds the one fact that would.
- **Proposed solution:** include the title — "Delete «Ввод случайного текста»?" — truncated with a tooltip when long. Same for files.

### 8.2 🟡 Focus on an irreversible action
- **What:** the footer is Cancel (secondary) + Delete (destructive, filled).
- **Principle:** Nielsen #5; Fitts.
- **Proposed solution:** the filled destructive button is fine — it makes the outcome unmistakable — but initial focus belongs on Cancel, and Enter should not commit the deletion.

---

# 9 · Errors — what they are and when they fire

Observed states, their trigger, and what is wrong with each.

| Error | When it fires | Problem | Proposed solution |
|---|---|---|---|
| **404 "Page not found"** | any unknown path — including plausible ones: `/sources/connections` 404s while the real route is `/sources/my-connections` | Renders **inside** the Data Sources shell with **Catalog underlined as active** — the navigation asserts a location the body denies | Render 404 standalone, or keep the shell with no tab active. Also alias the obvious near-miss routes rather than 404ing them |
| **404 recovery** | same | Primary action is **"Go to New Chat"** — a user who mistyped a Data Sources URL does not want a new conversation | Make the primary action the parent section when the path implies one; keep "Go back" |
| **Connection test failure** ("Password is not specified") | Step 1 of the New connection wizard, on Test | Dialog not centred, double backdrop, host Save stuck in a loading state — dev report #4 | See dev report #4 |
| **Assistant clarification** ("Нужен уточняющий запрос") | the message contains no question or data | Rendered identically to a normal answer — no icon, no state colour. The user cannot tell an answer from a non-answer while scanning | Give non-answers a distinct, quiet treatment (icon + label such as "Needs more detail") so scanning a conversation shows where the thread stalled |
| **Language mismatch** | the assistant replied in **Russian** to a Russian-looking input, inside an otherwise **English** interface | No language control and no indication that the reply language is derived from the input | State the behaviour, or offer a response-language setting. At minimum set `lang` on the message so screen readers switch voice (WCAG 3.1.2) |

### Error states not yet reachable — and worth designing before they appear
Named because their absence is itself a risk:
- **Query returns no rows** — distinct from "I don't understand"; needs its own copy and a suggestion to widen the question.
- **Query fails / times out** — long-running analytical queries are the norm in this product category; needs progress, a cancel action and a retry.
- **Connection expires or credentials rotate** — the connection silently stops working; needs a persistent banner on the connection and a warning at query time.
- **Balance exhausted** — the sidebar shows a credit balance, so a zero state exists by construction; it needs a designed blocking state, not a failed request.
- **Upload rejected** (wrong format, too large) — related to 7.1: the app currently states three different things about accepted formats.
- **Session expiry** — what happens to a half-typed message.

---

# 10 · Responsive

### 10.1 What is established
- Responsive rules exist at the standard Tailwind breakpoints: `min-width: 640 / 768 / 1024 / 1280 / 1536`, plus a `max-width: 600` block — **128 media rules total** across all stylesheets.
- `prefers-reduced-motion` is respected (11 rules).
- A `(hover: none) and (pointer: coarse)` rule exists, so touch input was considered.

### 10.2 🟠 The breakpoint budget looks thin for the layouts involved
- **What:** 63 rules at `md`, 22 at `lg`, 16 at `sm` for an app containing a fixed sidebar, a three-column file view with a resizable preview panel, wide data tables (Metrics: toggle + name + alias + description + badge; Connections: 4 columns) and a 203-tile grid.
- **Why it matters:** wide tables and a fixed sidebar are exactly the constructs that need per-breakpoint work — column dropping, priority columns, a drawer sidebar. The rule count suggests that work may not have been done for the data-dense screens.
- **Proposed solution:** verify each data-dense screen at 390 / 768 / 1024 and decide a column-priority order per table before the layout is squeezed by content.

### 10.3 Could not verify
Viewport emulation did not take effect in the automation tab (`innerWidth` stayed at 1512 after resizing), so **no narrow-width rendering was actually observed**. 10.2 is inferred from the stylesheet, not seen. This needs a manual pass — it is the largest remaining gap in this audit.

---

# 11 · Common problems in this product category, and how they are usually solved

Insightis is a natural-language-over-your-data product. The failure modes below are well documented in that category; each is checked against what prod does today.

| Common problem | Standard solution | Insightis today |
|---|---|---|
| **Users don't know what they can ask** | seeded example prompts, tied to the user's actual connected data | Suggestion chips exist ("What needs my attention?", "Show key trends", "Summarize my data") but are generic and stay in the DOM after the chat starts (3.1). They are not derived from the connected source |
| **Answers can't be trusted without provenance** | show the query that ran, the rows used, and the source, with a way to open them | Not observed. This is the single biggest gap for a data-answer product — an answer with no visible derivation cannot be verified or defended to a colleague |
| **Silent scope** — the answer depends on which sources are active | scope shown persistently near the composer and repeated on each answer | The trigger says only "Connections" and never its state (3.2) |
| **Long queries feel broken** | streaming, a progress or stage indicator, and a cancel action; Doherty threshold beyond ~400 ms | Not measured; no cancel affordance observed. Worth confirming before scale |
| **Hallucinated or empty results read like answers** | visually distinct treatment for "no data" and "cannot answer" | Clarification replies look exactly like answers (§9) |
| **Metric definitions drift from what the business means** | a governed metric layer with owner, definition, last-changed | Metrics exist with alias and definition — a genuine strength — but with no owner, no version and no "used in N chats" |
| **Repeat questions get retyped** | saved or pinned questions, and re-runnable answers | Chats can be pinned; individual questions cannot be saved or re-run |
| **Connections quietly break** | health status per connection with last-checked time | The Connections table has no status column at all (§5) |
| **Users can't share an answer** | export / permalink / copy-as-image | A Copy button exists on messages; no export or share observed |
| **Cost is invisible until it runs out** | show consumption per action, warn before exhaustion | A balance is shown; per-query cost and any warning threshold were not observed |

---

# Not audited yet

- **Onboarding / first run** — no empty-state or first-connection flow was reachable on this account.
- **The connection wizard end-to-end** — only the failed-test state was seen; step 2, success and OAuth-style flows are unaudited.
- **My account / Manage plan / Balance / Leave feedback** — the four account-menu destinations were not opened.
- **Keyboard-only traversal, focus order, focus traps in dialogs, screen-reader output** — the sweep found no positive `tabindex` and no duplicate ids, but no actual keyboard or SR pass was run.
- **Colour contrast** — not measured; 3.5 and 3.4 are the likely candidates.
- **Real latency** against the Doherty threshold.
- **Chats Library at scale** — search, pinning and bulk actions were only seen with one conversation.

# What I could not verify

- Viewport emulation did not apply, so §10 rests on stylesheet analysis rather than observed rendering.
- The paperclip produced a tooltip but no in-app menu in this pass; the attach flow beyond that is unconfirmed.
- The Popular-connectors shortlist in 4.1 needs real usage data; the recommendation is a pattern, not a list.
- Dialog findings (§8) were confirmed on "Create metric" and "Delete chat?" and are assumed to generalise.
