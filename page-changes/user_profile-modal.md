# Account modal (Balance + Manage plan) — page-level changes

**Page:** Account / Settings modal
**Handoff:** [`../pages/approved/user_profile-modal.html`](../pages/approved/user_profile-modal.html)
**Status:** ✅ Approved (погоджено) — 2026-06-30

## Hard rules — read before editing this page

These are locked decisions. Do not change without explicit approval.

| # | Rule |
|---|---|
| 1 | Balance's hero credit number (the `.acct-bal-amount` supporting text in V1's Free/Pro/Exhausted states) reads "left" (e.g. "827 left"), not "credits remaining" or "credits left". Agreed wording — do not add "credits" back. |

The account modal carries a **section-aware concept version toggle** in the topbar. It flips the
active section between its available versions. **Balance** has three, each a different
visualization approach: **V1** = single overall bar + text-forward tiles; **V2** = one two-zone
combined bar (the default); **V3** = two separate per-pool bars. **Manage plan** has two:
V1 = 3 plan cards, V2 = **feature comparison table**. Both carry the same plan data, mirrored from
the live pricing page. The toggle shows only the versions
the current tab has and falls back to that tab's highest version when a version is missing.
**Buy Credits** has **two placement versions** toggled from the topbar (Balance-only): *inline*
(3 compact packs as a block on Balance — the default) or *page* (a mini-banner on Balance that opens
a separate Buy-credits page). "Upgrade Plan" opens the Manage plan tab. **Credit usage** on
Balance is its own **always-visible section** (a plain `.acct-section` with the usage table shown
in full — no expand/collapse); the preceding Buy-credits section's border supplies the divider above.

## Components changed on this screen

| Component | Change summary | Detail |
|---|---|---|
| SegmentedControl | Reused as (a) the topbar V1/V2 concept switch, (b) the billing-period toggle — no component change | [changes/SegmentedControl.md](../changes/SegmentedControl.md) |
| AccountModal | Balance V1/V2/V3 credit-bar concepts (default V2) + inline Buy-credits block (3 token-first packs) + always-visible Credit usage; Manage plan V1 cards / V2 comparison table; standard Billing (plan · payment · history) | — (page composition) |

No kit **component** was modified. The kit `.progress` component is untouched — the two-zone bar is
a page composition (like the existing V1 bar), built from page-layout classes reading kit tokens.

## Entry from the account popover (all pages)

Every page's sidebar account popover routes its items into this modal on the matching tab.
Each consuming page has a delegated click handler mapping the item label to a `?section=`
param (`my-account`, `manage-plan`, `billing`, `balance`, `leave-feedback`); Resources
(external) and Log out are not routed. On load the modal reads `?section=` and calls
`acctSetSection()` for that tab, falling back to **Balance** when the param is absent/unknown
(so this file still opens as the standalone Balance concept demo). See
[changes/AccountPopover.md](../changes/AccountPopover.md#item-routing-consumer-wiring).

**Fix (routing was dead):** on all four consuming pages (chat-landing, chats-landing,
chat_page-landing, data-sources_files-landing) the routing handler lived inside the main page IIFE,
which threw earlier at load — so the `addEventListener` never registered and clicking a popover item
did nothing. The handler was moved into its own **standalone `<script>` block before `</body>`**, so
it registers independently of any earlier script error. Verified: clicking Manage plan / Billing
navigates to `user_profile-modal.html?section=…` and the modal opens on that tab.

## Layout / composition changes (Balance section)

- **Version toggle (section-aware)** — a `.segctrl is-sm#concept-toggle` (role="tablist") in the
  **topbar, next to the Light/Dark toggle** (concept switchers always live with the theme toggle,
  never in page content — same placement as the Files page Cards/Table toggle). `setConceptVersion`
  stores a preferred version, then `applyConceptVersion()` applies it to the **active section only**:
  it shows that version's `[data-ver]` panel (or the section's highest available version as a
  fallback), and shows/hides the toggle buttons to match what the section offers. Re-runs on every
  section change, so Balance shows `V1 / V2 / V3` while Manage plan shows `V1 / V2`. Default
  preference is **V2**.
