Tour from @devart/ui-react. Use via `window.DevartUI.Tour` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

A guided walk over the real interface: per step a `Spotlight`, a `GuideCard`
and, when the step has them, annotations.

```jsx
const [step, setStep] = useState(0);
const [open, setOpen] = useState(true);

<Tour
  open={open}
  steps={STEPS}
  step={step}
  onStepChange={setStep}
  onClose={(reason) => setOpen(false)}       // 'finish' | 'skip' | 'escape'
  boundary=".app-shell"
/>
```

A step is `{ id, target, title, icon?, content, label?, side?, width?, annotations? }`;
an annotation is `{ target, icon?, text }`. The caller holds the step.

## The card

The developers' `GuideCard` draws the card and its arrow; the tour is the
engine their docs leave the rest to — placement, the scrim, the dialog role
and focus.

The header is the progress — `StepProgress size="sm" labelPosition="top"
showStepTitle`, read out as "Step N of M". By default it counts the tour's own
steps (`label`, else a string `title`). When the tour is part of a longer flow,
pass `progress={{ steps, offset }}` and the read-out counts the whole flow. The
footer is Back · Skip · Next, with Done on the last step and no Skip there;
`labels` renames them. Back on the first step shows only with `onBeforeFirst`
— for a tour that continues an onboarding. `width`: `md` 352px, `lg` 464px.

## Placement

A step's `side` is a preference list (default bottom, top, right, left). The
card takes the first side where it fits whole without covering the target —
14px off it, 8px inside the bounds. If none fits it takes the first with 75%
of its size free, else the roomiest, and pins to that edge. The arrow points at
the target's centre (`GuideCard`'s `arrowOffset`), 16px clear of the card's
corners. The card re-places itself as the page moves and glides to the next
target on `--spotlight-move`. At 640px and below it is a bottom sheet — 12px
from the sides and the bottom, full width, no arrow.

`placeGuideCard(rect, bounds, width, height, sides)` is exported from this
entry, for a page that places a `GuideCard` of its own against the same rect
(`useTargetRect`, from `Spotlight`).

## Behaviour

- **Dialog** — the card is `role="dialog"`, non-modal, labelled by its title
  and described by its body, `tabIndex={-1}`.
- **Keyboard** → next, ← back, Esc closes (`onClose('escape')`); ignored while
  typing in a field.
- **Focus** moves to the card on every step, after the target scrolls into
  view.
- **A click on the scrim** shakes the card: the page is not reachable until the
  tour ends, and the card is where to go.
- **Closing** fades the whole tour out (300ms) before it unmounts; the card
  fades and drops 8px, and nothing takes a click.
- **Phones** (≤ 640px): the card is a bottom sheet and lists the step's
  annotations instead of drawing them.

`padding` (8) and `boundary` reach the spotlight.

## Migrating from `Coachmark`

`Coachmark` is retired: the developers' `GuideCard` replaces it, and what it
did beyond drawing the card is the tour's.

| `Coachmark` | Now |
|---|---|
| `<Coachmark>` | `<GuideCard>` (`@devart/ui-react/GuideCard`) inside a `Tour` |
| `nudge` | `nudgeCount` |
| `leaving` | `isLeaving` |
| `side` (a preference list) | a step's `side`; `GuideCard`'s `side` is the side it landed on |
| `target` / `rect` / `bounds` / `boundary` / `onPlace` / `portalContainer` | the tour's; `placeGuideCard` for your own |
| `role="dialog"`, title id, `tabIndex={-1}` | the tour's; `GuideCard` takes `titleId` / `descriptionId` |
| `data-slot="coachmark"`, `coachmark-{arrow,header,title-row,icon,title,body,footer}` | `guide-card`, `guide-card-{arrow,header,title-row,icon,title,body,footer}` |
| `data-side="none"` as a sheet | no `data-side` |
| `coachmarkVariants`, `coachmarkArrowVariants`, `coachmarkIconVariants`, `coachmarkBodyVariants` | `guideCardVariants`, `guideCardArrowVariants`, `guideCardIconVariants`, `guideCardBodyVariants`; the positioning is `tourCardVariants` |
| `CoachmarkSide`, `CoachmarkPosition`, `CoachmarkPlacement` | `GuideCardSide`; `GuideCardPosition`, `TourCardPlacement` (from `Tour`) |
| `animate-coachmark-{in,nudge,out}` | `animate-guide-card-{in,nudge,out}` |

## Props

```ts
interface TourProps {
  open?: boolean;
  steps: TourStep[];
  /** 0-based index of the step on screen — the caller holds it. */
  step?: number;
  onStepChange?: (step: number) => void;
  onClose?: (reason: TourCloseReason) => void;
  /** Back on the first step — the tour continues a longer flow. Shows Back there. */
  onBeforeFirst?: () => void;
  /** The flow the tour is part of, for the read-out: its steps and where the tour starts in it. Default: the tour's own steps */
  progress?: { steps: StepProgressStep[]; offset?: number; };
  labels?: TourLabels;
  /** The area the tour may use (selector, element or ref). Default: the viewport. */
  boundary?: string | Element | { current: Element | null; } | readonly TourTarget[];
  /** Grows the lit area on every side. */
  padding?: number;
}
```
