# current/ — live production baseline

Each file here describes the **current production** state of a component or property,
mirroring the real `@insightis/ui` code (`globals.css` + component classes).

This is the baseline that `changes/` diffs against. **It moves over time** — whenever prod
ships an update, refresh the relevant `current/<name>.md` first, then re-derive the matching
`changes/<name>.md`. The kit itself renders the Expected design only — it carries no prod scope.

Format per file: the tokens/sizes/states as they are **today on prod**, so a change file can be
written purely as "current → expected".

## Files
- `colors.md`, `typography.md`
- `Button.md`, `IconButton.md`, `Input.md`, `TextArea.md`, `Checkbox.md`, `Switch.md`,
  `Badge.md`, `Avatar.md`, `Table.md`, `Tabs.md`, `ProgressBar.md`, `Spinner.md`,
  `Tooltip.md`, `Dropdown.md`, `Modal.md`, `Pagination.md`
