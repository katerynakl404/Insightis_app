# Upgrade modal — prod → expected

No baseline in [`../current/`](../current/): prod has no plan gating. Storybook:
[`#upgrademodal`](../insightis-preview-kit.html#upgrademodal). Values live in
`pages/kit-theme.css`; this file carries the *why*. Source brief: component **U3**.

## What it is

What a locked **action** answers with. The [popover](UpgradePopover.md) answers a hover; this
answers a press — Connect, Edit, Create, Add — where the person had already decided to do
something. A bubble at the edge of the pointer is too small a reply to a decision.

## Decisions

**It is the kit's dialog, not a new surface.** `.dlg-overlay` → `.dlg` → `.dlg-hdr` with the title
and a tertiary close → `.dlg-content.is-stack` → `.dlg-ftr`: exactly how every other dialog on
these pages is built. `.dlg-upgrade` adds a width and two things, and nothing else.

**The illustration is gone.** The first pass put a brand-gradient band with three floating source
logos across the top. It read as stock illustration rather than as this product, and an
illustration is not what makes an upgrade worth considering — what the plan does is. In its place
the feature's own glyph sits in the icon tile the kit already uses for sources
(`--icon-wrapper-bg` + a hairline), so a locked feature is marked here the way a source is marked
everywhere else.

**The plan is not a footnote.** Two treatments are built and switchable
(`html.plan-info-badge`, driven by the **Plan: text / Plan: badge** control in any page topbar):
the sentence under the copy, or the plan name as the Badge the locked controls wear. The same
class drives the popover, so the two surfaces can never name the plan differently.

**Two buttons, in that order.** `Not Now` first, `Upgrade to Unlock` second where the eye ends. A
modal that only offers forward is a trap; four ways out (Esc, scrim, Not Now, header ✕) is the
minimum for something that interrupted you.

**One destination.** The primary button goes to Settings → Manage plan, like every other upgrade
surface, through the kit's shared CTA handler.

## The `[hidden]` fix this exposed

`.dlg-overlay` carries `display:flex`, which out-ranks the browser's own `[hidden]{display:none}`.
Dialogs that hide with an inline `style="display:none"` never hit it; these hide with the
attribute and did — every variant stayed on screen, stacked, and the buttons of the panel you
could SEE were closing the panel underneath it. `kit-theme.css` now declares
`.dlg-overlay[hidden]{display:none}`, which fixes it for both mechanisms.

## Token map

| Slot | Token |
|---|---|
| shell, radius, shadow | `.dlg` — `--surface-card`, `--stroke-border`, `--shadow-modal` |
| icon tile | `--icon-wrapper-bg` + `--stroke-border`, glyph `--brand-primary` |
| lead | `--ts-body-m-*`, `--ink-body` |
| benefits | `.feat-list` — brand tick |
| plan line / badge | `--ink-body` with the name in `--ink-primary` · `.badge-primary` |
| footer rule, padding | `.dlg-ftr` |

## Accessibility self-check

- `role="dialog"` + `aria-modal="true"`, labelled by its title id.
- Opening moves focus to the primary button; closing returns it to the trigger.
- Esc closes from anywhere; the scrim click is the overlay itself, so a click inside the panel
  never dismisses.
- The close ✕ carries `aria-label="Close"`; its glyph is `aria-hidden`.
- Nothing is conveyed by colour alone: the plan is a word in both treatments.

## 2026-10-06 — rebuilt on the shape current upgrade dialogs use

The first build was a pricing box: a bordered glyph tile beside a wrapping title, a plan badge and
a close button sharing one cramped row, three ticked lines inside a bordered panel, and a footer.
Every part of that was reported in turn — "олдскульно", "ілюстрація виглядає олдскульно",
"елементи наче розкидані", "різномастість типографії". What replaced it:

| Was | Became | Why |
|---|---|---|
| Icon tile (bordered square, then a tinted disc) | **nothing** | A small glyph in a bordered square is the shape every settings row has used for fifteen years; as a disc it became a lone island in the top-left corner. The panel is type on the popover's gradient wash — the colour is the illustration. |
| Title, badge and close on one row at 26rem | plan pill as an **eyebrow** above a 24px headline, close absolutely positioned in the corner | Three things competing for one row made a three-word feature name wrap. The eyebrow costs no markup: `.dlg-up-title-row` is `column-reverse`, so the badge that sits *beside* the title everywhere else rises *above* it here. |
| Lead at Body/L secondary, benefits at Body/M body | **one size, one ink** — Body/M in `Text/Body`, both | Two blocks of the same kind of sentence set in two sizes and two greys read as two components bolted together ("типографія має бути однакового розміру та кольору"). |
| Benefits in a bordered, divided card | plain `.feat-list` at the kit's own 8px gap | The box was drawn around three short sentences. The 12px gap tried here was an override of a value the kit sets once. |
| Full-width primary + centred text link | **the kit's `.dlg-ftr`, untouched** — two buttons right-aligned, its rule above them | A full-width primary over a text link is a paywall screen's shape. This is one of the app's dialogs that happens to be about a plan, and the design system separates every dialog footer. |

Width 27rem. Title on the scale's own `--ts-title-24-*` tokens — size, line-height, weight **and**
tracking — after a pass that set a hand-picked line-height and letter-spacing beside tokenised body
copy.

**Dismiss label, 2026-10-06.** `Not Now` → **`Cancel`**. Every other dialog in the product closes
with `Cancel` (18 of them); an upgrade dialog that invents its own word for the same action makes
the person read a button they already know. The decision it declines is "upgrade", and `Cancel`
says that without the coyness of "not now".
