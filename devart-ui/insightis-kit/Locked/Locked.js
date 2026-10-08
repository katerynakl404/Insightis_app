/* Locked — turns ANY trigger (Button, IconButton, DropdownMenuItem, a row, a menu trigger, a card)
   into a plan-locked one, driven by IK.usePlan(). Port of kit-kit.js §5–§8 (kitLock + the upgrade
   popover / modal engines) and the decision table in changes/UpgradePopover.md.

   LOCKED ≠ DISABLED (the whole design):
                     Locked                              Disabled
     offers          a plan that turns it on             nothing
     hover surface   keeps it                            none
     cursor          pointer                             not-allowed
     click           opens the upgrade popover / modal   nothing
     inner control   Switch/Checkbox/Radio/Slider inert, at disabled opacity
     label           Text/Secondary (rows)               Text/Inactive
   A locked control is NEVER aria-disabled — it announces aria-haspopup="dialog", because that is
   what it does. Reading (filters, search, tabs, browsing, navigation) is never gated, nor is
   destroying what you already have (Delete, Disconnect).

   ── Element child ───────────────────────────────────────────────────────────────────────────
   h(IK.Locked, { feature: 'connections', surface: 'modal' },
     h(D.Button, { variant: 'primary', size: 'sm', leftSlot: plusIcon }, 'Create Connection'))

   h(D.DropdownMenuContent, null,
     h(IK.Locked, { feature: 'connection-edit' }, h(D.DropdownMenuItem, null, editIcon, 'Edit')),
     h(D.DropdownMenuItem, { variant: 'danger' }, deleteIcon, 'Disconnect'))      // never gated

   h(IK.Locked, { feature: 'metrics', marker: 'none' },                         // switch row:
     h('div', { className: 'pg-swt-wrap' }, h(D.Switch, { checked: true })))   // lock the WRAP

   ── Render prop (anything Locked cannot reach by cloning one element) ─────────────────────
   h(IK.Locked, { feature: 'connections', menuTrigger: true, look: 'disabled', side: 'top' },
     function (lock) {
       return h(D.DropdownMenuTrigger, Object.assign({ asChild: true }, lock.props),
         h(D.Button, { variant: 'tertiary', size: 'sm', leftSlot: lock.locked ? lock.glyph : linkIcon }, 'Connections'));
     })

   ── Hook (same engine, you render the overlay) ──────────────────────────────────────────────
   var lock = IK.useLock('metrics', { surface: 'modal' });
   … h(D.Button, Object.assign({}, lock.props, { leftSlot: lock.locked ? lock.glyph : icon }), 'Create Metric'),
     lock.overlay …

   Props / options
     feature      key of IK.PLAN_FEATURES, or a { plan, name, title, lead, benefits } object
     locked       boolean — default: IK.usePlan()[0] === 'free'. Unlocked = the child untouched.
     surface      'popover' (default — hover after 300 ms, or a click/tap) | 'modal' (a PRESS: Create,
                  Connect, Edit, Add — opens the UpgradeModal; hover does nothing)
     clickOnly    popover answers the click only, never the hover — a target bigger than its label
                  (a catalog card), where a panel appearing under the pointer reads as grabbing
     marker       where the padlock goes, by the SHAPE of the control:
                    'auto'  (default) Button / IconButton / LinkButton → 'lead'; DropdownMenuItem
                            → 'trail'; anything else → 'none'
                    'lead'  replaces the leading icon (Button leftSlot, IconButton glyph) or is
                            prepended — the padlock is the control's own icon slot
                    'trail' appended at the right-hand edge — a row keeps its own icon / logo
                    'badge' the plan NAME in a Badge with the padlock, at the right-hand edge
                    'none'  a switch row (the dimmed switch says it), a catalog tile
     plan         Badge text for marker 'badge' (default: the feature's plan)
     look         'disabled' — the composer Connections control only: its menu leads nowhere on
                  Free, so it reads disabled (Text/Inactive, not-allowed, no hover surface) while
                  still explaining itself on hover
     side / align popover placement. Default: 'right' inside a menu or listbox (the list stays
                  readable; Radix flips to the left), otherwise 'bottom' (flips to top). A trigger
                  whose own menu opens upward passes side: 'top'.
     tip          one-line tooltip for surface 'modal' (the hover names the plan, the press explains)
     menuTrigger  the child is a Radix DropdownMenuTrigger: also stop its pointerdown / Enter /
                  Space / ArrowDown so the menu stays shut and the popover answers instead
     onUpgrade    CTA override (default IK.goUpgrade → Settings → Manage plan)
   lock (render prop / hook): { locked, props, overlay, glyph, open, close }

   Behaviour (locked contract): popover opens on hover after IK.TOOLTIP_DELAY (300 ms — the tooltip's
   own constant, one hover timing in the system) or at once on click / tap; the pointer may travel
   from the trigger into the panel (160 ms grace); Esc closes it and returns focus to the trigger;
   an outside click closes it; any scroll or resize closes it; it never closes the menu it was
   opened from (the click is stopped at the trigger); a keyboard press moves focus into the panel.
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  var GRACE = 160;   /* travel time between trigger and panel before closing (kit-kit.js UPOP_GRACE) */

  function setRef(ref, v) {
    if (!ref) return;
    if (typeof ref === 'function') ref(v); else ref.current = v;
  }
  function chain(a, b) {
    if (!a) return b; if (!b) return a;
    return function (e) { a(e); b(e); };
  }
  function toArray(c) { return R.Children.toArray(c); }

  IK.useLock = function useLock(feature, o) {
    o = o || {};
    var plan = IK.usePlan()[0];
    var locked = o.locked != null ? !!o.locked : plan === 'free';
    var surface = o.surface === 'modal' ? 'modal' : 'popover';
    var nodeRef = R.useRef(null);
    var openS = R.useState(false), open = openS[0], setOpen = openS[1];
    var modalS = R.useState(false), modal = modalS[0], setModal = modalS[1];
    var kbS = R.useState(false), kb = kbS[0], setKb = kbS[1];
    var sideS = R.useState('bottom'), side = sideS[0], setSide = sideS[1];
    var openT = R.useRef(0), closeT = R.useRef(0), kbAt = R.useRef(0);

    function clearT() { clearTimeout(openT.current); clearTimeout(closeT.current); }
    function autoSide() {
      if (o.side) return o.side;
      var n = nodeRef.current;
      return n && n.closest && n.closest('[role="menu"],[role="listbox"]') ? 'right' : 'bottom';
    }
    function show(keyboard) {
      clearT();
      setKb(!!keyboard);
      setSide(autoSide());
      setOpen(true);
    }
    function hide() { clearT(); setOpen(false); }
    function hideSoon() { clearTimeout(closeT.current); closeT.current = setTimeout(function () { setOpen(false); }, GRACE); }

    R.useEffect(function () { return clearT; }, []);
    R.useEffect(function () { if (!locked) { hide(); setModal(false); } }, [locked]);
    /* Scrolling or resizing closes the popover — it is positioned for a layout that just moved. */
    R.useEffect(function () {
      if (!open) return;
      function c() { setOpen(false); }
      window.addEventListener('scroll', c, true);
      window.addEventListener('resize', c);
      return function () { window.removeEventListener('scroll', c, true); window.removeEventListener('resize', c); };
    }, [open]);

    var pop = surface === 'popover';
    var hover = pop && !o.clickOnly;

    function activate(e, keyboard) {
      if (surface === 'modal') { hide(); setModal(true); return; }
      if (open) hide(); else show(keyboard);
    }

    var lookDisabled = o.look === 'disabled';
    var props = !locked ? {} : {
      ref: function (n) { nodeRef.current = n; },
      'aria-haspopup': 'dialog',
      'data-locked': '',
      'data-upgrade-open': open || modal ? '' : undefined,
      className: IK.cx('ik-locked', lookDisabled && 'ik-locked-disabled'),
      onPointerEnter: hover ? function (e) {
        if (e.pointerType === 'touch') return;          /* touch has no hover — the tap is the path */
        clearTimeout(closeT.current);
        if (open) return;
        clearTimeout(openT.current);
        openT.current = setTimeout(function () { show(false); }, IK.TOOLTIP_DELAY);
      } : undefined,
      onPointerLeave: hover ? function () {
        clearTimeout(openT.current);
        if (open) hideSoon();
      } : undefined,
      /* Stopped here: the locked control must not run its own action, and the menu around it must
         not read this as a selection or an outside click. */
      onClick: function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (Date.now() - kbAt.current < 400) return;    /* already answered by the keydown below */
        activate(e, e.detail === 0);
      }
    };
    if (locked && o.menuTrigger) {
      props.onPointerDown = function (e) { e.preventDefault(); };   /* Radix opens its menu on pointerdown */
      props.onKeyDown = function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
          e.preventDefault();
          if (e.key !== 'ArrowDown') { kbAt.current = Date.now(); activate(e, true); }
        }
      };
    }

    var overlay = null;
    if (locked) {
      overlay = surface === 'modal'
        ? h(IK.UpgradeModal, {
            key: 'ik-lock-modal', feature: feature, open: modal, onOpenChange: setModal,
            returnFocusRef: nodeRef, onUpgrade: o.onUpgrade
          })
        : h(IK.UpgradePopover, {
            key: 'ik-lock-pop', feature: feature, open: open,
            onOpenChange: function (v) { if (!v) hide(); else setOpen(true); },
            anchorRef: nodeRef, side: side, align: o.align || 'start', autoFocus: kb,
            onPanelEnter: function () { clearTimeout(closeT.current); },
            onPanelLeave: hover ? hideSoon : undefined,
            onUpgrade: o.onUpgrade
          });
    }

    return {
      locked: locked, props: props, overlay: overlay, open: open || modal,
      glyph: h(IK.LockGlyph, { key: 'ik-lock' }),
      close: function () { hide(); setModal(false); }
    };
  };

  IK.Locked = function Locked(p) {
    var lock = IK.useLock(p.feature, p);
    if (typeof p.children === 'function') return h(IK.Fragment, null, p.children(lock), lock.overlay);
    var child = R.Children.only(p.children);
    if (!lock.locked) return child;

    var t = child.type, cprops = child.props || {};
    var isBtn = t === D.Button || t === D.LinkButton, isIcon = t === D.IconButton;
    var marker = p.marker || 'auto';
    if (marker === 'auto') marker = (isBtn || isIcon) ? 'lead' : (t === D.DropdownMenuItem ? 'trail' : 'none');
    var f = IK.planFeature(p.feature) || {};

    var next = {
      ref: function (n) { lock.props.ref(n); setRef(cprops.ref, n); },
      className: IK.cx(cprops.className, lock.props.className),
      'aria-haspopup': 'dialog',
      'data-locked': '',
      'data-upgrade-open': lock.props['data-upgrade-open'],
      onClick: lock.props.onClick,                         /* NOT chained: the action must not run */
      onPointerEnter: chain(cprops.onPointerEnter, lock.props.onPointerEnter),
      onPointerLeave: chain(cprops.onPointerLeave, lock.props.onPointerLeave),
      onPointerDown: lock.props.onPointerDown ? lock.props.onPointerDown : cprops.onPointerDown,
      onKeyDown: lock.props.onKeyDown ? chain(lock.props.onKeyDown, cprops.onKeyDown) : cprops.onKeyDown
    };
    if (t === D.DropdownMenuItem) next.onSelect = function (e) { e.preventDefault(); };

    var glyph = h(IK.LockGlyph, { key: 'ik-lock' });
    if (marker === 'lead') {
      if (isIcon) next.children = glyph;
      else if (t === D.Button) next.leftSlot = glyph;
      else next.children = [glyph].concat(toArray(cprops.children));
    } else if (marker === 'trail') {
      next.children = toArray(cprops.children).concat([h(IK.LockGlyph, { key: 'ik-lock', className: 'ms-auto' })]);
    } else if (marker === 'badge') {
      next.children = toArray(cprops.children).concat([h(IK.PlanLock, { key: 'ik-lock', plan: p.plan != null ? p.plan : f.plan, glyph: true, className: 'ms-auto' })]);
    }

    var el = R.cloneElement(child, next);
    if (p.tip && p.surface === 'modal') el = h(IK.Tip, { tip: p.tip, side: p.tipSide }, el);
    return h(IK.Fragment, null, el, lock.overlay);
  };
})();
