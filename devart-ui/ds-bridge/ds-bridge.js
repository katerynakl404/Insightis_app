/* ds-bridge (TEMPORARY) — components of дизайн DevartUI (../Design system/devart.ui.react) that the
   vendored ds-bundle/ does not ship yet, ported with the SAME API onto window.DevartUI, so the kit and the
   pages call D.<Name> from today (user, 2026-10-22: "треба по максимуму з деварт юа"). Loaded first by the
   insightis-kit loader (tools/build-index.mjs), ahead of the product kit.

   Each is guarded — bridge('<Name>', …) only fills a gap: once the bundle ships the component, the bridge
   is skipped and tools/check.mjs warns it is dead weight. To retire one: delete its bridge('<Name>', …)
   block and its rules in ds-bridge.css; with none left, delete this folder and re-run build-index.mjs.

     SearchInput         src/components/SearchInput — the field alone (no `results` list)
     AlertStack          src/components/AlertStack
     ConfirmationDialog  src/components/ConfirmationDialog
     FilterMenu          src/components/FilterMenu

   The glyphs are lucide's (Search, X, ChevronDown, ChevronUp, Check), drawn as the bundle draws them.
   Utilities the bundle's CSS has not compiled are classes of ds-bridge.css (ds-bridge-*). */
(function () {
  'use strict';
  var D = window.DevartUI, R = window.React, h = R.createElement, cx = D.cn;

  function bridge(name, make) { if (!D[name]) D[name] = make(); }

  var GLYPH = {
    search: ['M21 21l-4.34-4.34', 'C11 11 8'],
    x: ['M18 6 6 18', 'm6 6 12 12'],
    chevronDown: ['m6 9 6 6 6-6'],
    chevronUp: ['m18 15-6-6-6 6'],
    check: ['M20 6 9 17l-5-5']
  };
  function glyph(name, className) {
    return h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
      strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true', className: className },
      GLYPH[name].map(function (d, i) {
        return d.charAt(0) === 'C' ? h('circle', { key: i, cx: d.split(' ')[0].slice(1), cy: d.split(' ')[1], r: d.split(' ')[2] }) : h('path', { key: i, d: d });
      }));
  }

  /* ── SearchInput — an InputGroup with the search glyph leading and a clear button trailing, once there is a
     value and onClear; clearing gives the field the focus back. The clear button's tooltip needs a
     TooltipProvider above it (IK.Providers is one). ── */
  bridge('SearchInput', function () {
    return function SearchInput(p) {
      var inner = R.useRef(null);
      var clearLabel = p.clearLabel || 'Clear search';
      var showClear = typeof p.value === 'string' && p.value !== '' && !!p.onClear && !p.disabled;
      function setRef(el) { inner.current = el; if (typeof p.ref === 'function') p.ref(el); else if (p.ref) p.ref.current = el; }
      return h(D.InputGroup, { size: p.size || 'lg', variant: p.variant, className: p.className, style: p.style },
        h(D.InputGroupAddon, { align: 'inline-start' }, glyph('search')),
        h(D.InputGroupInput, {
          ref: setRef, type: 'search', id: p.id, placeholder: p.placeholder, value: p.value,
          onChange: p.onValueChange ? function (e) { p.onValueChange(e.target.value); } : undefined,
          onKeyDown: p.onKeyDown, 'aria-label': p['aria-label'], autoFocus: p.autoFocus, disabled: p.disabled,
          enterKeyHint: 'search', autoComplete: 'off', className: 'ds-bridge-search'
        }),
        showClear ? h(D.Tooltip, null,
          h(D.TooltipTrigger, { asChild: true },
            h(D.InputGroupAction, { 'aria-label': clearLabel, onClick: function () { p.onClear(); if (inner.current) inner.current.focus(); } }, glyph('x'))),
          h(D.TooltipContent, { side: 'top' }, clearLabel)) : null);
    };
  });

  /* ── AlertStack — several notices as one group. Folded, a deck: the first on top, the next two lying behind
     it, each 8px lower and 12px narrower a side, only their bottom edges showing in their own colours; the
     edges spread on hover and a press opens the pile; "Show Less" closes it. One notice is just that notice.
     The edge's colour is the child's `variant` prop (an Alert's, or anything that passes one). ── */
  bridge('AlertStack', function () {
    var EDGE = {
      success: 'border-alert-border-success bg-alert-bg-success',
      info: 'border-alert-border-info bg-alert-bg-info',
      warning: 'border-alert-border-warning bg-alert-bg-warning',
      error: 'border-alert-border-error bg-alert-bg-error',
      neutral: 'border-stroke bg-surface-card2'
    };
    function variantOf(el) { var v = R.isValidElement(el) ? el.props.variant : undefined; return v && EDGE[v] ? v : 'neutral'; }
    return function AlertStack(p) {
      var list = R.Children.toArray(p.children).filter(Boolean);
      var os = R.useState(!!p.defaultOpen), open = os[0], setOpen = os[1];
      var hs = R.useState(false), hover = hs[0], setHover = hs[1];
      var moreLabel = p.moreLabel || function (n) { return 'Show ' + n + ' more ' + (n === 1 ? 'notice' : 'notices'); };
      if (list.length < 2) return list[0] || null;
      if (open) return h('div', { className: cx('flex flex-col gap-3', p.className) }, list,
        h('div', { className: 'flex' },
          h(D.Button, { variant: 'tertiary', size: 'xs', type: 'button', className: '-my-1', 'aria-expanded': true,
            rightSlot: glyph('chevronUp', 'size-3.5'), onClick: function () { setOpen(false); } }, p.lessLabel || 'Show Less')));
      var edges = list.slice(1, 3);
      return h('div', { className: cx('relative isolate', edges.length === 2 ? 'pb-4' : 'pb-2', p.className) },
        h('div', { className: 'ds-bridge-stack-top relative' }, list[0]),
        edges.map(function (el, i) {
          return h('button', {
            key: i, type: 'button',
            'aria-expanded': i ? undefined : false, 'aria-label': i ? undefined : moreLabel(list.length - 1),
            'aria-hidden': i ? true : undefined, tabIndex: i ? -1 : undefined,
            onClick: function () { setOpen(true); }, onMouseEnter: function () { setHover(true); }, onMouseLeave: function () { setHover(false); },
            className: cx('ds-bridge-stack-edge absolute cursor-pointer rounded-lg border p-0 transition-transform duration-150',
              D.focusRing, EDGE[variantOf(el)],
              i === 0 ? cx('inset-x-3 top-2 z-[1]', edges.length === 2 ? 'bottom-2' : 'bottom-0', hover && 'translate-y-1')
                : cx('inset-x-6 top-4 bottom-0 z-0', hover && 'translate-y-2'))
          });
        }));
    };
  });

  /* ── ConfirmationDialog — a two-button confirmation over Modal (sm): the title, the description, an optional
     bodySlot, Cancel · <confirmLabel>; the focus starts on the confirm button. It stays open while isLoading and
     after onConfirm settles — closing it on success is the consumer's call; a rejection goes to onError. ── */
  bridge('ConfirmationDialog', function () {
    return function ConfirmationDialog(p) {
      var descriptionId = R.useId();
      var confirmRef = R.useRef(null);
      var loading = !!p.isLoading;
      function openChange(next) { if (!next && loading) return; p.onOpenChange(next); }
      function confirm() {
        if (loading) return;
        try { var r = p.onConfirm(); if (r && r.then) r.then(null, function (e) { if (p.onError) p.onError(e); }); }
        catch (e) { if (p.onError) p.onError(e); }
      }
      function cancel() { if (loading) return; if (p.onCancel) p.onCancel(); p.onOpenChange(false); }
      return h(D.Modal, { open: p.open, onOpenChange: openChange },
        h(D.ModalContent, {
          'aria-describedby': descriptionId, size: 'sm', className: cx('p-0', p.className),
          isCloseButtonVisible: !!p.isCloseButtonVisible,
          closeButtonProps: { 'aria-label': 'Close', className: 'ds-bridge-confirm-close right-5' },
          onOpenAutoFocus: function (e) { e.preventDefault(); if (confirmRef.current) confirmRef.current.focus(); },
          onCloseAutoFocus: function (e) { e.preventDefault(); }
        },
          h(D.ModalHeader, { className: cx('ds-bridge-confirm-head mb-0 px-5 pb-2', p.icon && 'flex-row items-center gap-2', p.isCloseButtonVisible && 'pr-16') },
            p.icon || null,
            h(D.ModalTitle, { className: 'min-w-0 break-words' }, p.title)),
          h(D.ModalBody, { className: 'mr-0 px-5 pb-5' },
            h(D.Typography, { id: descriptionId, variant: 'p', textColor: 'secondary' }, p.description),
            p.bodySlot || null),
          h(D.ModalFooter, { className: 'ds-bridge-confirm-foot mx-0 mt-0 px-5' },
            h(D.Button, { variant: 'secondary', size: 'sm', disabled: loading, onClick: cancel }, p.cancelLabel),
            h(D.Button, { ref: confirmRef, variant: p.variant || 'primary', size: 'sm', isLoading: loading, onClick: confirm }, p.confirmLabel))));
    };
  });

  /* ── FilterMenu — a filter as a pill ("Type: All ▾", "Provider: Main CRM ✕ ▾") and its menu: plain choices
     or a hierarchy (a group's icon, its children under it), each with its count; a check on the chosen one.
     A chosen value adds ✕ before the chevron — it puts defaultValue back and never opens the menu.
       options: [{ value, label, count?, icon?, children? }] ── */
  bridge('FilterMenu', function () {
    function find(options, value) {
      for (var i = 0; i < options.length; i++) {
        var o = options[i];
        if (o.value === value) return o;
        var c = o.children ? find(o.children, value) : undefined;
        if (c) return c;
      }
      return undefined;
    }
    return function FilterMenu(p) {
      var options = p.options || [];
      var os = R.useState(!!p.defaultOpen), open = os[0], setOpen = os[1];
      /* a press on ✕ marks this first, so the trigger it sits in does not open the menu */
      var skip = R.useRef(false);
      var base = p.defaultValue != null ? p.defaultValue : (options[0] && options[0].value);
      var current = find(options, p.value) || options[0];
      var isSet = p.value !== base;
      var tree = options.some(function (o) { return o.icon || (o.children && o.children.length); });
      function clear() { if (base !== undefined) p.onValueChange(base); }
      function item(o, nested) {
        var on = o.value === p.value;
        return h(D.DropdownMenuItem, { key: o.value, role: 'menuitemradio', 'aria-checked': on, onSelect: function () { p.onValueChange(o.value); } },
          /* one 20px slot for a mark on every row of a tree: a nested label starts exactly under its group's */
          tree && (o.icon || nested) ? h('span', { className: 'flex size-5 shrink-0 items-center justify-center overflow-hidden', 'aria-hidden': 'true' }, o.icon || null) : null,
          h('span', { className: cx('min-w-0 flex-1 truncate', nested ? 'text-ink-body' : 'font-medium text-ink-primary') },
            o.label,
            o.count !== undefined && o.count !== null ? h('span', { className: 'text-xs font-normal tabular-nums text-ink-secondary' }, ' (' + o.count + ')') : null),
          glyph('check', cx('size-4 shrink-0 text-ink-highlight', !on && 'opacity-0')));
      }
      var chevron = glyph('chevronDown', 'size-3.5');
      return h(D.DropdownMenu, {
          open: open, modal: p.defaultOpen ? false : undefined,
          onOpenChange: function (v) { if (v && skip.current) { skip.current = false; return; } setOpen(v); }
        },
        h(D.DropdownMenuTrigger, { asChild: true },
          h(D.Button, {
            variant: 'secondary', size: 'xs', rounded: 'full', type: 'button', className: cx('min-w-0 max-w-64 shrink px-3', p.className),
            rightSlot: isSet ? h('span', { className: 'inline-flex items-center gap-1' },
              h('span', {
                role: 'button', tabIndex: 0, 'aria-label': p.clearLabel || 'Clear ' + p.label,
                className: cx('inline-flex rounded-full', D.focusRing),
                onPointerDown: function (e) { skip.current = true; e.stopPropagation(); e.preventDefault(); },
                onClick: function (e) { e.stopPropagation(); e.preventDefault(); clear(); },
                onKeyDown: function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); clear(); } }
              }, glyph('x', 'size-3.5')),
              chevron) : chevron
          }, h('span', { className: 'min-w-0 truncate' }, p.label + ': ' + (current ? current.label : '')))),
        h(D.DropdownMenuContent, { align: p.align || 'start', className: cx('max-h-80 overflow-y-auto', tree && 'w-72') },
          tree ? options.map(function (o, i) {
            /* the first plain option of a tree ("All") stands apart from the groups by a rule */
            var first = i === 0 && !o.icon && !(o.children && o.children.length);
            return h(R.Fragment, { key: o.value }, item(o, false), (o.children || []).map(function (c) { return item(c, true); }),
              first ? h(D.DropdownMenuSeparator, null) : null);
          }) : options.map(function (o) { return item(o, false); })));
    };
  });
})();
