/* DsCatalog — the Data Sources catalog (Connections page, Catalog tab): search, category chips with
   live counts, and the grid of connector tiles. Port of #ds-search + #ds-cats + #ds-grid in
   pages/approved/data-sources_connections-landing.html; locked rules in
   page-changes/data-sources_connections-landing.md (2, 3, 4, 7, "Catalog cards", "Free plan").

   DevartUI underneath: InputGroup (lg) for the search, FilterChips (sm) for the categories,
   DataSourceCard for every tile, StatusView + EmptyStateIllustration for "No matches found",
   Skeleton for the loading state.

   Behaviour (from the original):
     · the search matches the connector NAME; every chip's count follows the query live; all chips
       stay visible (0 included) so the row never reflows; if the ACTIVE category drops to 0 the
       selection falls back to All (rule 7)
     · the grid shows 18 tiles and loads the next 18 when a sentinel under it comes within 200px
       of the scroller's edge (lazy pages, reset to 1 on every filter change)
     · ≤ 767px the chip row scrolls sideways (no wrap) with edge fades only while it overflows
     · a popular connector carries the flame mark on its logo (IK.DsCatalogTile)
     · touch (hover: none): the first tap on a tile reveals its Connect scrim instead of
       connecting; Connect then connects; tapping the scrim again — or another tile — collapses it
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
     pageSize: 18
   })

   IK.DsCatalogTile { connector, name, popular, onConnect, locked, active, onActivate, className }
     one tile: D.DataSourceCard + the flame mark + the touch reveal + the plan lock.
   IK.DsFlame — the flame mark alone (18px disc, Surface/Card ring).                              */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, RD = window.ReactDOM, h = IK.h;

  IK.defineIcons({
    'ds-search': '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    'ds-clear': '<path d="M18 6 6 18M6 6l12 12"/>',
    'ds-flame': { fill: true, inner: '<path d="M12 2c0 0-5 4.5-5 9a5 5 0 0 0 10 0c0-2-1-3.5-2-4.5 0 2-1.5 3-1.5 3C13.5 8 12 5 12 2z"/>' }
  });

  var noHover = function () { return window.matchMedia && window.matchMedia('(hover: none)').matches; };

  IK.DsFlame = function DsFlame(p) {
    return h('span', { className: IK.cx('ik-dsc-flame', p.className), style: p.style, role: 'img', 'aria-label': 'Popular' },
      h(IK.Icon, { name: 'ds-flame', size: 18 }));
  };

  /* The flame sits on the logo's top-right corner (4px out), INSIDE the tile — portalled into the
     tile's content layer, so it lifts with the tile on hover and the Connect scrim covers it, as
     in the original. Its offset is measured from the logo, which moves when the name wraps. */
  function FlamePortal(p) {
    var st = R.useState(null), pos = st[0], setPos = st[1];
    var btn = p.btn;
    R.useLayoutEffect(function () {
      if (!btn) return;
      function place() {
        var logo = btn.firstElementChild && btn.firstElementChild.firstElementChild;
        if (!logo) return;
        setPos({ top: logo.offsetTop - 4, left: logo.offsetLeft + logo.offsetWidth + 4 - 18 });
      }
      place();
      var ro = window.ResizeObserver ? new ResizeObserver(place) : null;
      if (ro) ro.observe(btn);
      return function () { if (ro) ro.disconnect(); };
    }, [btn]);
    if (!btn || !btn.firstElementChild) return null;
    return RD.createPortal(h(IK.DsFlame, { style: pos ? { top: pos.top + 'px', left: pos.left + 'px' } : { visibility: 'hidden' } }), btn.firstElementChild);
  }

  IK.DsCatalogTile = function DsCatalogTile(p) {
    var bs = R.useState(null), btn = bs[0], setBtn = bs[1];
    var plan = IK.usePlan()[0];
    var locked = p.locked != null ? !!p.locked : plan === 'free';
    var card = h(D.DataSourceCard, {
      ref: setBtn,
      connector: p.connector || p.name, name: p.name,
      className: 'relative',
      onConnect: function (e) {
        if (noHover()) {
          var action = btn && btn.lastElementChild && btn.lastElementChild.firstElementChild;
          var onAction = action && action.contains(e.target);
          if (!p.active) { if (p.onActivate) p.onActivate(true); return; }
          if (!onAction) { if (p.onActivate) p.onActivate(false); return; }
        }
        if (p.onConnect) p.onConnect(p.name);
      }
    });
    return h('div', { className: IK.cx('ik-dsc-tile', p.active && 'is-active', p.className), role: 'listitem' },
      locked ? h(IK.Locked, { feature: 'connections', surface: 'modal', clickOnly: true, marker: 'none', locked: true }, card) : card,
      p.popular ? h(FlamePortal, { btn: btn }) : null);
  };

  function counts(connectors, categories, q) {
    var pool = q ? connectors.filter(function (c) { return c.name.toLowerCase().indexOf(q) !== -1; }) : connectors;
    var out = {};
    categories.forEach(function (cat) {
      out[cat] = cat === 'All' ? pool.length : pool.filter(function (c) { return (c.cats || [c.cat]).indexOf(cat) !== -1; }).length;
    });
    return out;
  }

  /* ≤ 767px edge fades: none | start | middle | end, only while the row overflows. */
  function useChipScroll(ref) {
    R.useEffect(function () {
      var row = ref.current && ref.current.querySelector('[data-slot="filter-chips"]');
      if (!row) return;
      function upd() {
        if (row.scrollWidth - row.clientWidth <= 2) { row.dataset.chipScroll = 'none'; return; }
        var atStart = row.scrollLeft <= 2, atEnd = row.scrollLeft + row.clientWidth >= row.scrollWidth - 2;
        row.dataset.chipScroll = atStart ? 'start' : atEnd ? 'end' : 'middle';
      }
      upd();
      row.addEventListener('scroll', upd, { passive: true });
      window.addEventListener('resize', upd, { passive: true });
      var mo = window.MutationObserver ? new MutationObserver(upd) : null;
      if (mo) mo.observe(row, { childList: true, subtree: true, characterData: true });
      return function () { row.removeEventListener('scroll', upd); window.removeEventListener('resize', upd); if (mo) mo.disconnect(); };
    });
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
    var chipsRef = R.useRef(null), sentinelRef = R.useRef(null);
    useChipScroll(chipsRef);

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
        h('div', { ref: chipsRef, className: 'min-w-0' },
          h(D.FilterChips, {
            value: effCat, onValueChange: setCat, size: 'sm', 'aria-label': 'Data Source categories',
            className: 'ik-dsc-chips gap-1.5'
          },
            categories.map(function (c) {
              return h(D.FilterChip, { key: c, value: c, size: 'sm', count: n[c] }, c);
            }))),
        h('div', { className: 'ik-dsc-grid', role: 'list', 'aria-label': 'Available data sources' },
          shown.length ? shown.map(function (c) {
            return h(IK.DsCatalogTile, {
              key: c.name, name: c.name, connector: c.connector || c.name, popular: c.popular,
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
          more ? h('div', { ref: sentinelRef, className: 'ik-dsc-sentinel', 'aria-hidden': 'true' }) : null)));
  };
})();
