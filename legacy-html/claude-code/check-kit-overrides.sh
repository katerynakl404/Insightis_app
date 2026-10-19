#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# check-kit-overrides.sh — the "did a page restyle a kit component?" sweep.
#
# WHY THIS EXISTS
#   The hard rule (CLAUDE.md / kit-theme.css): every component style lives in
#   ONE place — pages/kit-theme.css — and pages must NEVER restyle a kit
#   component from their own <style> block. This got violated repeatedly
#   (e.g. Files' `table.dsf-tbl thead th{background:var(--card2)}` survived
#   THREE table-unification passes) because "verify the symptom the user
#   named" is not the same as "verify the rule". This script IS that missing
#   verification step — run it BEFORE claiming any component/family is unified.
#
# WHAT IT DOES
#   Scans the <style> block of every pages/**/*.html and prints every rule
#   whose selector touches a kit component class or a bare table element AND
#   sets an appearance property (background / color / border / box-shadow /
#   font / fill / --mark-bg). These are CANDIDATES for review, not automatic
#   failures — you must eyeball each and classify:
#     • genuine page-LAYOUT / page-STATE (grid reflow, preview highlight,
#       muted metadata column, a control using --state-* tokens) → OK
#     • a value/recipe copied from the kit (header fill, hover/selected bg,
#       a bespoke table re-implementing table.tbl) → VIOLATION → lift to /
#       source from kit-theme.css.
#
# USAGE   bash claude-code/check-kit-overrides.sh
#         (run from the repo root)
# ---------------------------------------------------------------------------
set -euo pipefail
cd "$(dirname "$0")/.."

# Kit component selectors / bare table elements worth reviewing when they
# appear inside a page <style>. Extend as the kit grows.
SELECTORS='table\.tbl|thead|tbody|[^-a-z.]th\b|[^-a-z.]td\b|[^-a-z]tr[:{ .]|is-selected|is-preview|\.badge|\.btn[-{: .]|\.chip[-{: .]|\.chat-row|\.swt|\.cbx|\.iconbtn|\.mi[-{: .]|\.kbp-menu|\.ds-conn|\.mx-tbl|\.mx-metric|\.mx-prov|\.banner[-{ .]|\.dsf-drop|\.card-stack|--tbl-row|--mx-group-band'
APPEARANCE='background|[^-]color:|border(-top|-bottom|-left|-right)?(-color|-width)?:|box-shadow|font-(size|weight)|--mark-bg|[^-]fill:'

found=0
for f in pages/*.html pages/**/*.html; do
  [ -f "$f" ] || continue
  # isolate the <style> block, keep original line numbers, drop comment-only lines
  hits=$(awk '/<style>/{s=1} s{print NR": "$0} /<\/style>/{s=0}' "$f" \
    | grep -E "$SELECTORS" \
    | grep -E "$APPEARANCE" \
    | grep -vE '^\s*[0-9]+:\s*/\*' \
    | grep -vE 'sk-|skel|shimmer' || true)
  if [ -n "$hits" ]; then
    echo "===== $f ====="
    echo "$hits"
    echo
    found=1
  fi
done

if [ "$found" -eq 0 ]; then
  echo "No page-local rules touch kit component appearance. ✓"
fi
echo "--- review each hit: page-layout/state = OK; kit recipe copied = lift to kit-theme.css ---"
