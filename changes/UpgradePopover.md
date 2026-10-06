# Upgrade popover — prod → expected

No baseline in [`../current/`](../current/): prod has no plan-gating surface at all. Everything
here is new, so this file carries the *why*; values live in `pages/kit-theme.css` and are read off
the storybook's **Spec (live)** panel on [`#upgradepopover`](../insightis-preview-kit.html#upgradepopover).

Source brief: the Free-plan upgrade points spec (component **U2**).

## What it is

The one brand-coloured surface that answers "why can't I use this?" — the feature's name, two or
three things the plan gives, the plan line, one CTA. (The head's glyph came off 2026-10-06: it sat
beside the name saying what the name already said, and took a third of the head's width before the
plan badge arrived.) It hangs off a
plan-locked control, opens on hover or tap, and never appears on its own.

| Piece | Component | Why that one |
|---|---|---|
| Shell | [Popover](Popover.md) (`.pop`) + `.pop-upgrade` | A variant, not a new surface — radius, border and shadow stay the kit's popover; only colour and width change. |
| Plan marker on the trigger | [Badge](Badge.md) `.badge-sm.badge-primary` + `#mi-lock` | The brief asks for one marker everywhere, one colour, one shape. Badge already is that; a bespoke pill would be a second one. |
| Benefits | `.feat-list` | The same brand tick the Manage-plan cards use, so a benefit reads identically wherever it is seen. Previously named `.acct-plan-feats`; the account-scoped name is kept as an alias on the same rule until its consumers are renamed. |
| CTA | [Button](Button.md) `.btn-primary.btn-sm` | One way into Manage plan, with the kit's primary affordance. Full width because the popover is small and this is the only thing to do in it. |

## Decisions

**The brand arrives as a gradient that fades out, not as a flat fill.** First pass filled the
panel edge to edge with one tint and topped it with a saturated band; that is the 2015 "info box",
and it read as one. The same colour applied as a short wash at the top, settling into
`Surface/Card` by 55%, reads as a card with a light on it. `--upop-bg` is that gradient — the same
recipe the featured plan card already uses, so the system has one gradient idea rather than two.

Colour then lands in a few small places instead of across the panel: the gradient, the head, the
benefit ticks and the CTA. The border is `--upop-border`. Everything is mixed over the card rather
than over `transparent`, because the panel is positioned over arbitrary content and a translucent
fill would let that content show through.

**The head is a name, not a band.** The feature's name in `Brand/Primary` — no filled strip across
the top, and since 2026-10-06 no glyph either: the colour is already the signal, and an icon that
repeats the title is decoration that costs width. The
plan line closes the copy with no rule above it, because a divider inside six short lines splits
one thought into two blocks.

**Width is the kit's existing roomy width**, the one `.menu.is-md` and `--tip-max-w` already share
— a third popover width would make three "comfortable" numbers where the kit has one.

**It opens beside the trigger when there is room.** Right first, then left, and only below or
above when neither side fits. A panel at the side leaves the row it explains visible and the rest
of the list with it — open the locked Pro row and Light is still visibly the one selected. A panel
below covers exactly what the person was reading.

**It opens after the same 300 ms a tooltip waits**, read from the Tooltip engine's own constant
rather than copied. The kit has one hover timing; a second one would read as a bug in whichever
surface felt slower. It closes 160 ms after the pointer leaves both trigger and panel — the pointer
needs that long to travel to the CTA, and a bubble that died in the gap would make its own button
unreachable.

**It never closes the menu it was opened from.** The click is stopped at the trigger, so the menu's
outside-click handler never sees it. A model menu that vanished while explaining itself would cost
the person their place.

**It never opens by itself.** Hover, click or tap only — the brief's rule, and the reason this is a
popover rather than a banner.

## Locked ≠ disabled

A new state, `.is-locked`, and the distinction is the whole design:

| | Locked (`.is-locked`) | Disabled (`.is-disabled` / `.s-disabled`) |
|---|---|---|
| Has something to offer | yes — a plan that turns it on | no |
| Hover surface | keeps it | none |
| Cursor | `pointer` | `not-allowed` |
| Click | opens this popover | swallowed |
| The control inside (switch / checkbox / radio) | inert, at disabled opacity | inert |
| Label | `Text/Secondary` | `Text/Inactive` |

Both stay reachable by the pointer. That took a cross-component fix — see
[DisabledState](DisabledState.md).

## Copy

One formula, from the brief: **what it is → what it gives → on which plan.** No exclamation marks,
no countdowns, no "unlock". Feature names and limits come from the plan matrix — Free has no
connections and Insightis Light only; Starter adds five connections, every model and full metrics;
Pro removes the connection limit.

| Trigger | Head | Benefits | Plan line |
|---|---|---|---|
| Locked model row | *Insightis Pro* | holds the thread through a long, multi-step question · handles wide tables and joins without losing track | *On the Pro plan* |
| Locked connection row, Create Connection | *Connections* | ask about live data from your tools, not only uploaded files · five connections on Starter, no limit on Pro | *From the Starter plan* |

