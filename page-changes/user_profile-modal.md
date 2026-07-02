# Account modal (Balance + Manage plan) — page-level changes

The account modal carries a **section-aware concept version toggle** in the topbar. It flips the
active section between its available versions. **Balance** has three, each a different
visualization approach: **V1** = single overall bar + text-forward tiles; **V2** = one two-zone
combined bar; **V3** = two separate per-pool bars (the default). **Manage plan** has two:
V1 = current pricing table, V2 = **cleaned-up pricing table** (one recommended CTA + ribbon). Both
carry the same plan data, mirrored from the live pricing page. The toggle shows only the versions
the current tab has and falls back to that tab's highest version when a version is missing.
"Buy Credits" opens a dedicated **Buy-credits** sub-page (with a Back control); "Upgrade Plan" opens
the Manage plan tab.

## Components changed on this screen

| Component | Change summary | Detail |
|---|---|---|
| SegmentedControl | Reused as (a) the topbar V1/V2 concept switch, (b) the billing-period toggle — no component change | [changes/SegmentedControl.md](../changes/SegmentedControl.md) |
| AccountModal | Balance V1/V2/V3 credit-bar concepts + new Buy-credits sub-page; Manage plan V2 cleaned-up pricing table | — (page composition) |

No kit **component** was modified. The kit `.progress` component is untouched — the two-zone bar is
a page composition (like the existing V1 bar), built from page-layout classes reading kit tokens.

## Entry from the account popover (all pages)

Every page's sidebar account popover routes its items into this modal on the matching tab.
Each consuming page has a delegated click handler mapping the item label to a `?section=`
param (`my-account`, `manage-plan`, `billing`, `balance`, `leave-feedback`); Resources
(external) and Sign out are not routed. On load the modal reads `?section=` and calls
`acctSetSection()` for that tab, falling back to **Balance** when the param is absent/unknown
(so this file still opens as the standalone Balance concept demo). See
[changes/AccountPopover.md](../changes/AccountPopover.md#item-routing-consumer-wiring).

## Layout / composition changes (Balance section)

- **Version toggle (section-aware)** — a `.segctrl is-sm#concept-toggle` (role="tablist") in the
  **topbar, next to the Light/Dark toggle** (concept switchers always live with the theme toggle,
  never in page content — same placement as the Files page Cards/Table toggle). `setConceptVersion`
  stores a preferred version, then `applyConceptVersion()` applies it to the **active section only**:
  it shows that version's `[data-ver]` panel (or the section's highest available version as a
  fallback), and shows/hides the toggle buttons to match what the section offers. Re-runs on every
  section change, so Balance shows `V1 / V2 / V3` while Manage plan shows `V1 / V2`. Default
  preference is **V3**.
- **Opens on the Balance tab by default** — with no `?section=` param the modal falls back to
  the Balance section, so this window still lands directly on the concept under review.
- **Two-zone credit bar (V2)** — bar length = total pool (2,124). Two flex zones encode the split:
  **Subscription** = blue `--brand-tertiary` at 74.58 % width (1,584 / 2,124); **Purchased** = green
  `--fb-green` at 25.42 % (540 / 2,124). Each zone is a soft "available" track
  (`--balance-subscription-track` / `--balance-purchased-track`) holding a solid "used" fill
  (subscription fill 42.5 % = 673 / 1,584; purchased 0 %). The 2 px card-coloured seam between the
  zones marks the subscription-limit break visually. **Colours + names match the sidebar credits
  popover** (`.sbx-pop-tokens`: Subscription = blue coin + `--brand-tertiary`, Purchased = green
  coin + `--fb-green`) so the two surfaces read as one system.
