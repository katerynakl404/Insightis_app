/* DsCatalog — the Data Sources catalog (Connections page, Catalog tab): search, category chips with
   live counts, and the grid of connector tiles. Port of #ds-search + #ds-cats + #ds-grid in
   pages/approved/data-sources_connections-landing.html; locked rules in
   page-changes/data-sources_connections-landing.md (2, 3, 4, 7, "Catalog cards", "Free plan").

   DevartUI underneath: InputGroup (lg) for the search, FilterChips for the categories (it scrolls
   sideways below 768px with its own ScrollShadow), IconCard for every tile (the popular flame in
   its badge slot), StatusView + EmptyStateIllustration for "No matches found", Skeleton for the
   loading state.

   Behaviour (from the original):
     · the search matches the connector NAME; every chip's count follows the query live; all chips
       stay visible (0 included) so the row never reflows; if the ACTIVE category drops to 0 the
       selection falls back to All (rule 7)
     · the grid shows 18 tiles and loads the next 18 when a sentinel under it comes within 200px
       of the scroller's edge (lazy pages, reset to 1 on every filter change)
     · a popular connector carries the flame mark on its logo (IK.DsCatalogTile)
     · touch (hover: none), where IconCard draws its Connect scrim (from 1024px): the first tap on a
       tile reveals the scrim instead of connecting; Connect then connects; tapping the scrim again
       — or another tile — collapses it. Narrower, IconCard has no scrim and a tap connects.
     · Free plan: every tile is locked (IK.Locked, surface modal, click-only, no marker) — a tap
       opens the UpgradeModal for 'connections'

   h(IK.DsCatalog, {
     connectors: [{ name: 'PostgreSQL', cats: ['IT Operations'], popular: true }, …],
     categories: ['All', 'Business Intelligence', …],      // 'All' first (rule 2)
     category, onCategoryChange,                            // optional — uncontrolled otherwise
     query, onQueryChange,                                  // optional — uncontrolled otherwise
     defaultCategory, defaultQuery,                         // uncontrolled starting values
     onConnect: function (name) {},
     loading: false,                                        // skeleton chips + tiles (search stays)
     locked: undefined,                                     // default IK.usePlan()[0] === 'free'
     entering: 'Stripe',                                    // tile that animates in (after a disconnect)
     pageSize: 18,
     scroll: 'inner'                                        // the grid scrolls in its own box (max 26rem)
   })

   connectors may carry sprite + dark (the app sprite id, IK.ConnectorMark's fallback).
   IK.DsCatalogTile { connector, name, sprite, spriteDark, popular, onConnect, locked, active, onActivate, className }
     one tile: D.IconCard (IK.ConnectorMark, the flame as its badge) + the touch reveal + the lock.
   IK.DsFlame — the flame mark alone (18px disc, Surface/Card ring).                              */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.defineIcons({
    'ds-search': '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    'ds-clear': '<path d="M18 6 6 18M6 6l12 12"/>',
    'ds-flame': { fill: true, inner: '<path d="M12 2c0 0-5 4.5-5 9a5 5 0 0 0 10 0c0-2-1-3.5-2-4.5 0 2-1.5 3-1.5 3C13.5 8 12 5 12 2z"/>' },
    /* verbatim from the original's PLUS_SVG_SM (the tile's Connect action) */
    'ds-plus': '<path d="M5 12h14"/><path d="M12 5v14"/>'
  });

  var noHover = function () { return window.matchMedia && window.matchMedia('(hover: none)').matches; };

  IK.DsFlame = function DsFlame(p) {
    return h('span', { className: IK.cx('ik-dsc-flame', p.className), style: p.style, role: 'img', 'aria-label': 'Popular' },
      h(IK.Icon, { name: 'ds-flame', size: 18 }));
  };

  IK.DsCatalogTile = function DsCatalogTile(p) {
    var tile = R.useRef(null), tap = R.useRef(null);
    var plan = IK.usePlan()[0];
    var locked = p.locked != null ? !!p.locked : plan === 'free';
    var card = h(D.IconCard, {
      /* a flex box: an inline-flex mark in IconCard's block slot would bring a line box with it
         (47px instead of 40), pushing the name 2px down and the logo 5px up */
      icon: h('span', { className: 'flex' }, h(IK.ConnectorMark, { connector: p.connector || p.name, sprite: p.sprite, spriteDark: p.spriteDark, size: 'md' })),
      label: p.name,
      badge: p.popular ? h(IK.DsFlame) : undefined,
      actionLabel: 'Connect', actionIcon: h(IK.Icon, { name: 'ds-plus' }),
      /* where the tap landed — IconCard's onActivate carries no event */
      onClickCapture: function (e) { tap.current = e.target; },
      onActivate: function () {
        var scrim = tile.current && tile.current.querySelector('[role="button"] > [aria-hidden="true"]');
        if (noHover() && scrim && getComputedStyle(scrim).display !== 'none') {
          var action = scrim.firstElementChild;
          var onAction = !!(action && tap.current && action.contains(tap.current));
          if (!p.active) { if (p.onActivate) p.onActivate(true); return; }
          if (!onAction) { if (p.onActivate) p.onActivate(false); return; }
        }
        if (p.onConnect) p.onConnect(p.name);
      }
    });
    return h('div', { ref: tile, className: IK.cx('ik-dsc-tile', p.active && 'is-active', p.className), role: 'listitem' },
      locked ? h(IK.Locked, { feature: 'connections', surface: 'modal', clickOnly: true, marker: 'none', locked: true }, card) : card);
  };

  function counts(connectors, categories, q) {
    var pool = q ? connectors.filter(function (c) { return c.name.toLowerCase().indexOf(q) !== -1; }) : connectors;
    var out = {};
    categories.forEach(function (cat) {
      out[cat] = cat === 'All' ? pool.length : pool.filter(function (c) { return (c.cats || [c.cat]).indexOf(cat) !== -1; }).length;
    });
    return out;
  }

  function scrollParent(el) {
    for (var n = el && el.parentElement; n; n = n.parentElement) {
      var o = getComputedStyle(n).overflowY;
      if (o === 'auto' || o === 'scroll') return n;
    }
    return null;
  }

  var SKEL_CHIPS = ['4rem', '6rem', '5rem', '6.5rem', '5.5rem', '4.5rem'];
  var SKEL_NAMES = ['4rem', '5rem', '3.5rem', '4.5rem', '4rem', '5.5rem', '3.5rem', '4.5rem', '4rem', '5.5rem', '3.5rem', '4.5rem',
                    '5rem', '4rem', '3.5rem', '4.5rem', '5.5rem', '4rem', '3.5rem', '4.5rem', '5rem', '4rem', '3.5rem', '4.5rem'];

  IK.DsCatalogSkeleton = function DsCatalogSkeleton() {
    return h('div', { className: 'flex flex-col gap-4', 'aria-hidden': 'true' },
      h('div', { className: 'ik-dsc-chips flex flex-wrap items-center gap-1.5' },
        SKEL_CHIPS.map(function (w, i) { return h(D.Skeleton, { key: i, rounded: 'full', className: 'h-7 flex-none', style: { width: w } }); })),
      h('div', { className: 'ik-dsc-grid' },
        SKEL_NAMES.map(function (w, i) {
          return h('div', { key: i, className: 'flex h-32 flex-col items-center justify-center gap-2 rounded-lg border border-stroke bg-surface-card p-4 shadow-rest' },
            h(D.Skeleton, { rounded: 'lg', className: 'size-10' }),
            h(D.Skeleton, { rounded: 'sm', className: 'h-3.5', style: { width: w } }));
        })));
  };

  /* scroll: 'inner' — the grid scrolls in its own box (the onboarding card); the search and the chips stay put */
  function wrapScroll(mode, grid) { return mode === 'inner' ? h('div', { className: 'ik-dsc-scroll' }, grid) : grid; }

  IK.DsCatalog = function DsCatalog(p) {
    var categories = p.categories || ['All'];
    var connectors = p.connectors || [];
    var pageSize = p.pageSize || 18;
    var cs = R.useState(p.defaultCategory || 'All'), catU = cs[0], setCatU = cs[1];
    var qs = R.useState(p.defaultQuery || ''), qU = qs[0], setQU = qs[1];
    var cat = p.category != null ? p.category : catU;
    var query = p.query != null ? p.query : qU;
    function setCat(v) { if (p.onCategoryChange) p.onCategoryChange(v); if (p.category == null) setCatU(v); }
    function setQuery(v) { if (p.onQueryChange) p.onQueryChange(v); if (p.query == null) setQU(v); }
    var ps = R.useState(1), page = ps[0], setPage = ps[1];
    var as = R.useState(null), active = as[0], setActive = as[1];
    var sentinelRef = R.useRef(null);

    var q = query.trim().toLowerCase();
    var n = counts(connectors, categories, q);
    /* Rule 7: the active category never hides the matches behind a zero. */
    var effCat = cat !== 'All' && !n[cat] ? 'All' : cat;
    R.useEffect(function () { if (effCat !== cat) setCat('All'); }, [effCat, cat]);
    R.useEffect(function () { setPage(1); }, [effCat, q]);

    var filtered = connectors.filter(function (c) {
      if (effCat !== 'All' && (c.cats || [c.cat]).indexOf(effCat) === -1) return false;
      return !q || c.name.toLowerCase().indexOf(q) !== -1;
    });
    var shown = filtered.slice(0, page * pageSize);
    var more = shown.length < filtered.length;

    R.useEffect(function () {
      if (!more || !sentinelRef.current || !window.IntersectionObserver) return;
      var io = new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) setPage(function (x) { return x + 1; });
      }, { root: scrollParent(sentinelRef.current), rootMargin: '200px' });
      io.observe(sentinelRef.current);
      return function () { io.disconnect(); };
    }, [more, page, effCat, q]);

    /* Touch: a tap outside every tile collapses the revealed one. */
    R.useEffect(function () {
      if (active == null) return;
      function off(e) { if (!e.target.closest || !e.target.closest('.ik-dsc-tile')) setActive(null); }
      document.addEventListener('click', off);
      return function () { document.removeEventListener('click', off); };
    }, [active]);

    return h('div', { className: IK.cx('flex flex-col gap-4', p.className) },
      h(D.InputGroup, { size: 'lg', role: 'search' },
        h(D.InputGroupAddon, { align: 'inline-start' }, h(IK.Icon, { name: 'ds-search', size: 20 })),
        h(D.InputGroupInput, {
          type: 'search', value: query, placeholder: 'Search data sources…', 'aria-label': 'Search data sources',
          onChange: function (e) { setQuery(e.target.value); }
        }),
        query ? h(D.InputGroupAddon, { align: 'inline-end' },
          h(IK.Tip, { tip: 'Clear search' },
            h(D.InputGroupAction, { 'aria-label': 'Clear search', onClick: function () { setQuery(''); } },
              h(IK.Icon, { name: 'ds-clear', size: 16 })))) : null),
      p.loading ? h(IK.DsCatalogSkeleton) : h(IK.Fragment, null,
        /* 2px under the chips — the original .chip-row's own padding */
        h('div', { className: 'min-w-0 pb-0.5' },
          h(D.FilterChips, {
            value: effCat,
            /* pressing the selected chip again keeps it (the single-select group would clear it) */
            onValueChange: function (v) { if (v) setCat(v); },
            items: categories.map(function (c) { return { value: c, label: c, count: n[c] }; })
          })),
        wrapScroll(p.scroll, h('div', { className: 'ik-dsc-grid', role: 'list', 'aria-label': 'Available data sources' },
          shown.length ? shown.map(function (c) {
            return h(IK.DsCatalogTile, {
              key: c.name, name: c.name, connector: c.connector || c.name, sprite: c.sprite, spriteDark: c.dark, popular: c.popular,
              locked: p.locked, onConnect: p.onConnect,
              className: p.entering === c.name ? 'is-entering' : null,
              active: active === c.name,
              onActivate: function (on) { setActive(on ? c.name : null); }
            });
          }) : h('div', { className: 'col-span-full' },
            h(D.StatusView, {
              size: 'lg', surface: 'embedded', withIconHalo: false, icon: h(D.EmptyStateIllustration),
              title: 'No matches found',
              description: 'No data sources match your search or filters — try a different term or clear them'
            })),
          more ? h('div', { ref: sentinelRef, className: 'ik-dsc-sentinel', 'aria-hidden': 'true' }) : null))));
  };
})();
