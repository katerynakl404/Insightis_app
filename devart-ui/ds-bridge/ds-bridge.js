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

  /* §176 — ModalBody: the scrollbar in the dialog's own right padding, against its edge; the fields inset 16px
     on both sides with a bar or without one. The body spans the dialog (-mx-4 px-4), the gutter is reserved,
     and the right padding is 16px less the bar's measured width (src/components/Modal/ModalBody.tsx).
     ships-when-js: scrollbar-thin -mx-4 flex min-h-0 flex-1 flex-col gap-3 px-4 */
  fixed.ModalBody = function ModalBody(p) {
    var bodyRef = R.useRef(null);
    var s = R.useState(0), bar = s[0], setBar = s[1];
    R.useLayoutEffect(function () {
      var el = bodyRef.current;
      if (!el) return undefined;
      function measure() {
        var cs = getComputedStyle(el);
        setBar(Math.max(0, el.offsetWidth - el.clientWidth - parseFloat(cs.borderLeftWidth) - parseFloat(cs.borderRightWidth)));
      }
      measure();
      window.addEventListener('resize', measure);
      var ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
      if (ro) ro.observe(el);
      return function () { window.removeEventListener('resize', measure); if (ro) ro.disconnect(); };
    }, []);
    var rest = Object.assign({}, p);
    ['ref', 'className', 'shadowSize', 'style', 'children'].forEach(function (k) { delete rest[k]; });
    return h(D.ScrollShadow, Object.assign(rest, {
      ref: function (node) {
        bodyRef.current = node;
        if (typeof p.ref === 'function') p.ref(node); else if (p.ref) p.ref.current = node;
      },
      size: p.shadowSize == null ? 40 : p.shadowSize,
      className: D.cn('scrollbar-thin -mx-4 flex min-h-0 flex-1 flex-col gap-3 px-4', p.className),
      style: Object.assign({ scrollbarGutter: 'stable', paddingInlineEnd: 'calc(1rem - ' + bar + 'px)' }, p.style)
    }), p.children);
  };

  window.DevartUI = Object.assign({}, D, fixed);
})();
