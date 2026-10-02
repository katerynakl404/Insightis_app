# Upgrade popover — prod → expected

No baseline in [`../current/`](../current/): prod has no plan-gating surface at all. Everything
here is new, so this file carries the *why*; values live in `pages/kit-theme.css` and are read off
the storybook's **Spec (live)** panel on [`#upgradepopover`](../insightis-preview-kit.html#upgradepopover).

Source brief: the Free-plan upgrade points spec (component **U2**).

## What it is

The one brand-coloured surface that answers "why can't I use this?" — the feature's own glyph
and its name in a tinted head band, two or three things the plan gives, the plan line, one CTA. It hangs off a
plan-locked control, opens on hover or tap, and never appears on its own.

| Piece | Component | Why that one |
|---|---|---|
| Shell | [Popover](Popover.md) (`.pop`) + `.pop-upgrade` | A variant, not a new surface — radius, border and shadow stay the kit's popover; only colour and width change. |
| Plan marker on the trigger | [Badge](Badge.md) `.badge-sm.badge-primary` + `#mi-lock` | The brief asks for one marker everywhere, one colour, one shape. Badge already is that; a bespoke pill would be a second one. |
| Benefits | `.feat-list` | The same brand tick the Manage-plan cards use, so a benefit reads identically wherever it is seen. Previously named `.acct-plan-feats`; the account-scoped name is kept as an alias on the same rule until its consumers are renamed. |
| CTA | [Button](Button.md) `.btn-primary.btn-sm` | One way into Manage plan, with the kit's primary affordance. Full width because the popover is small and this is the only thing to do in it. |

## Decisions

**Brand all the way through, not a neutral card with an accent.** This surface has to read as
"the paid product" the instant it appears, next to menus and rows that are deliberately neutral.
Body, head band and border are three mixes of `--brand-primary` over `Surface/Card`, as
component-scoped tokens (`--upop-bg`, `--upop-head-bg`, `--upop-border`, `--upop-head-ink`) —
mixed over the card rather than over `transparent`, because the panel is positioned over arbitrary
content and a translucent fill would let that content show through. Head ink borrows the
Badge/Brand ratio, so the band and the marker inside it are the same colour by construction.

**Width is the kit's existing roomy width**, the one `.menu.is-md` and `--tip-max-w` already share
— a third popover width would make three "comfortable" numbers where the kit has one.

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

CTA is **See Plans** in every instance (Title Case, like every other button), and every instance
leads to the same place: Settings → Manage plan.

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
| Locked (plan-gated) | closed padlock | `#mi-lock` | the **trigger** — menu row, action button, composer control. `.badge-sm` (12px) in a row, `.badge` (14px) beside a button, glyph-only pill where a word does not fit | one marker everywhere, as the brief asks |
| Unlocked (after upgrade) | open padlock, green | `#mi-unlock` | the confirmation that follows payment, once | same padlock opened — the pair reads without words |
| Read-only | eye | `#mi-view-only` | the read-only banner and the "View only" row marker | what is saved stays readable; a padlock would say "you cannot see this", which is the opposite of what Free gets |
| Feature, in the popover head | brain · linked squares · pie | `#mi-model` `#mi-connections` `#mi-metrics` | the head band of the upgrade popover | each is the glyph that feature already wears in the product. The head takes the **feature's** glyph, never a second padlock — the lock belongs on the locked thing |
| Benefit line | tick | CSS mask on `.feat-list li::before` | popover body, plan cards | decoration on a list, not an icon anybody points at |
| Disabled | none | — | — | nothing on offer, so nothing to mark; it explains itself with a Tooltip and signals itself with `not-allowed` + `Text/Inactive` |
| Busy / failed | unchanged | `.spinner`, Feedback/Red | — | a locked action never reaches a loading state, because it never runs |

**Rule for a new gated area:** reuse the glyph that area already has in the product for the popover
head, and the padlock for its trigger. Do not draw a new mark for a new lock.