- **Opens on the Balance tab by default** — with no `?section=` param the modal falls back to
  the Balance section, so this window still lands directly on the concept under review.
- **Two-zone credit bar (V2)** — bar length = total pool (1,040). Two flex zones encode the split:
  **Subscription** = blue `--brand-tertiary` at 48.08 % width (500 / 1,040); **Purchased** = green
  `--fb-green` at 51.92 % (540 / 1,040). Each zone is a soft "available" track
  (`--balance-subscription-track` / `--balance-purchased-track`) holding a solid "used" fill
  (subscription fill 42.6 % = 213 / 500; purchased 0 %). The 2 px card-coloured seam between the
  zones marks the subscription-limit break visually. **Colours + names match the sidebar credits
  popover** (`.sbx-pop-tokens`: Subscription = blue coin + `--brand-tertiary`, Purchased = green
  coin + `--fb-green`) so the two surfaces read as one system.
- **Simplified readout (less clutter)** — two de-duplication passes: (1) the standalone
  "Monthly limit 1,584 / 2,124 total" tick row was removed, and (2) the **stat tiles were dropped
  from V2** — the legend already states each pool's name, usage *and* total
  (`Subscription 213 / 500`, `Purchased 0 / 540`), so the tiles only repeated `500` / `540`.
  The legend is a **stacked key** (`flex-direction:column`, one pool per row) so it's not a loose
  horizontal run: "● Subscription **213 of 500** used" / "● Purchased **0 of 540** used" — the
  fraction is bolded as one group and "total" dropped (the bar + the summary line establish the
  usage context). The bar is **14px** tall (was thin at 10px; V1's single bar was likewise bumped
  4px → 14px). V2 now reads legend → bar → summary (`20% used` · `827 remaining`) with symmetric `.5rem`
  breathing room around the bar, then the Credit-usage table.
- **V1 — single bar + simple tiles** — V1 keeps its single overall bar and two plain stat tiles
  ("Subscription credits" `500` / "Purchased credits" `540`, label + total only). An attempt to
  make the tiles "text-forward" (left / total / renewal-expiry per tile) was **reverted at the
  user's request** — too complex; the tiles are back to the simple label + number.

### Balance V3 — separate per-pool bars (default)