- **Simplified readout (less clutter)** — two de-duplication passes: (1) the standalone
  "Monthly limit 1,584 / 2,124 total" tick row was removed, and (2) the **stat tiles were dropped
  from V2** — the legend already states each pool's name, usage *and* total
  (`Subscription 673 / 1,584`, `Purchased 0 / 540`), so the tiles only repeated `1,584` / `540`.
  The legend is a **stacked key** (`flex-direction:column`, one pool per row) so it's not a loose
  horizontal run: "● Subscription **673 of 1,584** used" / "● Purchased **0 of 540** used" — the
  fraction is bolded as one group and "total" dropped (the bar + the summary line establish the
  usage context). The bar is **14px** tall (was thin at 10px; V1's single bar was likewise bumped
  4px → 14px). V2 now reads legend → bar → summary (`32% used` · `1,451 remaining`) with symmetric `.5rem`
  breathing room around the bar, then the Credit-usage table.
- **V1 — single bar + simple tiles** — V1 keeps its single overall bar and two plain stat tiles
  ("Subscription credits" `1,584` / "Purchased credits" `540`, label + total only). An attempt to
  make the tiles "text-forward" (left / total / renewal-expiry per tile) was **reverted at the
  user's request** — too complex; the tiles are back to the simple label + number.

### Balance V3 — separate per-pool bars (default)

