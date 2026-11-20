ChoiceCard from @devart/ui-react. Use via `window.DevartUI.ChoiceCard` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

A card-sized answer to a question — title, optional description, badge and
leading icon — and the chosen state: the Brand/Primary border over a 5% brand
wash.

```jsx
<ChoiceGroup aria-label="Your role" value={role} onValueChange={setRole} onPick={next}>
  <ChoiceCard value="sales" title="Sales" description="Pipeline and deals" />
  <ChoiceCard value="other" title="Other">
    <TextArea rows={2} aria-label="Your answer" />   {/* shown while chosen */}
  </ChoiceCard>
</ChoiceGroup>

<ChoiceGroup type="multiple" aria-label="Goals" value={goals} onValueChange={setGoals}>
  <ChoiceCard value="revenue" title="Track revenue" badge="Popular" />
</ChoiceGroup>

<ChoiceCard title="Email me a summary" selected={on} onSelect={setOn} />
```

The API and file layout are the developers' (1.3.0 / 1.4.0).

## The three shapes

| Where | It is | Mark (`indicator="auto"`) |
|---|---|---|
| `ChoiceGroup type="single"` | a `role="radio"` card in a radiogroup, `aria-checked` | none — the card shows the choice |
| `ChoiceGroup type="multiple"` | a label around a `Checkbox` | checkbox |
| no group | a toggle button, `aria-pressed="true"` / `"false"` — `selected` + `onSelect` | none |

`indicator="radio"` draws the RadioButton mark on request; `"checkbox"` on a
standalone card makes it a label around a Checkbox (`name` for forms).
`indicator="none"` in a multiple group leaves a toggle button with
`aria-pressed`.

## Props

**`ChoiceGroup`** — `type` (`single` | `multiple`), `value` (`string` |
`string[]`), `onValueChange`, `onPick` (single only),
`aria-label` / `aria-labelledby`, `disabled` (every card), `name` (reaches the
checkboxes of a multiple group), `className`, `style`, `ref`.

**`ChoiceCard`** — `value` (required inside a group), `title`, `description`,
`badge` (a small primary Badge after the title), `icon` (a 36px disc leading
the row), `indicator` (`auto` | `none` | `radio` | `checkbox`), `disabled`,
`selected` / `onSelect` / `name` (standalone only), `className`, `style`,
`children`, `ref`.

`style` lands on the card's root in every shape — the button, the checkbox
label or the expandable wrapper, never the expandable head — and on the group
wrapper. Use it for per-item custom properties such as a stagger index.

## Keyboard, and `onPick`

A single group is one tab stop (the chosen card, else the first enabled one).
The arrow keys move and choose, wrapping, skipping disabled cards; Enter and
Space choose. `onValueChange` reports every change. `onPick` reports only a
deliberate pick — click, Enter, Space — never an arrow key, so a one-answer
question can move on by itself without jumping as the reader arrows through.

## Layout

The group is a one-column grid, `grid grid-cols-1 gap-2`, with no column
prop. `className` is merged last with `cn()`, so a consumer class replaces it:
`sm:grid-cols-2 sm:gap-3` puts the cards side by side from 640px up, 12px
apart; `sm:grid-cols-3 sm:gap-3` makes three; `grid-cols-2` holds two at every
width.

A leading `icon` leads the row top-aligned; the row keeps its padding and the
mark stays on the title line. `children` turn the card into an expandable one:
the head is the button and the content opens inside the card while it is
chosen. The head carries `aria-expanded` outside a single group; inside one it
is the radio (`role="radio"`, `aria-checked`) and takes no `aria-expanded`.

## Parts

`ChoiceCard.tsx` picks the shape and renders one of `ChoiceCardButton`,
`ChoiceCardLabel` (with its `Checkbox`) or `ChoiceCardExpandable`, each
around `ChoiceCardIcon`, `ChoiceCardBody` and `ChoiceCardRadioMark`. State
lives in `use-choice-card-state.ts` / `use-choice-group-state.ts` (with
`use-arrow-navigation.ts` and `first-enabled-value.ts`); the group shares it
through `context.ts`. None of the parts is exported.

Data slots: `choice-group`, `choice-card`, `choice-card-head`,
`choice-card-content`, `choice-card-icon`, `choice-card-body`,
`choice-card-title`, `choice-card-description`, `choice-card-indicator`.

Exported recipes: `choiceGroupVariants`, `choiceCardVariants`,
`choiceCardHeadVariants`, `choiceCardIconVariants`,
`choiceCardIndicatorVariants`.
