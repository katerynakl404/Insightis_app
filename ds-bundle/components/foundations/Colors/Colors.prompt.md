Colors from @devart/ui-react. Use via `window.DevartUI.Colors` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Every colour token in the system, read straight out of `globals.css` at runtime
— so this page cannot drift from what the components use.

Two sections, because the system has two layers:

**Tokens** — the semantic and component-scoped names, and the only ones a class
may carry. The line under each name is where its colour comes from: the ramp
step a plain `var()` pins (`fb-info` → `blue-600`), or `color-mix` where the
recipe is a mix rather than an alias. A dark value is printed only where it
differs from the light one, so the tokens that actually move under a theme are
the ones that stand out.

**Primitive ramps** — Layer 1. Shown here, and still not exposed to Tailwind:
there is no `bg-slate-200` in this system and no component may name a shade.
That indirection is what lets a colour pack re-theme everything by redefining
the ramps alone, with no component change — which is also why the Palette
toolbar switch moves both sections at once.

So: **name a role, never a shade.** `bg-surface-card`, `text-ink-body`,
`border-stroke`. A class naming a token that does not exist compiles to nothing
at all — no error, just a wrong pixel — so read this card rather than guessing a
name.

Tints use one scale: `/5 /6 /8 /10 /12 /15 /20 …`. Tokens built with
`color-mix()` (most `badge-*`, `toast-*`, `card-border-*`, and the destructive
button fills) take **no** opacity modifier — `bg-badge-brand-bg/50` silently
emits nothing.
