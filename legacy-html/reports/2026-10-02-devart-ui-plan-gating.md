# @devart/ui-react — two changes for plan gating

For the Devart UI library itself, not for this repo. The Insightis kit already ships both (see
[`changes/DisabledState.md`](../changes/DisabledState.md) and
[`changes/UpgradePopover.md`](../changes/UpgradePopover.md)); this is the same pair written against
the React library, so the two systems do not diverge on it.

Evidence below is read out of the vendored build in `ds-bundle/_ds_bundle.js` (namespace
`DevartUI`), so line-level details may lag the library source by one refresh.

---

## 1. Disabled must stop killing pointer events

**What is there now.** The bundle carries `disabled:pointer-events-none` in **26** recipes, and —
worse — `aria-disabled:pointer-events-none` in several more, e.g.

```
"disabled:pointer-events-none disabled:opacity-disabled"
"aria-disabled:pointer-events-none aria-disabled:text-ink-inactive"
```

**Why it is wrong.** A disabled control is the one that most needs to explain itself: a Tooltip
saying why it is off, or an upgrade popover naming the plan that turns it on. `pointer-events:none`
means the element never emits `mouseover`, so anything attached to it is attached to a dead target.
The `aria-disabled` variant is the sharper bug: `aria-disabled` exists precisely so a control can
stay perceivable and focusable while inert — and the recipe takes that back.

This is not a theoretical gap. Radix's own Tooltip docs tell consumers to wrap a disabled trigger
in an extra `<span>` for exactly this reason; every such wrapper in a product is a workaround for
this line.

**What to change.**

