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
   3. Toast host      — the single top-right stack + window.kitToast / window.kitToastDismiss.
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
      /* max-width caps the bubble at --tip-max-w and lets long copy wrap; width:max-content keeps a
         short tip hugging its text instead of stretching to the cap. Without the cap the bubble was
         nowrap-infinite and could out-run the viewport — tipShow() clamps POSITION, not width. */
      ft.style.cssText = 'position:fixed;z-index:9999;background:var(--ink);color:var(--card);font-size:.75rem;border-radius:6px;padding:4px 8px;pointer-events:none;max-width:var(--tip-max-w);width:max-content;white-space:normal;text-align:left;font-family:inherit;line-height:1.35;opacity:0;transition:opacity .1s;display:none';
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
  var FLIP_PAD = 8; /* keep the menu this far from the clipping edge before flipping */

  /* The edges a menu is actually clipped by. Usually the viewport — but an anchored menu is
     position:absolute inside its trigger's wrapper, so ANY ancestor that clips (a scrolling
     dialog body, a scrolling table wrapper, an overflow:hidden pane) cuts it off long before the
     viewport does. Measuring room against the viewport there reports space the menu cannot use:
     the Data source select at the bottom of a scrolling Create-metric body had 32px of its 42px
     menu cut, while "room below" still looked fine. Walk up to the nearest clipping ancestor and
     use its box; fall back to the viewport when there is none. */
  function clipBounds(el) {
    var n = el.parentElement;
    while (n && n !== document.body && n !== document.documentElement) {
      var cs = getComputedStyle(n);
      if (/(auto|scroll|hidden|overlay)/.test(cs.overflowY) || /(auto|scroll|hidden|overlay)/.test(cs.overflow)) {
        var r = n.getBoundingClientRect();
        /* Never report bounds wider than the viewport — a clipping box can extend off-screen. */
        return { top: Math.max(r.top, 0), bottom: Math.min(r.bottom, window.innerHeight) };
      }
      n = n.parentElement;
    }
    return { top: 0, bottom: window.innerHeight };
  }

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
    var b = clipBounds(trigger);
    var roomBelow = b.bottom - t.bottom;
    var roomAbove = t.top - b.top;
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

  /* An open menu near a clipping edge must re-decide when the viewport — or a scroll container
     under it — moves. The scroll listener is capturing, so it also catches inner scrollers. */
  function replaceOpen() {
    var open = document.querySelectorAll('[aria-expanded="true"]');
    for (var i = 0; i < open.length; i++) placeFrom(open[i]);
  }
  window.addEventListener('resize', replaceOpen);
  window.addEventListener('scroll', replaceOpen, true);

  /* ==========================================================================================
     3. TOAST HOST
     One stack per document (.toast-stack, styled in kit-theme.css), created the first time a
     toast is shown. Every page uses this — a page must not build its own stack or its own
     show/dismiss pair, or the two copies drift in duration, icon set and stacking order.

     kitToast(msg, desc, variant, id) → the .toast element.
       msg / desc  HTML strings (desc optional — omit and the description line is not rendered).
       variant     'success' | 'error' | 'info' | 'warning' | 'loading'
                   ('loading' renders the info variant with a spinning glyph and no countdown —
                    it stays until replaced by a later call with the same id).
       id          optional identity. Passing the same id again MORPHS that toast in place
                   instead of stacking a duplicate, so one operation owns one toast for its
                   whole life (pending → success / error).
     kitToastDismiss(el) removes a toast with its exit transition.
     ========================================================================================== */
  var TOAST_MS = 5000; /* countdown length; the .toast-prog strip drains over exactly this long */
  var TOAST_ICONS = {
    success: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    error:   '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/>',
    info:    '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    warning: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4M12 17h.01"/>',
    loading: '<path d="M21 12a9 9 0 1 1-6.219-8.56"/>'
  };

  function toastStack() {
    var stack = document.getElementById('kit-toast-stack');
    if (!stack) {
      stack = document.createElement('div');
      stack.id = 'kit-toast-stack';
      stack.className = 'toast-stack';
      /* polite: a toast never interrupts what the user is reading. An error toast that reports a
         field the user must fix is paired with focus moving to that field, which announces it. */
      stack.setAttribute('role', 'status');
      stack.setAttribute('aria-live', 'polite');
      document.body.appendChild(stack);
    }
    return stack;
  }

  function toastEl(id) {
    var el = document.createElement('div');
    el.className = 'toast';
    el.style.opacity = '0';
    el.style.transform = 'translateY(-.5rem)';
    if (id) el.setAttribute('data-toast-id', id);
    el.innerHTML = '<div class="toast-row">'
      + '<svg class="toast-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"></svg>'
      + '<div class="toast-body"><span class="toast-msg"></span><span class="toast-desc" style="display:none"></span></div>'
      + '<button class="iconbtn iconbtn-tertiary toast-x" type="button" aria-label="Close" data-tip="Close"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button>'
      + '</div><div class="toast-prog"><span></span></div>';
    el.querySelector('.toast-x').onclick = function () { dismissToast(el); };
    return el;
  }

  function showToast(msg, desc, variant, id) {
    variant = variant || 'success';
    var loading = variant === 'loading';
    var stack = toastStack();
    var el = id ? stack.querySelector('[data-toast-id="' + id + '"]') : null;
    var isNew = !el;
    if (isNew) { el = toastEl(id); stack.appendChild(el); }
    el.classList.remove('var-success', 'var-error', 'var-info', 'var-warning');
    el.classList.add('var-' + (loading ? 'info' : variant));
    var ic = el.querySelector('.toast-ic');
    ic.innerHTML = TOAST_ICONS[variant] || TOAST_ICONS.success;
    ic.classList.toggle('spin', loading);
    el.querySelector('.toast-msg').innerHTML = msg;
    var d = el.querySelector('.toast-desc');
    d.innerHTML = desc || '';
    d.style.display = desc ? '' : 'none';
    if (isNew) requestAnimationFrame(function () {
      el.style.transition = 'opacity .2s, transform .2s';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
    var prog = el.querySelector('.toast-prog > span');
    clearTimeout(el._t);
    if (loading) { prog.style.transition = 'none'; prog.style.width = '0'; }
    else {
      prog.style.transition = 'none'; prog.style.width = '100%';
      requestAnimationFrame(function () {
        prog.style.transition = 'width ' + (TOAST_MS / 1000) + 's linear';
        prog.style.width = '0';
      });
      el._t = setTimeout(function () { dismissToast(el); }, TOAST_MS);
    }
    return el;
  }

  function dismissToast(el) {
    if (!el) return;
    clearTimeout(el._t);
    el.style.transition = 'opacity .2s, transform .2s';
    el.style.opacity = '0';
    el.style.transform = 'translateY(-.5rem)';
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 220);
  }

  window.kitToast = showToast;
  window.kitToastDismiss = dismissToast;
})();
