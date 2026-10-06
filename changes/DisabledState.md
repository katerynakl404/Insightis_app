# Disabled state — prod → expected

Cross-component, like [colors](colors.md) and [Tracking](Tracking.md): this is one rule that lives
in fourteen component recipes, not a component of its own.

## The change

| | Was | Became |
|---|---|---|
| Pointer | `pointer-events:none` in every disabled recipe | removed — the element still emits pointer events |
| Hover / press | suppressed by the dead zone | suppressed by the shared guard on each hover and press rule |
| Activation | blocked by the dead zone (and by the native `disabled` attribute) | blocked in `kit-kit.js`, which swallows click, Enter and Space |
| Marking a control that must explain itself | `disabled` attribute | `aria-disabled="true"` + `.s-disabled` |
| Cursor | `not-allowed`, often unreachable | `not-allowed`, and now actually shown |

Affected recipes: `.swt` · `.cbx` · `.rdo` · `.tab` · `.chip` · `.chip-meta` · `.segctrl-btn` ·
`.sel-trig` · `.igrp` · `.mi` · `.link` · `.btn-tertiary` · `.sbx-nav-item` · `.stps`.
Button and IconButton already worked this way — their hover rules carried the guard and no
`pointer-events:none` — so this generalises an idiom the kit had rather than inventing one.

## Why

A disabled control still has to be able to carry the explanation of why it is off: a `[data-tip]`,
or an [upgrade popover](UpgradePopover.md) naming the plan that turns it on. `pointer-events:none`
makes that impossible — the element stops emitting `mouseover` entirely, so anything hung on it is
hung on a dead target. The requirement was never "no pointer"; it was **no hover state and a
disabled cursor**, and both of those survive the fix.

The native `disabled` attribute has the same problem one level deeper: browsers swallow pointer
events on a natively-disabled form control, and no CSS can give the hover back. So a control that
must explain itself is marked `aria-disabled="true"` instead — which also keeps it focusable, so
the explanation is reachable from the keyboard. `disabled` stays correct for controls with nothing
to say.

## The guard

One string, used verbatim on every hover and press rule:

```
:not(.s-disabled,[disabled],[aria-disabled="true"],.is-disabled)
```

All four, because the kit says "off" in four ways — the aria state, the class a page sets, the
native attribute, and the storybook's forced-state mirror. A new variant copies this string rather
than inventing its own negation.

`kit-kit.js` matches the same set (minus the native attribute, which the browser already handles)
when it swallows activation, with one exception: `.is-locked` is not disabled — it has an answer to
give, and the popover engine gives it. See [UpgradePopover](UpgradePopover.md).

## Hover timing (motion)

Hover is also a motion contract, and it now has one place to be read from:

| | Value | Where |
|---|---|---|
| Surface transition (hover / press colour) | `--motion-fast` | component rules |
| Tooltip open delay | 300 ms, **no warm-up** — a rapid second hover waits the same 300 ms | `kit-kit.js` `TIP_DELAY` |
| Tooltip fade | 120 ms in, 100 ms out | `kit-kit.js` |
| Upgrade popover open delay | the same `TIP_DELAY`, read from that constant | `kit-kit.js` |
| Upgrade popover close grace | 160 ms after the pointer leaves trigger **and** panel | `kit-kit.js` |

The no-warm-up rule is deliberate and old: a warm-up makes rapid hovers appear instantly, which
reads as "the delay is broken".

## Accessibility self-check

- `aria-disabled="true"` keeps the control in the tab order and announces its state, where the
  `disabled` attribute removed it from both.
- Activation is blocked in the capture phase, before any page handler — a keyboard Enter on an
  aria-disabled row does nothing, same as a click.
- Nothing about the disabled *appearance* changed: same `--opacity-disabled`, same
  `Text/Inactive` labels, same `not-allowed` cursor.

## Known gap

`.s-loading` still sets `pointer-events:none` on Button and IconButton. A loading button has the
same problem (it cannot carry a tooltip), but loading is a different state with a different
contract, so it is left as is rather than changed in passing.

## 2026-10-06 — two recipes were still missing the guard

The shared guard — `:not(.s-disabled,[disabled],[aria-disabled="true"],.is-disabled)` — is on every
button, link and row recipe, but **Input and TextArea never got it**: `.field:hover` and `.ta:hover`
matched a disabled field and still painted `--field-border-hover`. The border lifting under the
pointer is the one cue that says a field is live, so a disabled one claimed to be.

Both now carry the guard, in the kit and in both hover forms (`:hover` and the storybook's
`.s-hover`).

**Also corrected: locked demo rows in the storybook claimed to be disabled.** Four `.mi.is-locked`
rows carried `aria-disabled="true"`, which is exactly what the contract forbids — the attribute
pulls the disabled guard in and strips the hover a locked row is supposed to keep. They now carry
`aria-haspopup="dialog"`, which is what `kitLock` writes.

**Audit method, so it can be repeated.** Walk every stylesheet rule whose selector contains
`:hover`, strip the pseudo-class, and test whether any element matching
`[disabled],[aria-disabled="true"],.s-disabled,.is-disabled` matches what is left. On the storybook —
46 disabled elements, every recipe in the kit on screen — the only remaining match is
`.cl-attach[aria-disabled="true"]:hover{background:transparent}`, which is the guard itself.