CTA is **Upgrade to Unlock** in every instance (Title Case, so the preposition stays lowercase),
and every instance leads to the same place: Settings → Manage plan. It names the ACT, not the
destination: "See Plans" describes a page, "Upgrade to Unlock" describes what the click is for —
and the person already knows what is locked, because the thing they just tried to use is.

## Accessibility self-check

- Trigger carries `aria-disabled="true"` and `aria-expanded`; the panel is `role="dialog"` with an
  `aria-label` naming the feature.
- Esc closes and returns focus to the trigger.
- The trigger stays focusable — `aria-disabled`, not the `disabled` attribute — so a keyboard user
  reaches the explanation and the CTA.
- Head ink is the Badge/Brand ratio over the head band; body copy stays `Text/Body` on a 6% wash,
  so neither drops below the contrast the same pair already passes on a plain card.
- The lock glyph is `aria-hidden`; the plan name beside it carries the meaning.

## Glyph per state

One dictionary entry per state, in the shared `<symbol>` block every page and the storybook carry;
markup references them with `<use href="#mi-*"/>` and never pastes path data.

| State | Glyph | Id | Where | Why this one |
|---|---|---|---|---|
| Locked (plan-gated) | closed padlock | `#mi-lock` | the **trigger**. Two forms, and the rule is the word: the Badge pill carries the plan NAME (`.badge-sm` 12px in a row, `.badge` 14px beside a button); where the name does not fit — a `btn-xs`, a table cell, the composer chrome — the padlock stands **alone** (`.lock-glyph`, 14px `Brand/Primary`) | one marker everywhere, as the brief asks. A pill holding nothing but a glyph is heavier than the glyph itself, and the popover names the plan anyway |
| Unlocked (after upgrade) | open padlock, green | `#mi-unlock` | the confirmation that follows payment, once | same padlock opened — the pair reads without words |
| Read-only | eye | `#mi-view-only` | the read-only banner and the "View only" row marker | what is saved stays readable; a padlock would say "you cannot see this", which is the opposite of what Free gets |
| Feature, in the popover head | brain · linked squares · pie | `#mi-model` `#mi-connections` `#mi-metrics` | the head band of the upgrade popover | each is the glyph that feature already wears in the product. The head takes the **feature's** glyph, never a second padlock — the lock belongs on the locked thing |
| Benefit line | tick | CSS mask on `.feat-list li::before` | popover body, plan cards | decoration on a list, not an icon anybody points at |
| Disabled | none | — | — | nothing on offer, so nothing to mark; it explains itself with a Tooltip and signals itself with `not-allowed` + `Text/Inactive` |
| Busy / failed | unchanged | `.spinner`, Feedback/Red | — | a locked action never reaches a loading state, because it never runs |

**Rule for a new gated area:** reuse the glyph that area already has in the product for the popover
head, and the padlock for its trigger. Do not draw a new mark for a new lock.

## Trigger contract

| Attribute | Meaning |
|---|---|
| `data-upgrade="<id>"` | this control is gated; the element with that id is the popover it opens. Hover (300 ms), click and tap all open it |
| `data-upgrade-click` | same, but **hover does nothing**. For a target bigger than its own label — a catalog card the size of a thumbnail — where a panel appearing under the pointer reads as the page grabbing at you |
| `aria-disabled="true"` | always set alongside, never the native `disabled` attribute: a natively-disabled control emits no pointer events, so the popover would have nothing to open from. `kit-kit.js` swallows click, Enter and Space |

The mockups' **Paid / Free switch** is `kit-kit.js` §7: it stores the choice, restores it on every
page and broadcasts `kit:plan`. Pages listen and run their own lock pass — which controls a page
gates is a property of the page, not of the kit. Markup is a `.segctrl` whose buttons carry
`data-plan-switch`; the pages do not wire the click themselves.

## The decision table — which surface, which marker, which appearance

Most of the inconsistency this system went through was the same kind of control gated differently
on each page. The rule is now written down once, and every page implements it and nothing else:

| Kind of target | Opens | Marker | Appearance |
|---|---|---|---|
| Action button (Create, Connect, Edit, Test, Add) | modal | padlock **leads** — its icon slot, or prepended | full colour, normal hover |
| Inline action link (`Create a custom metric →`) | modal | padlock before the label | unchanged link colour |
| **Any row in a menu or dropdown** — a kebab action (Edit, Test), a model, a connection, an `@`-metric | popover | padlock **trails** at the right-hand edge; the row keeps its own icon or logo | label dims to `Text/Secondary`, **hover stays** |
| Switch in a row or table | popover | **none** — the dimmed switch is the signal | inner control inert |
| Composer control (Connections) | popover on hover | padlock replaces its glyph | disabled look — `Text/Inactive`, `not-allowed`, **no hover surface**, menu does not open |
| Whole card (catalog tile) | modal on click | **none** — its own button carries one | unchanged |
| Reading control (filter, search, chips, tabs, catalog navigation) | — | none | untouched |

