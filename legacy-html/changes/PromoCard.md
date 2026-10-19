# Promo card — prod → expected

No baseline in [`../current/`](../current/). Storybook:
[`#promocard`](../insightis-preview-kit.html#promocard). Source brief: **C7**, plus the sidebar
placement added in review.

## What it is

One line stating which plan is answering, with the way out of it: the plan name, a hairline, a
link. It appears above the composer on the new-chat screen and in the sidebar footer.

## Why both places

A screen can be entirely free of locked controls — the new-chat screen is — and then the plan is
invisible until something refuses to work. The pill is the one permanently visible statement of
it. The sidebar footer is the second place because that is where a person already looks to find
out what their account is: Balance, the user row, and now the plan.

## Decisions

**A pill, not a banner.** It has to be present all the time without becoming page furniture, so it
states the fact and offers the link and stops. A banner at that frequency gets ignored, and then
it is just noise with a border.

**A link, not a button.** Above the composer a button would compete with Send; in the sidebar it
would compete with the balance CTA. The affordance is the same either way, and the hierarchy
stays honest.

**Absent on paid, not disabled.** An "upgrade" on an account that already upgraded is noise.

**Copy from the matrix.** The plan name plus what upgrading opens — *"Upgrade for connections and
metrics"*. The reference wording this came from (*"get full powers"*) says nothing a person can
act on.

## Token map

| Slot | Token |
|---|---|
| shell | `--surface-card` (`--surface-card2` in the sidebar), `--stroke-border`, `--radius-full` |
| label | `--ts-label-m-*`, `--ink-secondary` |
| hairline | `--stroke-border` |
| link | `--ink-highlight`, underline on hover, `--shadow-focus` ring |

## Accessibility self-check

- The CTA is a real link (sidebar) or button (composer) — reachable and operable by keyboard, with
  the kit's focus ring.
- The pill is text, not an image; the plan name is readable by itself.
- Colour is not the signal: the word *Free* is.

## 2026-10-06 — the sidebar form became a card (`.promo-card`)

The sidebar footer carried `.plan-pill.is-block`: *Free plan · Upgrade*. Two problems, both
reported: it repeated the plan name the user row says one line below it (`Admin · Free`), and a
one-line pill squeezed into a 15rem column had no room to say anything worth clicking.

The sidebar now takes a small card — glyph, title, one line, dismiss — above the footer rule, not
inside the account block:

| Piece | Decision |
|---|---|
| What it says | The **offer**, never the current plan. `Upgrade to Pro` / `Unlimited sources and 15,000 credits a month`. Pro, not Starter, by direction — the sidebar is the one place that recommends rather than unblocks. |
| Title / description | `Title/12` in `Text/Primary`, `Body/S` in `Text/Secondary`. The description was tried in `Text/Highlight` to make it read as an offer; two lines of teal under a dark title read as a visited link. Reverted. |
| Hover | `.hov-card` — the kit's one card recipe, nothing local. An earlier pass recoloured the title on hover; no other card does that. |
| Dismiss | `.promo-card-x`, a sibling inside `.promo-card-wrap` (a button inside a link is not markup). Hides for the session; the plan switch does not bring it back. |
| Placement | Above `.sbx-foot`, so it reads as the last thing in the list rather than as part of the account block. Hidden when the sidebar is collapsed. |

The composer pill is unchanged. Two shapes of one offer, one family.

**Also fixed here:** the footer's plan line rendered `Admin В· Free`. The markup held a mojibaked
separator (`В·`) and the plan rewrite sliced on the real `·` after it. The separator is now a plain
middot, and the demo's paid plan is **Starter** on every page — one page's markup still said
`Professional` while its own balance popover said `Starter`.

## 2026-10-06 — the composer pill is removed

The pill above the new-chat composer (*Free plan · Upgrade to connect your data*) is gone. On a
screen with no locked control in sight it was meant to be the one place the plan stayed visible —
but the sidebar card says the same thing a few centimetres away, and two surfaces stating one fact
made the screen argue with itself. One offer, in one place.

`.plan-pill`, `.plan-pill-sep` and `.plan-pill-cta` leave the kit with it; nothing composes them
any more. The sidebar card (`.promo-card`) is the whole component.

## Behaviour belongs to the kit, not to the page (2026-10-06)

Visibility (**Free only**) and the dismiss (**hidden for the session**, and the plan switch must not
bring it back) live in `pages/kit-kit.js` § 10. They used to be copied into each page's own plan
pass, so the three concept pages — which have no plan pass — rendered a sidebar with no card at all,
while the five gated pages had one. Same sidebar, two shapes, depending on which screen you were on.

A page now supplies markup and nothing else: `#sbx-promo-card` on the wrapper, `.promo-card-x` on
the dismiss. No inline `onclick`, no per-page visibility line.