Reference-backed (OpenAI/Vercel usage dashboards, SaaS credit-widget write-ups: one glanceable bar,
lead with what's *left*, add reset/expiry context). Where V2 combines both pools into one two-zone
bar, **V3 gives each pool its own full-scale bar** so they read independently without shared-scale
ambiguity:

- **Two labelled bars** (`.acct-bal3-seg` / `.acct-bal3-grp` / `.acct-bal3-track`) — Subscription
  (blue `--brand-tertiary`, 42.5 % used) and Purchased (green `--fb-green`, 0 % used). Each bar is
  full-width for its own pool.
- **Head + foot text per bar** — head = pool name (dot) + credits **left**; foot = "673 of 1,584
  used". (Renewal / expiry notes were removed at the user's request — same as the V1-tiles revert.)
  No new tokens.

## Layout / composition changes (Manage plan section)

V2 is a **cleaned-up version of the pricing table** (V1). An earlier V2 draft piled on a usage
strip, promo line, "save 40%" toggle, per-card outcome lines, delta-feature leads, an Enterprise
bar and a reassurance row — the user found it **too complex**, so V2 was cut back to the essentials.
It now differs from V1 only in a few deliberate refinements; all reuse existing `.acct-plan-*`
classes, no kit component changed:

- **One recommended CTA** — only Pro keeps the filled `.btn-primary` ("Upgrade to Pro"); Free =
  disabled outline "Current Plan", Starter = outline "Choose Starter". (V1 filled both paid CTAs.)
- **"Most popular" ribbon** (`.acct-plan-ribbon`) on Pro instead of V1's inline `POPULAR` badge —
  a `position:absolute` chip anchored to the card's top border. **Requires `.acct-plan-card` to be
  `position:relative`** (added) — without it the ribbon anchored to `.cl-main` and rendered clipped
  at the modal's top-left corner.
- **Plan data mirrors the live pricing page** (`insightis-landing.vercel.app/Pricing`) — the source
  of truth for Manage plan content. Both V1 and V2 carry the same tiers: Free ($0), Starter ($9.99,
  50% off $19.99), Pro ($19.99, 50% off $39.99, "Most popular"); prices are **per user / month** for
  the paid tiers; the value metric is **"AI tokens / month"** (500 / 5,000 / 25,000), not "credits";
  Pro is **Unlimited users**; feature lists match the page verbatim — Starter includes **Custom
  semantic layer**, Pro includes **Unlimited data connectors** + **99.5% SLA**. No Enterprise tier
  (the page has none).
- V2's only presentation refinements vs V1: one filled CTA (Pro) and the "Most popular" ribbon
  (instead of the inline POPULAR badge). The **"50% OFF" green badge** + strike-through was-price are
  present on Starter and Pro, same as V1 and the pricing page. Plain Monthly / Yearly toggle,
  per-plan taglines, full feature lists — same shape as V1.

Removed page-layout classes (`.acct-plan-v2/-usage*/-headwrap/-save/-promo/-feats-lead/-ent*`) were
deleted from `kit-theme`-scope CSS; `.acct-plan-outcome`, `.acct-plan-ribbon`, `.acct-plan-trust`
stay because the Buy-credits packs use them.

## Buy-credits sub-page (new)

A new `data-section="buy-credits"` panel, opened by every **Buy Credits** button (Balance V1/V2/V3
× desktop + mobile → `acctSetSection('buy-credits')`). It's a **sub-page, not a left-nav item**. The
**Back to Balance** control lives in the **modal header** — an icon-only chevron (`#acct-hdr-back`,
reusing `.iconbtn.iconbtn-tertiary`, `aria-label`/tooltip "Back to Balance") placed left of the
title; `acctSetSection` shows it only while `buy-credits` is active and hides it otherwise. On mobile
the shared header back chevron routes buy-credits → Balance (not → menu). The concept-version toggle
auto-hides while the sub-page is open (the section has no `[data-ver]` panels). Content reuses the
`.acct-plan-*` classes:

- An intro line clarifying purchased-credit behaviour + current remaining balance.
- **Four credit packs** in a dedicated 4-up grid (`.acct-bc-grid`, reflows 4→2→1): 1,000 / $10 ·
  5,000 / $45 · 15,000 / $120 · 50,000 / $350. Each pack shows a **per-credit rate + report estimate**
  ("$0.00X / credit · ≈ N reports"). Discounted packs make the saving explicit — a green
  `.badge.badge-green.badge-sm` "SAVE 10/20/30%" beside the amount **and** a struck-through
  `.acct-plan-price-was` original price. The best-value pack (15,000) carries the "Best value" ribbon,
  brand-highlight (`.is-popular`) and the single filled CTA; the others are outline (same CTA
  hierarchy as Manage plan). CTAs are pinned to the card bottom (`margin-top:auto`) so they align
  across tiles whose content height differs. All reuse the `.acct-plan-*` / `.badge` kit classes.
- A reassurance row (secure checkout · one-time purchase · credits never expire).

Checkout itself is out of scope (the Buy buttons are inert; page carries the `pg-wip-tag`).

## New tokens (kit-theme.css)

- `--balance-subscription-track` = `color-mix(--brand-tertiary 18%, --progress-track)`
- `--balance-purchased-track` = `color-mix(--fb-green 18%, --progress-track)`

Both mix over the theme-aware `--progress-track`, so they re-resolve per theme with no `.dark`
override. `FALLBACK_TOKEN_NAMES` in `insightis-preview-kit.html` was regenerated to include them.

## Out of scope

- **In-modal navigation is wired**: Balance "Upgrade Plan" → Manage plan tab; "Buy Credits" →
  Buy-credits sub-page (all six instances each). **Closing the modal** (X button, Escape, and the
  mobile header close) returns to the **previous screen** via `history.back()` — consuming pages
  navigate here with `?section=…`, so history holds the app page that opened the modal; the
  fallback (no history, i.e. this file opened directly) just hides the overlay. **Actual checkout /
  payment** (the Buy-pack buttons and the in-card plan CTAs) is out of scope; the page carries the
  `pg-wip-tag "In redesign"` badge.
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
- [x] Casing: the popup/dialog title (`#acct-modal-title` + mobile title) is **Title Case**
      ("My Account", "Manage Plan", "Buy Credits", …) per the kit dialog-title convention; left-nav
      menu items + in-content section headings stay Sentence case. See `pages/changes/AccountModal.md`.
- [x] Legend / summary labels `--ink-secondary` (Slate-550 / Grey-300) ≥ 4.5:1 — pass.
- [x] Fill colours now match the credits popover: subscription `--brand-tertiary` (`#0D8E97` light)
      and purchased `--fb-green` (`#009966` light) each clear the 3:1 UI-graphic target (1.4.11) on
      the white card — an improvement over the previous amber `--fb-attention` (2.89:1). Both are
      canonical kit tokens reused from the popover, not new values.
- [x] Manage plan V2: the recommended plan is signalled by the "Most popular" **text** ribbon (not
      colour alone); the single filled CTA + outline siblings give one clear primary action. The
      ribbon is `position:absolute` and anchors to the card (`.acct-plan-card` is `position:relative`)
      — verified via computed styles (`top:-8px; left:16px`), fixing the earlier clipped/mis-anchored
      badge.