**One row pattern, revised 2026-10-06.** The table used to split menu rows in two: a kebab row
opened the modal and read disabled, a selection row opened the popover and kept its hover. Side by
side the two menus stopped looking like the same product. A row in a list is a row in a list —
popover on hover, dimmed label, live hover, everywhere.

**The padlock's position follows the SHAPE, not the page.** A button leads with it; a row trails
it. Rows keep their own icons: when `kitLock` swapped the leading glyph in a menu, every row's
icon became the same padlock and the menu stopped saying which row was which. The one element that
still swaps its glyph is the composer's Connections trigger, where the glyph *is* the locked thing.

**A control drawn as disabled takes no hover surface.** The composer trigger is the single control
that reads disabled, because its menu does not open — so it also does not light up under the
pointer. Everything else keeps its hover; the popover that appears is the answer.

Two rules behind the table, both learned the hard way:

**Locked is not disabled, and `aria-disabled` is not the way to say it.** A locked control is a
button that opens a dialog — it has an answer to give. Marking it `aria-disabled` made the shared
disabled guard strip its hover, so it answered the click while looking dead. The click is stopped
by the popover engine at the trigger instead; the markup says `aria-haspopup="dialog"`, which is
the truth.

**Reading is never gated.** Filtering, searching, switching tabs, collapsing a group, browsing the
catalogue — all of it stays open on Free, and so does anything whose click only navigates to the
catalogue. The gate sits on the action that would change something.

## Copy — where each line comes from

| Line | Source |
|---|---|
| *View only on the Free plan* | brief (U4) |
| *Your connections / metrics are saved — nothing was deleted* | brief (U4 — "nothing is deleted") |
| *Five connections on Starter, no limit on Pro* | matrix |
| *Every model, not only Insightis Light* | matrix |
| *500 MB on Starter, 1 GB on Pro — against 50 MB on Free* | matrix |
| *Ask about live data from your tools, not only uploaded files* | brief (U3 lead), condensed |
| *Live queries — no exports, no syncing by hand* · *Read-only access; credentials never reach the AI* | brief (U3 bullets) |
| *Name a number once — MRR, win rate, churn — and use it with @* | brief (U5 metrics copy) |
| *Holds the thread through a long, multi-step question* · *Handles wide tables and joins* | **proposed** — derived from the model tiers in the matrix, awaiting a decision |
| *A step up from Light on tables and multi-step questions* | **proposed**, same |
| *Upgrade for connections and metrics* (plan pill) | matrix |
| *Upgrade to Unlock* / *Not Now* | proposed button copy, Title Case |

Anything marked **proposed** is mine and derived from the subscription matrix — never invented
beyond it. The two model lines are the only ones still waiting on a decision.

**2026-10-06 — the Badge is final.** The two plan-info treatments were compared in place and the
Badge won: the plan name rides in the same `.badge.badge-sm.badge-primary` the locked controls
wear — beside the feature name in a popover head, above the headline as an eyebrow in the modal.
The sentence treatment, the 21 `From the Starter plan` lines it put under every panel, the
`html.plan-info-badge` switch and its topbar control are all gone. `.plan-line` survives only as a
small supporting line for a fact the Badge cannot carry — the storage popover names both caps.

## 2026-10-06 — one panel per feature, built from a catalogue

Every page used to hand-write its own panels: **14 popovers and 4 modals for six features**. They
had already drifted — the same panel read "Connections" on one page and "Data connections" on
another, and the metrics benefit was worded two different ways.

A trigger now names the **feature**, not a DOM id:

```html
data-upgrade="connections"          <!-- popover on hover -->
data-upgrade-modal="connections"    <!-- the same entry, one rung louder -->
```

[`pages/kit-plans.js`](../pages/kit-plans.js) holds the catalogue (name, plan, lead, benefits);
`kit-kit.js` builds the panel on first use and keeps it. A page writes no panel markup at all —
17 blocks came out of four pages. The popover shows the first two benefits, the modal shows the
headline, the sentence and all of them.

**The one exception is a panel carrying live data**: the Files storage meter reads this account's
usage, so it stays in the page and takes `.pop-upgrade.is-plain` — the same shell on `Surface/Card`
instead of the brand wash, because it reports a fact rather than making an offer. Its CTA is hidden
on the top plan: there is nothing left to upgrade to.

**Placement follows the trigger.** A row inside a menu opens the panel to the SIDE, so the list
stays readable; a control that owns a menu opens it the way that menu opens (the composer's open
upward). Same gap from the trigger as any anchored menu — one token, `--menu-gap`, not two numbers.