Reference-backed (OpenAI/Vercel usage dashboards, SaaS credit-widget write-ups: one glanceable bar,
lead with what's *left*, add reset/expiry context). Where V2 combines both pools into one two-zone
bar, **V3 gives each pool its own full-scale bar** so they read independently without shared-scale
ambiguity:

- **Two labelled bars** (`.acct-bal3-seg` / `.acct-bal3-grp` / `.acct-bal3-track`) — Subscription
  (blue `--brand-tertiary`, 42.6 % used) and Purchased (green `--fb-green`, 0 % used). Each bar is
  full-width for its own pool.
- **Head + foot text per bar** — head = pool name (dot) + credits **left**; foot = "213 of 500
  used". (Renewal / expiry notes were removed at the user's request — same as the V1-tiles revert.)
  No new tokens.

### Demo-account data — the account is on the Free plan everywhere

One fictional account across all surfaces: **Free plan** → Subscription pool = 500 credits /
month (213 used, 287 left, 42.6 %), Purchased pool = 540 (0 used) → total 1,040, 213 used
(20 %), 827 remaining. The same numbers drive the modal's Balance (all three bar versions), the
sidebar footer usage row (`213 / 500`, 42.6 % bar) and tokens popover (plan name **Free**,
Subscription `213 of 500`, Purchased `0 of 540`) on all six pages, the storybook's Expected
sidebar/popover demos, and the user row meta (`Admin · Free`).

## Layout / composition changes (Manage plan section)

### Current plan + contextual CTAs

The account's current plan is **Free**, mirrored consistently across both Manage-plan versions
and the **Billing** tab ("Current plan: Free · $0 / month" — no renewal line, a free plan has no
next charge; past Starter invoices stay in Billing history). CTAs are **contextual to the
current plan** — the pattern used by Linear, Vercel, and Notion's own billing settings
([Linear billing docs](https://linear.app/docs/billing-and-plans),
[Notion billing help](https://www.notion.com/help/upgrade-or-downgrade-your-plan)) — current-plan
management surfaces label the active plan and offer upgrades, never re-run the acquisition flow:

| Plan | CTA | State |
|---|---|---|
| **Free** | **"Current Plan"** | **disabled**, outline, `badge-secondary` "Current Plan" tag next to the name |
| Starter | "Upgrade to Starter" | enabled, outline |
| Pro | "Upgrade to Pro" | enabled, filled |

Both paid plans carry the pricing page's **50% OFF promo** — a `badge-green` "50% OFF" tag next to
the name + a struck-through was-price wired to the billing-period toggle (Starter $9.99 ~~$19.99~~,
yearly $5.99 ~~$11.99~~; Pro $19.99 ~~$39.99~~, yearly $11.99 ~~$23.99~~) — mirroring the live
pricing page. The discount never shows on the current plan itself (Free has no promo).

**The recommended plan carries no accent border** — neither on the Pro card (all three cards keep
the neutral `--border`) nor on the table column. "Most popular" is signalled by text markers only:
the V1 "POPULAR" badge / V2 card ribbon, plus the table-header tag.

**Card row order: tagline sits between the name and the price** (name row → tagline → price row →
CTA → features), in both versions — the audience line ("For getting started" / "For small teams" /
"For growing teams") qualifies the plan name, not the price, so it reads directly under the name
(6px, the card gap) with slightly more air before the price (12px).

### V1 — plain in-app cards

Free / Starter / Pro cards, one CTA each per the table above. Pro carries "50% OFF" + inline
"POPULAR" badges; Starter carries "50% OFF". Taglines "… · per user" on the paid tiers;
price "/ month".

### V2 — pricing cards + a full comparison table (two distinct surfaces, not three)

**Two surfaces, each with a distinct job, no information repeated across both:**

- **Pricing cards (quick pick)** — Free / Starter / Pro cards above the table, same contextual CTA
  logic as V1 (disabled "Current Plan" with `badge-secondary` tag on Free / Upgrade to Starter /
  Upgrade to Pro). Pro keeps its `.acct-plan-ribbon` "Most popular" ribbon, and each card carries
  its full `<ul class="acct-plan-feats">` feature list, byte-identical to V1's per plan (matching
  the site).
- **Comparison table (full spec)** — `<thead>` is **name-only** (no price, no CTA — those live
  once, on the cards above); a small `badge-secondary` "Current Plan" tag on Free and
  `.acct-cmp-tag` "Most popular" on Pro keep orientation while scrolling the long feature list
  without repeating the price/button a third time.
- **No `<tfoot>`** — the cards' CTA is the only action surface; a footer repeat would reintroduce
  the 3-surface duplication this was meant to avoid.
- The **misleading "Every plan includes the Semantic Layer, AI Chat, and 200+ connectors" line
  stays deleted** — it directly contradicted the table (Free correctly shows `—` for Semantic
  layer).
- **Recommended column carries no highlight of its own** — no border, no fill; the header
  `.acct-cmp-tag` "Most popular" pill is the only column marker, keeping the grid calm.
- **Modern table treatment** — `border-collapse:separate` (spacing 0) so the grey
  `--mx-group-band` group bands round their corners (`.5rem`) and drop their bottom border (the
  fill itself separates sections); no header underline (the first group band anchors the grid);
  roomier `.625rem` vertical cell padding. Group-band rows are a single `<td colspan="4">`.
- Feature grouping (four bands: Plans & usage / AI & analytics / Data / Support & security) is
  unchanged.
- The billing toggle re-uses `acctSetPlanPeriod` on the cards' price spans, same as V1.
- **Responsive:** unchanged — `.acct-cmp-wrap{overflow-x:auto}` with `min-width:34rem`, scrolls
  inside its own container on the mobile sheet; verified no page/content overflow at 375 px.

Default view is still V2 (highest available version for this section).

### Entry from the sidebar tokens popover (all pages) — fix

The `.sbx-pop-tokens` popover (opened from the sidebar's token/credits row — present on all 6 pages
with a sidebar: 4 `pages/concept/*.html` + 2 `pages/approved/*.html`) has **Buy Credits** / **Upgrade
Plan** CTAs that were previously inert (no `onclick`). Wired on every page: Buy Credits →
`user_profile-modal.html?section=balance`; Upgrade Plan → `?section=manage-plan` (from
`pages/approved/*.html`, prefixed `../concept/`, matching that folder's existing relative-link
convention). See [changes/Sidebar.md](../changes/Sidebar.md#tokens-popover-cta-routing-consumer-wiring).

### Casing — "Change Password" trigger is Title Case (user decision)

The "Change Password" trigger in My account is **Title Case**, per direct user instruction ("мав
бути тайтл кейс") — it's an action trigger (a button styled as a `.link`), so it follows the
button Title Case rule, not the link Sentence-case rule. **Everything else keeps Sentence case**:
the modal section titles (`acctSectionTitles`: "My account", "Manage plan", "Buy credits", …, per
the kit-wide dialog-title convention — "New connection", "Create metric"), left-nav menu items,
and form labels ("Current password", "New password").

Plan data (both versions): current plan **Free** $0; Starter $9.99 (50% off $19.99); Pro $19.99
(50% off $39.99), "Most popular"; per user / month for paid; "AI credits / month" 500 / 5,000 /
25,000; Pro = Unlimited users; no Enterprise tier (the page has none).

**Copy rule (locked): the unit is always "credits", never "tokens"** — pack unit text, plan
features ("AI credits / month"), the usage-table "Spent credits" column. "Tokens" survives only in
internal identifiers (`.acct-bc-tokens`, `.sbx-pop-tokens`) and design-token prose.

## Buy-credits — 3 credit packs, 2 layouts (ride the V1/V2/V3 toggle)

Buy credits offers **three credit packs** — Small 5,000 credits $9.99 / Medium 12,500 credits
$19.99 / Large 20,000 credits $29.99 — with **two layouts** wired to the **same topbar V1/V2/V3
concept toggle as the credit bars** (`[data-buyver]` panels inside the shared `#acct-buy-block`;
`applyConceptVersion` switches them alongside the `[data-ver]` bar panels; `data-buyver` holds a
space-separated list of the versions a panel serves):

- **V1 — card rows with a coin** (`.acct-bc-rows` / `.acct-bc-row`): one pack per row, **each row
  a card** (`--card` surface + `--border`, radius `.5rem`, ghost shadow — the same tile recipe as
  `.acct-bc-pack` laid out horizontally, stacked with a `.75rem` gap). The row is a **compact
  single line** (`.5rem` vertical padding, ~46px tall) with **two anchors — what you get and
  what you pay**: a leading **green credits coin** (`.acct-bc-row-coin`, 24px — the popover's
  full-size coin, not the 16px `sm` one; `coin-green.svg`, the purchased-pool icon) →
  fixed-width tier name (`.acct-bc-row-name`, 4.5rem so the numbers column-align across rows;
  14px/500/**`--ink-secondary`** — colour, not weight, keeps it secondary) → the bold credit
  count (16px/700/`--ink` + muted unit) → the **bold price** (`.acct-bc-row-price`,
  16px/600/`--ink`, tabular-nums — the decision driver, as visible as the count) → **`btn-xs`**
  outline **Buy** (28px, natural width — no stretched button). Static informational cards — no
  card-hover recipe.
- **V2 + V3 — pack tiles in a tinted tray** (`.acct-bc-grid` / `.acct-bc-pack`, one shared
  `data-buyver="v2 v3"` panel): 3-up cards (1-col on narrow) on a neutral `--bg` tray;
  per-tile hierarchy: tier title (`.acct-bc-name`, 14px/600/`--ink`) → credit count
  (`.acct-bc-tokens`, 20px/700) → muted price → full-width outline **Buy**. Tiles are static (the
  button is the action) — no card-hover recipe. This layout is also what the separate buy-credits
  sub-page shows.

**Medium is the recommended pack** — marked by text/shape, never colour alone, with a layout-fit
recipe per surface (one visual language doesn't fit both a tall card and a 46px single-line row):

- **Tiles** (`.acct-bc-pack`, V2/V3 + the buy-credits sub-page) — the same `.acct-plan-ribbon`
  "Most popular" ribbon the Manage-plan cards use (`.acct-bc-pack` is `position:relative` to
  anchor it).
- **Card rows** (`.acct-bc-row`, V1) — the ribbon needs vertical clearance the compact
  single-line row doesn't have (it collided with the row above), so this surface gets its own
  recipe: a `--brand-primary` **border** (`.acct-bc-row.is-popular`) + a small **star icon**
  (`.acct-bc-row-star`, 16px, `role="img" aria-label="Most popular"` — the accessible name
  carries the text, not colour alone) **after** the tier name. The name column widened
  `4.5rem → 5.5rem` to fit "Medium" + the star without wrapping/clipping (verified:
  `scrollWidth ≤ clientWidth` on every row). Placing the star **after** the text keeps the left
  vertical intact — every row's tier-name text starts at the identical x-position (verified) since
  nothing precedes it; only Medium carries the trailing icon.

Shared anatomy rules (locked, apply to every layout):

- **Tier titles always present** — Small / Medium / Large (14px/600/`--ink`), never removed.
- **Section header is a tight group** — the "Buy credits" title and its helper line sit in their
  own `.25rem`-gap wrapper, so the section's `1rem` gap separates header → content instead of
  spreading title and description 1rem apart.
- **No divider under the section** — `#acct-buy-block` (and the placement mini-banner) set
  `border-bottom:none`; the default `.acct-section` rule under the packs read as a stray extra
  line ("no need in extra divider under the section").
- **Multiple peer Buy buttons are outline** — three side-by-side filled primaries over-weight the
  section; `.btn-primary` is reserved for a lone CTA (the mini-banner, the sidebar popover).

**Two placement versions, toggled from a topbar `#placement-toggle` (Balance-only, independent of the
bar-version toggle — the 2nd axis)** via `setBuyPlacement` / `applyBuyPlacement`:

- **Buy inline (default)** — the packs live in an on-Balance block (`#acct-buy-block`, outside the
  `[data-ver]` panels so it's shared across V1/V2/V3).
- **Buy page** — the block is hidden and a compact **mini-banner** (`#acct-buy-banner`, coin icon +
  "Need more credits? → Buy Credits") shows in its place, opening a separate **Buy-credits page**
  (`data-section="buy-credits"`, always the tile layout). While that page is active the modal
  header shows a back chevron (`#acct-hdr-back`) → Balance.
- **Hero row has no Buy Credits button in either mode** — the hero `.acct-bal-btns` /
  `.acct-bal-btns-mob` now carry only **Upgrade Plan**. The hero-row Buy Credits CTA
  (`acctBuyCreditsClick`) was removed as a duplicate action: in *inline* mode the packs already sit
  on the page, and in *page* mode the mini-banner carries its own Buy Credits button — the hero copy
  never added a reachable action the banner/packs didn't already offer. The banner icon box
  (`.acct-buy-banner-ic`) now shows the kit's green coin glyph (`coin-green.svg`, same asset as the
  sidebar tokens popover's purchased-pool icon) instead of a generic plus, so the CTA visually reads
  as "credits" rather than a generic add action.

Common:

- A single concise line — "Purchased credits never expire — they're used only after your monthly
  credits run out." The verbose intro ("Top up your balance… You have 1,451 remaining") **and** the
  optional **Auto top-up** row (switch + threshold/amount selects) were **removed** to de-clutter the
  section per user feedback ("секція дуже ускладнена"). The packs' Buy CTAs are pinned to the card
  bottom (`margin-top:auto`) so they align on one line across all three tiles.

No trust/reassurance badge strip — the templated "secure checkout · one-time purchase · credits
never expire" triplet was removed as it read as generic AI-marketing filler and duplicated the
intro line; payment-security reassurance belongs on the external checkout step, not the selection
screen. (The shared `.acct-plan-trust` class went with it — it had no other consumer.)

The **final payment** step is out of scope (Buy buttons hand off to an external secure-checkout
tool; page carries the `pg-wip-tag`).

## New tokens (kit-theme.css)

- `--balance-subscription-track` = `color-mix(--brand-tertiary 18%, --progress-track)`
- `--balance-purchased-track` = `color-mix(--fb-green 18%, --progress-track)`

Both mix over the theme-aware `--progress-track`, so they re-resolve per theme with no `.dark`
override. `FALLBACK_TOKEN_NAMES` in `insightis-preview-kit.html` was regenerated to include them.

## Out of scope

- **In-modal navigation is wired**: Balance "Upgrade Plan" → Manage plan tab (hero row, all three
  bar versions); "Buy Credits" on the mini-banner → Buy-credits sub-page. **Closing the modal** (X button, Escape, and the
  mobile header close) returns to the **page the user came from** via `history.back()` — consuming
  pages navigate here with `?section=…`, so history holds the app page that opened the modal. The
  fallback when there's no in-app history (this file opened directly) **navigates to the chat
  landing page** (`chat-landing.html`) rather than leaving an empty screen behind the dismissed
  modal. **Actual checkout / payment** (the Buy-pack buttons and the in-card plan CTAs) is out of
  scope; the page carries the `pg-wip-tag "In redesign"` badge.
- **Balance V1 is no longer a verbatim prod copy** — at the user's request its stat tiles gained the
  clearer left/total/renewal text. It remains the "text-forward" comparison point against V2/V3.

## A11y / consistency self-check

- [x] Colour-token discipline: the only new colour expressions are the two `--balance-*-track`
      tokens in `:root`; all page/component rules read `var(--token)` (no inline `color-mix`, no raw
      hex).
- [x] Not colour-alone (1.4.1): each pool is labelled — V1 tile label, V2 legend dot + text, V3 the
      per-bar head/foot text; the V2 zones and each V3 bar expose an `aria-label` with the breakdown.
- [x] Segctrl: `role="tablist"` + `aria-selected`; `.segctrl-btn` focus-visible ring already defined.
      Version labels are plain text (not `.segctrl-lbl`) so they stay visible at ≤767 px.
- [x] Field-label consistency: every section's label-over-value rows use `.acct-sect-title` (bold
      heading) — Billing's "Current plan" / "Payment method" were aligned from the muted
      `.acct-field-label` to match "Your email" (My account) and "Billing history".
- [x] Casing: the popup/dialog title (`#acct-modal-title` + mobile title) is **Title Case**
      ("My Account", "Manage Plan", "Buy Credits", …) per the kit dialog-title convention; left-nav
      menu items + in-content section headings stay Sentence case. See `pages/changes/AccountModal.md`.
      Plan-card **CTAs** are Title Case too ("Start for Free", "Start Free Trial").
- [x] Plan-card CTA alignment: `.acct-plan-per` is forced to its own line (`flex-basis:100%`) so
      every price row is exactly two lines — the CTAs then line up across Free / Starter / Pro
      (previously Free's one-line "$0 / month" sat higher than the wrapped "/ user / month" cards).
      Taglines sit above the price row, aligned by the one-line name rows.
- [x] Legend / summary labels `--ink-secondary` (Slate-550 / Grey-300) ≥ 4.5:1 — pass.
- [x] Fill colours now match the credits popover: subscription `--brand-tertiary` (`#0D8E97` light)
      and purchased `--fb-green` (`#009966` light) each clear the 3:1 UI-graphic target (1.4.11) on
      the white card — an improvement over the previous amber `--fb-attention` (2.89:1). Both are
      canonical kit tokens reused from the popover, not new values.
- [x] Manage plan (both versions): CTA state matches the account's actual plan — Free shows
      disabled "Current Plan" with a `badge-secondary` text label (never colour/border alone);
      Starter and Pro get real, actionable CTAs. Verified via computed `disabled`/`textContent`
      in-browser.
- [x] Manage plan: the recommended plan is signalled by **text markers** — the V1 "POPULAR"
      badge / V2 card ribbon ("Most popular") and the tag in the table header — never colour or
      border alone (no card/column accent border, no column fill).
- [x] Discount is not colour-alone: the green "50% OFF" `badge-green` tag carries the promo as
      text, and the struck-through was-price (`--ink-inactive`, `line-through`) restates it in
      the price row.