1. Drop `pointer-events-none` from every `disabled:` and `aria-disabled:` recipe.
2. Guard the hover and press utilities instead, so an off control still does not light up:
   `hover:bg-state-hover` becomes `enabled:hover:bg-state-hover`, and where the state is carried by
   `aria-disabled` rather than the native attribute, `aria-disabled:hover:bg-transparent` (or the
   component's own rest value) after it.
3. Keep `cursor-not-allowed` — and note it only becomes visible once pointer events are back.
4. For controls that must explain themselves, prefer `aria-disabled` + inert handlers over the
   native `disabled` attribute: browsers swallow pointer events on a natively-disabled form
   control, so no class can bring the hover back. `aria-disabled` also keeps the control focusable,
   so the explanation is reachable from the keyboard. Suppress activation in the component
   (`onClick`/`onKeyDown` guards), which is the behaviour the attribute was providing.

Equivalent in the Insightis kit: one shared guard string
`:not(.s-disabled,[disabled],[aria-disabled="true"],.is-disabled)` on every hover and press rule,
and activation swallowed centrally in `kit-kit.js`.

**Checked after the change:** a disabled Button, MenuItem, Checkbox, Switch, Tab, Chip and
SegmentedControl each show their Tooltip on hover, show `not-allowed`, do not change surface, and do
nothing on click or Enter.

---

## 2. A locked state, and the popover that goes with it

Plan gating needs a state the library does not have. **Locked is not disabled**: a disabled control
has nothing to offer, a locked one has something the person can buy.

| | Locked | Disabled |
|---|---|---|
| Hover surface | keeps it | none |
| Cursor | `pointer` | `not-allowed` |
| Click | opens the upgrade popover | nothing |
| The control inside (Switch / Checkbox / Radio) | inert, at disabled opacity | inert |
| Label | `text-ink-secondary` | `text-ink-inactive` |

**API.** A `locked?: boolean` prop on the row and action components (`MenuItem`, `Button`,
`IconButton`, the list-row primitives), plus two new exports:

```tsx
<PlanLock plan="Starter" size="sm" />   // the marker: Badge + lock glyph, nothing bespoke

<UpgradePopover
  feature="Insightis Pro"
  icon={<BrainIcon />}        // the FEATURE's own glyph — never a second lock
  benefits={[
    'Holds the thread through a long, multi-step question',
    'Handles wide tables and joins without losing track',
  ]}
  plan="On the Pro plan"
  ctaLabel="Upgrade to Unlock"
  onCta={…}
/>
```

**Surface.** Brand throughout, because it has to read as the paid product next to deliberately
neutral menus: body `bg-brand-primary/6` over the card, head band at `/12`, border mixed into
`border-stroke`, head ink the Badge/Brand ratio. Dark theme moves both washes one step up (`/10`,
`/20`) — a 6% brand wash over a near-black card is invisible. Width 18rem, which is the width the
system already calls roomy.

**Behaviour.** Opens on hover after the same delay `TooltipProvider` sets (one hover timing in the
system, never two) and immediately on click or tap; the pointer may travel from the trigger into the
panel without it closing, because the CTA lives there; it never closes the menu it was opened from;
Esc, outside click and scroll dismiss it; Esc returns focus to the trigger.

Reference implementation: `.pop.pop-upgrade` + `.is-locked` in `pages/kit-theme.css`, engine in
`pages/kit-kit.js` section 6, and the React wrapper in `ds-react/src/UpgradePopover.tsx`.

---

## 3. Hover is a motion contract — write it down

It exists in both systems and is documented in neither:

| | Value |
|---|---|
| Surface transition (hover / press colour) | `--motion-fast` |
| Tooltip open delay | 300 ms, **no warm-up** — a rapid second hover waits the full delay again |
| Tooltip fade | 120 ms in · 100 ms out |
| Upgrade popover open delay | the same 300 ms, read from the tooltip constant, not re-typed |
| Upgrade popover close grace | 160 ms after the pointer leaves trigger **and** panel |

The no-warm-up rule is deliberate: a warm-up makes rapid hovers appear instantly, which reads as a
broken delay.

---

## 4. Two components the library does not have yet

The gating system is built from existing Devart UI parts wherever one fits — Badge for the plan
marker, Button, Popover, Modal, Alert. Two pieces have no counterpart in the library and are
needed by any product that gates by plan:

| Component | What it is | Built from |
|---|---|---|
| **UpgradePopover / UpgradeModal** | What a locked control answers with: hover gets the popover, a press gets the modal. | Popover and Modal in a brand skin — plan pill as an eyebrow, one headline, benefits at ONE size and ONE ink, the library's standard dialog footer (two buttons, right-aligned, rule above them). |
| **Meter** | Label, figure, bar: how much of an allowance is gone. Used for credits and for storage. | `Body/S` label, `Title/16` figure, 4px track. `isOver` recolours the fill to `Feedback/Attention`. The fill colour belongs to the component — it was inline on twelve bars before. |

Two rules that belong in the library rather than in each product:

1. **Where the padlock goes follows the SHAPE of the control.** A button leads with it (its icon
   slot, or prepended); a row in a menu or list trails it at the right-hand edge and keeps its own
   icon. A menu whose every glyph became the same padlock stops saying which row is which.
2. **A locked control is not `aria-disabled`.** It is a control that opens a dialog, so
   `aria-haspopup="dialog"` is what it announces. `aria-disabled` pulls in the library's disabled
   recipe, which strips the hover — the result answers the click while looking dead.

One placement rule for the popover: a trigger that owns a menu opens its panel the way that menu
opens (the composer's controls open upward), and a row inside a list opens it to the SIDE so the
list stays readable. Same gap from the trigger as any anchored menu — one token, not two numbers.

---

## Not done here

The vendored `ds-bundle/` in this repo is generated output and is overwritten by the next refresh,
so nothing above was hand-edited into it. The Insightis side of both changes is implemented and
shipped in this repo.

## 5. Alert needs a size axis

The library's Alert has one size. It needs two, for the same reason Button and Badge have a ladder:
the component is used both INSIDE another surface (a band, a card — a footnote) and ON a page
(full width, above a table — a statement), and one type scale cannot serve both.

| | S (default) | M |
|---|---|---|
| Title | `Title/12` | `Title/14` |
| Description | `Body/S` (12px) | `Body/M` (14px) |
| Glyph | 16px, stroke 1.5 | 20px, stroke 2 |
| Padding / gap | 10/12 · 10 | 12/14 · 12 |

Prop shape to match the rest of the library: `size="sm" | "md"`, default `"sm"`. Everything moves
one rung together — type, glyph and padding — so M reads as a size rather than as an Alert with a
bigger font. Implemented in the Insightis kit as `.alert` / `.alert.is-md`, with both sizes in the
storybook's Alert section.

## 6. Shipped since this report was written

Three of the gaps above are now in the library, with stories and changesets:

| Component | What landed |
|---|---|
| `Alert` | `size="sm" \| "md"` — the component does two jobs and had one size. §89 |
| `Banner` | `size="sm"` line gap 6px → 2px, body gains `data-slot="banner-body"`. §90 |
| `PromoCard` | **new** — the offer card a sidebar has room for. §91 |

`PromoCard` is deliberately *not* `SidebarPromo` and *not* `PlanCard`: the consuming kit calls the
same part `.promo-card`, and the two systems name it identically. An upgrade is only one kind of
offer — an invitation or an ending trial fit the same shape.
