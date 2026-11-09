/* ds-bridge (TEMPORARY) — fixes of дизайн DevartUI (../Design system/devart.ui.react) that the vendored
   ds-bundle/ does not ship yet, with the SAME API on window.DevartUI, so the kit and the pages call D.<Name>
   as they will once the bundle is re-vendored. Loaded first by the insightis-kit loader
   (tools/build-index.mjs), ahead of the product kit.

   The bundle's exports are read-only getters, so a fixed component goes onto a copy of window.DevartUI.
   Each fix names, in a "ships-when-js:" comment, the class string the fixed component carries in the
   bundle's JS; once it is there tools/check.mjs warns: delete the fix, and with none left delete this file
   and re-run tools/build-index.mjs. */
(function () {
  'use strict';
  var D = window.DevartUI, R = window.React, h = R.createElement;
  var fixed = {};

  /* useGutterInset (src/hooks/use-gutter-inset) — the gutter reserved whether or not the body overflows, and the
     right padding the measured left padding less the bar: the content inset alike on both sides, with a bar or
     without one, whatever the platform's bar is */
  function useGutterInset(ref) {
    var s = R.useState(0), bar = s[0], setBar = s[1];
    var st = R.useState(null), start = st[0], setStart = st[1];
    R.useLayoutEffect(function () {
      var el = ref.current;
      if (!el) return undefined;
      function measure() {
        var cs = getComputedStyle(el);
        setBar(Math.max(0, el.offsetWidth - el.clientWidth - (parseFloat(cs.borderLeftWidth) || 0) - (parseFloat(cs.borderRightWidth) || 0)));
        setStart(parseFloat(cs.paddingLeft) || 0);
      }
      measure();
      window.addEventListener('resize', measure);
      var ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
      if (ro) ro.observe(el);
      return function () { window.removeEventListener('resize', measure); if (ro) ro.disconnect(); };
    }, [ref]);
    return { scrollbarGutter: 'stable', paddingInlineEnd: start == null ? undefined : Math.max(0, start - bar) + 'px' };
  }
  function rest(p) {
    var r = Object.assign({}, p);
    ['ref', 'className', 'shadowSize', 'style', 'children'].forEach(function (k) { delete r[k]; });
    return r;
  }
  function refs(p, bodyRef) {
    return function (node) {
      bodyRef.current = node;
      if (typeof p.ref === 'function') p.ref(node); else if (p.ref) p.ref.current = node;
    };
  }

  /* §176 — ModalBody: the scrollbar in the dialog's own right padding, against its edge; the body spans the dialog
     (-mx-4 px-4) and useGutterInset keeps the content inset alike (src/components/Modal/ModalBody.tsx).
     ships-when-js: scrollbar-thin -mx-4 flex min-h-0 flex-1 flex-col gap-3 px-4 */
  fixed.ModalBody = function ModalBody(p) {
    var bodyRef = R.useRef(null), inset = useGutterInset(bodyRef);
    return h(D.ScrollShadow, Object.assign(rest(p), {
      ref: refs(p, bodyRef),
      size: p.shadowSize == null ? 40 : p.shadowSize,
      className: D.cn('scrollbar-thin -mx-4 flex min-h-0 flex-1 flex-col gap-3 px-4', p.className),
      style: Object.assign({}, inset, p.style)
    }), p.children);
  };

  /* §178 — SheetBody, as ModalBody: it spans the sheet (-mx-6 px-6 over SheetContent's p-6), the system's thin bar
     against the sheet's edge, useGutterInset keeping the content inset alike; a sheet with no padding passes mx-0
     (src/components/Sheet/index.tsx).
     ships-when-js: scrollbar-thin -mx-6 flex min-h-0 flex-1 flex-col overflow-y-auto px-6 */
  fixed.SheetBody = function SheetBody(p) {
    var bodyRef = R.useRef(null), inset = useGutterInset(bodyRef);
    return h('div', Object.assign(rest(p), {
      ref: refs(p, bodyRef),
      className: D.cn('scrollbar-thin -mx-6 flex min-h-0 flex-1 flex-col overflow-y-auto px-6', p.className),
      style: Object.assign({}, inset, p.style)
    }), p.children);
  };

  window.DevartUI = Object.assign({}, D, fixed);
})();
