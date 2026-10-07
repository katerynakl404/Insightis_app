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
   1b. Scroll-to-bottom — .cp-scroll-btn hides itself while the thread is already at the end.
   3. Toast host      — the single top-right stack + window.kitToast / window.kitToastDismiss.
   4. Sortable list   — drag-to-reorder + Alt+↑/↓ for any [data-sortable]; emits kit:sorted.
   5. Disabled guard  — swallows activation on [aria-disabled="true"], the job the native
                        `disabled` attribute did before the kit stopped relying on it.
   6. Upgrade popover — opens .pop-upgrade from any [data-upgrade] trigger, locked or disabled;
                        [data-upgrade-click] makes a large target answer the click only.
   7. Plan harness   — the mockups' Free / Paid switch: stored, restored, broadcast as kit:plan.
   8. Upgrade modal  — [data-upgrade-modal] opens the U3 dialog; Esc, Not now and the scrim close it.
   9. Theme harness  — the mockups' Light / Dark switch: stored, restored, broadcast as kit:theme.
  10. Sidebar promo  — #sbx-promo-card shows on Free only; the X dismisses it for the session.
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
     - hides when the anchored trigger LEAVES THE DOM, which the mousedown guard above misses
       whenever the re-render is driven by something other than a click. The composer's action
       slot swaps Stop → Send as soon as the person TYPES: no mousedown, no mouseout, element
       replaced under the cursor — and "Stop the reply" hung over the Send that replaced it.
       Delay and no-warm-up semantics are untouched; this only closes that leak.
     ========================================================================================== */
  var TIP_DELAY = 300;
  /* Elements that get a tooltip. Sidebar rail items carry no data-tip (their label is visible
     when expanded) — the engine derives their text only while the rail is collapsed. */
  var TIP_SEL = '[data-tip],.sbx-nav-item,.sbx-chats-icon';
  var ft, showTimer, tipAnchor;

  function tipEl() {
    if (!ft) {
      ft = document.createElement('div');
      ft.setAttribute('aria-hidden', 'true');
      /* max-width caps the bubble at --tip-max-w and lets long copy wrap; width:max-content keeps a
         short tip hugging its text instead of stretching to the cap. Without the cap the bubble was
         nowrap-infinite and could out-run the viewport — tipShow() clamps POSITION, not width. */
      ft.style.cssText = 'position:fixed;z-index:9999;background:var(--ink-primary);color:var(--surface-card);font-size:.75rem;border-radius:6px;padding:4px 8px;pointer-events:none;max-width:var(--tip-max-w);width:max-content;white-space:normal;text-align:left;font-family:inherit;line-height:1.35;opacity:0;transition:opacity .1s;display:none';
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
    tipAnchor = el;
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
    tipAnchor = null;
  }

  /* The trigger can be torn out of the DOM by a re-render that involves no pointer event at all
     (typing, a timer, a state change elsewhere). Watch for the anchor going away and hide, so a
     tooltip is never left floating over whatever took its place. Cheap: the callback only runs on
     DOM mutations, and only does work while a tooltip is actually anchored. */
  if (typeof MutationObserver === 'function') {
    new MutationObserver(function () {
      if (tipAnchor && !tipAnchor.isConnected) tipHide();
    }).observe(document.documentElement, { childList: true, subtree: true });
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
     1b. SCROLL-TO-BOTTOM BUTTON — only exists when there is somewhere to scroll

     `.cp-scroll-btn` floats over the thread and jumps to the newest message. Sitting there while
     the thread is ALREADY at the bottom makes it a permanent ornament that does nothing, and it
     covers content. It now hides whenever its scroller is within a line of the end, on scroll and
     on resize. Behaviour belongs to the component, so every chat page gets it without page code.
     ========================================================================================== */
  function scrollHost(btn) {
    var p = btn.parentElement;
    if (!p) return null;
    return p.querySelector('.cp-thread') || p.querySelector('[data-scroll-host]') || null;
  }
  function syncScrollBtn(btn) {
    var host = scrollHost(btn);
    if (!host) return;
    var atEnd = host.scrollHeight - host.scrollTop - host.clientHeight < 24;
    btn.classList.toggle('is-hidden', atEnd);
  }
  function bindScrollBtns() {
    document.querySelectorAll('.cp-scroll-btn').forEach(function (btn) {
      if (btn.__kitBound) return;
      var host = scrollHost(btn);
      if (!host) return;
      btn.__kitBound = 1;
      host.addEventListener('scroll', function () { syncScrollBtn(btn); }, { passive: true });
      /* Scrolling is only half of it: the thread also grows while a reply streams, which changes
         "am I at the bottom?" without firing a single scroll event. Watch the scroller AND its
         content box, or the button keeps whatever state it happened to be in when it was bound. */
      if (typeof ResizeObserver === 'function') {
        var ro = new ResizeObserver(function () { syncScrollBtn(btn); });
        ro.observe(host);
        if (host.firstElementChild) ro.observe(host.firstElementChild);
        btn.__kitRO = ro;
      }
      syncScrollBtn(btn);
    });
  }
  window.kitSyncScrollBtns = bindScrollBtns;
  window.addEventListener('resize', bindScrollBtns);
  /* Threads are filled by page scripts after load, so re-check as the DOM settles. */
  if (typeof MutationObserver === 'function') {
    new MutationObserver(function () {
      document.querySelectorAll('.cp-scroll-btn').forEach(syncScrollBtn);
      bindScrollBtns();
    }).observe(document.documentElement, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindScrollBtns);
  else bindScrollBtns();

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

  /* ==========================================================================================
     3b. SCROLL FADE — tell a scroller's bottom edge whether there is more below.

     A scroller opts in with `data-scroll-fade`; the fade itself is drawn by .scroll-fade on its
     nearest non-scrolling ancestor (see kit-theme.css). The class is only on while content is
     actually hidden below — a permanent fade over a finished list says it is cut when it is not.
     ========================================================================================== */
  function syncFade(el) {
    var host = el.closest('.scroll-fade');
    if (!host) return;
    /* Two different questions off one measurement. has-more is about WHERE you are: is there
       anything above or below the fold right now — that is what the two fades answer. is-clipped is about the
       BOX: does the content exceed it at all, wherever you have scrolled to — that is what a
       "show me more" control should key off, because a count of rows cannot answer it once rows
       have different heights. */
    host.classList.toggle('has-above', el.scrollTop > 1);
    host.classList.toggle('has-more', el.scrollHeight - el.scrollTop - el.clientHeight > 1);
    host.classList.toggle('is-clipped', el.scrollHeight - el.clientHeight > 1);
  }
  function bindFades(root) {
    (root || document).querySelectorAll('[data-scroll-fade]').forEach(function (el) {
      if (el.__fadeBound) return;
      el.__fadeBound = true;
      el.addEventListener('scroll', function () { syncFade(el); }, { passive: true });
      if (window.ResizeObserver) new ResizeObserver(function () { syncFade(el); }).observe(el);
      syncFade(el);
    });
  }
  window.kitSyncFades = function (root) { bindFades(root); };
  document.addEventListener('DOMContentLoaded', function () { bindFades(); });
  bindFades();

  /* ==========================================================================================
     4. SORTABLE LIST — drag-to-reorder, pointer + keyboard

     Generic, not queue-specific: any list that lets people reorder its rows opts in with three
     attributes and gets dragging, a drop placeholder, keyboard reordering and a single event.

       <ul data-sortable>
         <li data-sort-item tabindex="0">
           <button data-sort-handle aria-label="Drag to reorder">…</button>
           …
         </li>
       </ul>

     The list receives `kit:sorted` with { from, to } once an item lands; the consumer reorders its
     own data and re-renders. Nothing here mutates anyone's model, and the DOM move is reverted by
     that re-render — so a list that re-renders and a list that doesn't both behave.

     Pointer drag uses Pointer Events, so mouse, pen and touch are one code path (`touch-action:
     none` on the handle keeps a touch drag from scrolling the page instead). Keyboard is Alt+↑/↓
     on the focused row — the same operation, reachable without a pointer, which is what makes
     drag-to-reorder an accessible pattern rather than a mouse-only flourish.
     ========================================================================================== */
  var SORT = null;   /* active drag: { item, list, ph, dy, startY, h } */

  function sortItems(list) {
    return [].filter.call(list.children, function (n) { return n.nodeType === 1 && n.hasAttribute('data-sort-item'); });
  }
  function sortIndex(item) {
    return sortItems(item.parentElement).indexOf(item);
  }
  function sortEmit(list, from, to) {
    if (from === to) return;
    list.dispatchEvent(new CustomEvent('kit:sorted', { bubbles: true, detail: { from: from, to: to } }));
  }

  document.addEventListener('pointerdown', function (e) {
    var handle = e.target.closest && e.target.closest('[data-sort-handle]');
    if (!handle || e.button) return;
    var item = handle.closest('[data-sort-item]');
    var list = item && item.closest('[data-sortable]');
    if (!item || !list) return;

    e.preventDefault();
    var r = item.getBoundingClientRect();
    var ph = document.createElement('li');
    ph.className = 'sort-ph';
    ph.style.height = r.height + 'px';

    SORT = { item: item, list: list, ph: ph, from: sortIndex(item), startY: e.clientY, h: r.height, w: r.width, left: r.left, top: r.top };

    item.classList.add('is-dragging');
    item.style.width = r.width + 'px';
    item.style.position = 'fixed';
    item.style.left = r.left + 'px';
    item.style.top = r.top + 'px';
    item.style.zIndex = '50';
    item.style.pointerEvents = 'none';
    list.insertBefore(ph, item.nextSibling);
    try { handle.setPointerCapture(e.pointerId); } catch (err) {}
  }, true);

  document.addEventListener('pointermove', function (e) {
    if (!SORT) return;
    var dy = e.clientY - SORT.startY;
    SORT.item.style.top = (SORT.top + dy) + 'px';

    /* Place the gap next to whichever sibling the pointer is currently over. Comparing against
       each sibling's midpoint is what makes the swap happen once, at the halfway line, instead of
       flickering while the cursor sits on a boundary. */
    var mid = e.clientY;
    /* Only rows that are actually ON SCREEN take part. A list that clamps itself (the queue shows
       three rows and a "+N more") keeps the rest in the DOM but unrendered, and an unrendered row
       reports a zero-size rect at the document origin — so every midpoint test against it fails,
       the loop falls through, and the row lands at the very END of the list instead of where it
       was dropped. Dropping below the last visible midpoint therefore anchors after that row,
       not after a tail nobody can see. */
    var sibs = sortItems(SORT.list).filter(function (n) {
      return n !== SORT.item && n.getBoundingClientRect().height > 0;
    });
    if (!sibs.length) return;
    for (var i = 0; i < sibs.length; i++) {
      var b = sibs[i].getBoundingClientRect();
      if (mid < b.top + b.height / 2) { SORT.list.insertBefore(SORT.ph, sibs[i]); return; }
    }
    SORT.list.insertBefore(SORT.ph, sibs[sibs.length - 1].nextSibling);
  }, true);

  function sortEnd() {
    if (!SORT) return;
    var s = SORT; SORT = null;
    s.list.insertBefore(s.item, s.ph);
    s.ph.remove();
    s.item.classList.remove('is-dragging');
    s.item.removeAttribute('style');
    var to = sortIndex(s.item);
    s.item.focus && s.item.focus();
    sortEmit(s.list, s.from, to);
  }
  document.addEventListener('pointerup', sortEnd, true);
  document.addEventListener('pointercancel', sortEnd, true);

  /* Keyboard equivalent — Alt+↑/↓ on the focused row. Same event, same result. */
  document.addEventListener('keydown', function (e) {
    if (!e.altKey || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')) return;
    var item = e.target.closest && e.target.closest('[data-sort-item]');
    var list = item && item.closest('[data-sortable]');
    if (!item || !list) return;
    var items = sortItems(list), from = items.indexOf(item), to = from + (e.key === 'ArrowUp' ? -1 : 1);
    if (to < 0 || to >= items.length) return;
    e.preventDefault();
    sortEmit(list, from, to);
  });

  /* ==========================================================================================
     5. DISABLED GUARD — what `disabled` used to do, minus the dead zone

     The kit's disabled recipe no longer sets `pointer-events:none` (see the disabled contract in
     kit-theme.css): a control that is off still has to be able to carry the explanation of WHY
     it is off — a [data-tip], or the upgrade popover below — and a dead element carries nothing.
     The native `disabled` attribute has the same problem one level deeper: browsers swallow
     pointer events on a natively-disabled form control, so the kit marks a control that must
     explain itself with `aria-disabled="true"` instead.

     That leaves activation to block, which is this. Click, Enter and Space are swallowed on
     anything aria-disabled, in the capture phase, before any page handler sees them — except on
     an upgrade trigger, whose whole purpose is to answer the click by explaining itself.
     ========================================================================================== */
  /* Every way the kit says "off": the aria state, the class a page sets, and the storybook's
     forced-state mirror. All three were inert through `pointer-events:none` before, so all three
     have to be inert through here now — otherwise removing that one line would quietly have made
     disabled rows clickable. */
  var INERT_SEL = '[aria-disabled="true"],.is-disabled,.s-disabled';
  function inertTarget(e) {
    var el = e.target.closest && e.target.closest(INERT_SEL);
    if (!el) return null;
    /* An upgrade trigger handles its own click (section 6) — never swallow that one. */
    if (el.hasAttribute('data-upgrade') || el.closest('[data-upgrade]')) return null;
    /* Anything inside an open popover is live UI sitting over a disabled trigger. */
    if (el.closest('.pop-upgrade')) return null;
    return el;
  }
  document.addEventListener('click', function (e) {
    if (!inertTarget(e)) return;
    e.preventDefault();
    e.stopPropagation();
  }, true);
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
    if (!inertTarget(e)) return;
    e.preventDefault();
    e.stopPropagation();
  }, true);

  /* ==========================================================================================
     6. UPGRADE POPOVER — the plan explainer that hangs off a locked control

     Contract:
     - trigger: `data-upgrade="<id of the .pop-upgrade element>"`. The trigger can be anything —
       a menu row, a connection switch row, an action button — and it can be locked, disabled or
       both, which is the reason the sections above stopped making those states inert to the
       pointer.
     - opens on hover after the SAME 300ms the tooltip waits (one hover timing in the kit, never
       two), and immediately on click or tap. Touch has no hover, so the tap is not a fallback —
       it is the primary path on a phone.
     - the pointer may travel from the trigger INTO the popover without it closing: the popover
       holds a CTA, so a hover-only bubble that died on the way there would be unusable.
     - it NEVER closes the menu it was opened from: the click is stopped at the trigger, so the
       menu's own outside-click handler never sees it.
     - Esc closes it, an outside click closes it, scrolling closes it.
     - position is fixed and measured per open: below the trigger, flipped above when there is no
       room, clamped into the viewport horizontally — the same reasoning as the tooltip engine, so
       a popover opened from the last row of a menu is never half off-screen.
     ========================================================================================== */

  /* ------------------------------------------------------------------------------------------
     kitLock(el, opts) — mark one control as plan-locked, or clear the mark.

     Every page gates different controls, but they must all be MARKED the same way, so the marking
     lives here and the choosing stays with the page. One position per KIND of target, never a
     position that depends on what happens to be in the markup:

     1. Leading slot holds a plain icon → the padlock REPLACES it. That slot is the control's own
        icon slot, the first thing read, so the lock costs nothing there; a second glyph beside it
        would make a row of symbols. The original is remembered and restored exactly.
     2. Leading slot is empty → the padlock is PREPENDED. Same place, same reading order, so two
        otherwise identical buttons never wear it on opposite edges.
     3. Leading slot holds an IDENTITY mark — a connector logo, an avatar — → the mark stays and
        the padlock goes to the row's END. Which source a metric or a connection belongs to is
        worth more than the position, and the position is still predictable: logo rows end with it.
     4. The control is a switch, checkbox or radio inside the row → NO padlock. The control is
        already dimmed and inert; a padlock beside it says the same thing twice.
     5. The plan NAME, when given, rides in a Badge at the far edge. If a padlock is already in the
        leading slot the Badge carries the word alone — the lock has been said once.
     6. WHERE the padlock goes is decided by the shape of the thing, not by the page: a BUTTON
        leads with it (icon slot, or prepended), a ROW in a menu or dropdown trails it at the
        right-hand edge. Rows keep their own icons — a menu whose every glyph became the same
        padlock stopped saying which row was which.

     opts: { locked, popover, modal, plan, clickOnly }
       popover → opens the U2 popover · modal → opens the U3 dialog (an action the person pressed)
       plan: 'Starter' → Badge with the word · '' → padlock only · null → no marker at all
     ------------------------------------------------------------------------------------------ */
  /* The leading glyph is swapped for the padlock ONLY on a control that has no row to trail in:
     the composer's Connections trigger, whose own glyph is the thing being locked. In a MENU or a
     dropdown LIST the padlock goes to the right-hand edge and the row keeps its own icon — a
     column of rows whose icons have all turned into the same padlock stops saying which row is
     which (rule set 2026-10-06). */
  var LOCK_GLYPH_SEL = '.cl-dropdown-icon';
  /* Identity marks: they say WHICH thing a row is, so they are never replaced. */
  var LOCK_IDENTITY_SEL = '.logo-spr,.avatar,.mx-prov-ic,.prov-ic-w';
  var LOCK_SVG = '<svg class="lock-glyph" viewBox="0 0 24 24" aria-hidden="true"><use href="#mi-lock"/></svg>';

  function lockBadge(plan, withGlyph) {
    return '<span class="badge badge-sm badge-primary lock-mark">' +
      (withGlyph ? '<svg class="b-ic" viewBox="0 0 24 24" aria-hidden="true"><use href="#mi-lock"/></svg>' : '') +
      plan + '</span>';
  }

  window.kitLock = function (el, opts) {
    if (!el) return;
    opts = opts || {};
    var locked = !!opts.locked;
    /* The leading glyph: a named icon slot, or simply the first child when it is an svg — a button
       that starts with an icon has one whether or not the kit named it. */
    var row = !!el.closest('.menu,.cl-dropdown-menu') || el.classList.contains('mi');
    var lead = row ? null : el.querySelector(LOCK_GLYPH_SEL);
    var identity = !!el.querySelector(LOCK_IDENTITY_SEL);
    if (!row && !lead && !identity) {
      var first = el.firstElementChild;
      if (first && first.tagName.toLowerCase() === 'svg') lead = first;
    }
    var mark = el.querySelector('.lock-mark,.lock-glyph');

    el.classList.toggle('is-locked', locked);

    if (!locked) {
      el.removeAttribute('aria-haspopup');
      el.removeAttribute('data-upgrade');
      el.removeAttribute('data-upgrade-modal');
      el.removeAttribute('data-upgrade-click');
      el.removeAttribute('data-tip');
      if (mark) mark.remove();
      if (lead && lead.getAttribute('data-glyph')) {
        lead.innerHTML = lead.getAttribute('data-glyph');
        lead.removeAttribute('data-glyph');
      }
      return;
    }

    /* No aria-disabled: a locked control is not inert. It is a button that opens a dialog,
       and that is exactly what it announces. */
    el.setAttribute('aria-haspopup', 'dialog');
    if (opts.popover) el.setAttribute('data-upgrade', opts.popover);
    /* An ACTION opens the modal instead: the person had already committed to doing something. */
    if (opts.modal) el.setAttribute('data-upgrade-modal', opts.modal);
    if (opts.clickOnly) el.setAttribute('data-upgrade-click', '');
    /* A tooltip names the plan on hover where the popover waits for a click — the control still
       answers a pointer passing over it, with one line instead of a panel. */
    if (opts.tip) el.setAttribute('data-tip', opts.tip);

    if (lead) {
      if (!lead.getAttribute('data-glyph')) lead.setAttribute('data-glyph', lead.innerHTML);
      lead.innerHTML = '<use href="#mi-lock"/>';
    }
    if (mark) return;                                  /* already marked */
    if (opts.plan) {
      el.insertAdjacentHTML('beforeend', lockBadge(opts.plan, !lead && !identity));
      if (!lead && !identity) return;                  /* the Badge carries the only padlock */
    }
    if (lead) return;                                  /* the swapped glyph IS the padlock */
    if (opts.plan === null) return;                    /* explicitly unmarked (switch rows) */
    /* A ROW trails its padlock at the right-hand edge; a BUTTON leads with it. Identity marks
       (a connector logo, an avatar) also push the padlock to the end — the mark says which thing
       the row is, and losing it costs more than the position does. */
    el.insertAdjacentHTML(row || identity ? 'beforeend' : 'afterbegin', LOCK_SVG);
  };

  var UPOP_GAP = 8;      /* distance from the trigger, matching the menus' --menu-gap default */
  var UPOP_GRACE = 160;  /* travel time allowed between trigger and popover before closing */
  var upopEl, upopTrigger, upopOpenTimer, upopCloseTimer;

  /* ── The panels themselves ──────────────────────────────────────────────────────────────
     A trigger names a FEATURE (`data-upgrade="connections"`), and the panel is built from the
     catalogue in kit-plans.js the first time it is needed, then kept. Before this, every page
     hand-wrote its own copies: 14 popovers and 4 modals for six features — and they had already
     drifted, the same panel reading "Connections" on one page and "Data connections" on another,
     with the metrics benefit worded two different ways.

     A page may still hand-write a panel when it carries live data (the Files storage meter is the
     one such case); a trigger pointing at an existing element id keeps working untouched. */
  function planFeature(key) {
    var cat = window.KIT_PLAN_FEATURES;
    return cat && Object.prototype.hasOwnProperty.call(cat, key) ? cat[key] : null;
  }

  function planHost() {
    var host = document.getElementById('kit-plan-panels');
    if (!host) {
      host = document.createElement('div');
      host.id = 'kit-plan-panels';
      document.body.appendChild(host);
    }
    return host;
  }

  function featList(items) {
    return '<ul class="feat-list">' + items.map(function (b) {
      return '<li>' + b + '</li>';
    }).join('') + '</ul>';
  }

  function planBadge(plan) {
    return '<span class="badge badge-sm badge-primary plan-badge">' + plan + '</span>';
  }

  /* The popover: the feature's name, the plan, the two strongest benefits. Two, not three — it
     hangs beside a pointer and answers a hover, so it states the case and stops. */
  function buildUpop(key, f) {
    var el = document.createElement('div');
    el.className = 'pop pop-upgrade';
    el.id = 'kit-upop-' + key;
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', f.name);
    el.hidden = true;
    el.innerHTML =
      '<div class="pop-up-head">' + f.name + planBadge(f.plan) + '</div>' +
      '<div class="pop-up-body">' + featList(f.benefits.slice(0, 2)) +
      '<button class="btn btn-primary btn-sm" type="button">Upgrade to Unlock</button></div>';
    planHost().appendChild(el);
    return el;
  }

  /* The modal answers a PRESS, so it gets the headline, the sentence and every benefit. */
  function buildUdlg(key, f) {
    var el = document.createElement('div');
    el.className = 'dlg-overlay';
    el.id = 'kit-udlg-' + key;
    el.hidden = true;
    var titleId = 'kit-udlg-' + key + '-title';
    el.innerHTML =
      '<div class="dlg dlg-upgrade" role="dialog" aria-modal="true" aria-labelledby="' + titleId + '">' +
        '<div class="dlg-hdr">' +
          '<div class="dlg-up-head"><div class="dlg-up-title-row">' +
            '<h2 class="dlg-title" id="' + titleId + '">' + f.title + '</h2>' + planBadge(f.plan) +
          '</div></div>' +
          '<button class="iconbtn iconbtn-tertiary iconbtn-sm" type="button" aria-label="Close" data-dlg-close data-tip="Close">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="dlg-content is-stack">' +
          '<p class="dlg-up-lead">' + f.lead + '</p>' + featList(f.benefits) +
        '</div>' +
        '<div class="dlg-ftr">' +
          '<button class="btn btn-secondary btn-sm" type="button" data-dlg-close>Cancel</button>' +
          '<button class="btn btn-primary btn-sm" type="button">Upgrade to Unlock</button>' +
        '</div>' +
      '</div>';
    planHost().appendChild(el);
    return el;
  }

  function planPanel(key, kind) {
    if (!key) return null;
    var existing = document.getElementById(key);
    if (existing) return existing;                 /* a page's own hand-written panel wins */
    var prefix = kind === 'modal' ? 'kit-udlg-' : 'kit-upop-';
    var built = document.getElementById(prefix + key);
    if (built) return built;
    var f = planFeature(key);
    if (!f) return null;
    return kind === 'modal' ? buildUdlg(key, f) : buildUpop(key, f);
  }

  function upopFor(trigger) {
    return planPanel(trigger.getAttribute('data-upgrade'), 'popover');
  }

  /* Placement, in order of preference:
     1. BESIDE the trigger — right, then left. A panel at the side leaves the row it explains
        visible, and leaves the rest of the menu visible with it: open the Pro row and you can
        still see that Light is the one selected. A panel below covers exactly the list the
        person was reading.
     2. Below, then above, when neither side has room — a narrow window, or a trigger against
        the edge. Then it behaves like any anchored menu.
     Both axes are clamped last, so a trigger near a corner still produces a panel fully on
     screen rather than one bleeding off it. */
  function upopPlace(pop, trigger) {
    var r = trigger.getBoundingClientRect(), p = pop.getBoundingClientRect();
    var vw = window.innerWidth, vh = window.innerHeight, g = UPOP_GAP;
    var left = null, top;

    /* WHERE it opens depends on what it hangs off.

       A ROW IN A LIST gets the panel BESIDE it: below would cover exactly the list the person is
       reading, and the point of a locked list is that you can still run your eye down it.

       Anything else — a button, the composer's Connections control — gets it BELOW, or above when
       there is no room, which is how every other panel anchored to that control already behaves.
       A panel at the side of a composer control reads as belonging to the thing next to it. */
    var inList = !!(trigger.closest && trigger.closest('.menu,.cl-dropdown-menu'));

    /* A trigger that owns a MENU opens its panel the way that menu opens: the composer's controls
       open upward, and a popover that dropped downward from the same button made one control
       answer in two directions. The menu's own direction is read off the DOM, not assumed. */
    var ownMenu = !inList && trigger.parentElement
      ? trigger.parentElement.querySelector('.cl-dropdown-menu,.menu') : null;
    var menuOpensUp = !!ownMenu && (ownMenu.classList.contains('is-up') ||
      getComputedStyle(ownMenu).bottom !== 'auto');

    if (inList) {
      if (r.right + g + p.width <= vw - g) {
        left = r.right + g;                     /* right side */
      } else if (r.left - g - p.width >= g) {
        left = r.left - g - p.width;            /* left side */
      }
    }

    if (left !== null) {
      /* Beside: align the panel's top to the trigger's, then clamp into the viewport. */
      top = r.top;
    } else if (menuOpensUp) {
      /* Above, like the control's own menu — falling back below only if there is no room. */
      left = r.left;
      top = r.top - p.height - g;
      if (top < g) {
        var below = r.bottom + g;
        top = (below + p.height <= vh - g) ? below : g;
      }
    } else {
      left = r.left;
      top = r.bottom + g;
      if (top + p.height > vh - g) {
        var above = r.top - p.height - g;
        top = above > g ? above : vh - p.height - g;
      }
    }

    pop.style.left = Math.max(g, Math.min(left, vw - p.width - g)) + 'px';
    pop.style.top = Math.max(g, Math.min(top, vh - p.height - g)) + 'px';
  }

  function upopOpen(trigger) {
    var pop = upopFor(trigger);
    if (!pop) return;
    clearTimeout(upopCloseTimer);
    if (upopEl && upopEl !== pop) upopClose();
    upopEl = pop;
    upopTrigger = trigger;
    pop.style.position = 'fixed';
    pop.style.zIndex = '9998';   /* under the tooltip layer (9999), over every menu */
    pop.hidden = false;
    pop.style.display = 'block';
    upopPlace(pop, trigger);
    /* NOT aria-expanded: on a composer control that attribute is what opens its menu
       (`.cl-dropdown[aria-expanded="true"]+.cl-dropdown-menu`), so setting it here opened the
       very menu the lock exists to keep shut. The panel is a dialog, announced by aria-haspopup,
       and this flag is only for styling the trigger while it is open. */
    trigger.setAttribute('data-upgrade-open', '');
    /* The tooltip and the popover would say the same thing twice — the bigger one wins. */
    if (window.kitTipHide) window.kitTipHide();
  }

  function upopClose() {
    clearTimeout(upopOpenTimer);
    clearTimeout(upopCloseTimer);
    if (!upopEl) return;
    upopEl.hidden = true;
    upopEl.style.display = '';
    if (upopTrigger) upopTrigger.removeAttribute('data-upgrade-open');
    upopEl = null;
    upopTrigger = null;
  }

  function upopCloseSoon() {
    clearTimeout(upopCloseTimer);
    upopCloseTimer = setTimeout(upopClose, UPOP_GRACE);
  }

  document.addEventListener('mouseover', function (e) {
    var t = e.target.closest && e.target.closest('[data-upgrade]');
    if (t) {
      clearTimeout(upopCloseTimer);
      /* `data-upgrade-click` — a trigger that answers the CLICK only. Hover-opening suits a
         control: a row, a button, something the size of its own label. On a large target — a
         catalog card the size of a thumbnail — a panel that appears because the pointer crossed
         it reads as the page grabbing at you. The card still explains itself; it waits to be
         asked. */
      if (t.hasAttribute('data-upgrade-click')) return;
      if (upopTrigger === t) return;
      clearTimeout(upopOpenTimer);
      upopOpenTimer = setTimeout(function () { upopOpen(t); }, TIP_DELAY);
      return;
    }
    /* Inside the open popover: keep it open, the CTA lives there. */
    if (upopEl && e.target.closest && e.target.closest('.pop-upgrade') === upopEl) {
      clearTimeout(upopCloseTimer);
    }
  }, true);

  document.addEventListener('mouseout', function (e) {
    var from = e.target.closest && (e.target.closest('[data-upgrade]') || e.target.closest('.pop-upgrade'));
    if (!from) return;
    var to = e.relatedTarget;
    if (to && to.closest && (to.closest('[data-upgrade]') === upopTrigger || to.closest('.pop-upgrade') === upopEl)) return;
    clearTimeout(upopOpenTimer);
    upopCloseSoon();
  }, true);

  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-upgrade]');
    if (t) {
      /* Stop here: the locked control must not fire its own action, and the menu around it must
         not read this as an outside click and close. */
      e.preventDefault();
      e.stopPropagation();
      clearTimeout(upopOpenTimer);
      if (upopTrigger === t) upopClose();
      else upopOpen(t);
      return;
    }
    if (upopEl && e.target.closest && e.target.closest('.pop-upgrade') === upopEl) return;
    upopClose();
  }, true);

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' || !upopEl) return;
    var back = upopTrigger;
    upopClose();
    if (back && back.focus) back.focus();
  });
  window.addEventListener('scroll', function () { if (upopEl) upopClose(); }, true);
  window.addEventListener('resize', function () { if (upopEl) upopClose(); });
  window.kitUpgradeClose = upopClose;


  /* ==========================================================================================
     7. PLAN HARNESS — the Free / Paid switch, remembered

     The mockups carry a Paid / Free switch so a reviewer can see the same screen as a Free
     account sees it. It has to SURVIVE: clicking through from the chat to Metrics and finding
     the page back on Paid makes the reviewer re-set it on every screen, and makes a flow
     impossible to read end to end.

     The storage, the `html.is-free` class and the button state live here, once, because four
     pages need the identical thing. What stays page-local is the lock pass itself — which rows
     and buttons that page gates is a property of the page, not of the kit. Pages opt in by
     listening for `kit:plan`.

     Markup contract: a `.segctrl` whose buttons carry `data-plan-switch="paid" | "free"` (not `data-plan` — the account modal already uses that for its balance states). No onclick —
     this layer owns the click, so a page cannot wire it differently.
     ========================================================================================== */
  /* ── Theme harness ────────────────────────────────────────────────────────────────────
     The mockups' Light / Dark switch. It lived per page — a bare "Light / Dark" toggle button on
     four pages, a .segctrl on two, none of them remembering anything — so walking between pages
     threw the choice away and a dark-theme review had to start over on every screen.

     One switch, stored like the plan: `.segctrl` buttons carrying `data-theme-switch="light|dark"`.
     The class goes on <html> as early as this file runs, so a page never paints light and flips. */
  var THEME_KEY = 'insightis.theme';

  function themeGet() {
    try { return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'; } catch (e) { return 'light'; }
  }

  function themeSync(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    var btns = document.querySelectorAll('[data-theme-switch]');
    for (var i = 0; i < btns.length; i++) {
      var on = btns[i].getAttribute('data-theme-switch') === theme;
      btns[i].setAttribute('aria-selected', on ? 'true' : 'false');
      btns[i].classList.toggle('is-active', on);
    }
    document.dispatchEvent(new CustomEvent('kit:theme', { detail: { theme: theme } }));
  }

  function themeSet(theme) {
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    themeSync(theme);
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-theme-switch]');
    if (!b) return;
    themeSet(b.getAttribute('data-theme-switch'));
  });

  document.documentElement.classList.toggle('dark', themeGet() === 'dark');
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { themeSync(themeGet()); });
  else themeSync(themeGet());
  window.kitThemeSet = themeSet;

  var PLAN_KEY = 'insightis.plan';

  function planGet() {
    /* Storage can throw (private mode, blocked site data). A reviewer with no storage still
       gets a working switch; it just forgets between pages. */
    try { return localStorage.getItem(PLAN_KEY) === 'free' ? 'free' : 'paid'; } catch (e) { return 'paid'; }
  }

  function planSync(plan) {
    document.documentElement.classList.toggle('is-free', plan === 'free');
    var btns = document.querySelectorAll('[data-plan-switch]');
    for (var i = 0; i < btns.length; i++) {
      var on = btns[i].getAttribute('data-plan-switch') === plan;
      btns[i].setAttribute('aria-selected', on ? 'true' : 'false');
      btns[i].classList.toggle('is-active', on);
    }
    document.dispatchEvent(new CustomEvent('kit:plan', { detail: { plan: plan } }));
  }

  function planSet(plan) {
    try { localStorage.setItem(PLAN_KEY, plan); } catch (e) {}
    planSync(plan);
  }

  window.kitPlanGet = planGet;
  window.kitPlanSet = planSet;

  /* The class goes on <html> as early as this file runs, so a page that styles off `.is-free`
     never paints Paid first and then flips. Buttons and the event wait for the DOM. */
  document.documentElement.classList.toggle('is-free', planGet() === 'free');
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-plan-switch]');
    if (!btn) return;
    planSet(btn.getAttribute('data-plan-switch'));
  });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { planSync(planGet()); });
  } else {
    planSync(planGet());
  }


  /* Every upgrade CTA — in the popover and in the modal alike — leads to one place: Settings →
     Manage plan. One destination is the brief's rule, so it belongs to the kit rather than to
     each page, and both surfaces read it from here. "Not now" is excluded by selector: only the
     PRIMARY button travels; the secondary one is the way out.
     The storybook renders both as demos and has no plan switch; there they stay inert. */
  var PLAN_URL = document.documentElement.getAttribute('data-plan-url') || 'user_profile-modal.html?section=manage-plan';
  document.addEventListener('click', function (e) {
    if (!e.target.closest) return;
    var cta = e.target.closest('.pop-upgrade .btn, .dlg-upgrade .btn-primary');
    if (!cta) return;
    if (window.kitUpgradeClose) window.kitUpgradeClose();
    if (window.kitUpgradeModalClose) window.kitUpgradeModalClose();
    if (document.querySelector('[data-plan-switch]')) location.href = PLAN_URL;
  });

  /* ==========================================================================================
     8. UPGRADE MODAL — the answer to an action

     Hovering a locked row gets a popover (section 6). PRESSING a locked action — Connect, Edit,
     Create, Add — gets this: the person had already decided to do something, and a bubble at the
     edge of the pointer is too small an answer for that.

     Contract: `data-upgrade-modal="<id of the .dlg-overlay>"` on the trigger. Click opens; Esc,
     the scrim and any [data-dlg-close] inside close it. Focus moves to the dialog and returns to
     the trigger, because the trigger is where the person was.
     ========================================================================================== */
  var upModalEl, upModalTrigger;

  function upModalClose() {
    if (!upModalEl) return;
    upModalEl.hidden = true;
    if (upModalTrigger && upModalTrigger.focus) upModalTrigger.focus();
    upModalEl = null;
    upModalTrigger = null;
  }

  function upModalOpen(trigger) {
    var el = planPanel(trigger.getAttribute('data-upgrade-modal'), 'modal');
    if (!el) return;
    if (window.kitUpgradeClose) window.kitUpgradeClose();   /* never both at once */
    upModalEl = el;
    upModalTrigger = trigger;
    el.hidden = false;
    var first = el.querySelector('.btn-primary, button');
    if (first && first.focus) first.focus();
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-upgrade-modal]');
    if (t) {
      e.preventDefault();
      e.stopPropagation();
      upModalOpen(t);
      return;
    }
    if (!upModalEl) return;
    if (e.target.closest && e.target.closest('[data-dlg-close]')) { upModalClose(); return; }
    /* The scrim is the overlay itself; a click that lands on the dialog is inside it. */
    if (e.target === upModalEl) upModalClose();
  }, true);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && upModalEl) upModalClose();
  });
  window.kitUpgradeModalClose = upModalClose;

  /* ==========================================================================================
     10. Sidebar promo card — Free-only, dismissed-for-the-session.

     Lives here because the card is part of the SIDEBAR's contract, not of any one page: it
     appeared on the five gated pages and was missing from the three concept pages, so the same
     sidebar rendered two different ways depending on which screen you were on. The visibility
     rule and the dismiss both belong to the component; a page only supplies the markup.
     ========================================================================================== */

  var promoOff = false;

  function promoApply() {
    var card = document.getElementById('sbx-promo-card');
    if (!card) return;
    var free = document.documentElement.classList.contains('is-free');
    /* Dismissed stays dismissed for the session — flipping the plan switch must not bring it
       back, or the X reads as "hide until you touch anything". */
    card.hidden = !free || promoOff;
  }

  document.addEventListener('click', function (e) {
    var x = e.target.closest && e.target.closest('.promo-card-x');
    if (!x) return;
    var card = x.closest('.sbx-promo-card');
    if (!card) return;
    promoOff = true;
    card.hidden = true;
  });

  document.addEventListener('kit:plan', promoApply);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', promoApply, { once: true });
  else promoApply();

  /* ==========================================================================================
     11. ASKUSERPANEL (.cfc) — question tabs and the Submit gate

     Part of the .cfc contract, not of a page: every card that asks several questions or takes
     several answers needs the same two things, so they live here once.
       · Tabs (.cfc-top-tabs [role="tab"]) switch which .cfc-panel shows; ← / → / Home / End move
         between them, with roving tabindex.
       · Each .cfc-opts is one question. Its tab's .cfc-tab-pend (and the ", unanswered" .sr-only
         text) shows while the question has no checked input.
       · [data-cfc-submit] is enabled once every question in the card has an answer, and
         .cfc-foot-note says how many are left — the disabled button is never unexplained.
     A single-select card has neither, and nothing here touches it.
     ========================================================================================== */
  function cfcSync(card) {
    var left = 0;
    card.querySelectorAll('.cfc-opts').forEach(function (q) {
      var done = !!q.querySelector('input:checked');
      if (!done) left++;
      var panel = q.closest('.cfc-panel');
      var tab = panel && panel.id && card.querySelector('[role="tab"][aria-controls="' + panel.id + '"]');
      if (!tab) return;
      tab.querySelectorAll('.cfc-tab-pend, .sr-only').forEach(function (el) { el.hidden = done; });
    });
    var btn = card.querySelector('[data-cfc-submit]');
    if (btn) btn.disabled = left > 0;
    var note = card.querySelector('.cfc-foot-note');
    if (note) {
      note.hidden = left === 0;
      note.textContent = left + (left === 1 ? ' question' : ' questions') + ' left to answer';
    }
  }

  function cfcSelect(tab, focus) {
    tab.closest('[role="tablist"]').querySelectorAll('[role="tab"]').forEach(function (t) {
      var on = t === tab;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus();
  }

  document.addEventListener('click', function (e) {
    var tab = e.target.closest && e.target.closest('.cfc-top-tabs [role="tab"]');
    if (tab) cfcSelect(tab, false);
  });

  document.addEventListener('keydown', function (e) {
    if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].indexOf(e.key) < 0) return;
    var tab = e.target.closest && e.target.closest('.cfc-top-tabs [role="tab"]');
    if (!tab) return;
    var tabs = Array.prototype.slice.call(tab.closest('[role="tablist"]').querySelectorAll('[role="tab"]'));
    var i = tabs.indexOf(tab), n = tabs.length;
    var j = e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : (i + (e.key === 'ArrowRight' ? 1 : -1) + n) % n;
    e.preventDefault();
    cfcSelect(tabs[j], true);
  });

  document.addEventListener('change', function (e) {
    var card = e.target.closest && e.target.closest('.cfc');
    if (card) cfcSync(card);
  });

  function cfcInit() { document.querySelectorAll('.cfc').forEach(cfcSync); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', cfcInit, { once: true });
  else cfcInit();

})();
