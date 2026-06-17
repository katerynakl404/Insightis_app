# Selector — current (prod)

No dedicated component. Selects are implemented as a native `<select>` element wrapped in
the `InputGroup` shell (`border border-border bg-card`, height `h-9` / 36 px, radius `md`),
styled with `appearance:auto` to expose the OS-native dropdown chevron and list.

No custom open/close animation, no branded dropdown surface — the browser-native popup is used.
No keyboard-selection feedback beyond the browser default.
