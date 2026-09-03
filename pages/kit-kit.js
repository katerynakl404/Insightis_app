/* ============================================================================================
   kit-kit.js — the kit's shared behaviour layer.

   Third file of the kit, alongside `insightis-preview-kit.html` (markup + storybook JS) and
   `pages/kit-theme.css` (all CSS). It holds the behaviour that is part of a COMPONENT'S CONTRACT
   rather than part of a page: things every consumer must do identically or the component is wrong.

   Rules:
   - Nothing page-specific lives here. Page flows (render functions, seed data, dialogs) stay in
     the page's own inline <script>.
   - No page may re-implement anything in this file. If a page needs different behaviour, that is
     a component-contract change: change it here, for every consumer, in one pass.
   - Self-installing on load; safe to include more than once (guarded).
   - Plain ES5-era JS, no build step, no dependencies — same constraint as the rest of the kit.

   Contents:
   1. Tooltip engine  — every [data-tip] in the product (Files spec rules 18 + 23).
   2. Menu placement  — flips anchored .menu variants to .menu.is-up when there is no room below.
   ============================================================================================ */
(function () {
  if (window.__kitKitLoaded) return;
  window.__kitKitLoaded = true;

  /* ==========================================================================================
     1. TOOLTIP ENGINE
     JS-positioned fixed tooltip so it escapes any `overflow:hidden` ancestor. Adds
     `html.tt-js`, which switches off the CSS `::after` fallback declared in kit-theme.css.

     LOCKED RECIPE (Files spec rules 23 + 18 — do not "improve" without a new contract):
     - every hover waits TIP_DELAY (300ms). There is NO warm-up / instant re-show: a warm-up
       makes rapid hovers appear instantly, which reads as "the delay is broken".
     - hides on `mousedown`, because a clicked button often re-renders or removes itself while
       still hovered, so no `mouseout` ever fires and the tooltip would linger over the new UI.
     ========================================================================================== */
  var TIP_DELAY = 300;
  /* Elements that get a tooltip. Sidebar rail items carry no data-tip (their label is visible
     when expanded) — the engine derives their text only while the rail is collapsed. */
  var TIP_SEL = '[data-tip],.sbx-nav-item,.sbx-chats-icon';
  var ft, showTimer;

  function tipEl() {
    if (!ft) {
      ft = document.createElement('div');
      ft.setAttribute('aria-hidden', 'true');
      ft.style.cssText = 'position:fixed;z-index:9999;background:var(--ink);color:var(--card);font-size:.75rem;border-radius:6px;padding:4px 8px;pointer-events:none;white-space:nowrap;font-family:inherit;line-height:1.35;opacity:0;transition:opacity .1s;display:none';
      document.body.appendChild(ft);
    }
    return ft;
  }

  function tipText(el) {
    var text = el.getAttribute('data-tip');
    if (text) return text;
    /* Collapsed sidebar rail: derive the label from the (hidden) .lbl or aria-label so each icon
       tips on hover. When the rail is expanded the label is visible → no tooltip, so it never
       duplicates text the user can already read. */
    if (el.classList.contains('sbx-nav-item') || el.classList.contains('sbx-chats-icon')) {
      if (!el.closest('.sbx.is-collapsed')) return '';
      var lbl = el.querySelector('.lbl');
      return ((lbl ? lbl.textContent : (el.getAttribute('aria-label') || '')) || '').trim();
    }
    return '';
  }

  function tipShow(el) {
    var text = tipText(el);
    if (!text) return;
    var f = tipEl(), r = el.getBoundingClientRect();
    f.textContent = text;
    f.style.display = 'inline-flex';
    f.style.opacity = '0';
    var tw = f.offsetWidth, th = f.offsetHeight, lx, ty;
    if (el.closest('.sbx.is-collapsed')) {
      /* Collapsed rail → tooltip to the RIGHT of the icon, vertically centred (flips to the left
         when the viewport can't fit it on the right). */
      lx = r.right + 8;
      if (lx + tw > window.innerWidth - 4) lx = r.left - tw - 8;
      ty = Math.max(4, Math.min(r.top + r.height / 2 - th / 2, window.innerHeight - th - 4));
    } else {
      lx = Math.max(4, Math.min(r.left + r.width / 2 - tw / 2, window.innerWidth - tw - 4));
      ty = r.top - th - 5;
      if (ty < 4) ty = r.bottom + 5;
    }
    f.style.left = lx + 'px';
    f.style.top = ty + 'px';
    f.style.transition = 'opacity .12s';
    f.style.opacity = '1';
  }

  function tipHide() {
    if (ft) { ft.style.transition = 'opacity .1s'; ft.style.opacity = '0'; }
    clearTimeout(showTimer);
  }

  document.documentElement.classList.add('tt-js');
  document.addEventListener('mouseover', function (e) {
    var el = e.target.closest && e.target.closest(TIP_SEL);
    if (!el) return;
    clearTimeout(showTimer);
    showTimer = setTimeout(function () { tipShow(el); }, TIP_DELAY);
  }, true);
  document.addEventListener('mouseout', function (e) {
    var el = e.target.closest && e.target.closest(TIP_SEL);
    if (!el) return;
    var to = e.relatedTarget;
    if (to && to.closest && to.closest(TIP_SEL)) return;
    tipHide();
  }, true);
  document.addEventListener('mousedown', function () { tipHide(); }, true);
  window.kitTipHide = tipHide;

  /* ==========================================================================================
     2. MENU PLACEMENT — down by default, .menu.is-up when the trigger sits too low

     Anchored menus (.chat-row-menu, .sbx-chat-menu, .kbp-menu, …) are shown purely by CSS:
     `[aria-expanded="true"] ~ .menu`. So the moment a trigger's aria-expanded flips to "true",
     the menu is laid out and measurable. One attribute MutationObserver therefore covers every
     menu on every page — no per-page wiring, no per-page copy of this logic, and menus rendered
     later by JS are handled automatically because the observer watches the whole document.

     Each menu variant declares its trigger gap once as `--menu-gap` in kit-theme.css; the shared
     `.menu.is-up` rule mirrors that offset from `top` to `bottom`.
     ========================================================================================== */
  var FLIP_PAD = 8; /* keep the menu this far from the viewport edge before flipping */

  /* The menu a trigger controls: a later sibling .menu (matches the CSS `~ .menu` selectors),
     or the element named by aria-controls. */
  function menuFor(trigger) {
    var id = trigger.getAttribute('aria-controls');
    if (id) { var byId = document.getElementById(id); if (byId && byId.classList.contains('menu')) return byId; }
    var sib = trigger.nextElementSibling;
    while (sib) { if (sib.classList && sib.classList.contains('menu')) return sib; sib = sib.nextElementSibling; }
    return null;
  }

  function placeMenu(trigger, menu) {
    if (!menu) return;
    /* Measure downward first: clearing .is-up gives the menu its default anchor, so the read is
       always "would it fit if it opened down?" regardless of the previous open's direction. */
    menu.classList.remove('is-up');
    var t = trigger.getBoundingClientRect();
    var h = menu.offsetHeight;
    var roomBelow = window.innerHeight - t.bottom;
    var roomAbove = t.top;
    /* Flip only when down genuinely doesn't fit AND up fits better — never trade a clipped
       bottom for a clipped top. */
    if (roomBelow < h + FLIP_PAD && roomAbove > roomBelow) menu.classList.add('is-up');
  }

  function placeFrom(trigger) {
    if (!trigger || trigger.getAttribute('aria-expanded') !== 'true') return;
    placeMenu(trigger, menuFor(trigger));
  }
  window.kitPlaceMenu = placeFrom;

  new MutationObserver(function (recs) {
    for (var i = 0; i < recs.length; i++) {
      var el = recs[i].target;
      if (el.nodeType !== 1 || el.getAttribute('aria-expanded') !== 'true') continue;
      placeFrom(el);
    }
  }).observe(document.documentElement, {
    subtree: true, attributes: true, attributeFilter: ['aria-expanded']
  });

  /* An open menu near the viewport edge must re-decide when the viewport changes under it. */
  function replaceOpen() {
    var open = document.querySelectorAll('[aria-expanded="true"]');
    for (var i = 0; i < open.length; i++) placeFrom(open[i]);
  }
  window.addEventListener('resize', replaceOpen);
  window.addEventListener('scroll', replaceOpen, true);
})();
