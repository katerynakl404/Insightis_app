/* ChatPrompt — the composer's prompt inside a conversation: an editable line in which a metric can
   be referenced by typing "@" (chat_page-landing.html, ".cl-prompt[contenteditable]" +
   ".cl-mention-menu" + ".cl-mention-detail"). IK.Composer renders it for prompt: 'rich'.

     typing "@que…"   opens the metric list ABOVE the composer (its left edge + 8px): source logo,
                      @alias (the typed run in heavy weight) over the metric name. Search matches
                      the ALIAS. The first row is active on open; ↑/↓ move, Enter/Tab insert the
                      active row, Esc dismisses; the pointer moves the highlight too. No match →
                      the list hides (no empty state).
     a picked row     becomes an inline @alias token (not editable, focusable) + a space.
     a token          hover / keyboard focus → a small card: the metric's name and definition.
     Free             the metrics are still listed (an account that lapsed keeps them) but every
                      row is locked: padlock trails, nothing is inserted, hover / click → the
                      Metrics upgrade popover. Free with nothing to list → one locked row "Metrics
                      are on paid plans".

   h(IK.ChatPrompt, {
     placeholder,                 shown while empty
     metrics,                     default IK.CHAT_METRICS ({ name, alias, source, desc })
     seed: ['mrr'],               aliases inserted as tokens on mount
     plan,                        default IK.usePlan()
     onContentChange(hasText)     fires on every edit (drives Send)
   })   ref → the editable element.

   IK.mentionTag(metric)  → a token element (the same one a pick inserts), for other hosts. */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.CHAT_METRICS = [
    { name: 'Monthly Recurring Revenue', alias: 'mrr', source: 'Stripe', desc: 'Normalized recurring subscription revenue for the month, net of discounts and excluding one-off charges.' },
    { name: 'Churn Rate', alias: 'churn_rate', source: 'Stripe', desc: 'Share of active customers who cancelled in the period, divided by customers at the start of the period.' },
    { name: 'Revenue', alias: 'revenue', source: 'Stripe', desc: 'Total recognized revenue in the period across all products and plans.' },
    { name: 'Active Users', alias: 'active_users', source: 'Amplitude', desc: 'Distinct users with at least one qualifying session in the period.' },
    { name: 'Conversion Rate', alias: 'conversion_rate', source: 'Amplitude', desc: 'Share of signups that reach a paid plan within the period.' },
    { name: 'Customer LTV', alias: 'ltv', source: 'Stripe', desc: 'Projected gross revenue from a customer over their expected lifetime.' },
    { name: 'Customer Acquisition Cost', alias: 'cac', source: 'HubSpot', desc: 'Total sales & marketing spend divided by new customers acquired in the period.' },
    { name: 'Net Promoter Score', alias: 'nps', source: 'SurveyMonkey', desc: 'Percentage of promoters minus percentage of detractors from the latest survey wave.' },
    { name: 'Average Revenue Per User', alias: 'arpu', source: 'Stripe', desc: 'Total revenue in the period divided by the number of active users.' },
    { name: 'Gross Margin', alias: 'gross_margin', source: 'QuickBooks', desc: 'Revenue minus cost of goods sold, expressed as a percentage of revenue.' }
  ];

  IK.mentionTag = function (m, inserted) {
    var tag = document.createElement('span');
    tag.className = IK.cx('ik-mention-tag', D.focusRing);
    tag.setAttribute('contenteditable', 'false');
    tag.setAttribute('tabindex', '0');
    if (inserted) { tag.setAttribute('role', 'button'); tag.setAttribute('aria-haspopup', 'dialog'); }
    tag.setAttribute('aria-label', 'Metric: ' + m.name);
    tag.setAttribute('data-name', m.name);
    tag.setAttribute('data-alias', m.alias);
    if (m.desc) tag.setAttribute('data-desc', m.desc);
    tag.textContent = '@' + m.alias;
    return tag;
  };

  /* "@query" ending exactly at the caret: "@" starts a word (line start or after a space). */
  function mentionAtCaret(root) {
    var sel = window.getSelection();
    if (!sel || !sel.rangeCount) return null;
    var r = sel.getRangeAt(0);
    if (!r.collapsed) return null;
    var node = r.startContainer;
    if (node.nodeType !== 3 || !root.contains(node)) return null;
    var before = node.textContent.slice(0, r.startOffset);
    var m = before.match(/(^|\s)@([\w-]*)$/);
    if (!m) return null;
    return { node: node, start: r.startOffset - m[2].length - 1, end: r.startOffset, query: m[2] };
  }

  /* The typed run in heavy weight; "@" rides with the text before it (one run, as the original). */
  function Highlight(p) {
    var t = p.text, q = p.query, pre = p.prefix || '';
    var i = q ? t.toLowerCase().indexOf(q.toLowerCase()) : -1;
    if (i < 0) return pre + t;
    return [pre + t.slice(0, i), h('mark', { key: 'm', className: 'ik-mention-hl' }, t.slice(i, i + q.length)), t.slice(i + q.length)];
  }

  function Row(p) {
    var m = p.metric;
    var row = h('div', {
      role: 'option', 'aria-selected': p.active ? 'true' : 'false',
      className: IK.cx('ik-mention-row', p.active && 'is-active'),
      onMouseDown: function (e) { e.preventDefault(); },
      onMouseEnter: p.locked ? undefined : p.onHover,
      onClick: p.locked ? undefined : p.onPick
    },
      h(D.ConnectorLogo, { connector: m.source, size: 'sm', label: m.source + ' logo' }),
      h('span', { className: 'ik-mention-text' },
        h('span', { className: 'ik-mention-alias' }, h(Highlight, { prefix: '@', text: m.alias, query: p.query })),
        h('span', { className: 'ik-mention-name' }, m.name)));
    return p.locked ? h(IK.Locked, { feature: 'metrics', locked: true, marker: 'trail' }, row) : row;
  }

  IK.ChatPrompt = R.forwardRef(function ChatPrompt(p, fwd) {
    var metrics = p.metrics || IK.CHAT_METRICS;
    var plan = p.plan || IK.usePlan()[0];
    var free = plan === 'free';
    var elRef = R.useRef(null);
    var anchorRef = R.useRef(null);            /* the composer card — the list hangs above it */
    var ctxRef = R.useRef(null);
    var q = R.useState(null), query = q[0], setQuery = q[1];        /* null = list closed */
    var a = R.useState(0), active = a[0], setActive = a[1];
    var dt = R.useState(null), detail = dt[0], setDetail = dt[1];    /* the hovered token */
    var tagRef = R.useRef(null);
    var leaveT = R.useRef(0);

    function setRefs(n) {
      elRef.current = n;
      if (typeof fwd === 'function') fwd(n); else if (fwd) fwd.current = n;
    }
    function changed() { if (p.onContentChange) p.onContentChange(elRef.current.textContent.trim().length > 0); }

    R.useLayoutEffect(function () {
      var el = elRef.current; if (!el) return;
      anchorRef.current = el.closest('.ik-composer') || el;
      (p.seed || []).forEach(function (alias) {
        var m = metrics.filter(function (x) { return x.alias === alias; })[0];
        if (m) el.appendChild(IK.mentionTag(m));
      });
      changed();
    }, []);

    var hits = query == null ? [] : metrics.filter(function (m) { return m.alias.toLowerCase().indexOf(query.toLowerCase()) >= 0; });
    var listOpen = query != null && (hits.length > 0 || free);

    function hide() { ctxRef.current = null; setQuery(null); }
    function onInput() {
      changed();
      var ctx = mentionAtCaret(elRef.current);
      ctxRef.current = ctx;
      if (!ctx) { hide(); return; }
      setQuery(ctx.query); setActive(0);
    }
    function insert(m) {
      var ctx = ctxRef.current; if (!ctx) return;
      var node = ctx.node, full = node.textContent;
      var before = full.slice(0, ctx.start), after = full.slice(ctx.end);
      var frag = document.createDocumentFragment();
      if (before) frag.appendChild(document.createTextNode(before));
      frag.appendChild(IK.mentionTag(m, true));
      var tail = document.createTextNode(' ' + after);
      frag.appendChild(tail);
      node.parentNode.replaceChild(frag, node);
      var sel = window.getSelection(), r = document.createRange();
      r.setStart(tail, 1); r.collapse(true); sel.removeAllRanges(); sel.addRange(r);
      hide(); changed();
      elRef.current.focus();
    }
    function onKeyDown(e) {
      if (!listOpen || !hits.length) return;
      /* Free: the rows are locked — nothing to move to or insert; Enter / Tab / Esc dismiss. */
      if (free) {
        if (e.key === 'Enter' || e.key === 'Tab' || e.key === 'Escape') { e.preventDefault(); hide(); }
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setActive(function (cur) { return e.key === 'ArrowDown' ? (cur + 1) % hits.length : (cur - 1 + hits.length) % hits.length; });
      } else if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        if (hits[active]) insert(hits[active]); else hide();
      } else if (e.key === 'Escape') { e.preventDefault(); hide(); }
    }
    R.useEffect(function () {
      var row = document.querySelector('.ik-mention-row.is-active');
      if (row && row.scrollIntoView) row.scrollIntoView({ block: 'nearest' });
    }, [active]);

    /* The token card: shown on hover / keyboard focus of a token, kept while the pointer is in it. */
    function tagOf(t) { return t && t.closest ? t.closest('.ik-mention-tag') : null; }
    function showCard(tag) {
      clearTimeout(leaveT.current);
      var m = metrics.filter(function (x) { return x.alias === tag.getAttribute('data-alias'); })[0] || {};
      tagRef.current = tag;
      setDetail({ name: tag.getAttribute('data-name') || m.name, desc: tag.getAttribute('data-desc') || m.desc || '' });
    }
    function hideCardSoon() { clearTimeout(leaveT.current); leaveT.current = setTimeout(function () { setDetail(null); }, 80); }
    R.useEffect(function () {
      function esc(e) { if (e.key === 'Escape') setDetail(null); }
      document.addEventListener('keydown', esc);
      return function () { document.removeEventListener('keydown', esc); clearTimeout(leaveT.current); };
    }, []);

    var listBody;
    if (free && !hits.length) {
      listBody = h(IK.Locked, { feature: 'metrics', locked: true, marker: 'none' },
        h('div', { role: 'option', 'aria-selected': 'false', className: 'ik-mention-row is-plan', onMouseDown: function (e) { e.preventDefault(); } },
          h(IK.LockGlyph, null),
          h('span', { className: 'ik-mention-text' },
            h('span', { className: 'ik-mention-alias' }, 'Metrics are on paid plans'),
            h('span', { className: 'ik-mention-name' }, 'Name a number once, then use it in any question'))));
    } else {
      listBody = hits.map(function (m, i) {
        return h(Row, {
          key: m.alias, metric: m, query: query, locked: free, active: !free && i === active,
          onHover: function () { setActive(i); }, onPick: function () { insert(m); }
        });
      });
    }

    return h(IK.Fragment, null,
      h('div', {
        ref: setRefs, className: 'ik-cmp-prompt ik-chat-prompt', contentEditable: true, suppressContentEditableWarning: true,
        role: 'textbox', 'aria-multiline': 'true', 'aria-label': 'Ask anything about your data', 'data-placeholder': p.placeholder,
        onInput: onInput, onKeyDown: onKeyDown,
        onBlur: function (e) { var t = tagOf(e.target); if (t) hideCardSoon(); },
        onFocus: function (e) { var t = tagOf(e.target); if (t) showCard(t); },
        onMouseOver: function (e) { var t = tagOf(e.target); if (t) showCard(t); },
        onMouseOut: function (e) { var t = tagOf(e.target); if (t && !tagOf(e.relatedTarget)) hideCardSoon(); }
      }),
      h(D.Popover, { open: listOpen, onOpenChange: function (v) { if (!v) hide(); } },
        h(D.PopoverAnchor, { virtualRef: anchorRef }),
        h(D.PopoverContent, {
          side: 'top', align: 'start', sideOffset: 8, alignOffset: 8, avoidCollisions: false,
          className: 'ik-mention-menu', role: 'listbox', 'aria-label': 'Metrics',
          onOpenAutoFocus: function (e) { e.preventDefault(); },
          onCloseAutoFocus: function (e) { e.preventDefault(); },
          onMouseDown: function (e) { e.preventDefault(); },
          onInteractOutside: function (e) { if (elRef.current && elRef.current.contains(e.target)) e.preventDefault(); }
        }, h('div', { className: 'ik-mention-list' }, listBody))),
      h(D.Popover, { open: !!detail, onOpenChange: function (v) { if (!v) setDetail(null); } },
        h(D.PopoverAnchor, { virtualRef: tagRef }),
        h(D.PopoverContent, {
          side: 'top', align: 'start', sideOffset: 8, className: 'ik-mention-detail', role: 'tooltip',
          onOpenAutoFocus: function (e) { e.preventDefault(); },
          onCloseAutoFocus: function (e) { e.preventDefault(); },
          onPointerEnter: function () { clearTimeout(leaveT.current); },
          onPointerLeave: hideCardSoon
        },
          detail ? h(D.Typography, { element: 'div', textStyle: 'title12', textColor: 'primary', className: 'mb-0.5' }, detail.name) : null,
          detail ? h(D.Typography, { element: 'div', textStyle: 'body12', textColor: 'secondary' }, detail.desc) : null)));
  });
})();
