# Changes — prod → expected

One file per component / property. Each file documents what differs between the
**current production** appearance (from the `@insightis/ui` code: `globals.css` + component classes)
and the **expected** new design system (`../token-diff-report.md`). Components with no change
are marked with a dash (—) and have no file.

Open `../insightis-preview-kit.html` for the visual side-by-side; each component links here.

## Index

- [colors](colors.md)
- [Tracking (letter-spacing)](Tracking.md) — foundation token scale
- [Disabled state](DisabledState.md) — cross-component: disabled stops killing pointer events, so it can carry a tooltip
- [Button](Button.md)
- IconButton — see [Button](Button.md) (shares variants)
- [Input](Input.md)
- TextArea — same token shifts as [Input](Input.md)
- [Checkbox](Checkbox.md)
- [Switch](Switch.md)
- [Badge](Badge.md)
- [Avatar](Avatar.md)
- [Table](Table.md)
- [Tabs](Tabs.md)
- [ProgressBar](ProgressBar.md)
- [Dropdown](Dropdown.md)
- [Modal](Modal.md)
- [Pagination](Pagination.md)
- [Sidebar](Sidebar.md) — new component (no pending change)
- [TruncatedTitleTooltip](TruncatedTitleTooltip.md) — new component (no pending change)
- [Tooltip](Tooltip.md) — dark-mode token fix + `.tt` class promotion
- [ChatRow](ChatRow.md) — new component; ⚠ Current column pending prod DOM capture
- [MetaRow](MetaRow.md) — new component; ⚠ Current column pending prod DOM capture
- [SegmentedControl](SegmentedControl.md) — new component (no pending change)
- [StepSlider](StepSlider.md) — new component (discrete level picker; composer Effort row)
- [QueueBand](QueueBand.md) — new component; AI Chat message queue (AIINS-1808), nothing on prod to diff
- [QueueItem](QueueItem.md) — new component; same feature
- [Alert](Alert.md) — new component; the generic inline notice the queue needed (supersedes the queue-private QueuePause)
- [Radio](Radio.md) — new component; Checkbox’s one-of-N sibling, the kit had none
- [ConfirmationCard](ConfirmationCard.md) — exists on prod; options became a real radio group
- [SortableList](SortableList.md) — new kit BEHAVIOUR (kit-kit.js § 4); drag + Alt+↑/↓ reorder
- [ThinkingIndicator](ThinkingIndicator.md) — exists on prod; the skeleton went, the label carries the wait
- [Counter](Counter.md) — new component; one small round count, in the queue row and the sidebar alike
- [ChatShell](ChatShell.md) — exists on prod; moved out of four page `<style>` blocks into the kit
- [DataSourcesFiles](DataSourcesFiles.md)
- typography — no change (—)
- Spinner — no change (—)

## New on prod (04.06) — no pending change
- [Accordion](Accordion.md)
- [StatusView](StatusView.md)
- [Resizable](Resizable.md)
- [Stepper](Stepper.md)

## Components added in this pass (no own change — hex shifts via [colors](colors.md))

Surfaces:
- [Card](Card.md)
- [Separator](Separator.md)
- [Sheet](Sheet.md)
- [Popover](Popover.md)
- [Upgrade popover](UpgradePopover.md) — brand plan-gate explainer + the `.is-locked` state
- [ScrollShadow](ScrollShadow.md)

Forms:
- [InputGroup](InputGroup.md)
- [PasswordInput](PasswordInput.md) — composes [InputGroup](InputGroup.md)
- [Autocomplete](Autocomplete.md) — composes InputGroup + Dropdown + Badge
- [Datepicker](Datepicker.md)
- [File](File.md)

Feedback / state:
- [Toast](Toast.md)
- [Skeleton](Skeleton.md)
- [CircularProgress](CircularProgress.md)
- [Collapsible](Collapsible.md) — pure Radix re-export

Each entry is "**no component-level change (—)**" — only the underlying token hex shifts (documented in [colors](colors.md)) and best-practice state gaps (focus parity, hover, disabled, loading) called out in the files.

[Sidebar](Sidebar.md) was also expanded to cover the overall composition + every sub-part (SidebarHeader / Content / Footer / Group / Menu / MenuSub / Rail / Trigger / Inset) — SidebarFooter and the container itself were missing from the previous docs.
