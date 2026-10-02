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
  ctaLabel="See Plans"
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

## Not done here

The vendored `ds-bundle/` in this repo is generated output and is overwritten by the next refresh,
so nothing above was hand-edited into it. The Insightis side of both changes is implemented and
shipped in this repo.
